"use strict";
try {
  let e =
      typeof window < "u"
        ? window
        : typeof t < "u"
          ? t
          : typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
              ? self
              : {},
    o = new e.Error().stack;
  o &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[o] = "631c6c3f-8733-476b-a0a1-ee4752d89d7a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-631c6c3f-8733-476b-a0a1-ee4752d89d7a"));
} catch {}
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const n = {
    eventName: "2026 Chung Ju-yung Startup Competition partner perk",
    pageTitle:
      "Chung Ju-yung Startup Competition gift · 1 month of Tiro Pro free",
    pageDescription:
      "A free month of the Tiro Pro plan for 2026 Chung Ju-yung Startup Competition participants. Enter the code at checkout to apply it.",
    benefitLabel: "Tiro Pro plan",
    monthFree: " month free",
    deadline: "Redeem by: Nov 18, 2026, 23:59",
    renewal: `Renews as a paid subscription after one month.
Review your next billing date and amount before checkout.`,
    steps1:
      "Click ‘Get your offer now’, then click [Get Started] on the plan you want",
    steps2: "Log in to Tiro (no account yet? You can sign up right here)",
    steps3:
      "Check that the code 'ASAN2026' is applied at checkout (if not, enter it under ‘Add promotion code’)",
    steps4:
      "Check that ₩19,900 has been taken off, then complete checkout (Lite and Pro come to ₩0)",
    endedTitle: "Coupon redemption has ended",
    endedHelp: "This event offer has ended.",
    pausedTitle: "We're preparing this coupon page",
    pausedHelp: "Please check back shortly.",
  },
  a = {
    eventName: "D4D × EDTH Hackathon attendee benefit",
    pageTitle: "D4D attendee gift · 1,000 free Tiro minutes",
    pageDescription:
      "Create a new account through the link below to receive a total of 1,000 free trial minutes, valid for 31 days.",
    benefitLabel: "Free Tiro trial",
    minutes: " min",
    deadline: "Sign up by Oct 31, 2026, 11:59 PM KST",
    duration: `Create a new account through this event link
to receive a total of 1,000 free trial minutes.
Valid for 31 days from signup.`,
    redeem: "Sign up and get 1,000 minutes",
    instructionsTitle: "How to claim your benefit",
    steps1: "Use the button above to open the D4D signup link.",
    steps2:
      "On the invitation page, choose the signup button and create a new account.",
    steps3:
      "You will immediately receive a total of 1,000 free trial minutes, valid for 31 days from signup.",
    endedTitle: "The D4D attendee offer has ended",
    endedHelp:
      "The signup period has ended. Benefits already received remain available for their granted duration.",
    pausedTitle: "The D4D attendee offer is temporarily unavailable",
    pausedHelp: "Please check back shortly.",
    visitTiro: "Explore Tiro",
  },
  i = {
    event: "2026 Ground Forces Festival",
    eyebrow: "A special gift for festival visitors",
    headline: `Turn conversations
into lasting notes.`,
    description: "Tiro captures your conversations and organizes what matters.",
    ticketLabel: "Free Tiro recording credit",
    benefitLabel: "Tiro recording credit",
    minutesFree: "free minutes",
    benefitCaption: "Stay in the conversation. Leave the notes to Tiro.",
    eligibilityLabel: "Available to",
    eligibility: "New and existing members",
    validityLabel: "Valid for",
    validity: "{{days}} days after redemption",
    redeemTitle: "Redeem your credit",
    guide: "Copy the code and enter it on the coupon page.",
    codeLabel: "Coupon code",
    copy: "Copy",
    copied: "Copied",
    loginHelp: "Sign in or create an account to redeem.",
    copiedHelp: "Code copied. Paste it on the coupon page.",
    copyFailed: "Copy unavailable. Please copy the selected code manually.",
    redeem: "Sign up for Tiro and get your offer",
    steps: "Copy code → Sign in → Redeem coupon",
    limits: "First 5,000 people · Once per account",
    deadline: "Redeem by: Oct 14, 2026, 23:59",
    tagline: "Take your conversations further with Tiro",
    endedTitle: "Coupon redemption has ended",
    endedHelp: "This event offer has ended.",
    pausedTitle: "Coupon information is temporarily unavailable",
    pausedHelp: "Please check back shortly.",
    visitTiro: "Go to Tiro",
    pageTitle: "Festival gift · One month of Tiro Pro free",
    pageDescription: "One free month of Tiro Pro for festival attendees.",
    instructionsTitle: "How to redeem your coupon",
    instruction1: "Copy the coupon code 'IGYB2026'",
    instruction2: "Log in to Tiro on the web or desktop app",
    instruction3:
      "Click your profile at the top left > Subscribe to a plan > Select the Pro plan",
    instruction4: "Enter the copied code under ‘Add promotion code’",
    planLabel: "plan",
    freeMonth: "1 month free",
    offerTitle: "1 month of Pro, free",
    plan: "Pro plan",
    monthFree: "month free",
    renewal: `Renews as a paid subscription after one month.
Review your next billing date and amount before checkout.`,
    billingGuide: "For more detailed instructions, see the coupon guide.",
    laterTitle: "Want to use this later?",
    laterHelp:
      "Follow the instructions below to redeem your coupon before it expires.",
  },
  r = {
    instructionsTitle: "How to redeem your coupon",
    billingGuide: "Detailed coupon instructions",
    eyebrow: "A gift for AI FESTA visitors",
    description: "Tiro records your conversations and organizes what matters.",
    ticketLabel: "Tiro discount coupon",
    benefitLabel: "All Tiro plans",
    percentOff: "% off",
    benefitCaption: "Every feature, from meeting notes to agent integrations.",
    duration: "Applies once, to your first monthly payment only.",
    redeemTitle: "Use your discount code",
    guide:
      "Copy the code below and paste it into the promotion code field at checkout.",
    codeLabel: "Coupon code",
    copy: "Copy",
    copied: "Copied",
    loginHelp: "Sign in and pick a plan to open checkout.",
    copiedHelp: "Code copied. Paste it at checkout.",
    copyFailed:
      "Automatic copy is blocked. Please copy the selected code manually.",
    redeem: "Get your offer now",
    steps1: "Copy the coupon code 'AIFESTA2026'",
    steps2: "Log in to Tiro on the web or desktop app",
    steps3:
      "Click your profile at the top left > Subscribe to a plan > Select a plan",
    steps4: "Enter the copied code under ‘Add promotion code’",
    deadline: "Redeem by: Nov 30, 2026, 23:59",
    tagline: "Tiro, what comes after the conversation",
    endedTitle: "This coupon has expired",
    endedHelp:
      "Discounts already applied stay active through the end of your billing cycle.",
    pausedTitle: "We're preparing this coupon page",
    pausedHelp: "Please check back shortly.",
    visitTiro: "Go to Tiro",
    pageTitle: "AI FESTA gift · 50% off all Tiro plans",
    pageDescription:
      "A 50% discount on all Tiro plans for AI FESTA visitors. Enter the code at checkout to apply it.",
  },
  s = {
    instructionsTitle: "How to redeem your coupon",
    billingGuide: "Detailed coupon instructions",
    eyebrow: "A gift for IMPACT 2026 visitors",
    description: "Tiro records your conversations and organizes what matters.",
    ticketLabel: "Tiro discount coupon",
    benefitLabel: "All Tiro plans",
    percentOff: "% off",
    benefitCaption: "Every feature, from meeting notes to agent integrations.",
    duration: "Applies once, to your first monthly payment only.",
    redeemTitle: "Use your discount code",
    guide:
      "Copy the code below and paste it into the promotion code field at checkout.",
    codeLabel: "Coupon code",
    copy: "Copy",
    copied: "Copied",
    loginHelp: "Sign in and pick a plan to open checkout.",
    copiedHelp: "Code copied. Paste it at checkout.",
    copyFailed:
      "Automatic copy is blocked. Please copy the selected code manually.",
    redeem: "Get your offer now",
    steps1: "Copy the coupon code 'IMPACT2026'",
    steps2: "Log in to Tiro on the web or desktop app",
    steps3:
      "Click your profile at the top left > Subscribe to a plan > Select a plan",
    steps4: "Enter the copied code under ‘Add promotion code’",
    deadline: "Redeem by: Nov 30, 2026, 23:59",
    tagline: "Tiro, what comes after the conversation",
    endedTitle: "This coupon has expired",
    endedHelp:
      "Discounts already applied stay active through the end of your billing cycle.",
    pausedTitle: "We're preparing this coupon page",
    pausedHelp: "Please check back shortly.",
    visitTiro: "Go to Tiro",
    pageTitle: "IMPACT 2026 gift · 50% off all Tiro plans",
    pageDescription:
      "A 50% discount on all Tiro plans for IMPACT 2026 visitors. Enter the code at checkout to apply it.",
  },
  l = {
    paidExplanation:
      "Earn another <amt>$5</amt> 7 days after your friend’s first payment.",
    activationExplanation:
      "Earn <amt>$3</amt> when your friend completes their first recording of at least 10 minutes.",
    joinedCount: "{{count}}",
    recipientName: "Recipient’s name",
    title: `Help someone focus on great conversations.
Give the gift of Tiro Pro.`,
    friendLabel: "For your friend",
    friendValue: "$13",
    friendCaption: "One month of Pro",
    rewardLabel: "For you",
    rewardValue: "$8",
    rewardCaption: "Per friend · Conditions apply",
    conditions: "View reward details",
    creditExplanation:
      "Friends who sign up through your invite link receive a <amt>$13</amt> reward, equivalent to one month of the Pro plan.",
  },
  c = {
    title: "Billing",
    section: { paymentInfo: "Payment method", history: "Payment history" },
    card: "Card",
    paymentMethodRow: "Payment method",
    cardExpiry: "Expires {{expiry}}",
    cardEmpty: "No card saved yet",
    paymentMethodLoadFailed: "Couldn't load your payment method.",
    invoiceEmailLoadFailed: "Couldn't load your invoice email.",
    method: {
      bankTransfer: "Bank transfer (manual renewal)",
      adminGrant: "Granted by an admin",
      apple: "Apple In-App Purchase",
      googlePlay: "Google Play Store In-App Purchase",
      lemonSqueezy: "Lemon Squeezy",
      toss: "Toss Payments",
    },
    invoiceEmail: "Invoice email",
    invoiceEmailEmpty: "No email set yet",
    invoiceEmailPlaceholder: "invoice@company.com",
    invoiceEmailInvalid: "Check the email address and try again.",
    invoiceEmailUpdated: "Invoice email updated.",
    invoiceEmailUpdateFailed: `We couldn't update your invoice email.
Please try again in a moment.`,
    invoiceOpenFailed: `We couldn't open the invoice.
Please try again in a moment.`,
    paymentMethodUpdateFailed: `We couldn't open payment method settings.
Please try again in a moment.`,
    change: "Change",
    save: "Save",
    cancel: "Cancel",
    historyNote: "This list stays available even after your subscription ends.",
    historyEmpty: "No payment history yet.",
    historyLoading: "Loading payment history…",
    historyLoadFailed: "We couldn't load your payment history",
    historyLoadFailedDescription: "Please try again in a moment.",
    retry: "Try again",
    column: {
      date: "Date",
      description: "Details",
      amount: "Amount",
      status: "Status",
      invoice: "Invoice",
    },
    status: { upcoming: "Upcoming", paid: "Paid", voided: "Canceled" },
    amount: { estimated: "Est. {{amount}}" },
    item: {
      monthly: "{{plan}} monthly subscription",
      yearly: "{{plan}} yearly subscription",
      plan: "{{plan}} subscription",
      seatsTail: "({{seats}} seats)",
      fallback: "Other item",
      overageTail: {
        recorded: "{{minutes}} min pay-as-you-go",
        accruing: "Pay-as-you-go usage accruing",
      },
      overageInvoice: {
        recorded: "Pay-as-you-go for {{month}}/{{year}} ({{minutes}} min)",
        accruing: "Pay-as-you-go usage accruing",
      },
      otherUsage: "Other usage",
    },
    download: "Download",
    guideLink: "Plans and billing guide",
    noPlanBanner:
      "You're not on a plan right now, but your payment history and invoices are still available.",
    viewPlans: "See plans",
    pagination: { prev: "Previous", next: "Next" },
  },
  d = {
    success: {
      title: "Payment complete",
      description: "Everything is ready in the Tiro app.",
      returnToApp: "Back to the Tiro app",
      installDescription: "Install the Tiro app to get started on your phone.",
      downloadApp: "Download the app",
      continueOnWeb: "Continue on the web",
      planTitle: "Tiro {{planName}} plan",
    },
  },
  p = {
    retry: "Something went wrong. Please try again.",
    plans: {
      recommended: "Recommended",
      footnote:
        "Your reward is applied at checkout. Free usage you have left stays available.",
      teamRewardNotice: "Rewards apply to individual plans only.",
      title: "Choose a plan",
      start: "Get started",
    },
    title: "Use your reward",
    loading: "Checking your reward…",
    expired: {
      title: "This link has expired",
      description: 'Open the app and tap "Use your reward" again.',
    },
  },
  u = {
    title: "Invite a friend, get up to $8",
    description:
      "Know a friend with lots of meetings? Gift them a month of Pro.",
    cta: "Invite a friend now",
    paymentModal: {
      title: "Give Pro to a friend with lots of meetings",
      description:
        "Know someone with lots of meetings? Give them 1 free month of Pro and earn rewards you can use on payments.",
      friendLabel: "For your friend",
      friendValue: "1 free month of Pro",
      rewardLabel: "For you",
      rewardValue: "Up to $8 reward",
      cta: "Invite a friend",
    },
  },
  m = "Tiro | Perfectly crafted meeting notes — beyond language barriers",
  h = "Built for professionals who never miss a detail.",
  g =
    "Tiro, Tiro AI, tiro ai, notetaking, productivity, transcriber, dictation, translator, transcribe, summary, voice, editable, live, meeting, interview, lecture, STT, otter",
  y = "Tiro",
  f = "Beta",
  w = { today: "Today", yesterday: "Yesterday" },
  b = {
    jobInfo: {
      field: "What best describes your work?",
      usage: "When would you like to use Tiro?",
    },
  },
  v = {
    eventPopup: {
      title: "New User Event",
      description: `Record notes for 10+ minutes within 24 hours
and get 50 additional credit minutes!`,
      laterButton: "Maybe Later",
      startNowButton: "Start Now",
    },
  },
  k = JSON.parse(
    `{"demo":{"backToList":"Notes","conferenceMode":"Conference mode","share":"Share","meta":{"addContext":"Add context","duration":"0 min"},"tab":{"document":"Document","source":"Transcript"},"subtab":{"summary":"Summary","script":"Script"},"docCreate":"Create document","docEmptyTitle":"Your document is generated when recording ends","docEmptyTemplate":"Auto-generate template:","docEmptyHint":"You can check it right after the recording ends.","copy":"Copy","docTemplate":"One-Pager","multilingual":"Multilingual","recordLang":"English","langs":{"ko":"Korean","en":"English","ja":"Japanese","de":"German","es":"Spanish","fr":"French","it":"Italian","vi":"Vietnamese"},"translate":"Translate","recording":"Recording","rawHint":"Quality improves once a paragraph is written.","generating":"Tiro is writing your document","endNote":"End note","replay":"Replay","tooltip":{"start":"Click here to start recording","end":"Now wrap up the recording"},"templates":{"docsOfNote":"Documents in this note","recommended":"Recommended templates","meeting":"Meeting notes template","interview":"Interview template","lecture":"Lecture notes","pitch":"IR · Pitch","viewAll":"See all templates","create":"Create new template"},"askTiro":{"title":"How can I help you?","description":"I can reference your notes or summarize meetings,\\nthen find exactly what you need","chip1":"Key points","chip2":"Action items","chip3":"Decisions","chip4":"One-line summary","refInfo":"Referenced info","refNotes":"Referenced notes","noteCount":"1 note","writing":"Writing an answer","placeholder":"Ask anything"},"doc":{"discussion":"Key discussion","actionItems":"Action items"}},"loginPopup":{"ssoRequired":"Your company requires SSO sign-in.\\nEnter your work email to continue.","ssoUnavailable":"You can’t sign in with SSO using this email.\\nCheck your work email or contact your administrator.","login":"Sign In","welcome":"Welcome","continueWithGoogle":"Continue with Google","continueWithMicrosoft":"Continue with Microsoft","microsoftEmailRequired":"Your Microsoft account needs an email address.","continueWithSSO":"Continue with SSO","continueWithEmail":"or Continue with Email","email":"Email","emailPlaceholder":"Enter your email","password":"Password","passwordPlaceholder":"Enter your password","emailRequired":"Please enter your email.","emailInvalid":"Please enter a valid email format.","passwordRequired":"Please enter your password.","passwordMinLength":"Password must be at least 6 characters.","invalidCredentials":"Email or password is incorrect.","loginError":"An error occurred during login. Please try again.","loginFailed":"Login failed.","ssoSignIn":"Sign In","withSSO":"with SSO","ssoEmailPlaceholder":"Enter your email","next":"Continue","change":"Change","back":"Back","alreadyHaveAccount":"Already have an account?","forgotPassword":"Forgot your password?","emailSignup":"Sign up with email","privacyPolicy":"Privacy Policy","agreeToPrivacyPolicy":" and agree to its terms.","lastUsed":"Last Used","securityCertification":"ISO/IEC 27001:2022 · SOC 2 Type 2 certified","microsoftVerification":{"title":"Check your email","description":"Enter the 6-digit code sent to your Microsoft account email.","label":"Verification code","placeholder":"6-digit code","helper":"The code is valid for 3 minutes.","submit":"Verify and continue","verifying":"Verifying"}},"emailSignup":{"phase1":{"title":"Terms Agreement","description":"Please agree to the terms to sign up","agreeToTerms":"I agree to the Privacy Policy","confirmAge":"I am at least 14 years old","next":"Next"},"phase2":{"title":"Email Input","description":"Enter your email to receive a verification code","emailPlaceholder":"Enter your email","next":"Next","emailRequired":"Please enter your email.","emailInvalid":"Please enter a valid email format.","ssoOnlyDomain":"This email domain requires SSO login. Please sign in with SSO.","emailAlreadyExists":"This email is already in use.","tooManyRequests":"Too many requests. Please try again later.","verificationCodeSent":"Verification code sent","verificationCodeSentDescription":"A verification code has been sent to your email.","codeSentError":"An error occurred while sending the verification code. Please try again.","confirm":"Confirm","backToTerms":"Back to Terms Agreement"},"phase3":{"emailAlreadyExists":"This email is already in use.","title":"Sign Up Information","description":"Try another email","resendVerificationCode":"Resend verification code","verificationCodePlaceholder":"Enter verification code","codeNotReceivedHelp":"Didn't get the email? Check your spam folder. Still nothing? Contact <a>hello@theplato.io</a>.","passwordPlaceholder":"Enter your password","passwordConfirmPlaceholder":"Re-enter your password","passwordRule":"At least 8 characters with letters, numbers, and special characters (@$!%*#?&)","nicknamePlaceholder":"Enter your nickname","nicknameRule":"No special characters, max 20 characters","signup":"Sign Up","verificationCodeRequired":"Please enter the verification code.","verificationCodeInvalid":"Verification code must be 6 digits.","passwordRequired":"Please enter your password.","passwordTooShort":"Password must be at least 8 characters.","passwordInvalid":"Password must contain letters, numbers, and special characters (@$!%*#?&).","passwordConfirmRequired":"Please re-enter your password.","passwordMismatch":"Passwords do not match.","nicknameRequired":"Please enter your nickname.","nicknameTooLong":"Nickname can be up to 20 characters.","nicknameInvalid":"Nickname cannot contain special characters.","verificationCodeMismatch":"Verification code does not match.","passwordWeak":"Password is too weak. Please enter a password with at least 8 characters including letters, numbers, and special characters (@$!%*#?&).","tooManyVerificationAttempts":"Too many verification attempts. Please try again later.","validationError":"Please check your input.","signupError":"An error occurred during signup. Please try again."},"phase4":{"title":"Sign Up Complete","description":"Sign up completed!","welcomeMessage":"Welcome to Tiro!","loginButton":"Sign In"}},"passwordReset":{"hidePassword":"Hide password","showPassword":"Show password","completeTitle":"Password updated","linkDescription":"Choose a new password. You’ll need to sign in again on all devices.","linkInvalid":"This link has expired or is no longer available. Please request another password reset.","requestNewLink":"Request another password reset","linkRetryError":"We couldn’t change your password. Try again shortly or request another password reset.","title":"Reset your password","description":"We'll send a verification code to your account email.","codeDescription":"If an account exists, we've sent a verification code. Enter it and choose a new password.","completeDescription":"Sign in with your new password.","emailPlaceholder":"Enter your email","codePlaceholder":"Enter verification code","passwordPlaceholder":"New password","passwordConfirmPlaceholder":"Confirm new password","passwordRule":"Use at least 8 characters, including letters, numbers, and a symbol below.","sendCode":"Send verification code","resendCode":"Resend verification code","changeEmail":"Change email","reset":"Reset password","login":"Sign in","backToLogin":"Back to sign in","emailInvalid":"Please enter a valid email address.","codeInvalid":"The verification code must be 6 digits.","passwordInvalid":"Use at least 8 characters with letters, numbers, and special characters.","passwordMismatch":"Passwords do not match.","tooManyRequests":"Too many requests. Please try again shortly.","tooManyAttempts":"Too many verification attempts. Request a new code and try again.","sendError":"We couldn't send a verification code. Please try again.","resetError":"Check your verification code or request a new one and try again."},"howToUse":"How to Use","blog":"Blog","pricing":"Pricing","roiEstimate":"Adoption Quote","download":"App Download","continueAs":"Continue as {{name}}","signInWithAnotherAccount":"Sign in with another account","signInAs":"Sign in as {{name}}","signInWithGoogle":"Sign in with Google","tryTiroFree":"Try Tiro Free","tryTiroAs":"Try Tiro as {{email}}","referralTooltip":"Sign up through this link and get <bold>a free month of Pro</bold>","referralTooltipDynamic":"<bold>{{referredName}}</bold> invited you!\\nSign up and get <bold>a free month of Pro</bold>","referralTooltipInviterOnly":"<bold>{{referredName}}</bold> invited you","giftTooltip":"<bold>{{senderName}}</bold> sent you a gift! 🎁\\nSign up and get <bold>a free month of Pro</bold>","welcome":{"badgeWithName":"{{name}} invited you","badgeGeneric":"You're invited","title":"Welcome to Tiro","subtitle":"AI notes that never miss a beat — in meetings, lectures, and beyond.","neutralHeadline":"<bold>Let Tiro<br/>take the notes</bold>","rewardHeadlineBonus":"<bold>1 month of Pro</bold> off + <bold>{{bonus}}</bold>","rewardFirstMonthPartial":"<bold>{{percent}}% off your first month</bold> of {{planName}}","rewardFirstMonthFree":"<bold>1 month of {{planName}} free</bold>","rewardFirstMonthFreeWithSecondMonthDiscount":"<bold>1 month of {{planName}} free</bold><br/><extra>+ <bold>{{percent}}% off your second month</bold></extra>","rewardTrialMinutes":"<bold>{{minutes}} free trial minutes</bold>","rewardCaption":"Your discount applies automatically once you start a subscription","cta":"Sign up & claim your offer"},"aiNotes":{"ogTitle":"AI meeting notes people and agents share | Tiro","ogDescription":"Capture in-person and video meetings accurately without a bot, even in a noisy room. Share a meeting record you can trust as soon as it ends.","security":{"eyebrow":"Internationally certified","title":"ISO/IEC 27001:2022 · SOC 2 Type 2","description":"To protect customer data, Tiro holds ISO/IEC 27001:2022 certification and an unqualified SOC 2 Type 2 attestation covering all five Trust Services Criteria."}},"allRightsReserved":"All Rights Reserved.","faq":{"title":"Frequently Asked Questions","description":"Want to know more about Tiro?","items":{"howToStart":{"question":"How do I get started?","answer":"Tiro gives you 100 free minutes the moment you sign up. Four setup steps — connecting your calendar, installing the desktop and mobile apps, and creating your first note — add 50 minutes each, bringing you to 300. The free trial runs for 3 weeks from signup. Simply log in, press the red button, and you can immediately experience Tiro's real-time recording. Alternatively, you can upload existing audio files through 'Upload Audio File' to receive a summary note."},"videoConference":{"question":"Can I record video conferences?","answer":"Yes, through our desktop app (Windows, Mac), you can record video conferences, YouTube videos, webinars, and other system audio <strong>without inviting a meeting bot</strong>. Just click <a href='https://tiro.ooo/download/app'>App Download</a> at the top of the landing page to install it immediately!"},"mobileApp":{"question":"Is there a Tiro mobile app?","answer":"Yes, the Tiro mobile app is officially available for both Android and iOS. You can install it from the app download link and take Tiro with you anywhere, anytime."},"security":{"question":"What about security policy, can I trust it?","answer":"Tiro implements all currently applicable voice encryption technologies and provides the highest level of security. All text data is encrypted immediately upon creation, ensuring that no one except the user can access the content. You can find more details in <a href='https://tiro.ooo/ko/blog/%ED%8B%B0%EB%A1%9C%EC%9D%98-%EB%B3%B4%EC%95%88-%EC%A0%95%EC%B1%85-%EC%A0%95%EB%A7%90-%EB%AF%BF%EC%9D%84-%EC%88%98-%EC%9E%88%EB%82%98%EC%9A%94-51060'>Tiro's security policy</a> link."},"giftTiro":{"question":"What is 'Invite friends'?","answer":"Share your link or send an email from the 'Invite friends' tab in Settings. Your friend can get 1 month of Pro, and you earn $3 when they record 10+ minutes plus $5 seven days after their first paid bill."},"translation":{"question":"Is real-time translation available?","answer":"Yes, Tiro supports a total of 15 languages, including Korean, English, and Japanese. You can experience real-time translation by setting both the language of the meeting and the language of the recording. Experience Tiro notes in your most comfortable language!"},"teamPlanAccount":{"question":"How should we decide the number of accounts when subscribing to a Team Plan?","answer":"We recommend basing the number of accounts on simultaneous meetings, rather than total team members. Multiple team members can share one account and even log in concurrently, but each account can only record one meeting at a time.\\nE.g., for a 10-person team running just 2-3 meetings simultaneously, 3 accounts are sufficient."},"enterprisePlan":{"question":"Between the Team Plan and Enterprise Plan, which one suits our team better?","answer":"The Team Plan provides essential collaboration features, ideal for small teams or departments.\\nOn the other hand, the Enterprise Plan is suitable if:\\n<li>You need customized contracts or tailored features.</li><li>You aim for broader deployment across larger teams or an entire organization.</li>If you're unsure, feel free to contact us for a tailored recommendation. <recatch>[Contact Us]</recatch>"}}},"developers":"Developers"}`,
  ),
  t = JSON.parse(
    `{"contactForm":{"title":"Contact Sales","sla":"We'll review this and reply by email.","requiredBadge":"","optionalBadge":"(optional)","company":{"label":"Company / organization","placeholder":"e.g. ThePlato Inc."},"name":{"label":"Your name","placeholder":"e.g. Jamie Kim"},"email":{"label":"Work email","placeholder":"e.g. jamie@company.com"},"phone":{"label":"Phone","placeholder":"e.g. +82 10-1234-5678"},"useCase":{"label":"How will you use Tiro?","options":{"team":{"label":"Ongoing work for a team or organization","description":"Notes, interpretation, security review, and similar"},"conference":{"label":"A one-off event or conference","description":"Captions and translation for a dated event"}}},"event":{"name":{"label":"Event name","placeholder":"e.g. International symposium"},"host":{"label":"Host organization","hint":"Fill this in only if it differs from the company above","placeholder":"Agency or host name"},"startDate":{"label":"Start date"},"endDate":{"label":"End date"},"dayLength":{"label":"Hours per day","options":{"within_4h":"Within 4 hours","all_day":"All day","varies":"Varies by day"},"variesPlaceholder":"Describe the daily schedule"},"venue":{"label":"Venue","options":{"offline":"In person","online":"Online","hybrid":"Hybrid"},"namePlaceholder":"Venue name"},"languages":{"label":"Event languages","otherPlaceholder":"Other languages"},"translation":{"label":"Languages to translate into","otherPlaceholder":"Other languages"},"languageOptions":{"ko":"Korean","en":"English","ja":"Japanese","zh":"Chinese","none":"None","other":"Other"},"captionAudience":{"label":"Expected caption audience","options":{"up_to_100":"Up to 100","101_300":"101–300","300_plus":"300+"}},"rooms":{"label":"Rooms running at the same time","options":{"one":"1","two_plus":"2 or more"},"countPlaceholder":"How many rooms?"},"pageUrl":{"label":"Event page link","placeholder":"https://"},"addons":{"label":"Anything else you need","options":{"glossary":"Glossary from speaker slides","post_docs":"Post-event summary and translation","branding":"Logo and brand colors","live_support":"Live support on the day"}}},"seats":{"label":"Expected number of users","placeholder":"Select","options":{"seat_1_9":"1–9","seat_10_49":"10–49","seat_50_199":"50–199","seat_200_plus":"200+","undecided":"Not sure yet"}},"jobFunction":{"label":"Your function","options":{"strategy":"Strategy","hr":"HR","sales":"Sales","it":"IT","finance":"Finance","legal":"Legal","operations":"Operations","other":"Other"}},"jobTitle":{"label":"Title","placeholder":"e.g. Team lead, CTO"},"tiroUsage":{"label":"Are you already using Tiro?","options":{"personal":{"label":"Yes, personally","description":"I use Tiro on a personal account"},"department":{"label":"Yes, on my team","description":"My team or department already uses Tiro"},"first_look":{"label":"Not yet","description":"This is my first look"}}},"howFound":{"label":"How did you hear about Tiro?","detailLabel":"A bit more detail","detailPlaceholder":"Who referred you, event name, search terms, etc.","options":{"referral":{"label":"Referral","description":"A colleague or acquaintance told me"},"conference":{"label":"Conference or event","description":"I saw a session or booth"},"search":{"label":"Search","description":"I found Tiro through search"},"ads":{"label":"Ads","description":"I came from an ad"},"other":{"label":"Other","description":"Please describe below"}}},"adoptionGates":{"label":"Any steps before you can adopt?","multiHint":"(select all that apply)","options":{"security_questionnaire":{"label":"Security questionnaire","description":"A security review checklist"},"private_env":{"label":"Private environment","description":"Dedicated instance or private network"},"custom_contract":{"label":"Custom contract form","description":"We need to use our paper"},"procurement":{"label":"Procurement process","description":"Purchase approval or vendor onboarding"},"none":{"label":"None of these","description":"We can review without the steps above"}}},"purpose":{"label":"What are you trying to do?","multiHint":"(select all that apply)","coachTitle":"These details help us reply faster","coachEmpty":"Pick a situation and we'll suggest what to include.","options":{"minutes":{"label":"We want to record and organize team meetings","description":"Daily notes, sales calls, recruiting interviews","hint":"Typical meeting type and how many people will use it"},"interpretation":{"label":"We need live interpretation on multilingual calls","description":"Regular meetings with overseas partners or offices","hint":"Language pair and meeting frequency"},"conference":{"label":"We need live captions for a one-off event","description":"A dated event, captions for attendees","hint":"Event date, languages, and audience size"},"security_sso":{"label":"We're reviewing security, SSO, and pricing for a company rollout","description":"Security questionnaire, SSO, company contract","hint":"Review scope (questionnaire, SSO type) and timeline"},"other":{"label":"Something else","description":"Internal knowledge base, agent integration, and similar. Describe below","hint":"Describe the use case"}}},"timeline":{"label":"Rollout timeline","placeholder":"Select","options":{"asap":"As soon as possible","within_1m":"Within a month","m1_3":"1–3 months","after_3m":"3+ months","exploring":"Just researching"}},"detail":{"label":"Anything else we should know","placeholder":"Add any details"},"notice":"Your information is processed under our Privacy Policy to respond to this inquiry.","noticeLinkLabel":"Privacy Policy","submit":"Send inquiry","submitting":"Sending…","errors":{"required":"This field is required","email":"Please check the email format","rateLimited":"Too many requests — please try again shortly. Your input is kept.","server":"Something went wrong. Your input is kept — please try again.","captcha":"Security check failed. Please try again.","validation":"Please check your answers. Your input is kept.","emailEdit":"We couldn't update the email. Please check the address and try again."},"receipt":{"title":"Your inquiry has been received","lead":"Here is what happens next.","ownerLabel":"Owner","owner":"Tiro enterprise team","deadlineLabel":"Reply","deadline":"We'll review this and get back to you","channelLabel":"Channel","channelSuffix":" by email","domain":"Replies come from the @theplato.io domain.","spam":"If you don't see it, please check your spam folder.","emailEditHint":"You can fix the address we should reply to.","emailEditCta":"Edit email","emailEditSave":"Use this address","emailEditSaving":"Saving…","emailEditDone":"Email updated"}},"header":{"product":"Product","contactUs":"Contact Sales","press":"Press"},"main":{"updateAnnouncement":"ISO/IEC 27001:2022 · SOC 2 Type 2","subTitle":"","title":"Perfectly crafted meeting notes\\n— beyond language barriers","description":"Built for professionals who never miss a detail."},"trustedBy":{"prefix":"Trusted by ","highlight":"300+ companies","suffix":" using Tiro"},"keyFeatures":{"ubiquitous":{"title":"No more note-taking, no more language barriers","mostPrecise":"High-quality real-time transcription & perfect summaries","mostPreciseDescription":"More than just transcription. Tiro understands context and organizes your notes into structured paragraphs.","mostPreciseFeatures":["Live transcription within 0.5 seconds","Context-aware accuracy","Automatic error correction","Technical term recognition","Perfect accuracy for numbers and names"],"languageSupport":"Multilingual transcription & real-time translation across 15+ languages","languageSupportDescription":"Multilingual meetings are no problem. Tiro captures every language simultaneously and translates in real-time."},"deviceSupport":{"title":"On any device, in every conversation","description":"Different meeting platforms? No laptop? No Wi-Fi? Tiro works seamlessly across all your meeting scenarios.","features":["Web browser - Instant access, perfect for in-person meetings","Desktop app - Captures all system & mic sounds. Works for any meeting platform, YouTube, and lectures","Mobile app - Record instantly without laptop or internet connection"]},"automation":{"title":"Turn your conversations into actionable insights","documentGeneration":{"title":"Perfect documents in 3 seconds","description":"Let Tiro handle the busywork so you can focus on what matters.","oneClickTemplate":{"title":"One-click templates","description":"Choose from ready-made templates and generate perfectly formatted documents in one click"},"customTemplate":{"title":"Create custom templates","description":"Design templates that match your exact needs. Fully automate your meeting documentation with custom formats for your team."}},"askTiro":{"title":"Turn conversations into knowledge with Ask Tiro","description":"Ask about past meetings, extract insights, or identify action items. Tiro remembers everything and answers intelligently."}},"communication":{"title":"Share insights automatically, exactly where needed","teamSharing":{"title":"Collaborate effortlessly from meeting to follow-up","description":"No more manual sharing and follow-ups. Manage access and share meeting outcomes seamlessly.","features":["Automatic sharing with entire teams using Team Folders","View live transcripts together with your teammates","One-click link sharing","Granular access controls for sensitive meetings"]},"workflowIntegration":{"title":"Integrate with your workflow","description":"Tiro integrates seamlessly with your calendar, workspace, CRM, ATS, and more.\\nImport schedules from your calendar and automatically send summaries when meetings end."}}},"testimonials":{"items":[{"name":"Gemma","role":"SELFISH CLUB Master","content":"Of all the AI services we've featured at Selfish Club, Tiro is the one our community actively seeks out and consistently describes as 'truly useful.'"},{"name":"Yujin Cho","role":"Team Lead, Smilegate Investment","content":"Tiro has completely transformed my meetings. With 3+ hours of meetings daily, I was hitting the limits of my memory. Now I can't work without it."},{"name":"Hunt","role":"CEO, Notion Siblings & Just Do It Club","content":"Tiro eliminated my meeting anxiety. I no longer worry about missing details. I can fully focus on the conversation, which has dramatically improved my productivity."},{"name":"Taekkyung Lee","role":"CEO, Mashup Ventures","content":"In online meetings, in-person discussions, or conferences, I now focus on content instead of note-taking. Tiro freed me from the constraints of memory."},{"name":"Youngjun Yoo","role":"COO, Wrtn","content":"Tiro saves my most precious resource - time. It handles recording and summarizing automatically, while enabling seamless communication across languages."},{"name":"Chan Heo","role":"Director, S Animal Cancer Center","content":"English lectures are no longer intimidating! I can finally focus on learning instead of struggling with language barriers. Thank you for creating such an incredible tool."}]},"security":{"title":"Enterprise-grade security","subtitle":"Your data security and privacy are our top priorities.","certification":{"eyebrow":"International security certifications","title":"ISO/IEC 27001:2022 · SOC 2 Type 2","description":"Tiro is certified to ISO/IEC 27001:2022 and SOC 2 Type 2, with an unqualified opinion across all five Trust Services Criteria (auditor: Sensiba LLP). We continuously manage security risks through our information security management system.","footerLabel":"ISO/IEC 27001:2022 · SOC 2 Type 2 certified"},"mainFeatures":{"fullEncryption":{"title":"End-to-end encryption","description":"All transcripts are protected with AES-256 encryption at rest. TLS 1.2+ encryption secures all data in transit between the device and servers."},"accessRestriction":{"title":"Zero-trust access control","description":"Each user receives an AWS KMS-protected encryption key. All access attempts are logged. Your data is accessible only to you. No one else, including our team, can view it."},"immediateDeletion":{"title":"Zero data retention","description":"Audio is deleted immediately after transcription and never stored on our servers. When you delete notes, all related data is permanently removed."},"noAiTraining":{"title":"Never used for AI training","description":"Your data will never train AI models. We contractually prohibit all third-party AI providers from using your data for training purposes."},"networkSecurity":{"title":"Advanced network protection","description":"Firewall protection blocks DDoS attacks and malicious traffic. VPC-based network isolation prevents unauthorized access."},"auditLogs":{"title":"Comprehensive audit logs","description":"All system access, changes, and queries are logged for at least one year. Real-time vulnerability scanning and threat detection proactively block potential risks."}},"enterpriseSection":{"subtitle":"Custom security solutions that comply with your company's regulations.","inquiryLink":"Contact Sales"},"enterpriseFeatures":{"accountSecurity":{"title":"Enterprise authentication","description":"","bullet1":"SAML 2.0-based SSO and Multi-Factor Authentication included.","bullet2":"Two-step verification, brute-force protection, and session timeouts prevent unauthorized access."},"accessControl":{"title":"Role-based access control","description":"","bullet1":"RBAC for detailed permission management across your organization.","bullet2":"SCIM-based provisioning simplifies user management at scale."},"ipRestriction":{"title":"IP access restrictions","description":"","bullet1":"IP allowlisting restricts access to approved networks only.","bullet2":"Custom subdomain support for isolated access through internal VPNs."},"realtimeSupport":{"title":"Dedicated support","description":"","bullet1":"Direct hotline with personalized onboarding and training.","bullet2":"Priority response for compliance requests and custom audit reports."}}},"pricing":{"monthly":"Monthly","yearly":"Annual","plans":"Pricing","plansDescription":"Find your perfect plan","freeTrialBanner":{"title":"Try all features free","subtitle":"Try all features free for 3 weeks, with up to 300 minutes of recording.","feature1":"50-minute limit per note","feature2":"Full access to all Pro features","cta":"Start Free Trial"},"personalPlans":"For Individuals","lite":"Lite","pro":"Pro","max":"Max","monthlyLimitDescription":"{{minutes}} minutes per month","noNoteLimit":"No per-note limit","highlightSummary":"High-quality one-pager","unlimitedAI":"Unlimited AI chat","customTemplates":"Custom templates","liteFeatures":"Everything in Lite","speakerDiarization":"Speaker diarization","wiki":"Tiro Wiki","monthlyNoLimitDescription":"Unlimited recording","proFeatures":"Everything in Pro","perMonth":"/month","perMonthAnnual":"× 12 months","promoFirstMonth":"First month with coupon · {{price}}/month after","priceLoadFailedRetry":"Couldn’t load pricing. Retry","getNow":"Get Started","companyPlans":"For Business and Teams","perAccount":"/month per user","perAccountAnnual":"× 12 months per user","teamPlan":"Team Plan","teamPlanFeatures":{"feature0":"Everything in Max","feature1":"Built for team collaboration","feature2":"Unified billing, team management, and usage dashboard","feature3":"Automatic note sharing with workspace folders","feature4":"Shared templates for consistent documentation","feature5":"Shared vocabulary for improved accuracy"},"startTwoWeekTrial":"Start Now","contactUs":"Contact Sales","enterpriseContact":"Custom","enterprisePlan":"Enterprise Plan","enterprisePlanFeatures":{"feature0":"Everything in Team Plan","feature1":"Enterprise-only features","feature2":"Custom security options that meet compliance requirements","feature3":"Dedicated API and webhook support","feature4":"Custom login domain","feature5":"Dedicated onboarding and support"}}}`,
  ),
  T = {
    signedIn: "You're signed in",
    redirectMessage: "We've redirected you to the Tiro desktop app.",
    alsoOpenInBrowser: "You can also",
    openThisLink: "open this link in your browser",
  },
  S = {
    signedIn: "Connected!",
    redirectMessage: "Returning to your app...",
    manualRedirect: "If not automatically redirected,",
    clickHere: "click here",
  },
  C = {
    requestedBy: "Unverified app",
    redirectUri: "Return address",
    loadingClientInfo: "Checking connection details...",
    clientInfoError: `We couldn't verify the connection details.
Return to your app without allowing access, then reconnect.`,
    deny: "Don't allow",
    denying: "Returning to app...",
    retryError: "Something went wrong. Please try again.",
    title: "Choose what to allow",
    description: "This app can only access the data you select.",
    permissionsTitle: "Permissions to allow",
    permissionsDescription: "Choose an access level for each type of data.",
    levels: { none: "None", read: "Read", write: "Manage" },
    entities: {
      notes: { title: "Notes", description: "Note content and transcripts" },
      aiDocuments: {
        title: "AI documents",
        description: "AI summaries, templates, and generated documents",
        scopes: {
          summary: "AI summaries",
          document: "generated documents",
          template: "document templates",
        },
      },
      folders: { title: "Folders", description: "Folder structure and lists" },
      wiki: { title: "Wiki", description: "Wiki pages and their connections" },
    },
    noPermissions:
      "This app hasn't requested any permissions. Return to the app without allowing access.",
    selectAtLeastOne: "Select at least one permission",
    approve: "Allow selected access",
    approving: "Allowing selected access...",
    redirectMessage: "Taking you back to your app...",
    invalidToken: "This request has expired. Please reconnect from your app.",
  },
  A = {
    connectionComplete: "Connection complete",
    connectionPending: "Connecting your login method",
    completingConnection:
      "Finishing the connection. This will only take a moment.",
    connectedToProvider:
      "Your login method is connected. Redirecting you shortly.",
    redirectMessage: "You can also",
    redirectToTiro: "open this link in your browser",
  },
  P = {
    title: "Redeem a coupon",
    description: "Enter your code to see your benefit.",
    form: {
      label: "Coupon code",
      help: "Use letters and numbers. Codes are not case-sensitive.",
      check: "Check benefit",
      checking: "Checking",
    },
    benefit: {
      label: "Recording credit",
      amount: "{{minutes}} min",
      registrationEndsAt: "Redeem by",
      creditExpiresAt: "Use by",
      noExpiry: "No expiration",
    },
    preview: {
      title: "Review your benefit",
      target: "Recording minutes will be added to your account.",
      redeem: "Redeem",
      redeeming: "Redeeming",
      back: "Enter another code",
      accountLimit:
        "This coupon can be redeemed {{count}} time(s) per account.",
    },
    success: {
      title: "You received {{minutes}} minutes",
      description: "The coupon benefit was added to your account.",
    },
    errors: {
      EMPTY_CODE: "Enter your coupon code.",
      MALFORMED_CODE: "Enter a code using letters and numbers.",
      INVALID_CODE: "We could not find this coupon. Check your code.",
      NOT_STARTED: "This coupon is not available yet.",
      EXPIRED: "The redemption period has ended.",
      PAUSED: "Redemption is temporarily paused. Try again later.",
      EXHAUSTED: "All available redemptions have been claimed.",
      CODE_LIMIT: "This code has reached its redemption limit.",
      ACCOUNT_LIMIT: "This account has already received this coupon benefit.",
      INELIGIBLE: "This account is not eligible for this coupon.",
      BENEFIT_EXPIRED: "This coupon benefit has passed its use-by date.",
      IDEMPOTENCY_CONFLICT:
        "This request does not match the previous one. Go back and enter the code again.",
      RATE_LIMITED: "Too many requests. Please try again shortly.",
      TEMPORARY:
        "We could not complete your request. Your code is still here. Try again.",
    },
  },
  D = {
    ogTitle: "You're invited to Tiro!",
    title: "Gift Tiro",
    copyLink: "Copy link",
    banner: {
      description: `Gift Tiro and earn
<b>up to $8 in rewards</b>`,
      cta: "Gift Tiro",
    },
    inviteSent: "Invite sent",
    inviteePopup: {
      openGift: "Open your gift",
      openHint: "Click to open",
      ticketAlt: "One-month Pro plan gift ticket",
      title: "Your gift has arrived!",
      deadline: {
        title: "This offer expires soon",
        days: "D-{{count}}",
        tomorrow: "Expires tomorrow",
        today: "Expires today",
      },
      plan: { pro: "Pro plan", max: "Max plan" },
      planDiscount: "{{plan}} · {{percent}}% off the first month",
      subscriptionDetails: "View subscription details",
      discount: "{{percent}}% off",
      priceAfter: "Renews automatically at {{price}} / month from {{date}}",
      priceAfterReward: "{{price}} / month after your reward runs out",
      rolloverNote:
        "Start now and the remaining {{amount}} carries over to next month's bill.",
      startFree: "Start now for $0",
      startNow: "Start now",
      switchToPro: "Start with Pro for {{price}} in the first month",
      switchToMax: "Start with Max for {{price}} in the first month",
      freeTrialNotice: "Your free trial minutes stay intact.",
      cardNotice: "Only your card is added now. Billing starts in one month.",
      cancelNotice:
        "Cancel anytime. You'll keep access through the period you've paid for.",
    },
    planCard: {
      perFirstMonth: "/ first month",
      priceAfterReward: "{{price}} / mo after reward ends",
      priceAfterFirstMonth: "{{price}} / mo after first month",
    },
    exitWarning: {
      title: "Wait, leaving already?",
      description:
        "You can receive the referral bonus ({{minutes}} minutes) only if you sign up for Tiro for the first time through this page.",
      stay: "Stay",
      leave: "Leave",
    },
  },
  E = {
    tiroAppDownload: "Download the Tiro App",
    title: "Every Meeting, Every Device",
    description1: "Tiro works seamlessly on any device, wherever you go.",
    description2:
      "From face-to-face meetings and video calls to online classes and YouTube videos—Tiro has you covered.",
    android: "Android App",
    ios: "iOS App",
    ipad: "iOS App",
    mac: "macOS",
    windows: "Windows App",
    desktop: "Desktop App",
    download: "Download for {{platform}}",
    tryTiro: "Try Tiro",
    downloadTiro: "Download Tiro",
    windowsGuidePopup: {
      title: "How to Install Tiro on Windows",
      description1:
        "After extracting, double-click the installer file with the Tiro app icon.",
      highlight1: "Double-click the installer",
      description2:
        "If a security warning appears, click 'More info'. It's completely safe to continue.",
      highlight2: "'More info' button",
      description3: "Finally, click 'Run' to launch the Tiro desktop app.",
      highlight3: "'Run' button",
      trouble: "Having trouble downloading?",
      downloadAgain: "Download Again",
    },
    macDownloadPopup: {
      title: `Be the first to know
when the Mac app launches!`,
      description: `Tiro Mac app is launching this week.
Join our waitlist, and we'll notify you as soon as it's ready!`,
      emailPlaceholder: "Enter your email address",
      button: "Notify me first",
      success: { description: "Subscribed! We'll let you know when it's out." },
    },
    appStorePopup: {
      title: "Download Tiro for iOS",
      description: "Scan the QR code below to download.",
    },
    playStorePopup: {
      title: "Download Tiro for Android",
      description: "Scan the QR code below to download.",
    },
    mobileAppPopup: {
      title: "Install the Mobile App",
      description: "Scan the QR to open the right store for your device.",
      copyUrl: "Copy mobile app install link",
      copySuccess: "Install link copied",
      copyError: "Couldn't copy the link",
    },
    mobileWebAppInstallNudge: {
      title: "Install the mobile app",
      description: `Use the account you just signed up with.
Record without the browser, and keep capture going even when the screen closes.`,
      cta: "Continue in the Tiro app",
      closeAria: "Close mobile app install prompt",
    },
    desktopDownloadPopup: {
      title: "Email Me the Installation Link",
      description:
        "With Tiro for Mac and Windows, easily capture video calls, online classes, and even YouTube videos!",
      emailPlaceholder: "Your email",
      button: "Send me the link",
      success: {
        description:
          "Installation link sent! Please check your email on desktop.",
      },
    },
    desktopDownload: {
      title: "Get Installation Link",
      description: `With our Mac and Windows apps,
you can easily record video meetings, online lectures,
YouTube videos, and more!`,
      emailPlaceholder: "Your email",
      sentSuccess: "Email sent!",
      sentFailed: "Failed to send",
    },
  },
  R = {
    monthly: "Monthly",
    yearly: "Yearly",
    twoMonthsFree: "2 months free",
    tryTiroFree: "Try Tiro Free",
    startForFree: "Start For Free",
    youCanStartForFree: "You can start for Free!",
    upgrade: "Upgrade",
    plans: "Plans",
    plansDescription: "Find the perfect plan for your needs",
    freeTrial: "Free Trial",
    freeCredit: "Free 300 mins",
    lite: "Lite",
    pro: "Pro",
    max: "Max",
    team: "Team",
    free: "Free Trial",
    downgrade: "Downgrade",
    switchToYearly: "Switch to Yearly",
    enterprise: "Enterprise",
    teamPlanTitle: `Collaboration gets easier,
the moment you use Tiro together`,
    teamPlanDescription1:
      "Powerful for individuals — but even effective when shared",
    teamPlanDescription2: `This plan extends the individual experience into a collaborative workflow,
perfect for teams with frequent meetings or simultaneous note-taking needs.`,
    createTeam: "Start Now",
    teamPlanFeatures: {
      feature1:
        "Includes all Max Plan features (Unlimited usage, unlimited notes)",
      feature2: "Collaboration & execution features built for your team",
      feature2_1: "Team management, consolidated billing, and usage dashboard",
      feature2_2:
        "Team folders to automatically share notes with selected teammates",
      feature2_3:
        "Shared templates for consistent meeting records and documents",
      feature2_4:
        "Shared glossary to improve recognition of organization-specific terms",
    },
    enterprisePlan: "Enterprise Plan",
    enterprisePlanTitle: `Flexible and customizable
to fit your enterprise environment`,
    enterprisePlanDescription: `Flexibly responds to enterprise environments including security, integration, and policy management.
Contact us now and our dedicated manager will guide you through custom quotes and demos.`,
    enterprisePlanQuote: `From small team pilots to company-wide rollout,
our team provides tailored demos and pricing on request.`,
    contactUs: "Contact Us",
    enterprisePlanFeatures: {
      feature1: "Includes all Team Plan features (Flexible accounts and usage)",
      feature2: "Enterprise-only capabilities",
      feature2_1: "Security options aligned with internal compliance policies",
      feature2_2:
        "API and Webhook support for system integration (ATS, CRM, etc.)",
      feature2_3: "Custom login domain support",
      feature2_4: "Personalized onboarding and dedicated support line",
    },
    teamPlan: "Team Plan",
    monthlyLimitDescription: "{{minutes}} minutes per month",
    monthlyNoLimitDescription: "Unlimited usage every month",
    freeDescription: "Up to 300 free minutes for 3 weeks after you sign up",
    liteDescription: "Essentials-only light plan for occasional users",
    proDescription: "Full-featured practical plan for frequent users",
    maxDescription: "Full-featured professional plan for daily power users",
    teamDescription: "Custom solutions for teams of all sizes",
    IncludingPro: "Enjoy every Pro feature",
    speakerDiarization: "Speaker diarization",
    wiki: "Tiro Wiki",
    totalUsage: "Total {{minutes}} minutes available",
    limitPerNote: "{{minutes}} minutes limit per note",
    noNoteLimit: "Unlimited notes",
    highlightSummary: "Summary & highlights",
    unlimitedAI: "Unlimited AI questions",
    customTemplates: "Custom templates",
    proFeatures: "All Pro plan features",
    liteFeatures: "All Lite plan features",
    mostPopular: "Most Popular",
    perMonth: "/month",
    perMonthAnnual: "× 12 months",
    perAccount: "/month, per account",
    perAccountAnnual: "× 12 months, per account",
    getNow: "Get Now",
    startNow: "Start Now",
    talkToUs: "Talk To Us",
    activePlan: "Manage Subscription",
    ceoPhoneNumber: "CEO's phone number",
    appleInfo: {
      title: "App Store Purchases",
      desc: `If you purchased your subscription through Apple, you'll need to manage or cancel it directly through the App Store.
We can't process refunds or subscription changes on our website for Apple payments.`,
      guideLinkText: "App Store subscription management guide",
      guideLinkUrl: "https://support.apple.com/HT202039",
      button: "Contact Us",
    },
    bankTransferInfo: {
      title: "Bank Transfer Payment Info",
      desc: "If you paid by bank transfer, plan changes or subscription updates are only possible through our support center. Please contact us and we'll help you quickly.",
      button: "Contact Us",
    },
    lemonSqueezy: {
      contactSupport: {
        title: "Yearly payment",
        description: `You paid via LemonSqueezy!
We'll help you change your yearly subscription at our support center.`,
        button: "Contact Us",
      },
    },
    subscription: {
      status: {
        freeTrialActive: "Free Trial Active",
        freeTrialExpired: "Trial ended",
        freeTrialExpiredTitle: "Keep capturing meetings with Tiro",
        subscriptionExpired: "Subscription Expired",
        subscriptionExpiredDescription: "You can start again whenever you want",
        subscriptionExpiredBadge: "Expired",
        subscriptionExpiredMeta:
          "Previous plan: {{planName}} · You can resume anytime",
        subscriptionNotStarted: "No subscription yet",
        subscriptionNotStartedDescription:
          "Subscribe to a plan and explore everything Tiro offers",
        subscriptionNotStartedBadge: "Subscription required",
        active: "Active",
        quotaExhausted: "Plan usage exhausted",
        canceled: "Canceling",
        daysLeft: "{{days}} days left!",
        usedMinutes: "{{minutes}} min used",
        totalMinutes: "/ {{minutes}} min total",
        upgradeMessage: "Upgrade to a paid plan and use all features",
        trialActiveTitle: "Explore everything Tiro offers",
        expiryApproachingTitle: "Trial ends in {{days}} days",
        usageNearlyExhaustedTitle: "You're running out of credits",
      },
    },
  },
  I = JSON.parse(
    `{"labels":{"endDate":"End Date","usage":"Usage","nextBillingDate":"Next Billing Date","paymentInfo":"Payment Info","endOfUseDate":"End of Use Date","member":"Seats","usageReset":"Usage reset"},"paymentProviders":{"appleInApp":"Apple In-App Purchase","googlePlayInApp":"Google Play Store In-App Purchase"},"messages":{"remainingUsageCarryover":"Start a **paid subscription** during the free trial period and we'll **carry over your remaining usage**!","usageResetWithBilling":"Your usage also resets at this time.","mobilePaymentManagement":"You can manage payments in the mobile app.","availableUntilEndDate":"You can use the current plan until the end of use date","teamPaymentAdminOnly":"Workspace billing management is only available to administrators","teamSubscribeAdminOnly":"Only administrators can subscribe","workspaceSubscribeAdminTooltip":"Only administrators can make payments.","upgradeCtaTitle":"Make meetings more valuable with your team","upgradeCtaDescription":"Unlimited usage · Shared notes · Invite teammate","maxUpgradeCtaTitle":"Unlimited recording with Max","maxUpgradeCtaDescription":"Record every day with no monthly limit","proUpgradeCtaTitle":"More features with Pro","proUpgradeCtaDescription":"Speaker diarization, Wiki, and a generous quota for everyday use","teamUpgradeMemberCount":"Current teammates: {{count}}","teamUpgradeWithMembersDescription":"Subscribe to the team plan to keep collaborating with your team."},"buttons":{"paymentManagement":"Subscription & Payment","teamManagement":"Manage People","viewTeamInfo":"Manage People","contactUs":"Contact Us","subscribeNow":"Subscribe Now","resumeNow":"Resume Subscription","startSubscription":"Start subscription","startTeamPlan":"Start Team Plan"},"tabs":{"individual":"Individual","teamEnterprise":"Team & Enterprise"},"billing":{"monthly":"Monthly","yearly":"Yearly","annualOffer":"**2 months free** when billed annually"},"usage":{"cardTitle":"Usage","planUsageLabel":"Plan usage","workspaceUsageLabel":"Workspace usage","myUsageLabel":"My usage","minutesOfTotal":"{{used}} min / Total {{total}} min","text":"{{count}}m used","planUsageText":"Plan usage {{minutes}} min used","minutesUsed":"{{minutes}} min used","minutesUsedOfTotal":"{{used}} / {{total}} min","minutesRemaining":"{{minutes}} min left","percentage":"{{percentage}}%","baseWithOverage":"Base {{minutes}} min · overage billing","overageShortLabel":"Overage billing","addonLabel":"Additional usage","addonStandby":"Additional usage · Used automatically after plan usage","addonUsing":"Additional usage · In use","addonUsingSuffix":"· In use","addonAvailable":"Additional usage · Available","addonStandbyTooltip":"Additional usage is used automatically after plan usage runs out.","addonUsingTooltip":"Plan usage has run out, so additional usage is now in use.","addonAvailableTooltip":"Your plan has expired, but remaining additional usage is still available.","addonCreditOnlyTooltip":"Remaining additional usage is still available.","addonUsedOfTotal":"{{used}} / {{total}} used","memberCount":"{{count}}"},"reward":{"title":"Payment reward","description":"Automatically applied to your next payment. Only available for web payments."},"quota":{"unlimited":"Unlimited","expired":"Subscription expired","remaining":"{{count}}m left"},"title":"Your Subscription","description":"Here is your active subscription. Subscription can be updated or cancelled at any time.","goToNotes":"Go to Notes","managePlan":"Manage all your personal information and subscriptions via {{provider}}","managePlanAdminGranted":"You're using a gift subscription from Tiro Team. To subscribe directly, please check our pricing.","managePlanApple":"You can manage your subscription directly in the App Store.","managePlanPlaystore":"You can manage your subscription directly in the Play Store.","managePlanBank":"You paid via bank transfer. Contact us for plan changes or subscription updates.","managePlanTeamMember":"You're using a team plan. Please contact an admin for subscription management.","notHaveSubscription":"You don't have an active subscription.","checkOutThe":"Check out the","plans":"Plans","toUnlock":"to unlock new features.","quotaExceeded":{"quotaWillBeExceeded":{"title":"Your usage limit is about to be exceeded","description":"Upgrade your plan to continue using Tiro","button":"Upgrade Plan"},"expired":{"title":"Your subscription has expired","description":"Renew your subscription to continue using Tiro","button":"Upgrade Plan"},"subscription":{"title":"You've used up all your subscription time","description":"Upgrade your plan to continue using Tiro","button":"Upgrade Plan"},"quotaWillbeExceeded":{"description":"Upgrade your plan to keep recording without interruption","button":"Manage plan"},"usageExceeded":{"title":"You've used all your time","trial":{"title":"Your free trial time has run out","description":"Start a plan to keep going right away","button":"Start a plan"},"individual":{"description":"Upgrade your plan to keep going right away","button":"Manage plan"},"individualOverage":{"description":"Turn on Additional recording or upgrade your plan in Manage plan to keep going.","button":"Manage plan"},"team":{"title":"Your workspace has used all its time","description":"Ask your workspace admin for more time. Once they turn on Additional recording in settings, you can keep going."},"teamAdminOverage":{"title":"The included recording time has run out","description":"Turn on Additional recording in Manage plan to keep recording after the included time is used.","button":"Manage plan"},"teamAdminContract":{"title":"You've used all your contracted time","description":"To add more time, contact partners@theplato.io. We'll help adjust your contract.","button":"Email us"},"button":"OK"},"recordingStopped":{"openWorkspaceSettings":"Open settings","manager":{"title":"The included recording time has run out","description":"Turn on Additional recording to keep recording meetings in this workspace after the included time is used."},"member":{"title":"The team's included recording time has run out","description":"A workspace admin needs to turn on Additional recording in settings before recording can continue."},"overageEnabled":{"title":"Additional recording can keep this meeting going","description":"The included recording time has run out, but Additional recording is on. Start recording again."},"unpaidAdmin":{"title":"You can manage additional recording, but cannot record conversations","description":"Your current role can manage Additional recording settings, but cannot start recordings directly."},"viewer":{"title":"Member or Admin access is required to start recording","description":"Your current role is read-only, so you cannot create notes or start recordings."},"orgQuota":{"title":"Your organization has run out of recording time","description":"Your organization has used all of its shared recording time, so recording can't continue right now.\\nAsk your organization admin to add more recording time."},"workspaceQuota":{"title":"This workspace has run out of recording time","description":"This workspace has reached its recording limit, so recording can't continue right now.\\nAsk a workspace admin to adjust the limit."},"recordingSuspended":{"title":"Recording is turned off for your account","description":"Ask your organization admin to turn recording back on."}}},"stripeTransition":{"entry":{"label":"Paying in-app","title":"Skip the store fee and pay up to 10% less","benefitsToggle":"See what web billing adds","benefits":["· **Local currency** Pay in a currency you know, and spend less than you would in-app.","· **Team plan** Several members can share and manage one workspace.","· **Annual billing** Choose a discounted annual rate instead of paying monthly.","· **Coupons** Apply a promotion code at checkout.","· **Corporate cards** Pay with a company card and manage the payment method yourself on the web."],"cta":"Change payment method","guideLink":"Read the billing guide"},"billing":{"emptyTitle":"Receipts for in-app purchases live in your store account.","emptyCaptionStore":"You'll find your Google Play and App Store payment history and receipts under each store account.","emptyCaptionInvoice":"Tiro doesn't issue invoices for in-app purchases.","label":"Need a monthly invoice?","title":"Invoices and card management, all in one place","description":"Register a card on the web and Tiro handles the rest — monthly invoices with PDF downloads, corporate cards, and billing email settings."},"members":{"title":"You'll need a Team plan","description":"Upgrade to a Team plan to work together with your teammates."},"additionalWorkspace":{"statusBadge":"Subscription needed","title":"This workspace doesn't have a subscription yet","description":"Subscriptions are tied to each workspace separately.","overviewTitle":"Your subscriptions","noAdminPermission":"No admin access","googlePlayProvider":"Google Play in-app purchase","appStoreProvider":"App Store in-app purchase","startCurrentSubscription":"Subscribe this workspace","transitionDescription":"Change the payment method for {{workspaceName}} too, and you can manage every subscription in one place."},"dialog":{"title":"Change payment method","subtitle":"Pick a plan and billing cycle. You'll register your card and pay on the next step.","resumeTitle":"Resume subscription","resumeDescription":["Your in-app subscription on the store is already cancelled.","Resume now and you can start a new plan right away, without waiting for the expiry date."],"yearlyHint":"2 months free when billed annually","currentPlanBadge":"Current plan","summaryExistingCreditLabel":"Reward balance applied","summarySeats":"× {{count}} accounts","summaryTodayLabel":"Amount due today","storeCancelNoteAppStore":"After the change, you'll need to cancel auto-renewal on the App Store yourself. We'll show you how as soon as your payment goes through.","confirm":"Pay","resumeConfirm":"Resume","estimateError":"We couldn't load your estimated deduction. Please try again in a moment.","estimateRetry":"Try again","estimateCurrencyLocked":"This account can only be billed in {{currency}}. Switch the currency to reload the estimate.","estimateCurrencySwitch":"Switch to {{currency}}","estimateLoading":"Loading your estimate.","startError":"We couldn't open the checkout page. Please try again in a moment."},"startError":{"conflictTitle":"There's already a change in progress","conflictBody":"A change was started in another tab or on another device. Continue that one, or cancel it and start again.","conflictAction":"Go to that change","failedTitle":"You can't make this change right now","failedBody":"Your subscription status changed, so the change can't start. Refresh the page and check again."},"initiated":{"badge":"Changing payment method","body":"The change is finished once you complete payment. Until then you can cancel any time, and cancelling leaves your current subscription exactly as it is.","continue":"Continue to payment","abort":"Cancel change","abortConfirmTitle":"Cancel this change?","abortConfirmBody":"Your current subscription stays exactly as it is — only the payment method change is cancelled. You can start the change again anytime.","abortConfirmCancel":"Go back","abortConflictError":"You can't do that right now. The change moved on, so we've refreshed to the latest status.","abortRetryError":"We couldn't cancel the change. Please try again in a moment.","inAppBadge":"In-app purchase"},"cancelCheckPending":{"bannerTitle":"We're checking the store cancellation","bannerBody":"This can take up to a day. The notice disappears once it's confirmed.","pill":"Checking"},"completed":{"title":"Payment method changed","body1":"Your Tiro subscription is now billed to the card you registered.","step2":"We'll email you once the cancellation is confirmed. Until then, we send a reminder every three days.","howToCancel":"How to cancel","verifyingTitle":"Confirming your payment","verifyingBody":"This only takes a moment. We'll show you what's next as soon as it's confirmed.","manualCancel":{"title":"Now cancel your store subscription","body":"Your card is registered. Your store subscription is still active too, so until you cancel it you can be charged in both places.","stepsTitle":"Here's how to cancel"}},"awaiting":{"autoRevokeTitle":"Cancelling and refunding automatically","autoRevokeBody":"Your in-app subscription is being cancelled automatically and your latest charge refunded in full. There's nothing you need to do — we'll email you once it's done.","bannerTitle":"Your in-app subscription is still active","bannerBody":"Right now both your Tiro card billing and your store subscription are active. Until you cancel the store one, you can be charged in both places.","bannerLine2":"Once you cancel, it can take up to a day for us to confirm it.","creditFallbackNote":"The store couldn't refund you automatically, so you'll need to cancel it yourself. Once the cancellation is confirmed, the time you already paid for comes off your next payment.","alreadyCanceledAsk":"Already cancelled?","requestConfirm":"Request cancellation check","cancelCheckConflictError":"We can't check the cancellation just yet.\\nWe've refreshed to the latest status. Please try again in a moment.","cancelCheckRetryError":"We couldn't request the cancellation check.\\nPlease try again in a moment."},"recordingBanner":{"title":"Recording stopped — you've used all your minutes","body":"Change your payment method and overage billing keeps your recordings running without a break.","cta":"Learn more"},"storeCancelGuide":{"title":"How to cancel your store subscription","iosSteps":[{"title":"Open the App Store app or Settings","caption":"Tap your account icon in the top right."},{"title":"Select [Subscriptions]","caption":""},{"title":"Select Tiro from your subscriptions","caption":""},{"title":"Tap [Cancel Subscription] to turn off auto-renewal","caption":""}],"androidSteps":[{"title":"Open the Google Play app","caption":"Tap your profile icon in the top right."},{"title":"Go to [Payments & subscriptions] → [Subscriptions]","caption":""},{"title":"Select Tiro under Active","caption":""},{"title":"Tap [Cancel subscription] to turn off auto-renewal","caption":""}],"androidNote":"You can skip the cancellation reason if it asks. Your remaining time stays intact.","confirmedNote":"We'll email you once the cancellation is confirmed, and the reminders stop automatically."},"duplicateBilling":{"bannerTitle":"You're being billed twice","cta":"Resolution guide","dialogTitle":"Fix the duplicate billing","webRowLabel":"Web billing","webRowPill":"Keep","storeRowPill":"Cancel needed","step1KeepNote":"Cancelling doesn't affect your Tiro subscription — it keeps running.","requestConfirmCaption":"Once the cancellation is confirmed the notices stop and we'll email you. Confirmation can take up to a day."},"stores":{"APP_STORE":{"bannerBody":"Your App Store subscription is active again. Your Tiro subscription is unaffected — please cancel the store subscription again.","step1Title":"Cancel the App Store subscription again","step1CancelPath":"Settings → Apple Account → Subscriptions → Tiro → Cancel Subscription.","completedStep1":"Cancel auto-renewal for your Tiro subscription in the App Store."},"PLAY_STORE":{"bannerBody":"Your Google Play subscription is active again. Your Tiro subscription is unaffected — please cancel the store subscription again.","step1Title":"Cancel the Google Play subscription again","step1CancelPath":"Google Play app → profile → Payments & subscriptions → Subscriptions → Tiro under Active → Cancel subscription.","completedStep1":"Cancel auto-renewal for your Tiro subscription in Google Play."}},"planDescriptions":{"lite":"An easy-going plan for occasional recording and the essentials","pro":"A practical plan with every feature, for people who record often","max":"A professional plan with every feature, for people who record every day"},"lines":{"creditNudge_one":"The day you already paid for comes off your first payment.","creditNudge_other":"The {{count}} days you already paid for come off your first payment.","creditNudgeUnknown":"The time you already paid for comes off your first payment.","nudgeRefundOrLater_one":"The day you already paid for is settled automatically — as a store refund or a deduction from your next payment.","nudgeRefundOrLater_other":"The {{count}} days you already paid for are settled automatically — as a store refund or a deduction from your next payment.","nudgeRefundOrLaterUnknown":"The time you already paid for is settled automatically — as a store refund or a deduction from your next payment.","storeRefunded_one":"When you pay for the new plan, the store automatically refunds your latest in-app charge in full and cancels the in-app subscription for you.","storeRefunded_other":"When you pay for the new plan, the store automatically refunds your latest in-app charge in full and cancels the in-app subscription for you.","storeRefundedUnknown":"When you pay for the new plan, the store automatically refunds your latest in-app charge in full and cancels the in-app subscription for you.","storeRefundedCompleted_one":"Your in-app subscription will be canceled automatically and your latest charge refunded in full. We'll email you once it's done.","storeRefundedCompleted_other":"Your in-app subscription will be canceled automatically and your latest charge refunded in full. We'll email you once it's done.","storeRefundedCompletedUnknown":"Your in-app subscription will be canceled automatically and your latest charge refunded in full. We'll email you once it's done.","deductedLater_one":"The day you already paid for comes off a later payment.","deductedLater_other":"The {{count}} days you already paid for come off a later payment.","deductedLaterUnknown":"The time you already paid for comes off a later payment.","nothingToSettle_one":"You've used up the period you already paid for, so switching now costs you nothing.","nothingToSettle_other":"You've used up the period you already paid for, so switching now costs you nothing.","nothingToSettleUnknown":"You've used up the period you already paid for, so switching now costs you nothing.","creditRowLabel_one":"Deduction for 1 day already paid","creditRowLabel_other":"Deduction for {{count}} days already paid","creditRowLabelUnknown":"Deduction for time already paid","resumeCredit_one":"The day you already paid for comes off today's payment.","resumeCredit_other":"The {{count}} days you already paid for come off today's payment.","resumeCreditUnknown":"The time you already paid for comes off today's payment.","resumeRefund_one":"The day you already paid for is settled automatically — as a store refund or a deduction from your next payment.","resumeRefund_other":"The {{count}} days you already paid for are settled automatically — as a store refund or a deduction from your next payment.","resumeRefundUnknown":"The time you already paid for is settled automatically — as a store refund or a deduction from your next payment.","completedCredit_one":"The day you already paid for was deducted from this payment.","completedCredit_other":"The {{count}} days you already paid for were deducted from this payment.","completedCreditUnknown":"The time you already paid for was deducted from this payment.","completedRefund_one":"The day you already paid for is settled automatically — as a store refund or a deduction from your next payment.","completedRefund_other":"The {{count}} days you already paid for are settled automatically — as a store refund or a deduction from your next payment.","completedRefundUnknown":"The time you already paid for is settled automatically — as a store refund or a deduction from your next payment.","confirmedCredit":"Your store cancellation is confirmed. The store couldn't refund you automatically, so the time you already paid for (through {{date}}) comes off your next payment instead.","confirmedCreditUnknown":"Your store cancellation is confirmed. The store couldn't refund you automatically, so the time you already paid for comes off your next payment instead.","confirmedCanceled":"Your store cancellation is confirmed. The old in-app subscription expires on {{date}}. Nothing else to do.","confirmedCanceledUnknown":"Your store cancellation is confirmed. The old in-app subscription expires soon. Nothing else to do."}}}`,
  ),
  x = JSON.parse(
    `{"password":{"toast":{"error":"Failed to change password"}},"title":"Settings","group":{"profile":"Profile","connectors":"Connectors","workspace":"Workspace","organization":"Organization Settings","developers":"Developers","myInformation":"Personal Settings","otherApps":"App Settings","team":"People"},"tab":{"billing":"Billing","billingManagement":"Billing","plans":"Plan Management","profile":"Profile","general":"Preferences","devices":"Devices","referral":"Invite friends","coupon":"Coupons","calendar":"Calendar","person":"Participants","wordMemory":"Word memory","customTemplate":"Custom Templates","teamWordMemory":"Workspace Word Memory","integration":"Integration","mcp":"Tiro MCP","workspace":"General","members":"People","team":"Manage People","teamGuide":"Guide for managing people","about":"About","organization":"Organization","developers":"Developer Center"},"mcp":{"hero":"Bring your meeting notes to your AI tools","logosAlt":{"tiro":"Tiro","claude":"Claude","chatgpt":"ChatGPT","cursor":"Cursor"},"steps":{"install":"In your AI tool, add Tiro MCP using the public URL","oauth":"Authenticate via the browser OAuth flow","invoke":"Chat, search, and work with meeting context anywhere"},"copy":"Copy","copied":"Copied","learnMore":"Learn more"},"workspace":{"title":"General","description":"Manage your workspace's basic information and settings.","info":{"label":"Workspace","name":"Workspace name","namePlaceholder":"Enter a workspace name","nameRequired":"Enter a workspace name.","nameMaxLength":"Workspace names must be {{max}} characters or fewer.","descriptionField":"Workspace description","descriptionPlaceholder":"Enter a workspace description","updateError":"Couldn't save your workspace information.\\nPlease try again in a moment.","icon":{"label":"Workspace icon","description":"PNG, JPG, or WebP, up to 5MB. Square images work best.","edit":"Edit icon","upload":"Upload an image","change":"Change image","removeButton":"Remove","toast":{"uploaded":"Workspace icon updated.","removed":"Workspace icon removed.","failed":"Couldn't update the icon. Please try again in a moment."},"error":{"unsupportedType":"Only PNG, JPG, or WebP images are supported.","tooLarge":"Images must be 5MB or smaller."}}},"settings":{"label":"Workspace Settings","allowNoteTransfer":{"title":"Allow transferring notes to another workspace","description":"Let people move their notes to a different workspace."}},"recordingPolicy":{"label":"Recording policy"},"recordingOverage":{"title":"Additional recording","description":"Keep recording meetings after the included recording time runs out.","billingDescription":"Overage recording is billed at $0.025 per minute.","enabledDescription":"Recording will continue automatically after the included time runs out.","memberDescription":"Only workspace managers can change additional recording.","disabledReason":{"paymentMethodMissing":"Add a payment method before turning on additional recording.","paymentFailed":"The latest payment failed. Check the payment method, then turn it on again.","noActiveSubscription":"An active subscription is required to turn on additional recording.","nonStripeSubscription":"Additional recording is only available on workspaces billed through the desktop or web app. To change your payment method, reach out via Profile > Support.","generic":"Additional recording cannot be turned on with the current billing status."},"toast":{"enabled":"Additional recording is on","disabled":"Additional recording is off","failed":"Could not save additional recording settings","failedDescription":"Check the payment or subscription status, then try again."}},"sharePolicy":{"label":"Sharing policy","orgInherited":{"title":"Organization policy also applies","restricted":"Your organization blocks share links. Share links can't be created or opened in this workspace either.","companyOnly":"Company email only","maxDays":"Links up to {{days}} days","domains":"Allowed domains: {{domains}}","none":"Your organization adds no extra restrictions. The stricter of the workspace and organization settings applies."},"ceiling":{"title":"Workspace sharing limit","description":"Cap how widely members can share links. Applies retroactively to existing shared notes.","option":{"anyone":"Anyone with the link","company":"People at my company","private":"Private (no link sharing)"},"confirm":{"title":"Lower the sharing limit?","description":"The new limit takes effect immediately, including links that already exist. Links shared more broadly than “{{scope}}” will stop opening right away.","confirm":"Lower limit","cancel":"Cancel","applied":"New sharing limit applied. Existing links are already covered."}},"maxDuration":{"title":"Maximum share-link lifetime","description":"The most days a new share link stays valid before it expires.","unlimited":"Unlimited"},"allowedDomains":{"title":"Company domains","description":"Notes shared as “People at my company” can only be opened by accounts on these domains. Leave empty to use the note owner's company domain (personal domains like gmail.com don't count).","placeholder":"e.g. theplato.io","add":"Add","remove":"Remove","empty":"No domains added (uses the owner's company domain).","invalid":"That doesn't look like a valid domain."},"updateError":"Couldn't save the sharing policy. Please try again.","enterpriseBadge":"Enterprise","enterpriseOnly":"Sharing policy can be changed on the Enterprise plan."},"sharedLinks":{"label":"Shared links","manage":"Manage shared links","manageDescription":"Review and revoke the active share links in this workspace.","back":"Back to workspace settings","loading":"Loading…","empty":"No active share links right now.","count":"{{count}} active link(s)","selectedCount":"{{count}} selected","table":{"note":"Note","scope":"Scope","owner":"Created by","sharedDate":"Shared on"},"revoke":"Revoke","filter":{"all":"All links ({{count}})","anonymousOpenable":"Public, no password ({{count}})"},"revokeAll":"Revoke all","revokeSelected":"Revoke selected ({{count}})","selectAll":"Select all","confirmAll":"Revoke all share links?","confirmAllDescription":"Every active share link in this workspace will be revoked. People who received the links won't be able to open them anymore.","confirm":"Revoke","cancel":"Cancel","loadMore":"Load more","revokedOne":"Link revoked","revokedAll":"Revoked {{count}} share link(s)","revokeError":"Couldn't revoke. Please try again."},"advanced":"Advanced settings","delete":{"title":"Delete workspace","description":"Permanently delete '{{name}}' and its related data.","action":"Delete workspace","confirm":{"title":"Delete '{{name}}'?","description":"Deleting this workspace will permanently delete all notes, folders, people information, workspace word memory, and related workspace data in this workspace. This action is irreversible and cannot be recovered.","cancel":"Cancel","confirm":"Delete permanently","deleting":"Deleting..."},"toast":{"success":"Workspace deleted."},"error":{"title":"Couldn't delete the workspace","forbidden":"Only workspace admins can delete this workspace.","notFound":"This workspace couldn't be found. It may already be deleted.","organization":"Organization workspaces must be managed by an organization admin in organization settings.","mobileSubscription":"This workspace has an active mobile subscription. Check the subscription status before deleting it.","unprocessable":"This workspace can't be deleted because of workspace policy or billing status.","tooManyRequests":"Another workspace operation is still processing. Please try again in a moment.","generic":"Something went wrong. Please try again in a moment."}},"readOnlyHint":"Only workspace admins can edit these fields."},"members":{"title":"People","description":"Invite teammates to your workspace. Manage people in your workspace and their roles.","searchPlaceholder":"Search by name or email","inviteMemberButton":"Invite teammate","emailPlaceholder":"Enter email address","sendInvite":"Send invite","inviteProviderHint":"You can only invite emails that can sign in with a Google or Microsoft account.","inviteUnsupportedProviderWarning":"This address isn’t a Google or Microsoft account, so the invite may not work.","inviteDialogTitle":"Invite teammate","inviteDialogDescription":"Invite people to this workspace by email. You can invite several at once.","inviteEmailsPlaceholder":"Enter emails separated by commas or new lines","inviteRoleLabel":"Role","invitePreparedCount":"Invite {{count}}","inviteUnsupportedEmailsWarning":"{{emails}} isn’t a Google or Microsoft account, so the invite may not work.","inviteSentCount":"Invitations were sent to {{count}} email(s).","inviteSomeFailed":"Some invitations failed ({{count}}). Check the email addresses and try again.","invitePaidRoleNotice":"Using seats you’ve already purchased costs nothing extra.\\nIf more seats are needed and automatic purchase is available, you’ll be charged immediately before invitations are sent.","readOnlyHint":"Only workspace admins can manage people.","inviteRequiresTeamPlanTitle":"Switch to the Team Plan to invite teammate","inviteRequiresTeamPlanDescription":"To use Tiro with two or more people, switch this workspace to the Team Plan.","roleColumn":"Role","member":"People","joinedAt":"Joined","memo":"Memo","memoPlaceholder":"Add a memo","clickToAddMemo":"Add a memo","memoUpdateFailed":"Couldn't save the memo","pending":"Pending","currentUser":"You","noSearchResults":"No people to show","removeMember":"Remove","removeMemberTitle":"Remove from workspace?","removeMemberDescription":"{{name}} will lose access to this workspace.","removeMemberButton":"Remove","removeSuccess":"Removed from workspace","removeSuccessDescription":"{{name}} has been removed from the workspace.","removeFailed":"Failed to remove from workspace","removeFailedDescription":"Please try again in a moment.","leaveWorkspace":"Leave workspace","leaveWorkspaceTitle":"Leave this workspace?","leaveWorkspaceDescription":"After leaving, you won't be able to access shared notes or folders in this workspace.","leaveWorkspaceButton":"Leave","leaveOnlyAdminTitle":"Another Admin is required before you can leave","leaveOnlyAdminDescription":"A workspace needs at least one Admin. Make another member an Admin, then try again.","leaveSuccess":"You left the workspace","leaveSuccessDescription":"You no longer have access to this workspace.","leaveFailed":"Failed to leave workspace","leaveFailedDescription":"Please try again in a moment.","roleUpdateSuccess":"Role updated","roleUpdateFailed":"Failed to update role","inviteSuccess":"Invite sent","inviteSuccessDescription":"An invite was sent to {{email}}.","inviteFailed":"Failed to send invite","inviteFailedDescription":"Check the email address and try again.","revokeInvite":"Revoke invite","revokeInviteSuccess":"Invite revoked","revokeInviteSuccessDescription":"The pending invite has been revoked.","revokeInviteFailed":"Failed to revoke invite","revokeInviteFailedDescription":"Please try again in a moment."},"about":{"title":"About","description":"Check the installed version information","version":"Current Version","updateNow":"Update to v{{version}}","latestVersion":"You're on the latest version."},"plan":{"mobilePayment":{"toast":{"title":"Mobile in-app subscriptions can only be changed in the app.","description":"Please try again in the mobile app.","action":"Support Guide"}}},"appearance":{"section":"Appearance","title":"Appearance","description":"Follow your device setting or choose light or dark mode.","system":"System","light":"Light","dark":"Dark"},"general":{"title":"Preferences","description":"Manage your feature settings","language":{"sectionTitle":"Language"},"audioReplay":{"title":"Play Audio by Paragraph","description1":"Listen to the original audio by paragraph.","description2":"※ Audio will be saved — please ask for consent before recording."},"speakerDiarization":{"title":"Speaker Diarization","description1":"Automatically identifies speakers and creates speaker-tagged scripts.","description2":"※ This feature is currently only supported for recording file uploads. It will soon be applied to real-time recordings as well.","learnMore":"Learn More","tooltip":{"title":"How does it work?","step1":"After uploading an audio file and opening the script, automatic tags like 'Speaker A‧B…' will be attached.","step2":"You can change the automatic tags to desired names, and users can also manually separate speakers using the Enter key.","step2Detail":"When users manually tag participants, this information is reflected in custom documents, enabling more accurate document generation.","step3":"It can be used without changing tags separately, and in this case, custom documents are created based on conversation content only."},"litePlanDialog":{"title":"Speaker diarization is available on Pro plans and above","description":"Upgrade your plan to access all Pro features.","upgradeButton":"Upgrade Plan"}},"autoNoteSummary":{"title":"Auto-generate after recording","description":"When a recording ends, create the selected summaries and custom documents in the note's summary language.","summaryTemplates":"Summary templates","documentTemplates":"Custom document templates","selectionStatusSummary":"Selected summary templates will be created automatically.","selectionStatusDocument":"Selected custom document templates will be created automatically.","selectionStatusBoth":"Selected summary and custom document templates will be created automatically.","emptySelection":"Select at least one template to generate automatically.","disabledWithoutTemplate":"Automatic generation was turned off because no templates are selected."},"dataSharing":{"sectionTitle":"Sharing & privacy"},"defaultLinkSharing":{"title":"Default link access","description":{"ANYONE":"When you share a note, “Anyone with the link” is preselected.","COMPANY":"When you share a note, the company-domain scope is preselected.","PRIVATE":"Notes stay private by default — pick a scope in the share dialog when you need a link."},"option":{"anyone":"Anyone with the link","company":"People at my company","private":"Private"}},"notification":{"title":"Notifications","description":"Get calendar-based notifications 10 minutes before your meetings start"},"micDetection":{"title":"Auto-detected meetings","description":"Show notifications when a conversation is detected."},"audioRecording":{"title":"Local audio storage","description":"Automatically save audio files to your local device when recording Real-time Meeting Notes.","tooltip":{"title":"About local audio storage","description":"Local copies of recorded meeting audio are available only on the device of the user who initiated the recording, and are not stored on servers. The 50 most recently recorded meeting audio files are stored on the recorder's device and available to download at any time."},"blockedByOrgPolicy":"Your organization's policy doesn't allow this feature."},"overlay":{"title":"Live indicator","description":"The meeting indicator sits on the right of your screen, and shows when you are transcribing"},"desktopOnly":{"sectionTitle":"Desktop App","description":"Enable all features in the desktop app.","downloadButton":"Download Desktop App"},"toast":{"preferenceUpdateError":"Failed to update preference"}},"devices":{"pageTitle":"Logged-in devices","pageDescription":"See where you're logged in to Tiro and log out of devices you no longer use.","currentDevice":"This device","currentBadge":"Active now","otherDevices":"Other devices","loginAt":"Logged in {{time}}","unknownDevice":"Unknown device","unknownDeviceCaption":"This is an older login. Device details will appear after the next login from it.","mcpSession":"MCP connection","confirmCancel":"Cancel","currentLogout":{"button":"Log out","confirmTitle":"Log out of this device?","confirmDescription":"You'll need to log in again to keep using Tiro on this device.","confirmAction":"Log out"},"revokeAll":{"title":"Log out all other devices","caption":"Logs you out everywhere except this device.","button":"Log out all","legacyTitle":"Log out all devices","legacyCaption":"We can't tell which device is this one, so this logs out every device including this one.","legacyButton":"Log out all","confirmTitle":"Log out all other devices?","confirmDescription":"Every device except this one will be logged out. Anything in progress on those devices will stop shortly.","legacyConfirmTitle":"Log out everywhere, including this device?","legacyConfirmDescription":"This device will be logged out too. Log back in anytime to pick up where you left off.","confirmAction":"Log out all","toast":{"success":"Logged out of all other devices ({{deviceCount}})","none":"No other devices to log out of","error":"Couldn't log out. Please try again in a moment."}},"revoke":{"button":"Log out","confirmTitle":"Log out of the selected device?","confirmDescription":"Anything in progress on that device will stop shortly, and it will need to log in again.","confirmAction":"Log out","toast":{"error":"Couldn't log the device out. Please try again in a moment."}},"list":{"empty":"No other devices are logged in.","errorTitle":"Couldn't load your devices","errorDescription":"Please try again in a moment.","retry":"Try again"}},"integration":{"title":"Integration","description":"Integrate your services to share notes easily. Manage automation in each service's settings.","connect":"Connect","disconnect":"Disconnect","disconnectPopup":{"title":"Disconnect","description":"After disconnect, related features will no longer be available","confirm":"Disconnect","cancel":"Cancel"},"slack":{"title":"Slack","description":"You can share notes to Slack","automation":{"channels":"Channels","searchChannel":"Search Channel","loadingChannels":"Loading channels...","noChannelsAvailable":"No channels available","noSearchResults":"No search results","notConnected":{"title":"Slack Connection Required","description":"Please connect your Slack workspace first. You can easily export notes to Slack channels and set up automatic sharing when recording ends."},"inviteBotGuide":"For private channels, run \`/invite @Tiro\` in Slack to invite the Tiro app."},"toast":{"channelUpdateError":"Failed to update Slack channel","messageSendError":"Failed to send Slack message","disconnectError":"Failed to disconnect Slack"}},"notion":{"title":"Notion","description":"You can save notes to Notion","toast":{"pageCreateError":"Failed to create Notion page","parentUpdateError":"Failed to update Notion parent page","disconnectError":"Failed to disconnect Notion","databaseCreateError":"Failed to create Notion database"}},"googleDrive":{"title":"Google Drive","description":"You can export notes as Google Docs to your Drive","toast":{"disconnectError":"Couldn't disconnect Google Drive.\\nTry again shortly."}},"microsoftTeams":{"title":"Microsoft Teams","description":"Share note links and selected content to a Teams channel or direct message.","authorizationError":{"title":"Admin approval is required","description":"The Microsoft Teams connection stopped.\\nIf you didn’t cancel, a Microsoft 365 admin needs to approve Tiro.\\n\\nCopy the request and approval link below and send them to your admin.\\nTry connecting again after approval.","closeAction":"Do this later"},"adminConsent":{"adminMessage":"[Request for organization-wide approval of Tiro's Microsoft Teams integration]\\n\\nPurpose\\nOrganization approval is required for Tiro users to view teams and channels they have joined and send Tiro notes to a channel or organization member they select.\\n\\nRequested permissions and purpose\\n- User.Read: identify the connected account and basic profile\\n- offline_access: maintain the connection without requiring sign-in each time\\n- User.ReadBasic.All: search organization members to receive a message\\n- Team.ReadBasic.All: list teams the user has joined\\n- Channel.ReadBasic.All: list channels available for selection\\n- ChannelMessage.Send: send a note to the channel selected by the user\\n- Chat.Create: create a one-to-one chat with a member selected by the user\\n- ChatMessage.Send: send a note to the created one-to-one chat\\n\\nAdmin review\\n- The link below opens the organization-wide admin consent screen. Review the app name and permissions before approving.\\n- Tiro does not request permission to read Teams messages.\\n- Please let the requester know whether approval was completed.\\n\\nAdmin consent link\\n{{adminConsentUrl}}","copyAction":"Copy admin approval request","copied":"Admin request and link copied"},"toast":{"disconnectError":"Couldn't disconnect Microsoft Teams.\\nTry again shortly."}},"microsoftTeamsAdminConsent":{"success":{"title":"Your organization has approved Tiro","description":"Members can now connect Microsoft Teams in Tiro.","nextStep":"You can close this window and let the requester know that approval is complete."},"failure":{"title":"Organization approval wasn't completed","description":"Open the approval link again with a Microsoft 365 admin account.","nextStep":"If the issue continues, contact Tiro Support."}},"confluence":{"title":"Confluence","description":"You can save notes to Confluence","toast":{"settingsUpdateError":"Failed to update Confluence settings","pageCreateError":"Failed to create Confluence page","disconnectError":"Failed to disconnect Confluence"}},"hubspot":{"title":"HubSpot","description":"You can upload notes to HubSpot","toast":{"meetingCreateError":"Failed to create HubSpot meeting note","disconnectError":"Failed to disconnect HubSpot","settingsUpdateError":"Failed to update HubSpot settings"}},"salesforce":{"title":"Salesforce","description":"Record notes directly to Salesforce accounts or opportunities.","authorizationError":{"title":"Salesforce connection wasn't completed","description":"If you cancelled sign-in, try connecting again. Otherwise, check that Tiro is installed and your Salesforce admin has approved your access.","notInstalled":"Tiro isn't installed in this Salesforce org. Ask your admin to install it and approve your access, then connect again.","retry":"Try connecting again"},"setup":{"title":"Connect Salesforce","entry":"First connection at your company? View admin setup","action":"Installation and access guide","description":"Your Salesforce admin installs Tiro once for your org and approves user access. Then each person connects their own account.","install":"Install in Salesforce","guide":"View user access instructions","packageNotice":"Package: Tiro · Publisher: ThePlato Inc.\\nThis package has not been reviewed by AppExchange. Check the package and publisher before installing.","notAdmin":"Not a Salesforce admin?","copy":"Copy instructions for your admin","copied":"Admin instructions copied","connect":"Connect after installation and approval","external":"Opens in your browser in a new tab","adminMessage":"Please install Tiro in the Salesforce org we use and approve my access using the guide below. Let me know when it is ready so I can connect my account in Tiro.\\n\\nInstall: {{installUrl}}\\nUser access guide: {{guideUrl}}"},"toast":{"disconnectError":"Couldn't disconnect Salesforce.\\nTry again shortly."}},"automation":{"backToList":"Back to List","integrationSetting":"Integration Setting","slackAutomationDescription":"By connecting your Slack workspace, you can share notes to your desired Slack channel. Click 'Share to Slack' on the note you want to share.","automationSetting":"Automation Setting","automationSettingDescription":"You can create triggers to automatically share notes to your desired Slack channel when you finish recording.","newTrigger":"New Trigger","name":"Name","namePlaceholder":"Trigger Name","when":"When","noteTitle":"Note Title","folder":"Folder","contains":"Contains","notContains":"Not Contains","is":"Is","isNot":"Is Not","in":"In","keywords":"Keywords","selectFolder":"Select Folder","noFoldersAvailable":"No folders available","where":"Where","what":"What","includeShareLink":"Include a share link","shareLinkContents":"Content shown in the share link","directSlackContents":"Content posted directly in Slack replies","addContent":"Add content","removeContent":"Remove content","paragraphSummary":"Summary","transcript":"Script","messages":"messages (optional)","messagesPlaceholder":"Add a custom message to include in the Slack notification","messagesLength":"{{length}}/1000","selectTemplate":"Select Template","selectNone":"Select None","alreadySelected":"Already Selected","creating":"Creating...","save":"Save","loadingTriggers":"Loading triggers...","activate":"Activate","edit":"Edit","delete":"Delete"}},"profile":{"pageTitle":"Profile","pageDescription":"Tell Tiro a little about you and we'll personalize how it captures every meeting. Anything you share becomes context Tiro can use to record more accurately.","basicInfo":"Basic Info","loginMethods":{"sectionLabel":"Login methods","addButton":"Add login method","primaryBadge":"Primary email","freshEmailNote":"You can only connect an email that isn't already signed up with Tiro.","limitToast":"You can have up to 10 login methods per account. Remove one you no longer use first.","lastLoginAt":"{{provider}} · Last signed in {{time}}","attachedAt":"{{provider}} · Added {{time}}","provider":{"google":"Google","microsoft":"Microsoft","apple":"Apple","unknown":"Login"},"list":{"errorTitle":"Couldn't load your login methods","errorDescription":"Please try again in a moment.","retry":"Try again"},"addModal":{"title":"Add login method","description":"Add another way to sign in to this account.","emailComingSoon":"Email login","comingSoonTag":"Coming soon","successToast":"Login method added.","alreadyAttachedToast":"This email is already linked to another Tiro account.","errorToast":"Couldn't add this login method. Please try again."},"detach":{"button":"Remove","cancel":"Cancel","confirmAction":"Remove","confirmTitle":"Remove this login method?","confirmDescription":"Once removed, you can no longer sign in with {{email}} ({{provider}}). You'll need to sign in again.","disabledLastOne":"You can't remove your only login method.","disabledPrimary":"This method is tied to your primary email, so it can't be removed.","toast":{"success":"Login method removed.","notFound":"This login method was already removed or couldn't be found.","error":"Couldn't remove the login method."}}},"name":"Name","email":"Email","language":"Language","moreLanguagesSoon":"More languages coming soon!","account":"Account","upgradePlan":"Upgrade Plan","manageSubscription":"Manage Subscription","logout":"Logout","advanced":"Advanced","deleteAccount":"Delete Account","accountActions":{"plan":{"title":"Current plan","description":"Change plans when you need more usage or collaboration features."},"billing":{"title":"Billing and subscription","description":"Review your plan, billing cycle, and subscription status."},"password":{"title":"Login security","description":"Update the password you use for your Tiro account."},"delete":{"title":"Permanent removal","description":"Delete your account and personal data. This cannot be undone."}},"deleteAccountModal":{"title":"Delete Account","warningDescription":"All your data will be permanently deleted and this action cannot be undone.","confirmEmailLabel":"Please enter your email address to confirm deletion","emailMismatchError":"Email address does not match","cancelButton":"Cancel","deleteButton":"Delete Account","deleting":"Deleting...","inAppPurchase":{"stepTitle":"Before deleting your account, please read carefully","description":"Even if you delete your Tiro account,\\nyour current subscription will not be canceled automatically.\\n\\nTo stop your subscription, you must cancel it directly through the {{store}}.","howToCancelAppStore":"How to cancel your subscription on the App Store","howToCancelGooglePlay":"How to cancel your subscription on Google Play","confirmCheckboxLabel":"I understand that deleting my account does not cancel my subscription, and I have canceled my subscription directly through the store.","nextButton":"Next","prevButton":"Back"}},"profileDescription":"Tiro works best when it knows a little about you. Fill out the information to get the most out of Tiro.","jobTitle":"Job Title","jobTitlePlaceholder":"Founder","aboutYou":"About You","aboutYouPlaceholder":"Add a few words about you, your interests, your working domain...","yourCompany":"Your company","companyName":"Company Name","companyNamePlaceholder":"Google","companyDescription":"Company Description","companyDescriptionPlaceholder":"Add a few words about your company, your business, your products...","changePassword":{"title":"Change Password","description":"Your new password must be at least 8 characters.","otherDevicesNotice":"Changing your password logs you out of all other devices. This device stays logged in.","currentPassword":"Current Password","currentPasswordPlaceholder":"Enter your current password","newPassword":"New Password","newPasswordPlaceholder":"Enter your new password","confirmNewPassword":"Confirm New Password","confirmNewPasswordPlaceholder":"Enter your new password again","change":"Change Password","cancel":"Cancel","validation":{"currentPasswordRequired":"Enter your current password.","newPasswordRequired":"Enter your new password.","passwordMinLength":"Password must be at least 8 characters.","confirmPasswordRequired":"Confirm your new password.","passwordMismatch":"Passwords do not match."},"toast":{"success":"Password changed successfully","otherDevicesLoggedOut":"All other devices have been logged out","error":"Failed to change password"}}},"calendar":{"title":"Calendar Management","addCalendar":"Add Calendar","google":"Google","msOutlook":"MS Outlook","connect":"Connect","notConnected":"Not connected yet","activate":"Activate","myCalendars":"My Calendars","otherCalendars":"Other Calendars","noTitle":"(No Title)","connectionExpired":"Connection Expired","insufficientScope":"Calendar Permission Required","connectionBlocked":"Calendar Access Blocked","reconnect":"Reconnect","disconnectButton":"Disconnect","connectedAccounts":"{{count}} accounts connected","addAccount":"Add Account","welcome":{"title":"Keep forgetting to open Tiro?","subtitle1":"Connect your calendar and","subtitle2":"we’ll remind you 15 minutes before your meetings."},"disconnectDialog":{"title":"Are you sure you want to disconnect your calendar?","cancel":"Cancel","confirm":"Disconnect"},"toast":{"disconnectSuccess":"Calendar has been disconnected successfully","disconnectError":"Failed to disconnect calendar","updateError":"Failed to update calendar settings"},"bannerTitle":"See today’s meetings at a glance","bannerDescription":"Connect your calendar to get started","hideBanner":"Hide"},"person":{"title":"Manage Participants","description":"Save the names and emails of your meeting participants so Tiro remembers them and records more accurately.","error":{"nameOrEmailRequired":"Please enter name or email"},"toast":{"tagAlreadyExists":"This person is already registered. Check the list for the existing person.","tagCreateError":"Couldn't register this person. Please try again.","tagAddError":"Failed to add tag","tagRemoveError":"Failed to remove tag","tagUpdateError":"Failed to update tag"},"add":"Add Participant","empty":"No participants yet. Add one to get started."},"wordMemory":{"title":"Word Memory","description":"Add words that you want Tiro to remember","noWords":"No words added yet","addWord":"Add new word (you can add multiple words separated by commas)","duplicateWord":"This word already exists in your word memory","deleteAriaLabel":"Delete {{word}}","editAriaLabel":"Edit word","editPronunciationAriaLabel":"Edit pronunciation","editNotationAriaLabel":"Edit notation","phonetic":{"errors":{"pronunciationRequired":"Please enter pronunciation","pronunciationInvalid":"Please enter valid pronunciation format (e.g., hiragana, pinyin)","notationRequired":"Please enter notation","notationInvalid":"Please enter valid notation format (e.g., kanji, hanzi)"},"placeholders":{"pronunciation":"Pronunciation (e.g., ひらがな, pinyin)","notation":"Notation (e.g., 漢字, 汉字)"}},"tabs":{"regular":"Regular Words ({{count}})","phonetic":"Phonetic + Notation ({{count}})"},"tooltips":{"regular":"Store words where pronunciation and spelling are the same, such as English proper nouns, names, and brand names.\\nExamples: AI service names like Tiro and ChatGPT, names like Evan and Lucy,\\ncompany names like ThePlato and Microsoft, product names, project names, etc.","phonetic":"Store words in languages where pronunciation differs from notation, such as Japanese and Chinese. \\nExamples: Japanese: ひらがな (pronunciation) - 漢字 (notation)\\nChinese: pinyin (pronunciation) - 汉字 (notation)"},"toast":{"createError":"Failed to add word","updateError":"Failed to update word","deleteError":"Failed to delete word","duplicateError":"This word is already in your word memory"}},"teamWordMemory":{"title":"Workspace Word Memory","description":"This vocabulary is shared with everyone in the workspace. Add proper nouns, people's names, or product names so Tiro can transcribe them accurately.","noWords":"No words added yet","addWord":"Add new word (you can add multiple words separated by commas)","duplicateWord":"This word already exists in your word memory"},"wordPack":{"entryButton":"Add words by field","title":"Field word packs","subtitle":"Pick a field and we'll add the words that usually come out wrong.","packs":{"business":"Business & Economics","law":"Law","medicine":"Medicine & Nursing","engineering":"Engineering","itDev":"IT & Software","marketing":"Marketing & Ads","finance":"Finance & Investing","hr":"HR & People"},"reviewSubtitleAll":"Adding {{total}} words. Words you already have are skipped.","reviewSubtitle":"Adding {{selected}} of {{total}}. Words you already have are skipped.","selectedCount":"{{count}} selected","pairNote":"{{count}} will go to the pronunciation + notation list","submit":"Add to word memory","fallbackHint":"No match for your field? Use 'Upload File' to pull terms from your own material.","selectWord":"Select {{word}}","deselectWord":"Remove {{word}}","toast":{"added":"Added {{count}} words","alreadyAdded":"All of these words are already in your word memory"}},"wordFileUpload":{"upload":"Upload File","title":"Extract keywords from files","subtitle":"Tiro will extract keywords and add them to your word memory.","uploadPrompt":"Upload your files","uploadDragDrop":"Or drag & drop here","supportedTypes":"Supported formats: documents/images/audio/video","maxFileSizeShort":"Up to {{size}}","maxFiles":"Up to {{max}} files","maxExtractedWords":"Up to 100 keywords per file","selectFile":"Select file","selectedAction":"Extract from {{count}} files","extractingInProgress":"Extracting words...","extractedWordsCount":"Extracted words ({{count}})","selectAll":"Select all","deselectAll":"Deselect all","inputPlaceholder":"Enter Manually ↵","manualError":{"inputRequired":"Please enter a word","tooLong":"The word is too long","duplicate":"Already in the list"},"buttons":{"close":"Close","addSelected":"Add selected words","retry":"Try again"},"errors":{"generic":"An error occurred.","extracting":"An error occurred while processing.","addWords":"An error occurred while adding words.","workspaceNotSelected":"Please select a workspace first."},"rejected":{"unableToUpload":"Unable to upload files","tooManyFiles":"You can upload up to {{max}} files at once.","fileTooLarge":"The file is too large (max {{size}}).","invalidType":"Unsupported file type."}},"team":{"stats":{"seatsLabel":"seats","membersLabel":"Members","pendingLabel":"Pending invites"},"member":{"memberList":"People","role":"Role","roleChangeWarning":{"title":"Change to Paid Role?","description":"Changing from <currentRole>{{currentRole}}</currentRole> to <newRole>{{newRole}}</newRole> switches them to a paid role.","billingInfo":"A $29/month paid seat is added, and the amount for the remaining period is prorated and applied to your next invoice.","learnMore":"Learn more","confirm":"Change"}},"quota":{"usage":"Usage","unlimited":"Unlimited","minutesUsed":"minutes used","minutes":"minutes","remaining":"remaining","viewDetails":"View Details","backToBilling":"Plan Management","detailViewTitle":"Usage Details","granularityOptions":{"daily":"Daily","weekly":"Weekly","monthly":"Monthly"},"startDate":"Start Date","endDate":"End Date","usageChart":"Usage","period":"Period","showDataTable":"Show data table","hideDataTable":"Hide data table","loading":"Loading...","noData":"No data available","dateRangeValidation":"Start date must be before end date","memberUsage":"Usage by people","memberName":"Name","noteCount":"Note Count","recordingMinutes":"Recording Minutes","accumulated":"Cumulative","export":{"button":"Export","exporting":"Exporting...","sectionTotals":"Totals for selected dates","sectionTimeseries":"Reports by period","memberBreakdown":"Totals by member","timeseries":"Overall","memberTimeseries":"By member","cumulativeChip":"Cumulative","cumulativeHint":"Cumulative is on.\\nYour CSV will sum the entire selected date range into a single total.","success":"CSV file has been downloaded","error":"Export failed. Please try again"}},"teamPlanActivated":"Team plan activated"},"welcome":{"close":"Close","cta":"Get started","title":"{{planName}} successfully activated for {{firstName}}","userFallback":"you","greeting":"Hello! We warmly welcome you as a paid subscriber to Tiro.","features":{"title":"With your Tiro {{planName}} Plan, you can enjoy these features","lite":{"recording":"<b>300 minutes per month</b> of real-time structured conversation recording with high-quality paragraph summaries","duration":"<b>Unlimited notes</b>"},"pro":{"recording":"<b>1,000 minutes per month</b> of real-time structured conversation recording with high-quality paragraph summaries","duration":"<b>Unlimited notes</b>"},"max":{"recording":"<b>Unlimited</b> real-time structured conversation recording with high-quality paragraph summaries","duration":"<b>Unlimited notes</b>"},"team":{"recording":"<b>Unlimited</b> real-time structured conversation recording with high-quality paragraph summaries","duration":"<b>Unlimited notes</b>","consolidatedBilling":"Consolidated billing and team management","teamWordMemory":"Workspace Word Memory for enhanced accuracy","teamSupport":"Real-time support and dedicated communication channel"},"enterprise":{"recording":"<b>Unlimited</b> real-time structured conversation recording with high-quality paragraph summaries","duration":"<b>Unlimited notes</b>","consolidatedBilling":"Consolidated billing and team management","teamWordMemory":"Workspace Word Memory for enhanced accuracy","teamSupport":"Dedicated account manager and customized service"}},"about":{"tiro":"Tiro was the closest friend of Cicero. and is known as the <b>world's first stenographer</b>. At Tiro, we're building a product that helps people whose lives consist of important conversations to focus more on those crucial moments by recording, structuring, and summarizing conversations with high quality. We named our product Tiro out of respect and commemoration for the first stenographer."},"feedback":{"request":"How are you currently using Tiro? We'd love to hear about your experience in a 20-minute video call to help ensure Tiro perfectly fits your conversation needs. We'd also like to help you make the most of Tiro's various features.","schedule":"Please select a convenient time from our scheduling link","surveyLink":"https://tally.so/r/woxK5b","survey":"Or, you can share your feedback by <a href='{{surveyLink}}' target='_blank'>participating in a 1-minute survey</a>"},"closing":{"thanks":"Thank you for becoming a Tiro customer.","farewell":"Have a wonderful day :)"},"signature":{"name":"Marcus Tullius Tiro","sincerely":"Sincerely, Tiro"}},"referral":{"title":"Gift Tiro and earn up to $8","thinkOfSomeone":"Think of someone who'd get more out of their meetings","eyebrow":"Gift Tiro","badge":"New rewards","headline":"Gift a month of Tiro Pro and get up to $8 off","headlineHighlighted":"Gift a month of Tiro Pro<br />and get up to <hl>$8 off</hl>","emailDivider":"Or send it by email","description":"Earn $3 when they record 10+ minutes, plus $5 after their first paid invoice.","activationRewardTitle":"Earn <amt>$3</amt> after a 10+ minute recording","activationRewardDescription":"Added as soon as they complete it.","paidRewardTitle":"Earn <amt>$5</amt> after your friend's first payment","paidRewardDescription":"Added 7 days after payment.","rewardTiming":"Your rewards are applied automatically starting with your next payment.","termsCaption":"For the full rules on how rewards are earned and used, see the <termsLink>Tiro Gifting Rewards Terms</termsLink>.","linkTitle":"Share your invite link","linkLabel":"Your invite link","linkLoading":"Loading your invite link","linkUnavailable":"We couldn’t load your invite link","rewardAppliedAutomatically":"Friends who sign up with this link can get 1 month of Pro.","name":"Name","namePlaceholder":"Alex Kim","email":"Email","emailPlaceholder":"friend@company.com","emailTitle":"Invite by email","sendInvite":"Send invitation","sendInviteShort":"Send","inviteSendFailed":"We couldn’t send the invitation. Please try again.","shareDirectly":"You can also share this link directly","copyLink":"Copy link","linkCopied":"Link copied","copyFailed":"We couldn’t copy the link. Please try again.","statsTitle":"Your referrals","statsDescription":"See what your invitations have achieved at a glance.","joinedFriends":"Friends who joined","joinedFriendsDescription":"They completed signup through your link.","currentReward":"Available rewards","currentRewardDescription":"Rewards are automatically applied to plan payments made on the web.","rewardLockedCaption":"Rewards can't be applied to subscriptions billed through the app. To switch to web billing, please contact support.","personUnit":"people"},"teamGuide":{"title":"Guide for managing people","description":"Learn how to manage people in your workspace.","tabs":{"roles":"Role Information","invite":"Invite teammate","removal":"Remove from workspace"},"roles":{"title":"There are four roles in a workspace","noteView":"View Notes","noteEdit":"Create & Edit Notes","billing":"Billing","teamManagement":"Team management","billingNote1":"To create and edit notes, you must occupy a paid seat, which incurs charges.","billingNote2":"Unpaid Admins and Viewers cannot create and edit notes and are not subject to billing.","billingNote3":"Admins and Members each use a paid seat at $29 per month.","billingNote4":{"prefix":"For more details, please refer to","link":"this page","suffix":""}},"invite":{"title":"Admin privileges are required to invite teammates","requiredInfo":{"title":"Required Information","emailLabel":"Email","emailDescription":"(An invitation email will be sent)","emailPlaceholder":"marcus@gmail.com"},"optionalInfo":{"title":"Optional Fields","memoLabel":"Memo","memoDescription":"(Department, role, etc.)","memoPlaceholder":"Marketing, Design role"},"process":{"title":"Invitation Process Guide","items":["Once the invitation is sent, the user will receive an email and become a member upon acceptance.","When you invite an additional member, a paid seat is added once they accept, and the charge for the remaining period is prorated and applied to your next invoice.","To send the invitation email again, revoke the pending invite and then invite the person again."]}},"removal":{"title":"Admin privileges are required to remove teammates","afterRemoval":{"title":"What happens after removal","items":["The user is immediately removed from the team plan.","They lose access to shared features like Workspace Word Memory and Team Plan benefits.","The amount already paid for the current billing cycle stays as is. No refund or credit is issued for the remaining period.","The reduced seat count is reflected starting from the next billing date."]},"memberData":{"title":"Removed teammate's data","items":["Notes recorded by the removed teammates remain in their account and are not deleted. Even when removed from the team plan, they can still access their recorded notes.","Shared content (Workspace Word Memory, workspace templates, etc.) remains in the workspace. The removed teammates cannot access shared content.","If they invited other teammates as collaborators on a note, those teammates will still have access to that note."]}},"permissions":{"changeableTitle":"Changeable","conditionTitle":"Condition","possibilityTitle":"Possibility","memberToAdmin":{"condition":"Possible anytime"},"adminToMember":{"condition":"Possible anytime"},"adminToCreator":{"condition":"Email verification required"},"creatorChange":{"title":"Creator Change","condition":"Possible when a teammate leaves or transfers division (Tiro support available if document verification is required)"},"caution":{"title":"Caution","description":"When Creator permission is changed, the existing Creator's role automatically changes to Admin."},"recovery":{"title":"Account Recovery","description":"If a Creator accidentally deletes their account, it can be recovered within 7 days."},"bestPractices":{"title":"Permission Setting Best Practices","items":["<span className=\\"font-medium\\">When creating a workspace</span>, designate the Creator carefully.","<span className=\\"font-medium\\">According to organizational structure</span>, distribute Admin and Member roles appropriately.","<span className=\\"font-medium\\">Before changing permissions</span>, notify them in advance to prevent confusion."]}}},"plans":{"recordingOveragePlanChangeTooltip":"You can't change plans while Additional recording is on.","upgradeCta":{"paid":{"cta":"Upgrade to Team Plan","ctaMax":"Upgrade to Max","ctaPro":"Upgrade to Pro","ctaMaxStart":"Start with Max"}},"lockedForTeam":"When a workspace is shared with others, only the Team Plan is available.","teamUpgradeInAppGuide":{"title":"Team Plan is available only via web checkout","description":"Your individual plan is on a mobile in-app subscription, so you can't start a Team Plan from here. Please try one of the options below.","option1":"Cancel your in-app subscription in the mobile app, wait until it expires, then subscribe to the Team Plan on the web.","option2":"Create a new workspace and subscribe to the Team Plan from there.","option3":"If neither option works for you, please reach out to our support team.","contactSupport":"Contact support"},"currencyToggle":{"label":"Billing currency","usd":"US Dollar (USD)","krw":"Korean won (KRW)","jpy":"Japanese yen (JPY)"},"currencyCheckoutLink":{"lockedFallback":"This account is set to international (USD) billing, so we'll continue in USD."}}}`,
  ),
  N = {
    subscribePlan: "Subscribe to a plan",
    managePlan: "Manage Plan",
    deleteLabelTitle: "Delete Folder",
    deleteLabelMessage:
      "Are you sure you want to delete this folder? Notes with this folder will remain, but the folder will be permanently removed.",
    deleteLabelHasChildrenWarning:
      "This folder has subfolders. You need to delete the subfolders first before deleting this folder.",
    deleteLabelConfirm: "Delete Folder",
    deleteLabelCancel: "Cancel",
  },
  M = JSON.parse(
    `{"removeParticipant":"Remove participant","diarizationFailed":{"title":"Speaker separation couldn't be completed","description":"Your transcript is still available.\\nOpen support in the bottom-right if you need help."},"create":{"failed":"Failed to create note","permissionDenied":{"title":"You don't have recording permission","description":"You don't have permission to create notes or start recording in this workspace. Ask an admin to change your role."},"restrictNonOrgWorkspace":{"title":"You can't create notes in this workspace","description":"You can only create notes in an organization workspace.\\nSwitch to an organization workspace and try again."}},"item":{"label":"Note","collaborators":{"moreCount":"{{count}} more"}},"tooltip":{"close":"Close","openInFullView":"Open in full view"},"endNote":{"button":"End Note","tooltip":"When you end the note, a one-page document will be created.\\nOnce ended, Note cannot be resumed."},"bulk":{"selectedCount":"{{count}} notes selected","more":"More","clearSelection":"Clear selection","deleteAll":"Delete Notes","downloadAll":"Download Notes","download":{"title":"Download","description":"Download <b>{{count}}</b> selected notes","note":"Summary","transcript":"Script","onePager":"One-Pager","success":"{{count}} notes downloaded","error":"Failed to download notes"},"delete":{"title":"Delete","description":"Are you sure you want to delete {{count}} selected notes? This action cannot be undone.","confirm":"Delete","cancel":"Cancel","deleting":"Deleting...","success":"{{count}} notes deleted","error":"Failed to delete notes"},"move":{"title":"Move","description":"Move {{count}} selected notes","selectFolder":"Select a folder","success":"{{count}} notes have been moved","partialSuccess":"{{successCount}} notes moved, {{failCount}} failed","error":"Failed to move notes. Please try again.","workspace":{"empty":"No other workspaces","selectPrompt":"Select a workspace"},"button":{"cancel":"Cancel","move":"Move"}},"action":{"addToFolder":"Add to folder","moveToWorkspace":"Move to workspace"},"addToFolder":{"title":"Add to folders","description":"Add <b>{{count}}</b> selected notes to folders","save":"Save","empty":"No folders yet","success":"Added {{count}} notes to folders","partialError":"Couldn't add some notes to folders","error":"Couldn't add to folders. Please try again."},"moveToWorkspace":{"title":"Move to workspace","description":"Move <b>{{count}}</b> selected notes to another workspace.\\nThey'll be removed from the current workspace.","current":"Current","move":"Move"}},"topbar":{"lang":{"title":"Language settings","listen":"Listen In","listenCaption":"Language spoken by participants","write":"Write In","writeCaption":"Language used for the note","footnote":"Some languages may have lower recognition quality"},"record":{"startRealtime":"Start realtime recording","startRealtimeCaption":"Record conversations in real time and let AI auto-convert them","startOffline":"Start offline recording","startOfflineCaption":"Record without an internet connection and convert it into a note later","uploadFile":"Upload file","uploadFileCaption":"Upload an existing audio file to convert into a note"}},"sidebar":{"title":"Menu","open":"Open menu"},"folder":{"allNotes":"All Notes","trash":"Deleted Notes","sharedNotes":"Shared with me","inbox":"Inbox","inboxDescription":"Notes that have not been assigned to a folder.","privateMasked":"Private folder","accessDenied":{"title":"You don't have access to this folder."},"addToFolder":"Add to Folder","viewerCannotChange":"You can't set or change the folder for a note shared with you","addChip":"Folder","usage":{"warning":"You're nearing your monthly limit"},"upgrade":{"cta":"Upgrade to Pro"},"section":{"private":"PRIVATE","workspace":"WORKSPACE"},"favorites":{"section":"FAVORITES","add":"Add to favorites","remove":"Remove from favorites","loadError":"Couldn't load favorites","toast":{"addError":"Couldn't add to favorites. Please try again.","removeError":"Couldn't remove from favorites. Please try again."}},"expand":"Expand","collapse":"Collapse","teamInviteNudge":{"tooltip":"Invite teammates to your workspace and the notes you've added to workspace folders are automatically shared with them.","cta":"Invite teammates"},"create":{"title":"Create Folder","subtitle":"Use templates below to easily create a folder","titleAndIcon":"Folder Title","namePlaceholder":"Choose a helpful name","description":"Description","descriptionPlaceholder":"Briefly describe the purpose of the folder","access":"Access","create":"Create Folder","cancel":"Cancel","createSubfolderUnder":"Create as subfolder"},"tab":{"info":"Folder Information","automation":"Automation Settings"},"config":{"popover":{"edit":"Folder Settings","view":"Folder Info","delete":"Delete Folder","move":"Move Folder","cannotAccess":"You don't have permission to view this folder info.","cannotAddNote":"You need edit access to this note to add it to a folder","cannotEditFolder":"You need edit access to this folder to add notes","createSubfolder":"Create Subfolder"}},"creator":{"createdByMe":"My Folder","creator":"Folder Creator"},"settings":{"title":"Folder Settings"},"view":{"title":"Folder Info"},"template":{"userInterview":"User Interview","userInterviewDescription":"Systematically organize customer interviews and extract valuable insights","projects":"Projects","projectsDescription":"Centralize project meetings, progress updates, and key decisions in one place","salesMeeting":"Sales Meeting","salesMeetingDescription":"Record sales meetings and client consultations to track performance and outcomes","teamMeeting":"Team Meeting","teamMeetingDescription":"Share and manage regular team meetings and work discussions","oneOnOne":"1-on-1","oneOnOneDescription":"Document individual meetings and feedback sessions to support growth and development","lectureNotes":"Lecture Notes","lectureNotesDescription":"Systematically organize lectures, seminars, and educational content for easy review","coffeeChat":"Coffee Chat","coffeeChatDescription":"Capture informal conversations and networking opportunities"},"access":{"private":"Private","sharedWithDescription":"Shared with specific teammates or external users","sharedBadge":"Shared","allTeamMembersReadonly":"Share with everyone on the team (view-only)","allTeamMembersEditor":"Share with everyone on the team (editor)","specificMembers":"Share with specific teammates","searchMembers":"Search teammates","teamMember":"Team","inviteEmail":"Invite by email","noMembers":"No team members","noSearchResults":"No search results"},"search":{"placeholder":"Search folders","noResults":"No folders found","section":"Folders"},"empty":"No folders","success":{"created":"Folder created successfully","deleted":"Folder deleted successfully"},"move":{"title":"Move {{folderName}}","currentLocation":"Current location","selectLocation":"Select a location to move the folder","button":{"cancel":"Cancel","move":"Move"},"selectedLocation":"Selected location","success":"Folder moved successfully","error":{"circularReference":"Cannot move folder into its own subfolder","notFound":"Folder not found","forbidden":"You don't have permission to move this folder","maxDepthReached":"Folder depth cannot exceed 5 levels","failed":"Failed to move folder. Please try again."}},"error":{"duplicatePersonalFolder":"A personal folder with the same name already exists","duplicateTeamFolder":"A team folder with the same name already exists","createFailed":"Failed to create folder. Please try again.","maxDepthReached":"Cannot create more subfolders at this level"},"automation":{"config":{"success":{"update":"Folder settings have been updated","delete":"Folder settings have been deleted"},"error":{"update":"Failed to update folder settings","delete":"Failed to delete folder settings"}},"description":"You can automate note information and sharing options for each folder.\\nWhen you create a new note in a folder, the information specified here will be applied as default.\\nYou can also set what custom document to automatically generate when the note recording is finished.","noteSettings":"Note Settings","noteTitle":"Title","noteTitlePlaceholder":"Default title for new notes in this folder","participants":"Participants","participantsSearchPlaceholder":"Search by name or email","participantsAdd":"Add","participantsAddAsEmail":"Add as email","participantsAddAsName":"Add as name","participantsSearchNoResults":"No results found","customDocument":"Custom Document","templateSelect":"Select templates","templateSearchPlaceholder":"Search templates","templateSearchEmpty":"No templates found.","selectedTemplates":"{{title}} and {{count}} more","templateSelected":"Selected","templateNotSelected":"Not selected","autoShareSettings":"Auto Share Settings (Optional)","saving":"Saving...","noteSettingsDescription":"Automatically applied when new notes are created in this folder","addTrigger":"Add Integration"},"toast":{"createError":"Failed to create folder","deleteError":"Failed to delete folder","deleteErrorHasChildren":"Cannot delete folder. Please delete the subfolders first.","updateError":"Failed to update folder","noteAddError":"Failed to add note to folder","noteRemoveError":"Failed to remove note from folder","userAddError":"Failed to add to folder","userRemoveError":"Failed to remove from folder","userUpdateError":"Failed to update access","userUpdateNotSharable":"Some notes cannot be shared","userUpdateNotSharableDescription":"This folder includes notes you do not have permission to share. Ask an existing folder owner or editor to change the folder access.","createForbidden":"You don't have permission to create folders. Ask your admin to update your role.","deleteForbidden":"You don't have permission to delete this folder. Ask your admin to update your role.","updateForbidden":"You don't have permission to edit this folder. Ask your admin to update your role.","noteAddForbidden":"You don't have permission to add notes to this folder. Ask your admin to update your role.","noteAddNotePermissionForbidden":"You need edit access to this note to add it to a folder.\\nAsk the note owner to update your access.","noteAddFolderPermissionForbidden":"You need edit access to this folder to add notes.\\nAsk the folder owner to update your access.","noteRemoveForbidden":"You don't have permission to remove notes from this folder. Ask your admin to update your role.","userUpdateForbidden":"You don't have permission to change folder access. Ask your admin to update your role."}},"delete":"Delete","audio":{"toggle":{"tooltip":"Play audio"}},"translate":{"toggle":{"tooltip":"Show translated script"}},"creatorMode":{"note":"Summary","transcript":"Script","withTranscript":"Summary with Script","document":"Document","generateNote":"Generate Document"},"detailTab":{"document":"Document","transcript":"Transcript","summary":"Summary","script":"Script"},"documentTab":{"thisNotesDocuments":"Documents in this note","recommendedTemplates":"Recommended templates","allTemplates":"View all templates","createNewTemplate":"Create new template","regenerateDocument":"Regenerate document","deleteDocumentWithName":"Delete '{{templateName}}' document","deleteLanguageVersion":"Delete this {{language}} version","deleteTemplateDocuments":"Delete all '{{templateName}}' documents","selectTemplate":"Create document","generatedLanguages":"Generated languages","availableLanguages":"Create in another language","deletedTemplateTooltip":"This template was deleted, so you can't regenerate documents from it.","generateDisabledTooltip":"Create a document after the recording ends, or pause once there is conversation content.","showCitations":"Show references"},"documentEmpty":{"activeTitle":"A document will be created when recording ends","activeDefaultDescription":"Auto-created template: {{templateNames}}","activeAutomationDescription":"Documents to be created: {{templateNames}}","activeDescription":"You can review it right after the recording ends.","endedTitle":"Documents are being created","endedDescription":"Documents being created: {{templateNames}}","endedSubDescription":"They'll appear here as soon as they're ready.","configuredTemplates":"folder automation document","noTemplateTitle":"No document is scheduled to be created","noTemplateDescription":"After pausing with conversation content or ending the recording, choose a template from Create document.","pausedTitle":"Create a document from the conversation so far","pausedDefaultDescription":"Auto-created template: {{templateNames}}","pausedAutomationDescription":"Documents to be created: {{templateNames}}","pausedDescription":"You can create a document now and resume recording afterward.","generateNow":"Create document now"},"trash":{"empty":"No deleted notes.","restore":"Restore","permanentDelete":"Delete permanently","permanentDeleteTitle":"Delete this note permanently?","permanentDeleteMessage":"This note will be permanently deleted and can't be restored.","permanentDeleteConfirm":"Delete permanently","deletedOn":"Deleted on {{date}}","daysUntilPurge":"Permanently deleted in {{count}} days","purgeToday":"Scheduled for permanent deletion today","emptyAll":"Delete All","emptyAllTitle":"Permanently delete all deleted notes?","emptyAllMessage":"All deleted notes will be permanently removed. This can't be undone.","emptyAllConfirm":"Delete All","emptyAllError":"Failed to delete all notes"},"list":{"mobileAppDownload":"Mobile App Download","giftTiro":"Gift Tiro and earn up to $8","deleteNoteTitle":"Delete this note?","deleteNoteMessage":"Deleted notes are kept for 30 days. You can restore them anytime during that period.","deleteNoteConfirm":"Delete","deleteNoteCancel":"Cancel","leaveNoteTitle":"Leave this collaborative note?","leaveNoteMessage":"Once you leave, you won't be able to access this note.\\nTo rejoin, you'll need a new invitation from a collaborator.","leaveNoteConfirm":"Leave","leaveNoteCancel":"Cancel","emptyFolder":{"title":"No notes yet.","description":"Add your first note to this folder."},"emptyAllNotes":{"title":"No notes yet.","description":"Start recording to create your first note."},"emptyInbox":{"title":"Your inbox is empty.","description":"Notes that aren't filed into a folder show up here."},"accessDenied":{"title":"You don't have access to this folder.","description1":"As an admin, you can see the folder list, but you cannot view the notes inside.","description2":"To view the notes, please request permission from the folder owner."},"untitled":"Untitled Note"},"shared":{"emptyTitle":"No shared notes yet.","emptyDescription":"When someone shares a note with you, it will appear here."},"search":{"unified":{"placeholder":"Search notes and folders","empty":"Type to search","noResults":"No results found","dateFilter":"Date","allDates":"All dates","foldersSection":"Folders","notesSection":"Notes","hint":{"select":"Select","close":"Close"}}},"audioReplay":{"loading":"Getting audio ready…","expired":"This audio is no longer available because its retention period has ended.","loadError":"Couldn't load this audio. Try again in a moment.","play":"Play","pause":"Pause","seek":"Seek audio","rewind":"Rewind 10 seconds","forward":"Forward 10 seconds"},"paragraph":{"locked1":"During the free trial, you can record up to 50 minutes per note.","locked2":"However, we didn't stop recording for your conversation.","locked3":"If you upgrade your plan, you can access content up to 300 minutes.","locked4":"Don't worry. Only up to 50 minutes will be counted in your free trial usage.","deleteParagraphTitle":"Delete Paragraph","deleteParagraphMessage":"This action is irreversible! For your privacy protection,\\nthis paragraph and all related data will be permanently deleted.","deleteParagraphConfirm":"Delete","deleteParagraphCancel":"Cancel","selectedCount":"{{count}} Selected","deleteSelected":"Delete","cancelSelection":"Cancel Selection","noEditPermission":"You don't have permission to edit this note","selectMode":"Select Paragraphs","selectParagraph":"Select","toast":{"updateError":"Failed to update paragraph"}},"payToUnlock":{"recordingTitle":"You've reached the free recording limit.","trialTitle":"Tiro free trial · D-{{days}}","body":"The rest of the note has <b>script · summary · translation · Ask Tiro · sharing limited</b>.","recordingCta":"Subscribe to unlock","endedCta":"Subscribe to unlock","collapse":"Collapse","expand":"Expand","lockedMinutesTitle":"{{minutes}} min of your conversation is locked.","expandedBody":"The rest of the note can't use <b>summary, translation, Ask Tiro, or sharing</b> yet.","upgradeIntro":"Upgrade to <b>Pro</b> or <b>Max</b> to:","benefit1":"<b>Unlock</b> all <b>locked remarks and decisions</b>","benefit2":"<b>Remove limits</b> on summary, translation, Ask Tiro, sharing","benefit3":"Record up to <b>300 min</b> per note without interruption","benefit4":"Keep the <b>speaker-separated script</b>"},"upgradePlan":"Upgrade Plan","detail":{"context":{"title":"Context","placeholder":"ex: Attending 'Future Trends in AI' webinar by a leading researcher. As a marketer, please explain simply for non-technical professionals, including AI terms with English and Korean translations.","previousContexts":"Previous Contexts","addContextInSummary":"Add Memo in Summary","fileUpload":{"title":"File Upload (Maximum 5)","add":"Attach","dragText":"Upload files here\\npdf, image, text, md, csv","acceptedFormats":"pdf, image, text, md, csv","dragActiveText":"Upload files here","limitReached":"Maximum {{max}} files","uploadSuccess":"File uploaded successfully.","uploadFailed":"File upload failed.","deleteSuccess":"File deleted successfully.","deleteSuccessDescription":"File has been successfully removed.","deleteFailed":"File deletion failed.","deleteFailedDescription":"An error occurred while deleting the file.","limitExceeded":"Maximum {{max}} files can be uploaded.","fileSizeExceeded":"Single file can be uploaded up to 20MB.","pastedImageSuccess":"Image uploaded successfully","pastedImageFailed":"Failed to upload image","delete":"Delete file","pastedImageTooLarge":"Image size is too large (max 20MB)","pastedImageLimitExceeded":"You can attach up to {{max}} files","unsupportedImageFormat":"Unsupported image format","someFilesUnsupported":"Some files were skipped — file type not supported.","toast":{"uploadError":"Failed to upload file","deleteError":"Failed to delete file","clearAllError":"Failed to clear all files"}}},"language":{"write":"Write In","listen":"Listen In"},"microphone":{"blocked":{"title":"Microphone access is blocked","description":"Please enable it in your browser settings and try again."},"unavailable":{"title":"Couldn't start the microphone","description":"Check that your microphone is connected, then close apps that use it, such as Zoom, Google Meet, or Teams, and try again. If it still doesn't work, reconnect your microphone or refresh the page."},"notFound":{"title":"No microphone found","description":"Check that your microphone is connected and selected as an input device, then try again."},"selectedDeviceUnavailable":{"title":"This microphone isn't available","description":"Choose another microphone or check that it's connected, then try again."},"interrupted":{"title":"Microphone connection was interrupted","description":"Please wait a moment and try again."},"browserUnavailable":{"title":"This browser can't use your microphone","description":"Open tiro.ooo directly in a different browser and try again."},"recordingInProgress":"Recording is in progress. Please stop the recording first.","deviceConnected":"{{deviceName}} connected.","gain":"Microphone Gain"},"systemAudio":{"gain":"System Sound","label":"System Audio","tooltip":"Record sounds playing on your computer, such as video calls and videos.","desktopApp":"Desktop App","desktopCTASuffix":" to enable."},"screen":{"blocked":{"description":"Please allow screen sharing permission in system settings and try again.","title":"Screen sharing is blocked!"}}},"summary":{"writing":"Writing...","writingDescription":"Quality improves once a paragraph is written.","retry":"Regenerate Paragraph","toast":{"updateError":"Failed to update summary"}},"share":{"more":"More","scopeRequired":"Adjust the share link's access scope first","scopeRequiredDescription":"Your account's default share scope is set to invite-only, so change the scope to create a share link.","linkDisabled":"Link access is off for this note","linkDisabledDescription":"Choose a share scope to turn the link back on.","link":{"title":"Copy Link","rowTitle":"Share link","stateLive":"Share link is on","stateStopped":"Share link is stopped","stateNone":"No share link","accessTitle":"Scope","anyoneWithLink":"Anyone with link","onlyMyCompany":"People at my company","passwordProtected":"Password protected","disabled":"Link disabled","show":"Show","hide":"Hide","generating":"Generating...","linkCopy":"Copy Link","linkCopyAria":"Copy share link","linkCopied":"Share link copied"},"collaborator":{"title":"Permission Settings","placeholder":"Search by name or email","success":"Invited {{email}} to the note.","failed":"Failed to invite {{email}}. Please try again.","remove":"Remove","button":"Invite","addNewEmail":"Add new email","viewer":"Viewer","editor":"Editor","owner":"Owner","hasBeenRemoved":"has been removed from the note.","inviteAll":"Invite all {{count}} users","noTeamMembers":"No people available","noCollaborators":"No collaborators yet","deleteCollaborator":"Delete Collaborator","teamMembersInviteSuccess":"Successfully invited {{count}} team member(s)","teamMembersInviteFailed":"Failed to invite {{count}} team member(s)","roleUpdateSuccess":"Updated {{email}}'s role to {{role}}","roleUpdateFailed":"Failed to update collaborator role","nonMemberError":"Only teammates can be invited as collaborators","domainNotAllowedError":"User from unauthorized workspace","teamDirectory":"Teammates","add":"Add","noSearchResults":"No results found","currentCollaborators":"Invited teammate","toast":{"updateError":"Failed to update collaborator","deleteError":"Failed to delete collaborator"}},"createLink":{"button":"Share Link","success":"Share link created","failed":"Failed to enable link sharing. Please try again.","linkSharingNotAllowed":"Link sharing is not allowed for this team.\\nPlease contact your administrator.","noteUnavailable":{"title":"Unable to load the note information needed for sharing.","description":"Press Esc to close the current note. Then select it again from the note list and retry sharing."},"networkError":{"title":"Unable to connect to Tiro.","description":"Check your internet connection and try again."}},"includeShareLink":"Attach share link","includeShareLinkCreate":"Create a shared link","includeShareLinkNeedsScope":"Set the shared link's access scope in the note's share settings first.","deleteLink":{"button":"Stop Sharing"},"slack":{"title":"Share to Slack","to":"Send to","searchChannelPlaceholder":"Search for a channel","message":"Message","messagePlaceholder":"Write a message to share with your note...","threadContent":"Content to post in the thread","optionalMessage":"Channel message (optional)","sendContentAsReplies":"Post selected content in a Slack thread","post":"Send to Slack","posting":"Sending to Slack...","success":{"description":"Sent to Slack","open":"View in Slack"},"error":{"description":"Couldn't send to Slack"},"noChannels":"No channels found.","searching":"Loading channels..."},"notion":{"title":"Share to Notion","parentPage":"Destination","destination":"Destination","searchDestinationPlaceholder":"Search for a page or database","page":"Page","database":"Database","contentToInclude":"Content to Include","create":"Save to Notion","success":{"description":"Saved to Notion","open":"Open in Notion"},"error":{"description":"Couldn't save to Notion","blockLimit":{"title":"There's too much content to save to Notion.","description":"Select less content and try again with no more than 100 blocks."}},"noPages":"No results found.","searching":"Searching..."},"googleDrive":{"title":"Export to Google Docs","connectedAccount":"Connected account","destination":"Folder","defaultFolder":"Tiro","willCreateFolder":"We'll create it in My Drive.","selectFolder":"Select folder","selectFolderOpensBrowser":"The folder picker opens in your browser.","saveAsDefault":"Use as default folder","contentToInclude":"Content to include","create":"Export","success":{"description":"Exported to the “{{folder}}” folder","open":"Open in Drive"},"error":{"description":"Couldn't export to Google Docs.\\nTry again shortly."},"picker":{"error":"Couldn't open the folder picker.\\nTry again shortly."},"pickerPage":{"title":"Choose a Google Drive folder","loading":"Opening the folder picker…","returning":"Returning to the Tiro app…","error":"Couldn't open the folder picker. Please try again from the Tiro app.","openApp":"Open Tiro"}},"microsoftTeams":{"title":"Share to Microsoft Teams","destination":"Send to","channelDestination":"Channel","directMessageDestination":"Direct message","team":"Team","channel":"Channel","recipient":"Recipient","selectTeam":"Select a team","selectChannel":"Select a channel","selectRecipient":"Select a recipient","selectTeamFirst":"Select a team first","searchTeam":"Search teams","searchChannel":"Search channels","recipientSource":"Find a recipient","organizationSource":"Organization","recentSource":"Recent chats","organizationDescription":"Search your organization by name or email.","recentDescription":"Find people from recent one-to-one chats, including external contacts. Older chats may not appear.","noRecentChats":"No recent conversations.","noRecentMatches":"No matching people in recent chats.","searchPeople":"Search by name or email","loading":"Loading...","noTeams":"No teams available to share to","noChannels":"No channels available to share to","typeAtLeastTwo":"Enter at least two characters","noPeople":"No matching members","loadError":"Couldn't load the list. Try again shortly.","retry":"Try again","authorizationExpired":"Your Microsoft Teams connection has expired. Reconnect to continue.","reconnect":"Reconnect","reconnectError":"Couldn't reconnect Microsoft Teams.\\nTry again shortly.","channelContentDescription":"Selected content is sent as replies to this message.","directMessageContentDescription":"Selected content is sent as follow-up messages.","summary":"Summary","transcript":"Transcript","post":"Share to Teams","posting":"Sharing...","success":"Shared to Microsoft Teams","open":"View in Teams","destinationPermissionError":"Microsoft Teams won't let you message the selected destination.\\nChoose another channel or person you can message directly.","error":"Couldn't share to Microsoft Teams.\\nCheck the connection and destination permissions."},"confluence":{"title":"Share to Confluence","selectSpacePlaceholder":"Select a space","searchParentPagePlaceholder":"Search for a parent page","create":"Create Confluence Page","contentToInclude":"Content to Include","success":{"description":"Saved to Confluence","open":"Open in Confluence"},"error":{"description":"Couldn't save to Confluence"},"cloud":"Cloud","space":"Space","parentPage":"Parent Page","noPages":"No pages found.","searching":"Searching...","searchSpacePlaceholder":"Search for a space","recentSpaces":"Recent Spaces","otherSpaces":"Other Spaces","noSpaces":"No spaces found","selectCloudPlaceholder":"Select a site","searchCloudPlaceholder":"Search sites","noClouds":"No sites found"},"hubspot":{"title":"Record to HubSpot","meetingTitle":"Meeting Title","companySearch":"Company Search","contactSearchOptional":"Contact Search (Optional)","meetingTitlePlaceholder":"Enter meeting title","companySearchPlaceholder":"Search by company name","contactSearchPlaceholder":"Search by name or email","noCompanies":"No companies found.","noContacts":"No contacts found.","searching":"Searching...","contentToInclude":"Content to Include","note":"Summary","transcript":"Script","connected":"Connected","recording":"Recording...","record":"Record to HubSpot","defaultMeetingTitle":"Meeting Notes","success":{"title":"Recorded to HubSpot","open":"Open in HubSpot"},"error":{"title":"Couldn't record to HubSpot","selectCompany":"Please select a company.","enterTitle":"Please enter a meeting title."}},"salesforce":{"title":"Record to Salesforce","connected":"Connected organization","moreOptions":"More options","subject":"Subject","subjectPlaceholder":"Enter an event subject","event":"Salesforce event","newEvent":"Create a new event","newEventBehavior":"Creates a new event and saves the selected content in its description.","recordAssociationRequired":"Select a customer or prospect record to create this event.","infoUnavailable":"Could not load Salesforce settings. Close this window and try again.","newEventSuccess":"Created a new event and saved the meeting note in its description","noteSavedToDescription":"Saved the note in the event description","noteAttachmentSkipped":"The note couldn't be added to the event","noteAttachmentSkippedDescription":"Ask your admin to check Chatter, Notes, and permissions.","chooseEvent":"Choose an existing or new event","existingEvents":"Existing events","existingEventBehavior":"Keeps other event details and relationships unchanged, and replaces the description with the selected content.","existingEventSuccess":"Updated the existing event description with the meeting note","eventPlaceholder":"Search by event subject","noEvents":"No events found near the recording time.","description":"Description","targetType":"Record to","account":"Account","opportunity":"Opportunity","accountPlaceholder":"Search by account name","opportunityPlaceholder":"Search by opportunity name","searching":"Searching...","enterTwoCharacters":"Enter at least two characters.","noAccounts":"No accounts found.","noOpportunities":"No opportunities found.","noTarget":"Don't link an account or opportunity","keepTarget":"Keep the existing account or opportunity","participant":"Participant (optional)","participantType":"Participant type","contact":"Contact","lead":"Lead","participantPlaceholder":"Search by name","noParticipant":"No participant selected","keepParticipant":"Keep the existing participant","suggestedParticipants":"Suggested from note attendees","participantAutoSelected":"Automatically selected {{name}} as the participant","participantsAutoSelected":"Automatically selected {{count}} note attendees","participantsSelected":"{{count}} participants selected","removeParticipant":"Remove {{name}}","optional":"optional","noParticipants":"No participants found.","leadUsesNoTarget":"Lead events can't also relate to an account or opportunity","retry":"Retry","contentToInclude":"Content to Include","export":"Record to Salesforce","exporting":"Recording...","viewEvent":"Open event","expired":"Your Salesforce connection expired.","reconnect":"Reconnect","error":{"enterDescription":"Enter a description.","contentTooLong":"The description can contain up to 32,000 characters.","search":"Couldn't search Salesforce.\\nTry again shortly.","searchEvents":"Couldn't load existing events.\\nTry again shortly.","export":"Couldn't record to Salesforce.\\nCheck the connection and permissions.","reconnect":"Couldn't reconnect to Salesforce.\\nTry again shortly."}},"pdf":{"title":"Export to PDF","documentTitle":"Document Title","documentTitlePlaceholder":"Enter the title for your PDF document","contentToInclude":"Content to Include","export":"Export","success":{"description":"Exported to PDF"},"error":{"description":"Couldn't export to PDF"}},"email":{"title":"Export via Email","documentTitle":"Subject","documentTitlePlaceholder":"Enter email subject","contentToInclude":"Content to Include","send":"Open Email App","success":"Email app opened","toast":{"nextStepError":"Failed to send next step"}},"share":"Share","title":"Share Note","passwordProtected":"Password protected","linkCopy":"Link Copy","linkPasswordCopy":"Copy Link & Password","linkPasswordCopied":"Share link & password copied","linkCreatedAndCopied":"Share link created and copied","linkCreatedAndCopiedDescription":"You can now share this note using the link.","qr":{"title":"QR code","password":"Password","saveImage":"Save image"},"noteNowPublic":"The note is now public","passwordRemovedMessage":"Password has been removed.","noteNowPasswordProtected":"The note is now password protected.","copyText":"Copy Content","copyNote":"Copy","passwordProtectedNote":"Please enter password to access this note","conferencePasswordHint":"Enter the password shown on the presentation screen","copy":{"success":{"description":"Content copied to clipboard"},"error":{"description":"Could not copy content to clipboard"},"original":"Original","translation":"Translation","textOption":"Copy as text","textDescription":"Copy text content only","htmlOption":"Copy as HTML","htmlDescription":"For pasting in apps like Notion, Slack","markdownOption":"Copy as Markdown","markdownDescription":"Standard markdown format compatible with LLMs, Notion, Obsidian, and more","linkCopied":"Share link copied","withTranscriptOption":"Copy summary with script","withTranscriptDescription":"Copy summary content with script","timestampOption":"Copy with timestamp","timestampDescription":"Copy with start time for each paragraph"},"word":{"title":"Export to Word","contentToInclude":"Content to include","documentTitle":"Document title","documentTitlePlaceholder":"Enter document title","export":"Export","success":{"description":"Exported to Word"},"error":{"description":"Couldn't export to Word"}},"greenhouse":{"export":"Export to Greenhouse","exportToGreenhouse":"Export Summary to Greenhouse","candidateEmail":"Candidate Email","searchByEmail":"Search candidate by email","searching":"Searching...","candidateNotFound":"No candidate found with this email","contentToInclude":"Content to Include","connectedAs":"Connected as","defaultWorkspace":"Default Workspace","emailRequired":"Candidate email is required","exportSuccess":{"description":"Summary sent to Greenhouse","open":"Open in Greenhouse"},"toast":{"credentialSaveError":"Failed to save Greenhouse credentials","noteAddError":"Failed to add Greenhouse note","disconnectError":"Failed to disconnect Greenhouse","settingsUpdateError":"Failed to update Greenhouse settings"}},"selectiveShare":{"contentPath":"{{group}} - {{name}}","limitReached":"You can select up to {{count}} summaries and documents of each type","transcriptTranslationIncomplete":"Some paragraphs aren't translated yet, so you can't share the translation.","transcriptTranslationUnavailable":"This note no longer has a translation, so you can't share the translation. Uncheck it to continue.","transcriptTranslationNoSpeaker":"Translations don't include speaker labels."},"sharedContent":"What to share","shareSettingsUpdated":"Share settings updated","disabled":{"tooltip":"Available after recording starts"},"access":{"title":"Access","linkDescription":{"public":"Anyone with the link can view (read-only)","company":"Only people at your company who sign in can view","password":"Opens only after entering the password","disabled":"Only invited people can access"}},"loginNotice":{"title":"Sign in to view this shared note","description":"This note is shared with company members only. Please sign in with your work account.","invitedDescription":"This note is shared with invited people only. Please sign in with an invited account."},"loadError":{"title":"Something went wrong","description":"We couldn't load this note. Please try again in a moment.","retryButton":"Try again"},"signupCta":{"title":"Tiro, the most accurate AI meeting notes","description":"Real-time summaries and live translation let you speak with confidence, then finish the document you need in three seconds and share it.","button":"Start for free"},"linkOptions":{"title":"Share link settings","subtitle":"Anyone with the link views in read-only","currentSetting":"Current","generalAccess":"Who can view","anyoneWithLink":"Anyone with the link","onlyMyCompany":"People at my company","peopleAtDomain":"People at {{domain}}","peopleAtDomainMore":"People at {{domain}} +{{count}} more","onlyInvited":"Only invited people","companyNeedsDomain":"To share with People at my company, add a company domain in workspace settings.","createCta":"Create share link","selectToActivate":"No share link yet","restrictedByWorkspace":"Some sharing scopes are restricted by your workspace policy."},"linkAccess":{"disabledDescription":"Turning the link back on keeps its address and settings."},"linkRevoke":{"button":"Revoke link","confirmTitle":"Revoke this share link?","confirmDescription":"The current share link will be disabled and can no longer be opened. Sharing again creates a share link with a new address.","cancel":"Cancel","success":"Share link revoked","failed":"Couldn't revoke the share link. Please try again."},"export":{"title":"Export","description":"Send to Slack, Notion, PDF, and more","disabledTooltip":"Pause the recording to export","emptyTooltip":"Nothing to export yet","connect":"Set up connection"},"recording":{"title":"You can't share while recording","description":"Pause the recording to set up share links and invites"},"back":"Back","invite":{"placeholder":"Enter a name or email","roleLabel":"Select role"}},"mobile":{"appGuidePopup":{"text1":"On the web, transcription may stop if the screen is turned off!","text2":"Turn on the screen","text3":"before using it.","dontShowAgain":"Don't show this again","confirm":"Confirm"}},"summaryTemplates":{"title":{"onePager":"One-Pager","meetingMinutes":"Meeting Minutes","salesNote":"Sales Note","lectureNote":"Lecture Note","interviewNote":"Interview","pitch":"Pitch","blogContent":"Blog Content","jobInterview":"Job Interview","oneOnOne":"One-on-One Meeting","coffeeChat":"Coffee Chat","userInterview":"User Interview","pressRelease":"Press Release","shareholdersMeeting":"Shareholders' Meeting","customTemplate":"All Templates","createMyOwn":"Create My Own"},"example":{"onePager":"# Steve Jobs: Starting a Business\\n\\n## Introduction\\nSteve Jobs shares his extensive insights on entrepreneurship, business leadership, and company building, drawing from his experiences with Apple and other ventures. His perspectives cover everything from the initial stages of starting a company to long-term vision and strategic planning, emphasizing the importance of customer focus and maintaining entrepreneurial spirit.\\n\\n## Vision and Leadership\\n- Every business needs a dedicated vision keeper who consistently reinforces the company's direction\\n- The vision must be continuously reiterated through various means, both small and large\\n- Leadership values and decisions are closely observed by employees, especially during challenging situations\\n- Focus and simplicity are crucial: success requires saying \\"no\\" to many opportunities to excel at a few key things\\n\\n## Starting a Company\\n- Initial tasks include fundamental setup requirements:\\n  - Choosing company name and designing logo\\n  - Setting up bank accounts and operational systems\\n  - Establishing infrastructure for parts, accounting, and management information\\n- Primary motivation should not be financial gain\\n- Many entrepreneurs start companies to share their ideas when they can't find other platforms\\n- The first six months typically involve:\\n  - Significant spending with varying degrees of progress\\n  - Transition from honeymoon period to facing regular startup challenges\\n  - Need to deliver quality products with proper market timing\\n\\n## Building an Elite Team\\n- Recruitment prioritizes exceptional talent and passion for technology over just experience\\n- Focus on finding people who understand cutting-edge technology and want to make it accessible\\n- Core team of 10 great people becomes self-regulating for new membership\\n- Simple organizational structure with smart, capable people is preferred\\n\\n## Customer-First Approach\\n- Business development should begin with understanding customer experience\\n- Apple's strategy starts with potential customer benefits rather than available technology\\n- Jobs admits to learning this lesson through previous mistakes of starting with technology first\\n\\n## Product Development and Quality\\n- Management faces critical decisions between quick shipping and quality improvement\\n- Emphasis on stopping to make products great before shipping\\n- Quality control decisions by senior management set standards for entire organization\\n\\n## Planning and Strategy\\n- Practical planning horizon is 3-4 years, with some projects extending to 5 years\\n- Long-term planning (beyond 5 years) has limited value due to rapid technological changes\\n- Companies typically take years to copy successful strategies\\n- Focus on executing few things well rather than attempting many tasks\\n\\n## Personal Philosophy and Success\\n- Finding passion in work is crucial for achieving greatness\\n- True satisfaction comes from doing work you believe in\\n- Persistence is key: \\"keep looking, don't settle\\"\\n- Primary business challenge is survival - not running out of money before market entry\\n\\n## Apple's Journey\\n- Started organically by creating computers for personal use\\n- Expanded from making products for friends to serving 25 million customers\\n- Influence extends beyond direct customer base as other companies follow their lead\\n- Growth driven by enjoyment of the process, inspiring many young entrepreneurs\\n\\n## Conclusion\\nJobs emphasizes that successful businesses stem from passion and vision rather than purely financial motivations. The key to sustainable success lies in maintaining focus, building great teams, prioritizing customer experience, and remaining adaptable while staying true to core values. While the future remains uncertain, the potential to create meaningful change drives entrepreneurial spirit.","meetingMinutes":"# GitLab Weekly Product Marketing Meeting - June 28, 2021\\n\\n## 1. Event Support and Team Sponsorship Restructuring (15%)\\n- Implementation of new go-to-market team sponsorship approach:\\n  - PMM and campaign manager support for events\\n  - Feedback being collected through Slack channels\\n  - Current event support structure identified for improvement\\n  - Bi-weekly sync meetings maintained for coordination\\n- Corporate Events Updates:\\n  - GitOps event canceled following enablement session\\n  - Planned participation in:\\n    - Reinvent CI/CD on Google Next\\n    - GitOps at Kubecon\\n  - Campaign manager commitments needed for upcoming events\\n\\n## 2. Product Announcement Strategy for GitLab Commit Event (25%)\\n- Planning similar to GitLab 14 launch approach:\\n  - Focus on improvements since version 13.0\\n  - Challenge of making announcements with public roadmap\\n  - Development process through Minimum Viable Changes (MVCs)\\n- Feature Development Strategy:\\n  - Review of features developed over past year\\n  - Focus on General Availability (GA) announcements\\n  - Grouping related MVCs (e.g., vulnerability management)\\n- Marketing Materials Development:\\n  - Goal: Three items per stage\\n  - Addition of \\"Manage\\" stage\\n  - Highlighting JIRA integration features\\n  - VS Code integration emphasis on SCM features\\n\\n## 3. Feature Evaluation and Prioritization (20%)\\n- Implementation of 1-3 scale rating system\\n  - Monthly Active Users (MAU) as key metric\\n  - Stack ranking approach for 10+ entries\\n  - Focus on top 5 features from approximately 30 items\\n- Notable Features Discussion:\\n  - Epic Boards release with milestone burndown charts\\n  - VS Code integrations (two community contributions)\\n  - Terraform module transition to official support\\n- UX Improvements:\\n  - Grouping iterations under research-based categories\\n  - Windows 11-style feature announcement structure\\n\\n## 4. Security Features and Competitive Analysis (25%)\\n- Security Scanner Updates:\\n  - Semgrep implementation\\n  - Browzucker DAST scanner (beta) for single page applications\\n  - Vulnerability Management prioritization\\n- Competitive Analysis Structure:\\n  - Three-tier competitor categorization\\n  - Tier 1 competitors focus:\\n    - Azure DevOps\\n    - GitHub\\n    - Atlassian\\n  - Analysis of 10-15 features across platforms\\n  - Market lens approach for honest assessment\\n\\n## 5. Marketing Message Development (15%)\\n- Proposed Slogans:\\n  - \\"Single source of truth, countless possibilities\\"\\n  - \\"All in one for everyone\\"\\n  - \\"End to end control over your software factory\\"\\n- Security Marketing Focus:\\n  - Emphasis on speed with safety\\n  - Integration of quality and security concepts\\n  - Development of software factory security messaging\\n\\n## Action Items:\\n- Select top five features by Tuesday (Owner: Team)\\n- Complete competitor analysis for Monitor and Configure stages (Owner: Samya)\\n- Update messaging framework with approved slogans (Owner: TBD)\\n- Document campaign manager commitments for Kubecon (Owner: Corporate Events team)\\n- Review and finalize design team's new infographic (Owner: William)\\n\\n## Decisions Made:\\n- Adoption of stack ranking system for feature prioritization\\n- Focus on vulnerability management over fuzzing for press coverage\\n- Inclusion of Atlassian in tier one competitor comparison\\n- Implementation of GitLab stages approach for platform organization\\n- Selection of green color scheme for design elements","salesNote":"# Overview\\n\\n* **Meeting Date:** June 12, 2025\\n* **Client Background:** StyleGen, the marketing department of a mid-sized e-commerce company. Led by David Kim, Head of Marketing, the team is currently experiencing inefficiencies due to a fragmented set of tools, including Asana, Google Drive, and Slack. This has resulted in clear business losses, such as 10-15% delays in major campaign launches.\\n\\n# Main Discussion & Client Requirements\\n\\nThe client, David Kim, clearly recognized his team's current problems and presented a specific budget, authority, needs, and timeline for a solution.\\n\\n* **Stated Needs:**\\n    * A centralized platform is needed to prevent project delays by clarifying the campaign approval and feedback process\\n    * Consolidating scattered tools is necessary to reduce the time senior staff waste on manual information gathering\\n\\n* **BANT Framework**\\n    * **Budget:** A budget in the range of **$50-$70 per user per month** is being considered for their team of 30. This budget is benchmarked against other SaaS tools they currently use\\n    * **Authority:** **David Kim is the primary decision-maker** for the solution adoption and budget. However, **final approval from the CTO, Dr. Evelyn Reed, is required** for security and integration compliance\\n    * **Needs:** The core business bottleneck that must be solved is the **10-15% delay in major campaign launches** caused by the current inefficient system\\n    * **Timeline:** There is a hard deadline to **make a final decision within the next two months and complete implementation before the start of Q4** to stabilize the system before the critical holiday season\\n\\n# Key Takeaways\\n\\n## Key Insight\\n\\n**Client Disposition & Purchase Intent:** David shows a strong will to solve the problem and prefers direct discussions. He is judged to be a serious buyer with a clear budget and timeline, not just exploring options\\n\\n**Clear Urgency for Adoption:** He cited a quantifiable loss—\\"10-15% delay in our major campaign launches\\"—and a hard deadline—\\"complete implementation before Q4.\\" This indicates the project has a very high priority\\n\\n**Identification of Dual-Approval Structure:** The final decision requires approval from both the economic buyer, David Kim (Head of Marketing), and the technical approver, Dr. Evelyn Reed (CTO). This means the future sales strategy must be a two-track approach that satisfies both stakeholders\\n\\n**Price Sensitivity & Competitive Landscape:** While no specific competitors were named, he provided a concrete budget range of \\"$50-$70 per user per month.\\" This suggests that the client is evaluating value against the cost of their existing SaaS stack, meaning a clear value proposition for our pricing is required\\n\\n**Key Risk & Response Plan:** The biggest obstacle is the technical approval from the CTO. It is a key task to clearly demonstrate our solution's security and ease of integration with existing systems during the demo process\\n\\n## Action Items\\n\\n* Coordinate with David's assistant to schedule an initial demo for the marketing team within the next week\\n* After the first demo, propose and prepare a second, technically-focused session for the CTO, Dr. Evelyn Reed","lectureNote":"# Physical Training - Running\\n\\n- Lecturer: John Kim (Physical Education Department)\\n- Date: October 31, 2024\\n\\n## 1. Theoretical Foundations of Physical Education (20%)\\n\\nPhysical education requires a balance between theoretical understanding and practical application. While traditional physical education classes emphasize minimal verbal instruction, the lecturer stresses the importance of thorough theoretical explanation followed by consistent practice.\\n\\n- The importance of theoretical explanations in physical education is often underestimated\\n- There are many misconceptions about exercise that need to be addressed\\n- Proper exercise methods require high-level technical understanding\\n- Learning correct movement patterns during development is crucial but challenging\\n\\n## 2. Walking vs. Running: Fundamental Differences (35%)\\n\\nThe distinction between walking and running involves complex biomechanical principles and developmental patterns. Understanding these differences is crucial for proper form and technique development.\\n\\n- Walking requires one foot to remain in constant contact with the ground, as defined in athletic race walking rules\\n- Running involves a series of continuous movements where both feet leave the ground\\n- Children's developmental progression: crawling → standing → walking → running\\n- Children's running form differs from adult running posture, particularly in knee lift\\n- Approximately 80% of students with good motor skills develop proper running form, while others maintain a modified walking pattern\\n\\n## 3. Biomechanics of Running (30%)\\n\\nRunning efficiency depends on proper center of gravity management and mechanical principles, distinguishing it fundamentally from walking mechanics.\\n\\n- The base of support (BOS) is the area between the feet where stability is maintained\\n- Running requires shifting the center of gravity forward, unlike walking where it remains within the body\\n- Efficient running involves minimal force application using mechanical principles\\n- The key movement in running is pushing the ground backward with the legs\\n- Common errors include unnecessary opposing forces and energy waste\\n\\n## 4. Training Environment and Recommendations (15%)\\n\\nThe lecturer provides practical guidance on training environments and equipment choices for optimal running practice.\\n\\n- Outdoor ground running is recommended as the best option\\n- Treadmill running comes second, with potential injury risks due to belt speed differences\\n- Cycling is suggested as a final alternative\\n- Power treadmills are standard in fitness centers, with some facilities offering non-powered options\\n- Injury risk on treadmills often results in vertical jumping movements rather than proper running form\\n\\n---\\n\\n## Key Points of This Lecture:\\n- Running and walking are fundamentally different movement patterns, requiring distinct biomechanical approaches and understanding\\n- Proper running technique involves forward center of gravity displacement, unlike the stable center maintained in walking\\n- Theoretical understanding is crucial before practical application in physical education\\n- Efficient running form minimizes unnecessary force application and focuses on mechanical advantages","interviewNote":"","pitch":"# DoorDash: Revolutionizing Local Food Delivery Services (YC S13)\\n\\n## Market Analysis\\n- Market Opportunity: Over 70% of Americans live in areas without restaurant delivery services\\n- Current Competition:\\n  - Seamless and Grubhub: Only provide menu aggregation without delivery services\\n  - Traditional courier services: Operate without merchant partnerships, resulting in slower and costlier service\\n- Target Market: Initially focused on suburban areas (Palo Alto and Menlo Park) where delivery services are limited primarily to pizza restaurants\\n\\n## Problem Statement\\n- Limited restaurant delivery options in suburban areas\\n- Existing solutions either:\\n  - Lack actual delivery services (menu aggregators)\\n  - Are inefficient and expensive (traditional couriers)\\n- Disconnect between restaurants wanting to offer delivery and lack of infrastructure\\n\\n## Solution/Product\\n- Core Service: Restaurant food delivery within 45-minute guarantee\\n- Technology Infrastructure:\\n  - iPad-based order management system installed at partner restaurants\\n  - Proprietary logistics software for driver network management\\n  - Streamlined driver onboarding process\\n\\n## Business Model\\n- Operational Approach:\\n  - Full control of delivery experience through integrated merchant partnerships\\n  - In-house driver network management\\n  - Direct restaurant partnerships with iPad-based ordering system\\n- **Service Area**: Initially focused on suburban markets, starting with Palo Alto and Menlo Park\\n\\n## Traction and Metrics\\n- Delivery Performance:\\n  - Average delivery time: 44 minutes\\n  - Total deliveries completed: Over 3,500\\n- Growth Metrics:\\n  - Weekly order growth: Over 30%\\n  - Partner restaurant impact: $1.5 million+ in annualized sales generated\\n- Market Position: Successfully operating in challenging suburban environments versus urban-focused competitors\\n\\n## Team\\n- Tony Xu: Co-Founder & CEO, Born in China and immigrated to the US as a child. Educated at UC Berkeley and Stanford University, with work experience at companies including Square\\n- Stanley Tang: Co-Founder & CPO, Born in Hong Kong, studied Computer Science at Stanford University\\n- Andy Fang: Co-Founder & CTO, Computer Science degree from Stanford University\\n\\n### Future Projections and Vision\\n- Expansion Plans:\\n  - Broaden beyond food delivery to general local delivery services\\n  - Develop comprehensive on-demand delivery network\\n- Strategic Vision:\\n  - Position as modern equivalent to FedEx in local delivery space\\n  - Transform traditional overnight/same-day delivery model\\n  - Leverage existing driver network and logistics software for broader delivery applications\\n\\n## Competitive Advantages\\n- Technological Infrastructure:\\n  - Proprietary logistics software\\n  - Integrated restaurant ordering system\\n- Operational Excellence:\\n  - Proven success in challenging suburban markets\\n  - Complete control over delivery experience\\n  - Established merchant partnerships\\n- Market Position:\\n  - First-mover advantage in underserved suburban markets\\n  - Comprehensive solution combining merchant partnerships with logistics","blogContent":"# Marketing in the Age of AI: Opportunities and Challenges\\n\\n# Introduction\\n\\nThe paradigm of digital marketing is rapidly being reshaped around artificial intelligence (AI). While marketing of the past often relied on intuition and experience, today's marketing demands sophisticated strategies based on data and automation. Many marketers feel a sense of excitement about the changes AI will bring, coupled with a vague anxiety about how to adapt.\\n\\nThis post aims to explore how AI is transforming the core elements of marketing through concrete examples and discuss the capabilities that future marketers will need to possess.\\n\\n# Body\\n\\n## The Perfection of Hyper-Personalization\\n\\nAI technology enables **Hyper-Personalization** by analyzing individual customer behavior data and preferences in real-time to deliver tailored experiences. This goes far beyond simply addressing a customer by their name.\\n\\nFirst is **predicting customer behavior**. AI analyzes a user's past purchase history, website navigation paths, and click patterns to predict their next move and recommend the most suitable products or content. Netflix's content recommendation engine is a prime example.\\n\\nSecond is **dynamic content optimization**. Even the same advertisement or email can have its title, images, and copy optimized in real-time depending on the recipient. This allows for the maximization of conversion rates for marketing messages.\\n\\n## Automation and Increased Efficiency in Content Creation\\n\\nThe emergence of **Generative AI** has completely changed the landscape of marketing content creation. It helps marketers focus on higher-value strategic tasks by automating simple, repetitive work.\\n\\nAI can now handle text-based content such as drafting blog posts, brainstorming social media ideas, and creating ad copy. It can even extend to creating simple banner images and videos. This serves as a powerful weapon, especially for teams with limited resources.\\n\\n## Data-Driven Performance Measurement and Prediction\\n\\nAI plays a key role in accurately measuring the performance of marketing campaigns and predicting the future. There is no longer a need to allocate budgets or judge performance based on guesswork.\\n\\nAI-powered analytics tools analyze the Return on Ad Spend (ROAS) for each channel in real-time and automatically reallocate budgets to the most efficient channels. Furthermore, **customer churn prediction models** can identify customer groups at high risk of churning, enabling proactive retention marketing efforts targeted at them.\\n\\n# Transition / Connection\\n\\nUltimately, marketing in the age of AI revolves around three pillars: hyper-personalization, content automation, and data-driven prediction. This signifies that the role of the marketer is shifting from that of an 'executor' to a 'strategist' and an 'operator of AI systems.' The key challenge has become how to leverage the powerful tool of AI to achieve business objectives.\\n\\n# Conclusion\\n\\nIntegrating AI into marketing is no longer an option but a necessity. The important thing is not to follow AI blindly, but to critically accept the analytics and automation it provides and combine them with creative strategies.\\n\\nFuture marketers must possess data literacy along with a sense of responsibility for the ethical use of AI and the protection of customer data. How are you currently using AI in your marketing efforts? Please share your experiences and thoughts in the comments below.\\n\\n# References / Further Reading\\n\\n- **Suggested SEO Title**: \\"A Complete Guide to AI Marketing: 2025 Strategies and Examples\\"\\n- **Meta Description**: \\"Discover how AI is transforming marketing through hyper-personalization, generative AI, and data prediction. Learn the essential skills for future marketers.\\"\\n- **Related Keywords**: AI Marketing, Digital Marketing, Hyper-personalization, Generative AI, Data-Driven Marketing, MarTech\\n- **Suggested Internal Links**: Posts on Growth Hacking Strategies, How to Use Data Analytics Tools, Content Marketing Case Studies\\n- **External References**: Marketing AI Institute, Gartner Marketing Reports, HubSpot Blog","jobInterview":"# Date & Participant Details\\n\\n* **Interview Date:** June 12, 2025.\\n* **Participants:**\\n    * **Interviewer(s):** David (Hiring Manager, DataDrive).\\n    * **Candidate:** Emily (Applicant for Sales Manager Position).\\n\\n# Interview Objectives & Candidate Profile\\n\\n* **Purpose of the Interview:**\\n    * To comprehensively evaluate applicant Emily's past sales performance, strategic thinking, and leadership potential for the Sales Manager position. The key goal was to verify her ability to establish and execute data-driven sales strategies.\\n\\n* **Candidate Background:**\\n    * An experienced B2B enterprise sales professional with a background at Innovate Inc. (이노베이트 주식회사). She demonstrates a high level of understanding of the full sales cycle and is skilled at systematically explaining her experience using the STAR (Situation, Task, Action, Result) method. She provides data-driven answers and shows deep interest in the company based on prior research.\\n\\n# Interview Q&A Note\\n\\n**Career & Performance Review**\\n\\n* **(Q):** Could you walk me through your experience at Innovate Inc.?\\n* **(A):** She was in charge of enterprise sales for B2B software solutions. She stated that she primarily used a consultative approach to solve customer problems rather than just selling products.\\n\\n* **(Q):** What was your most significant sales achievement there?\\n* **(A):** She cited landing a major enterprise client, Globex Corp. (글로벡스 코퍼레이션). It was a six-figure deal that resulted in a 20% increase in her team's quarterly revenue. She explained her strategy involved identifying the key decision-maker and approaching them with a custom value proposition.\\n\\n**Failure Experience & Learnings**\\n\\n* **(Q):** Tell me about a time you failed to meet your sales quota. What was the problem, and what did you learn?\\n* **(A):** She shared an experience from Q2 of last year when she missed her target by 10% after relying too heavily on a single large deal that fell through at the last minute. She said she learned the importance of **pipeline diversification** from this. Afterwards, she introduced a **weighted pipeline tracking system** to her team to manage risk and improve forecast accuracy, showing she grew from the failure.\\n\\n**Strategic Thinking & Planning**\\n\\n* **(Q):** What do you see as DataDrive's biggest market opportunity, and how would you approach it in your first 90 days if you were hired?\\n* **(A):** She answered based on her prior research. She identified the **'mid-market financial services' sector** as the biggest opportunity, which she believes is currently underserved by DataDrive.\\n    * **First 30 days:** Understand the current situation through internal data analysis and interviews with the product and marketing teams.\\n    * **Days 31-60:** Develop a targeted sales strategy and outreach messaging tailored to the target customers.\\n    * **Days 61-90:** Launch a pilot program with a small team to test market response and create an expansion plan upon success.\\n\\n**Candidate's Questions**\\n\\n* **(Q):** What are the biggest challenges the sales team is currently facing?\\n* **(A):** (Interviewer's answer) The main challenge right now is successfully expanding from our existing small-to-medium business (SMB) customer base to larger, mid-market clients.\\n\\n* **(Q):** How do you measure success for this role beyond the sales quota?\\n* **(A):** (Interviewer's answer) Team member growth and coaching ability, the accuracy of quarterly sales forecasts, and collaboration with other departments (Marketing, Product) are also important success metrics.\\n\\n* **(Q):** What is the team culture like?\\n* **(A):** (Interviewer's answer) We have a collaborative culture that respects individual autonomy while communicating transparently based on data.","oneOnOne":"# 1 on 1 Meeting\\n\\nThis regular one-on-one session was held to address team member Yujin's recent concerns about career stagnation and to collaboratively explore concrete opportunities for his role expansion. While Yujin is performing excellently on the current Project Phoenix (피닉스 프로젝트), he expressed a desire to move beyond repetitive tasks and a clear ambition to contribute to the initial product planning stages.\\n\\n# Discussion\\n\\n* **Career Growth & Role Expansion Concerns**\\n    * Yujin candidly shared that while he is satisfied with his current work, he feels his role is becoming repetitive\\n    * He showed strong motivation to move beyond just visualizing defined plans and to participate in shaping the 'Why' of the product\\n    * **Q:** What specific areas would you like to contribute to?\\n    * **A:** He expressed a desire to participate in the very early stages of planning, such as analyzing user research findings, identifying problems, and brainstorming new feature ideas\\n\\n* **Proposing New Opportunities & Solutions**\\n    * To support his growth ambitions, I proposed that he join the initial planning workshop for Project Odyssey (오디세이 프로젝트), which is scheduled to start next quarter\\n        * This will be a great opportunity to work with PMs and developers from the very beginning to define customer problems and debate the 'Why'\\n    * I also suggested connecting him with Lia (리아) from the Data Team to strengthen his data analytics skills, to which he responded positively\\n\\n* **Feedback & Encouragement**\\n    * I praised his excellent attention to UI detail demonstrated in Project Phoenix (피닉스 프로젝트)\\n    * I emphasized that this meticulousness could be a significant strength in the planning phase, boosting his confidence for the new challenge\\n\\n# ## Action Items\\n\\n* **Min-jun / Manager**\\n    * **Description:** Arrange a meeting for Yujin with Lia from the Data Team\\n    * **Deadline or Next Checkpoint:** By early next week\\n    * **Description:** Officially invite Yujin to the Project Odyssey (오디세이 프로젝트) initial planning workshop\\n    * **Deadline or Next Checkpoint:** Immediately upon confirmation of the workshop schedule\\n\\n* **Yujin / Team Member**\\n    * **Description:** Research the problem space for Project Odyssey (오디세이 프로젝트) and prepare 2-3 initial hypotheses or ideas\\n    * **Deadline or Next Checkpoint:** Before the first planning workshop\\n    * **Additional Notes:** Can request necessary data support from the Data Team meeting with Lia\\n\\n# Next 1 on 1\\n\\n* **Key Follow-up Topics**\\n    * Discuss the outcomes and learnings from the meeting with the Data Team\\n    * Review and build upon the initial research and ideas for Project Odyssey (오디세이 프로젝트) together\\n\\n* **Career Development Discussion**\\n    * A (Current): Focused on design execution of defined plans\\n    * B (Goal): Expand role to participate in problem definition and planning phases\\n    * **How:** Will support him in experiencing the actual planning process through participation in Project Odyssey (오디세이 프로젝트) and help him build data-driven decision-making skills\\n\\n* **Trust & Motivation Management**\\n    * **Situation:** Expressed feelings of stagnation due to repetitive work and a desire for growth\\n    * **Plan:** Proactively provide role expansion opportunities → Connect Yujin's growth ambitions with team performance\\n    * **Expected Benefit:** Boost motivation and strengthen the trust between him and the manager. The next 1-on-1 will focus on his feelings and any difficulties experienced while participating in Project Odyssey","coffeeChat":"# Overview\\n\\n* **Date:** June 11, 2025\\n* **Participants:**\\n    * **Sujin Park:** Organizer, 3rd-year Brand Marketer at a large corporation.\\n    * **Jihun Kim:** Professional, 5th-year Senior PMM (Product Marketing Manager) at an IT startup.\\n* **Purpose:**\\n    * For career advice and networking regarding a transition from a corporate marketer to a PMM at an IT startup.\\n* **Background:**\\n    * The organizer (Sujin) reached out to the professional (Jihun) via LinkedIn after being impressed by his career story. This meeting was arranged to discuss realistic information about the IT industry, the PMM role, and how to prepare for such a career change.\\n\\n# Discussion & Notes\\n\\n### Comparing Roles: Corporate Marketer vs. Startup PMM\\n\\n* **Q: What is the biggest difference between being a marketer at a large corporation and a PMM at a startup?**\\n    * **A (Summary of Jihun's answer):** It can be compared to the difference between \\"following a set path\\" and \\"creating the path yourself.\\"\\n    * **Corporate Marketer:** The role is stronger in managing brand messages and operating campaigns within established processes and large budgets.\\n    * **Startup PMM (Product Marketing Manager):**\\n        * **End-to-End Ownership:** Responsible for everything from A to Z, starting from market research and customer definition to the success of the product.\\n        * **Close Collaboration:** The role of communicating constantly with Product, Engineering, and Sales teams to align on product direction and convey the voice of the customer is crucial.\\n\\n### Startup Culture and Work Environment\\n\\n* **Q: What is the organizational culture and work-life balance like at a startup compared to a large corporation?**\\n    * **A (Summary of Jihun's answer):** It varies greatly by company and stage, but there are common traits.\\n    * **Pros:** Flat hierarchy, quick decision-making, and the satisfaction of seeing one's individual contributions directly impact business results.\\n    * **Cons:** Processes can be lacking, and role boundaries are often ambiguous. It can be high-pressure due to its results-oriented nature.\\n    * **Key Point:** It's often closer to **'Work-Life Blending'**, where work hours and locations are flexible, rather than a strict 'work-life balance' with fixed hours.\\n\\n### Essential Skills for a PMM Transition\\n\\n* **Q: What skills should I start preparing now to become a PMM?**\\n    * **A (Summary of Jihun's answer):** You should build skills centered around the two keywords: 'Data' and 'Customer'.\\n    * **Data Analytics Skills:**\\n        * SQL proficiency can be a very powerful weapon.\\n        * In-depth use of tools like Google Analytics is essential for analyzing user behavior, forming hypotheses, and testing them.\\n    * **Proactive Problem-Solving Skills:**\\n        * Strongly recommends doing a **'Side Project'**.\\n        * (Example: Running a small community, creating a newsletter and analyzing subscriber engagement).\\n        * **Expected Benefit:** By experiencing the full cycle of 'hypothesis → execution → data review → improvement' yourself, you can create a powerful narrative for interviews and give the impression of being a proactive individual.\\n\\n### Strategy for Job Change Interviews and Portfolios\\n\\n* **Q: What is the PMM interview process usually like, and how should I prepare a portfolio?**\\n    * **A (Summary of Jihun's answer):** The focus is more on verifying experience and problem-solving skills rather than technical skills.\\n    * **Interview Process:** After the resume screening, it's common to have in-depth questions about past experiences in interviews with the working team, and they often give take-home assignments or conduct case interviews based on specific situations.\\n    * **Portfolio Strategy:**\\n        * It should be structured around the process of **'how you solved what problem'** rather than just listing flashy deliverables.\\n        * It is crucial to clearly present **quantitative results (KPI achievement rate, conversion rate improvement, etc.)** for every project with numbers.\\n        * A side project experience can be the most powerful differentiator in a portfolio.\\n\\n### The Appeal of the PMM Role & Final Advice\\n\\n* **Sujin's Motivation:** Feels the most attraction to the experience of having her planned messages or campaigns directly influence product improvements and seeing immediate user feedback.\\n* **Jihun's Final Advice:**\\n    * The immediate feedback and fast cycles are the biggest charms and driving forces of a startup.\\n    * It is much more important to have the attitude of learning by doing and jumping in, rather than trying to be perfectly prepared before making a move. He encouraged her not to hesitate and to take on the challenge.","userInterview":"# Overview\\n\\n* **Interview Date:** June 12, 2025\\n* **Participant Info:**\\n    * **User:** Mark\\n    * **User Type:** A working professional in his 30s who cooks at home 3-4 times a week or more\\n    * **Primary Goal:** To find recipes for weeknight and weekend meals and to manage groceries efficiently\\n    * **Environment:** Mobile app\\n\\n# Discussion & Notes\\n\\n### Pain Points\\n\\n* **Chaotic Meal Planning:** Described his process as \\"very chaotic.\\" With no clear plan, he decides on menus spontaneously, leading to a repetitive cycle of the same few meals like spaghetti or tacos, which becomes boring\\n* **Fragmented Shopping Process:** The process of finding a recipe online, noting down necessary ingredients, checking the fridge, and then creating a final shopping list is all disconnected, which is cumbersome and time-consuming\\n* **Food Waste & Duplicate Purchases:**\\n    * Often has to buy ingredients in larger quantities than needed for a recipe (e.g., a whole bunch of parsley), leading to the rest wilting in the fridge\\n    * Mentioned frequently making mistakes like buying an ingredient he already has at home (e.g., olive oil) because he forgot to check\\n\\n### Positive Feedback\\n\\n* **Intuitive UI:** Described his first impression of the app as \\"clean.\\" He reacted positively, saying that categories on the home screen like \\"Under 30 minutes\\" made it easy to understand what he could do\\n* **Shopping List Automation Feature:** Reacted to the \\"Add all ingredients to shopping list\\" button by saying, \\"this is cool.\\" He expected this to be a key feature that would directly solve his biggest problem\\n* **Convenient Usability:** Responded positively to intuitive features such as the auto-categorization of ingredients in the shopping list (e.g., 'Produce', 'Pantry') and the ability to easily delete items with a swipe gesture\\n\\n### Suggested Improvements\\n\\n* **Leftover Ingredient Recipe Feature:** He gave a very specific idea: \\"it would be cool if, after I make a recipe, the app could help me find another recipe that uses the leftover ingredients, like that bunch of parsley.\\" This seems to stem from a strong need to solve the food waste problem\\n\\n# Key Takeaways\\n\\n* **Core Insight 1: The user's real pain point lies in the 'grocery management' stage**\\n    * **Rationale:** The user's biggest frustrations were not in finding recipes, but in the subsequent processes of creating a shopping list and dealing with ingredient waste. His specific anecdotes about the \\"duplicate purchase of olive oil\\" and \\"leftover parsley wilting\\" clearly support this\\n    * **Recommended Action:** We should position our app's core value as **'intelligent grocery management and waste prevention'**, rather than just 'recipe discovery'. Marketing should highlight the 'shopping list automation' as a key feature, and the development of a 'leftover ingredient recipe' feature should be considered a high priority\\n\\n* **Core Insight 2: Users are most satisfied with 'intuitive time-saving', not complex features**\\n    * **Rationale:** The user reacted most positively to simple, intuitive functions that saved him time immediately without a learning curve, such as 'auto-categorization of the shopping list' and 'swipe-to-delete'\\n    * **Recommended Action:** When planning new features, we should prioritize intuitive solutions that definitively reduce user effort over adding complexity, ensuring we maintain the current successful user experience","pressRelease":"","shareholdersMeeting":"# Financial Statements and Accounting Approval\\n\\nAt the 15th Annual General Meeting of Shareholders held on March 21, 2025, the financial statements and the statement of appropriation of retained earnings for the 15th fiscal year were approved as originally proposed.\\n\\n* **Key Financial Data:**\\n    * Revenue: KRW 2 trillion\\n    * Net Profit: KRW 50 billion\\n* **Dividend Details:**\\n    * A cash dividend of KRW 500 per common share was approved.\\n* **Voting Results:**\\n    * Agenda Item 1: Approval of the 15th Fiscal Year Financial Statements and Statement of Appropriation of Retained Earnings **(Approved)**\\n\\n# Business Performance (Operational Report)\\n\\nCEO Park Ji-sung presented the major business achievements and strategic direction for the past fiscal year.\\n\\n* **Key Achievements:** The flagship electric vehicle model, 'Aether', sold a total of 50,000 units, and the company achieved a significant financial milestone by recording its **first-ever positive operating income since its founding**.\\n* **Global Expansion:** A global sales network was established and brand awareness was increased through a successful entry into the European market.\\n* **Core Investments & Partnerships:** A strategic partnership was formed with 'Solid State Inc.' to secure next-generation battery technology and stabilize the supply chain.\\n* **Technology Development:** The autonomous driving software, 'Odyssey OS', is undergoing continuous data accumulation and advancement with a primary focus on safety.\\n\\n# Agenda Items and Voting Results\\n\\nAll agenda items presented were approved as originally proposed with the consent of the shareholders.\\n\\n* Agenda Item 1: Approval of the 15th Fiscal Year Financial Statements and Statement of Appropriation of Retained Earnings **(Approved)**\\n* Agenda Item 2: Appointment of Director (Appointment of Outside Director Kim So-yeon) **(Approved)**\\n* Agenda Item 3: Approval of Director Compensation Limit (Total of KRW 3 billion) **(Approved)**\\n* Agenda Item 4: Amendment to the Articles of Incorporation (Regarding Dividend Record Date) **(Approved)**\\n\\n# Q&A\\n\\nThe following key discussions took place during the Q&A session with shareholders.\\n\\n* **Q: What specific impact will the battery partnership with 'Solid State Inc.' have on future production costs?**\\n    * **A:** This is a collaboration for joint development, not just supply. We expect to reduce long-term battery internalization costs by more than 20% and significantly enhance our cost competitiveness by securing a stable supply chain.\\n\\n* **Q: What is the company's position on concerns that the development speed of the autonomous driving software 'Odyssey OS' is slow compared to competitors?**\\n    * **A:** The company's primary development philosophy is 'safety' over speed to market. We are advancing its stability based on millions of kilometers of real-world driving data and plan to introduce advanced driver-assistance features in a large-scale update in the second half of this year.\\n\\n# Key Takeaways\\n\\nThe following are three key points from this year's Annual General Meeting that warrant special attention.\\n\\n1.  **Achieved First-Ever Operating Profit:** This is a highly significant achievement that proves sustainable growth and establishes a foundation for financial stability. It will act as a positive signal for future investments and business expansion.\\n2.  **Secured Next-Gen Battery Supply Chain:** The strategic partnership with 'Solid State Inc.' is a critical strategic decision to simultaneously secure a competitive edge in both battery technology and cost, which are key to the future EV market.\\n3.  **Reaffirmed Safety-First Technology Philosophy:** Amid the autonomous driving technology race, the company has once again emphasized its firm development philosophy of prioritizing 'safety'. This will contribute to building long-term brand trust.","customTemplate":""},"form":{"title":"Template Title","sample":"Sample","sampleDescription":"💡 Tip: Instead of a URL, please paste the original text here. Include the completed version of the text in the format you want.","samplePlaceholder":"# Steve Jobs: Starting a Business\\n\\nSteve Jobs emphasizes passion, vision, and customer focus in entrepreneurship.\\n\\n- Vision: Keep the company's direction clear; focus on key goals.\\n- Starting Up: Set up essentials; financial gain shouldn't be the main drive.\\n- Team Building: Hire talented, passionate people; simple structures work best.\\n- Customer Focus: Prioritize customer experience over technology.\\n- Quality: Aim for excellence before shipping; leadership sets standards.\\n- Strategy: Plan for 3-4 years; execute a few things well.\\n- Philosophy: Find work you're passionate about; persistence is vital.\\n- Apple's Journey: Grew from personal projects to influencing millions.\\n- Conclusion: Success comes from passion, vision, and core values.","saveTemplate":"Save Template","generateNote":"Generate Note with Template"},"delete":{"title":"Delete {{templateTitle}}","description":"Are you sure you want to delete this document? This action is irreversible.","confirm":"Delete","cancel":"Cancel","success":"Document deleted successfully.","error":"Failed to delete document. Please try again."}},"participants":"Participants","participantsMore":"More","manageParticipants":"Manage Participants","addParticipants":"Add participants","addParticipantButton":"Add participant","createParticipant":"Create","addAsName":"Add as name","addAsEmail":"Add as email","currentParticipants":"Current participants","noSuggestedParticipants":"No suggested participants","script":{"view":"View script","hide":"Hide script"},"editor":{"updateDescription":"Your changes have been saved"},"writing":{"message1":"tiro is analyzing conversation to enhance the quality","message2":"tiro is weaving words into wisdom","message3":"tiro is distilling the discussion","message4":"tiro is crafting your story"},"peek":{"viewDetail":"Open in full page","viewDetailAria":"View note in full screen"},"menu":{"options":"Options menu"},"initialContext":{"description":"Providing context such as the conversation setting, topics discussed, and proper nouns significantly enhances the accuracy of your notes.","examples":"Examples:\\n - Conversation setting: Steve Jobs' Stanford Commencement Speech\\n - Topics: Connecting The Dots, Love and Loss, About Death\\n - Proper nouns: Steve Jobs, Apple, Life and Death, Pixar","titleAndParticipants":"Enter title and participants","preMemo":"Any pre-meeting notes? Adding topics, company/product names, people's names, and context will improve recording quality.","startWithRedButton":"Press the red button to start recording with Tiro!"},"action":{"delete":"Delete Note","deleteAria":"Delete note","addToFavorites":"Add to favorites","moveToWorkspace":{"label":"Move to workspace","loading":"Loading workspaces...","empty":"No other workspaces","success_one":"Moved to {{workspaceName}}","success_other":"Moved {{count}} notes to {{workspaceName}}","error":"Couldn't move the note. Please try again.","notEnded":"End the note recording before moving it to another workspace.","restrictNonOrgWorkspace":"Notes can't be moved into this workspace.","disabledRole":{"badge":{"viewer":"Viewer","unpaidAdmin":"Unpaid admin"},"tooltip":"You have the {{role}} role in this workspace, so you can't move notes here. Ask a workspace Admin for the Member or Admin role."},"toast":{"allFail":{"title":"Couldn't move notes","notOwner":"Shared notes can't be moved to another workspace. You can only move notes you created.","notEnded":"Notes that are still recording can't be moved. End the recording and try again.","recording":"Notes that are still recording can't be moved. End the recording and try again.","notFound":"Some notes were deleted or can't be found. Refresh the list and try again.","mixed":"There are {{causes}}. Check those notes and try again.","unknown":"Please try again. If this keeps happening, contact support."},"partial":{"title":"Moved {{count}} notes","notOwner":"{{count}} couldn't be moved because they're shared notes. You can only move notes you created.","notEnded":"{{count}} couldn't be moved because they're still recording. End the recording and try again.","recording":"{{count}} couldn't be moved because they're still recording. End the recording and try again.","notFound":"{{count}} couldn't be moved because they were deleted or can't be found. Refresh the list and try again.","mixed":"{{count}} couldn't be moved. There are {{causes}}. Check those notes and try again.","unknown":"{{count}} couldn't be moved. Please try again."},"cause":{"notOwner":"shared notes","notEnded":"notes still recording","recording":"notes still recording","notFound":"deleted or missing notes"},"causeJoin":{"two":"{{first}} and {{second}}"}}}},"documentTemplates":{"tiro":"Tiro","description":"Description","descriptionPlaceholder":"Describe the desired characteristics of the document, such as purpose, context, domain, tone, and voice.","untitledTemplate":"Untitled Template","sectionCopy":"Copy Section","deleteSection":"Delete Section","sectionTitle":"Section Title","sections":"Sections","addSection":"Add Section","sectionTypes":{"plainText":"Plain Text","actionItems":"Action Items","qna":"Q&A","example":"Example"},"sectionPlaceholders":{"plainText":"Describe the output format you want Tiro to create for this section.\\nExample 1: Summarize the entire content in one paragraph.\\nExample 2: Derive action items organized by future timeline.","actionItems":"Describe the type or format of action items you want to generate in this section.\\nExample 1: Summarize the discussed items in a to-do list format.\\nExample 2: Highlight high-priority tasks based on the conversation.\\nExample 3: Suggest specific action items that can be executed this week.","qna":"For structured conversations like sales interviews or expert interviews with predefined questions, enter each question as a separate section. Tiro will comprehensively summarize the responses and discussions for each entered question.","example":"If you have a document you'd like to use as an example, paste it here. Tiro will carefully analyze its format and create a similar document for you.\\nYou can paste the entire document into one section, or if you'd prefer clearer structure, feel free to split it into separate sections as you like."},"delete":{"title":"Delete {{templateTitle}}","description":"Are you sure you want to delete this document? This action is irreversible.","confirm":"Delete","cancel":"Cancel","success":"Document deleted successfully.","error":"Failed to delete document. Please try again."}},"speakerLabeling":{"searchPlaceholder":"Search or add participants...","scope":{"current":"Current section only","fromThis":"From this section","entire":"Entire sections"},"applying":"Applying","apply":"Apply","toast":{"speakerUpdateError":"Failed to update speaker","segmentSplitError":"Failed to split segment","segmentMergeError":"Failed to merge segment"}},"multilingual":{"title":"Conference Mode","backToNote":"Back to Note","disabledHint":"Only available when capturing a Multi-language conversation. Switch Listen In to Multi-language to enable.","scrollHint":{"jumpToLive":"Jump to live"},"recording":{"pause":"Pause","resume":"Resume","start":"Start","preparing":"Preparing"},"translation":{"label":"Translation","toggleAriaLabel":"Show translation","notConfigured":"No translation language set"},"context":{"openButton":"Context","guide":"List the talk topic, the people and companies you'll mention, and any technical or domain terms — they'll be transcribed more accurately."},"guide":{"openButton":"Guide","firstVisitHint":"New to Conference Mode? Take a look at the guide.","dialogTitle":"Tiro Conference Mode Guide","dialogDescription":"For a successful event, read through the guide below and set up Tiro live captions and translation ahead of time.","tabs":{"preparation":"Prep","audio":"Audio","display":"Display","troubleshooting":"Issues"},"preparation":{"heading":"Pre-event checks","intro":"Set up Tiro Conference Mode ahead of time by walking through the steps below — it's the surest way to a smooth event.","phases":[{"title":"The day before","items":["Fill in the event name, speakers, and venue in the note — they flow straight into the caption header and share link.","Add people's names, company names, and common acronyms to the memo. Captions pick them up far more accurately.","Check the venue Wi-Fi speed. Around 10 Mbps down · 5 Mbps up is comfortable.","Wi-Fi can choke once a crowd shows up — check ahead of time that it stays stable when the room is full."]},{"title":"Once you're at the venue","items":["Plug the mic into your laptop and confirm the audio comes through. (See the Audio tab.)","Decide where captions go, then walk to the back row and check the text is readable from there.","Turn off sleep and the screensaver. A screen that blanks mid-talk is a bad time."]},{"title":"Right before you start","items":["Run a quick test recording before the event starts, and check that captions land on screen smoothly and auto-scroll."]}]},"audio":{"heading":"Audio setup","intro":"More than half of your caption quality comes from audio. Five extra minutes here pays off.","body":"Route the venue mic into your laptop through a USB audio interface and you get clean audio with the applause and ambient noise stripped out. Recognition accuracy climbs 1.5–2x compared with a phone or the laptop's built-in mic.","stepsHeading":"How to connect","steps":["Ask the sound engineer for one line-out channel from the main mixer. (XLR or 1/4\\" TRS)","Convert it through a USB audio interface (e.g. Focusrite Scarlett Solo) and plug that into your laptop.","Run a test recording to confirm the audio comes through clean."],"copyMessage":"Copy message for the sound engineer","copySuccess":"Copied","copyFailed":"Couldn't copy","messageTemplate":"Hi — we're running live captions for the event. For the cleanest audio, could we get one line-out channel from the main mixer (XLR or 1/4\\" TRS) routed directly to our laptop? We'll bring the USB audio interface. We need about 30 minutes to set up."},"display":{"heading":"Display layout","intro":"Pick based on your screen size and how much the slides matter. You can mix and match these so the audience reads as comfortably as possible.","options":[{"name":"Full-screen captions","when":"Best for talks and panels with few or no slides. Captions fill the screen so everyone can follow at a glance."},{"name":"Slides + captions, split","when":"When you want slides and captions on one screen. Split it left and right so neither gets lost."},{"name":"Side monitor","when":"Keep the slides on the main screen and put captions on a separate side monitor."},{"name":"QR share","when":"When the main screen is small or far away. The audience follows the captions on their own phones."},{"name":"Hybrid","when":"Use big-screen captions and the QR together — it covers everyone, near the front or far in the back."}],"qrTip":"Lean into QR mode. The audience reads on their own device at their own pace and takes the note home afterward — often better than captions on a big screen."},"troubleshooting":{"heading":"Troubleshooting","intro":"The situations that come up most during events, and what to do.","items":[{"q":"Captions keep dropping or lagging","a":"Check the network first — wired LAN is the most stable. On Wi-Fi, test ahead of time to make sure it doesn't drop once a crowd shows up."},{"q":"I want names and companies captured correctly","a":"Before the event, add the names, terms, and domain phrases that will come up to the note's context. Captions follow along far more accurately."},{"q":"The screen turns off mid-talk","a":"Turn off sleep and the screen saver ahead of time. If the screen sleeps, the captions stop with it."},{"q":"Some people missed the QR","a":"Put the QR on the opening slide and seat cards, and have the MC point it out once more right before you start."}]}},"settings":{"screenSettings":"Screen Settings","darkMode":"Dark Mode","pinHeader":"Always show header","fontSize":"Font Size","decreaseFontSize":"Decrease font size","increaseFontSize":"Increase font size","contentWidth":"Content Width","decreaseContentWidth":"Decrease content width","increaseContentWidth":"Increase content width","displayMode":"Display Mode","displayModes":{"horizontal":"Horizontal","horizontalMirrored":"Horizontal Mirrored","vertical":"Vertical","verticalMirrored":"Vertical Mirrored","fixedSingle":"Fixed","fixedSingleMirrored":"Fixed Mirrored","translationOnly":"Translation Only"}}},"shareQr":{"openButton":"QR","closeButton":"Close","eyebrow":"Tiro is taking notes","instruction":"Scan the QR with your phone camera","untitled":"Untitled","addMeta":"Add meta","addSpeaker":"Speaker","addVenue":"Venue","addNote":"Note","speakerPlaceholder":"Speaker","venuePlaceholder":"Venue","notePlaceholder":"Note","passwordLabel":"Password","editField":"Edit {{field}}","copy":{"button":"Copy link","success":"Share link copied","failed":"Copy failed"},"prompt":{"title":"Share live captions via QR","body":"Anyone can scan the QR to follow the live captions on their phone.","cta":"Generate QR","scopeReason":"Your default share setting is invite-only. Choose who can open the link to share it as a QR code."},"visibility":{"anyone":"Anyone with the link can view this","company":"Only your company members can view this. External attendees won't be able to open it","private":"Only invited people can view this. Other attendees won't be able to open it"}},"recording":{"download":"Download Audio File","saveAs":"Save Recording","blockedByPolicy":"Your organization's policy doesn't allow downloading audio files","pauseToDownload":"Pause recording to download","pause":"Pause recording","start":"Start recording","resume":"Resume recording","deviceSelect":"Select microphone","systemDefault":"System default","microphoneSection":"Select a Microphone","sameAsSystem":"Same as System","pausedByAnotherRecording":{"title":"Recording paused","description":"This recording was paused because another recording started on your account. Everything saved so far is in your note.","learnMore":"Learn more"},"realtimeTranslation":{"label":"Translation"}},"transcriptTabs":{"all":"All","conversationMultilingual":"Multi","languageSelect":"Transcript language","localeNames":{"ko":"Korean","en":"English","ja":"Japanese","de":"German","es":"Spanish","fr":"French","it":"Italian","th":"Thai","sv":"Swedish","vi":"Vietnamese","id":"Indonesian","zh":"Chinese","ms":"Malay","ru":"Russian","hi":"Hindi","auto":"Multilingual"}},"toast":{"deleteError":"Failed to delete note","bulkDeleteError":"Failed to delete notes","endError":"Failed to end note","titleUpdateError":"Failed to update note title","deleteForbidden":"You don't have permission to delete this note. Ask your admin to update your role.","titleUpdateForbidden":"You don't have permission to edit this note. Ask your admin to update your role.","restoreError":"Failed to restore note","restoreSuccess":"Note restored","permanentDeleteError":"Failed to permanently delete note"},"document":{"toast":{"generateError":"Failed to generate document","templateCreateError":"Failed to create document template","templateDeleteError":"Failed to delete document template","templateUpdateError":"Failed to update document template","sectionCreateError":"Failed to create document section","sectionUpdateError":"Failed to update document section","sectionContentLengthError":"This section is currently {{currentLength}} characters. Reduce it to 10,000 characters or fewer to save.","sectionDeleteError":"Failed to delete document section","shareError":"Failed to share document template","unshareError":"Failed to unshare document template"}},"recordingSource":{"call":"Call recording","watch":"Watch recording","text":"Imported transcript"},"documentRecovery":{"done":"Document restored.","title":"Reset this document?","description":"All document edits will return to the generated content. You cannot undo changes made before the reset."},"transcriptRecovery":{"resetKind":"Reset {{kind}}","resetKindDescription":"Restore the generated {{kind}} in every paragraph. Other content stays unchanged. Earlier edits to this content can no longer be undone.","originalSpeakers":"Speaker assignments in the transcript also return to their generated state.","kinds":{"original":"transcript","translated":"translation","summary":"paragraph summaries"},"done":"Changes reverted.","undoSpeakers":"Undo speaker change"},"summaryRecovery":{"unknownResult":"Could not confirm the result. Please refresh the page.","edited":"Edited","undo":"Undo","reset":"Reset","title":"Reset this summary?","description":"The generated summary will be restored. Earlier edits can no longer be undone.","done":"Summary restored."},"contentEdit":{"edited":"(edited)","title":"Restore generated content?","description":"Your edits cannot be recovered. The saved generated content will be restored.","cancel":"Cancel","restore":"Restore generated content","restored":"Generated content restored.","conflict":"Content has changed. Review it before trying again.","failed":"Could not restore. Please try again.","speakers":"Speaker information will also be restored.","saveFailed":"Could not save. Your draft is still here.","saveConflict":"Another change was saved first. Your draft is still here.","retryRead":"Try loading again","refreshRequired":"Editing will resume after the saved content is loaded.","segmentChangeFailed":"Reloaded the saved content. Please review your changes.","savedRefreshFailed":"Saved, but the latest content could not be loaded.","refreshFailed":"Restored, but the latest content could not be loaded."}}`,
  ),
  L = {
    placeholder: "Search in note...",
    noResults: "No results found",
    searching: "Searching...",
    oneItemChanged: "1 item changed",
    itemsChanged: "{{count}} items changed",
    itemsRestored: "{{count}} items restored",
    changeError: "Error occurred while changing",
    restoreError: "Error occurred while restoring",
    enterSearchAndReplace: "Please enter both search term and replacement text",
    currentTab: "Current Tab",
    searchIn: "Search in {{tab}}",
    editWords: "Edit Words",
    enterReplaceText: "Enter replacement text",
    replace: "Replace",
    replaceAll: "Replace All",
    undo: "Undo",
    all: "All",
  },
  F = {
    customerSupport: "Support",
    minute: "m",
    cancel: "Cancel",
    create: "Create",
    creating: "Creating...",
    submit: "Submit",
    actions: "Actions",
    noteActions: "Note actions",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    deleting: "Deleting...",
    saving: "Saving...",
    close: "Close",
    copy: "Copy",
    confirm: "Confirm",
    search: "Search",
    synchronizing: "Saving...",
    noContexts: "No previous contexts found",
    back: "Back",
    refresh: "Refresh",
    retry: "Try again",
    backToNotes: "Back to Notes",
    backToWiki: "Back to Wiki",
    error: "An error occurred",
    tryAgainLater: "Please try again later",
    exporting: "Exporting...",
    loading: "Loading...",
    loadMoreFailed: "Couldn't load the next page. Please try again.",
    remove: "Remove",
    removing: "Removing...",
    moving: "Moving...",
    comingSoon: "Coming soon",
  },
  O = {
    startDate: "Start date",
    endDate: "End date",
    pickEndDate: "Pick a start date, then an end date on the calendar",
    exceedsMax: "Select up to {{maxDays}} days",
    dayCount_one: "{{count}} day",
    dayCount_other: "{{count}} days",
    clear: "Clear",
    cancel: "Cancel",
    apply: "Apply",
    presets: {
      today: "Today",
      last7Days: "Last 7 days",
      last30Days: "Last 30 days",
      last90Days: "Last 90 days",
      thisMonth: "This month",
      lastMonth: "Last month",
      lastYear: "Last year",
    },
  },
  W = {
    upcomingEvents: "Upcoming events",
    connectCalendar: "Connect to Calendar",
    connectCalendarDescription: "Connect your calendar to see upcoming events.",
    joinMeeting: "Join",
    createNote: "Create Note",
    noEvents: "No upcoming events",
    expiredConnectionTitle: "{{provider}} Calendar connection expired",
    expiredConnectionDescription:
      "{{email}} · Events from active calendars will still appear",
    reconnect: "Reconnect",
    today: "Today",
    tomorrow: "Tomorrow",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    allDay: "All day",
    desktopAppDownload: "Get <bb>meeting reminders</bb> in <b>Desktop App</b>",
    desktopAppDownload2: "Record Online meetings</bb> in <b>Desktop App</b>",
    showMore: "Show more",
    showLess: "Show less",
    expand: "Expand",
    collapse: "Collapse",
    viewAllEvents: "View all events",
    nearEvents: "Upcoming events",
    startsSoon: "Starting soon",
    options: "Event options",
    refresh: "Refresh calendar",
    inProgress: "In progress",
    connectButton: "Connect",
    desktopNudgeSubtitle: "We'll remind you 15 minutes before",
    desktopNudgeTitle: "Auto meeting recording",
    desktopNudgeInlineButton: "Get 15-min meeting alerts on desktop",
  },
  U = {
    recording: {
      createFailed: "Failed to create note",
      noMatchingSession: "No matching recording session found",
    },
  },
  q = {
    justNow: "Just now",
    minutesAgo: "{{minutes}} minutes ago",
    minutesAgo_one: "{{minutes}} minute ago",
    hoursAgo: "{{hours}} hours ago",
    hoursAgo_one: "{{hours}} hour ago",
    yesterday: "Yesterday",
    daysAgo: "{{days}} days ago",
    daysAgo_one: "{{days}} day ago",
    weeksAgo: "{{weeks}} weeks ago",
    weeksAgo_one: "{{weeks}} week ago",
  },
  B = {
    personDeleted: {
      description: "The participant has been removed from the list",
    },
    transcriptionPaused: {
      title: "Transcription Paused",
      description: "Stopped transcribing due to 15 minutes of inactivity",
      dismiss: "Dismiss",
    },
    connectionLost: {
      title: "Network connection is unstable",
      description:
        "Transcription will automatically resume once the connection is restored",
      dismiss: "Dismiss",
    },
    generationConnectionUnavailable: {
      title: "Can't generate while disconnected",
      description: "Check your network connection and try again.",
    },
    systemAudioCaptureFailed: {
      title: "Couldn't capture system sound",
      description:
        "Your microphone is still recording. If computer audio isn't captured, see how to fix it.",
      action: "How to fix",
    },
    systemAudioCaptureEnded: {
      title: "System sound capture stopped",
      description:
        "System sound capture has stopped. Recording with microphone only.",
    },
    nativeAudioStartFailed: {
      title: "Couldn't start recording",
      description:
        "Tiro couldn't access your microphone or system audio. Check your permissions and audio devices, then try again.",
    },
    nativeAudioFailure: {
      captureFailed: {
        title: "Audio isn't available",
        description: `Tiro couldn't use the microphone or system audio.
Check your audio devices and try again.`,
      },
      systemUnavailable: {
        title: "System audio isn't available",
        description: `Check your system audio device, then try again.
Tiro can't record with the microphone alone.`,
      },
      noSources: {
        title: "No audio sources are available",
        description:
          "Connect a microphone or system audio device, then try again.",
      },
      micPermission: {
        title: "Microphone permission is required",
        description:
          "Allow Tiro to use your microphone in system settings, then try again.",
      },
      systemPermission: {
        title: "System audio permission is required",
        description:
          "Allow Tiro to record system audio in system settings, then try again.",
      },
      permissionDenied: {
        title: "Audio permission is required",
        description:
          "Check Tiro's microphone and system audio permissions, then try again.",
      },
      startTimeout: {
        title: "Audio took too long to start",
        description: "Check your audio devices and try recording again.",
      },
      processTerminated: {
        title: "The audio component was stopped",
        description: `The operating system or another program stopped Tiro's audio component.
Close audio-related programs and try again.`,
      },
      processExited: {
        title: "The audio component closed unexpectedly",
        description: "Check your audio devices and try recording again.",
      },
      processUnresponsive: {
        title: "The audio component isn't responding",
        description: `Tiro's audio component isn't responding.
Check your audio devices and try again.`,
      },
      unsupportedOs: {
        title: "Desktop recording isn't available on this macOS",
        description:
          "Desktop recording requires macOS 14.2 or later. Update macOS or record on the web instead.",
      },
    },
    nativeAudioMicNotFound: {
      title: "We couldn't find a microphone",
      description: `If this device has no microphone, you can record system audio only.
Your voice won't be recorded.`,
      settings: "Check microphone settings",
      systemOnly: "Record system audio only",
      cancel: "Cancel",
    },
    systemOnlyRecordingStarted: {
      title: "System audio-only recording started",
      description: "Your voice won't be recorded.",
    },
  },
  Y = {
    description: `Social logins (Google, Microsoft, etc.) may not work properly in in-app browsers.
Please use Tiro in your device's default browser.`,
    usingBrowser: `It seems like you are using
{{browser}} browser.`,
    copyLink: "Copy link",
    linkCopied: {
      title: "Link copied!",
      description: "Open your browser and paste the link.",
    },
    kakaotalk: "KakaoTalk",
    facebook: "Facebook",
    instagram: "Instagram",
    naver: "Naver",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    threads: "Threads",
    "in-app": "In-App",
  },
  z = {
    title: "Opening Tiro App...",
    redirectToAppStore: "Opening App Store",
    redirectToPlayStore: "Opening Google Play",
    redirectToWebsite: "Opening website",
    clickHere: "Click here if you are not redirected",
  },
  G = {
    title: "Start recording with Tiro",
    description: "Tap the button below to open Tiro and start recording.",
    openApp: "Start recording in Tiro",
    noApp: "Don't have the app? Install Tiro",
  },
  _ = {
    hours_one: "{{count}} hour",
    hours_other: "{{count}} hours",
    minutes_one: "{{count}} minute",
    minutes_other: "{{count}} minutes",
    seconds_one: "{{count}} second",
    seconds_other: "{{count}} seconds",
  },
  H = {
    failedToUpdate: "Couldn't save changes",
    pleaseTryAgain: "Please try again in a moment.",
    title: "Oops!",
    description: "Something went wrong. Would you mind trying again?",
    notFound: "Page not found",
    notFoundDescription:
      "We couldn't find the page you're looking for. Please check the address and try again.",
    goBack: "Go back",
    goHome: "Go to Home",
    maintenance: "Tiro is under maintenance",
    maintenanceDescription:
      "We're currently performing system maintenance to improve our service. Please check back in a few minutes.",
    contactSupport: {
      title: "Oops! Something went wrong.",
      description: "Please contact our support team via messenger.",
      button: "Contact Support",
    },
  },
  V = {
    helpCenter: "Help Center",
    contactTeam: "Contact Team",
    noAudioDetected: {
      title: "We're not picking up any sound",
      description:
        "No microphone input is coming through. Check that your mic isn't muted and the right input device is selected.",
      action: "See how to fix it",
      dismiss: "Dismiss",
    },
    noAudioForWhile: {
      title: "It's been quiet for a while",
      description:
        "If you've stepped away, that's fine. If you're expecting sound to come through, take a moment to check your mic.",
      action: "See how to fix it",
      dismiss: "Dismiss",
    },
    micPermissionDenied: {
      title: "Microphone access is blocked",
      description:
        "Microphone access is blocked, so no sound is coming in. Allow microphone access in your settings.",
      action: "See how to fix it",
      dismiss: "Dismiss",
    },
  },
  j = {
    join: {
      description: `You've been invited to {{workspace}}.
Accept the invitation to start collaborating.`,
      acceptButton: "Join",
      laterButton: "Later",
    },
    invalid: {
      description: `This invitation link isn't valid.
Ask a workspace admin to send you the link again.`,
      backButton: "Back to Tiro",
    },
  },
  K = {
    title: "Contact us",
    helpTitle: "For help or questions about Tiro",
    enterpriseTitle: "Thinking about purchasing Tiro for your team?",
    helpCenterTitle: "Looking for Help Center or FAQ?",
    visitHelpCenter: "Visit Help Center",
    visitFAQ: "Visit FAQ",
  },
  Q = {
    links: {
      pricing: "Pricing",
      roiEstimate: "Adoption Quote",
      guide: "User Guide",
      changelog: "Changelog",
      blog: "Blog",
      press: "Press",
      contact: "Contact",
      contactTeamPlan: "Business Support",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      status: "Status Page",
      apiReference: "API Documentation",
      cli: "CLI",
      mcpServer: "MCP Server",
      webhooks: "Webhooks",
    },
    colTitles: {
      product: "Product",
      developer: "Developers",
      compare: "Compare",
      contact: "Contact",
      legal: "Legal & Security",
    },
    compareHub: "All AI note takers compared",
    business: {
      name: "ThePlato Inc.",
      addressUs: "455 Market St Ste 1940, San Francisco, CA 94105",
      emailLabel: "Email",
      partnersLabel: "Partnerships",
      copyright: "© 2026 ThePlato Inc.",
    },
    slogan: "We make something wonderful.",
  },
  J = {
    heading: "Press",
    description:
      "A curated archive of coverage and interviews featuring Tiro. Find the articles and videos you need quickly.",
    filters: {
      all: "All",
      coverage: "Coverage",
      interviews: "Interviews",
      funding: "Funding",
      global: "Global",
      social: "Video · Social",
    },
    controls: {
      searchPlaceholder: "Search press",
      rss: "RSS",
      openArticle: "Open",
      noResults: "No press items match these filters.",
    },
    kinds: {
      article: "Article",
      profile: "Profile",
      social: "Social",
      video: "Video",
    },
    meta: {
      title: "Press | Tiro",
      description:
        "A curated archive of coverage and interviews featuring Tiro, from AI meeting notes and workplace context to global expansion.",
      keywords:
        "Tiro, ThePlato, Press, AI meeting notes, business context, meeting automation, AI agents, MCP, press coverage, interviews",
    },
  },
  Z = {
    selectFileToUpload: "Select file to upload",
    orDragAndDrop: "or drag and drop here.",
    contextFileUpload: "Upload Context Files",
    supportedFormats: "MP4, MP3, MOV, -- ",
    fileSizeLimit: "Up to 1GB, within 5 hours",
    selectFile: "Select File",
    context:
      "Tell us about the conversation, it will dramatically improve the quality",
    contextHint: `Entering context significantly increases the accuracy of recorded notes.
You can also paste captured images.`,
    contextAdd: "Add Context",
    noteLanguage: "Recording Language",
    speakerCount: "Number of Speakers",
    speakerCountAutoDetect: "Auto detect",
    speakerCountOption_one: "{{count}} speaker",
    speakerCountOption_other: "{{count}} speakers",
    convert: "Convert",
    uploading: "Uploading...",
    converting: "Converting...",
    error: "Error",
    unsupportedFormat: "Unsupported file format",
    fileSizeError: "File is too large",
    pleaseCheckSize: "Please upload a file smaller than 1GB",
    pleaseCheckFormat: "Please upload a supported audio file format",
    emptyFileTitle: "This file is empty and can't be uploaded",
    emptyFileDescription:
      "Open the file to make sure it plays, then select it again.",
    loadingDuration: "Loading duration...",
    estimatedDuration: "Est. processing time: {{duration}}",
    progress: {
      REQUEST_RECEIVED: "Request received, preparing to process your file...",
      TRANSCRIPTION_STARTED: "Starting transcription...",
      TRANSCRIPTION_COMPLETED: "Transcription completed!",
      TRANSCRIPTION_ERROR: "Error during transcription. Please try again.",
      PARAGRAPHS_SPLIT: "Organizing content into paragraphs...",
      SENTENCES_SPLIT: "Refining sentence structure...",
      PARAGRAPHS_SUMMARIZING_STARTED: "Generating paragraph summaries...",
      PARAGRAPHS_SUMMARIZING_COMPLETED: "Paragraph summaries completed!",
      NOTE_METADATA_EXTRACTION_STARTED: "Paragraph summaries completed!",
      NOTE_METADATA_EXTRACTION_COMPLETED: "Paragraph summaries completed!",
      NOTE_SUMMARY_GENERATION_STARTED: "Creating One-Pager summary...",
      NOTE_SUMMARY_GENERATION_COMPLETED: "One-Pager summary completed!",
      COMPLETED: "Your note is ready.",
      ERROR: "An error occurred during processing. Please try again.",
    },
    googleDriveFileName: "Google Drive File",
    invalidLinkError:
      "Invalid link. We currently only support Google Drive links.",
    linkUploadTooltip: `Link upload currently only supports Google Drive
Please check permissions when entering Google Drive links`,
    linkPlaceholder:
      "You can also enter a Google Drive link. https://drive.google.com/file/d/:fileId",
    contextPlaceholder: `Interview
This is an interview with [Elon Musk]. Since there are many technical terms and names in the [rocket science] field, please record accurately and write the summary in a friendly tone.
People/Companies/Products: [Tesla], [Neuralink], [Robotaxi]`,
    fileUpload: "File Upload",
    networkBlockedTitle: "Upload failed",
    networkBlockedDescription:
      "Your network may be blocking the upload. Please try again using a mobile hotspot.",
  },
  $ = {
    unsupportedOs: {
      message: "Desktop recording requires macOS {{minimumVersion}} or later",
      detail: "Update macOS or record on the web instead.",
    },
    unavailable: {
      message:
        "We couldn't check your macOS version, so Desktop recording can't start",
      detail:
        "Desktop recording requires macOS {{minimumVersion}} or later. Record on the web instead.",
    },
    folderOpenFailed: {
      message: "We couldn't open a recordings folder",
      detail:
        "The folder may not exist yet, or Tiro may not have permission to open it. Please try again later.",
    },
    webOpenFailed: {
      message: "We couldn't open the web",
      detail: "Open Tiro on the web in your browser to record.",
    },
    recordOnWeb: "Record on the web",
    openRecordingFolder: "Open recordings folder",
    close: "Close",
  },
  X = {
    title: "First, allow Tiro to transcribe your conversation",
    description: `Tiro records both sides of the conversation using your mic and your computer's audio.
No bot joins your meeting, and it only runs while you're recording with Tiro.`,
    transcribeMyVoice: "Transcribe my voice",
    transcribeMyVoiceHint: "Your voice, picked up through the mic",
    transcribeOthersVoice: "Transcribe other's voices",
    transcribeOthersVoiceHint: "Others' voices, from your computer's audio",
    enable: "Enable",
    granted: "Granted",
    continue: "Continue",
  },
  ee = {
    menu: {
      ariaLabel: "Open menu",
      newNote: "New Note",
      settings: "Settings",
      checkForUpdates: "Check for Updates...",
      restartToApply: "Restart to Apply Update",
      logout: "Log Out",
      quit: "Quit",
      file: "File",
      edit: "Edit",
      view: "View",
      help: "Help",
      undo: "Undo",
      redo: "Redo",
      cut: "Cut",
      copy: "Copy",
      paste: "Paste",
      selectAll: "Select All",
      reload: "Reload",
      resetZoom: "Actual Size",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      toggleFullscreen: "Toggle Full Screen",
      toggleDevTools: "Developer Tools",
      keyboardShortcuts: "Keyboard Shortcuts",
      changelog: "What's New",
      about: "About Tiro",
      update: {
        upToDate: {
          message: "You're on the latest version",
          detail: "Current version: {{version}}",
          confirm: "OK",
        },
        available: {
          message: "Version {{version}} is ready",
          detail: "Install now to restart Tiro and switch to the new version.",
          updateNow: "Install Now",
          later: "Later",
        },
        downloading: {
          message: "Downloading the new version",
          detail:
            "Version {{version}} is downloading in the background. We'll let you know when it's ready.",
          confirm: "OK",
        },
        error: {
          message: "Couldn't check for updates",
          detail: "Please try again in a moment.",
          confirm: "OK",
        },
      },
    },
  },
  te = {
    upToDate: {
      message: "You're using the latest version of Tiro.",
      detail: "Current version: {{version}}",
      confirm: "OK",
    },
    available: {
      message: "A new version ({{version}}) is ready.",
      detail: "Install now to restart Tiro and switch to the new version.",
      updateNow: "Install Now",
      later: "Later",
    },
    downloading: {
      message: "A new version is available.",
      detail: `It's downloading in the background. When it's ready, choose “Restart to Apply Update” from the menu to install it.
{{current}} → {{latest}}`,
      confirm: "OK",
    },
    error: {
      message: "Couldn't check for updates.",
      detail: "Please try again in a moment.",
      confirm: "OK",
    },
  },
  oe = {
    installNewVersion: "Install v{{version}} Now",
    available: "New version available",
    description: "Want to install it?",
    button: "Update now",
    nextTime: "Later",
    newFeatures: "{{version}} new features",
    required: "Important Update Notice",
    forceDescription: `New Version of Tiro is now available.
Would you like to download it now?`,
    updateNow: "Update Now",
    completed: {
      title: "Update completed",
      description: "Try out the new features",
      viewChangelog: "See what's changed",
      badge: "v{{version}} updated",
    },
  },
  ne = {
    systemSuspend: {
      title: "Recording Paused",
      body: "Check your note content.",
      action: "View Note",
    },
  },
  ae = {
    welcome: {
      logoAlt: "Tiro",
      closeAria: "Close onboarding welcome modal",
      title: "Welcome aboard!",
      creditLabel: "Valid for 3 weeks",
      validUntil: "Yours to use until {{date}}",
      creditUnit: "min",
      breakdown: `<b>{{earned}} min</b> to use right now
<b>+{{remaining}} min</b> after {{steps}} onboarding steps`,
      startButton: "Start your first note",
    },
    tasks: {
      eyebrow: "Get started",
      title: "Earn free minutes with Tiro onboarding",
      setupTitle: "Finish setting up Tiro",
      collapseAria: "Collapse onboarding tasks",
      expandAria: "Expand onboarding tasks",
      collapsedTitle: "Earn free minutes",
      collapsedDoneTitle: "All done",
      minutesUnit: "min",
      completed: "{{completed}}/{{total}} complete",
      completedSuffix: "complete",
      calendarTitle: "Connect Calendar",
      required: "· Required",
      calendarDescription: "Join meetings and record.",
      desktopTitle: "Install the desktop app",
      desktopDescription: "Save original audio and record video meetings.",
      mobileTitle: "Install the mobile app",
      mobileDescription: "Record without your laptop.",
      firstNoteTitle: "Create your first note",
      firstNoteDescription: "See summaries and documents.",
      connectButton: "Connect",
      installButton: "Install",
      recordButton: "Record",
      credit: "+{{minutes}}",
      endTitle: "Finish Tiro onboarding",
      endDescription: "You can change these settings later.",
      calloutTitle: "Get more out of Tiro",
      calloutDescription: "Paste this into your favorite AI and ask.",
    },
    firstNoteRecording: {
      questions: {
        team: "What team do you work on?",
        role: "What is your role?",
        terms: "Any names or terms you use often?",
        finish: "Pause, then press End recording.",
      },
    },
    firstNoteResult: {
      eyebrow: "First recording",
      title: `Here is what Tiro captured
from those 60 seconds`,
      paragraphStat: "Recorded paragraphs",
      keywordStat: "Keywords",
      termsLabel: "Names and terms",
      loadingKeywords:
        "Finding names and terms worth remembering from what you just said.",
      keywordError: "We could not load keywords. Your note was still saved.",
      emptyKeywords:
        "We could not find keywords to add. Your note was still saved.",
      rememberNote:
        "Add terms to your dictionary so Tiro remembers them next time.",
      addButton: "Add to dictionary",
      addingButton: "Adding",
      extractingButton: "Finding keywords",
      goToNoteButton: "Go to my note",
      retryButton: "Record again",
      saveAllButton: "Save all to dictionary",
      addKeywordAria: "Add {{keyword}} to dictionary",
      addedKeywordAria: "{{keyword}} saved",
      createdToastTitle: "Your first note is ready.",
      createdToastDescription:
        "Connect your calendar and try Tiro in a real meeting.",
      addSuccess: "Added to your dictionary",
      addError: "Could not add to your dictionary",
    },
    audioReplayPreference: {
      title: "Choose what happens to the original audio",
      description: `Pick this once before recording starts.
You can change it anytime in Settings.`,
      discardTitle: "Delete original",
      discardDescription: "Keep text only",
      keepTitle: "Keep original",
      keepDescription: "For reviewing the source later",
      discardNotice:
        "Tiro keeps the text and deletes the audio right after transcription.",
      keepNotice:
        "Tiro keeps the original audio so you can replay it by paragraph later.",
      paragraphReplayTitle: "Replay by paragraph",
      paragraphReplayDescription: "Replay original audio by paragraph",
      wholeAudioBackupTitle: "Full audio backup",
      wholeAudioBackupDescription: "Only available in the desktop app",
      wholeAudioBackupOrgLocked: "Locked by your organization's policy",
      wholeAudioBackupDesktopDescription:
        "Keep the full audio file on this device",
      continueButton: "Continue",
    },
    aiPrompt: {
      title: `Ask AI how to
work better with Tiro.`,
      description:
        "Copy a prompt that helps your AI assistant suggest better ways to use Tiro.",
      closeAria: "Close AI collaboration prompt modal",
      prompt: `You are an AI advisor helping a team work better with Tiro.

Tiro turns meeting conversations, decisions, context, and next steps into context an AI agent can use right away. When the user explains their team, role, meeting style, tools, and repeated work, suggest:

1. Meetings they should record with Tiro first
2. Follow-up work worth automating after meetings
3. Names and terms to add to the vocabulary for better accuracy
4. Workflows to connect through MCP, API, Webhook, or export
5. One small action they can try this week

Do not guess product details you are unsure about. Tell them to check Tiro docs or ask the Tiro team.

Start by asking:
“What team are you on, and what is the most annoying thing after a meeting?”`,
      steps: {
        copy: "Copy the prompt with the button below.",
        paste: "Paste it into Claude, ChatGPT, Gemini, or another AI agent.",
        context:
          "Share your team context so AI can suggest practical ways to use Tiro.",
      },
      promptLabel: "Prompt content",
      promptCount: "{{count}} chars",
      expandButton: "Expand",
      collapseButton: "Collapse",
      copyButton: "Copy prompt",
      copiedButton: "Copied",
      copyFailedButton: "Try again",
    },
    step1: {
      badge: "Feature ①",
      title: "Real-Time Transcription",
      description:
        "After creating a new note, press the **red button** to start transcribing.",
      audioReplay: {
        title: "Audio Playback",
        description: "Turn this on to listen to your audio files later.",
        off: "OFF",
        on: "ON",
      },
    },
    step2: {
      badge: "Feature ②",
      title: "Generate Documents",
      description: `One click turns your conversation into a one-page document with a single click.
Both default templates and custom templates are supported.`,
    },
    step3: {
      badge: "Feature ③",
      title: "Share Your Way",
      description: `Create a shareable link or invite collaborators.
Save directly to your favorite tools, or export as PDF/Word.`,
    },
    step4: {
      badge: "Desktop App",
      title: "Record online meetings with the desktop app",
      features: {
        systemAudio: "Capture system audio (video calls, videos)",
        calendarIntegration: "Get reminders 15 minutes before meetings.",
      },
      downloadButton: "Download",
    },
    step5: {
      badge: "Free Trial",
      title: "Tiro gave you <b>{{quotaMinutes}} free minutes</b>.",
      description: `Enjoy full access to all features for 3 weeks.
Ready to create your first note?`,
      eventBadge: "EVENT",
      eventDescription:
        "Record **10+ minutes** within **24 hours** and earn **50 extra minutes**.",
      createNoteButton: "Create a Note",
      heroTitle: `Free Trial Credit
valid for 3 weeks`,
      heroDescription: `Record approximately {{count}} meetings
with this credit.`,
    },
    navigation: { previous: "Previous", next: "Next" },
  },
  ie = {
    advisorDebug: {
      toggle: "Advisor diagnostics",
      details: "Run details",
      noCard: "Run without a card",
      inputCount: "{{count}} input paragraphs",
      paragraph: "Paragraph {{number}}",
      unknownParagraph: "Go to paragraph",
      navigationFailed: "Could not open the paragraph.",
      response: "Model response",
      validation: "Validation",
      validatedDraft: "Validated card",
      query: "Search request",
      sources: "Final sources",
      noSources: "No usable sources.",
      moreEvidence: "Show remaining text",
      outcomes: {
        CARD_CREATED: "Card created",
        SILENT: "Silent",
        FAILED: "Failed",
        TIMED_OUT: "Timed out",
      },
      stages: {
        INPUT_PREPARATION: "Input preparation",
        QUERY_ANALYSIS: "Statement analysis",
        SOURCE_RETRIEVAL: "Source retrieval",
        CARD_COMPOSITION: "Card decision",
      },
      statuses: {
        SUCCEEDED: "Completed",
        FAILED: "Failed",
        TIMED_OUT: "Timed out",
        NOT_RUN: "Not run",
      },
    },
    proactiveAdvisory: {
      badge: "Past decision",
      dismiss: "Dismiss",
      goToParagraph: "Go to statement",
    },
    placeholder: "Use @ to mention notes or folders and ask anything",
    tooltip: {
      newChat: "Start a new conversation",
      copy: "Copy content",
      stop: "Stop generating",
      openPanel: "Open Ask Tiro",
      closePanel: "Close Ask Tiro",
      devTrace: "Ask Tiro developer trace",
    },
    empty: {
      title: "How can I help you?",
      description: `I can reference your notes, summarize
meetings, or find what you need`,
      note: {
        chip1: { label: "Key points", prompt: "Summarize the key points" },
        chip2: { label: "Action items", prompt: "What are the action items?" },
        chip3: { label: "Decisions", prompt: "What decisions were made?" },
        chip4: {
          label: "One-line summary",
          prompt: "Summarize the key points in one line",
        },
      },
      allNotes: {
        chip1: {
          label: "Recent meetings",
          prompt: "Summarize meetings from the past 2 weeks",
        },
        chip2: {
          label: "Top keywords",
          prompt: "Frequently mentioned keywords in the past 3 weeks?",
        },
        chip3: {
          label: "This week's to-dos",
          prompt: "List this week's action items",
        },
        chip4: {
          label: "Key decisions",
          prompt: "Summarize key decisions from my recent notes",
        },
      },
    },
    example: {
      note: {
        example1: "Summarize the key points",
        example2: "What are the action items?",
        example3: "What decisions were made?",
        example4: "List the unresolved issues",
      },
      allNotes: {
        example1: "Summarize meetings from the past 2 weeks",
        example2: "Frequently mentioned keywords in the past 3 weeks?",
        example3: "List this week's action items",
        example4: "Summarize key decisions from my recent notes",
      },
    },
    noParagraphFound: "No paragraph found",
    citation: {
      noContent: "Unable to load content",
      backToSummary: "Back to document",
      sourceCount_one: "{{count}} source",
      sourceCount_other: "{{count}} sources",
    },
    progress: {
      summaryReady: "References are ready",
      moreReferences: "{{count}} more",
      noteReferences: "Referenced notes",
      wikiReferences: "Referenced wiki pages",
      referenceSample: "Showing {{shown}} of {{total}}",
      noResults: "Nothing relevant found",
      refCountNote_one: "{{count}} note",
      refCountNote_other: "{{count}} notes",
      refCountWiki_one: "{{count}} wiki",
      refCountWiki_other: "{{count}} wiki",
      thinking: "Thinking…",
      thinkingProcess: "Thinking Process",
      summaryTitle: "Referenced context",
      summaryStage: {
        note_search: "Referenced notes",
        wiki_search: "Referenced wiki pages",
        wiki_relation_expansion: "Related wiki context",
        tool_execution: "Tools used",
      },
      stage: {
        query_analysis: {
          started: "Analyzing the question…",
          completed: "Question analyzed",
          failed: "Couldn't fetch some context",
          skipped: "Question analysis skipped",
        },
        note_search: {
          started: "Looking through your notes…",
          completed: "Notes reviewed",
          failed: "Couldn't fetch some context",
          skipped: "Note search skipped",
        },
        wiki_search: {
          started: "Checking wiki pages…",
          completed: "Wiki pages reviewed",
          skipped: "Wiki check skipped",
          failed: "Couldn't fetch some context",
        },
        wiki_relation_expansion: {
          started: "Exploring related entries…",
          completed: "Explored related entries",
          failed: "Couldn't fetch some context",
          skipped: "Related entries skipped",
        },
        tool_execution: {
          started: "Using available tools…",
          completed: "Tools applied",
          failed: "Couldn't fetch some context",
          skipped: "Tool use skipped",
        },
        answer_drafting: {
          started: "Drafting the answer…",
          completed: "Answer drafted",
          failed: "Couldn't fetch some context",
          skipped: "Answer drafting skipped",
        },
        completed: { completed: "Answer ready" },
        cancelled: { completed: "Answer generation stopped" },
        error: { failed: "Answer generation failed" },
      },
    },
    devTrace: {
      title: "Developer trace",
      empty: "No trace events to show",
      eventCount: "{{count}} events",
      redaction: { raw: "raw", redacted: "redacted", summary: "summary" },
    },
    devPreview: {
      tooltip: "Preview Ask Tiro progress states",
      title: "Progress preview",
      iconVariant: {
        title: "Compare icon treatments",
        sourceOutline: "A. Source color icon",
        sourceTile: "B. Color tile icon",
        sourceDuo: "C. Source + status icon",
      },
      clear: "Clear preview",
      scenario: {
        wiki: "Wiki page references",
        relation: "Wiki relationship",
        note: "Note lookup",
        tool: "Tool execution",
        answer: "Answer drafting",
        error: "Error state",
        trace: "Raw trace",
      },
      preview: {
        query: {
          wiki: "AskTiro dev preview: wiki page progress",
          relation: "AskTiro dev preview: wiki relationship progress",
          note: "AskTiro dev preview: note lookup progress",
          tool: "AskTiro dev preview: tool execution progress",
          answer: "AskTiro dev preview: answer drafting progress",
          error: "AskTiro dev preview: error state",
          trace: "AskTiro dev preview: raw trace",
        },
        answer: {
          wiki: "Example answer draft using the Project Alpha and Launch Plan wiki pages together.",
          relation:
            "Example answer that checks the dependency between two wiki pages before summarizing the conclusion.",
          note: "Example answer that narrows the evidence by checking recent strategy and customer interview notes.",
          tool: "Example answer that shows note search and wiki context tools running.",
          answer:
            "Example answer that shows the drafting state after search and relationship checks are complete.",
          error:
            "Example answer that shows how a wiki context loading failure appears to users.",
          trace:
            "Example answer showing raw thinking, tool call, and tool result in the dev trace panel.",
        },
      },
      progress: {
        queryAnalysis: "Checked the question intent and reference scope",
        wiki: "Referencing the Project Alpha and Launch Plan pages together",
        relationPages: "Checked 2 related wiki pages",
        relation:
          "Understanding the relationship between Project Alpha and Launch Plan",
        note: "Checking the strategy meeting and customer interview notes",
        toolStarted: "Running the wiki_context.search tool",
        toolCompleted: "Finished running the wiki_context.search tool",
        answerContext: "Checked the wiki pages needed for the answer",
        answer: "Turning the referenced wiki pages and notes into an answer",
        errorWiki: "Failed to load wiki context",
        error:
          "Stopped answer generation because some references could not be loaded",
        traceWiki: "Checked wiki context for the raw trace example",
        traceTool: "Recorded tool call and tool result in the trace panel",
      },
    },
  },
  re = {
    expiredOrExhausted: {
      title: "Your free trial has ended 🥲",
      description: "Want to keep using Tiro? Start your subscription now!",
      cta: "Start Subscription",
    },
    usageNearlyExhausted: {
      title: "{{minutesLeft}} minutes left on your free trial 😮",
      description: "Subscribe now to keep using Tiro!",
      cta: "Start Subscription",
    },
    trialOneMonth: {
      title: "Free trial: {{daysLeft}} days remaining!",
      description: "",
      cta: "Start Subscription",
    },
    trialOneYear: {
      title: "Free trial: {{minutesLeft}} minutes of usage remaining!",
      description: "",
      cta: "Start Subscription",
    },
    expiryApproaching: {
      title: "Free trial: Only {{daysLeft}} days left!",
      description: "Subscribe now to keep using Tiro!",
      cta: "Start Subscription",
    },
    recordingControls: {
      title: "Tiro Free Trial",
      upgrade: "Upgrade Plan",
      languageSelect: {
        addLanguage: "Add Language",
        recordingLanguage: "Recording Language",
        recordingLanguageLabel: "Recording",
        translationLanguage: "Translation Language",
      },
    },
  },
  se = {
    reward_granted: {
      title: "You've got a new reward",
      activationDescription: `You earned <b>{{amount}}</b>
A friend you invited recorded for at least 10 minutes.`,
      paidDescription: `You earned <b>{{amount}}</b>
A friend you invited started a paid subscription.`,
      cta: "View reward",
    },
    payment_expired: {
      title: "Payment update needed",
      rightLabel: "D-{{days}}",
      body: "Note recording will be restricted unless your payment info is updated.",
      cta: "Update payment",
    },
    quota_exhausted: {
      title: "{{planName}}",
      rightLabel: "{{used}} / {{total}} min",
      body: "You've used all your recording time. Upgrade your plan to keep going.",
    },
    trial_expired: {
      title: "Free trial ended",
      body: "New recordings are paused. Subscribe now to restore access immediately.",
      cta: "Activate plan",
    },
    enterprise_quota_exhausted: {
      title: "Contract quota reached",
      rightLabel: "{{used}} / {{total}} min",
      body: "New recordings are blocked because your contract quota is fully used. Additional billing is required.",
      cta: "Contact support",
    },
    payment_failed: {
      title: "Payment failed",
      rightLabel: "D-{{days}}",
      body: "Please update your payment info by {{date}}.",
    },
    trial_member_limit: {
      title: "Free trial team size limit reached",
      rightLabel: "{{used}} / {{total}} members",
      body: "Activate a plan to keep using Tiro with more teammates.",
    },
    trial_ending: {
      title: "Free trial ending soon",
      rightLabel: "D-{{days}}",
      body: "Subscribe now to keep your workspace running without interruption.",
    },
    trial_invite_members: {
      title: "Try Tiro with your team",
      body: "Invite teammates to your workspace and share meeting notes together.",
    },
    freeTrialTitle: "Free Trial",
    quota_warning_80: {
      title: "{{planName}}",
      rightLabel: "{{used}} / {{total}} min",
      body: "You've reached 80% of your limit. Upgrade your plan to extend it.",
    },
    overage_ready: {
      title: "{{planName}}",
      rightLabel: "{{used}} / {{total}} min",
      body: "Additional recording is on. Recording won't stop when your included time runs out — extra minutes are billed at $0.025 each.",
    },
    overage_active: {
      title: "{{planName}}",
      rightLabel: "{{used}} / {{total}} min",
      body: "You're recording with Additional recording. The {{minutes}} extra min so far are billed at $0.025 each.",
    },
    plan_change_scheduled: {
      title: "{{planName}} ending soon",
      rightLabel: "D-{{days}}",
      body: "{{planName}} stays active until your next billing date ({{date}}). Note recording will be restricted afterward.",
    },
    trial_usage: {
      title: "Free Trial",
      rightLabel: "{{used}} / {{total}} min",
      body: "Subscribe to a plan to increase your limit.",
    },
    upsell_pro: {
      title: "Need more recording time?",
      body: "Upgrade to Pro to increase your monthly usage.",
    },
    upsell_max: {
      title: "Need a higher limit?",
      body: "Max plan extends your monthly usage.",
    },
    upsell_team: {
      title: "Working with others?",
      body: "Team plan shares a workspace so you can collaborate together.",
    },
    subscribe_nudge: {
      title: "Get started with a plan",
      body: "Subscribe to unlock all of Tiro's features without limits.",
    },
  },
  le = {
    micInUse: {
      title: "Having a conversation?",
      body: "Take notes now",
      action: "Take Note",
      startRecording: "Start Live Recording",
    },
  },
  ce = {
    prompt: {
      title: "Looks like your call ended",
      description: "You're still recording. Want to pause?",
      pause: "Pause",
    },
  },
  de = {
    openSettings: "Open settings",
    openAskTiro: "Open Ask Tiro",
    goBack: "Go back",
    goForward: "Go forward",
    startOfflineRecording: "Start offline recording",
    title: "Keyboard shortcuts",
    showShortcuts: "Show keyboard shortcuts",
    openSearch: "Open unified search",
    selectNote: "Select the previous or next note",
    openSelectedNote: "Open the selected note in full view",
    expandPreview: "Expand a note preview to full view",
    closeNote: "Close a note or return to the list",
    findInNote: "Open find and replace in a note",
    bold: "Bold",
    italic: "Italic",
    strikethrough: "Strikethrough",
    highlight: "Highlight",
    resetTextColor: "Apply or reset to the default text color",
    toggleRecording: "Pause recording",
    startRecording: "Start or resume recording",
    group: {
      general: "General",
      recording: "Recording",
      navigation: "Find and navigate notes",
      editing: "Edit note content",
      view: "Display and app",
    },
    where: {
      notes: "Notes",
      noteList: "Note list",
      notePreview: "Note preview",
      noteFullView: "Full note view",
    },
  },
  pe = { lengthLimit: "Context has been trimmed to {{max}} characters" },
  ue = {
    bold: "Bold",
    code: "Code",
    highlight: "Highlight",
    italic: "Italic",
    strike: "Strike",
  },
  me = {
    trigger: {
      create: {
        success: "Trigger created successfully",
        error: "Failed to create trigger",
      },
      update: {
        success: "Trigger updated successfully",
        error: "Failed to update trigger",
      },
      delete: {
        success: "Trigger deleted successfully",
        error: "Failed to delete trigger",
      },
      toggle: {
        activated: "Trigger activated",
        deactivated: "Trigger deactivated",
        error: "Failed to toggle trigger status",
      },
    },
  },
  he = {
    recording: {
      button: {
        start: "Quick Note",
        tooltip: `Record even without an internet connection.
When recording ends, it will be automatically uploaded and transcription will begin.`,
      },
      status: {
        recording: "Recording",
        paused: "Paused",
        uploadPending: "Upload Pending",
        uploading: "Uploading",
        uploadFailed: "Upload Failed",
      },
      controls: {
        language: "Language Selection",
        languageTooltip: `When the recording ends, Tiro will generate documents in your selected language.
Don't worry about the conversation language - Tiro automatically detects and transcribes it.`,
        pause: "Pause",
        resume: "Resume",
        stop: "Stop Recording",
        folderTooltip: "Select a folder to save the note",
      },
      success: {
        uploaded: "Upload Complete",
        uploadedDescription:
          "Recording uploaded. Transcription will start now.",
        goToNote: "Go to Note",
      },
      error: {
        uploadFailed: "Upload Failed",
        uploadFailedDescription:
          "Failed to upload recording. Please try again or download the file.",
        startFailed: "Failed to start recording",
        pauseFailed: "Failed to pause recording",
        resumeFailed: "Failed to resume recording",
        stopFailed: "Failed to stop recording",
        microphoneAccess: "Failed to access microphone",
        recoveryFailed: "Failed to recover recording",
        maxRetriesReached: "Maximum retries reached",
        maxRetriesReachedDescription:
          "Upload failed after multiple attempts. Please download the file or try again later.",
        s3UploadExpired: "Upload link expired",
        s3UploadExpiredDescription:
          "The upload link has expired. Retrying will generate a new link.",
        s3UploadFailed: "Upload server error",
        s3UploadFailedDescription:
          "An error occurred while uploading to the file server. Please retry or download the file.",
      },
      retry: "Retry",
      autoStopped: { title: "Offline recording auto-stopped and uploading" },
      cancel: {
        title: "Cancel recording?",
        description: "The recording will not be saved and cannot be undone.",
        keepRecording: "Go back",
        confirm: "Cancel recording",
        success: "Recording has been cancelled",
      },
      sessionDiscarded: "Recording discarded",
      recovery: {
        title: "Unsaved Recordings Found",
        description: "You have {{count}} unsaved offline recording(s).",
        resumable: "You can continue recording from where you left off",
        resumeRecording: "Resume Recording",
        dismiss: "Dismiss",
        sessionTitle: "Offline Recording",
        upload: "Upload",
        discard: "Discard",
        discardAll: "Discard All",
        close: "Close",
      },
      unconverted: {
        title: "Recording file recovery",
        description:
          "These recording files remain on your device. Some may already have been processed into notes.",
        descriptionAction:
          "Download a WAV file to listen, or upload it to create a new note.",
        itemTitle: "Recording from {{date}}",
        modifiedAt: "Modified {{date}}",
        download: "Download WAV",
        downloadFileName: "Tiro recovery recording {{timestamp}}.wav",
        openFolder: "Show in folder",
        downloadNamed: "Download {{fileName}} as WAV",
        openFolderNamed: "Show {{fileName}} in folder",
        deleteNamed: "Delete {{fileName}}",
        empty: "There are no recording files available for recovery.",
        stopFailure: {
          title: "Couldn't finish ending the recording",
          description:
            "We kept the recording file instead of deleting it. You can save it as a WAV or delete it from the recovery screen.",
        },
        cancelFailure: {
          title: "Couldn't completely delete the recording",
          description:
            "We kept any recording files that may remain. You can review and delete them from the recovery screen.",
        },
        toast: { action: "View recordings" },
        unplayable: {
          title: "Can't play this file",
          description:
            "The file format couldn't be identified, so this recording can't be played or downloaded as a WAV file.",
        },
        deleteDialog: {
          title: "Delete this recording file?",
          description: "Deleted recording files can't be recovered.",
        },
        success: {
          download: "WAV file saved.",
          delete: "Recording file deleted.",
        },
        error: {
          list: "We couldn't load your recording files. Refresh and try again.",
          play: "We couldn't play this recording file.",
          download: "We couldn't save the WAV file.",
          delete: "We couldn't delete the recording file.",
        },
      },
    },
  },
  ge = JSON.parse(
    `{"tabs":{"overview":"Overview","apiKeys":"API keys","webhooks":"Webhooks","oauthApps":"OAuth apps"},"sidebar":{"user":"Account","expandSidebar":"Expand sidebar","collapseSidebar":"Collapse sidebar","oauthAppsOrganizationOnly":"Available in the organization scope only.","oauthAppsIntegrationManagerOnly":"Only organization admins and developers can manage these.","oauthAppsAccessUnavailable":"Your organization role has not been confirmed."},"context":{"label":"Manage resources for","placeholder":"Select an account, organization, or workspace","workspaces":"Workspaces","organizations":"Organizations","organizationFallback":"My organization","accounts":"Account","account":"My account"},"overview":{"title":"Overview","openDocs":"Developer docs","documentation":{"title":"Documentation","restApi":{"title":"REST API","description":"Send your first API request."},"mcp":{"title":"MCP Server","description":"Connect Tiro to your AI tools."},"cli":{"title":"CLI","description":"Install the CLI and get started."},"webhookGuide":{"title":"Webhook guide","description":"Set up event delivery."}}},"common":{"copy":"Copy","actions":"Actions","edit":"Edit","delete":"Delete","cancel":"Cancel","done":"Done","save":"Save","saving":"Saving...","creating":"Creating...","deleting":"Deleting...","nameLabel":"Name","nameRequired":"Please enter a name","copyFailed":"Couldn't copy","status":{"active":"Active","inactive":"Inactive"}},"notice":{"workspaceLoadFailed":"Couldn't load your workspaces","retry":"Try again","noWorkspaceTitle":"No workspaces yet","noWorkspaceDescription":"Join a workspace to manage its resources here.","workspaceListLoadFailedTitle":"Couldn't load your workspaces","workspaceListLoadFailedDescription":"Please try again in a moment.","workspaceNotFoundTitle":"Workspace not found","workspaceNotFoundDescription":"It may have been deleted, or you may no longer have access.","contextLoadFailedTitle":"Couldn't load your management options","contextLoadFailedDescription":"Please try again in a moment.","organizationAccessDeniedTitle":"You can't view organization resources","organizationAccessDeniedDescription":"You need an organization admin or developer role. Ask an organization admin to grant you one.","organizationAccessLoadFailedTitle":"Couldn't check your organization access","organizationAccessLoadFailedDescription":"Please try again in a moment.","workspaceAdminOnlyTitle":"Only workspace admins can create integrations","workspaceAdminOnlyDescription":"Ask a workspace admin, or switch to your account to create a personal integration.","switchToAccount":"Switch to my account"},"apiKeys":{"title":"API keys","workspaceDescription":"Workspace admins can create and manage them. Listing folders and folder trees requires an account API key or OAuth sign-in.","organizationDescription":"Organization admins and developers can create and manage them. Listing folders and folder trees requires an account API key or OAuth sign-in.","accountDescription":"They act with your permissions in every workspace you can access. Use an account API key when an integration asks for a personal key.","folderBoundaryNoticeTitle":"Some API keys still use the previous scope","folderBoundaryNoticeDescription":"These keys are being moved over in stages so they only work with notes in folders shared with the whole workspace. If you need notes from private folders, use an account API key. It reaches every note that account can access.","folderBoundaryNoticeOrganizationDescription":"These keys are being moved over in stages so they only work with notes in folders shared with the whole workspace.","createButton":"Create API key","empty":{"title":"Start building with the Tiro API","description":"Use an API key to authenticate requests and securely access the data you need.","guide":"API quickstart"},"table":{"name":"Name","keyId":"Key ID","status":"Status","expires":"Expires","lastUsed":"Last used","created":"Created","scopes":"Scopes","allowedHosts":"Allowed hosts","allScopes":"All scopes","anyHost":"Any host"},"status":{"expired":"Expired","neverExpires":"Never","neverUsed":"Never"},"notice":{"userLoadFailed":"Couldn't load your account API keys","workspaceLoadFailed":"Couldn't load workspace API keys","organizationLoadFailed":"Couldn't load organization API keys"},"dialog":{"createTitle":"Create API key","namePlaceholder":"e.g. My integration","descriptionLabel":"Description","descriptionPlaceholder":"What this key will be used for","expirationLabel":"Expiration","expiry90days":"90 days (default)","expiry1year":"1 year","expiryNever":"Never expires","expiryCustom":"Custom date","createConfirm":"Create","editTitle":"Edit API key","deleteTitle":"Delete API key","deleteDescription":"Are you sure you want to delete this API key? This can't be undone, and any integration using it will stop working immediately.","deleteConfirm":"Delete","scopesLabel":"Scopes","scopesPlaceholder":"Select scopes","scopesSelected":"{{count}} selected","scopesSearchPlaceholder":"Search scopes","scopesEmpty":"No scopes found","scopeModeAll":"All scopes","scopeModeAllDescription":"Allows all API actions within the resources this key can access. Restrictions based on key type and user permissions still apply.","scopeModeRestricted":"Only selected scopes","workspaceAccessLabel":"Workspaces this key can access","workspaceAccessModeAll":"All current and future workspaces","workspaceAccessModeAllDescription":"Recommended. New workspaces are included automatically.","workspaceAccessModeRestricted":"Only selected workspaces","workspacesPlaceholder":"Select workspaces","workspacesSelected":"{{count}} selected","workspacesSearchPlaceholder":"Search workspaces","workspacesEmpty":"No matching workspaces","workspaceSelectionRequired":"Select at least one workspace","removeWorkspace":"Remove workspace from selection","unavailableWorkspace":"Workspace currently unavailable ({{guid}})","removeScope":"Remove scope","allowedHostsLabel":"Allowed hosts","allowedHostsPlaceholder":"Type a host and press Enter","allowedHostsHint":"Leave empty to allow any host.","applyDelayHint":"It can take up to a minute for changes to take effect.","removeHost":"Remove host","inheritedHostsHeading":"Inherited from your organization (always applied)","inheritedHostsTooltip":"Managed in your organization settings. You can't change these here."},"secret":{"title":"Save your API key securely","description":"This key is shown only once. You won't be able to see it again after closing this dialog.","copied":"API key copied"},"toast":{"created":"API key created","createFailed":"Couldn't create the API key","updated":"API key updated","updateFailed":"Couldn't update the API key","deleted":"API key deleted","deleteFailed":"Couldn't delete the API key","keyIdCopied":"Key ID copied"}},"oauthApps":{"title":"OAuth apps","description":"An app can access only what the authorizing user can, and only within the scopes they consent to.","createButton":"Register OAuth app","listLoadFailed":"Couldn't load OAuth apps","loadMore":"Load more","loadingMore":"Loading...","loadMoreFailed":"Couldn't load the next page. Try again.","empty":{"title":"No OAuth apps registered","description":"Register an app that will request user consent to call the Tiro External API."},"metadata":{"loadFailed":"Couldn't verify the available OAuth scopes","createDisabled":"You can still view and discard existing apps. New registrations are paused until the scope information loads."},"unknown":{"title":"Check the app registration result","reconciling":"We're checking the OAuth app list again.","description":"We couldn't confirm whether the OAuth app was registered. If it was registered, its Client Secret can't be shown again. Don't register it again if the new app appears in the list; retry only if it isn't listed.","reconcileFailed":"We couldn't confirm whether the OAuth app was registered or load the app list. You can't register another app until the list loads.","reviewed":"I've checked the list"},"table":{"name":"Name","clientId":"Client ID","status":"Status","created":"Registered"},"status":{"STAGED":"Legacy inactive","ACTIVE":"Active","DISABLED_FOR_NEW_GRANTS":"New grants disabled","REVOKED":"Discarded","stagedDescription":"Created by the previous flow and unavailable"},"dialog":{"createTitle":"Register OAuth app","editTitle":"Edit OAuth app","editDescription":"Change the app details and the scopes it requests from users.","scopeNarrowingNotice":"Removing scopes ({{scopes}}) leaves people who already authorized this app with only the scopes that remain. If none remain, they have to authorize again.","description":"Enter the app details and the scopes it will request from users.","secretDescription":"Save the credentials shown now before completing registration.","namePlaceholder":"e.g. Internal automation tool","redirectUrisLabel":"Redirect URIs","redirectUriRowLabel":"Redirect URI {{index}}","redirectUrisHint":"Use a redirect_uri that exactly matches one of the registered URLs in each authorization request.","addRedirectUri":"Add Redirect URI","removeRedirectUri":"Remove Redirect URI {{index}}","redirectUriErrors":{"required":"Enter a Redirect URI.","duplicate":"Each Redirect URI must be unique.","invalid":"Enter a valid Redirect URI. HTTP is allowed only for localhost, 127.0.0.1, and [::1]."},"scopesLabel":"Requested scopes","resource":"Resource: {{resource}}","scopePresets":{"all":"Select all","readOnly":"Read-only","clear":"Clear"},"createConfirm":"Register"},"scopeDescriptions":{"note_read":"Read note lists, metadata, and transcripts.","note_write":"Update note metadata such as titles. Includes note read access.","note_summary_read":"Read note summary documents.","note_document_read":"Read generated documents.","note_document_template_read":"List and read document templates.","folder_read":"Read folders.","folder_write":"Create, update, and delete folders. Includes folder read access.","wiki_read":"Read and search Wiki.","word_memory_read":"Read word memories."},"secret":{"title":"Store the Client Secret securely","description":"The Client Secret is shown only once. You won't be able to see it again after closing this dialog.","copied":"Client Secret copied","savedAcknowledgement":"I've stored the Client ID and Client Secret securely"},"edit":{"action":"Edit"},"disable":{"action":"Stop new authorizations","title":"Stop new authorizations?","description":"Only people authorizing this app from now on are blocked. Anyone who already authorized it keeps working. You can resume at any time.","confirm":"Stop","disabling":"Stopping..."},"enable":{"action":"Resume new authorizations"},"regenerate":{"action":"Regenerate secret","title":"Regenerate the Client Secret?","unknownTitle":"Check the regeneration result","description":"The current Client Secret stops working immediately. Add the new secret to every service that uses this app to keep it connected.","confirm":"Regenerate","regenerating":"Regenerating...","secretTitle":"Store the new Client Secret","secretDescription":"The previous Client Secret no longer works. Add the new one to every service that uses this app.","savedAcknowledgement":"I've stored the new Client Secret securely","unknown":"We couldn't confirm the regeneration result. The Client Secret may have already changed. If the previous secret stops working, regenerate it again."},"discard":{"action":"Discard legacy registration","title":"Discard this OAuth app registration?","description":"This legacy inactive registration can't be used. Discard it and register the OAuth app again to use it.","confirm":"Discard registration","discarding":"Discarding..."},"toast":{"created":"OAuth app registered","updated":"OAuth app updated","updateFailed":"Couldn't update the OAuth app.\\nTry again.","enabled":"New authorizations resumed","disabled":"New authorizations stopped","enabledChangeFailed":"Couldn't change the status.\\nTry again.","createFailed":"Couldn't register the OAuth app.\\nTry again.","discarded":"OAuth app registration discarded","discardFailed":"Couldn't discard the OAuth app registration.\\nTry again.","regenerateFailed":"Couldn't regenerate the Client Secret.\\nTry again.","clientIdCopied":"Client ID copied"}},"webhooks":{"title":"Webhooks","workspaceDescription":"Workspace admins can create and manage them.","organizationDescription":"Organization admins and developers can create and manage them.","accountDescription":"They receive events from every workspace you can access.","folderBoundaryNoticeTitle":"Some webhooks still use the previous delivery scope","folderBoundaryNoticeDescription":"These endpoints are being moved over in stages so they only receive note events from folders shared with the whole workspace.","createButton":"Create webhook","empty":{"title":"Automate your workflow with webhooks","description":"Receive note creation and update events at your HTTPS endpoint.","guide":"Webhook guide"},"table":{"name":"Name","url":"URL","events":"Events","status":"Status","created":"Created","eventCount_one":"{{count}} event","eventCount_other":"{{count}} events"},"notice":{"userLoadFailed":"Couldn't load your account webhooks","workspaceLoadFailed":"Couldn't load workspace webhooks","organizationLoadFailed":"Couldn't load organization webhooks"},"dialog":{"createTitle":"Create webhook endpoint","createDescription":"Receive event notifications at an HTTPS endpoint.","namePlaceholder":"e.g. Notification integration","urlLabel":"URL","urlRequired":"Please enter a URL","urlInvalid":"Please enter a valid URL","urlHelp":"Tiro sends webhook POST requests to this URL.","eventTypesLabel":"Event types","selectAll":"Select all","deselectAll":"Deselect all","eventsSelected_one":"{{count}} event type selected","eventsSelected_other":"{{count}} event types selected","eventsRequired":"Please select at least one event type","activeLabel":"Active","activeDescription":"Turn this off to pause webhook delivery.","createConfirm":"Create","editTitle":"Edit webhook endpoint","editDescription":"Update this endpoint's URL and events.","deleteTitle":"Delete webhook","deleteDescription":"Are you sure you want to delete this webhook endpoint? This can't be undone.","deleteConfirm":"Delete"},"secret":{"title":"Save your webhook secret securely","description":"This secret is shown only once. Use it to verify webhook payloads from Tiro, so copy it now.","copied":"Webhook secret copied"},"toast":{"created":"Webhook created","createFailed":"Couldn't create the webhook","updated":"Webhook updated","updateFailed":"Couldn't update the webhook","deleted":"Webhook deleted","deleteFailed":"Couldn't delete the webhook"},"eventTypeLabels":{"note_created":"Note created","note_deleted":"Note deleted","note_ended":"Note ended","note_participants_updated":"Participants updated","note_user_content_updated":"Note content updated","note_recording_completed":"Recording paused","folder_note_added":"Note added to folder","folder_note_removed":"Note removed from folder","note_document_generated":"Document generated","note_document_updated":"Document updated","note_document_deleted":"Document deleted","note_summary_generated":"Summary generated","note_summary_updated":"Summary updated","note_summary_deleted":"Summary deleted"},"resourceTypeLabels":{"note":"Note","foldernoterelation":"Folder","notedocument":"Document","notesummary":"Summary"}}}`,
  ),
  ye = JSON.parse(
    `{"wordMemory":{"title":"Organization word memory","description":"This vocabulary applies across your whole organization. Add the domain terms, service names, and internal system names you use often, and Tiro will transcribe them accurately.","bulkImport":"Bulk add","bulkExample":"Renaissance, Renaissance\\nCicero, Cicero\\nNietzsche, Nietzsche","bulkSubmit":"Add {{count}}","bulkSubmitting":"Adding…","bulkUpload":"Choose CSV file","bulkDownloadSample":"Download sample CSV","bulkCancel":"Close","sampleCsv":"Renaissance,Renaissance\\nCicero,Cicero\\nNietzsche,Nietzsche","noWords":"No words added yet","loadError":"Couldn't load the word memory","entryColumn":"Pronunciation","subEntryColumn":"Notation","entryPlaceholder":"e.g. Renaissance","subEntryPlaceholder":"e.g. Renaissance","optional":"(optional)","addAriaLabel":"Add word","deleteAriaLabel":"Delete {{word}}","editAriaLabel":"Edit word","editEntryAriaLabel":"Edit pronunciation","editSubEntryAriaLabel":"Edit notation","saveAriaLabel":"Save","cancelAriaLabel":"Cancel"},"policy":{"title":"Security policy","loadError":"Couldn't load the security policy.","retry":"Try again","locked":"View only","lockedHint":"Your organization's policy makes this view-only.\\nContact your account manager to change it.","enterpriseOption":"Enterprise option","enterpriseOptionHint":"This option isn't included in your current contract.\\nContact your account manager to add it.","groups":{"appAndWorkspace":"App & workspace use","audioData":"Audio data","contentAndSharing":"Content protection & sharing","members":"Member management","invitesAndAccess":"Invites & access restrictions"},"allowCapture":{"title":"Allow screen capture","description":"Allow members to capture the screen in the Tiro app. Turn this off to block screen capture for all members.","updateSuccess":"Screen capture policy updated","updateError":"Couldn't update the screen capture policy"},"masking":{"title":"Personal info masking","description":"Automatically masks personal info like phone numbers, emails, and ID numbers in new notes. Existing notes aren't affected.","updateSuccess":"Personal info masking setting updated","updateError":"Couldn't update the personal info masking setting"},"audioRetention":{"title":"Audio replay","description":"Blocking replay deletes the audio right away. Setting a period deletes it once that period ends. Transcripts and notes stay available.","blocked":"Block","unlimited":"Allow","threeDays":"Allow for 3 days","sevenDays":"Allow for 7 days","custom":"Set a time limit","fieldLabel":"Replay access period","daysUnit":"days","rangeError":"Enter a whole number from 1 to 365.","confirmTitle":"Change the audio replay setting?","confirmDescription":"The new setting also applies to existing recordings. Audio is deleted immediately if replay is blocked or the new access period has already ended. Deleted audio can't be recovered.","confirmAction":"Change setting","updateSuccess":"Audio replay setting updated","updateError":"Couldn't update the audio replay setting.\\nTry again in a moment."},"deleteLocalAudioAfterProcessing":{"title":"Auto-delete audio files after processing","description":"Once processing is complete, audio files left on members' devices are deleted automatically, and those files can't be shared or exported. Applies to recordings made after this setting is turned on.","confirmTitle":"Turn on automatic audio deletion?","confirmDescription":"Audio files left on members' devices will be removed automatically once processing completes. Deleted files can't be recovered, even if you turn this setting off later.","confirmAction":"Turn on","updateSuccess":"Audio auto-delete policy updated","updateError":"Couldn't update the audio auto-delete policy"},"restrictShareLink":{"title":"Block share links","description":"Members can't create share links, and existing links stop working. Sharing directly with members in the app is still available."},"sharePolicy":{"title":"Share link policy","description":"The baseline share link policy for every workspace in your organization. The stricter of the workspace and organization settings applies.","updateSuccess":"Share link policy updated","updateError":"Couldn't update the share link policy","companyOnly":{"title":"Company email only","description":"When on, new and existing share links can only be opened after signing in with an allowed email domain.","privateLockedHint":"Sharing is currently capped at 'Private (no link sharing)', which is stricter than company email-only access.\\nTo change this setting, contact your account manager or email partners@theplato.io."},"maxDuration":{"title":"Maximum link duration","description":"Share links stop working this many days after they were created. Leave it empty for no limit.","unlimited":"No limit","days":"{{days}} days"},"domains":{"title":"Allowed email domains","description":"Domains allowed for company-email-only viewing. If a workspace also sets domains, only domains present in both lists are allowed.","placeholder":"e.g. {{domain}}","add":"Add","remove":"Remove domain","empty":"No domains configured."}},"restrictNonOrgWorkspace":{"title":"Organization workspaces only","description":"When on, members can only create notes and record in organization workspaces.","updateSuccess":"Organization workspaces only setting updated","updateError":"Couldn't update the organization workspaces only setting"},"allowMemberWorkspaceCreation":{"title":"Workspace creation by members","description":"Allow members to create new workspaces. Turn this off to limit creation to organization admins.","updateSuccess":"Workspace creation setting updated","updateError":"Couldn't update the workspace creation setting"},"allowedHosts":{"title":"API key allowed hosts","description":"Only requests sent to a host you register are authenticated. A call to any other host is rejected even with a valid key. This applies to every API key in your organization, and an empty list means no restriction.","applyDelayHint":"It can take up to a minute for changes to take effect.","placeholder":"e.g. mycompany.api.tiro.ooo","add":"Add","remove":"Remove host","anyHost":"No restriction (any host allowed)","updateSuccess":"Allowed hosts updated","updateError":"Couldn't update the allowed hosts"},"inviteDomains":{"title":"Invite allowed domains","description":"Decide which email domains can be invited, so people outside your organization can't reach your material. Workspace members and note collaborators are set separately, and an empty list means no restriction.","inputLabel":"Domain to allow","placeholder":"e.g. {{domain}}","add":"Add","remove":"Remove {{domain}}","anyDomain":"Not restricted by this list","workspaceMember":{"title":"Workspace member invites","description":"Only emails on this list can be invited as workspace members. Removing a domain also cancels any pending invite that no longer qualifies."},"noteUser":{"title":"Note collaborator invites","description":"Only emails on this list can be invited to a note. It applies alongside each workspace's own list, and this one is the ceiling, so a workspace can't widen it."},"lastDomainWarning":{"title":"Emptying the list lifts the restriction","description":"Once you save, this list no longer restricts anyone. Add a domain first if you want to keep the restriction in place.","confirm":"Lift and save"},"updateSuccess":"Allowed invite domains updated","updateError":"Couldn't update the allowed invite domains"},"leaverNotePreservation":{"title":"Preserve departed member notes","description":"When a member leaves the organization, their notes are preserved in its archive workspace.","updateSuccess":"Departed member note preservation setting updated","updateError":"Couldn't update the departed member note preservation setting"},"allowedIps":{"title":"Allowed IPs","description":"Only requests from the IP ranges you register are allowed. This applies to member access and organization API keys, and an empty list allows any IP.","currentIp":"We always include your current IP ({{currentIpCidr}}) when you save.","currentIpLoadError":"We couldn't determine your current IP, so this setting can't be changed.","loadError":"We couldn't load the allowed IPs.","retry":"Try again","inputLabel":"IP address or CIDR to allow","placeholder":"e.g. 203.0.113.10 or 203.0.113.0/24","add":"Add IP","remove":"Remove {{cidr}}","disable":"Remove IP restriction","anyIp":"No restriction (any IP allowed)","updateSuccess":"Allowed IPs updated","updateError":"Couldn't update the allowed IPs.\\nTry again."}},"noMembers":"No members","name":"Name","email":"Email","createdAt":"Created","role":{"unpaidAdmin":"Unpaid admin","viewer":"Viewer","label":"Organization role","allRoles":"All roles","admin":"Admin","member":"Member","developer":"Developer"},"tabs":{"overview":"Overview","workspaces":"Workspaces","members":"People","memberHistory":"Audit","usage":"Analytics","security":"Security","directorySync":"Directory sync (SCIM)","wordMemory":"Word memory"},"directorySync":{"title":"Directory sync (SCIM)","loadError":"Couldn't load directory sync info.","retry":"Try again","connection":{"title":"IdP connection","description":"Connect an IdP such as Okta or Microsoft Entra ID to sync members and groups automatically.","connect":"Connect IdP","continueSetup":"Continue setup","portalLinkError":"Couldn't create the setup link","syncStatusPending":"Recording changes","syncStatusActive":"Applying changes","disconnected":"Disconnected"},"groups":{"title":"Group-to-workspace links","description":"Link IdP groups to workspaces so group membership changes are applied to the mapped workspace. Changes in unlinked groups are not applied.","groupColumn":"Group","workspaceColumn":"Linked workspace","map":"Link workspace","change":"Change","add":"Add","searchPlaceholder":"Search workspaces","suggested":"Suggested","bulk":{"trigger":"Match by name ({{total}})","title":"Link groups to same-named workspaces","description":"Each selected group is linked to the existing workspace that carries the same name. Its members can then see the notes already in that workspace, so review the list before applying.","matched":"Ready {{count}}","ambiguous":"Duplicate names {{count}}","none":"No match {{count}}","groupColumn":"Group","workspaceColumn":"Workspace to link","manualHeading":"{{count}} groups need your decision","ambiguousItem":"{{name}} ({{count}} workspaces)","emptyMatched":"No group name matches exactly one workspace. Link these groups one by one instead.","apply":"Link {{count}} groups","applying":"Linking {{done}}/{{total}}","cancel":"Cancel","success":"Linked {{applied}} groups.\\nMembers join once sync is turned on. If sync is already on, run 'Sync now' to apply immediately.","partial":"Linked {{applied}} groups before stopping.\\nPlease try the rest again.","error":"Couldn't link the groups.\\nPlease try again in a moment.","loadingCandidates":"Loading candidates","loadError":"Could not load the candidates.","retry":"Try again","duplicateGroup":"Duplicate group names {{count}}","duplicateGroupItem":"{{name}} (more than one group with this name)"},"noSearchResults":"No results found","workspacesLoadError":"Couldn't load workspaces.","empty":"No synced groups yet. Assign groups in your IdP and they'll show up here.","loadMore":"Load more","loadError":"Couldn't load groups.","unmappedWarning":"Not linked yet. Membership changes in this group are not applied.","deletedWorkspace":"{{name}} (deleted)","removeMapping":"Unlink","mappingCreateSuccess":"Group linked to workspace","mappingCreateError":"Couldn't link the group","mappingUpdateSuccess":"Linked workspace changed","mappingUpdateError":"Couldn't change the linked workspace","mappingDeleteSuccess":"Link removed","mappingDeleteError":"Couldn't remove the link"},"apply":{"title":"Apply changes","descriptionPending":"IdP changes are being recorded but aren't being applied to memberships yet. Review the expected changes before you start applying them.","descriptionActive":"IdP changes are being applied to memberships.","previewTitle":"Expected changes","previewRefresh":"Refresh preview","previewLoadError":"Couldn't load the preview.","directoryUserCount":"Total directory users","addOrgMembers":"Members to add to the organization","deprovision":"Members who will lose access to Tiro","unmappedGroups":"Groups not linked to a workspace","conflicts":"Users in another organization","workspaceAdds":"Members to add to workspaces","workspaceRemovals":"Workspace memberships to be removed","grantRevokes":"Workspace grants to be revoked","peopleCount":"{{count}}","groupCount":"{{count}}","activate":"Start applying changes","confirmTitle":"Start applying IdP changes?","confirmDescription":"From then on, IdP changes will be applied to memberships, and one full sync will run.","confirmAction":"Start applying changes","activateSuccess":"IdP changes are now being applied","activateError":"Couldn't start applying IdP changes","deactivate":"Pause applying changes","deactivateSuccess":"IdP changes are no longer being applied","deactivateError":"Couldn't pause applying IdP changes","reconcile":"Sync now","reconcileSuccess":"Sync requested","reconcileError":"Couldn't request a sync","membershipCount":"{{count}}","countUnknown":"Unknown","reconcileConfirmTitle":"Sync now?","reconcileConfirmDescription":"This sync may remove {{count}} workspace memberships.","reconcileConfirmDescriptionUnknown":"Couldn't determine how many memberships would be removed. Refresh the preview to check the expected changes before syncing.","reconcileConfirmAction":"Sync"}},"memberHistory":{"title":"Permission history","emptyFiltered":"No permission history matches these filters","description":"Review when members were added or removed and when their roles changed. Kept for privacy compliance and auditing.","searchPlaceholder":"Search by name or email","startDate":"Start date","endDate":"End date","allActions":"All types","actionLabel":"Type","action":{"added":"Added","removed":"Removed","roleChanged":"Role changed"},"member":"Member","change":"Change","performedBy":"Performed by","occurredAt":"When","systemActor":"System","unknownUser":"Unknown user","deletedUser":"Deleted user","empty":"No permission history yet","loadError":"Couldn't load the history","showing":"Showing {{count}}, more to load","loadMore":"Load more"},"auditLog":{"tabs":{"permissionHistory":"Permission history","auditLog":"Audit logs","accessLog":"Access logs"},"title":"Audit logs","description":"Create a CSV of member permission changes and log-file creation records.","selectDates":"Select a date range","actionFilter":"Action type","actionsSelected":"{{count}} action types","actions":{"all":"All actions","authLogin":"Successful login","noteRead":"View note","noteUpdate":"Edit note","noteDelete":"Delete note","transcriptDelete":"Delete transcript paragraph","memberRoleAdd":"Member role assigned","memberRoleChange":"Member role changed","memberRoleRemove":"Member role revoked","auditLogSearch":"Audit log queried","auditLogExport":"Audit log exported","wikiPageList":"Wiki pages listed","wikiPageView":"Wiki page viewed","wikiSearch":"Wiki searched","wikiGraphSeed":"Wiki graph viewed","wikiGraphExpand":"Wiki graph expanded","wikiGraphAround":"Wiki graph explored around","wikiSourceOpen":"Wiki sources viewed"},"createExport":"Create log file","download":"Download","status":{"QUEUED":"Queued","RUNNING":"Creating","READY":"Ready","FAILED":"Failed","EXPIRED":"Expired"},"list":{"title":"Request history","requestedFilter":"Requested","requestedWithin":{"7":"Last 7 days","30":"Last 30 days","90":"Last 90 days","365":"Last year","all":"All time"},"emptyFiltered":"No log files were requested in the selected period ({{range}})","requestedAt":"Requested at","period":"Period","requestedBy":"Requested by","status":"Status","recordCount":"Records","expiresAt":"Expires {{datetime}}","failureReason":"Failure reason","truncated":"Partial result","empty":"No log files have been created yet","loadError":"Couldn't load the log-file request history","showing":"Showing {{count}}, more to load","loadMore":"Load more"},"export":{"timezone":"Time zone","timezoneHelp":"Enter a region timezone or UTC offset, for example Asia/Seoul, America/New_York, or +09:00.","timezoneUtc":"UTC (UTC+00:00)","timezoneSeoul":"Korea Standard Time (UTC+09:00)","title":"Create log file","description":"The download reason is recorded in the audit log. Files can be up to 1 GB.","period":"Log period","periodHelp":"You can select up to {{maxDays}} days. The most recent 15 minutes are excluded automatically.","reason":"Download reason","reasons":{"CUSTOMER_REQUEST":"Customer request","INCIDENT_INVESTIGATION":"Incident investigation","LEGAL_AUDIT":"Legal audit","INTERNAL_OPERATION":"Internal operations","PERIODIC_REVIEW":"Periodic review","OTHER":"Other"},"detail":"Reason details","detailPlaceholder":"e.g. Q3 2026 security review","detailHelp":"Enter 10 to 200 characters, excluding leading and trailing spaces.","detailError":"Enter 10 to 200 characters for the reason details.","submit":"Create"},"failure":{"archivedRange":"Some logs in this period are in long-term storage and aren't immediately available. Ask an administrator to restore them.","rangeTooLong":"The selected period is too long. Shorten it and try again.","scanBudget":"There are too many records to process. Narrow the date range and try again.","exportSizeLimit":"The log file exceeds 1 GB and could not be created. Narrow the date range and try again.","exportProcessingTimeout":"Creating the log file took too long and was stopped. Narrow the date range and try again.","archiveParse":"There was a problem reading some logs. If it continues after you try again, contact support.","internal":"We couldn't create the log file. Try again in a moment.","unknown":"We couldn't create the log file. Check the conditions and try again."},"errors":{"invalidTimezone":"Enter a valid region timezone or UTC offset.","selectRange":"Select both a start and end date.","noSettledRecords":"No logs in this period are ready yet. Try again in 15 minutes.","exportRangeTooLong":"The range exceeds the limit in the selected timezone. Move the end date one day earlier.","tooManyJobs":"Too many requests are still processing. Try again after one finishes.","invalidRequest":"The selected date range couldn't be processed. Shorten the range and try again.","createFailed":"We couldn't start creating the log file. Try again in a moment.","downloadFailed":"We couldn't start the download. Try again in a moment."}},"accessLog":{"title":"Access logs","description":"Create a CSV of organization member access logs."},"usage":{"title":"Analytics","reportTabs":{"usage":"Usage","signups":"New sign-ups"},"granularityOptions":{"daily":"Daily","weekly":"Weekly","monthly":"Monthly"},"accumulated":"Cumulative","startDate":"Start date","endDate":"End date","dateRangeValidation":"Start date must be before end date","usageChart":"Usage","signupChart":"New sign-ups","signupDefinition":"New sign-ups are grouped by the date current organization members created their Tiro accounts.","signupTotal_one":"There was {{count}} new sign-up in the selected period.","signupTotal_other":"There were {{count}} new sign-ups in the selected period.","signupCount":"New sign-ups","signupLoadError":"We couldn't load sign-up data. Try again in a moment.","signupRefreshError":"We couldn't refresh sign-up data, so you're seeing the previously loaded data.","signupLoading":"Loading sign-up data…","signupExport":{"button":"Sign-ups CSV","exporting":"Downloading…","success":"Sign-ups CSV downloaded.","error":"We couldn't download the sign-ups CSV. Try again."},"period":"Period","showDataTable":"Show data table","hideDataTable":"Hide data table","quotaReference":"Usage limit","minutesUsed":"min used","loading":"Loading…","noData":"No data available","noteCount":"Notes","recordingMinutes":"Recording (min)","activeUsers":"Active users","activeUsersDefinition":"Members who recorded during the period, shown as DAU/WAU/MAU by daily/weekly/monthly view.","activeUsersCount_one":"{{count}} active user","activeUsersCount_other":"{{count}} active users","usageFilter":{"button":"Usage filter","title":"Filter by usage","description":"Filter members by recording minutes in the selected period.","minPrefix":"At least","minSuffix":"min","maxPrefix":"Under","maxSuffix":"min","noLimitPlaceholder":"No limit","apply":"Apply","reset":"Reset","invalidRange":"Enter whole numbers of 0 or more, with the minimum less than the maximum","chipMin":"{{min}} min or more","chipMax":"Under {{max}} min","chipRange":"{{min}} to under {{max}} min","matchCount_one":"{{count}} member","matchCount_other":"{{count}} members","emptyResult":"No members match the filter","clearFilter":"Clear filter"},"memberBreakdown":"Usage by people","memberName":"Name","memberEmail":"Email","totalRecordingMinutes":"Total recording time","totalNoteCount":"Total notes","totalCreditsUsed":"Total credits used","totalOverageMinutes":"Total overage","orgQuotaUsage":"{{used}} min / {{quota}} min","orgUsageValue":"{{used}} min","orgQuotaPeriodHint":"Usage for the current billing period.","export":{"button":"Usage CSV","exporting":"Exporting...","sectionTotals":"Totals for selected dates","sectionTimeseries":"Reports by period","sectionRaw":"Raw data","memberBreakdown":"Totals by member","timeseries":"Overall","memberTimeseries":"By member","workspaceTimeseries":"By workspace","memberWorkspaceTimeseries":"Members × workspaces","cumulativeChip":"Cumulative","cumulativeHint":"Cumulative is on, so your CSV sums the entire selected date range into a single total.","success":"CSV file downloaded","error":"Couldn't export.\\nPlease try again.","workspaceBreakdown":"Totals by workspace"},"workspaceBreakdown":"Usage by Workspace","workspaceName":"Workspace"},"overview":{"subscription":"Subscription","subscriptionStart":"Starts","subscriptionEnd":"Ends","noSubscriptionEnd":"None","paymentState.active":"Active","paymentState.canceling":"Canceling","paymentState.pending":"Pending","paymentState.expired":"Expired","noSubscription":"No active subscription","editName":"Edit organization name","saveName":"Save","cancelEdit":"Cancel","manageMembers":"Manage people","manageWorkspaces":"Manage workspaces","viewUsage":"View usage","currentUsage":"Current usage","unlimited":"No limit","usagePercent":"{{percent}}% used","loadError":"Couldn't load your organization status.","loadErrorDescription":"Please try again in a moment.","retry":"Try again","updateSuccess":"Organization name updated","updateError":"Couldn't update the organization name"},"workspaces":{"createSuccess":"Workspace created","loadError":"Couldn't load workspaces.","emptyFiltered":"No workspaces match this search.","createError":"Couldn't create the workspace","deleteSuccess":"Workspace deleted","deleteError":"Couldn't delete the workspace","memberAddSuccess":"Member added","memberAddError":"Couldn't add the member","memberRemoveSuccess":"Member removed","memberRemoveError":"Couldn't remove the member","memberRoleUpdateSuccess":"Role updated","memberRoleUpdateError":"Couldn't update the role","searchPlaceholder":"Search by workspace name","addWorkspace":"Create workspace","totalCount":"{{count}} total","noWorkspaces":"No workspaces yet.","columnName":"Name","columnMembers":"People","columnUsage":"Usage / Limit","columnCreatedAt":"Created","systemBadge":"System","onboardingBadge":"Onboarding","onboarding":{"title":"Onboarding workspaces","description":"New members are automatically added to the workspaces below when they join your organization.","empty":"No workspaces designated yet.","add":"Add","searchPlaceholder":"Search workspaces by name","noSearchResults":"No results found.","limitReached":"You can designate up to {{max}} workspaces.","remove":"Remove from onboarding workspaces","loadError":"Couldn't load onboarding workspaces.","updateError":"Couldn't update the onboarding workspaces"},"usageValue":"{{used}} min / {{quota}} min","usageValueUnlimited":"{{used}} min / -","usageValueBlocked":"{{used}} min / Blocked","quotaUpdateSuccess":"Usage limit updated","quotaUpdateError":"Couldn't update the usage limit","nameUpdateSuccess":"Workspace name updated","nameUpdateError":"Couldn't update the workspace name","quota":{"quotaLabel":"Usage limit","mode":{"unlimited":"No limit","blocked":"Blocked (0 min)","limit":"Set a limit"},"minutesPerMonth":"min / month","placeholder":"e.g. 500","hint":"When this workspace's total usage reaches the limit, new recordings are blocked.","quickEditLabel":"Set usage limit"},"memberCount":"{{count}}","deleteWorkspace":"Delete workspace","loadMore":"Load more","createDialogTitle":"Create a workspace","createDialogDescription":"Create a new workspace in your organization.","nameLabel":"Workspace name","namePlaceholder":"Enter a workspace name","create":"Create","deleteDialogTitle":"Delete workspace","deleteDialogDescription":"Delete the workspace \\"{{name}}\\"? This can't be undone.","detail":{"back":"Back to list","loadError":"Couldn't load the workspace details.","editName":"Edit name","quotaTitle":"Usage limit","createdAt":"Created","updatedAt":"Updated","membersTitle":"People","membersShowing":"Showing {{count}}","membersLoadError":"Couldn't load the member list.","memberSearchLoadError":"Couldn't load search results.","addMember":"Add people","emailPlaceholder":"Enter an email","selectMemberPlaceholder":"Select a person","searchMemberPlaceholder":"Search by name or email","noMemberSearchResults":"No people found","add":"Add","noMembers":"No people yet.","removeMember":"Remove from workspace","dangerTitle":"Delete workspace","dangerDescription":"Deleting a workspace can't be undone."}},"members":{"searchPlaceholder":"Search by name or email","totalCount":"{{count}} total","loadError":"Couldn't load members","emptyFiltered":"No members match these filters","columns":"Columns","visibleColumns":"Visible columns","joinedAt":"Joined","showing":"Showing {{count}}, more to load","loadMore":"Load more","updateSuccess":"Organization role updated","updateError":"Couldn't update the member","removeMember":"Remove","removeMemberDialogTitle":"Remove from workspace","removeMemberDialogDescription":"Remove {{memberName}} from the organization? This can't be undone.","preserveNotesLabel":"Keep this member's notes","preserveNotesDescription":"Notes not shared to a workspace folder move to the organization's archive workspace.","removeSuccess":"Member removed","removeError":"Couldn't remove the member","moreActions":"More","suspendRecording":"Block recording","resumeRecording":"Allow recording","recordingSuspendedBadge":"Recording blocked","recordingSuspendSuccess":"Recording is now blocked for this member","recordingResumeSuccess":"Recording is now allowed for this member","onboardMembers":"Invite & Assign","onboardDialogTitle":"Invite teammate & Assign Workspaces","onboardDialogDescription":"Invite several members at once and set their organization role and workspace assignment.","onboardManualInput":"Manual input","onboardCsvUpload":"CSV Upload","onboardEmailPlaceholder":"Enter email addresses separated by commas or new lines","onboardDefaultRole":"Organization role","onboardDownloadTemplate":"Download CSV Template","onboardSubmit":"Invite & Assign","onboardSubmitting":"Processing...","onboardMaxExceeded":"You can invite up to {{max}} people at once.","onboardParsedCount":"{{count}} people ready to invite","onboardResultTitle":"Invite & Assign Results","onboardResultInvitedNew":"New users invited","onboardResultInvitedExisting":"Existing users invited","onboardResultAlreadyMembers":"Already in the Organization","onboardResultRoleUpdated":"Role updated","onboardResultFailed":"Failed","onboardError":"Couldn't invite and assign workspaces","onboardCsvMissingEmailColumn":"The CSV file must include an email column","onboardCsvLegacyTeamNameHeader":"The teamName header is no longer supported. Please rename the column to workspaceName and upload again.","onboardCsvParseError":"Couldn't parse the CSV file","onboardCsvInvalidAction":"The action column only accepts ADD or DELETE","onboardNoValidEmails":"No valid email addresses found","onboardProviderHint":"You can only invite emails that can sign in with a Google or Microsoft account.","onboardUnsupportedProviderWarning":"{{emails}} isn’t a Google or Microsoft account, so it may not be invited.","onboardCsvGuideTitle":"How to fill out the CSV","onboardCsvGuideColumnEmail":"The email address to invite. This one is required.","onboardCsvGuideColumnRole":"The organization role. Use ADMIN or MEMBER. Leave it blank to default to MEMBER.","onboardCsvGuideColumnWorkspace":"The workspace to assign. Leave it blank to skip assignment, or enter a new name to create a workspace.","onboardCsvGuideColumnAction":"ADD invites and assigns. DELETE removes from the workspace. Leave it blank to default to ADD.","onboardCsvGuideMoveTip":"To move someone between workspaces, add two rows: DELETE the old workspace and ADD the new one.","workspaces":"Workspaces","allWorkspaces":"All workspaces","workspaceFilterSelectedCount":"{{count}} workspaces","workspaceFilterSelectedCount_one":"{{count}} workspace","workspaceFilterSelectedCount_other":"{{count}} workspaces","workspaceFilterSearchPlaceholder":"Search workspaces by name","workspaceFilterNoResults":"No workspaces found","workspaceFilterLoadError":"Couldn't load workspaces","workspaceFilterWithoutWorkspace":"Only people without a workspace","noWorkspace":"No workspace","memberSheet":{"addToWorkspace":"Add to workspace","selectWorkspacePlaceholder":"Select a workspace","add":"Add","noAvailableWorkspaces":"No more workspaces to add.","membershipsLabel":"Workspaces","noMemberships":"Not in any workspace yet.","loadError":"Couldn't load workspace info. Please try again in a moment.","removeFromWorkspace":"Remove from workspace","searchWorkspacePlaceholder":"Search workspaces by name","noWorkspaceSearchResults":"No workspaces found"},"onboardWorkspaceName":"Workspace name","onboardWorkspaceNamePlaceholder":"Enter a workspace name (optional)","onboardWorkspaceAutoCreateTooltip":"If the workspace doesn't exist yet, it will be created automatically.","onboardResultWorkspaceUpdated":"Workspace updated","onboardResultWorkspaceRemoved":"Removed from workspace","onboardResultInvitationsRevoked":"Invitations revoked","resetPassword":"Reset password","passwordRecovery":{"confirmTitle":"Send a password reset email?","confirmDescription":"Their current password will work until they set a new one.","confirmSend":"Send email","description":"Email a reset link so this member can choose a new password.","sendEmail":"Send reset email","sending":"Sending…","sent":"Password reset email sent.","sendError":"We couldn’t send the email. Please try again shortly.","rateLimited":"Too many email requests. Please wait before trying again."},"resetPasswordDialogTitle":"Reset password","resetPasswordDialogDescriptionLine1":"Reset {{memberName}}'s password?","resetPasswordDialogDescriptionLine2":"A temporary password will be generated. Make sure to share it with them directly.","resetPasswordConfirm":"Reset","resetPasswordResultTitle":"Temporary password generated","resetPasswordResultDescriptionLine1":"This is {{memberName}}'s temporary password.","resetPasswordResultDescriptionLine2":"Share it securely and ask them to change it after signing in.","newPassword":"Temporary password","copyPassword":"Copy","resetPasswordAdminContact":"To reset an administrator's password, contact your account manager or email partners@theplato.io.","resetPasswordError":"Couldn't reset the password","loginProvider":{"local":"Email"},"detail":{"back":"Back to list","loadError":"Couldn't load this member.","infoTitle":"Member info","recordingSuspendDescription":"When turned off, they can't start new recordings, and any live recording in progress will stop.","resetPasswordDescription":"A temporary password will be generated. Make sure to share it with them directly.","loginMethodLabel":"Login method","dangerTitle":"Remove member","dangerDescription":"Removing a member from the organization can't be undone."}},"sidebar":{"organization":"Organization","user":"User","management":"Organization management","policies":"Policies"}}`,
  ),
  fe = {
    message: "Signing in...",
    subtitle: "Please wait a moment.",
    back: "Go back",
  },
  we = {
    conferenceMode: "Conference Mode",
    enterConference: "Conference Mode",
    normalView: "Normal view",
    translation: "Translation",
    toggleTranslation: "Show translation",
    waitingForCaptions: "Live captions will start shortly",
    eventInfo: "Event info",
    appBanner: {
      title: "Record your meetings with Tiro",
      description: "Live summaries, translation, and meeting notes",
      download: "Download",
      dismiss: "Dismiss",
    },
  },
  be = {
    status: {
      recording: "Recording",
      uploading: "Uploading...",
      uploadComplete: "Upload Complete",
      uploadFailed: "Upload Failed",
    },
    lockedNote: "Locked note",
  },
  ve = JSON.parse(
    `{"title":"Security | Tiro","description":"Audio is discarded immediately after transcription, customer data is never used to train AI models, and enterprise teams can connect Okta SSO and SCIM.","keywords":"Tiro security, AI meeting notes security, SOC 2, ISO 27001, data encryption, GDPR, DPA, Okta SSO, SCIM","hero":{"title":"Tiro Data Security & Privacy","subtitle":"Audio is discarded immediately after transcription, and customer data is never used to train AI models.","caption":"Tiro is an AI meeting assistant for busy business leaders, offering real-time transcription, automatic summarization, and structured, searchable notes under a strict security policy."},"principles":{"sectionTitle":"Our Data Protection Principles","processing":{"title":"Audio Discarded Instantly, Data Encrypted","description":"Audio files are irreversibly discarded right after transcription, never stored on disk in plaintext. Meeting notes and summaries are encrypted at rest with AES-256, using a separate per-user encryption key. Data in transit is protected with TLS 1.2+."},"location":{"title":"Stored in the AWS Seoul Region","description":"Your data lives in the AWS Seoul region (ap-northeast-2) with a Multi-AZ deployment, meeting Korean data sovereignty requirements and staying available through single-AZ failures. Enterprise customers can choose a different region or a dedicated VPC for physical tenant isolation."},"noTraining":{"title":"Never Used for AI Model Training","description":"No customer data, including your conversations, is used for model training or fine-tuning. This applies across free, paid, and enterprise tiers. Every LLM and STT vendor we use has signed a DPA that prohibits training and requires Zero Data Retention."}},"overview":{"sectionTitle":"Security Overview","encryption":{"title":"Encryption","description":"AES-256 for data at rest across all data stores (databases, block storage, and object storage); TLS 1.2+ in transit. Sensitive content carries an additional per-user encryption layer — so even an operator with direct database access cannot read it in plaintext."},"location":{"title":"Data Storage Location","description":"Hosted in the AWS Seoul region (ap-northeast-2) to meet Korean data sovereignty requirements. Multi-AZ deployment keeps the service available, and Enterprise contracts can use a different region or dedicated VPC for physical tenant isolation."},"keyManagement":{"title":"Key Management (KMS / HSM)","description":"AWS KMS protects encryption keys using FIPS 140-2 Level 3 validated HSMs, rotating them automatically every 12 months. Applications never hold plaintext keys; all encryption and decryption goes through the KMS API."},"accessControl":{"title":"Access Control","description":"Role- and attribute-based access controls (RBAC/ABAC) enforce least-privilege access. Plaintext content access is restricted to a small set of explicitly authorized personnel, and every access is permanently logged at the query and column level."},"monitoring":{"title":"Monitoring & Audit Logs","description":"We run 24×7 monitoring with AWS GuardDuty (threat detection), Inspector (vulnerabilities), WAF + Cloudflare (web attack protection), and Datadog dashboards. Audit logs are delivered to isolated, tamper-resistant storage, protected from modification by operational systems."},"backup":{"title":"Service Availability & Backup","description":"A 99.9% monthly SLA, with service credits if we miss it. Databases are backed up automatically under KMS encryption, with annual restore testing. Specific recovery objectives can be discussed during contracting."}},"enterprise":{"sectionTitle":"Enterprise Security Features","description":"Security controls built for enterprise environments.","features":{"sso":{"label":"Okta SSO","title":"SSO with Okta and other major IdPs","description":"Connect Tiro to Okta, Azure AD, Google Workspace, and other corporate IdPs through SAML 2.0/OIDC. Users log in with their company account, and access changes stay in sync with your IdP policies."},"mfa":{"label":"MFA","title":"MFA (Multi-Factor Authentication)","description":"Add OTPs, authenticator apps, or hardware keys as an extra layer of account security. Blocks unauthorized logins even if a password leaks."},"ip":{"label":"IP Access Restriction","title":"IP Access Restriction (workspace IP ranges)","description":"Set approved IP ranges per workspace and block access from anywhere else, so only office or VPN traffic gets through. Works independently of your IdP's conditional access policies."},"admin":{"label":"Admin Console","title":"Admin Console","description":"Usage dashboards by organization and team, with centralized policy management."},"audit":{"label":"Audit Logs","title":"Audit Logs","description":"User and admin activity logs with configurable retention (1 to 7 years). Export to CSV/JSON, or stream to your SIEM (Splunk, Datadog Cloud SIEM, Sumo Logic, Elastic, and others) to integrate with your existing security monitoring."},"share":{"label":"External Sharing Controls","title":"External Sharing Controls","description":"Block note sharing outside approved domains. Configure an allowlist of the domains you trust."},"capture":{"label":"Mobile Screen Capture Protection","title":"Mobile Screen Capture Protection","description":"Block screenshots inside the mobile app, with every attempt logged."},"scim":{"label":"SCIM 2.0 Provisioning (Enterprise option)","title":"SCIM 2.0 Provisioning (Enterprise option, timeline and scope by agreement)","description":"Automatic user sync through your IdP (create, update, deactivate) is planned as an Enterprise option. Rollout timeline and scope are agreed during contracting."},"pii":{"label":"PII Auto-Masking","title":"PII Auto-Masking","description":"Automatically detect and mask personally identifiable information in meeting notes, including national IDs, phone numbers, account numbers, and other sensitive identifiers."},"retention":{"label":"Data Retention Policy","title":"Data Retention Policy","description":"Set retention windows by domain (for example, 90, 180, or 365 days) with automatic deletion when the window closes."},"delete":{"label":"Complete Data Deletion on Account Closure","title":"Complete Data Deletion on Account Closure","description":"When an account is closed, all related data is irreversibly removed within 30 days."},"receipt":{"label":"Erasure Receipts","title":"Erasure Receipts","description":"Every deletion request, execution, and completion is logged and issued as a JSON or PDF receipt."},"vendor":{"label":"Vendor Routing Allowlist","title":"Vendor Routing Allowlist","description":"Choose which LLM and STT vendors are available to your tenant. Custom rules like Korea-only routing are supported when data sovereignty or vendor exclusion policies apply."},"session":{"label":"Session & Device Controls","title":"Session & Device Controls","description":"Policy-level controls for session lifetime, concurrent sessions, and device registration."}},"review":{"badge":"IT & Security Review","title":"Controls available with Okta integration","description":"Configure the authentication, provisioning, and audit controls your security team reviews against existing company policy.","items":{"protocol":{"title":"SSO protocol","description":"Connect through SAML 2.0/OIDC with Okta app configuration."},"mfa":{"title":"MFA policy","description":"Apply Okta MFA and conditional access policies at login."},"scim":{"title":"SCIM sync (Enterprise option)","description":"Automatic sync of user creation, deactivation, and group changes is an Enterprise option, with timeline and scope agreed during contracting."},"audit":{"title":"Audit trail","description":"Provide admin and user activity logs for security review."}}},"calloutLabel":"Enterprise option:","calloutDescription":"Dedicated cloud environments with physical tenant isolation, plus custom security options, are available on request.","calloutCta":"Talk to Sales"},"dataHandling":{"sectionTitle":"How Your Data Is Processed","principleLabel":"Audio handling principle:","principleQuote":"Audio is processed only to transcribe it, then irrecoverably discarded.","tableHeaders":{"mode":"Mode","flow":"Processing Flow","storage":"Storage"},"rows":{"realtime":{"mode":"Real-time (Streaming)","flow":"Microphone and system audio → STT engine (streaming) → text conversion, then discarded from memory and the stream","storage":"No plaintext disk storage"},"batch":{"mode":"Batch (Upload)","flow":"Audio/video upload → STT and speaker diarization → discarded immediately","storage":"Discarded automatically after processing"},"training":{"mode":"AI training","flow":"-","storage":"Never used"}},"exceptionLabel":"Exception - original audio retention on explicit opt-in:","exceptionBody":"If a user explicitly opts in to keep original audio for verification or backup, the audio is stored in their own encrypted storage with a separate key, and is permanently destroyed on deletion. The default is off, and organizations can enforce this policy centrally at the enterprise level.","deletionTitle":"Scope of Deletion","deletionBody":"Deletion covers the operational database, automatic backups, vector indexes, and caches. Some records are kept separately to meet statutory retention requirements and are automatically discarded once those windows close. On account closure, AWS KMS customer keys are scheduled for deletion so any residual encrypted data becomes permanently inaccessible."},"compliance":{"sectionTitle":"Compliance & Certifications","description":"Tiro is ISO 27001:2022 and SOC 2 Type 2 certified across five Trust Services Criteria, with control programs running on a dedicated GRC platform.","tableHeaders":{"cert":"Certification","stage":"Stage","status":"Status","document":"Reports"},"rows":{"iso1":{"cert":"ISO 27001:2022","stage":"Stage 1 (Readiness Review)","statusLabel":"Complete","document":"Shared under NDA"},"iso2":{"cert":"ISO 27001:2022","stage":"Stage 2 (Certification Audit)","statusLabel":"Certified","document":"Shared under NDA"},"soc2type2":{"cert":"SOC 2 Type 2","stage":"All 5 TSC (Security, Availability, Confidentiality, Processing Integrity, Privacy), plus operating effectiveness over the audit period","statusLabel":"Attested","document":"Shared immediately after NDA (Clickwrap)"}},"noteLabel":"The same controls operate before NDA","noteBody":" (the same controls, policy documentation, and evidence collection are in place). We can substantiate them with this Trust Document and our policy library on request.","contactPrompt":"For certification reports, DPAs, or policy documents, contact <a>{{email}}</a>."},"faq":{"sectionTitle":"Frequently Asked Questions","items":{"aiTraining":{"question":"Does Tiro use my conversations to train AI models?","answer":"No. No customer data, including your conversations, is used for model training or fine-tuning. This applies across free, paid, and enterprise tiers. Every LLM and STT vendor we use has signed a DPA that prohibits training and requires Zero Data Retention."},"dataLocation":{"question":"Where is my data stored?","answer":"Your data lives in the AWS Seoul region (ap-northeast-2) with a Multi-AZ deployment. It's encrypted with AES-256 using a separate per-user encryption key. Enterprise customers can choose a dedicated VPC or a different region."},"access":{"question":"Who can access my data?","answer":"By default, only you and the people you share with. Operationally, plaintext content access is restricted to a small set of explicitly authorized personnel, and every access request is permanently logged at the query and column level. Employees complete mandatory security training at onboarding and pass quarterly access reviews."},"voice":{"question":"How is voice audio handled?","answer":"In real-time mode, microphone and system audio is discarded from memory the moment it streams through the STT engine. There is no plaintext disk storage. Uploaded audio and video files are also discarded automatically once processing completes. The only exception is when a user explicitly opts in, in which case audio is retained in their own encrypted storage (off by default)."},"control":{"question":"Can I control whether audio is stored, how long notes are kept, and how they're shared?","answer":"Yes. Customers control the lifecycle of their data: audio retention, note retention windows, and external sharing scope. Enterprise plans extend this to organization-wide policies, including per-domain retention (for example, 90, 180, or 365 days), external sharing allowlists, and session timeout settings."},"delete":{"question":"What happens when I delete a note or my account?","answer":"Note bodies, transcripts, and summaries are hard-deleted from the operational database, vector indexes, and caches immediately. Automatic backups are discarded once their retention windows elapse. On account closure, AWS KMS customer keys are scheduled for deletion so any residual data becomes cryptographically inaccessible. Enterprise customers can receive an erasure record on request."},"certs":{"question":"Are you SOC 2 or ISO 27001 certified?","answer":"Yes. Tiro is SOC 2 Type 2 certified across all 5 TSC (Security, Availability, Confidentiality, Processing Integrity, Privacy) with an unqualified opinion from Sensiba LLP, and ISO 27001:2022 certified with Stage 1 (Readiness Review) and Stage 2 (Certification Audit) both complete. Controls run on the dedicated GRC platform, and reports are available under NDA."},"dpa":{"question":"Can I get a DPA (Data Processing Agreement)?","answer":"Yes. Reach out to <a>{{email}}</a>."},"subprocessors":{"question":"Which sub-processors do you use?","answer":"Infrastructure: AWS (Seoul region). LLM: Azure OpenAI (primary), Anthropic Claude (fallback), Google Vertex AI / Gemini, AWS Bedrock. STT: Deepgram, AssemblyAI, ElevenLabs, NAVER Cloud Clova, Google Speech-to-Text. Payments: Stripe, RevenueCat. Transactional email: SendGrid. All LLM and STT partners are bound by DPAs that prohibit training and require Zero Data Retention."},"sso":{"question":"Do you support SSO and MFA?","answer":"Yes. Enterprise plans support SAML 2.0/OIDC SSO with Okta, Azure AD, Google Workspace, and other major IdPs, plus MFA and SCIM provisioning for automatic user sync."},"deployment":{"question":"Do you support Private Cloud or On-Premise?","answer":"Yes. SaaS, Private Cloud, and On-Premise are all available depending on your security requirements. For isolation level, operating model, and other details, reach out to <a>{{email}}</a>."},"report":{"question":"How do I report a security issue?","answer":"Please report security vulnerabilities to <a>{{email}}</a>. Enterprise customers are covered by a 4-hour first-response SLA and a 24-hour customer-notification SLA for security incidents."}}},"contact":{"sectionTitle":"Get in Touch","intro":"Need additional materials for a security review, or have a question? We're happy to help.","label":"Security Contact","body":"For security reviews, DPA requests, certification reports, vulnerability disclosures, or any other security-related inquiries:","email":"partners@theplato.io"},"footerLink":"Security","trustCenter":"Trust Center"}`,
  ),
  ke = JSON.parse(
    `{"title":"Trust Center | Tiro","description":"Tiro's security certifications, controls, and compliance documentation — ISO/IEC 27001:2022 certified, SOC 2 Type 1 and Type 2 attested across five Trust Services Criteria.","keywords":"Tiro Trust Center, security, SOC 2, ISO 27001, compliance, subprocessors, DPA","hero":{"eyebrow":"Trust Center","company":"Tiro","tagline":"Security isn't a feature. It's how we operate.","description":"Tiro is an AI meeting assistant, built for security from day one. Explore our certifications, controls, and policies — and request the documents your security team needs.","requestAccess":"Request access","lastUpdated":"Last updated {{date}}","privacyPolicy":"Privacy Policy"},"nav":{"aria":"Trust Center sections","overview":"Overview","controls":"Controls","resources":"Resources","subprocessors":"Subprocessors","faq":"FAQ","updates":"Updates"},"overview":{"title":"Start your security review","intro":"Welcome to Tiro's Trust Center. Use this portal to review our security posture, browse our certifications and controls, and request the documents your security team needs.","viewAll":"View all","viewMore":"View {{count}} more controls","cta":{"request":"Request documents","requestDesc":"Get SOC 2, ISO, and policy documents under NDA.","browse":"Browse resources","browseDesc":"See available reports, policies, and legal documents.","contact":"Contact security"}},"compliance":{"sectionTitle":"Compliance","description":"Independently audited certifications, plus the frameworks our security program aligns to.","status":{"certified":"Certified","attested":"Attested","inProgress":"In progress"},"certs":{"iso":{"name":"ISO/IEC 27001:2022","detail":"Certified June 4, 2026 · Sensiba LLP","blurb":"The international standard for an information security management system (ISMS), confirmed by an independent, accredited audit."},"soc2type1":{"name":"SOC 2 Type 1","detail":"5 Trust Services Criteria","blurb":"Attests that our security controls are suitably designed at a point in time across five Trust Services Criteria."},"soc2type2":{"name":"SOC 2 Type 2","detail":"Attested July 24, 2026 · Sensiba LLP","blurb":"Evaluates how those controls actually operated over the audit period, across the same five Trust Services Criteria. Unqualified opinion."}},"frameworksTitle":"Frameworks & self-attestations","frameworksDescription":"Frameworks our information security program aligns to. Self-attested unless an audit is noted.","frameworks":{"nistCsf":"NIST CSF","nistAiRmf":"NIST AI RMF","cis":"CIS Controls 8.1","gdpr":"GDPR","ccpa":"CCPA / CPRA"}},"controls":{"sectionTitle":"Controls","description":"Security controls operating across our infrastructure and organization, grouped by area.","summary":"{{count}} controls · last reviewed {{date}}","controlCount":"{{count}} controls","statusActive":"Active","categories":{"data":{"title":"Data security & encryption","items":{"audio":{"title":"Audio discarded after transcription","desc":"Audio is irreversibly discarded right after transcription and is never stored on disk in plaintext."},"encryption":{"title":"Encryption at rest and in transit","desc":"Data is encrypted at rest with AES-256 and in transit with TLS 1.2+."},"keys":{"title":"Per-user encryption keys","desc":"Sensitive content is encrypted with a separate per-user key, so even an operator with direct database access cannot read it in plaintext."},"kms":{"title":"Managed key custody (KMS / HSM)","desc":"Keys are protected by AWS KMS using FIPS 140-2 Level 3 validated HSMs and rotated automatically every 12 months."},"noTraining":{"title":"No customer data used for AI training","desc":"No customer data, including conversations, is used to train or fine-tune AI models — across all tiers."},"deletion":{"title":"Irreversible deletion","desc":"Deletion covers the operational database, backups, vector indexes, and caches; on account closure, KMS keys are scheduled for deletion."}}},"access":{"title":"Access control & authentication","items":{"rbac":{"title":"Least-privilege access (RBAC / ABAC)","desc":"Role- and attribute-based access controls enforce least-privilege access to systems and data."},"plaintext":{"title":"Restricted plaintext access","desc":"Plaintext content access is restricted to a small set of explicitly authorized personnel under least-privilege controls, and every access is logged at the query and column level."},"sso":{"title":"Single sign-on (SAML 2.0)","desc":"Enterprise SSO via Okta, Azure AD, Google Workspace and other IdPs keeps access in sync with your policies."},"mfa":{"title":"Multi-factor authentication","desc":"OTP, authenticator apps, or hardware keys add a second factor and block logins even if a password leaks."},"ip":{"title":"IP allowlisting","desc":"Access can be restricted to approved IP ranges so only office or VPN traffic is permitted."},"scim":{"title":"SCIM provisioning","desc":"User onboarding and offboarding in your IdP sync to Tiro automatically via SCIM."},"session":{"title":"Session & device controls","desc":"A default 30-minute idle timeout (configurable for enterprise) plus policy controls over concurrent sessions and device registration."}}},"infra":{"title":"Infrastructure & availability","items":{"region":{"title":"Korean data residency (AWS Seoul)","desc":"Data is hosted in the AWS Seoul region (ap-northeast-2); enterprise customers can choose a dedicated VPC or another region."},"multiAz":{"title":"Multi-AZ resilience","desc":"A Multi-AZ deployment keeps the service available through single-AZ failures."},"backup":{"title":"Encrypted automated backups","desc":"Databases are backed up automatically under KMS encryption, with annual restore testing."},"restore":{"title":"Tested recovery objectives","desc":"Backup restore procedures are validated by annual restore tests. Specific recovery objectives can be discussed during contracting."},"sla":{"title":"99.9% uptime SLA","desc":"A 99.9% monthly availability SLA applies, with service credits if we miss it."}}},"monitoring":{"title":"Monitoring & threat detection","items":{"guardduty":{"title":"24×7 threat detection","desc":"AWS GuardDuty continuously monitors the environment for threats."},"inspector":{"title":"Vulnerability scanning","desc":"AWS Inspector continuously scans workloads for vulnerabilities."},"waf":{"title":"Web attack protection","desc":"A WAF together with Cloudflare protects against common web attacks."},"cloudtrail":{"title":"Tamper-resistant logging","desc":"Audit and infrastructure logs are delivered to isolated, tamper-resistant storage, protected from modification by operational systems."},"auditLog":{"title":"Audit logs","desc":"User and admin activity is logged with configurable retention and can be exported or streamed to your SIEM."},"pentest":{"title":"Penetration testing","desc":"We run penetration testing and vulnerability assessments to identify and remediate risks proactively."}}},"ai":{"title":"AI security & data privacy","items":{"noTraining":{"title":"No model training on customer data","desc":"Customer conversations, transcripts, and summaries are never used to train or fine-tune models."},"zdr":{"title":"Zero-Data-Retention vendor terms","desc":"Every LLM and STT vendor is bound by a DPA that prohibits training and requires Zero Data Retention."},"pii":{"title":"PII auto-masking","desc":"Personally identifiable information in meeting notes can be detected and masked automatically."},"retention":{"title":"Configurable data retention","desc":"Retention windows can be set by domain, with automatic deletion when the window closes."},"vendorRouting":{"title":"Vendor routing controls","desc":"Choose which LLM and STT vendors are available to your tenant, including Korea-only routing."}}},"governance":{"title":"Data governance & sharing","items":{"sharing":{"title":"External sharing controls","desc":"Note sharing can be limited to an allowlist of trusted domains."},"screenCapture":{"title":"Mobile screen-capture protection","desc":"Screenshots inside the mobile app can be blocked, with every attempt logged."},"retentionPolicy":{"title":"Organization retention policy","desc":"Enterprise admins can enforce organization-wide retention windows centrally."},"deletionOnClose":{"title":"Complete deletion on closure","desc":"When an account is closed, related personal data is deleted within 14 days and the encryption keys protecting it are scheduled for deletion, rendering any residual copies cryptographically inaccessible."},"erasureReceipt":{"title":"Deletion logging","desc":"Each deletion request, execution, and completion is logged, and an erasure record can be provided to enterprise customers on request."}}},"corporate":{"title":"Corporate & organizational","items":{"training":{"title":"Security training","desc":"Employees complete mandatory security training at onboarding."},"accessReviews":{"title":"Quarterly access reviews","desc":"Access rights are reviewed every quarter to keep least-privilege current."},"policyLibrary":{"title":"Information security policies","desc":"A full information security policy set is maintained and operated on the dedicated GRC platform."},"vendorDpa":{"title":"Vendor due diligence","desc":"Subprocessors are bound by DPAs that prohibit training and require Zero Data Retention."}}},"resilience":{"title":"Incident response & continuity","items":{"incidentResponse":{"title":"Incident response","desc":"Enterprise customers are covered by a 4-hour first-response SLA for security incidents."},"notificationSla":{"title":"Breach notification SLA","desc":"Affected customers are notified of security incidents within a 24-hour notification SLA."},"continuity":{"title":"Business continuity & DR","desc":"Backups, Multi-AZ deployment, and tested recovery objectives underpin business continuity and disaster recovery."},"changeManagement":{"title":"Change management","desc":"Production changes follow controlled review and deployment processes."}}}}},"resources":{"sectionTitle":"Resources","description":"Reports and policies are available to your security team. Gated documents require an NDA — request access to receive them.","available":"Available","requestAccess":"Request access","groups":{"reports":{"title":"Reports & certificates"},"policies":{"title":"Policies"},"legal":{"title":"Legal & privacy"}},"docs":{"iso":"ISO/IEC 27001:2022 Certificate","soc2type1":"SOC 2 Type 1 Report","soc2type2":"SOC 2 Type 2 Report","infosec":"Information Security Policy","access":"Access Control Policy","dataProtection":"Data Protection Policy","bcdr":"Business Continuity & DR Plan","incident":"Incident Response Plan","vendor":"Vendor Management Policy","dpa":"Data Processing Agreement (DPA)","subprocessors":"Subprocessor List","privacy":"Privacy Policy","terms":"Terms of Service"}},"subprocessors":{"sectionTitle":"Subprocessors","description":"Third-party services Tiro relies on to operate. All LLM and speech-to-text partners are bound by DPAs that prohibit training and require Zero Data Retention.","asOf":"As of {{date}}","note":"We update this list as our services evolve.","headers":{"name":"Subprocessor","purpose":"Purpose","location":"Location","dataProcessed":"Data processed"},"purposes":{"infra":"Infrastructure","llm":"LLM provider","stt":"Speech-to-text","payments":"Payments","email":"Email delivery","cdn":"CDN / TLS termination","sso":"SSO / identity","observability":"Observability","errorMonitoring":"Error monitoring"},"locations":{"us":"United States","kr":"Korea","global":"Global"},"zdrNote":"All LLM and speech-to-text providers operate under Zero-Data-Retention contracts and are contractually prohibited from training on your data.","data":{"infra":"Encrypted data at rest (all categories)","llm":"Transcript & prompt text — ZDR, no training","stt":"Meeting audio for transcription — ZDR","payments":"Billing details; card data is handled by PCI-DSS Level 1 processors and never stored by Tiro","email":"Email address & message content","cdn":"Traffic in transit (TLS termination, WAF/DDoS edge)","sso":"Authentication identifiers (email, directory IDs) for enterprise SSO","observability":"Operational logs and traces (PII redacted)","errorMonitoring":"Error events and stack traces (PII redacted)"}},"dataCollected":{"sectionTitle":"Data we handle","description":"What Tiro processes, and how each category is protected.","items":{"audio":"Meeting audio — discarded immediately after transcription","notes":"Transcripts & summaries — encrypted at rest with AES-256","account":"Account & organization information","usage":"Usage & diagnostic logs"}},"updates":{"sectionTitle":"Updates","description":"Security and compliance milestones, newest first. This log is maintained by our team.","categories":{"compliance":"Compliance","security":"Security","product":"Product"},"entries":{"iso":{"title":"ISO/IEC 27001:2022 certification achieved","body":"Tiro's information security management system was certified to ISO/IEC 27001:2022 by Sensiba LLP."},"pentest":{"title":"Penetration testing program launched","body":"We began penetration testing and vulnerability assessments to identify and remediate security risks proactively."},"soc2type2":{"title":"SOC 2 Type 2 report completed","body":"We received our SOC 2 Type 2 report with an unqualified opinion, covering the same five Trust Services Criteria as Type 1 (auditor: Sensiba LLP). The report is available under NDA."},"soc2type1":{"title":"SOC 2 Type 1 report completed","body":"We completed our SOC 2 Type 1 report across five Trust Services Criteria (auditor: Sensiba LLP)."}},"subscribeNote":"Want future updates?","subscribeCta":"Subscribe on our Trust Center"},"dataFlow":{"sectionTitle":"How your data flows","description":"What happens to a meeting from capture to deletion, and which providers see what.","steps":{"capture":{"title":"Capture","desc":"Meeting audio is captured and streamed over TLS 1.2+ — never written to disk in plaintext."},"transcribe":{"title":"Transcribe","desc":"Audio is sent to a speech-to-text provider under a Zero-Data-Retention contract, converted to text, then discarded."},"summarize":{"title":"Summarize","desc":"Transcript text is sent to an LLM provider (Zero Data Retention, no training) to generate summaries and answers."},"store":{"title":"Store","desc":"Notes, transcripts, and summaries are encrypted at rest with AES-256 in the AWS Seoul region, isolated by per-user keys."},"delete":{"title":"Delete","desc":"On deletion, content is removed from the database, backups, vector indexes, and caches; KMS keys are scheduled for deletion on account closure."}}},"dataOwnership":{"sectionTitle":"Data ownership & privacy","description":"Your data is yours. Here is how we handle ownership, processing terms, and where your data lives.","points":{"ownership":{"title":"You own your data","desc":"Customer content belongs to you. We process it only to provide the service, never sell it, and never use it to train AI models."},"dpa":{"title":"DPA & SCCs","desc":"A Data Processing Agreement is available, incorporating EU Standard Contractual Clauses for international transfers."},"residency":{"title":"Data residency","desc":"Data is stored in the AWS Seoul region (ap-northeast-2) by default. Enterprise customers can request a dedicated region or VPC."},"rights":{"title":"Data subject rights","desc":"We support access, correction, export, and deletion requests in line with GDPR and CCPA."}}},"incident":{"sectionTitle":"Incident response & availability","description":"How we detect, respond to, and communicate security incidents — and where to check live status.","steps":{"detect":{"title":"Detect","desc":"24×7 monitoring (AWS GuardDuty, Inspector, WAF, CloudTrail) surfaces anomalies in real time."},"respond":{"title":"Respond","desc":"Confirmed security incidents trigger a 4-hour first-response SLA for enterprise customers."},"notify":{"title":"Notify","desc":"Affected customers are notified within a 24-hour breach-notification SLA, with scope, impact, and remediation."},"review":{"title":"Review","desc":"Every incident is followed by a post-incident review and corrective actions."}},"statusLabel":"System status","slaLabel":"Service Level Agreement"},"vdp":{"sectionTitle":"Vulnerability disclosure","description":"We welcome reports from security researchers and handle them responsibly.","reportCta":"Report a vulnerability","report":"Report security vulnerabilities to {{email}}.","response":"We acknowledge reports within 3 business days and keep you updated through remediation.","safeHarbor":"Good-faith research conducted under this policy is authorized — we will not pursue legal action against researchers who follow it.","securityTxtLabel":"View security.txt"},"faq":{"sectionTitle":"Security questionnaire & FAQ","description":"Answers to the questions security teams ask most, grouped by assessment area.","requestFull":"Need a full CAIQ, SIG, or our security questionnaire? Request it","groups":{"ownership":{"title":"Data ownership"},"dataHandling":{"title":"Data handling & retention"},"access":{"title":"Access & personnel"},"aiVendors":{"title":"AI & subprocessors"},"resilience":{"title":"Resilience & incident response"},"compliance":{"title":"Compliance & legal"}},"items":{"dataOwnership":{"q":"Who owns the data and the rights to the content?","a":"You do. Customer content remains yours under our Terms of Service; Tiro processes it solely to provide the service and claims no ownership."},"dataLeaveProduction":{"q":"When is customer data allowed to leave your production systems?","a":"Only encrypted, and only to the subprocessors required to deliver the service (speech-to-text, LLM, storage), each under a Zero-Data-Retention DPA. Data is never exported for marketing or model training."},"dataLocation":{"q":"Where is data stored and where are your servers located?","a":"In the AWS Seoul region (ap-northeast-2), Multi-AZ, encrypted at rest with AES-256 using per-user keys."},"residencyOptions":{"q":"Do you offer data residency options?","a":"Seoul is the default. Enterprise customers can request a dedicated region or VPC, and vendor routing can be restricted (for example, Korea-only)."},"retention":{"q":"What is your data retention policy?","a":"Customers control retention. Audio is discarded after transcription; notes, transcripts, and summaries are kept until you delete them or your configured retention window closes (for example, 90/180/365 days for enterprise)."},"deletionPropagation":{"q":"When data is deleted, is it still stored anywhere?","a":"No. Deletion propagates to the operational database, vector indexes, and caches immediately; automatic backups roll off within their retention window; and on account closure the KMS keys protecting the data are scheduled for deletion, rendering any residual copies cryptographically inaccessible."},"voice":{"q":"How is meeting audio handled?","a":"In real time, audio streams through the speech-to-text engine and is discarded from memory immediately — never stored in plaintext. Uploaded files are discarded after processing. Optional opt-in retention stores audio in your own encrypted storage (off by default)."},"whoAccess":{"q":"Who at Tiro can access customer data?","a":"By default only you and the people you share with. Operationally, plaintext access is restricted to a small set of explicitly authorized personnel, and every access is logged at the query and column level."},"employeeVetting":{"q":"What controls apply to employees with access?","a":"Mandatory security training at onboarding, least-privilege access enforced via RBAC/ABAC, and quarterly access reviews."},"aiTraining":{"q":"Do you train AI models on customer data?","a":"Never. No customer data — conversations, transcripts, or summaries — is used to train or fine-tune models, across all tiers. Every LLM and speech-to-text vendor is contractually bound to Zero Data Retention and no training."},"vendorData":{"q":"Which AI subprocessors receive which data?","a":"Speech-to-text vendors receive meeting audio for transcription; LLM vendors receive transcript and prompt text for summaries — all under Zero-Data-Retention contracts. See the Subprocessors page for the full list and what each receives."},"humanReview":{"q":"Does any human review my content?","a":"No routine human review. Plaintext access is restricted to a small set of authorized personnel for support and debugging only, with every access logged."},"incidentResponse":{"q":"What is your incident response process?","a":"24×7 monitoring detects anomalies; confirmed incidents trigger a 4-hour first-response SLA (enterprise), customer notification within 24 hours, and a post-incident review. Report security issues to <a>{{email}}</a>."},"breachNotification":{"q":"How and when are customers notified of a breach?","a":"Affected enterprise customers are notified within a 24-hour breach-notification SLA, including scope, impact, and remediation steps."},"bcdr":{"q":"What are your business continuity and disaster recovery measures?","a":"Multi-AZ deployment, automatic KMS-encrypted backups with annual restore testing, and a 99.9% monthly uptime SLA. Specific recovery objectives can be discussed during contracting."},"pentestCadence":{"q":"How often do you conduct penetration testing?","a":"We run a penetration-testing and vulnerability-assessment program; summaries are available under NDA once issued. Researchers can also report findings through our vulnerability disclosure policy."},"certs":{"q":"Which certifications and audits do you hold?","a":"ISO/IEC 27001:2022 (certified by Sensiba LLP), SOC 2 Type 1, and SOC 2 Type 2 — both SOC 2 reports attested by Sensiba LLP across all five Trust Services Criteria with an unqualified opinion. We also align to NIST CSF, NIST AI RMF, and CIS Controls 8.1. Reports are available under NDA."},"dpa":{"q":"Can I get a DPA and SCCs?","a":"Yes — a Data Processing Agreement with EU Standard Contractual Clauses is available. Request it via <a>{{email}}</a>."}}},"meta":{"controls":{"title":"Security controls · Trust Center | Tiro","description":"How Tiro protects meeting data — encryption, access control, infrastructure resilience, monitoring, and AI-vendor controls across our security program."},"resources":{"title":"Security documents & reports · Trust Center | Tiro","description":"Request Tiro's SOC 2 and ISO 27001 reports, security policies, DPA, and subprocessor list — available to your security team under NDA."},"subprocessors":{"title":"Subprocessors · Trust Center | Tiro","description":"The third-party subprocessors Tiro relies on, the data each one processes, and where — including zero-data-retention terms with our AI vendors."},"faq":{"title":"Security FAQ · Trust Center | Tiro","description":"Answers to the questions security teams ask about Tiro — data ownership, residency, retention, AI training, access, incident response, and compliance."},"updates":{"title":"Security updates · Trust Center | Tiro","description":"Recent changes to Tiro's security posture, certifications, and compliance milestones."}},"vdi":{"sectionTitle":"VDI & closed-network environments","description":"Tiro runs in locked-down VDI and closed-network environments with no client to install — finance, public-sector, and enterprise teams use it through their in-house virtual desktops.","points":{"clientless":{"title":"No client to install","desc":"A standard HTTPS web app — it works in Chrome, Edge, and Safari inside a VDI, with no native client or agent to deploy."},"network":{"title":"Gateway & CASB friendly","desc":"All traffic stays on the *.tiro.ooo domain, so VDI gateways and CASBs (Prisma Access, Netskope, Zscaler, and others) can apply domain- and IP-based policy. Fixed egress IPs and domain allowlists are available for enterprise."},"export":{"title":"Admin-controlled export","desc":"Note export (PDF/Markdown/DOCX) is governed at the admin level, and every download and export is written to the audit log — so your VDI data-loss controls extend to Tiro."},"endpoint":{"title":"Doesn't rely on the endpoint","desc":"Confidentiality comes from server-side per-user encryption, not the device — the database is never exposed in plaintext, even to operators."}}}}`,
  ),
  Te = {
    title: "Manage templates",
    myTemplates: {
      title: "My templates",
      personal: "Personal",
      workspaceShared: "{{workspaceName}} shared",
      library: "Tiro library",
    },
    tiroTemplates: {
      title: "Tiro templates",
      custom: "Created by me",
      suggested: "Suggested",
    },
    section: {
      showMore: "+ Show {{count}} more",
      collapse: "Collapse",
      empty: "Nothing here yet",
    },
    create: {
      button: "New template",
      dropdownLabel: "New template options",
      blank: "Create blank template",
      importCsv: "Import from CSV",
      downloadCsvTemplate: "Download CSV form",
      csvImportSuccess: "Template created from CSV",
      csvImportEmpty: "No sections in CSV",
      csvImportInvalid: "Invalid CSV format",
    },
    scope: {
      personal: "Personal",
      workspaceShared: "{{workspaceName}} shared",
      shareToWorkspace: "Share to {{workspaceName}}",
      movedToPersonal: "Moved back to personal",
      sharedToWorkspace: "Shared to {{workspaceName}}",
      managed: "Tiro library",
    },
    detail: { untitled: "Untitled template", createdAt: "Created {{date}}" },
    empty: {
      title: "Select a template",
      description: "Pick a template from the left to see its details",
    },
    actions: {
      duplicate: "Duplicate template",
      copyToMine: "Copy to my templates",
      delete: "Delete",
      menu: "More",
    },
  },
  Se = {
    invitedBy: "Invited by {{name}}",
    addWorkspace: "Add new workspace",
    createTitle: "Create a workspace",
    createDescription:
      "Start with a team or project name. You can change it later.",
    createNameLabel: "Workspace name",
    createNamePlaceholder: "e.g. The Plato",
    createHelp: "A new workspace needs its own separate subscription.",
    nameRequired: "Enter a workspace name.",
    nameMaxLength: "Workspace names must be {{max}} characters or fewer.",
    createAction: "Create workspace",
    createSuccess: "Workspace created.",
    createError: "Couldn't create the workspace. Please try again in a moment.",
    createRestrictedTooltip: "Only organization admins can create workspaces.",
    switchError: "Couldn't switch workspaces. Please try again in a moment.",
    switchDisabledRecording:
      "You can't switch workspaces while recording or syncing a recording.",
    switchLoading: "Preparing workspace...",
    pendingInvitations: "Invitations",
    acceptInvitation: "Accept",
    declineInvitation: "Decline",
    emptyInvitations: {
      title: "No invitations",
      description: "New workspace invitations will appear here.",
    },
    invitationSeatCapacityError: `There are no seats available to accept this invitation.
Contact your workspace admin.`,
    invitationSeatContractError: `The subscription needs to be checked before you can join.
Contact your workspace admin.`,
    invitationSeatPaymentError: `The workspace payment is incomplete.
Contact your admin.`,
    invitationSeatPendingError: `A seat change is blocking this invitation.
Ask your admin whether the seat reduction needs to be canceled or a pending change needs to be checked.`,
    invitationAcceptError:
      "Couldn't accept the invitation. Please try again in a moment.",
    invitationDeclineSuccess: "Invitation declined.",
    invitationDeclineError:
      "Couldn't decline the invitation. Please try again in a moment.",
    settings: "Workspace settings",
    noWorkspace: {
      title: "You don't have a workspace yet",
      pendingInvitations: "Review {{count}} invitation(s)",
      calendar: {
        title: "Connect your calendar",
        description: "Get meeting reminders and start recording faster.",
        action: "Connect",
      },
      desktop: {
        title: "Download the desktop app",
        description: "Record system audio more reliably from your computer.",
        action: "Download",
      },
    },
  },
  Ce = {
    previewInWiki: "Preview in Wiki",
    syncing: "Syncing",
    conflict: "Needs resolution",
    error: "Sync error",
    wikiFilter: { knowledge: "Knowledge" },
    activationScenario: {
      READY: "Wiki is ready",
      UNINITIALIZED: "Wiki is not activated",
      IN_PROGRESS: "Wiki setup is in progress",
      ADMIN_BLOCKED: "Admin approval required",
      PLAN_BLOCKED: "Plan upgrade required",
      FEATURE_FLAG_DISABLED: "Feature flag disabled",
    },
    lockedPreview: {
      ariaLabel: "Wiki convergence preview",
      close: "Close preview",
      breadcrumb: "Wiki preview",
      mockBadge: "Mock",
      readOnlyBadge: "Read-only",
      mappedFrom: "Mapped from {{source}}",
      source: {
        personTag: "person tag",
        regularWord: "word memory",
        phoneticWord: "pronunciation memory",
      },
      activationBlockedTitle: "Wiki is not active for this workspace",
      activationBlockedDescription:
        "This preview shows where the source will land after activation. Editing stays locked until Wiki is available.",
      readOnlyTitle: "Read-only workspace",
      readOnlyDescription:
        "The page can be inspected from the source list, but Wiki edits and source mutations are disabled.",
      activateCta: "Activate Wiki",
      descriptionTitle: "Description",
      aliasTitle: "Aliases",
      lifecycleTitle: "Source lifecycle",
      description: {
        person:
          "A durable PERSON entity page created from a person tag. The email is preserved as an alias so old mentions still resolve after a rename.",
        regularWord:
          "A concept page created from a word-memory term. It becomes part of the Wiki knowledge graph while the original word memory keeps working during soft migration.",
        phoneticWord:
          "Pronunciation memory stays attached as lexicon metadata by default. It can be promoted into a concept page when the team explicitly chooses to link it.",
      },
      policy: {
        person:
          "Rename propagates to the Wiki canonical name while the previous tag value is kept as an alias. Deleting the source tag removes only the source link.",
        regularWord:
          "Renaming the source word updates the canonical concept and preserves the old term as an alias. Deleting word memory does not delete durable Wiki content.",
        phoneticWord:
          "Pronunciation entries default to alias or lexicon metadata. Deleting the source removes the source link while the promoted Wiki page remains.",
      },
    },
  },
  Ae = JSON.parse(
    `{"toast":{"pageDeleted":"Wiki page deleted.","pageDeleteError":"Couldn't delete the wiki page. Please try again.","pageMerged":"Wiki pages merged.","pageMergeError":"Couldn't merge the wiki pages. Please try again.","renamed":"Name updated.","renameError":"Couldn't update the name. Please try again.","aliasAdded":"Alias added.","aliasAddError":"Couldn't add the alias. Please try again.","aliasDeleted":"Alias removed.","aliasDeleteError":"Couldn't remove the alias. Please try again.","descriptionSaved":"Description saved.","descriptionSaveError":"Couldn't save the description. Please try again.","descriptionRegenerating":"AI is regenerating the description.","descriptionRegenerateError":"Couldn't request regeneration. Please try again later."},"actions":{"rename":"Rename","blacklist":"Block auto-extraction","delete":"Delete page","menuLabel":"Page actions","namePlaceholder":"Enter a name","save":"Save","cancel":"Cancel","errorRequired":"Please enter a name.","errorConflict":"A page with the same name already exists.","deleteTitle":"Delete this wiki page?","deleteDescription":"Aliases and relationships connected to ‘{{name}}’ will be deleted. Mentions in your notes will remain.","deleteConfirm":"Delete","merge":"Merge this page","mergeDialogTitle":"Merge into which page?","mergeDialogDescription":"‘{{name}}’ will be merged into the page you choose. All aliases, relationships, and mentions will move over, and this page will be deleted.","mergePickerPlaceholder":"Search target page"},"picker":{"placeholder":"Search wiki pages","empty":"No results","loading":"Searching..."},"similar":{"title":"Wikis similar to this page","merge":"Merge","meta":"Mentions {{mentions}} · Aliases {{aliases}}","mergeTitle":"Merge this page?","mergeDescription":"‘{{from}}’ will be merged into ‘{{to}}’. All aliases, relationships, and mentions will move over, and this page will be deleted."},"alias":{"conflictMergeTitle":"’{{alias}}’ already exists","conflictMergeDescription":"A wiki page named ‘{{alias}}’ already exists. Would you like to merge the two pages? This page will be merged into the existing one, and all aliases, relationships, and mentions will move over.","conflictMergeConfirm":"Merge","conflictMergeCancel":"Cancel","navigateToTarget":"Open {{name}} page","add":"Add","addLabel":"Add alias","addPlaceholder":"Enter an alias","adding":"Adding...","deleteAlias":"Delete alias","autoGeneratedTooltip":"This alias was created automatically. Automatically generated aliases can’t be edited.","empty":"No aliases yet","manageTitle":"Manage alternate names"},"mention":{"deletedNote":"Deleted note"},"lint":{"panelLabel":"Wiki cleanup","title":"Wiki cleanup","launcher":"Clean up wiki","close":"Close","options":"Cleanup options","run":"Start cleanup","totalCount":"{{count}} candidates","queueTitle":"Planned cleanup actions","accepted":"Accepted","skipped":"Skipped","pending":"Pending","submit":"Clean up","submitShortcut":"Enter","submitProcessing":"Cleaning up","submitComplete":"Applied","submitStatusHint":"When cleanup finishes, the next suggestions stay ready here.","submittedDescription":"{{count}} selected cleanup actions were applied.","submitPartial":"Partially applied","submitPartialDescription":"{{applied}} applied, {{stale}} changed, {{failed}} failed","submitFailed":"Could not apply cleanup.","submitFailedDescription":"Your choices were kept. Please try again.","loadFailed":"Could not load suggestions.","loadFailedDescription":"Please try again in a moment.","retry":"Try again","loadingTitle":"Finding suggestions","loadingDescription":"Loading cleanup suggestions from the current wiki state.","emptyTitle":"No cleanup suggestions","emptyDescription":"Try another pass after your wiki changes.","partialResultTitle":"Some actions were not applied","partialResultDescription":"{{applied}} applied, {{skipped}} skipped, {{stale}} changed, {{failed}} failed","cleanupOptions":"Cleanup options","rerun":"Refresh","rerunCandidates":"Refresh suggestions","batchSize":"Cleanup candidates","batchRange":"5-10","orphan":{"low":"Low","medium":"Medium","high":"High"},"draftActionsTitle":"Cleanup actions","revise":"Revise","reviseCandidate":"Change choice {{count}}","status":{"pending":"Pending","accepted":"Accepted","skipped":"Skipped"},"action":{"merge":"Merge","delete":"Delete"},"effect":"Effect","effectDelete":"‘{{name}}’ will be deleted from the wiki. Source notes stay intact.","effectMerge":"‘{{from}}’ will merge into ‘{{to}}’. Aliases, sources, and links move to the remaining page.","headlineDelete":"‘{{name}}’ will be deleted from the wiki.","headlineMerge":"‘{{from}}’ → ‘{{to}}’ will become one wiki page.","headlineFallback":"Wiki cleanup suggestion.","headlineDeleteSuffix":"will be deleted from the wiki.","headlineMergeSuffix":"will become one wiki page.","supportDelete":"Source notes and paragraphs stay intact.","supportMerge":"Related links, aliases, sources, and relationships move together.","humanReasonMerge":"These two pages look like the same idea.","humanReasonDeleteOrphan":"This page has almost no links to other pages.","humanReasonDeleteLowSignal":"This page is too broad to keep as workspace knowledge.","candidatePages":"Wiki pages to check","source":"Source","relationship":"Relationship","orphanNode":"Orphan node","connectedNode":"{{mentions}} mentions, {{links}} links","duplicateReason":"Duplicate reason","preview":"Preview","reason":"Reason","accept":"Accept","skip":"Skip"},"home":{"title":"Wiki","workspace":"Workspace","workspaceEmpty":"Your wiki will start once your workspace is ready.","statusLoading":"Checking wiki status...","statusError":"Could not load wiki status.","unknownError":"Unknown error","heroHeading":"Your living knowledge graph","heroDescription":"Concepts surfaced from your notes and items you add grow into a connected wiki","heroStatsPages":"{{count}} pages","heroStatsConnections":"{{count}} connections","graphLoading":"Loading graph...","graphError":"Could not load the graph."},"graph":{"summary":{"overview":"Full map · {{shown}} pages · {{clusters}} clusters · {{omitted}} hidden of {{total}} total","context":"Nearby view · {{shown}} pages · {{omitted}} hidden of {{total}} total","cluster":"Cluster · {{shown}}/{{total}} pages · {{omitted}} more"},"search":{"clusterPages":"{{count}} pages","reason":{"title":"Name match","alias":"Alias match","mention":"Mention match","description":"Description match"}}},"list":{"loading":"Loading wiki...","error":"Could not load the wiki.","emptyTitle":"No wiki pages to grow yet","emptyDescription":"Only items mentioned multiple times in a single note — or added by you — become wiki pages. The more notes pile up, the more it grows.","searchEmptyTitle":"No matching wiki pages","searchEmptyDescription":"Try another keyword or clear search to return to the full list.","mentionCount":"Sources {{count}}","loadMore":"Load more","unknownError":"Unknown error","table":{"totalPages":"{{count}} total pages","lastUpdated":"Last updated {{value}}","searching":"Searching...","page":"Page","type":"Type","updated":"Updated"},"timeline":{"eyebrow":"Recent changes","title":"What your wiki has learned","subtitle":"Review recently updated wiki pages in chronological order and decide what is worth revisiting.","today":"Today","yesterday":"Yesterday","thisWeek":"This week","earlier":"Earlier","unknown":"No update time","summaryPages":"Pages","summaryUpdated":"Updated","summarySources":"Sources","summaryRelations":"Relations","previewTitle":"Wiki preview","previewEmpty":"Select a page on the left to review its current state.","updatedUnknown":"No update time","sourceMetric":"Sources","relationMetric":"Relations","aliasMetric":"Aliases","aliasCount":"Aliases {{count}}","partial":"Partial","descriptionFailed":"Description failed","whyUpdated":"Why revisit this","whyUpdatedDescription":"Shown from the current update time, source count, and relation count. Tiro does not estimate change deltas until the server provides them.","openDetail":"Open detail"}},"floating":{"filter":{"all":"All","person":"Person","org":"Organization","concept":"Concept","decision":"Decision"},"search":{"placeholder":"Search wiki pages","empty":"No results found"},"folderFilter":{"label":"Graph folder","all":"All folders"},"newPage":"New page","scopeExpand":{"trigger":"Expand wiki","popoverTitle":"How far back should we go?","month3":"3 months","month6":"6 months","month12":"12 months","month24":"24 months","successToast":"Expanding wiki to cover {{months}} months"},"viewToggle":{"graph":"Graph view","list":"List view"},"zoom":{"in":"Zoom in","out":"Zoom out","fit":"Fit to screen","reset":"Home"},"onboarding":{"uninitTitle":"Start Wiki","uninitDescription":"Build a wiki from the last 6 months of notes","uninitButton":"Start","progressTitle":"Building your wiki","progressDescription":"Organizing {{count}} notes"}},"panel":{"resizerAria":"Resize panel","header":{"copy":"Copy","more":"More","fullscreen":"Fullscreen","fullscreenExit":"Exit fullscreen","close":"Collapse panel","back":"Back","exitFullscreen":"Exit fullscreen","merge":"Merge with another page","aliasManage":"Manage aliases","delete":"Delete this page","deleteTitle":"Delete this page?","deleteDescription":"All source metadata, aliases, and relationships for \\"{{name}}\\" will be removed. This action cannot be undone.","deleteConfirm":"Delete","deleteCancel":"Cancel"},"breadcrumb":{"root":"Wiki"},"error":{"fetch":"Couldn't load wiki page"},"dirtyIndicator":"You have unsaved changes","ariaLabel":"Wiki page panel"},"topMeta":{"typeLabel":{"person":"Person","organization":"Organization","concept":"Concept","decision":"Decision","place":"Place","product":"Product","event":"Event","entity":"Item"},"aliasChevron":"Aliases","updatedAt":"Updated {{date}}"},"visibility":{"private":{"label":"Private","description":"Not shared with other workspace members."},"workspace":{"label":"Workspace","description":"Workspace members can find and view this page."},"sourceAcl":{"label":"Source-note access","title":"This page follows source-note access.","autoTitle":"This page was created automatically.","description":"Only people who can access the connected source notes can see this page. This access policy cannot be changed here."}},"description":{"title":"Description","placeholder":"Add a description for this page","editTooltip":"Edit","saveButton":"Save","cancelButton":"Cancel","addButton":"Add description","loading":"Loading description...","generating":"AI is writing the description. Please wait a moment.","generationFailed":"Could not generate the description.","regenerateButton":"Regenerate with AI","regenerateShort":"Regenerate","retryButton":"Try again","editorPlaceholder":"Write a description for this page.","savingButton":"Saving...","empty":"No description has been written yet.","saveFailure":"Could not save. Please try again."},"sources":{"title":"Source notes","titleWithCount":"Source notes {{count}}","connectNote":"Connect note","connectNoteComingSoon":"Connecting notes will be supported soon.","paragraphLabel":"Paragraph {{number}}","paragraphListLabel":"Paragraphs {{numbers}}","mentionCountInNote":"{{count}} mentions","showMore":"Show {{count}} more","showLess":"Show less","untitledFallback":"Untitled source note","unavailableText":"Source content is unavailable.","empty":"No source notes are connected to this page yet.","transcriptTitle":"Source transcript","transcriptLoading":"Loading source note...","openOriginalNote":"Open original note","closeTranscript":"Close source transcript","paragraphNotFound":"Could not find the cited paragraph.","card":{"menu":"More","removeLabel":"Remove this source from the wiki","removingLabel":"Removing..."},"removeSuccess":"Removed \\"{{noteTitle}}\\" from this wiki page.","removeError":"Could not remove this source note. Please try again.","removedToast":"Source connection removed from \\"{{noteTitle}}\\"","undo":"Undo"},"relations":{"deleteConfirm":"Delete this relation?","deleteAria":"Delete relation","selectRelationAria":"Select relation with {{name}}","openPageAria":"Open {{name}} page","title":"Related wiki pages","titleWithCount":"Related wiki pages {{count}}","empty":"No related wiki pages are connected.","editToggleStart":"Edit","editToggleEnd":"Done","editTypeLabel":"Edit relation type","showMore":"Show {{count}} more","createSuccess":"Relation added.","createError":"Could not add the relation. Please try again.","deleteSuccess":"Relation deleted.","deleteError":"Could not delete the relation. Please try again.","updateSuccess":"Relation updated.","updateError":"Could not update the relation. Please try again.","addPill":"+ Connect page","unresolvedPage":"Linked page","sentenceDefault":"{{source}} is {{target}}'s {{relation}}.","removedToast":"Connection to \\"{{targetName}}\\" removed","undo":"Undo"},"relationAdd":{"step1Title":"Find a page to connect","step1Placeholder":"Search page name","step1Empty":"No results","step2BackButton":"← Other page","step2Preview":"{{source}} is related to @{{target}}.","step2Helper":"What is the relationship?","step2Confirm":"Add this relationship","creating":"Adding...","createFailure":"Could not add the relationship. Please try again."},"copy":{"typeEntity":"Entity","relatedPages":"Related pages","meta":"Name · Description · Source notes · Related pages","text":{"label":"Copy as text","desc":"Copies plain text only."},"textDescription":"Copies plain text only.","html":{"label":"Copy as HTML","desc":"HTML format for pasting into apps like Notion or Slack."},"htmlDescription":"HTML format for pasting into apps like Notion or Slack.","markdown":{"label":"Copy for LLM","desc":"Markdown format optimized for ChatGPT and other LLMs."},"markdownDescription":"Markdown format optimized for ChatGPT and other LLMs.","successToast":"Copied","trigger":"Copy","headerMeta":"Name · Description · Source notes · Related pages","success":"Copied","error":"Couldn't copy. Please try again."},"create":{"trigger":"New page","dialogTitle":"New wiki page","nameLabel":"Name","namePlaceholder":"e.g., OSS Team, John Smith, Q2 Decision","nameErrorRequired":"Please enter a name.","typeLabel":"Type","typePerson":"Person","typeOrg":"Organization","typeConcept":"Concept","typeDecision":"Decision","typeErrorRequired":"Please select a type.","descriptionLabel":"Description (optional)","descriptionPlaceholder":"Briefly describe what this page is about.","linkedPagesLabel":"Link to pages (optional)","linkedPagesPlaceholder":"Search existing wiki pages","submitButton":"Create page","cancelButton":"Cancel","successToastTitle":"\\"{{name}}\\" page created","successToastDescription":"You can check who has access on the wiki page.","linkFailureToast":"Couldn't link to \\"{{target}}\\". Please try again from the panel.","createFailure":"Couldn't create page. Please try again.","title":"New wiki page","cancel":"Cancel","creating":"Creating...","submit":"Create page","linkFail":"Couldn't link to \\"{{target}}\\". Please try again from the panel.","removeLinkedPage":"Remove","error":{"nameRequired":"Please enter a name.","nameMaxLength":"Name must be 256 characters or fewer.","kindRequired":"Please select a type."},"kind":{"person":"Person","organization":"Organization","concept":"Concept","decision":"Decision"},"field":{"name":"Name","namePlaceholder":"e.g., OSS Team, John Smith, Q2 Decision","kind":"Type","visibility":"Access","description":"Description","descriptionPlaceholder":"Briefly describe what this page is about.","linkedPages":"Link to pages","linkedPagesPlaceholder":"Search existing wiki pages","optional":"Optional"},"visibility":{"private":{"label":"Private","description":"Not shared with other workspace members."},"workspace":{"label":"Workspace","description":"Workspace members can find and view this page."},"helper":"Private is the default. Share it with the workspace when needed.","change":"Change access: {{visibility}}"},"success":{"title":"\\"{{name}}\\" page created","desc":"You can check who has access on the wiki page."}},"overflow":{"merge":"Merge with another page","aliasManage":"Manage alternate names","delete":"Delete this page"},"delete":{"dialogTitle":"Delete this page?","dialogDescription":"All source metadata, aliases, and relationships for \\"{{name}}\\" will be permanently deleted. This cannot be undone.","confirmButton":"Delete","cancelButton":"Cancel"},"merge":{"dialogTitle":"Merge with another page","step1Description":"Is the same person split across two pages? Search and select the page to merge with.","step1Placeholder":"Search page name","step1ResultMeta":"{{type}} · {{count}} source notes","step1Empty":"No results found.","step2NameRadioLabel":"Primary name","step2NameRadioMeta":"{{count}} source notes","step2DescRadioLabel":"What should we do with the descriptions?","step2DescBase":"Keep {{name}}'s description only","step2DescTarget":"Keep {{name}}'s description only","step2DescBoth":"Keep both (edit later)","step2ImpactLabel":"After merging","step2ImpactSources":"Source notes {{from}} + {{to}} → {{total}}","step2ImpactAliases":"Aliases {{from}} + {{to}} → {{total}} (auto-merged)","step2ImpactRelations":"Relations {{from}} + {{to}} → {{total}} (auto-merged)","backButton":"← Back","cancelButton":"Cancel","confirmButton":"Merge","failureToast":"Couldn't merge. Please try again."},"aliasManage":{"dialogTitle":"Manage alternate names","empty":"No aliases yet","addPlaceholder":"Add alias...","addButton":"Add","primary":"Primary","createFailure":"Couldn't add alias.","removeFailure":"Couldn't delete alias."},"transcript":{"loading":"Loading note...","error":"Couldn't load note","back":"← Back to page"},"breadcrumb":{"ariaLabel":"Wiki page path","root":"Wiki"},"newPage":{"button":"New page"},"onboarding":{"emptyLogoAlt":"Tiro logo","emptyTitle":"No wiki has been created yet","emptyDescription":"Once notes are created, Tiro will automatically make your wiki. Please create a note first.","previewLabels":{"cloudMigration":"Cloud migration","ossTeam":"OSS team","developmentTeam":"Development team","projectX":"Project X","acme":"ACME","meeting":"Meeting","plato":"Plato","lgUplus":"LG U+"},"previewAlt":"Tiro wiki graph preview","title":"Activate Tiro Wiki","description":"Tiro connects key concepts and relationships from your notes into a wiki automatically.","docsButton":"View wiki docs","activateButton":"Activate Wiki","activatingButton":"Activating...","readyToBuildTitle":"Wiki is activated","readyToBuildDescription":"Build your wiki from completed notes in the last {{months}} months.","backfillButton":"Build wiki from the last {{months}} months","backfillingButton":"Building wiki...","noEligibleTitle":"No wiki content to build yet","noEligibleDescription":"There are no completed notes at least 10 minutes long in the last {{months}} months.\\nCreate a longer note, then try again.","upgradeTitle":"Wiki is available on Pro plans and above","upgradeDescription":"Your current plan can't activate Wiki.\\nUpgrade your plan to start using Tiro Wiki.","upgradeButton":"Upgrade plan","adminTitle":"Only workspace admins can activate Wiki","adminDescription":"This workspace can use Wiki, but only an admin can turn it on.\\nAsk a workspace admin to activate Wiki.","subscriptionInactiveTitle":"Check the workspace subscription to activate Wiki","subscriptionInactiveDescription":"If your team is on Team or Enterprise and you still see this message, check the workspace subscription status before trying again.","unavailableTitle":"Wiki is not available for this workspace yet","unavailableDescription":"The feature rollout status is being checked. You can review wiki requirements in the docs.","uninitTitle":"Start Wiki","uninitDesc":"Build a wiki from the last 6 months of notes","startButton":"Activate Wiki","startingButton":"Activating...","inProgressTitle":"Building your wiki","inProgressBody":"Organizing {{count}} notes","inProgressNotice":"{{count}} new notes are being analyzed","inProgressNoticePendingNames":"Analyzing: {{names}}","inProgressNoticeOverflow":"{{count}} more","inProgressNoticeDismissHint":"Analysis continues after you dismiss this","inProgressNoticeCloseAria":"Dismiss analysis progress notice"},"activation":{"error":"Could not activate wiki."},"backfill":{"error":"Could not start wiki creation.","noEligibleTitle":"No notes available for wiki creation yet","noEligibleDescription":"Create a completed note at least 10 minutes long, then try again."},"scopeExpand":{"chip":"Expand wiki","popoverTitle":"How far back should we go?","option":"{{months}} months","toastInProgress":"Expanding wiki to cover {{months}} months"},"search":{"placeholder":"Search wiki pages","noResults":"No results found","loading":"Searching...","close":"Close search"},"filter":{"all":"All","person":"Person","org":"Organization","concept":"Concept","decision":"Decision"},"zoom":{"in":"Zoom in","out":"Zoom out","fit":"Fit to screen","reset":"Reset layout"},"viewToggle":{"graph":"Graph view","list":"List view","graphShort":"Graph","listShort":"List"},"sidebar":{"label":"Wiki","badgeNew":"NEW","badgeBeta":"Beta"}}`,
  ),
  Pe = {
    sessionExpired: {
      toast: {
        title: "Please log in again",
        description:
          "For security, your session has ended. Log back in to continue.",
      },
      expired: {
        title: "Your session expired",
        description:
          "You were signed out because your session timed out. Log back in to continue.",
      },
      revoked: {
        title: "Signed out for security",
        description:
          "Your session ended after a password change or a remote sign-out. Log back in to continue.",
      },
      recordingStopped: {
        title: "Recording stopped",
        description:
          "Your session ended, so the recording was stopped. Everything saved so far is in your note.",
      },
    },
  },
  De = {
    pageTitle: "Voicepad",
    statusIdle: "Idle",
    statusSpeaking: "Speaking",
    esTitle: "Before you start",
    esStep1:
      "In your Tiro note, click the microphone icon and make sure <strong>System Sound volume is set to 100%</strong>.",
    esStep2:
      "Type a sentence and press Enter. It plays through your speaker and is recorded in your Tiro note at the same time.",
    esStep3:
      "Even if you mute your desktop speaker, it is still recorded in your Tiro note.",
    esStep4:
      "You can change the spoken voice language in Settings (the gear icon).",
    esOpenApp: "Open Tiro Note",
    inputPlaceholder: "Type what you want to say",
    stop: "Stop",
    metaQueued: "Queued",
    metaSpeaking: "Speaking",
    metaDone: "Done",
    metaCanceled: "Canceled",
    metaError: "Playback failed",
    msgReplayTitle: "Click to play again",
    settingsVoice: "Voice",
    settingsSpeed: "Speed",
    settingsName: "Name",
    namePlaceholder: "e.g. Sam",
    settingsPrefix: "Add my name before each sentence",
    addChip: "+ New phrase",
    addChipTitle: "Add a new quick phrase",
    editTitle: "Edit",
    deleteTitle: "Delete",
    bannerNoSynth:
      "This browser does not support speech synthesis. Please open in Chrome or Edge.",
    bannerNoVoice:
      "No voice found for this language. Please open in the latest Chrome or Edge.",
    bannerEdge: "Open in Edge for a more natural-sounding voice.",
  },
  Ee = {
    metaTitle: "Partner Link Performance | Tiro",
    metaDescription:
      "A private page for Tiro partners to review referral link performance.",
    eyebrow: "Partner links",
    title: "Referral link performance",
    ranges: {
      7: "Last 7 days",
      14: "Last 14 days",
      30: "Last 30 days",
      all: "All time",
    },
    linkFilterLabel: "Select link",
    allLinks: "All links",
    allLinksWithCount: "All links ({{count}})",
    metrics: {
      signup: "Signups",
      signupNote: "Users who joined from your links",
      activated: "Activated",
      activatedRate: "{{rate}} of signups",
      paid: "Paid",
      paidRate: "{{rate}} of signups",
    },
    cards: {
      activationRate: "Activation rate",
      activationNote: "{{signups}} signups → {{activated}} activated",
      paidRate: "Paid conversion rate",
      paidNote: "{{activated}} activated → {{paid}} paid",
      signupPaidRate: "{{rate}} of signups",
    },
    conversions: { title: "Conversion rates" },
    benefits: {
      paymentRewardFirstMonthPartial:
        "{{percent}}% off first month of {{planName}}",
      paymentRewardFirstMonthFree: "First month of {{planName}} free",
      paymentRewardFirstMonthFreeWithSecondMonthDiscount:
        "First month of {{planName}} free + {{percent}}% off second month",
      freeTrialMinutes: "{{minutes}} free trial minutes",
      none: "No benefit",
      loading: "Loading",
    },
    dailyTitle: "Daily trend",
    dailySubtitle:
      "Signups, activations, and paid conversions in the same window.",
    emptyDaily: "No activity to show yet.",
    copy: "Copy",
    copied: "Copied",
    showMore: "Show more",
    tableTitle: "Links",
    table: {
      date: "Date",
      link: "Link",
      benefit: "Benefit",
      signup: "Signups",
      activated: "Activated",
      paid: "Paid",
      activatedRate: "Activation rate",
      total: "Total",
      actions: "Actions",
    },
    loading: "Loading partner link performance.",
    errorTitle: "Could not load partner link performance.",
    errorDescription: "Please try again in a moment.",
    retry: "Retry",
    notPartner: {
      title: "You are not a Tiro partner.",
      description: 'To start partner activity, contact "{{email}}".',
      button: "Send email",
      copiedButton: "Email address copied",
      mailSubject: "Tiro partner inquiry",
    },
  },
  Re = {
    pricing: {
      title: "Pricing and plans | Tiro",
      description:
        "Compare Tiro's Lite, Pro, Max, and Team plans for real-time meeting notes. Every plan starts with a free trial that includes 300 minutes of credit.",
      heading: "Plans and pricing",
    },
    downloadApp: {
      title: "Download Tiro for Mac, Windows, iOS, and Android",
      description:
        "Get the Tiro app for desktop and mobile. Record meetings, get real-time transcription and summaries, and pick up the same notes on every device.",
    },
    privacyPolicy: {
      title: "Privacy Policy | Tiro",
      description:
        "How Tiro collects, uses, stores, and deletes personal data, including how audio is handled, how long records are kept, and the rights you can exercise.",
    },
    termsOfService: {
      title: "Terms of Service | Tiro",
      description:
        "The terms that govern use of Tiro, covering accounts, subscriptions and billing, acceptable use, intellectual property, and termination.",
    },
    termsOfServiceIos: {
      title: "Terms of Service for iOS | Tiro",
      description:
        "The terms that apply to the Tiro iOS app, including App Store purchases, automatic subscription renewal, and platform-specific conditions.",
    },
    serviceLevelAgreement: {
      title: "Service Level Agreement | Tiro",
      description:
        "Tiro's uptime commitment for paid plans: service levels, service credits, exclusions, the claim procedure, and limitation of liability.",
    },
    referralRewardsTerms: {
      title: "Tiro Gifting Rewards Terms",
      description:
        "The rules for Tiro gifting rewards: who can take part, how rewards are earned and used, when they expire, and how improperly earned rewards are reclaimed.",
    },
  },
  Ie = {
    paymentScope:
      "The total due now may include outstanding charges and credits. Review the total before confirming payment. After payment succeeds, retry the invitation or role change manually.",
    retryAdmission:
      "Seat payment completed. Please retry the invitation or role change manually.",
    loading: "Checking seats…",
    retry: "Check again",
    recordingBlocked: {
      title: "Recording is paused because there are more members than seats",
      admin:
        "Buy more seats or reduce the number of members to resume recording.",
      member:
        "Ask a workspace admin to buy more seats or adjust the member count.",
    },
    roleChange:
      "This uses one purchased seat. Add seats first if no seats are available.",
    manage: "Manage seats",
    description:
      "Additional seats are available after payment. Seat reductions apply at your next renewal.",
    quantity: "Total seats after change",
    currentPurchased: "Currently purchased: {{count}} seats",
    totalDue: "Total due today",
    afterPayment:
      "You will have {{count}} seats in total after payment succeeds.",
    previewLoading: "Checking the amount due…",
    reservedHint: "Pending invitations also use seats.",
    invitationSeats:
      "Seats needed for this invitation: {{required}} · Available seats: {{available}}",
    sendingInvites: "Sending invitations…",
    integer: "Enter a whole number of seats.",
    minimum: `At least {{minimum}} seats are needed for members and pending invitations.
Remove members or invitations first.`,
    maximum: "Contact support to purchase more than {{maximum}} seats.",
    floor: "At least {{minimum}} seats are currently needed.",
    members: "Back to member management",
    decrease: `Applies on {{date}}.
All {{purchased}} purchased seats remain available until then. Seat reductions do not receive a refund or credit.`,
    pending: "Checking result",
    pay: "Pay and add seats",
    preview: "Review payment",
    schedule: "Schedule reduction",
    purchasedSeats: "Purchased",
    usedSeats: "In use",
    reservedSeats: "Invited",
    availableSeats: "Available",
    next: "Next renewal on {{date}}: {{count}} seats",
    cancelSchedule: "Cancel seat reduction",
    unknown:
      "We are checking the result. Your purchased seats remain unchanged. Check the result before making another payment.",
    readback: "Check change result",
    paymentFailed:
      "Payment did not complete. Your existing seats are unchanged. Use a different card or contact support.",
    failed: "The change did not complete. Check the latest seat status.",
    loadFailed: "Could not load seats. Please check again shortly.",
    buy: "Add seats",
    admissionPending:
      "If a seat reduction is scheduled, cancel it before trying again. If a seat change is in progress, check its result first.",
    inviteScheduledReduction:
      "These invitations exceed the seats scheduled for your next renewal. Cancel the seat reduction, then try inviting again.",
    inviteBlocked:
      "There are not enough available seats. Add seats, then retry the invitation or role change.",
    guideInvite:
      "Inviting someone with a paid role uses one purchased seat. Add seats first if none are available.",
    guideRemoval: `Removing a member keeps your purchased seat count.
Reuse the open seat or reduce seats in Manage seats.`,
  },
  xe = {
    customDate: "Custom range",
    backDates: "‹ Select period",
    selectedCount: "{{count}} selected",
    allFilter: "All {{filter}}",
    clear: "Clear",
    noCreators: "No matching creators.",
    folderScope:
      "Search notes in this folder. Go to All notes to search other folders.",
    currentFolder: "Searching this folder",
    count: "{{count}} results",
    newest: "Newest first · Switch to oldest first",
    oldest: "Oldest first · Switch to newest first",
    emptyHint: "Try another keyword or clear your filters.",
    clearFilter: "Clear {{filter}} filter",
    maxSelections: "You can select up to 100 values per filter.",
    title: "Search notes",
    query: "Enter a keyword",
    clearQuery: "Clear keyword",
    close: "Close search",
    creators: "Creator",
    findCreator: "Find a creator",
    me: "{{name}} (me)",
    folders: "Folder",
    dates: "Date",
    allDates: "All dates",
    today: "Today",
    yesterday: "Yesterday",
    days: "Last {{count}} days",
    months: "Last 3 months",
    year: "This year",
    from: "From",
    to: "To",
    apply: "Apply period",
    reset: "Reset filters",
    loading: "Searching…",
    error: "Search failed.",
    retry: "Try again",
    empty: "No notes match these filters.",
    results: "Search results",
    more: "Load more",
    done: "Done",
  },
  Ne = {
    sidebar: {
      focus: "Go to guidance",
      done: "Done",
      query: "Team meeting",
      project: "Project",
      myProject: "My project",
      private: "Private",
      step1: {
        title: "Note search is more accurate",
        description: `Find notes and folders faster.
Narrow your note search by date.`,
      },
      step2: {
        title: "Favorite the folders you use most",
        description: `Use the folder menu to add to favorites.
Keep them one click away.`,
      },
      step3: {
        title: "Folders are easier to tell apart",
        description: `Folders only you can see have a lock icon.
Workspace folders are shared with members.`,
      },
    },
  },
  Me = {
    asanNanum: n,
    d4d: a,
    igybFestival: i,
    aifesta: r,
    impact: s,
    referralGift: l,
    billing: c,
    payment: d,
    checkoutLink: p,
    inviteNudge: u,
    title: m,
    description: h,
    keywords: g,
    applicationName: y,
    beta: f,
    date: w,
    onboarding: b,
    onboarding2: v,
    landing: k,
    global: t,
    loginComplete: T,
    mcpAuthCallback: S,
    mcpConsent: C,
    connectComplete: A,
    coupon: P,
    referral: D,
    download: E,
    pricing: R,
    subscription: I,
    settings: x,
    layout: N,
    note: M,
    search: L,
    common: F,
    dateRange: O,
    calendar: W,
    deeplink: U,
    time: q,
    toast: B,
    inAppBrowser: Y,
    appRedirect: z,
    record: G,
    duration: _,
    error: H,
    help: V,
    invite: j,
    contact: K,
    footer: Q,
    press: J,
    fileUpload: Z,
    recordingSupport: $,
    permission: X,
    titlebar: ee,
    appMenu: te,
    update: oe,
    notification: ne,
    onboardingPopup: ae,
    askTiro: ie,
    freeTrialBanner: re,
    sidebarBanner: se,
    notifications: le,
    meetingEnd: ce,
    shortcut: de,
    context: pe,
    editor: ue,
    automation: me,
    offline: he,
    developers: ge,
    organization: ye,
    oauthLoading: fe,
    shared: we,
    noteList: be,
    security: ve,
    trustCenter: ke,
    templateManager: Te,
    workspace: Se,
    wikiConvergence: Ce,
    wiki: Ae,
    auth: Pe,
    voicepad: De,
    partnerLinks: Ee,
    pageMeta: Re,
    teamSeats: Ie,
    inlineSearch: xe,
    featureGuidance: Ne,
  };
exports.aifesta = r;
exports.appMenu = te;
exports.appRedirect = z;
exports.applicationName = y;
exports.asanNanum = n;
exports.askTiro = ie;
exports.auth = Pe;
exports.automation = me;
exports.beta = f;
exports.billing = c;
exports.calendar = W;
exports.checkoutLink = p;
exports.common = F;
exports.connectComplete = A;
exports.contact = K;
exports.context = pe;
exports.coupon = P;
exports.d4d = a;
exports.date = w;
exports.dateRange = O;
exports.deeplink = U;
exports.default = Me;
exports.description = h;
exports.developers = ge;
exports.download = E;
exports.duration = _;
exports.editor = ue;
exports.error = H;
exports.featureGuidance = Ne;
exports.fileUpload = Z;
exports.footer = Q;
exports.freeTrialBanner = re;
exports.global = t;
exports.help = V;
exports.igybFestival = i;
exports.impact = s;
exports.inAppBrowser = Y;
exports.inlineSearch = xe;
exports.invite = j;
exports.inviteNudge = u;
exports.keywords = g;
exports.landing = k;
exports.layout = N;
exports.loginComplete = T;
exports.mcpAuthCallback = S;
exports.mcpConsent = C;
exports.meetingEnd = ce;
exports.note = M;
exports.noteList = be;
exports.notification = ne;
exports.notifications = le;
exports.oauthLoading = fe;
exports.offline = he;
exports.onboarding = b;
exports.onboarding2 = v;
exports.onboardingPopup = ae;
exports.organization = ye;
exports.pageMeta = Re;
exports.partnerLinks = Ee;
exports.payment = d;
exports.permission = X;
exports.press = J;
exports.pricing = R;
exports.record = G;
exports.recordingSupport = $;
exports.referral = D;
exports.referralGift = l;
exports.search = L;
exports.security = ve;
exports.settings = x;
exports.shared = we;
exports.shortcut = de;
exports.sidebarBanner = se;
exports.subscription = I;
exports.teamSeats = Ie;
exports.templateManager = Te;
exports.time = q;
exports.title = m;
exports.titlebar = ee;
exports.toast = B;
exports.trustCenter = ke;
exports.update = oe;
exports.voicepad = De;
exports.wiki = Ae;
exports.wikiConvergence = Ce;
exports.workspace = Se;
//# sourceMappingURL=common-BYp7ijXW.js.map
