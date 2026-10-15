import { selectNoteParticipantAttendees } from '@plato-corp/tiro-core/entities/calendar';
import { app } from 'electron';

import { MINUTE } from '@/renderer/utils/time';

import { getCurrentLocale, t } from '../frameworks/locale';
import {
  createNotificationWindow,
  getLocaleSelectOptions,
} from '../utils/window';

export interface CalendarEvent {
  id: string;
  externalId?: string;
  summary?: string;
  description?: string;
  location?: string;
  hangoutLink?: string;
  calendarColor?: string;
  start?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  attendees?: Array<{
    email: string;
    responseStatus: 'accepted' | 'needsAction' | 'declined' | 'tentative';
  }>;
  status?: string;
}

/**
 * Create callback URL for note creation.
 * 참석자는 selectNoteParticipantAttendees 계층 폴백 정책을 따른다
 * (PLT-3428 + Amendment 1: ≤20명 전원 / 21명+ accepted만 / 최대 20명).
 * 단위 테스트에서 왕복 검증할 수 있도록 pure function으로 분리해 export한다.
 */
export const createCallbackUrl = (meeting: CalendarEvent): URL => {
  const callbackUrl = new URL('tiro://calendar/create-note');

  callbackUrl.searchParams.set('title', meeting.summary || 'Upcoming Meeting');

  const invitedAttendees = selectNoteParticipantAttendees(meeting.attendees)
    .map((attendee) => attendee.email)
    .join(',');

  if (invitedAttendees) {
    callbackUrl.searchParams.set('tags', invitedAttendees);
  }

  if (meeting.externalId) {
    callbackUrl.searchParams.set('meetingId', meeting.externalId);
  }

  if (meeting.hangoutLink) {
    callbackUrl.searchParams.set('hangoutLink', meeting.hangoutLink);
  }

  return callbackUrl;
};

export interface CalendarData {
  calendars: Array<{
    events: CalendarEvent[];
  }>;
}

export interface NotificationHistory {
  eventId: string;
  notifiedAt: number;
}

/**
 * Main process calendar notification manager
 * Handles background calendar event monitoring and notifications
 */
export class CalendarNotificationManager {
  private calendarData: CalendarData | null = null;
  private notificationHistory: NotificationHistory[] = [];
  private checkInterval: NodeJS.Timeout | null = null;
  private isRunning = false;
  private errorCount = 0;
  private lastErrorTime = 0;
  private notificationEnabled = true;
  private getNotificationEnabledFromStore?: () => boolean;
  private getRecordingPreferencesFromStore?: () => {
    transcribeLocale?: string;
    summaryLocale?: string;
  };

  // Configuration
  private readonly CHECK_INTERVAL_MS = 1 * MINUTE; // 1 minute
  private readonly NOTIFICATION_WINDOW_MINUTES = 10; // Notify 10 minutes before
  private readonly NOTIFICATION_COOLDOWN_MINUTES = 120; // Don't re-notify for 2 hour
  private readonly MAX_CONSECUTIVE_ERRORS = 5;
  private readonly ERROR_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.start();
  }

  /**
   * Start the calendar notification monitoring
   */
  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;

    // Start periodic checks
    this.checkInterval = setInterval(() => {
      this.checkForUpcomingMeetings();
    }, this.CHECK_INTERVAL_MS);

    // Initial check
    this.checkForUpcomingMeetings();
  }

  /**
   * Stop the calendar notification monitoring
   */
  stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  /**
   * Update calendar data from renderer process
   */
  updateCalendarData(data: CalendarData): void {
    this.calendarData = data;

    // Perform immediate check after data update
    this.checkForUpcomingMeetings();
  }

  /**
   * Set notification enabled/disabled state
   */
  setNotificationEnabled(enabled: boolean): void {
    this.notificationEnabled = enabled;
  }

  /**
   * Set store accessor function
   */
  setStoreAccessor(getNotificationEnabled: () => boolean): void {
    this.getNotificationEnabledFromStore = getNotificationEnabled;
  }

  /**
   * Set recording preferences accessor function
   */
  setRecordingPreferencesAccessor(
    getRecordingPreferences: () => {
      transcribeLocale?: string;
      summaryLocale?: string;
    },
  ): void {
    this.getRecordingPreferencesFromStore = getRecordingPreferences;
  }
  /**
   * Get current calendar notification status
   */
  getStatus(): {
    isRunning: boolean;
    lastCheck: number;
    notificationCount: number;
  } {
    return {
      isRunning: this.isRunning,
      lastCheck: Date.now(),
      notificationCount: this.notificationHistory.length,
    };
  }

  /**
   * Main logic to check for upcoming meetings and trigger notifications
   */
  private checkForUpcomingMeetings(): void {
    try {
      // Check notification enabled status from store (fallback to local state)
      const isNotificationEnabled =
        this.getNotificationEnabledFromStore?.() ?? this.notificationEnabled;

      if (!this.calendarData || !this.isRunning || !isNotificationEnabled)
        return;

      // Check if we're in error cooldown period
      if (this.isInErrorCooldown()) {
        return;
      }

      const now = new Date();
      const notificationPrevWindow = new Date(
        now.getTime() - this.NOTIFICATION_WINDOW_MINUTES * MINUTE,
      );

      const notificationWindow = new Date(
        now.getTime() + this.NOTIFICATION_WINDOW_MINUTES * MINUTE,
      );

      const calendars = this.calendarData.calendars || [];
      const upcomingLatestMeeting = calendars
        .flatMap((calendar) => calendar.events)
        .filter((event) => event != null)
        .filter((event) =>
          this.isEventUpcoming(
            event,
            notificationPrevWindow,
            notificationWindow,
          ),
        )
        .filter((event) => !this.hasBeenNotified(event))
        .sort((a, b) => this.compareEventTimes(a, b))?.[0];

      // Process notification for upcoming latest meeting
      if (upcomingLatestMeeting) {
        this.sendNotification(upcomingLatestMeeting, now);
      }

      // Clean up old notification history
      this.cleanupNotificationHistory();

      // Reset error count on successful check
      this.resetErrorState();
    } catch (error) {
      this.handleError('checkForUpcomingMeetings', error);
    }
  }

  /**
   * Check if an event is upcoming within the notification window
   */
  private isEventUpcoming(
    event: CalendarEvent,
    now: Date,
    notificationWindow: Date,
  ): boolean {
    const eventStart = this.getEventStartTime(event);
    if (!eventStart) return false;

    return eventStart > now && eventStart <= notificationWindow;
  }

  /**
   * Check if we've already notified for this event recently
   */
  private hasBeenNotified(event: CalendarEvent): boolean {
    const cooldownTime =
      Date.now() - this.NOTIFICATION_COOLDOWN_MINUTES * 60 * 1000;

    return this.notificationHistory.some(
      (history) =>
        history.eventId === event.id && history.notifiedAt > cooldownTime,
    );
  }

  /**
   * Get event start time as Date object
   */
  private getEventStartTime(event: CalendarEvent): Date | null {
    if (!event.start) return null;

    const dateTimeStr = event.start.dateTime || event.start.date;
    if (!dateTimeStr) return null;

    return new Date(dateTimeStr);
  }

  /**
   * Compare two events by start time for sorting
   */
  private compareEventTimes(a: CalendarEvent, b: CalendarEvent): number {
    const aStart = this.getEventStartTime(a);
    const bStart = this.getEventStartTime(b);

    if (!aStart || !bStart) return 0;
    return aStart.getTime() - bStart.getTime();
  }

  /**
   * Send notification for a meeting
   */
  private sendNotification(meeting: CalendarEvent, now: Date): void {
    try {
      const eventStart = this.getEventStartTime(meeting);
      if (!eventStart) {
        console.warn(
          'Cannot send notification - invalid event start time:',
          meeting,
        );
        return;
      }

      const minutesToStart = Math.round(
        (eventStart.getTime() - now.getTime()) / (1000 * 60),
      );

      // Generate time display text
      let timeDisplayText: string;
      if (minutesToStart <= 1) {
        timeDisplayText = 'Now';
      } else {
        timeDisplayText = `in ${minutesToStart} min${minutesToStart !== 1 ? 's' : ''}`;
      }

      // Prepare callback URL for note creation
      const callbackUrl = createCallbackUrl(meeting);

      // Build language select options
      const preferences = this.getRecordingPreferencesFromStore?.() ?? {};
      const appLocale = getCurrentLocale();
      const localeOptions = getLocaleSelectOptions(appLocale);

      // Create notification window
      const notificationData = {
        id: 'upcoming-meeting',
        type: 'UPCOMING_MEETING' as const,
        payload: {
          title: meeting.summary || 'Upcoming Meeting',
          body: timeDisplayText,
          action: {
            text: t('notifications.micInUse.action'),
            callbackUrl: callbackUrl.toString(),
          },
          calendarColor: meeting.calendarColor,
          languageSelect: {
            transcribeLocale: preferences.transcribeLocale ?? '',
            summaryLocale: preferences.summaryLocale ?? '',
            transcribeLocales: localeOptions.transcribeLocales,
            summaryLocales: localeOptions.summaryLocales,
            startRecordingText: t('notifications.micInUse.startRecording'),
          },
        },
      };

      // Choose notification type based on user preference
      createNotificationWindow(notificationData.payload);

      // Record notification history
      this.notificationHistory.push({
        eventId: meeting.id,
        notifiedAt: Date.now(),
      });
    } catch (error) {
      this.handleError('sendNotification', error, meeting);
    }
  }

  /**
   * Clean up old notification history entries
   */
  private cleanupNotificationHistory(): void {
    const cutoffTime = Date.now() - 24 * 60 * 60 * 1000; // 24 hours ago
    this.notificationHistory = this.notificationHistory.filter(
      (history) => history.notifiedAt > cutoffTime,
    );
  }

  /**
   * Handle errors with retry logic and backoff
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(operation: string, error: unknown, context?: any): void {
    this.errorCount++;
    this.lastErrorTime = Date.now();

    if (context) {
      console.error(
        `Calendar notification error in ${operation}:`,
        error,
        context,
      );
    } else {
      console.error(`Calendar notification error in ${operation}:`, error);
    }

    // If we've hit too many consecutive errors, temporarily stop checking
    if (this.errorCount >= this.MAX_CONSECUTIVE_ERRORS) {
      console.error(
        `Too many consecutive errors (${this.errorCount}), entering cooldown period`,
      );

      // Schedule recovery attempt
      setTimeout(() => {
        this.errorCount = Math.floor(this.errorCount / 2); // Gradual recovery
      }, this.ERROR_COOLDOWN_MS);
    }
  }

  /**
   * Check if we're in error cooldown period
   */
  private isInErrorCooldown(): boolean {
    if (this.errorCount < this.MAX_CONSECUTIVE_ERRORS) return false;

    const timeSinceLastError = Date.now() - this.lastErrorTime;
    return timeSinceLastError < this.ERROR_COOLDOWN_MS;
  }

  /**
   * Reset error state after successful operation
   */
  private resetErrorState(): void {
    if (this.errorCount > 0) {
      this.errorCount = 0;
      this.lastErrorTime = 0;
    }
  }

  /**
   * Get current error status for monitoring
   */
  public getErrorStatus(): {
    errorCount: number;
    lastErrorTime: number;
    isInCooldown: boolean;
  } {
    return {
      errorCount: this.errorCount,
      lastErrorTime: this.lastErrorTime,
      isInCooldown: this.isInErrorCooldown(),
    };
  }
}

// Singleton instance
let notificationManager: CalendarNotificationManager | null = null;

/**
 * Get the singleton calendar notification manager instance
 */
export function getCalendarNotificationManager(
  getNotificationEnabledFromStore?: () => boolean,
  getRecordingPreferencesFromStore?: () => {
    transcribeLocale?: string;
    summaryLocale?: string;
  },
): CalendarNotificationManager {
  if (!notificationManager) {
    notificationManager = new CalendarNotificationManager();

    // Set store accessor if provided
    if (getNotificationEnabledFromStore) {
      notificationManager.setStoreAccessor(getNotificationEnabledFromStore);
    }

    // Set recording preferences accessor if provided
    if (getRecordingPreferencesFromStore) {
      notificationManager.setRecordingPreferencesAccessor(
        getRecordingPreferencesFromStore,
      );
    }

    // Stop manager when app is quitting
    app.on('before-quit', () => {
      if (notificationManager) {
        notificationManager.stop();
      }
    });
  }

  return notificationManager;
}
