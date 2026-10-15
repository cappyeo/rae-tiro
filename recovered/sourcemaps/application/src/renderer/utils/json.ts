/**
 * Safely parses a JSON string and returns the parsed value or null on failure
 * @param jsonString - The JSON string to parse
 * @param fallback - The fallback value to return if parsing fails (default: null)
 * @param context - Optional context string for error logging
 * @returns The parsed JSON value or the fallback value
 */
export function safeJsonParse<T = unknown>(
  jsonString: string | null | undefined,
  fallback: T | null = null,
  context?: string,
): T | null {
  if (!jsonString) {
    return fallback;
  }

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error(
      `[safeJsonParse] Failed to parse JSON${context ? ` (${context})` : ''}:`,
      error,
      '\nRaw value:',
      jsonString,
    );
    return fallback;
  }
}
