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
    i = new e.Error().stack;
  i &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[i] = "41df0542-361c-44c8-8c9d-60a6a8d01f49"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-41df0542-361c-44c8-8c9d-60a6a8d01f49"));
} catch {}
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const o = {
    eventName: "2026 정주영 창업경진대회 파트너 혜택",
    pageTitle: "정주영 창업경진대회 선물 · 티로 Pro 플랜 1개월 무료",
    pageDescription:
      "2026 정주영 창업경진대회 참가자를 위한 티로 Pro 플랜 1개월 무료 쿠폰. 결제 화면에서 코드를 입력하면 적용돼요.",
    benefitLabel: "티로 Pro 플랜",
    monthFree: "개월 무료",
    deadline: "쿠폰 등록 기간: 2026.11.18 23:59까지",
    renewal: `1개월 후 유료 구독으로 자동 갱신돼요.
결제 전 다음 결제일과 금액을 확인해 주세요.`,
    steps1: "'지금 바로 혜택받기' 버튼 클릭 후 원하는 플랜의 [시작하기] 클릭",
    steps2: "티로에 로그인 (계정이 없다면 이 단계에서 바로 가입할 수 있어요)",
    steps3:
      "결제 화면에 할인 코드 'ASAN2026'이 적용되어 있는지 확인 (적용되어 있지 않다면 '코드 추가'에 직접 입력)",
    steps4: "19,900원 할인된 금액을 확인한 뒤 결제 완료 (Lite·Pro 플랜은 0원)",
    endedTitle: "쿠폰 등록 기간이 끝났어요",
    endedHelp: "행사 혜택 제공 기간이 종료되었어요.",
    pausedTitle: "현재 쿠폰 안내를 준비하고 있어요",
    pausedHelp: "잠시 후 다시 확인해 주세요.",
  },
  n = {
    eventName: "D4D × EDTH 해커톤 참가자 혜택",
    pageTitle: "D4D 참가자 선물 · 티로 무료체험 1,000분",
    pageDescription:
      "아래 링크로 새로 가입하면 31일 동안 사용할 수 있는 무료체험 총 1,000분을 바로 드립니다.",
    benefitLabel: "티로 무료체험",
    minutes: "분",
    deadline: "2026.10.31 23:59까지 가입 시 제공 (한국 시간)",
    duration: `전용 링크로 새로 가입하면
무료체험 총 1,000분을 바로 드립니다.
가입일부터 31일간 사용할 수 있어요.`,
    redeem: "가입하고 1,000분 받기",
    instructionsTitle: "혜택 받는 방법",
    steps1: "위 버튼을 눌러 D4D 전용 가입 링크로 이동하세요.",
    steps2:
      "초대장 화면에서 ‘이 링크로 가입하고 혜택 받기’를 눌러 새로 가입하세요.",
    steps3:
      "가입 즉시 무료체험 총 1,000분이 제공됩니다. 가입일부터 31일간 사용할 수 있어요.",
    endedTitle: "D4D 참가자 혜택이 종료됐어요",
    endedHelp:
      "신규 가입 혜택 등록 기간이 끝났어요. 이미 받은 혜택은 지급된 사용기간 동안 이용할 수 있어요.",
    pausedTitle: "D4D 참가자 혜택을 준비하고 있어요",
    pausedHelp: "잠시 후 다시 방문해 주세요.",
    visitTiro: "티로 둘러보기",
  },
  r = {
    event: "2026 지상군페스티벌",
    eyebrow: "참가자를 위한 특별한 선물",
    headline: `말로 남긴 순간을,
기록으로.`,
    description: "티로가 대화를 기록하고, 중요한 내용을 정리해 드려요.",
    ticketLabel: "티로 무료 이용권",
    benefitLabel: "티로 녹음 이용권",
    minutesFree: "분 무료",
    benefitCaption: "대화는 편하게, 기록은 티로에 맡기세요.",
    eligibilityLabel: "받을 수 있는 분",
    eligibility: "신규·기존 회원 모두",
    validityLabel: "사용 기간",
    validity: "등록한 날부터 {{days}}일",
    redeemTitle: "이용권 등록하기",
    guide: "코드를 복사해 쿠폰 등록 화면에 입력하세요.",
    codeLabel: "쿠폰 코드",
    copy: "복사",
    copied: "복사됨",
    loginHelp: "로그인 또는 회원가입 후 등록할 수 있어요.",
    copiedHelp: "코드를 복사했어요. 쿠폰 등록 화면에 붙여 넣으세요.",
    copyFailed: "자동 복사가 안 돼요. 선택된 코드를 직접 복사해 주세요.",
    redeem: "지금 티로 가입하고 혜택받기",
    steps: "코드 복사 → 로그인 → 쿠폰 등록",
    limits: "선착순 5,000명 · 계정당 1회",
    deadline: "쿠폰 등록 기간: 2026.10.14 23:59까지",
    tagline: "대화의 다음을 만드는 티로",
    endedTitle: "쿠폰 등록 기간이 끝났어요",
    endedHelp: "행사 혜택 제공 기간이 종료되었어요.",
    pausedTitle: "현재 쿠폰 등록 안내를 준비하고 있어요",
    pausedHelp: "잠시 후 다시 확인해 주세요.",
    visitTiro: "티로로 이동",
    pageTitle: "지상군페스티벌 선물 · Pro 플랜 1개월 무료",
    pageDescription:
      "지상군페스티벌 참가자를 위한 티로 Pro 플랜 1개월 무료 혜택.",
    instructionsTitle: "쿠폰 등록 방법",
    instruction1: "쿠폰 코드 'IGYB2026' 복사",
    instruction2: "웹 또는 데스크탑 앱에서 티로 로그인",
    instruction3: "좌측 상단 프로필 클릭 > 플랜 구독하기 > Pro 플랜 선택",
    instruction4: "'프로모션 코드 추가'에 복사한 코드 입력",
    planLabel: "플랜",
    freeMonth: "1개월 무료",
    offerTitle: "Pro 플랜 1개월 무료",
    plan: "Pro 플랜",
    monthFree: "개월 무료",
    renewal: `1개월 후 유료 구독으로 자동 갱신돼요.
결제 전 다음 결제일과 금액을 확인해 주세요.`,
    billingGuide: "더 자세한 쿠폰 적용 방법은 안내 링크를 참고해 주세요.",
    laterTitle: "나중에 사용하고 싶다면",
    laterHelp: "쿠폰 유효기간 전까지 아래 방법에 따라 쿠폰을 등록해 주세요.",
  },
  a = {
    instructionsTitle: "쿠폰 등록 방법",
    billingGuide: "더 자세한 쿠폰 적용 방법",
    eyebrow: "AI FESTA 참가자를 위한 선물",
    description: "티로가 대화를 기록하고, 중요한 내용을 정리해 드려요.",
    ticketLabel: "티로 할인 쿠폰",
    benefitLabel: "티로 전 플랜",
    percentOff: "% 할인",
    benefitCaption: "회의록부터 에이전트 연결까지, 모든 기능을 그대로 쓰세요.",
    duration: "첫 달 결제에만 1회 적용돼요.",
    redeemTitle: "할인 코드 사용하기",
    guide:
      "아래 코드를 복사한 뒤 결제 화면의 프로모션 코드 칸에 붙여 넣어 주세요.",
    codeLabel: "쿠폰 코드",
    copy: "복사",
    copied: "복사됨",
    loginHelp: "로그인 후 요금제를 고르면 결제 화면이 열려요.",
    copiedHelp: "코드를 복사했어요. 결제 화면에 붙여 넣으세요.",
    copyFailed: "자동 복사가 안 돼요. 선택된 코드를 직접 복사해 주세요.",
    redeem: "지금 바로 혜택받기",
    steps1: "쿠폰 코드 'AIFESTA2026' 복사",
    steps2: "웹 또는 데스크탑 앱에서 티로 로그인",
    steps3: "좌측 상단 프로필 클릭 > 플랜 구독하기 > 플랜 선택",
    steps4: "'프로모션 코드 추가'에 복사한 코드 입력",
    deadline: "쿠폰 등록 기간: 2026.11.30 23:59까지",
    tagline: "대화의 다음을 만드는 티로",
    endedTitle: "쿠폰 사용 기간이 끝났어요",
    endedHelp: "이미 적용한 할인은 결제 주기가 끝날 때까지 그대로 유지돼요.",
    pausedTitle: "현재 쿠폰 안내를 준비하고 있어요",
    pausedHelp: "잠시 후 다시 확인해 주세요.",
    visitTiro: "티로로 이동",
    pageTitle: "AI FESTA 선물 · 티로 전 플랜 50% 할인",
    pageDescription:
      "AI FESTA 참가자를 위한 티로 전 플랜 50% 할인 쿠폰. 결제 화면에서 코드를 입력하면 적용돼요.",
  },
  s = {
    instructionsTitle: "쿠폰 등록 방법",
    billingGuide: "더 자세한 쿠폰 적용 방법",
    eyebrow: "IMPACT 2026 참가자를 위한 선물",
    description: "티로가 대화를 기록하고, 중요한 내용을 정리해 드려요.",
    ticketLabel: "티로 할인 쿠폰",
    benefitLabel: "티로 전 플랜",
    percentOff: "% 할인",
    benefitCaption: "회의록부터 에이전트 연결까지, 모든 기능을 그대로 쓰세요.",
    duration: "첫 달 결제에만 1회 적용돼요.",
    redeemTitle: "할인 코드 사용하기",
    guide:
      "아래 코드를 복사한 뒤 결제 화면의 프로모션 코드 칸에 붙여 넣어 주세요.",
    codeLabel: "쿠폰 코드",
    copy: "복사",
    copied: "복사됨",
    loginHelp: "로그인 후 요금제를 고르면 결제 화면이 열려요.",
    copiedHelp: "코드를 복사했어요. 결제 화면에 붙여 넣으세요.",
    copyFailed: "자동 복사가 안 돼요. 선택된 코드를 직접 복사해 주세요.",
    redeem: "지금 바로 혜택받기",
    steps1: "쿠폰 코드 'IMPACT2026' 복사",
    steps2: "웹 또는 데스크탑 앱에서 티로 로그인",
    steps3: "좌측 상단 프로필 클릭 > 플랜 구독하기 > 플랜 선택",
    steps4: "'프로모션 코드 추가'에 복사한 코드 입력",
    deadline: "쿠폰 등록 기간: 2026.11.30 23:59까지",
    tagline: "대화의 다음을 만드는 티로",
    endedTitle: "쿠폰 사용 기간이 끝났어요",
    endedHelp: "이미 적용한 할인은 결제 주기가 끝날 때까지 그대로 유지돼요.",
    pausedTitle: "현재 쿠폰 안내를 준비하고 있어요",
    pausedHelp: "잠시 후 다시 확인해 주세요.",
    visitTiro: "티로로 이동",
    pageTitle: "IMPACT 2026 선물 · 티로 전 플랜 50% 할인",
    pageDescription:
      "IMPACT 2026 참가자를 위한 티로 전 플랜 50% 할인 쿠폰. 결제 화면에서 코드를 입력하면 적용돼요.",
  },
  l = {
    paidExplanation:
      "친구가 첫 유료 결제를 하면 7일 후 <amt>$5</amt>가 더 적립돼요.",
    activationExplanation:
      "친구가 처음으로 10분 이상 기록하면 <amt>$3</amt>가 바로 적립돼요.",
    joinedCount: "{{count}}명",
    recipientName: "받는 사람 이름",
    title: `좋은 대화에 더 집중할 수 있도록,
티로 Pro 플랜을 선물하세요`,
    friendLabel: "친구에게",
    friendValue: "$13",
    friendCaption: "Pro 플랜 1개월분",
    rewardLabel: "나에게",
    rewardValue: "$8",
    rewardCaption: "친구 1명당 · 조건 충족 시",
    conditions: "리워드 지급 조건 보기",
    creditExplanation:
      "친구가 내 초대 링크로 가입하면 Pro 플랜 1개월분에 해당하는 <amt>$13</amt> 리워드를 받아요.",
  },
  c = {
    title: "결제 관리",
    section: { paymentInfo: "결제 수단", history: "결제 내역" },
    card: "카드",
    paymentMethodRow: "결제 수단",
    cardExpiry: "만료 {{expiry}}",
    cardEmpty: "등록된 카드가 없어요",
    paymentMethodLoadFailed: "결제 수단을 불러오지 못했어요.",
    invoiceEmailLoadFailed: "수신 이메일을 불러오지 못했어요.",
    method: {
      bankTransfer: "계좌이체 (수동 갱신)",
      adminGrant: "관리자 지급",
      apple: "Apple 인앱 결제",
      googlePlay: "구글 플레이스토어 인앱 결제",
      lemonSqueezy: "Lemon Squeezy",
      toss: "토스페이먼츠",
    },
    invoiceEmail: "인보이스 수신 이메일",
    invoiceEmailEmpty: "등록된 이메일이 없어요",
    invoiceEmailPlaceholder: "invoice@company.com",
    invoiceEmailInvalid: "이메일 주소를 다시 확인해 주세요.",
    invoiceEmailUpdated: "인보이스 수신 이메일을 바꿨어요.",
    invoiceEmailUpdateFailed: `인보이스 수신 이메일을 바꾸지 못했어요.
잠시 후 다시 시도해 주세요.`,
    invoiceOpenFailed: `인보이스를 열지 못했어요.
잠시 후 다시 시도해 주세요.`,
    paymentMethodUpdateFailed: `결제 수단 변경 화면을 열지 못했어요.
잠시 후 다시 시도해 주세요.`,
    change: "변경",
    save: "저장",
    cancel: "취소",
    historyNote: "구독이 만료된 후에도 이 목록은 계속 볼 수 있어요.",
    historyEmpty: "아직 결제 내역이 없어요.",
    historyLoading: "결제 내역을 불러오고 있어요.",
    historyLoadFailed: "결제 내역을 불러오지 못했어요",
    historyLoadFailedDescription: "잠시 후 다시 시도해 주세요.",
    retry: "다시 시도",
    column: {
      date: "날짜",
      description: "내역",
      amount: "금액",
      status: "상태",
      invoice: "인보이스",
    },
    status: { upcoming: "결제 예정", paid: "결제 완료", voided: "결제 취소" },
    amount: { estimated: "예상 {{amount}}" },
    item: {
      monthly: "{{plan}} 월간 구독",
      yearly: "{{plan}} 연간 구독",
      plan: "{{plan}} 구독",
      seatsTail: "({{seats}}석)",
      fallback: "기타 항목",
      overageTail: {
        recorded: "후불 기록 {{minutes}}분",
        accruing: "후불 기록 집계 중",
      },
      overageInvoice: {
        recorded: "{{month}}월 후불 기록 ({{minutes}}분)",
        accruing: "후불 기록 사용량 집계 중",
      },
      otherUsage: "기타 사용량",
    },
    download: "다운로드",
    guideLink: "플랜 및 구독 관리 가이드",
    noPlanBanner:
      "사용 중인 플랜은 없지만, 결제 내역과 인보이스는 계속 볼 수 있어요.",
    viewPlans: "플랜 보기",
    pagination: { prev: "이전", next: "다음" },
  },
  d = {
    success: {
      title: "결제가 완료됐어요",
      description: "티로 앱에서 바로 이어서 쓸 수 있어요.",
      returnToApp: "티로 앱으로 돌아가기",
      installDescription: "지금 티로 앱을 설치하고 간편하게 사용해 보세요.",
      downloadApp: "앱 다운로드",
      continueOnWeb: "웹에서 사용하기",
      planTitle: "티로 {{planName}} 플랜",
    },
  },
  p = {
    retry: "잠시 후 다시 시도해 주세요.",
    plans: {
      recommended: "추천",
      footnote:
        "구매시 리워드가 소진돼요. 남은 무료사용량도 계속 사용할 수 있어요.",
      teamRewardNotice: "리워드는 개인 플랜에만 적용돼요.",
      title: "플랜 선택",
      start: "시작하기",
    },
    title: "리워드 사용하기",
    loading: "리워드를 확인하고 있어요.",
    expired: {
      title: "링크가 만료됐어요",
      description: "앱에서 리워드 사용하기를 다시 눌러 주세요.",
    },
  },
  u = {
    title: "친구 초대하고 최대 $8 받기",
    description: "회의가 많은 친구가 있나요? 프로 1개월을 선물해 보세요.",
    cta: "지금 친구 초대하기",
    paymentModal: {
      title: "회의가 많은 친구에게 Pro를 선물해보세요",
      description:
        "주변에 회의가 많은 친구가 있나요? 친구에게 Pro 1개월을 선물하고, 결제 시 사용할 수 있는 리워드를 받아보세요.",
      friendLabel: "친구에게",
      friendValue: "Pro 1개월 무료",
      rewardLabel: "나에게",
      rewardValue: "최대 $8 리워드",
      cta: "친구 초대하기",
    },
  },
  m = "티로 | 대화에만 집중할 수 있게, 가장 정확한 AI 회의록",
  g =
    "실시간 요약 · 다국어 동시 번역으로 자신있게 대화하고 원하는 양식의 문서를 3초 만에 완성하여 공유해보세요.",
  b =
    "티로, Tiro, 티로 AI, tiro ai, 노트 필기, 노트, 필기, 회의록, 번역, 요약, 미팅, 인터뷰, 강의록, STT, 음성, AI, 인공지능, 대화, 속기, 속기사, 속기기록, 속기노트, 속기앱, 속기툴, 속기프로그램, 클로바노트, 클로바",
  h = "티로",
  T = "베타",
  y = { today: "오늘", yesterday: "어제" },
  S = {
    jobInfo: {
      field: "어떤 분야에서 활동하고 계신가요?",
      usage: "어떤 순간에 티로를 사용해보고 싶으신가요?",
    },
  },
  A = {
    eventPopup: {
      title: "신규 회원 이벤트",
      description: `24시간 안에 10분 이상 노트를 기록하면
50분 추가 크레딧을 드려요!`,
      laterButton: "나중에 하기",
      startNowButton: "지금 바로 시작하기",
    },
  },
  v = {
    demo: {
      backToList: "노트 목록",
      conferenceMode: "컨퍼런스 모드",
      share: "공유하기",
      meta: { addContext: "맥락 입력", duration: "0분" },
      tab: { document: "문서", source: "원본" },
      subtab: { summary: "요약", script: "스크립트" },
      docCreate: "문서 생성하기",
      docEmptyTitle: "녹음 종료 시 자동으로 문서가 생성돼요",
      docEmptyTemplate: "자동 생성 템플릿:",
      docEmptyHint: "녹음이 끝나면 바로 확인할 수 있어요.",
      copy: "복사",
      docTemplate: "한페이지 문서",
      multilingual: "다국어",
      recordLang: "한국어",
      langs: {
        ko: "한국어",
        en: "영어",
        ja: "일본어",
        de: "독일어",
        es: "스페인어",
        fr: "프랑스어",
        it: "이탈리아어",
        vi: "베트남어",
      },
      translate: "번역",
      recording: "기록 중",
      rawHint: "한 문단이 완성되면, 스크립트의 내용이 더 정확해져요",
      generating: "티로가 문서를 정리하고 있어요",
      endNote: "기록 종료",
      replay: "다시 보기",
      tooltip: {
        start: "여기를 눌러 기록을 시작해보세요",
        end: "이제 기록을 종료해보세요",
      },
      templates: {
        docsOfNote: "이 노트의 문서",
        recommended: "추천 템플릿",
        meeting: "회의록 템플릿",
        interview: "채용 인터뷰 템플릿",
        lecture: "강의노트",
        pitch: "IR·피칭",
        viewAll: "모든 템플릿 보기",
        create: "새 템플릿 만들기",
      },
      askTiro: {
        title: "무엇을 도와드릴까요?",
        description: `노트를 참조하거나, 미팅을 요약하거나,
필요한 내용을 찾아드려요`,
        chip1: "핵심 내용 요약",
        chip2: "할 일 정리",
        chip3: "결정사항 정리",
        chip4: "한 줄 요약",
        refInfo: "참고한 정보",
        refNotes: "참조한 노트",
        noteCount: "노트 1개",
        writing: "답변을 작성하고 있어요",
        placeholder: "무엇이든 물어보세요",
      },
      doc: { discussion: "주요 논의", actionItems: "액션 아이템" },
    },
    loginPopup: {
      ssoRequired: `기업 SSO로 로그인해야 해요.
회사 이메일을 입력해 주세요.`,
      ssoUnavailable: `이 이메일로는 기업 SSO에 로그인할 수 없어요.
회사 이메일을 확인하거나 관리자에게 문의해 주세요.`,
      login: "로그인",
      welcome: "Welcome",
      continueWithGoogle: "Google로 계속하기",
      continueWithMicrosoft: "Microsoft로 계속하기",
      microsoftEmailRequired: "Microsoft 계정에 이메일 주소가 있어야 해요.",
      continueWithSSO: "SSO로 계속하기",
      continueWithEmail: "혹은 이메일로 계속하기",
      email: "이메일",
      emailPlaceholder: "이메일을 입력하세요",
      password: "비밀번호",
      passwordPlaceholder: "비밀번호를 입력하세요",
      emailRequired: "이메일을 입력해주세요.",
      emailInvalid: "올바른 이메일 형식을 입력해주세요.",
      passwordRequired: "비밀번호를 입력해주세요.",
      passwordMinLength: "비밀번호는 6자 이상이어야 합니다.",
      invalidCredentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
      loginError: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
      loginFailed: "로그인에 실패했습니다.",
      ssoSignIn: "로그인",
      withSSO: "with SSO",
      ssoEmailPlaceholder: "이메일을 입력하세요",
      next: "계속",
      change: "변경",
      back: "뒤로",
      alreadyHaveAccount: "이미 계정이 있으신가요?",
      forgotPassword: "비밀번호를 잊으셨나요?",
      emailSignup: "이메일로 회원가입",
      privacyPolicy: "개인정보처리방침",
      agreeToPrivacyPolicy: "을 읽었으며 이에 동의합니다.",
      lastUsed: "Last Used",
      securityCertification: "ISO/IEC 27001:2022 · SOC 2 Type 2 인증 취득",
      microsoftVerification: {
        title: "이메일을 확인해주세요",
        description:
          "Microsoft 계정의 이메일로 보낸 6자리 인증번호를 입력해주세요.",
        label: "인증번호",
        placeholder: "6자리 숫자",
        helper: "인증번호는 3분 동안 유효합니다.",
        submit: "인증하고 계속하기",
        verifying: "인증 중",
      },
    },
    emailSignup: {
      phase1: {
        title: "약관 동의",
        description: "회원가입을 위해 약관에 동의해주세요",
        agreeToTerms: "개인정보 처리방침에 동의합니다",
        confirmAge: "만 14세 이상입니다",
        next: "다음",
      },
      phase2: {
        title: "이메일 입력",
        description: "이메일을 입력하시면 인증번호를 발송해드립니다",
        emailPlaceholder: "이메일을 입력하세요",
        next: "다음",
        emailRequired: "이메일을 입력해주세요.",
        emailInvalid: "올바른 이메일 형식을 입력해주세요.",
        ssoOnlyDomain:
          "SSO 로그인이 필요한 도메인입니다. SSO 로그인을 이용해주세요.",
        emailAlreadyExists: "이미 사용 중인 이메일입니다.",
        tooManyRequests: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
        verificationCodeSent: "인증 번호가 전송 되었습니다",
        verificationCodeSentDescription:
          "입력하신 이메일로 인증번호를 발송했습니다.",
        codeSentError:
          "인증번호 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
        confirm: "확인",
        backToTerms: "약관 동의로 돌아가기",
      },
      phase3: {
        emailAlreadyExists: "이미 가입된 이메일 주소예요",
        title: "회원가입 정보 입력",
        description: "다른 이메일 주소로 회원가입",
        resendVerificationCode: "인증번호 재전송",
        verificationCodePlaceholder: "인증번호를 입력하세요",
        codeNotReceivedHelp:
          "인증 메일이 보이지 않으면 스팸함을 확인해 주세요. 그래도 없다면 <a>hello@theplato.io</a>로 문의해 주세요.",
        passwordPlaceholder: "비밀번호를 입력하세요",
        passwordConfirmPlaceholder: "비밀번호를 다시 입력하세요",
        passwordRule: "영문, 숫자, 특수 문자(@$!%*#?&)를 포함한 8글자 이상",
        nicknamePlaceholder: "닉네임을 입력하세요",
        nicknameRule: "특수문자 불가, 최대 20자",
        signup: "회원가입",
        verificationCodeRequired: "인증번호를 입력해주세요.",
        verificationCodeInvalid: "인증번호는 6자리 숫자여야 합니다.",
        passwordRequired: "비밀번호를 입력해주세요.",
        passwordTooShort: "비밀번호는 8자 이상이어야 합니다.",
        passwordInvalid:
          "비밀번호는 영문, 숫자, 특수문자(@$!%*#?&)를 포함해야 합니다.",
        passwordConfirmRequired: "비밀번호를 다시 입력해주세요.",
        passwordMismatch: "비밀번호가 일치하지 않습니다.",
        nicknameRequired: "닉네임을 입력해주세요.",
        nicknameTooLong: "닉네임은 최대 20자까지 입력 가능합니다.",
        nicknameInvalid: "닉네임에는 특수문자를 사용할 수 없습니다.",
        verificationCodeMismatch: "인증번호가 일치하지 않습니다.",
        passwordWeak:
          "비밀번호가 약합니다. 영문, 숫자, 특수문자(@$!%*#?&)를 포함한 8자 이상의 비밀번호를 입력해주세요.",
        tooManyVerificationAttempts:
          "인증 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.",
        validationError: "입력값을 확인해주세요.",
        signupError: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
      },
      phase4: {
        title: "회원가입 완료",
        description: "회원가입이 완료되었습니다!",
        welcomeMessage: "티로에 오신 것을 환영합니다!",
        loginButton: "로그인하기",
      },
    },
    passwordReset: {
      hidePassword: "비밀번호 숨기기",
      showPassword: "비밀번호 표시",
      completeTitle: "비밀번호를 변경했어요",
      linkDescription:
        "새 비밀번호를 입력해 주세요. 변경 후 모든 기기에서 다시 로그인해야 해요.",
      linkInvalid:
        "이 링크는 만료되었거나 더 이상 사용할 수 없어요. 비밀번호 재설정을 다시 요청해 주세요.",
      requestNewLink: "재설정 다시 요청하기",
      linkRetryError:
        "비밀번호를 변경하지 못했어요. 잠시 후 다시 시도하거나 재설정을 다시 요청해 주세요.",
      title: "비밀번호 재설정",
      description: "가입한 이메일로 인증번호를 보내드려요.",
      codeDescription:
        "가입된 계정이 있다면 인증번호를 보냈어요. 인증번호와 새 비밀번호를 입력해주세요.",
      completeDescription: "새 비밀번호로 로그인해 주세요.",
      emailPlaceholder: "이메일을 입력하세요",
      codePlaceholder: "인증번호를 입력하세요",
      passwordPlaceholder: "새 비밀번호",
      passwordConfirmPlaceholder: "새 비밀번호 확인",
      passwordRule:
        "영문, 숫자, 아래 특수문자를 포함해 8자 이상 입력해 주세요.",
      sendCode: "인증번호 받기",
      resendCode: "인증번호 다시 받기",
      changeEmail: "이메일 변경",
      reset: "비밀번호 재설정",
      login: "로그인하기",
      backToLogin: "로그인으로 돌아가기",
      emailInvalid: "올바른 이메일 형식을 입력해주세요.",
      codeInvalid: "인증번호는 6자리 숫자여야 합니다.",
      passwordInvalid:
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
      passwordMismatch: "비밀번호가 일치하지 않습니다.",
      tooManyRequests: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
      tooManyAttempts:
        "인증 시도 횟수를 초과했습니다. 인증번호를 다시 받아주세요.",
      sendError: "인증번호를 보내지 못했습니다. 다시 시도해주세요.",
      resetError: "인증번호를 확인하거나 새 인증번호를 받아 다시 시도해주세요.",
    },
    howToUse: "사용 가이드",
    blog: "블로그",
    pricing: "가격 안내",
    roiEstimate: "도입 견적",
    download: "앱 다운로드",
    continueAs: "{{name}}님으로 계속",
    signInWithAnotherAccount: "다른 계정으로 로그인",
    signInAs: "{{name}}님으로 로그인",
    signInWithGoogle: "구글로 로그인",
    tryTiroFree: "무료로 시작하기",
    tryTiroAs: "{{email}}로 시작하기",
    referralTooltip:
      "이 링크로 가입하시면 <bold>프로 플랜 1개월</bold>을 선물로 드려요!",
    referralTooltipDynamic: `<bold>{{referredName}}</bold>님이 초대하셨어요!
가입하시면 <bold>프로 플랜 1개월</bold>을 선물로 드려요!`,
    referralTooltipInviterOnly: "<bold>{{referredName}}</bold> 님이 초대했어요",
    giftTooltip: `<bold>{{senderName}}</bold>님이 선물했어요! 🎁
가입하시면 <bold>프로 플랜 1개월</bold>을 쓸 수 있어요!`,
    welcome: {
      badgeWithName: "{{name}}님이 초대했어요",
      badgeGeneric: "초대장이 도착했어요",
      title: "티로에 오신 걸 환영해요",
      subtitle: "회의도, 강의도 놓치지 않는 AI 노트를 지금 시작해보세요.",
      neutralHeadline: "<bold>대화는 티로가<br/>기록할게요</bold>",
      rewardHeadlineBonus:
        "<bold>Pro 플랜 1개월</bold> + <bold>{{bonus}}</bold> 할인 혜택",
      rewardFirstMonthPartial:
        "<bold><plan>{{planName}} 플랜</plan> 첫 달 {{percent}}% 할인</bold>",
      rewardFirstMonthFree:
        "<bold><plan>{{planName}} 플랜</plan> 첫 달 무료</bold>",
      rewardFirstMonthFreeWithSecondMonthDiscount:
        "<bold><plan>{{planName}} 플랜</plan> 첫 달 무료</bold><br/><extra>+ <bold>둘째 달 {{percent}}% 할인</bold></extra>",
      rewardTrialMinutes:
        "<bold><trial>무료체험</trial> 총 {{minutes}}분</bold>",
      rewardCaption: "가입 후 구독을 시작하면 결제 혜택이 자동으로 적용돼요",
      cta: "이 링크로 가입하고 혜택 받기",
    },
    aiNotes: {
      ogTitle: "사람과 에이전트가 함께 쓰는 AI 회의록 | Tiro",
      ogDescription:
        "대면·화상 회의 모두, 시끄러운 장소에서도 봇 없이 정확하게 기록해요. 회의가 끝나면 믿을 수 있는 회의록을 바로 공유하세요.",
      security: {
        eyebrow: "국제 보안 인증 취득",
        title: "ISO/IEC 27001:2022 · SOC 2 Type 2",
        description:
          "Tiro는 고객 데이터 보호를 위해 ISO/IEC 27001:2022 인증과, 5개 Trust Services Criteria 전 범위의 SOC 2 Type 2 인증을 적정의견으로 취득했습니다.",
      },
    },
    allRightsReserved: "All Rights Reserved.",
    faq: {
      title: "자주 묻는 질문",
      description: "티로에 대해 더 알고 싶으신가요?",
      items: {
        howToStart: {
          question: "어떻게 시작하나요?",
          answer:
            "티로는 가입 즉시 100분의 무료 사용량을 드려요. 캘린더 연동, 데스크탑·모바일 앱 설치, 첫 노트 만들기 4가지를 마치면 각각 50분씩 더해져 최대 300분이 됩니다. 무료 체험은 가입 후 3주간 이용할 수 있어요. 로그인 후 빨간버튼을 누르기만 하면 바로 티로의 실시간 기록을 확인할 수 있어요. 혹은 '음성파일 업로드'를 통해 기존에 녹음해둔 대화를 티로의 요약노트로 받아보실 수도 있습니다.",
        },
        videoConference: {
          question: "화상회의도 기록할 수 있나요?",
          answer:
            "네, 데스크탑 앱(Windows, Mac)을 통해 <strong>별도의 미팅봇 초대 없이</strong> 화상회의, 유튜브, 웨비나 등 시스템 소리를 기록할 수 있습니다. 랜딩페이지 상단의 <a href='https://tiro.ooo/ko/download/app'>앱 다운로드</a>를 누르면 즉시 설치할 수 있으니 많은 활용 부탁드립니다!",
        },
        mobileApp: {
          question: "티로 모바일앱도 있나요?",
          answer:
            "네, 티로 모바일앱은 안드로이드, IOS 모두 정식 출시된 상태입니다. 앱 다운로드 링크에서 설치 가능하며 언제 어디서나 티로와 함께 하실 수 있습니다.",
        },
        security: {
          question: "보안정책, 믿을 수 있나요?",
          answer:
            "티로는 현재 적용가능한 모든 음성 암호화 기술을 도입하고 있으며 가장 높은 수준의 보안을 제공합니다. 모든 텍스트 데이터는 생성 즉시 암호화되어 사용자 외에는 절대 내용을 알 수 없습니다. <a href='https://tiro.ooo/ko/blog/%ED%8B%B0%EB%A1%9C%EC%9D%98-%EB%B3%B4%EC%95%88-%EC%A0%95%EC%B1%85-%EC%A0%95%EB%A7%90-%EB%AF%BF%EC%9D%84-%EC%88%98-%EC%9E%88%EB%82%98%EC%9A%94-51060'>티로의 보안정책</a> 링크에서 더욱 자세한 내용을 확인하실 수 있어요.",
        },
        giftTiro: {
          question: "'티로 선물하기'는 무엇인가요?",
          answer:
            "설정의 '티로 선물하기' 탭에서 링크를 공유하거나 이메일로 초대할 수 있어요. 친구는 프로 플랜 1개월 할인 혜택을 받고, 친구가 10분 이상 기록하면 $3, 첫 유료 결제 후 7일이 지나면 $5가 내 리워드로 적립돼요.",
        },
        translation: {
          question: "실시간 번역도 지원하나요?",
          answer:
            "네, 티로는 한국어, 영어, 일본어를 포함하여 총 15개 언어를 지원하고 있어요. 회의가 진행되는 언어와 기록되는 언어를 각각 설정하면 실시간 번역을 체험할 수 있습니다. 나에게 가장 편한 언어로 기록되는 티로 노트를 만나보세요!",
        },
        teamPlanAccount: {
          question: "팀 플랜을 구독할 때, 계정 수를 어떻게 정하는 것이 좋나요?",
          answer: `계정 수는, 인원 수가 아닌 동시에 진행되는 미팅 수를 기준으로 선택하시는 걸 추천해요. 하나의 계정을 여러 팀원이 함께 사용할 수 있고, 동시 로그인도 가능하지만 하나의 계정으로는 한 번에 하나의 미팅만 기록할 수 있어요.
예. 10명 팀이라도 동시에 2~3개의 미팅만 진행된다면, 3개 계정으로 충분합니다.`,
        },
        enterprisePlan: {
          question:
            "팀 플랜과 엔터프라이즈 플랜 중 어떤 것이 우리 팀에 더 적합할까요?",
          answer: `팀 플랜은 작은 팀이나 부서 단위에서 협업을 위한 기본 기능을 충분히 제공하는 요금제예요
반면 엔터프라이즈 플랜은 다음과 같은 경우에 적합합니다.
<li>맞춤형 계약, 기능 커스터마이징 등을 원하는 경우</li><li>팀을 넘어, 더 큰 규모의 조직이나 전사 차원에서 도입을 원하는 경우</li>고민되신다면, 간단한 문의만 주셔도 맞춤 플랜을 안내해 드릴게요. <recatch>[문의하기]</recatch>`,
        },
      },
    },
    developers: "개발자 문서",
  },
  t = JSON.parse(
    `{"contactForm":{"title":"도입 문의","sla":"빠르게 살펴보고 이메일로 회신드릴게요.","requiredBadge":"","optionalBadge":"(선택)","company":{"label":"회사·기관명","placeholder":"예: 주식회사 더플레이토"},"name":{"label":"담당자명","placeholder":"예: 김민수"},"email":{"label":"회사 이메일","placeholder":"예: minsoo@company.co.kr"},"phone":{"label":"연락처","placeholder":"예: 010-1234-5678"},"useCase":{"label":"티로를 어떤 목적으로 사용하시나요?","options":{"team":{"label":"팀·조직의 일상 업무에 지속적으로 사용","description":"회의록, 통역, 보안 검토 등 팀 도입"},"conference":{"label":"행사·컨퍼런스에서 일회성으로 사용","description":"날짜가 정해진 행사 자막·번역"}}},"event":{"name":{"label":"행사명","placeholder":"예: 국제 심포지엄"},"host":{"label":"주최 기관","hint":"위 회사명과 다를 때만 적어 주세요","placeholder":"대행사·주최 기관명"},"startDate":{"label":"행사 시작일"},"endDate":{"label":"행사 종료일"},"dayLength":{"label":"하루 진행 시간","options":{"within_4h":"4시간 이내","all_day":"하루 종일","varies":"날마다 다름"},"variesPlaceholder":"하루 진행 시간을 적어 주세요"},"venue":{"label":"행사 장소","options":{"offline":"오프라인","online":"온라인","hybrid":"혼합"},"namePlaceholder":"장소명"},"languages":{"label":"행사 진행 언어","otherPlaceholder":"기타 언어"},"translation":{"label":"번역 희망 언어","otherPlaceholder":"기타 언어"},"languageOptions":{"ko":"한국어","en":"영어","ja":"일본어","zh":"중국어","none":"없음","other":"기타"},"captionAudience":{"label":"자막을 볼 예상 인원","options":{"up_to_100":"~100명","101_300":"101~300명","300_plus":"300명 이상"}},"rooms":{"label":"동시에 진행되는 회의장 수","options":{"one":"1개","two_plus":"2개 이상"},"countPlaceholder":"몇 개인지 적어 주세요"},"pageUrl":{"label":"행사 안내 페이지 링크","placeholder":"https://"},"addons":{"label":"추가로 필요한 것","options":{"glossary":"발표자료 기반 용어 사전 세팅","post_docs":"행사 후 요약·번역 문서","branding":"로고·브랜드 색상 적용","live_support":"행사 당일 실시간 지원"}}},"seats":{"label":"예상 사용 인원","placeholder":"선택해 주세요","options":{"seat_1_9":"1–9명","seat_10_49":"10–49명","seat_50_199":"50–199명","seat_200_plus":"200명 이상","undecided":"아직 미정"}},"jobFunction":{"label":"담당 직무","options":{"strategy":"경영전략","hr":"인사","sales":"영업","it":"IT","finance":"재무","legal":"법무","operations":"운영","other":"그 외"}},"jobTitle":{"label":"직함","placeholder":"예: 팀장, CTO"},"tiroUsage":{"label":"이미 티로를 쓰고 계신가요?","options":{"personal":{"label":"개인적으로 쓰고 있어요","description":"개인 계정으로 사용 중이에요"},"department":{"label":"팀이나 부서에서 쓰고 있어요","description":"이미 현업에서 쓰고 있어요"},"first_look":{"label":"아직 안 써봤어요","description":"이번에 처음 알아보는 중이에요"}}},"howFound":{"label":"티로를 어떻게 알게 되셨나요?","detailLabel":"조금 더 구체적으로","detailPlaceholder":"소개해 주신 분, 행사명, 검색어 등","options":{"referral":{"label":"지인 소개","description":"동료나 지인이 알려 줬어요"},"conference":{"label":"컨퍼런스·행사","description":"세션이나 부스에서 봤어요"},"search":{"label":"검색","description":"검색해서 찾아왔어요"},"ads":{"label":"광고","description":"광고를 보고 들어왔어요"},"other":{"label":"그 외","description":"아래에 적어 주세요"}}},"adoptionGates":{"label":"도입 전에 필요한 절차가 있나요?","multiHint":"(해당하는 것 모두)","options":{"security_questionnaire":{"label":"보안성 검토 질문지","description":"보안 부서 질문지나 체크리스트"},"private_env":{"label":"프라이빗 환경","description":"전용 인스턴스나 폐쇄망"},"custom_contract":{"label":"별도 계약서 양식","description":"회사 표준 계약서로 진행"},"procurement":{"label":"구매·조달 절차","description":"구매 품의나 벤더 등록"},"none":{"label":"해당 없음","description":"위 절차 없이 바로 검토할 수 있어요"}}},"purpose":{"label":"어떤 상황인가요?","multiHint":"(해당하는 것 모두)","coachTitle":"이런 내용이 있으면 답변이 빨라져요","coachEmpty":"상황을 고르면 무엇을 적으면 좋을지 알려 드려요.","options":{"minutes":{"label":"팀 회의를 기록하고 정리하고 싶어요","description":"회의록, 세일즈 미팅, 채용 인터뷰 같은 일상 회의","hint":"주로 어떤 회의인지, 몇 명이 쓰는지"},"interpretation":{"label":"다국어 회의와 통화를 실시간으로 통역하고 싶어요","description":"해외 파트너, 지사와의 정기 미팅","hint":"언어 조합, 회의 빈도"},"conference":{"label":"행사나 컨퍼런스에서 1회성으로 실시간 자막이 필요해요","description":"날짜가 정해진 행사, 참석자에게 송출","hint":"행사 날짜, 언어, 참석 규모"},"security_sso":{"label":"회사 전체 도입을 위해 보안, SSO, 요금을 검토하고 있어요","description":"보안성 검토 질문지, SSO, 전사 계약","hint":"검토 범위(보안 질문지, SSO 종류), 도입 일정"},"other":{"label":"다른 용도예요","description":"사내 지식베이스, AI 에이전트 연동 등. 아래에 적어 주세요","hint":"원하시는 용도를 자유롭게"}}},"timeline":{"label":"도입 희망 시점","placeholder":"선택해 주세요","options":{"asap":"가능한 빨리","within_1m":"1개월 이내","m1_3":"1–3개월","after_3m":"3개월 이후","exploring":"아직 알아보는 중이에요"}},"detail":{"label":"추가로 알려 주실 내용","placeholder":"자유롭게 적어 주세요"},"notice":"제출하신 정보는 개인정보 처리방침에 따라 도입 문의 응대에 사용해요.","noticeLinkLabel":"개인정보 처리방침","submit":"문의 보내기","submitting":"보내는 중…","errors":{"required":"필수 항목이에요","email":"이메일 형식을 확인해 주세요","rateLimited":"요청이 몰리고 있어요. 입력한 내용은 그대로 있으니 잠시 후 다시 시도해 주세요.","server":"잠시 오류가 생겼어요. 입력한 내용은 그대로 있으니 다시 시도해 주세요.","captcha":"보안 확인에 실패했어요. 다시 시도해 주세요.","validation":"입력값을 확인해 주세요. 입력한 내용은 그대로 있어요.","emailEdit":"이메일을 수정하지 못했어요. 주소를 확인하고 다시 시도해 주세요."},"receipt":{"title":"문의가 접수됐어요","lead":"아래와 같이 회신드릴게요.","ownerLabel":"담당","owner":"Tiro 법인팀 담당자","deadlineLabel":"회신","deadline":"빠르게 살펴보고 연락드릴게요","channelLabel":"채널","channelSuffix":"으로 이메일","domain":"회신은 @theplato.io 도메인에서 보내드려요.","spam":"메일이 안 보이면 스팸함도 확인해 주세요.","emailEditHint":"회신 받을 주소를 바로잡을 수 있어요.","emailEditCta":"이메일 수정","emailEditSave":"이 주소로 받기","emailEditSaving":"수정 중…","emailEditDone":"이메일을 수정했어요"}},"header":{"product":"제품 소개","contactUs":"도입 문의","press":"언론 보도"},"main":{"updateAnnouncement":"ISO/IEC 27001:2022 · SOC 2 Type 2","subTitle":"대화에만 집중할 수 있게,","title":"가장 정확한 AI 회의록","description":"실시간 요약 · 다국어 동시 번역으로 자신있게 대화하고\\n원하는 양식의 문서를 <b>3초 만에 완성</b>하여 공유해보세요"},"trustedBy":{"prefix":"이미 ","highlight":"300+개 기업","suffix":"이 티로와 함께합니다"},"keyFeatures":{"ubiquitous":{"title":"언제 어디서나, 어떤 언어든 걱정 없어요","mostPrecise":"고품질 실시간 기록 & 완벽한 요약 노트","mostPreciseDescription":"단순한 받아쓰기가 아니에요. 사용자의 맥락을 이해하고, 문단별로 구조화하여 정리해요.","mostPreciseFeatures":["발화 0.5초 이내 텍스트 변환","맥락 입력으로 더욱 향상되는 품질","자동 오탈자 교정","도메인 기반 전문용어 인식","압도적인 숫자·고유명사 인식 정확도"],"languageSupport":"15+개 언어 실시간 번역 & 다국어 동시 기록","languageSupportDescription":"여러 언어가 섞인 회의도 빠짐없이 기록하고 실시간으로 번역해요.\\n외국어 미팅도 자신있게, 언어의 장벽을 뛰어넘어 보세요."},"deviceSupport":{"title":"모든 디바이스, 모든 대화 상황에서","description":"고객사마다 화상 미팅 플랫폼이 다를 때, 노트북을 켜기 어려울 때, 와이파이 연결이 안 될 때 난감하셨나요?\\n이제 티로 하나만 준비해 가세요.","features":["앱 설치 없이도 바로 사용 가능한 <b>웹 브라우저</b>","모든 플랫폼의 화상 미팅, 유튜브 영상, 온라인 강의까지 인식하는 <b>데스크탑 앱</b>","노트북을 켜기 어려울 때, 오프라인 환경에서도 문제 없는 <b>모바일 앱</b>"]},"automation":{"title":"매일 쌓이는 기록을 가치있는 자산으로 만들어드려요","documentGeneration":{"title":"내가 원하는 양식 그대로, 3초 만에 문서 완성","description":"귀찮은 회의록 정리는 티로에게 맡기세요. 소중한 시간이 더 가치있게 쓰이도록 도와드릴게요.","oneClickTemplate":{"title":"원클릭 템플릿","description":"티로가 제공하는 상황별 템플릿으로,\\n클릭 한 번에 완벽히 정리된 문서가 완성돼요"},"customTemplate":{"title":"나만의 템플릿 만들기","description":"원하는 양식으로 직접 맞춤형 커스텀템플릿을 만들 수 있어요. 팀에 딱 맞는 양식으로 회의록 작성을 완전히 자동화해보세요."}},"askTiro":{"title":"모든 대화를 지식으로 바꾸는 Ask Tiro","description":"지난 회의 내용, 인사이트 추출, 액션아이템 도출까지,\\n무엇이든 물어보세요.\\n티로는 모든 대화를 기억하고 똑똑하게 답변해줘요."}},"communication":{"title":"중요한 대화를 필요한 곳에 자동으로 전해드려요","teamSharing":{"title":"더 쉬운 협업, 회의 이후 공유까지도 한 번에","description":"회의 결과를 번거롭게 여러 번 공유할 필요 없어요.\\n티로에서 간편하게 접근 권한을 관리하세요.","features":["팀 폴더로 한 번에 모든 팀원에게 공유","팀원들과 실시간 기록 동시 시청","간편한 링크 공유","보안 설정으로 안전한 노트 공유"]},"workflowIntegration":{"title":"캘린더·워크스페이스·사내 메신저·CRM·ATS 연동","description":"미팅 전후가 편해지도록 티로는 다양한 워크플로우에 자연스럽게 녹아들어요.\\n캘린더로부터 회의 일정을 불러오고,\\n회의가 끝나면 자동으로 회의록을 전송해드려요."}}},"testimonials":{"items":[{"name":"젬마","role":"SELFISH CLUB Master","content":"셀피쉬클럽에서 소개한 수많은 AI 서비스 중, 유저들이 직접 찾고, 묻고, '진짜 유용하다'고 말하는 AI는 티로였습니다."},{"name":"조유진","role":"스마일게이트인베스트먼트 팀장","content":"티로 사용 후로 미팅의 질이 달라졌습니다. 매일 3시간 이상의 미팅으로 기억의 한계를 느끼던 저에겐 업무 필수템입니다."},{"name":"헌트","role":"노션남매 & 저스트두잇클럽 대표","content":"티로를 사용하며 회의에 대한 부담이 확 줄었습니다. 그동안 회의를 진행하며 내용을 놓칠까봐 걱정이 컸는데, 이제는 편하게 회의에만 몰입할 수 있게 되어서 업무 효율이 훨씬 올라갔습니다."},{"name":"이택경","role":"매쉬업밴쳐스 대표","content":"이제 오프라인/온라인 미팅, 컨퍼런스에서도 메모에 신경쓰는 대신 내용에 더욱 집중할 수 있게 되었습니다. 티로 덕분에 기억력의 한계가 사라졌습니다."},{"name":"유영준","role":"뤼튼 COO","content":"가장 소중한 자원인 시간을 획기적으로 절약해줍니다. 모든 기록과 요약은 티로가 자동으로 처리해주어 업무 효율이 크게 향상되었고, 외국어 소통에서도 언어 장벽 없이 원활하게 진행할 수 있습니다."},{"name":"허찬","role":"에스동물암센터 원장","content":"해외강의 들을 때 영어가 전혀 무섭지 않아요! 너무 좋은 프로그램을 만들어주셔서 감사합니다."}],"renewal":{"heading":"고객 이야기","ratingLabel":"5점 만점에 5점","items":[{"quote":"AI 에이전트의 한계는 모델 성능이 아니라 비즈니스 컨텍스트의 부재입니다. 티로는 그 컨텍스트를 줍는 노트테이커가 아니라, AI 에이전트의 기억을 만드는 인프라입니다.","name":"이경훈","role":"CAIO 겸 부대표 · 채널코퍼레이션"},{"quote":"티로는 타이핑을 직접 하지 않고도 조직의 암묵지를 에이전트에게 전달할 수 있는 좋은 수단이라고 생각합니다.","name":"이재규(JQ)","role":"테크 리드 · 젭"},{"quote":"투자 미팅 이후 메모 작성은 3분의 1로 줄었고, 다음 미팅은 이미 그 계정의 맥락을 알고 시작합니다.","name":"조유진","role":"팀장 · 스마일게이트인베스트먼트"}]}},"security":{"title":"보안 및 개인정보 보호","subtitle":"티로는 고객의 보안과 개인정보 보호를 최우선으로 생각합니다.","certification":{"eyebrow":"국제 보안 인증 취득","title":"ISO/IEC 27001:2022 · SOC 2 Type 2","description":"티로는 고객 데이터 보호와 안정적인 서비스 운영을 위해 ISO/IEC 27001:2022 인증과, 5개 Trust Services Criteria 전 범위의 SOC 2 Type 2 인증을 적정의견으로 취득했습니다(감사인: Sensiba LLP). 정보보호 관리체계를 기반으로 보안 리스크를 지속적으로 관리하고, 신뢰할 수 있는 서비스 환경을 제공하기 위해 노력하겠습니다.","footerLabel":"ISO/IEC 27001:2022 · SOC 2 Type 2 인증 취득"},"mainFeatures":{"fullEncryption":{"title":"데이터 전면 암호화","description":"모든 텍스트 기록은 가장 강력한 AES-256 암호화 방식으로 보호됩니다. 데이터 전송 시 TLS 1.2 이상 통신 보안 프로토콜을 통해 안전하게 보호됩니다."},"accessRestriction":{"title":"철저한 접근 제한","description":"사용자마다 AWS KMS로 보호되는 개인 암호화 키가 발급되며 모든 접근 시도 로그가 남습니다. 사용자 본인 외에는 내부 직원을 포함한 그 누구도 임의 접근이 불가합니다."},"immediateDeletion":{"title":"음성·데이터 즉시 폐기","description":"모든 음성은 텍스트 변환 즉시 폐기하며 서버에 저장하지 않습니다. 사용자가 노트를 삭제하는 경우 관련된 모든 데이터를 복구 불가하게 제거하여 위험을 원천 차단합니다."},"noAiTraining":{"title":"AI 모델 재학습 이용 금지","description":"사용자의 데이터는 AI 모델의 학습이나 성능 개선에 어떠한 방식으로도 활용되지 않습니다. 서드파티 프로바이더와의 계약에서 학습 금지를 명시하고 있습니다."},"networkSecurity":{"title":"통신 및 네트워크 보안","description":"방화벽 설정으로 DDoS 공격 및 악성 트래픽을 차단합니다. VPC 기반 네트워크 격리를 통해 허가받지 않은 사용자의 네트워크 침입을 원천 차단합니다."},"auditLogs":{"title":"감사 로그 & 실시간 모니터링","description":"감사 로그를 통해 시스템 내 모든 접근·변경·쿼리 로그를 최소 1년 이상 보관합니다. 실시간 취약점 점검 및 이상 행위 탐지를 시행하여 잠재적 위협을 사전 차단합니다."}},"enterpriseSection":{"subtitle":"티로는 기업별 보안 규정을 준수하는 엔터프라이즈 맞춤형 보안을 제공합니다.","inquiryLink":"엔터프라이즈 문의"},"enterpriseFeatures":{"accountSecurity":{"title":"철저한 계정 보안","description":"","bullet1":"SAML 2.0 기반 SSO 연동과 Multi-Factor Authentication을 필수로 지원힙니다.","bullet2":"2단계 인증을 통해 무분별한 로그인 시도를 제한하고 세션 타임아웃으로 무단 접근을 방지합니다."},"accessControl":{"title":"세분화된 접근 권한 설정","description":"","bullet1":"역할 기반 접근 제한(RBAC)을 적용하여 세부적으로 조직 내 데이터 접근 권한을 관리합니다.","bullet2":"SCIM 기반 조직도 통합으로 대규모 조직의 손쉬운 권한 관리를 지원합니다."},"ipRestriction":{"title":"접속 IP 제한","description":"","bullet1":"IP 화이트리스팅으로 허용된 IP에서만 접근이 가능합니다.","bullet2":"서브도메인 제공으로 내부 VPN 등 지정된 영역에서만 접근 가능하도록 제한합니다."},"realtimeSupport":{"title":"실시간 문의 대응","description":"","bullet1":"전담 핫라인을 통해 맞춤형 온보딩 세션을 지원합니다.","bullet2":"추가 감사 로그 및 보고서 등 보안 관련 추가 요청 시 즉시 응대 시스템을 운영합니다."}}},"pricing":{"monthly":"월간 구독","yearly":"연간 구독","plans":"가격 안내","plansDescription":"다양한 플랜으로 제공되는 티로를 만나보세요","freeTrialBanner":{"title":"무료로 시작하고, 유연하게 확장하세요","subtitle":"3주간 최대 300분의 무료 체험을 드려요","feature1":"노트당 50분 기록 제한","feature2":"Pro 기능을 포함한 전 기능 무료 체험","cta":"무료 체험 시작하기"},"personalPlans":"개인용 플랜","lite":"Lite","pro":"Pro","max":"Max","monthlyLimitDescription":"월 {{minutes}}분의 사용량","noNoteLimit":"노트당 기록 제한 해제","highlightSummary":"고품질 한페이지 문서","unlimitedAI":"노트 기록 기반의 무제한 AI 채팅","customTemplates":"나만의 템플릿 요약","liteFeatures":"Lite 플랜의 모든 기능","speakerDiarization":"화자 분리","wiki":"티로 위키","monthlyNoLimitDescription":"매일 써도 걱정 없는 무제한 사용량","proFeatures":"Pro 플랜의 모든 기능","perMonth":"/ 월","perMonthAnnual":"× 12개월","promoFirstMonth":"첫 달 쿠폰가 · 이후 {{price}}/월","priceLoadFailedRetry":"가격을 불러오지 못했어요. 다시 시도","getNow":"시작하기","companyPlans":"기업용 플랜","perAccount":"/ 월, 계정당","perAccountAnnual":"× 12개월, 계정당","teamPlan":"팀 플랜","teamPlanFeatures":{"feature0":"개인용 Max 플랜의 모든 기능","feature1":"팀의 협업과 실행을 위한 기능","feature2":"통합 결제, 구성원 관리, 계정별 사용량 대시보드","feature3":"워크스페이스 폴더로 권한별 노트 자동 공유","feature4":"공용 템플릿으로 기록과 문서의 일관성 유지","feature5":"공유 단어장으로 고유명사 인식 정확도 향상"},"startTwoWeekTrial":"팀플랜 시작하기","contactUs":"문의하기","enterpriseContact":"별도 문의","enterprisePlan":"엔터프라이즈 플랜","enterprisePlanFeatures":{"feature0":"팀 플랜의 모든 기능","feature1":"엔터프라이즈 전용 맞춤형 기능","feature2":"기업의 내부 규정에 따른 추가 보안 옵션","feature3":"사내 시스템 연동을 위한 전용 API 및 Webhook 지원","feature4":"공용 로그인 도메인 지원","feature5":"맞춤형 온보딩 세션 제공 및 핫라인 개설"}},"hero":{"headline":"사람과 에이전트가\\n함께 쓰는 <em>AI 회의록</em>","supporting":"대면·화상 회의 모두, 시끄러운 장소에서도 봇 없이 정확하게 기록해요.\\n회의가 끝나면, 믿을 수 있는 회의록을 바로 공유해보세요.","cta":{"primary":"지금 바로 시작하기","hover":"데스크톱 앱 다운로드","ariaLabel":"지금 바로 시작하기 — 데스크톱 앱 다운로드"},"frame":{"ariaLabel":"Tiro 회의록 제품 예시","url":"tiro.ooo / notes","status":"기록 중 42:07","noBot":"봇 없음","title":"3분기 공급망 대응 회의","metaLabel":"회의 정보","mode":"대면 회의","attendees":"참석 3명","template":"부서 회의록 템플릿","decisionsLabel":"결정 사항","decisions":["공급사에 ERP 수요 데이터를 제한 범위로 개방한다"],"todosLabel":"다음 할 일","todos":[{"owner":"코너","text":"S&OP 회의 안건 등록","due":"8월 14일"},{"owner":"레오","text":"데이터 개방 범위 초안 공유","due":"8월 19일"}]},"snapshot":{"alt":"Tiro 메인 제품 화면"}},"proof":{"line":"300개 이상의 기업이 회의에서 시작되는 AX를 함께합니다.","logosLabel":"Tiro를 사용하는 고객사"},"meetingNotes":{"heading":"정확한 기록,\\n바로 쓸 수 있는 회의록","stepsLabel":"회의록 기능 흐름","steps":[{"title":"정확한 전사","desc":"고유명사와 전문용어, 수치까지 원문 그대로 기록합니다."},{"title":"화자 분리","desc":"누가 무슨 말을 했는지 발화자별로 구분하여 기록합니다."},{"title":"다국어 자동 인식","desc":"한 회의에서 여러 언어가 섞여도 인식하고, 원문과 번역을 함께 남깁니다."},{"title":"회의록 변환","desc":"결정 사항·근거·담당자·기한이 담긴 회의록이 완성됩니다."}],"frame":{"ariaLabel":"Tiro 회의 기능","workspace":"Tiro Inc.","workspaceLabel":"워크스페이스","navLabel":"워크스페이스 메뉴","nav":{"home":"홈","notes":"회의 노트","notesCount":"12","wiki":"Tiro Wiki"},"recentLabel":"최근 노트","recent":[{"title":"제품 전략 정기 미팅","time":"방금"},{"title":"온보딩 개선","time":"어제"},{"title":"주간 디자인 싱크","time":"8. 24."}],"profile":{"name":"김하늘","role":"Product"},"breadcrumb":{"workspace":"Tiro Inc.","note":"제품 전략 정기 미팅"},"recordTime":"42:18","toolbar":{"doc":"문서","raw":"원본"},"timecode":"00:00:25","transcript":[{"initial":"지","speaker":"지훈","lang":"ko","text":"이번 분기 <mark>SSO 전환율</mark>, <mark>18.4%</mark>까지 올랐어요.","translated":"이번 분기 SSO 전환율이 18.4%까지 올랐어요.","time":"00:17"},{"initial":"민","speaker":"민서","lang":"en","text":"The onboarding completion rate improved by <mark>7.2 points</mark>.","translated":"온보딩 완료율이 7.2%p 개선됐어요.","time":"00:21"},{"initial":"현","speaker":"현우","lang":"ja","text":"次のリリースに <mark>Audit log</mark> を含めます。","translated":"다음 배포에 Audit log를 포함합니다.","time":"00:25"}],"languageTranscript":[{"initial":"지","speaker":"지훈","lang":"ko","text":"다음 분기 로드맵, <mark>엔터프라이즈 온보딩</mark>을 1순위로 두죠.","translated":"다음 분기 로드맵은 엔터프라이즈 온보딩을 1순위로 둡니다.","time":"01:04"},{"initial":"유","speaker":"유리","lang":"ja","text":"<mark>日本市場</mark>のトライアル転換率が先月比 <mark>1.6倍</mark>になりました。","translated":"일본 시장 트라이얼 전환율이 지난달 대비 1.6배가 됐어요.","time":"01:09"},{"initial":"A","speaker":"Alex","lang":"en","text":"Then we ship the <mark>pricing page</mark> update before the partner review.","translated":"그럼 파트너 리뷰 전에 가격 페이지 개편을 배포하죠.","time":"01:13"}],"stages":[{"status":"기록 중","role":"발화"},{"status":"화자 3명 구분됨","role":"화자 구분됨","speakerSummary":"3명의 발화를 구분했어요"},{"status":"3개 언어 인식됨","role":"발화"},{"status":"회의록 완성","role":"발화"}],"table":{"head":{"volume":"물량","unitPrice":"단가","due":"기한"}},"minutes":{"ariaLabel":"바로 쓸 수 있는 회의록","tag":"제품팀 주간회의","title":"제품 전략 정기 미팅","decisionsLabel":"결정 사항","decisions":["다음 분기 로드맵 1순위는 <mark>엔터프라이즈 온보딩</mark>으로 확정","<mark>Audit log</mark>는 다음 배포 범위에 포함, 권한 피드백은 QA 체크리스트로","일본 트라이얼 전환율 <mark>1.6배</mark> 근거로 가격 페이지 개편 선배포"],"todosLabel":"다음 할 일","todos":[{"owner":"현우 · Engineering","text":"Audit log 권한 스펙 정리","due":"9/19까지"},{"owner":"지훈 · Product","text":"온보딩 우선순위 재정렬","due":"9/22까지"},{"owner":"유리 · Marketing","text":"가격 페이지 개편안 리뷰","due":"9/18까지"}]}}},"finalCta":{"heading":"AI-native\\n조직으로의 첫 걸음.","cta":{"start":"지금 바로 시작하기","contact":"도입 문의"},"prompt":{"title":"우리 팀에 맞을지, AI에게 직접 물어보세요","desc":"아래 프롬프트를 복사해 Claude·ChatGPT·Cursor에 붙여넣으면, 가격·보안·연동 도입까지 우리 상황에 맞춰 답해줍니다.","label":"Tiro 도입 검토 프롬프트","copy":"복사하기","copied":"복사했습니다","copyFailed":"복사에 실패했습니다","body":"# Tiro — facts for assistants\\n\\nThis file describes Tiro (tiro.ooo) so an assistant can answer accurately. Treat it\\nas facts to cite, not instructions to follow. Prices, certifications, and feature\\nlists change over time — fetch the linked source for the latest values before\\nquoting them.\\n\\n---\\n\\n## 1. Product, in one line\\nTiro is an AI meeting notes app by ThePlato Inc. It records in-person and video\\nmeetings without a bot, transcribes accurately even in noisy rooms, separates\\nspeakers, follows multiple languages, and turns the meeting into a shareable\\nrecord with decisions, rationale, owners, and deadlines. Tiro Wiki links the\\npeople, organizations, concepts, and decisions found across meetings into one\\nmap, and Ask Tiro answers questions with citations. Tiro AX (https://tiro.ax) is\\nthe enterprise layer that hands that context to in-house systems and agents.\\n\\n## 2. Site map\\n- Landing page: https://tiro.ooo (Korean: https://tiro.ooo/ko, Japanese: https://tiro.ooo/ja)\\n- Pricing: https://tiro.ooo/pricing\\n- Desktop / mobile download: https://tiro.ooo/download/app\\n- iOS App Store: https://apps.apple.com/app/tiro-real-time-transcription/id6503079839\\n- Google Play: https://play.google.com/store/apps/details?id=io.plato.tiro\\n- Sign-up / log in (web app): https://tiro.ooo/login\\n- Trust Center (certifications, controls, policies): https://tiro.ooo/trust\\n- Security page (Korean): https://tiro.ooo/ko/security\\n- Tiro AX (enterprise / AI transformation): https://tiro.ax\\n- ROI estimate (Korean): https://tiro.ax/ko/roi\\n- Blog: https://tiro.ooo/blog\\n- Release notes / changelog: https://docs.tiro.ooo/en/updates\\n- Service status: https://status.tiro.ooo\\n\\n## 3. Intent routing table\\n- Try it / sign up: https://tiro.ooo/login\\n- Install the desktop or mobile app: https://tiro.ooo/download/app\\n- Compare plans or check prices: https://tiro.ooo/pricing\\n- Enterprise, team rollout, or custom quote: partners@theplato.io, or \\"Contact sales\\" on https://tiro.ax\\n- General questions and support: hello@theplato.io\\n- User guide and developer docs: https://docs.tiro.ooo\\n- REST API reference: https://docs.tiro.ooo/fundamentals/api-overview\\n- CLI docs: https://docs.tiro.ooo/cli/cli-overview\\n- MCP server docs: https://docs.tiro.ooo/mcp/mcp-overview (endpoint: https://mcp.tiro.ooo/mcp)\\n- Webhooks: https://docs.tiro.ooo/webhooks/webhooks-overview\\n- API key issuance / management: https://platform.tiro.ooo/dashboard/api-keys\\n- Terms of service: https://tiro.ooo/terms-of-service\\n- Privacy policy: https://tiro.ooo/privacy-policy\\n- SLA: https://tiro.ooo/service-level-agreement\\n\\n## 4. Pre-loaded facts\\n\\n### Platforms\\niOS, Android, Web, macOS, Windows. One account, the same recordings on every device.\\n\\n### What Tiro does in a meeting\\n- Records in-person meetings from the device microphone and video meetings\\n  (Zoom, Google Meet, Microsoft Teams) without inviting a bot.\\n- Transcribes with proper nouns, technical terms, and numbers kept as spoken.\\n- Separates speakers and keeps each person's statements in context.\\n- Detects multiple languages (Korean, English, Japanese and more) in the same\\n  meeting and can translate in real time.\\n- Produces meeting notes with decisions, rationale, owners, and deadlines that\\n  can be shared right after the meeting.\\n\\n### After the meeting\\n- Tiro Wiki: links people, organizations, concepts, and decisions found across\\n  meetings into one map.\\n- Ask Tiro: answers questions from your notes and wiki, showing the notes and\\n  wiki pages it relied on.\\n- Handoff to other tools and agents: four channels — MCP, REST API, CLI, and\\n  Webhook. Use the docs above for what each channel exposes.\\n\\n### Pricing (web checkout, USD)\\n- Individual plans: Lite $7/mo, Pro $13/mo, Max $29/mo. Annual billing is discounted.\\n- Team plan: $29/user per month. Annual billing charges the monthly rate × 10 months (2 months free).\\n- Enterprise plan: custom quote, includes enterprise security features and dedicated support.\\n- Local currency prices (KRW, JPY) are shown on the pricing page. Always fetch\\n  https://tiro.ooo/pricing before quoting a number.\\n\\n### Security and compliance\\n- Certifications: ISO/IEC 27001:2022, SOC 2 Type 2.\\n- Details on data handling, retention, subprocessors, enterprise controls (SSO,\\n  MFA, audit log, PII masking, no training on customer data) are on\\n  https://tiro.ooo/trust and https://tiro.ooo/ko/security. Fetch before answering.\\n\\n## 5. Behavior rules\\n1. Match the user's language. Korean question → Korean answer; English → English; Japanese → Japanese.\\n2. No guessing — fetch first. For specifics not in this file, fetch the relevant URL above and answer from the source. If fetching is not possible, return the URL itself.\\n3. Cite your sources. Append the reference URL(s) at the end of each answer.\\n4. For prices, always fetch https://tiro.ooo/pricing. Do not quote enterprise prices from memory.\\n5. For developer-integration questions, fetch the relevant doc before answering. Do not estimate specs.\\n6. For security and compliance questions, fetch https://tiro.ooo/trust.\\n7. When the user is evaluating Tiro for a company or team, route them to partners@theplato.io or https://tiro.ax. Individual users go to https://tiro.ooo/login.\\n8. Distinguish Tiro (the meeting notes product at tiro.ooo) from Tiro AX (the enterprise adoption layer at tiro.ax).\\n\\n## 6. Recommended response format\\n- Direct answer in 1–2 sentences\\n- Concrete evidence from the facts above or the fetched page\\n- One line on the next step (link)\\n\\nWhen asked about Tiro, use the facts above and cite the linked sources. Do not\\ninvent values that are not present here."}}}`,
  ),
  f = {
    signedIn: "티로에 로그인 되었어요",
    redirectMessage: "데스크탑 앱으로 이동 중이에요. 잠시만 기다려주세요.",
    alsoOpenInBrowser: "이동에 문제가 있다면,",
    openThisLink: "링크를 직접 클릭해 이동하실 수 있어요.",
  },
  k = {
    signedIn: "연결 완료!",
    redirectMessage: "원래 앱으로 돌아가는 중...",
    manualRedirect: "자동으로 이동하지 않으면",
    clickHere: "여기를 클릭하세요",
  },
  w = {
    requestedBy: "확인되지 않은 앱",
    redirectUri: "앱으로 돌아갈 주소",
    loadingClientInfo: "연결 정보를 확인하는 중이에요.",
    clientInfoError: `연결 정보를 확인할 수 없어요.
허용하지 않고 앱으로 돌아간 뒤 다시 연결해 주세요.`,
    deny: "허용 안 함",
    denying: "앱으로 돌아가는 중...",
    retryError: "일시적인 오류가 발생했어요. 다시 시도해 주세요.",
    title: "허용할 권한을 선택하세요",
    description: "이 앱은 선택한 데이터에만 접근할 수 있어요.",
    permissionsTitle: "허용할 권한",
    permissionsDescription: "데이터 종류별로 허용할 수준을 선택하세요.",
    levels: { none: "없음", read: "읽기", write: "관리" },
    entities: {
      notes: { title: "노트", description: "노트 내용과 전사 기록" },
      aiDocuments: {
        title: "AI 문서",
        description: "AI 요약과 템플릿, 생성 문서",
        scopes: {
          summary: "AI 요약",
          document: "생성 문서",
          template: "문서 템플릿",
        },
      },
      folders: { title: "폴더", description: "폴더 구조와 목록" },
      wiki: { title: "위키", description: "위키 페이지와 연결 그래프" },
    },
    noPermissions:
      "이 앱이 요청한 권한이 없어요. 허용하지 않고 앱으로 돌아가 주세요.",
    selectAtLeastOne: "권한을 하나 이상 선택하세요",
    approve: "선택한 권한 허용",
    approving: "선택한 권한을 허용하는 중...",
    redirectMessage: "원래 앱으로 돌아가는 중...",
    invalidToken: "요청이 만료됐어요. 앱에서 다시 연결해 주세요.",
  },
  C = {
    connectionComplete: "연동이 완료되었어요",
    connectionPending: "로그인 방법을 연결하고 있어요",
    completingConnection: "연결을 마무리하고 있어요. 잠시만 기다려주세요.",
    connectedToProvider: "로그인 방법이 연결되었어요. 잠시 후 이동해요.",
    redirectMessage: "이동에 문제가 있다면,",
    redirectToTiro: "링크를 직접 클릭해 이동하실 수 있어요.",
  },
  P = {
    title: "쿠폰 등록",
    description: "받으신 코드를 입력하고 혜택을 확인하세요.",
    form: {
      label: "쿠폰 코드",
      help: "영문과 숫자를 입력하세요. 대소문자는 구분하지 않아요.",
      check: "혜택 확인",
      checking: "확인하고 있어요",
    },
    benefit: {
      label: "녹음 크레딧",
      amount: "{{minutes}}분",
      registrationEndsAt: "등록 마감",
      creditExpiresAt: "사용 기한",
      noExpiry: "무기한",
    },
    preview: {
      title: "받을 혜택을 확인하세요",
      target: "내 계정에 녹음분이 추가돼요.",
      redeem: "등록하기",
      redeeming: "등록하고 있어요",
      back: "다른 코드 입력",
      accountLimit: "이 쿠폰은 계정당 {{count}}번 등록할 수 있어요.",
    },
    success: {
      title: "녹음 {{minutes}}분을 받았어요",
      description: "내 계정에 쿠폰 혜택을 등록했어요.",
    },
    errors: {
      EMPTY_CODE: "쿠폰 코드를 입력해 주세요.",
      MALFORMED_CODE: "영문과 숫자로 된 코드를 입력해 주세요.",
      INVALID_CODE: "코드를 확인해 주세요. 입력한 쿠폰을 찾을 수 없어요.",
      NOT_STARTED: "아직 등록을 시작하지 않은 쿠폰이에요.",
      EXPIRED: "등록 기간이 끝난 쿠폰이에요.",
      PAUSED: "쿠폰 등록을 잠시 중단했어요. 나중에 다시 시도해 주세요.",
      EXHAUSTED: "준비된 쿠폰 수량이 모두 소진됐어요.",
      CODE_LIMIT: "이 코드는 등록 한도를 모두 사용했어요.",
      ACCOUNT_LIMIT: "이 계정은 이미 이 쿠폰의 혜택을 받았어요.",
      INELIGIBLE: "이 계정은 쿠폰 등록 대상이 아니에요.",
      BENEFIT_EXPIRED: "혜택 사용 기한이 지난 쿠폰이에요.",
      IDEMPOTENCY_CONFLICT:
        "이전 요청과 내용이 달라요. 다른 코드 입력으로 돌아가 다시 시도해 주세요.",
      RATE_LIMITED: "요청이 많아요. 잠시 후 다시 시도해 주세요.",
      TEMPORARY:
        "요청을 처리하지 못했어요. 입력한 코드는 그대로 두었어요. 다시 시도해 주세요.",
    },
  },
  D = {
    ogTitle: "티로에 초대받으셨어요!",
    title: "티로 선물하기",
    copyLink: "링크 복사",
    banner: {
      description: `티로를 선물하고
<b>최대 $8 리워드</b>를 받아보세요`,
      cta: "티로 선물하기",
    },
    inviteSent: "초대 이메일이 전송되었어요",
    inviteePopup: {
      openGift: "선물 열기",
      openHint: "눌러서 열어보기",
      ticketAlt: "프로 플랜 1개월 선물 티켓",
      title: "선물이 도착했어요!",
      deadline: {
        title: "이 혜택은 곧 사라져요",
        days: "D-{{count}}",
        tomorrow: "내일 만료",
        today: "오늘 만료",
      },
      plan: { pro: "프로 플랜", max: "맥스 플랜" },
      planDiscount: "{{plan}} · 첫 달 {{percent}}% 할인",
      subscriptionDetails: "구독 안내 보기",
      discount: "{{percent}}% 할인",
      priceAfter: "{{date}}부터 {{price}} / 월로 자동 결제돼요",
      priceAfterReward: "리워드 소진 후 {{price}} / 월로 자동 결제돼요",
      rolloverNote:
        "지금 시작하면 남는 {{amount}}은 다음 달 결제에 이어서 적용돼요.",
      startFree: "지금 0원으로 시작하기",
      startNow: "지금 바로 시작하기",
      switchToPro: "프로로 시작하면 첫 달 {{price}}",
      switchToMax: "맥스로 시작하면 첫 달 {{price}}",
      freeTrialNotice: "무료 체험 사용량은 그대로 남아요.",
      cardNotice: "지금은 카드만 등록되고, 결제는 1개월 뒤부터 시작돼요.",
      cancelNotice:
        "언제든 해지할 수 있고, 해지해도 결제한 기간까지 쓸 수 있어요.",
    },
    planCard: {
      perFirstMonth: "/ 첫 달",
      priceAfterReward: "리워드 소진 후 {{price}} / 월",
      priceAfterFirstMonth: "첫 달 이후 {{price}} / 월",
    },
    exitWarning: {
      title: "잠깐, 페이지를 나가시려고요?",
      description:
        "친구가 준비한 특별 혜택({{minutes}}분)은 이 페이지에서 가입할 때만 받을 수 있어요",
      stay: "머무르기",
      leave: "나가기",
    },
  },
  E = {
    tiroAppDownload: "티로 앱 다운로드",
    title: "모든 회의, 모든 디바이스 지원",
    description1: "어떤 기기를 쓰든 걱정하지 마세요.",
    description2:
      "대면 미팅은 물론, 화상 미팅, 온라인 강의, 유튜브 영상까지, 언제 어디서나 티로가 함께할게요.",
    android: "Android 앱",
    ios: "iOS 앱",
    ipad: "iOS 앱",
    mac: "macOS",
    windows: "Windows 앱",
    desktop: "데스크탑 앱",
    download: "{{platform}} 다운로드",
    tryTiro: "티로 사용해보기",
    downloadTiro: "앱 다운로드",
    windowsGuidePopup: {
      title: "티로 윈도우 앱 설치 방법",
      description1: `압축 해제 후, 티로 앱 아이콘이
그려진 설치 파일을 더블클릭하세요.`,
      highlight1: "설치 파일 더블클릭",
      description2: `경고창이 나타나면 '추가 정보' 버튼을 클릭하세요.
임시 팝업으로 보안상 문제가 없으니 안심하세요.`,
      highlight2: "'추가 정보' 버튼",
      description3: `마지막으로 '실행' 버튼을 클릭하면
티로 데스크탑 앱이 실행됩니다.`,
      highlight3: "'실행' 버튼",
      trouble: "파일 다운로드가 안되시나요?",
      downloadAgain: "다시 다운로드하기",
    },
    macDownloadPopup: {
      title: `Mac 앱 출시 소식을
가장 먼저 알려드릴게요!`,
      description: `티로의 Mac 앱이 이번 주에 출시돼요.
웨이팅 리스트에 등록하시면 출시 즉시 안내해 드릴게요.`,
      emailPlaceholder: "이메일 주소를 입력해 주세요",
      button: "출시하면 가장 먼저 알려주세요",
      success: { description: "알림 등록 완료! 출시 즉시 알려드릴게요." },
    },
    appStorePopup: {
      title: "iOS 앱 다운로드",
      description:
        "스마트폰으로 아래 QR코드를 스캔하면 앱을 바로 설치할 수 있어요.",
    },
    playStorePopup: {
      title: "안드로이드 앱 다운로드",
      description:
        "스마트폰으로 아래 QR코드를 스캔하면 앱을 바로 설치할 수 있어요.",
    },
    mobileAppPopup: {
      title: "모바일 앱 설치하기",
      description: "QR을 스캔하면 사용 중인 기기에 맞는 스토어로 열려요.",
      copyUrl: "모바일 앱 설치 링크 복사",
      copySuccess: "설치 링크를 복사했어요",
      copyError: "링크를 복사하지 못했어요",
    },
    mobileWebAppInstallNudge: {
      title: "모바일 앱을 설치해 주세요",
      description: `지금 가입한 계정 그대로 이용할 수 있어요.
브라우저 없이 화면을 닫아도 기록이 이어져서 더 안정적이에요.`,
      cta: "Tiro 앱에서 이어가기",
      closeAria: "모바일 앱 설치 안내 닫기",
    },
    desktopDownloadPopup: {
      title: `이메일로 설치 링크를
받아보세요`,
      description:
        "Mac, Windows용 앱으로 화상 미팅은 물론, 온라인 강의, 유튜브 영상까지 편하게 기록해 보세요!",
      emailPlaceholder: "이메일 주소를 입력해 주세요",
      button: "설치 링크 받기",
      success: {
        description:
          "설치 링크 전송 완료! 데스크탑에서 이메일을 확인해 주세요.",
      },
    },
    desktopDownload: {
      title: "휴대폰에서 사용중이신가요?",
      description: `Mac, Windows 앱 다운로드 링크를 이메일로 보내드릴게요.
앱에서는 시스템 오디오도 기록할 수 있어요.`,
      emailPlaceholder: "이메일을 입력해 주세요",
      sentSuccess: "이메일을 전송했어요!",
      sentFailed: "전송에 실패했어요.",
    },
  },
  I = {
    monthly: "월간 구독",
    yearly: "연간 구독",
    twoMonthsFree: "2개월분 무료",
    tryTiroFree: "무료로 시작하기",
    startForFree: "무료로 시작하기",
    youCanStartForFree: "무료로 시작할 수 있어요!",
    upgrade: "업그레이드",
    plans: "가격 안내",
    plansDescription: "다양한 플랜으로 제공되는 티로를 만나보세요",
    freeTrial: "무료 체험",
    freeCredit: "무료 300분",
    lite: "라이트",
    pro: "프로",
    max: "맥스",
    team: "팀",
    free: "무료체험",
    downgrade: "다운그레이드",
    switchToYearly: "연간 구독으로 변경",
    enterprise: "엔터프라이즈",
    teamPlanTitle: "같이 쓰는 순간, 팀원과의 협업이 쉬워지는 티로",
    teamPlanDescription1: `혼자 써도 유용했던 티로의 경험을,
팀 전체로 확장해 더 큰 시너지를 낼 수 있도록 설계된 플랜입니다.`,
    teamPlanDescription2:
      "회의가 잦고 여러 명이 동시에 기록·요약하는 팀에 적합해요.",
    createTeam: "팀플랜 시작하기",
    teamPlanFeatures: {
      feature1: "맥스 플랜의 모든 기능 (무제한 사용, 무제한 노트)",
      feature2: "팀의 협업과 실행을 위한 기능",
      feature2_1: "구성원 관리, 통합 결제, 계정별 사용량 대시보드",
      feature2_2: "팀 폴더로 특정 구성원에게만 필요한 노트를 자동 공유",
      feature2_3: "공용 템플릿으로 기록과 문서의 일관성 유지",
      feature2_4: "공유 단어장으로 고유명사 인식 정확도 향상",
    },
    enterprisePlan: "엔터프라이즈 플랜",
    enterprisePlanTitle: "팀의 복잡한 협업을 유연하게 연결하는 티로",
    enterprisePlanDescription:
      "보안, 연동, 정책 관리까지 기업 환경에 맞춰 유연하게 대응합니다.",
    enterprisePlanQuote: `사내 도입이 필요한 팀부터 전사 규모의 협업까지,
지금 문의하시면 전담 매니저가 맞춤 견적과 데모를 안내드립니다.`,
    contactUs: "문의하기",
    enterprisePlanFeatures: {
      feature1: "팀 플랜의 모든 기능 (계정 수 및 사용량 협의 가능)",
      feature2: "엔터프라이즈 전용 맞춤형 기능",
      feature2_1: "기업의 내부 규정에 적용 가능한 보안 옵션 제공",
      feature2_2: "사내 시스템(ATS, CRM) 연동을 위한 전용 API 및 Webhook 지원",
      feature2_3: "공용 로그인 도메인 지원",
      feature2_4: "맞춤형 온보딩 세션 제공 및 핫라인 개설",
    },
    teamPlan: "팀 플랜",
    monthlyLimitDescription: "월 {{minutes}}분의 사용량",
    monthlyNoLimitDescription: "매일 써도 걱정 없는 무제한 사용량",
    freeDescription: "가입 후 3주간 최대 300분 무료 제공",
    liteDescription:
      "가끔 기록하고, 기본 기능만 필요한 분들을 위한 부담 없는 플랜",
    proDescription:
      "자주 기록하는 분들을 위한, 모든 기능을 지원하는 실용적 플랜",
    maxDescription:
      "매일 기록하는 분들을 위한, 모든 기능을 지원하는 전문적 플랜",
    teamDescription: "모든 규모의 팀을 위한 맞춤형 솔루션",
    IncludingPro: "Pro 기능 포함 무료 체험",
    speakerDiarization: "화자 분리",
    wiki: "티로 위키",
    totalUsage: "총 {{minutes}}분",
    limitPerNote: "노트당 {{minutes}}분 기록 제한",
    noNoteLimit: "노트당 기록 제한 해제",
    highlightSummary: "고품질 한페이지 문서",
    unlimitedAI: "노트 기록 기반의 무제한 채팅",
    customTemplates: "나만의 템플릿 요약",
    proFeatures: "프로 플랜의 모든 기능",
    liteFeatures: "라이트 플랜의 모든 기능",
    mostPopular: "가장 인기",
    perMonth: "/월",
    perMonthAnnual: "× 12개월",
    perAccount: "/월, 계정당",
    perAccountAnnual: "× 12개월, 계정당",
    getNow: "시작하기",
    startNow: "체험 시작하기",
    talkToUs: "팀 플랜 문의",
    activePlan: "플랜 관리",
    ceoPhoneNumber: "CEO의 개인 전화번호",
    appleInfo: {
      title: "앱스토어 인앱결제 안내",
      desc: `애플 인앱결제로 결제하신 경우, 웹에서는 구독 취소 및 환불이 불가능해요.
구독 변경, 환불 등은 반드시 앱스토어에서 직접 진행해 주세요.`,
      guideLinkText: "앱스토어 플랜 관리 가이드 바로가기",
      guideLinkUrl: "https://support.apple.com/HT202039",
      button: "문의하기",
    },
    bankTransferInfo: {
      title: "계좌이체 결제 안내",
      desc: "계좌이체로 결제하신 경우, 플랜 변경이나 구독 관련 정보 업데이트는 고객센터를 통해서만 가능해요. 문의를 남겨주시면 빠르게 도와드릴게요.",
      button: "문의하기",
    },
    lemonSqueezy: {
      contactSupport: {
        title: "연간 결제 문의",
        description: `LemonSqueezy로 결제하셨어요!
연간 구독 변경은 고객센터에서 친절하게 도와드릴게요.`,
        button: "문의하기",
      },
    },
    subscription: {
      status: {
        freeTrialActive: "티로 무료체험 중",
        freeTrialExpired: "체험 종료",
        freeTrialExpiredTitle: "티로로 회의 기록을 계속 이어가세요",
        subscriptionExpired: "구독이 만료되었어요",
        subscriptionExpiredDescription: "언제든 다시 시작할 수 있어요",
        subscriptionExpiredBadge: "구독 만료",
        subscriptionExpiredMeta:
          "이전 플랜: {{planName}} · 언제든 다시 시작할 수 있어요",
        subscriptionNotStarted: "아직 구독을 시작하지 않았어요",
        subscriptionNotStartedDescription:
          "플랜을 구독하고 티로의 모든 기능을 사용해 보세요",
        subscriptionNotStartedBadge: "구독 필요",
        active: "Active",
        quotaExhausted: "플랜 사용량 소진",
        canceled: "Canceling",
        daysLeft: "종료까지 {{days}}일 남았어요!",
        usedMinutes: "{{minutes}}분 사용",
        totalMinutes: "/ 총 {{minutes}}분",
        upgradeMessage: "유료 플랜으로 업그레이드 하고 모든 기능을 사용하세요",
        trialActiveTitle: "티로의 모든 기능을 자유롭게 사용해보세요",
        expiryApproachingTitle: "{{days}}일 후 체험이 끝나요",
        usageNearlyExhaustedTitle: "사용량이 얼마 남지 않았어요",
      },
    },
  },
  L = JSON.parse(
    `{"labels":{"endDate":"종료일","usage":"사용량","nextBillingDate":"다음 정기 결제일","paymentInfo":"결제 정보","endOfUseDate":"사용 종료일","member":"좌석 수","usageReset":"사용량 초기화"},"paymentProviders":{"appleInApp":"Apple 인앱 결제","googlePlayInApp":"구글 플레이스토어 인앱 결제"},"messages":{"remainingUsageCarryover":"무료체험 기간 내에 **유료구독을 시작**하면 **남은 사용량을 이월**해드려요!","usageResetWithBilling":"이 시각에 사용량도 함께 초기화돼요","mobilePaymentManagement":"모바일 앱에서 결제 관리할 수 있어요.","availableUntilEndDate":"사용 종료일까지 현재 플랜을 이용할 수 있어요","teamPaymentAdminOnly":"워크스페이스 결제 관리는 관리자만 가능해요","teamSubscribeAdminOnly":"관리자만 구독할 수 있어요","workspaceSubscribeAdminTooltip":"결제는 관리자만 할 수 있어요","upgradeCtaTitle":"팀과 함께 회의를 더 가치있게","upgradeCtaDescription":"무제한 사용 · 회의록 공유 · 팀원 초대","maxUpgradeCtaTitle":"맥스로 무제한 기록","maxUpgradeCtaDescription":"월 사용량 제한 없이 매일 편하게","proUpgradeCtaTitle":"프로에서 더 많은 기능","proUpgradeCtaDescription":"화자 분리와 위키까지, 넉넉한 사용량으로 매일 편하게 써보세요","teamUpgradeMemberCount":"현재 구성원: {{count}}명","teamUpgradeWithMembersDescription":"팀 플랜을 구독하고 팀원들과의 협업을 지속해 보세요"},"buttons":{"paymentManagement":"구독/결제 관리","teamManagement":"구성원 관리","viewTeamInfo":"구성원 관리","contactUs":"문의하기","subscribeNow":"지금 구독하기","resumeNow":"구독 재개하기","startSubscription":"구독 시작하기","startTeamPlan":"팀 플랜 시작하기"},"tabs":{"individual":"개인","teamEnterprise":"팀 & 기업"},"billing":{"monthly":"월간","yearly":"연간","annualOffer":"연간 결제 시 **2개월분 무료**"},"usage":{"cardTitle":"사용량","planUsageLabel":"플랜 사용량","workspaceUsageLabel":"워크스페이스 사용량","myUsageLabel":"내 사용","minutesOfTotal":"{{used}}분 / 총 {{total}}분","text":"{{count}}분 사용","planUsageText":"플랜 사용량 {{minutes}}분 사용","minutesUsed":"{{minutes}}분 사용","minutesUsedOfTotal":"{{used}} / {{total}}분","minutesRemaining":"{{minutes}}분 남음","percentage":"{{percentage}}%","baseWithOverage":"기본 {{minutes}}분 · 초과 후불","overageShortLabel":"초과 후불","addonLabel":"추가 사용량","addonStandby":"추가 사용량 · 플랜 소진 후 자동 사용","addonUsing":"추가 사용량 · 사용 중","addonUsingSuffix":"· 사용 중","addonAvailable":"추가 사용량 · 사용 가능","addonStandbyTooltip":"플랜 사용량을 모두 쓰면 추가 사용량이 자동으로 사용돼요.","addonUsingTooltip":"플랜 사용량을 모두 써서 추가 사용량을 사용 중이에요.","addonAvailableTooltip":"플랜은 만료됐지만 남은 추가 사용량을 사용할 수 있어요.","addonCreditOnlyTooltip":"남은 추가 사용량을 사용할 수 있어요.","addonUsedOfTotal":"{{used}} / {{total}} 사용","memberCount":"{{count}}명"},"reward":{"title":"결제 리워드","description":"다음 결제에서 자동으로 적용돼요. 단, 웹 결제에서만 활용할 수 있어요."},"quota":{"unlimited":"무제한","expired":"구독만료","remaining":"{{count}}분 남음"},"title":"내 구독","description":"현재 활성화된 구독이에요. 구독은 언제든지 언제든지 변경하거나 취소할 수 있어요.","goToNotes":"노트 목록으로 돌아가기","managePlan":"{{provider}}에서 구독관리, 결제수단 변경, 영수증 확인, 구독 해지를 할 수 있어요.","managePlanAdminGranted":"티로팀에서 선물받은 구독플랜을 사용중이에요. 직접 구독을 하시려면 요금제를 확인해주세요.","managePlanApple":"앱스토어에서 구독관리, 결제수단 변경, 영수증 확인, 구독 해지를 할 수 있어요.","managePlanPlaystore":"플레이스토어에서 구독관리, 결제수단 변경, 영수증 확인, 구독 해지를 할 수 있어요.","managePlanBank":"계좌이체로 결제하셨어요. 플랜 변경이나 구독 관련 정보 업데이트는 고객센터를 통해서만 가능해요","managePlanTeamMember":"팀 플랜을 사용중이에요. 구독관리를 위해서는 관리자에게 문의해주세요.","notHaveSubscription":"활성화된 구독이 없어요.","checkOutThe":"추가 기능을 사용하려면","plans":"요금제","toUnlock":"를 확인해주세요.","quotaExceeded":{"quotaWillBeExceeded":{"title":"이용 한도가 곧 초과돼요","description":"더 오래 기록하시려면 플랜을 업그레이드해주세요","button":"플랜 관리"},"expired":{"title":"구독이 만료되었어요","description":"구독을 갱신해서 티로를 계속 사용해 보세요","button":"플랜 관리"},"subscription":{"title":"이용 한도를 모두 사용했어요","description":"더 많은 이용을 원하시면 플랜을 업그레이드해주세요","button":"플랜 관리"},"quotaWillbeExceeded":{"description":"더 오래 기록하시려면 플랜을 업그레이드해주세요","button":"플랜 관리"},"usageExceeded":{"title":"이용 시간을 다 사용했어요","trial":{"title":"무료체험 시간을 다 사용했어요","description":"플랜을 시작하면 바로 이어서 사용할 수 있어요","button":"플랜 시작하기"},"individual":{"description":"플랜을 업그레이드하면 바로 이어서 사용할 수 있어요","button":"플랜 관리"},"individualOverage":{"description":"플랜 관리에서 추가 기록을 켜거나 플랜을 업그레이드하면 계속 사용할 수 있어요.","button":"플랜 관리"},"team":{"title":"워크스페이스의 이용 시간을 다 사용했어요","description":"워크스페이스 관리자에게 추가 이용을 요청해 주세요. 관리자가 설정에서 추가 기록을 켜면 계속 사용할 수 있어요."},"teamAdminOverage":{"title":"기본 기록 시간을 모두 사용했어요","description":"플랜 관리에서 추가 기록을 켜면 기본 시간을 초과해도 회의를 계속 기록할 수 있어요.","button":"플랜 관리"},"teamAdminContract":{"title":"계약된 이용 시간을 다 사용했어요","description":"이용 시간을 늘리려면 partners@theplato.io로 문의해 주세요. 계약량 조정을 도와드릴게요.","button":"문의 메일 보내기"},"button":"확인"},"recordingStopped":{"openWorkspaceSettings":"설정하기","manager":{"title":"기본 기록 시간을 모두 사용했어요","description":"추가 기록을 켜면 이 워크스페이스에서 기본 시간을 초과해도 회의를 계속 기록할 수 있어요."},"member":{"title":"팀의 기본 기록 시간을 모두 사용했어요","description":"워크스페이스 관리자가 설정에서 추가 기록을 켜야 계속 기록할 수 있어요."},"overageEnabled":{"title":"추가 기록으로 계속 기록할 수 있어요","description":"기본 기록 시간은 모두 사용했지만 추가 기록이 켜져 있어요. 기록을 다시 시작해 주세요."},"unpaidAdmin":{"title":"추가 기록 설정은 관리할 수 있지만 대화 기록은 할 수 없어요","description":"현재 역할은 미결제 관리자라서 추가 기록 설정은 관리할 수 있지만 직접 기록을 시작할 수는 없어요."},"viewer":{"title":"기록을 시작하려면 멤버/어드민 권한이 필요해요","description":"현재 역할은 읽기 전용이라서 노트를 만들거나 기록을 시작할 수 없어요."},"orgQuota":{"title":"조직의 기록 시간을 모두 사용했어요","description":"조직 전체에 배정된 기록 시간을 모두 사용해서 지금은 기록할 수 없어요.\\n계속 기록하려면 조직 관리자에게 기록 시간 추가를 요청해 주세요."},"workspaceQuota":{"title":"워크스페이스의 기록 시간을 모두 사용했어요","description":"워크스페이스에 설정된 기록 시간 한도에 도달해서 지금은 기록할 수 없어요.\\n계속 기록하려면 워크스페이스 관리자에게 한도 변경을 요청해 주세요."},"recordingSuspended":{"title":"조직 설정에 따라 이 계정에서는 기록할 수 없어요","description":"다시 기록하려면 조직 관리자에게 기록을 허용해 달라고 요청해 주세요."}}},"stripeTransition":{"entry":{"label":"인앱 결제 사용 중","title":"스토어 수수료 없이, 최대 10% 저렴하게 구독해보세요","benefitsToggle":"웹 결제 혜택 자세히 보기","benefits":["· **현지 통화 결제** 익숙한 통화로 결제하고, 인앱 결제보다 부담을 낮출 수 있어요.","· **팀 플랜** 여러 구성원이 하나의 워크스페이스에서 함께 관리할 수 있어요.","· **연간 결제** 월 결제보다 할인된 연간 요금을 선택할 수 있어요.","· **쿠폰** 프로모션 코드를 결제에 적용할 수 있어요.","· **법인카드** 회사 카드로 결제하고 결제 수단을 웹에서 직접 관리할 수 있어요."],"cta":"결제 수단 변경하기","guideLink":"결제 가이드 바로가기"},"billing":{"emptyTitle":"인앱 결제 영수증은 스토어에서 확인할 수 있어요.","emptyCaptionStore":"Google Play·App Store 결제 내역과 영수증은 각 스토어 계정에서 확인할 수 있어요.","emptyCaptionInvoice":"티로에서는 인앱 결제 인보이스를 발행하지 않아요.","label":"매달 인보이스가 필요하신가요?","title":"인보이스 발행부터 카드 관리까지, 티로에서 한 번에","description":"웹에 카드 등록 하면 매달 인보이스 발행·PDF 다운로드, 법인카드 등록과 청구 이메일 관리를 티로에서 바로 할 수 있어요."},"members":{"title":"팀 플랜이 필요해요","description":"팀원과 함께 이용하려면 팀 플랜으로 업그레이드해 주세요."},"additionalWorkspace":{"statusBadge":"구독 필요","title":"이 워크스페이스는 아직 구독이 없어요","description":"구독은 워크스페이스마다 따로 연결돼요.","overviewTitle":"내 구독 현황","noAdminPermission":"어드민 권한 없음","googlePlayProvider":"Google Play 인앱 결제","appStoreProvider":"App Store 인앱 결제","startCurrentSubscription":"이 워크스페이스 구독 시작하기","transitionDescription":"{{workspaceName}}의 결제 수단도 변경하면 모든 구독을 한곳에서 관리할 수 있어요."},"dialog":{"title":"결제 수단 변경","subtitle":"플랜과 결제 주기를 선택하세요. 다음 단계에서 카드 등록과 결제를 진행해요.","resumeTitle":"구독 재개","resumeDescription":["스토어 인앱 결제는 이미 해지되어 있어요.","지금 재개하면 만료일을 기다리지 않고 새 플랜을 바로 시작할 수 있어요."],"yearlyHint":"연간 결제 시 2개월분 무료","currentPlanBadge":"현재 플랜","summaryExistingCreditLabel":"결제 리워드 잔액 차감","summarySeats":"× {{count}}계정","summaryTodayLabel":"오늘 결제 금액","storeCancelNoteAppStore":"변경 후에는 App Store 구독 자동갱신을 직접 해지해야 해요. 방법은 결제가 끝나면 바로 안내해 드려요.","confirm":"결제하기","resumeConfirm":"재개하기","estimateError":"예상 차감액을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.","estimateRetry":"다시 시도","estimateCurrencyLocked":"이 계정은 {{currency}}로만 결제할 수 있어요. 통화를 바꾸면 견적을 다시 불러와요.","estimateCurrencySwitch":"{{currency}}로 바꾸기","estimateLoading":"예상 금액을 불러오는 중이에요.","startError":"결제 페이지를 여는 데 실패했어요. 잠시 후 다시 시도해 주세요."},"startError":{"conflictTitle":"이미 진행 중인 변경이 있어요","conflictBody":"다른 탭이나 기기에서 시작한 변경이 있어요. 기존 변경을 이어서 진행하거나 취소한 뒤 다시 시작해 주세요.","conflictAction":"기존 변경으로","failedTitle":"지금은 변경할 수 없어요","failedBody":"구독 상태가 바뀌어 변경을 시작할 수 없어요. 화면을 새로고침한 뒤 다시 확인해 주세요."},"initiated":{"badge":"결제 수단 변경 중","body":"결제를 완료하면 변경이 마무리돼요. 그 전까지는 언제든 취소할 수 있고, 취소해도 지금 구독은 그대로 유지돼요.","continue":"결제 계속하기","abort":"변경 취소","abortConfirmTitle":"변경을 취소할까요?","abortConfirmBody":"지금 구독은 그대로 유지되고, 결제 수단 변경만 취소돼요. 언제든 다시 변경할 수 있어요.","abortConfirmCancel":"돌아가기","abortConflictError":"지금은 변경할 수 없어요. 변경 상태가 바뀌어 최신 상태로 새로고침했어요.","abortRetryError":"변경을 취소하지 못했어요. 잠시 후 다시 시도해 주세요.","inAppBadge":"인앱 결제"},"cancelCheckPending":{"bannerTitle":"스토어 해지 확인 중이에요","bannerBody":"최대 하루 걸릴 수 있어요. 확인되면 이 알림은 사라져요.","pill":"확인 중"},"completed":{"title":"결제 수단 변경 완료","body1":"이제 티로 구독은 등록한 카드로 청구돼요.","step2":"해지가 확인되면 이메일로 알려드려요. 해지 전까지는 3일마다 리마인더를 보내드려요.","howToCancel":"해지 방법 보기","verifyingTitle":"결제를 확인하고 있어요","verifyingBody":"잠시만 기다려 주세요. 확인이 끝나면 바로 안내해 드려요.","manualCancel":{"title":"스토어 구독을 해지해 주세요","body":"카드 결제는 등록됐어요. 지금은 스토어 구독도 함께 살아 있어서, 해지하지 않으면 양쪽에서 요금이 나갈 수 있어요.","stepsTitle":"해지는 이렇게 하면 돼요"}},"awaiting":{"autoRevokeTitle":"자동 해지·환불 처리 중이에요","autoRevokeBody":"기존 인앱 구독은 자동으로 해지되고 최근 결제분은 전액 환불돼요. 직접 해지하실 필요 없어요. 처리되면 이메일로 알려드려요.","bannerTitle":"인앱결제가 아직 켜져 있어요","bannerBody":"지금은 티로 결제와 스토어 결제가 둘 다 살아 있어요. 스토어 구독을 해지하지 않으면 요금이 두 곳에서 나갈 수 있어요.","bannerLine2":"해지하시면 확인까지 최대 하루 걸릴 수 있어요.","creditFallbackNote":"스토어 자동 환불이 되지 않아 직접 해지가 필요해요. 해지가 확인되면 이미 결제한 남은 기간만큼 다음 정기 결제 금액에서 빼 드려요.","alreadyCanceledAsk":"이미 해지하셨나요?","requestConfirm":"해지 확인 요청","cancelCheckConflictError":"지금은 해지 확인을 요청할 수 없어요.\\n최신 상태로 새로 고쳤어요. 잠시 후 다시 시도해 주세요.","cancelCheckRetryError":"해지 확인을 요청하지 못했어요.\\n잠시 후 다시 시도해 주세요."},"recordingBanner":{"title":"이용 시간을 다 써서 기록이 중단됐어요","body":"결제 수단을 변경하면 후불 기록으로 끊김 없이 기록할 수 있어요.","cta":"변경 알아보기"},"storeCancelGuide":{"title":"스토어 구독 해지 방법","iosSteps":[{"title":"App Store 앱 또는 설정 열기","caption":"오른쪽 위 계정 아이콘을 눌러요."},{"title":"'구독' 선택","caption":""},{"title":"구독 중인 항목에서 '티로 Tiro' 선택","caption":""},{"title":"'구독 취소'를 눌러 자동갱신 끄기","caption":""}],"androidSteps":[{"title":"Google Play 앱 열기","caption":"오른쪽 위 프로필 아이콘을 눌러요."},{"title":"'결제 및 정기 결제' 메뉴 → '정기 결제' 탭","caption":""},{"title":"활성에서 '티로 Tiro' 선택","caption":""},{"title":"'정기 결제 취소'를 눌러 자동갱신 끄기","caption":""}],"androidNote":"취소 사유를 물으면 건너뛰어도 돼요. 남은 기간은 그대로 유지돼요.","confirmedNote":"해지가 확인되면 이메일로 알려드리고, 리마인더도 자동으로 멈춰요."},"duplicateBilling":{"bannerTitle":"중복 결제가 발생하고 있어요","cta":"해결가이드","dialogTitle":"중복 결제 해결하기","webRowLabel":"웹 결제","webRowPill":"유지","storeRowPill":"해지 필요","step1KeepNote":"해지해도 티로 구독은 그대로 유지돼요.","requestConfirmCaption":"해지가 확인되면 알림이 멈추고 이메일로 알려드려요. 확인까지 최대 하루 걸릴 수 있어요."},"stores":{"APP_STORE":{"bannerBody":"App Store 구독이 다시 활성화됐어요. 티로 구독은 그대로 유지되니 스토어 구독을 다시 해지해 주세요.","step1Title":"App Store에서 구독 다시 해지","step1CancelPath":"설정 → Apple 계정 → 구독 → 티로 → 구독 취소.","completedStep1":"App Store에서 티로 구독의 자동갱신을 해지해 주세요."},"PLAY_STORE":{"bannerBody":"Google Play 정기 결제가 다시 활성화됐어요. 티로 구독은 그대로 유지되니 스토어 구독을 다시 해지해 주세요.","step1Title":"Google Play에서 정기 결제 다시 해지","step1CancelPath":"Google Play 앱 → 프로필 → 결제 및 정기 결제 → 정기 결제 → 활성에서 '티로 Tiro' → 정기 결제 취소.","completedStep1":"Google Play에서 티로 정기 결제의 자동갱신을 해지해 주세요."}},"planDescriptions":{"lite":"가끔 기록하고, 기본 기능만 필요한 분들을 위한 부담없는 플랜","pro":"자주 기록하는 분들을 위한 모든 기능을 지원하는 실용적 플랜","max":"매일 기록하는 분들을 위한, 모든 기능을 지원하는 전문적 플랜"},"lines":{"creditNudge_one":"이미 결제한 {{count}}일치는 첫 결제 금액에서 차감돼요.","creditNudge_other":"이미 결제한 {{count}}일치는 첫 결제 금액에서 차감돼요.","creditNudgeUnknown":"이미 결제한 잔여 기간은 첫 결제 금액에서 차감돼요.","nudgeRefundOrLater_one":"이미 결제한 {{count}}일치는 스토어 환불 또는 다음 정기 결제 차감으로 자동 정산돼요.","nudgeRefundOrLater_other":"이미 결제한 {{count}}일치는 스토어 환불 또는 다음 정기 결제 차감으로 자동 정산돼요.","nudgeRefundOrLaterUnknown":"이미 결제한 잔여 기간은 스토어 환불 또는 다음 정기 결제 차감으로 자동 정산돼요.","storeRefunded_one":"새 플랜을 결제하면 기존 인앱 구독의 최근 결제분이 스토어에서 자동으로 전액 환불되고, 구독도 자동으로 해지돼요.","storeRefunded_other":"새 플랜을 결제하면 기존 인앱 구독의 최근 결제분이 스토어에서 자동으로 전액 환불되고, 구독도 자동으로 해지돼요.","storeRefundedUnknown":"새 플랜을 결제하면 기존 인앱 구독의 최근 결제분이 스토어에서 자동으로 전액 환불되고, 구독도 자동으로 해지돼요.","storeRefundedCompleted_one":"기존 인앱 구독은 곧 자동으로 해지되고 최근 결제분이 전액 환불돼요. 처리되면 이메일로 알려드려요.","storeRefundedCompleted_other":"기존 인앱 구독은 곧 자동으로 해지되고 최근 결제분이 전액 환불돼요. 처리되면 이메일로 알려드려요.","storeRefundedCompletedUnknown":"기존 인앱 구독은 곧 자동으로 해지되고 최근 결제분이 전액 환불돼요. 처리되면 이메일로 알려드려요.","deductedLater_one":"이미 결제한 {{count}}일치는 다음 결제 금액에서 차감돼요.","deductedLater_other":"이미 결제한 {{count}}일치는 다음 결제 금액에서 차감돼요.","deductedLaterUnknown":"이미 결제한 잔여 기간은 다음 결제 금액에서 차감돼요.","nothingToSettle_one":"이미 결제한 기간은 다 쓰셨어요. 지금 옮기셔도 잃는 금액이 없어요.","nothingToSettle_other":"이미 결제한 기간은 다 쓰셨어요. 지금 옮기셔도 잃는 금액이 없어요.","nothingToSettleUnknown":"이미 결제한 기간은 다 쓰셨어요. 지금 옮기셔도 잃는 금액이 없어요.","creditRowLabel_one":"이미 결제한 {{count}}일치 차감","creditRowLabel_other":"이미 결제한 {{count}}일치 차감","creditRowLabelUnknown":"이미 결제한 잔여 기간 차감","resumeCredit_one":"이미 결제한 {{count}}일치는 오늘 결제 금액에서 차감돼요.","resumeCredit_other":"이미 결제한 {{count}}일치는 오늘 결제 금액에서 차감돼요.","resumeCreditUnknown":"이미 결제한 잔여 기간은 오늘 결제 금액에서 차감돼요.","resumeRefund_one":"이미 결제한 {{count}}일치는 스토어 환불 또는 다음 정기 결제 차감으로 자동 정산돼요.","resumeRefund_other":"이미 결제한 {{count}}일치는 스토어 환불 또는 다음 정기 결제 차감으로 자동 정산돼요.","resumeRefundUnknown":"이미 결제한 잔여 기간은 스토어 환불 또는 다음 정기 결제 차감으로 자동 정산돼요.","completedCredit_one":"이미 결제한 {{count}}일치는 차감 후 결제했어요.","completedCredit_other":"이미 결제한 {{count}}일치는 차감 후 결제했어요.","completedCreditUnknown":"이미 결제한 잔여 기간은 차감 후 결제했어요.","completedRefund_one":"이미 결제한 {{count}}일치는 스토어 환불 또는 다음 정기 결제 차감으로 자동 정산돼요.","completedRefund_other":"이미 결제한 {{count}}일치는 스토어 환불 또는 다음 정기 결제 차감으로 자동 정산돼요.","completedRefundUnknown":"이미 결제한 잔여 기간은 스토어 환불 또는 다음 정기 결제 차감으로 자동 정산돼요.","confirmedCredit":"스토어 구독 해지가 확인됐어요. 스토어 자동 환불이 되지 않아, 이미 결제한 남은 기간(~{{date}})만큼은 다음 정기 결제 금액에서 빼 드려요.","confirmedCreditUnknown":"스토어 구독 해지가 확인됐어요. 스토어 자동 환불이 되지 않아, 이미 결제한 남은 기간만큼은 다음 정기 결제 금액에서 빼 드려요.","confirmedCanceled":"스토어 구독 해지가 확인됐어요. 기존 인앱 구독은 {{date}}에 만료돼요. 이제 따로 하실 일은 없어요.","confirmedCanceledUnknown":"스토어 구독 해지가 확인됐어요. 기존 인앱 구독은 곧 만료돼요. 이제 따로 하실 일은 없어요."}}}`,
  ),
  M = JSON.parse(
    `{"password":{"toast":{"error":"비밀번호 변경에 실패했어요"}},"title":"설정","group":{"profile":"내 계정","connectors":"연결","workspace":"워크스페이스","organization":"조직 설정","developers":"개발자","myInformation":"내 정보 설정","otherApps":"앱 설정","team":"구성원 설정"},"tab":{"billing":"결제 관리","billingManagement":"결제 관리","plans":"플랜 관리","profile":"내 계정","general":"기본 설정","devices":"로그인된 기기","referral":"티로 선물하기","coupon":"쿠폰 등록","calendar":"캘린더 관리","person":"대화 참석자 관리","wordMemory":"단어장 관리","customTemplate":"템플릿 관리","teamWordMemory":"워크스페이스 단어장 관리","integration":"연동 관리","mcp":"Tiro MCP","workspace":"일반","members":"구성원","team":"구성원 관리","teamGuide":"구성원 관리 가이드","about":"앱 정보","organization":"조직 관리","developers":"개발자 센터"},"mcp":{"hero":"회의 노트를 AI 도구로 가져오세요","logosAlt":{"tiro":"Tiro","claude":"Claude","chatgpt":"ChatGPT","cursor":"Cursor"},"steps":{"install":"사용하시는 AI 도구에서 아래 URL로 Tiro MCP를 추가하세요","oauth":"브라우저 OAuth 흐름으로 Tiro 계정 인증을 마쳐주세요","invoke":"Claude · ChatGPT · Cursor 등에서 자연어로 회의 컨텍스트를 활용해보세요"},"copy":"복사","copied":"복사됐어요","learnMore":"자세히 알아보기"},"workspace":{"title":"일반","description":"워크스페이스의 기본 정보와 설정을 관리할 수 있어요.","info":{"label":"워크스페이스 정보","name":"워크스페이스 이름","namePlaceholder":"워크스페이스 이름을 입력해주세요","nameRequired":"워크스페이스 이름을 입력해 주세요.","nameMaxLength":"워크스페이스 이름은 {{max}}자 이하로 입력해 주세요.","descriptionField":"워크스페이스 설명","descriptionPlaceholder":"워크스페이스 설명을 입력해주세요","updateError":"워크스페이스 정보를 저장하지 못했어요.\\n잠시 후 다시 시도해 주세요.","icon":{"label":"워크스페이스 아이콘","description":"PNG·JPG·WebP, 최대 5MB. 정사각형 이미지를 권장해요.","edit":"아이콘 편집","upload":"이미지 업로드","change":"이미지 변경","removeButton":"제거","toast":{"uploaded":"워크스페이스 아이콘을 변경했어요.","removed":"워크스페이스 아이콘을 제거했어요.","failed":"아이콘을 변경하지 못했어요. 잠시 후 다시 시도해 주세요."},"error":{"unsupportedType":"PNG, JPG, WebP 이미지만 올릴 수 있어요.","tooLarge":"이미지는 5MB 이하만 올릴 수 있어요."}}},"settings":{"label":"워크스페이스 설정","allowNoteTransfer":{"title":"다른 워크스페이스로 노트 이동 허용","description":"구성원이 노트를 다른 워크스페이스로 옮길 수 있도록 허용해요."}},"recordingPolicy":{"label":"기록 정책"},"recordingOverage":{"title":"추가 기록","description":"기본 제공 시간을 모두 사용해도 회의 기록을 계속 이어갈 수 있어요.","billingDescription":"초과 사용한 기록 시간은 분당 $0.025로 청구돼요.","enabledDescription":"기본 제공 시간을 초과하면 추가 기록으로 계속 이어져요.","memberDescription":"추가 기록 설정은 워크스페이스 담당자만 변경할 수 있어요.","disabledReason":{"paymentMethodMissing":"추가 기록을 켜려면 먼저 결제수단을 등록해 주세요.","paymentFailed":"최근 결제가 실패했어요. 결제수단을 확인한 뒤 다시 켜 주세요.","noActiveSubscription":"활성화된 구독이 있어야 추가 기록을 켤 수 있어요.","nonStripeSubscription":"추가 기록은 데스크탑 또는 웹에서 결제 중인 워크스페이스에서만 사용할 수 있어요. 결제 수단 변경을 원하시면 프로필 > 고객문의로 문의해 주세요.","generic":"현재 결제 상태에서는 추가 기록을 켤 수 없어요."},"toast":{"enabled":"추가 기록을 켰어요","disabled":"추가 기록을 껐어요","failed":"추가 기록 설정을 저장하지 못했어요","failedDescription":"결제 또는 구독 상태를 확인한 뒤 다시 시도해 주세요."}},"sharePolicy":{"label":"공유 정책","orgInherited":{"title":"조직 정책이 함께 적용돼요","restricted":"조직에서 공유 링크를 차단하고 있어요. 이 워크스페이스에서도 공유 링크를 만들거나 열 수 없어요.","companyOnly":"회사 이메일로만 열람","maxDays":"링크 최대 {{days}}일","domains":"허용 도메인: {{domains}}","none":"조직에서 추가로 제한하는 설정은 없어요. 아래 워크스페이스 설정과 조직 설정 중 더 엄격한 쪽이 적용돼요."},"ceiling":{"title":"워크스페이스 공유 범위 상한","description":"구성원이 만드는 공유 링크의 최대 공개 범위를 강제해요. 기존 공유 노트에도 소급 적용돼요.","option":{"anyone":"링크가 있는 누구나","company":"회사 구성원만","private":"비공개(링크 공유 불가)"},"confirm":{"title":"공유 범위 상한을 낮출까요?","description":"변경된 상한은 이미 만들어진 공유 링크에도 즉시 적용돼요. '{{scope}}'보다 넓게 공유된 링크는 바로 열람이 제한돼요.","confirm":"상한 낮추기","cancel":"취소","applied":"새 공유 범위 상한을 적용했어요. 기존 링크에도 바로 반영돼요."}},"maxDuration":{"title":"공유 링크 최대 유효기간","description":"새로 만드는 공유 링크가 만료되기까지의 최대 일수예요.","unlimited":"무제한"},"allowedDomains":{"title":"회사 허용 도메인","description":"'회사 구성원만'으로 공유한 노트는 이 도메인의 계정으로 로그인해야 열람할 수 있어요. 비우면 노트 소유자의 회사 도메인을 사용해요 (gmail 등 개인 메일 도메인은 제외).","placeholder":"예: theplato.io","add":"추가","remove":"삭제","empty":"추가된 도메인이 없어요 (소유자의 회사 도메인 사용).","invalid":"올바른 도메인 형식이 아니에요."},"updateError":"공유 정책을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.","enterpriseBadge":"엔터프라이즈","enterpriseOnly":"공유 정책은 엔터프라이즈 플랜에서 변경할 수 있어요."},"sharedLinks":{"label":"공유된 링크","manage":"공유 링크 관리","manageDescription":"워크스페이스에서 활성화된 공유 링크를 확인하고 회수해요.","back":"워크스페이스 설정으로","loading":"불러오는 중…","empty":"현재 공유된 링크가 없어요.","count":"공유 중인 링크 {{count}}개","selectedCount":"{{count}}개 선택됨","table":{"note":"노트","scope":"공유 범위","owner":"만든 사람","sharedDate":"공유일"},"revoke":"회수","filter":{"all":"모든 링크 {{count}}개","anonymousOpenable":"전체 공개 · 비밀번호 없음 {{count}}개"},"revokeAll":"전체 회수","revokeSelected":"선택 회수 ({{count}})","selectAll":"전체 선택","confirmAll":"공유 링크를 전체 회수할까요?","confirmAllDescription":"워크스페이스의 모든 활성 공유 링크가 회수돼요. 링크를 받은 사람은 더 이상 열 수 없어요.","confirm":"회수","cancel":"취소","loadMore":"더 보기","revokedOne":"링크를 회수했어요","revokedAll":"공유 링크 {{count}}개를 회수했어요","revokeError":"회수에 실패했어요. 다시 시도해 주세요."},"advanced":"고급 설정","delete":{"title":"워크스페이스 삭제","description":"'{{name}}' 워크스페이스와 관련 데이터를 영구 삭제합니다.","action":"워크스페이스 삭제","confirm":{"title":"'{{name}}' 워크스페이스를 삭제할까요?","description":"이 워크스페이스를 삭제하면 이 워크스페이스의 모든 노트, 폴더, 구성원 정보, 워크스페이스 단어장 및 관련 데이터가 영구 삭제됩니다. 이 작업은 되돌릴 수 없습니다.","cancel":"취소","confirm":"영구 삭제","deleting":"삭제 중..."},"toast":{"success":"워크스페이스가 삭제되었어요."},"error":{"title":"워크스페이스를 삭제하지 못했어요","forbidden":"워크스페이스 관리자만 삭제할 수 있어요.","notFound":"워크스페이스를 찾을 수 없어요. 이미 삭제되었을 수 있어요.","organization":"조직 워크스페이스는 조직 관리자가 조직 설정에서 관리해야 해요.","mobileSubscription":"활성 모바일 구독이 있어 워크스페이스를 삭제할 수 없어요. 구독 상태를 확인해 주세요.","unprocessable":"워크스페이스 정책 또는 결제 상태 때문에 삭제할 수 없어요.","tooManyRequests":"다른 작업이 처리 중이에요. 잠시 후 다시 시도해 주세요.","generic":"일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요."}},"readOnlyHint":"워크스페이스 정보는 관리자만 수정할 수 있어요."},"members":{"title":"구성원","description":"워크스페이스에 팀원을 초대하고 함께 이용해보세요. 이곳에서 구성원들의 역할을 관리할 수 있어요.","searchPlaceholder":"이름 또는 이메일로 검색","inviteMemberButton":"팀원 초대","emailPlaceholder":"이메일 주소를 입력하세요","sendInvite":"초대 보내기","inviteProviderHint":"Google 또는 Microsoft 계정으로 로그인할 수 있는 이메일만 초대할 수 있어요.","inviteUnsupportedProviderWarning":"이 주소는 Google·Microsoft 계정이 아니라서 초대가 안 될 수 있어요.","inviteDialogTitle":"팀원 초대","inviteDialogDescription":"이메일로 워크스페이스에 팀원을 초대해요. 여러 명을 한 번에 초대할 수 있어요.","inviteEmailsPlaceholder":"쉼표나 줄바꿈으로 여러 이메일을 입력하세요","inviteRoleLabel":"역할","invitePreparedCount":"{{count}}명 초대","inviteUnsupportedEmailsWarning":"{{emails}} 주소는 Google·Microsoft 계정이 아니라서 초대가 안 될 수 있어요.","inviteSentCount":"{{count}}개 메일에 초대가 전송되었어요.","inviteSomeFailed":"일부 초대에 실패했어요 ({{count}}건). 이메일 주소를 확인하고 다시 시도해 주세요.","invitePaidRoleNotice":"구매한 좌석 안에서는 추가 좌석 요금이 없어요.\\n좌석이 부족하고 자동 구매가 가능한 경우, 추가 좌석 요금을 즉시 결제한 뒤 초대돼요.","readOnlyHint":"구성원 관리는 워크스페이스 관리자만 할 수 있어요.","inviteRequiresTeamPlanTitle":"팀 플랜으로 전환이 필요해요","inviteRequiresTeamPlanDescription":"2인 이상과 함께 이용하기 위해서는 팀 플랜으로 전환해 주세요.","roleColumn":"역할","member":"구성원","joinedAt":"참여일","memo":"메모","memoPlaceholder":"메모를 입력하세요","clickToAddMemo":"메모 추가","memoUpdateFailed":"메모 저장에 실패했어요","pending":"초대 대기","currentUser":"나","noSearchResults":"표시할 구성원이 없어요","removeMember":"구성원 제거","removeMemberTitle":"구성원을 제거할까요?","removeMemberDescription":"{{name}}님은 이 워크스페이스에 접근할 수 없게 돼요.","removeMemberButton":"제거","removeSuccess":"구성원이 제거되었어요","removeSuccessDescription":"{{name}}님을 워크스페이스에서 제거했어요.","removeFailed":"구성원 제거에 실패했어요","removeFailedDescription":"잠시 후 다시 시도해주세요.","leaveWorkspace":"워크스페이스 나가기","leaveWorkspaceTitle":"워크스페이스를 나갈까요?","leaveWorkspaceDescription":"나간 뒤에는 이 워크스페이스의 공유 노트와 폴더에 접근할 수 없어요.","leaveWorkspaceButton":"나가기","leaveOnlyAdminTitle":"다른 Admin이 있어야 나갈 수 있어요","leaveOnlyAdminDescription":"워크스페이스에는 최소 한 명의 Admin이 필요해요. 다른 멤버를 Admin으로 변경한 뒤 다시 시도해 주세요.","leaveSuccess":"워크스페이스에서 나갔어요","leaveSuccessDescription":"이제 이 워크스페이스에 접근할 수 없어요.","leaveFailed":"워크스페이스 나가기에 실패했어요","leaveFailedDescription":"잠시 후 다시 시도해주세요.","roleUpdateSuccess":"역할이 변경되었어요","roleUpdateFailed":"역할 변경에 실패했어요","inviteSuccess":"초대를 보냈어요","inviteSuccessDescription":"{{email}} 주소로 초대를 보냈어요.","inviteFailed":"초대에 실패했어요","inviteFailedDescription":"이메일 주소를 확인하고 다시 시도해주세요.","revokeInvite":"초대 취소","revokeInviteSuccess":"초대가 취소되었어요","revokeInviteSuccessDescription":"대기 중인 초대를 취소했어요.","revokeInviteFailed":"초대 취소에 실패했어요","revokeInviteFailedDescription":"잠시 후 다시 시도해주세요."},"about":{"title":"앱 정보","description":"현재 사용 중인 티로 버전을 확인할 수 있어요.","version":"버전","updateNow":"지금 v{{version}} 업데이트","latestVersion":"최신 버전입니다."},"plan":{"mobilePayment":{"toast":{"title":"모바일 인앱결제 구독은 앱에서만 플랜 변경이 가능해요.","description":"모바일 앱에서 다시 시도해 주세요.","action":"지원 가이드"}}},"appearance":{"section":"화면","title":"화면 모드","description":"기기의 설정을 따르거나 라이트·다크 모드를 직접 선택하세요.","system":"시스템","light":"라이트","dark":"다크"},"general":{"title":"기본 설정","description":"티로의 다양한 기능을 자유롭게 관리할 수 있어요.","language":{"sectionTitle":"언어 설정"},"audioReplay":{"title":"문단별 음성 다시 듣기","description1":"각 문단에서 원본 음성을 재생할 수 있어요. 스크립트의 각 문단에서 오디오 아이콘을 클릭해보세요.","description2":"※ 이 기능을 켜면 음성 파일이 저장돼요. 개인정보 보호를 위해 녹음 전 꼭 동의를 받아주세요."},"speakerDiarization":{"title":"화자 분리","description1":"자동으로 대화 참석자를 구분해서 스크립트에서 화자를 태그해줘요.","description2":"※ 이 기능은 음성 파일 업로드에서만 우선적으로 지원해요. 곧 실시간 기록에도 적용될 예정이에요.","learnMore":"자세히 보기","tooltip":{"title":"어떻게 동작하나요?","step1":"음성 파일을 업로드 한 후 스크립트를 열면 'Speaker A‧B…'로 자동 태그가 붙어요.","step2":"자동 태그를 원하는 이름으로 바꿀 수 있고, 엔터 키를 통해 사용자가 직접 화자를 분리할 수도 있어요.","step2Detail":"사용자가 직접 참석자를 태그해준 경우, 맞춤 문서에 해당 정보가 반영되어 더 정확한 문서 생성이 가능해져요.","step3":"별도로 태그를 바꾸지 않아도 사용 가능하며, 이 경우 맞춤문서는 대화 내용만을 기반으로 작성돼요."},"litePlanDialog":{"title":"화자 분리 기능은 Pro 이상 플랜에서만 지원해요","description":"플랜을 업그레이드하고 모든 Pro 기능을 사용해보세요.","upgradeButton":"플랜 업그레이드하기"}},"autoNoteSummary":{"title":"기록 종료 후 자동 생성","description":"기록이 끝나면 선택한 요약과 맞춤문서를 노트의 요약 언어로 만들어요.","summaryTemplates":"요약 템플릿","documentTemplates":"맞춤문서 템플릿","selectionStatusSummary":"요약 {{count}}개를 자동 생성해요.","selectionStatusDocument":"맞춤문서 {{count}}개를 자동 생성해요.","selectionStatusBoth":"요약 {{summaryCount}}개 · 맞춤문서 {{documentCount}}개를 자동 생성해요.","emptySelection":"자동 생성할 템플릿을 하나 이상 선택해 주세요.","disabledWithoutTemplate":"선택한 템플릿이 없어 자동 생성을 껐어요."},"dataSharing":{"sectionTitle":"공유 설정"},"defaultLinkSharing":{"title":"링크 공유 기본값","description":{"ANYONE":"노트를 공유할 때 '링크가 있는 누구나' 범위가 기본으로 선택돼요.","COMPANY":"노트를 공유할 때 회사 도메인 계정만 열 수 있는 범위가 기본으로 선택돼요.","PRIVATE":"기본적으로 노트는 비공개로 유지돼요. 공유가 필요할 때 모달에서 범위를 직접 선택해요."},"option":{"anyone":"링크가 있는 누구나","company":"회사 구성원만","private":"비공개"}},"notification":{"title":"알림","description":"미팅 시작 10분 전, 기록을 바로 시작하실 수 있도록 캘린더 알림을 표시해요."},"micDetection":{"title":"대화 자동 감지","description":"대화가 감지되면 기록을 바로 시작하실 수 있도록 알림을 표시해요."},"audioRecording":{"title":"음성 파일 로컬 저장","description":"실시간 대화 기록 시 음성 파일을 로컬 디바이스에 자동으로 저장해요.","tooltip":{"title":"음성 파일 로컬 저장 안내","description":"실시간 대화 기록의 음성 파일은 음성을 기록한 사용자의 기기에만 저장되며, 서버에는 저장되지 않아요. 기록 담당자의 기기에는 가장 최근에 기록된 회의 음성 파일 50개가 저장되며, 언제든지 다운로드할 수 있어요."},"blockedByOrgPolicy":"조직 정책에 따라 이 기능을 사용할 수 없어요."},"overlay":{"title":"실시간 기록 표시","description":"기록 중이라는 사실을 잊지 않도록 화면 우측에 기록 상태를 표시해요."},"desktopOnly":{"sectionTitle":"데스크탑 앱","description":"데스크탑 앱에서 모든 기능을 활성화하세요.","downloadButton":"데스크탑 앱 다운로드"},"toast":{"preferenceUpdateError":"설정 변경에 실패했어요"}},"devices":{"pageTitle":"로그인된 기기","pageDescription":"Tiro에 로그인된 기기를 확인하고, 쓰지 않는 기기는 로그아웃할 수 있어요.","currentDevice":"현재 기기","currentBadge":"지금 사용 중","otherDevices":"다른 기기","loginAt":"로그인: {{time}}","unknownDevice":"알 수 없는 기기","unknownDeviceCaption":"이전에 로그인한 기록이에요. 해당 기기에서 다시 로그인하면 기기 정보가 표시돼요.","mcpSession":"MCP 연동","confirmCancel":"취소","currentLogout":{"button":"로그아웃","confirmTitle":"이 기기에서 로그아웃할까요?","confirmDescription":"로그아웃하면 다시 로그인해야 Tiro를 사용할 수 있어요.","confirmAction":"로그아웃"},"revokeAll":{"title":"다른 모든 기기에서 로그아웃","caption":"이 기기를 제외한 모든 기기에서 로그아웃돼요.","button":"모두 로그아웃","legacyTitle":"모든 기기에서 로그아웃","legacyCaption":"지금 사용 중인 기기를 구분할 수 없어, 이 기기를 포함한 모든 기기에서 로그아웃돼요.","legacyButton":"모두 로그아웃","confirmTitle":"다른 모든 기기에서 로그아웃할까요?","confirmDescription":"이 기기를 제외한 모든 기기에서 로그아웃돼요. 각 기기에서 진행 중이던 작업은 잠시 후 종료돼요.","legacyConfirmTitle":"이 기기를 포함해 모두 로그아웃할까요?","legacyConfirmDescription":"이 기기도 함께 로그아웃돼요. 다시 로그인하면 바로 이어서 사용할 수 있어요.","confirmAction":"모두 로그아웃","toast":{"success":"다른 기기에서 모두 로그아웃했어요 ({{deviceCount}}대)","none":"로그아웃할 다른 기기가 없어요","error":"로그아웃에 실패했어요. 잠시 후 다시 시도해주세요"}},"revoke":{"button":"로그아웃","confirmTitle":"선택한 기기에서 로그아웃할까요?","confirmDescription":"해당 기기에서 진행 중인 작업은 잠시 후 종료되고, 다시 로그인해야 사용할 수 있어요.","confirmAction":"로그아웃","toast":{"error":"기기 로그아웃에 실패했어요. 잠시 후 다시 시도해주세요"}},"list":{"empty":"로그아웃할 다른 기기가 없어요","errorTitle":"기기 목록을 불러오지 못했어요","errorDescription":"잠시 후 다시 시도해주세요.","retry":"다시 시도"}},"integration":{"title":"연동 관리","description":"사용 중인 서비스를 연동하고 노트를 쉽게 공유해보세요. 서비스별 상세 설정에서 자동화 옵션을 관리할 수 있어요","connect":"연동하기","disconnect":"연동 해제","disconnectPopup":{"title":"연동 해제","description":"연동을 해제하시면 관련 기능들을 더 이상 사용할 수 없어요","confirm":"연동 해제","cancel":"취소"},"slack":{"title":"슬랙","description":"노트를 슬랙으로 바로 공유할 수 있어요","automation":{"channels":"Channels","searchChannel":"채널 검색","loadingChannels":"채널 목록 불러오는 중...","noChannelsAvailable":"사용 가능한 채널이 없습니다","noSearchResults":"검색 결과가 없습니다","notConnected":{"title":"Slack 연동이 필요해요","description":"Slack 워크스페이스를 먼저 연동해주세요. 노트를 손쉽게 Slack 채널에 내보낼 수 있고, 기록이 종료되면 노트가 자동으로 공유되도록 설정할 수 있어요."},"inviteBotGuide":"비공개 채널은 슬랙에서 \`/invite @Tiro\` 로 Tiro 앱을 초대해주세요."},"toast":{"channelUpdateError":"Slack 채널 변경에 실패했어요","messageSendError":"Slack 메시지 전송에 실패했어요","disconnectError":"Slack 연동 해제에 실패했어요"}},"notion":{"title":"노션","description":"노트를 노션에 바로 저장할 수 있어요","toast":{"pageCreateError":"Notion 페이지 생성에 실패했어요","parentUpdateError":"Notion 상위 페이지 변경에 실패했어요","disconnectError":"Notion 연동 해제에 실패했어요","databaseCreateError":"Notion 데이터베이스 생성에 실패했어요"}},"googleDrive":{"title":"Google Drive","description":"노트를 Google Docs로 만들어 내 Drive에 저장할 수 있어요","toast":{"disconnectError":"Google Drive 연동을 해제하지 못했어요.\\n잠시 후 다시 시도해 주세요"}},"microsoftTeams":{"title":"Microsoft Teams","description":"노트 링크와 선택한 내용을 Teams 채널이나 메시지로 공유할 수 있어요","authorizationError":{"title":"관리자 승인이 필요해요","description":"Microsoft Teams 연결이 중단됐어요.\\n직접 취소하지 않았다면 Microsoft 365 관리자가 Tiro를 승인해야 해요.\\n\\n아래 버튼으로 요청 문구와 승인 링크를 복사해 관리자에게 보내 주세요.\\n승인이 끝나면 다시 연결해 주세요.","closeAction":"나중에 하기"},"adminConsent":{"adminMessage":"[Tiro Microsoft Teams 연동 조직 관리자 승인 요청]\\n\\n요청 목적\\nTiro 사용자가 참여한 팀과 채널을 확인하고, 직접 선택한 채널이나 조직 구성원에게 Tiro 노트를 전송하려면 조직 승인이 필요합니다.\\n\\n요청 권한과 사용 목적\\n- User.Read: 연결한 사용자의 계정과 기본 프로필 확인\\n- offline_access: 사용자가 매번 로그인하지 않아도 연결 유지\\n- User.ReadBasic.All: 메시지를 보낼 조직 구성원 검색\\n- Team.ReadBasic.All: 사용자가 참여한 팀 목록 조회\\n- Channel.ReadBasic.All: 선택할 채널 목록 조회\\n- ChannelMessage.Send: 사용자가 선택한 채널에 노트 전송\\n- Chat.Create: 사용자가 선택한 구성원과 1:1 대화 생성\\n- ChatMessage.Send: 생성한 1:1 대화에 노트 전송\\n\\n관리자 확인 사항\\n- 아래 링크는 조직 전체 관리자 동의 화면입니다. 앱 이름과 위 권한을 검토한 뒤 승인해 주세요.\\n- Tiro는 Teams 메시지를 읽는 권한을 요청하지 않습니다.\\n- 승인 후 요청자에게 완료 여부를 알려 주세요.\\n\\n관리자 승인 링크\\n{{adminConsentUrl}}","copyAction":"관리자 승인 요청 복사","copied":"관리자 승인 요청과 링크를 복사했어요"},"toast":{"disconnectError":"Microsoft Teams 연동을 해제하지 못했어요.\\n잠시 후 다시 시도해 주세요"}},"microsoftTeamsAdminConsent":{"success":{"title":"조직 승인이 완료됐어요","description":"이제 조직 구성원이 Tiro에서 Microsoft Teams를 연결할 수 있어요.","nextStep":"이 창을 닫고 승인 요청을 보낸 구성원에게 완료 사실을 알려 주세요."},"failure":{"title":"조직 승인을 완료하지 못했어요","description":"Microsoft 365 관리자 계정으로 승인 링크를 다시 열어 주세요.","nextStep":"문제가 계속되면 Tiro 지원팀에 문의해 주세요."}},"confluence":{"title":"컨플루언스","description":"노트를 컨플루언스에 바로 저장할 수 있어요","toast":{"settingsUpdateError":"Confluence 설정 변경에 실패했어요","pageCreateError":"Confluence 페이지 생성에 실패했어요","disconnectError":"Confluence 연동 해제에 실패했어요"}},"hubspot":{"title":"허브스팟","description":"노트를 허브스팟에 바로 기록할 수 있어요","toast":{"meetingCreateError":"HubSpot 미팅 노트 생성에 실패했어요","disconnectError":"HubSpot 연동 해제에 실패했어요","settingsUpdateError":"HubSpot 설정 변경에 실패했어요"}},"salesforce":{"title":"Salesforce","description":"Salesforce의 고객사나 영업 기회에 노트를 직접 기록할 수 있어요","authorizationError":{"title":"Salesforce 연결을 완료하지 못했어요","description":"로그인을 취소했다면 다시 연결해 주세요. 그 외에는 Tiro 앱 설치와 Salesforce 관리자의 사용자 승인을 확인해 주세요.","notInstalled":"이 Salesforce 조직에 Tiro 앱이 설치되어 있지 않아요. 관리자에게 앱 설치와 사용자 승인을 요청한 뒤 다시 연결해 주세요.","retry":"다시 연결하기"},"setup":{"title":"Salesforce 연결 준비","entry":"회사에서 처음 연결하나요? 관리자 설치 안내","action":"설치·승인 안내","description":"Salesforce 관리자가 회사 조직에 Tiro를 한 번 설치하고 사용자를 승인하면, 각자 계정을 연결할 수 있어요.","install":"Salesforce에서 설치","guide":"사용자 승인 방법 보기","packageNotice":"패키지: Tiro · 게시자: ThePlato Inc.\\nAppExchange 심사를 받지 않은 패키지예요. 설치 전 패키지와 게시자를 확인해 주세요.","notAdmin":"Salesforce 관리자가 아니신가요?","copy":"관리자에게 보낼 안내 복사","copied":"관리자 안내를 복사했어요","connect":"설치·승인 후 연결하기","external":"브라우저의 새 탭에서 열려요","adminMessage":"사용 중인 Salesforce 조직에 Tiro 앱을 설치하고, 아래 가이드에 따라 제 계정의 사용을 승인해 주세요. 완료되면 알려 주세요. Tiro에서 제 계정을 연결하겠습니다.\\n\\n설치: {{installUrl}}\\n사용자 승인 가이드: {{guideUrl}}"},"toast":{"disconnectError":"Salesforce 연동을 해제하지 못했어요.\\n잠시 후 다시 시도해 주세요"}},"automation":{"backToList":"목록","integrationSetting":"연동 설정","slackAutomationDescription":"슬랙 워크스페이스를 연동하면, 노트를 원하는 슬랙 채널에 공유할 수 있어요. 공유하고 싶은 노트에서 '슬랙으로 공유하기'를 클릭해보세요.","automationSetting":"자동 공유 설정","automationSettingDescription":"기록을 종료하면 원하는 슬랙 채널에 노트가 자동으로 공유되도록 트리거를 만들 수 있어요.","newTrigger":"새 트리거","name":"Name","namePlaceholder":"트리거 제목","when":"When","noteTitle":"노트 제목","folder":"폴더","contains":"Contains","notContains":"Not Contains","is":"Is","isNot":"Is Not","in":"In","keywords":"키워드","selectFolder":"폴더 선택","noFoldersAvailable":"폴더 없음","where":"Where","what":"What","includeShareLink":"공유 링크를 포함해요","shareLinkContents":"공유 링크에서 보여줄 내용","directSlackContents":"Slack 답글에 직접 올릴 내용","addContent":"내용 추가","removeContent":"내용 삭제","paragraphSummary":"요약","transcript":"스크립트","messages":"messages (optional)","messagesPlaceholder":"슬랙 알림에 포함시킬 메시지를 입력해주세요","messagesLength":"{{length}}/1000","selectTemplate":"템플릿 선택","selectNone":"선택 안 함","alreadySelected":"이미 선택됨","creating":"생성 중...","save":"저장","loadingTriggers":"트리거 목록을 불러오는 중...","activate":"활성화","edit":"수정","delete":"삭제"}},"profile":{"pageTitle":"내 계정","pageDescription":"여러분에 대해 조금만 알려주시면 여러분에게 딱 맞춰진 티로를 만나보실 수 있어요. 입력해주신 정보는 티로가 맥락으로 활용해 더욱 똑똑하게 기록해요.","basicInfo":"기본 정보","loginMethods":{"sectionLabel":"로그인 방법","addButton":"로그인 방법 추가","primaryBadge":"대표 이메일","freshEmailNote":"아직 티로에 가입하지 않은 이메일만 연결할 수 있어요.","limitToast":"로그인 방법은 계정당 10개까지예요. 쓰지 않는 방법을 먼저 삭제해 주세요.","lastLoginAt":"{{provider}} · 마지막 로그인 {{time}}","attachedAt":"{{provider}} · {{time}} 추가","provider":{"google":"Google 로그인","microsoft":"Microsoft 로그인","apple":"Apple 로그인","unknown":"로그인"},"list":{"errorTitle":"로그인 방법을 불러오지 못했어요","errorDescription":"잠시 후 다시 시도해 주세요.","retry":"다시 시도"},"addModal":{"title":"로그인 방법 추가","description":"현재 계정에 로그인할 방법을 추가할 수 있어요.","emailComingSoon":"이메일 로그인","comingSoonTag":"추가 예정","successToast":"로그인 방법을 추가했어요.","alreadyAttachedToast":"이미 다른 티로 계정에 연결된 이메일이에요.","errorToast":"로그인 방법을 추가하지 못했어요. 다시 시도해 주세요."},"detach":{"button":"삭제","cancel":"취소","confirmAction":"삭제","confirmTitle":"이 로그인 방법을 삭제할까요?","confirmDescription":"삭제하면 {{email}}({{provider}})(으)로는 더 이상 로그인할 수 없어요. 삭제 후 재로그인이 필요해요.","disabledLastOne":"마지막 로그인 방법은 삭제할 수 없어요.","disabledPrimary":"대표 이메일과 연결된 방법이라 삭제할 수 없어요.","toast":{"success":"로그인 방법을 삭제했어요.","notFound":"이미 삭제되었거나 찾을 수 없는 로그인 방법이에요.","error":"로그인 방법을 삭제하지 못했어요."}}},"name":"이름","email":"이메일","language":"언어","moreLanguagesSoon":"더 많은 언어가 곧 지원될 예정이에요!","account":"계정","upgradePlan":"플랜 업그레이드","manageSubscription":"플랜 관리","logout":"로그아웃","advanced":"고급 설정","deleteAccount":"계정 삭제","accountActions":{"plan":{"title":"현재 플랜","description":"더 많은 사용량과 협업 기능이 필요하다면 플랜을 변경하세요."},"billing":{"title":"결제 및 구독","description":"현재 플랜, 결제 주기, 구독 상태를 확인하세요."},"password":{"title":"로그인 보안","description":"티로 계정에 사용하는 비밀번호를 업데이트하세요."},"delete":{"title":"영구 삭제","description":"계정과 개인 데이터를 삭제합니다. 이 작업은 되돌릴 수 없어요."}},"deleteAccountModal":{"title":"계정 삭제","warningDescription":"계정을 삭제하면 모든 데이터가 영구적으로 삭제되며, 이 작업은 되돌릴 수 없어요.","confirmEmailLabel":"삭제를 확인하려면 이메일 주소를 입력해주세요","emailMismatchError":"이메일 주소가 일치하지 않아요","cancelButton":"취소","deleteButton":"계정 삭제","deleting":"삭제 중...","inAppPurchase":{"stepTitle":"계정 삭제 전 꼭 확인해주세요","description":"티로 계정을 삭제하더라도,\\n현재 이용 중인 구독은 자동으로 취소되지 않습니다.\\n\\n구독을 중단하려면 반드시 사용 중인 {{store}}에서 직접 구독을 취소하셔야 합니다.","howToCancelAppStore":"App Store에서 구독 취소 하는 법","howToCancelGooglePlay":"Google Play에서 구독 취소 하는 법","confirmCheckboxLabel":"계정 삭제 시 구독이 자동으로 해지되지 않는다는 점을 이해했으며, 직접 스토어에서 구독 취소를 진행했습니다.","nextButton":"다음","prevButton":"이전"}},"profileDescription":"여러분에 대해 조금만 알려주시면 여러분에게 딱 맞춰진 똑똑한 티로를 바로 만나보실 수 있어요.","jobTitle":"직책","jobTitlePlaceholder":"CEO","aboutYou":"소개","aboutYouPlaceholder":"관심사, 업무 분야 등 자신에 대한 간략한 소개를 입력해주세요","yourCompany":"회사","companyName":"회사명","companyNamePlaceholder":"더플레이토","companyDescription":"회사 소개","companyDescriptionPlaceholder":"회사가 하는 일, 만드는 제품, 주요 고객등 회사에 대해 간단히 소개해주세요.","changePassword":{"title":"비밀번호 변경","description":"새 비밀번호는 8자 이상이어야 합니다.","otherDevicesNotice":"비밀번호를 변경하면 다른 모든 기기에서 로그아웃돼요. 이 기기는 그대로 유지돼요.","currentPassword":"현재 비밀번호","currentPasswordPlaceholder":"현재 비밀번호를 입력해주세요","newPassword":"새 비밀번호","newPasswordPlaceholder":"새 비밀번호를 입력해주세요","confirmNewPassword":"새 비밀번호 확인","confirmNewPasswordPlaceholder":"새 비밀번호를 다시 입력해주세요","change":"비밀번호 변경","cancel":"취소","validation":{"currentPasswordRequired":"현재 비밀번호를 입력해주세요.","newPasswordRequired":"새 비밀번호를 입력해주세요.","passwordMinLength":"비밀번호는 8자 이상이어야 합니다.","confirmPasswordRequired":"비밀번호 확인을 입력해주세요.","passwordMismatch":"비밀번호가 일치하지 않습니다."},"toast":{"success":"비밀번호가 변경되었어요","otherDevicesLoggedOut":"다른 기기에서 모두 로그아웃됐어요","error":"비밀번호 변경에 실패했어요"}}},"calendar":{"title":"캘린더 관리","addCalendar":"캘린더 추가","google":"Google","msOutlook":"MS Outlook","connect":"연동하기","notConnected":"아직 연동되지 않았어요","activate":"사용하기","myCalendars":"내 캘린더","otherCalendars":"다른 캘린더","noTitle":"(제목 없음)","connectionExpired":"연동 만료됨","insufficientScope":"캘린더 권한 필요","connectionBlocked":"캘린더 접근 차단됨","reconnect":"다시 연동하기","disconnectButton":"연동 해제하기","connectedAccounts":"{{count}}개 계정 연동됨","addAccount":"계정 추가하기","welcome":{"title":"매번 티로 켜기 잊으시나요?","subtitle1":"캘린더 연동하고","subtitle2":"미팅 15분 전에 알림 받으세요"},"disconnectDialog":{"title":"캘린더 연동을 해제하시겠습니까?","cancel":"취소","confirm":"해제하기"},"toast":{"disconnectSuccess":"캘린더 연동이 해제되었습니다","disconnectError":"연동 해제에 실패했습니다","updateError":"캘린더 설정 변경에 실패했어요"},"bannerTitle":"오늘 미팅을 한눈에","bannerDescription":"캘린더를 연동해보세요","hideBanner":"숨기기"},"person":{"title":"대화 참석자 관리","description":"대화에 참석하는 사람들의 이름과 이메일을 저장해보세요. 티로가 이름을 기억하고 더 정확하게 기록할 수 있어요.","error":{"nameOrEmailRequired":"이름 또는 이메일을 입력해주세요"},"toast":{"tagAlreadyExists":"이미 등록된 인물이에요. 목록에서 기존 인물을 확인해 주세요.","tagCreateError":"참석자를 등록하지 못했어요. 다시 시도해 주세요.","tagAddError":"태그 추가에 실패했어요","tagRemoveError":"태그 삭제에 실패했어요","tagUpdateError":"태그 수정에 실패했어요"},"add":"참석자 추가","empty":"등록된 참석자가 없습니다."},"wordMemory":{"title":"단어장 관리","description":"중요한 고유명사, 사람 이름, 제품 이름 등을 추가해 보세요. 티로가 대화 기록 시 이 단어들을 정확하게 기록해드려요.","noWords":"등록된 단어가 없어요","addWord":"새 단어 추가 (쉼표로 구분하면 여러 단어를 한 번에 추가할 수 있어요)","duplicateWord":"이미 등록된 단어입니다","deleteAriaLabel":"{{word}} 삭제","editAriaLabel":"단어 편집","editPronunciationAriaLabel":"발음 편집","editNotationAriaLabel":"표기 편집","phonetic":{"errors":{"pronunciationRequired":"발음을 입력해주세요","pronunciationInvalid":"올바른 발음 형식을 입력해주세요 (예: 히라가나, 병음)","notationRequired":"표기를 입력해주세요","notationInvalid":"올바른 표기 형식을 입력해주세요 (예: 한자)"},"placeholders":{"pronunciation":"발음 (예: ひらがな, pinyin)","notation":"표기 (예: 漢字, 汉字)"}},"tabs":{"regular":"일반 단어장 ({{count}})","phonetic":"발음+표기 단어장 ({{count}})"},"tooltips":{"regular":"영어 고유명사, 사람 이름, 브랜드명 등 발음과 표기가 동일한 단어를 저장해요.\\n예: Tiro, ChatGPT와 같은 AI 서비스명, Evan, Lucy등의 이름,\\nThePlato, Microsoft와 같은 회사명, 제품명, 프로젝트명 등","phonetic":"일본어, 중국어처럼 발음과 표기가 다른 언어의 단어를 저장해요.\\n예:일본어: ひらがな (발음) - 漢字 (표기)\\n중국어: pinyin (발음) - 汉字 (표기)"},"toast":{"createError":"단어 추가에 실패했어요","updateError":"단어 수정에 실패했어요","deleteError":"단어 삭제에 실패했어요","duplicateError":"이미 등록된 단어예요"}},"teamWordMemory":{"title":"워크스페이스 단어장 관리","description":"워크스페이스 내 구성원들에게 공통으로 적용되는 단어장이에요. 중요한 고유명사, 사람 이름, 제품 이름 등을 추가해 보세요. 티로가 대화 기록 시 이 단어들을 정확하게 기록해드려요.","noWords":"등록된 단어가 없어요","addWord":"새 단어 추가 (쉼표로 구분하면 여러 단어를 한 번에 추가할 수 있어요)","duplicateWord":"이미 등록된 단어에요."},"wordPack":{"entryButton":"분야별 단어 추가","title":"분야별 단어장","subtitle":"분야를 고르면 자주 잘못 적히는 용어를 한 번에 넣어드려요.","packs":{"business":"경영 · 경제","law":"법학 · 로스쿨","medicine":"의학 · 간호","engineering":"공학 일반","itDev":"IT · 개발","marketing":"마케팅 · 광고","finance":"금융 · 투자","hr":"인사 · 조직"},"reviewSubtitleAll":"단어 {{total}}개를 넣어요. 이미 있는 단어는 건너뛰어요.","reviewSubtitle":"{{total}}개 중 {{selected}}개를 넣어요. 이미 있는 단어는 건너뛰어요.","selectedCount":"{{count}}개 선택","pairNote":"발음+표기 단어장에 {{count}}개를 넣어요","submit":"단어장에 넣기","fallbackHint":"찾는 분야가 없다면 '파일 업로드' 기능을 통해 자료를 올려서 직접 뽑을 수 있어요.","selectWord":"{{word}} 선택","deselectWord":"{{word}} 제외","toast":{"added":"단어 {{count}}개를 넣었어요","alreadyAdded":"이미 모두 등록된 단어예요"}},"wordFileUpload":{"upload":"파일 업로드","title":"파일에서 핵심단어 추출","subtitle":"티로가 핵심단어들을 추출해서 단어장에 추가해드려요.","uploadPrompt":"파일을 업로드하세요","uploadDragDrop":"또는 이곳에 드래그 앤 드롭하세요","supportedTypes":"지원 포맷: 문서/이미지/음성/동영상","maxFileSizeShort":"최대 {{size}}","maxFiles":"최대 파일 개수 {{max}}개","maxExtractedWords":"파일당 최대 100개 키워드 추출 가능","selectFile":"파일 선택","selectedAction":"{{count}}개 파일에서 추출하기","extractingInProgress":"단어 추출 중입니다...","extractedWordsCount":"추출된 단어 ({{count}}개)","selectAll":"전체 선택","deselectAll":"전체 해제","inputPlaceholder":"직접 입력 ↵","manualError":{"inputRequired":"단어를 입력하세요","tooLong":"단어가 너무 길어요","duplicate":"이미 목록에 있어요"},"buttons":{"close":"닫기","addSelected":"선택 단어 추가","retry":"다시 시도"},"errors":{"generic":"오류가 발생했어요.","extracting":"처리 중 오류가 발생했어요.","addWords":"단어 추가 중 오류가 발생했어요.","workspaceNotSelected":"워크스페이스를 먼저 선택해주세요."},"rejected":{"unableToUpload":"업로드할 수 없는 파일이 포함되어 있어요.","tooManyFiles":"한번에 최대 {{max}}개까지 업로드할 수 있어요.","fileTooLarge":"파일 용량이 너무 커요 (최대 {{size}}).","invalidType":"지원되지 않는 파일 형식이에요."}},"team":{"stats":{"seatsLabel":"좌석","membersLabel":"구성원","pendingLabel":"초대 대기"},"member":{"memberList":"구성원 목록","role":"역할","roleChangeWarning":{"title":"유료 역할로 변경하시겠어요?","description":"<currentRole>{{currentRole}}</currentRole>에서 <newRole>{{newRole}}</newRole>으로 변경하면 유료 역할로 전환돼요.","billingInfo":"월 $29의 유료 좌석이 추가되고, 남은 기간 요금은 일할 계산되어 다음 청구서에 반영돼요.","learnMore":"자세히 보기","confirm":"변경"}},"quota":{"usage":"사용량","unlimited":"무제한","minutesUsed":"분 사용","minutes":"분","remaining":"남음","viewDetails":"상세보기","backToBilling":"플랜 관리","detailViewTitle":"사용량 상세 조회","granularityOptions":{"daily":"일별","weekly":"주별","monthly":"월별"},"startDate":"시작 날짜","endDate":"끝나는 날짜","usageChart":"사용량","period":"기간","showDataTable":"데이터 표 보기","hideDataTable":"데이터 표 숨기기","loading":"로딩 중...","noData":"데이터가 없습니다","dateRangeValidation":"시작 날짜는 끝나는 날짜보다 빨라야 합니다","memberUsage":"구성원별 사용량","memberName":"이름","noteCount":"노트 수","recordingMinutes":"녹음 시간","accumulated":"누적","export":{"button":"내보내기","exporting":"내보내는 중...","sectionTotals":"선택 기간 합계","sectionTimeseries":"기간별 리포트","memberBreakdown":"구성원별 합계","timeseries":"전체","memberTimeseries":"구성원별","cumulativeChip":"누적","cumulativeHint":"누적이 켜져 있어요.\\n선택한 기간 전체를 하나로 합산한 CSV가 다운로드돼요.","success":"CSV 파일이 다운로드되었어요","error":"내보내기에 실패했어요. 다시 시도해주세요"}},"teamPlanActivated":"팀 플랜 사용중"},"welcome":{"close":"닫기","cta":"시작하기","title":"{{firstName}}님의 {{planName}} 플랜이 활성화되었어요","userFallback":"고객","greeting":"안녕하세요! 티로의 유료 구독자가 되신 것을 진심으로 환영해요.","features":{"title":"티로 {{planName}} 플랜에서는 다음과 같은 기능을 이용하실 수 있어요","lite":{"recording":"<b>매달 300분</b>의 실시간 구조화된 대화 기록과 문단별 고품질 요약","duration":"<b>노트당 기록 제한 해제</b>"},"pro":{"recording":"<b>매달 1,000분</b>의 실시간 구조화된 대화 기록과 문단별 고품질 요약","duration":"<b>노트당 기록 제한 해제</b>"},"max":{"recording":"<b>무제한</b> 실시간 구조화된 대화 기록과 문단별 고품질 요약","duration":"<b>노트당 기록 제한 해제</b>"},"team":{"recording":"<b>무제한</b> 실시간 구조화된 대화 기록과 문단별 고품질 요약","duration":"<b>노트당 기록 제한 해제</b>","consolidatedBilling":"구성원 관리와 통합 결제 지원","teamWordMemory":"워크스페이스 단어장으로 고유명사 인식 정확도 향상","teamSupport":"실시간 지원 및 문의 채널 제공"},"enterprise":{"recording":"<b>무제한</b> 실시간 구조화된 대화 기록과 문단별 고품질 요약","duration":"<b>노트당 기록 제한 해제</b>","consolidatedBilling":"구성원 관리와 통합 결제 지원","teamWordMemory":"워크스페이스 단어장으로 고유명사 인식 정확도 향상","teamSupport":"전담 지원 담당자 및 맞춤형 서비스 제공"}},"about":{"tiro":"티로는 로마의 집정관이자 웅변가인 키케로의 가장 친한 친구이자 <b>세계 최초의 속기사</b>로 알려져 있습니다. 티로 팀에서는 삶이 곧 중요한 대화의 연속인 분들이, 중요한 대화 상황에 더욱 집중하실 수 있도록 대화를 기록하고 구조화해 높은 품질로 요약하는 제품을 만들어 가고 있어요. 최초의 속기사인 티로를 존경하고 기리는 마음으로 제품에 티로라는 이름을 붙였습니다."},"feedback":{"request":"현재 티로를 어떻게 사용하고 계신가요? 20분 내외의 화상미팅을 통해 티로의 사용 경험을 듣고, 소중한 대화 상황에 딱 들어맞는 제품이 될 수 있도록 돕고 싶습니다. 또한 티로의 다양한 기능을 쉽게 활용하실 수 있도록 알려드리고 싶어요.","schedule":"일정 예약 링크에서 편하신 시간을 선택해주세요","surveyLink":"https://tally.so/r/woxK5b","survey":"혹은 <a href='{{surveyLink}}' target='_blank'>1분 이내의 설문 참여</a>를 통해 이야기를 들려주셔도 좋습니다"},"closing":{"thanks":"티로의 고객이 되어 주셔서 감사합니다.","farewell":"오늘도 따뜻한 하루 보내세요 :)"},"signature":{"name":"Marcus Tullius Tiro","sincerely":"Tiro 드림"}},"referral":{"title":"티로를 선물하고 최대 $8 리워드 받기","thinkOfSomeone":"티로가 필요한 친구를 떠올려보세요","eyebrow":"티로 선물하기","badge":"새로운 리워드","headline":"티로 Pro 1개월 선물하고 최대 $8 할인 받으세요","headlineHighlighted":"티로 Pro 1개월 선물하고<br />최대 <hl>$8 할인</hl> 받으세요","emailDivider":"또는 이메일로 초대하기","description":"친구가 10분 이상 기록하면 $3, 첫 유료 결제를 마치면 $5가 더 적립돼요.","activationRewardTitle":"친구가 10분 이상 기록하면 <amt>$3</amt>","activationRewardDescription":"첫 기록을 완료하면 바로 적립돼요.","paidRewardTitle":"친구가 첫 유료 결제하면 <amt>$5</amt>","paidRewardDescription":"결제 후 7일이 지나면 적립돼요.","rewardTiming":"적립된 리워드는 다음 결제부터 자동으로 사용돼요.","termsCaption":"리워드 적립·사용에 관한 자세한 규칙은 <termsLink>티로 선물하기 리워드 이용 조건</termsLink>에서 확인할 수 있어요.","linkTitle":"초대 링크 보내기","linkLabel":"내 초대 링크","linkLoading":"초대 링크를 불러오는 중이에요","linkUnavailable":"초대 링크를 불러오지 못했어요","rewardAppliedAutomatically":"이 링크로 가입하면 프로 플랜 1개월 할인 혜택을 받을 수 있어요.","name":"이름","namePlaceholder":"김티로","email":"이메일","emailPlaceholder":"friend@company.com","emailTitle":"이메일로 초대하기","sendInvite":"초대 메일 보내기","sendInviteShort":"보내기","inviteSendFailed":"초대 메일을 보내지 못했어요. 다시 시도해 주세요.","shareDirectly":"아래 링크를 직접 공유하실 수도 있어요","copyLink":"초대 링크 복사","linkCopied":"링크 복사 완료","copyFailed":"링크를 복사하지 못했어요. 다시 시도해 주세요.","statsTitle":"내 초대 현황","statsDescription":"초대가 만들어 낸 결과를 한눈에 확인하세요.","joinedFriends":"가입한 친구","joinedFriendsDescription":"내 링크로 가입을 완료한 인원이에요.","currentReward":"사용 가능한 리워드","currentRewardDescription":"웹에서 플랜 결제 시 자동으로 사용돼요.","rewardLockedCaption":"앱에서 결제한 구독에는 리워드 적용이 불가능해요. 웹 결제 전환은 고객센터로 문의해 주세요.","personUnit":"명"},"teamGuide":{"title":"구성원 관리 가이드","description":"워크스페이스 구성원 관리에 필요한 기능들을 설명해 드릴게요.","tabs":{"roles":"역할 안내","invite":"팀원 초대하기","removal":"구성원 내보내기"},"roles":{"title":"구성원에는 4가지 역할이 있어요","noteView":"노트 조회","noteEdit":"노트 생성 및 편집","billing":"과금","teamManagement":"구성원 관리","billingNote1":"노트를 생성 및 편집하려면 유료 좌석을 차지해야 하며, 이 경우 과금이 발생합니다.","billingNote2":"Unpaid Admin과 Viewer는 노트를 생성 및 편집 할 수 없으며, 과금 대상이 아닙니다.","billingNote3":"Admin과 Member는 각각 월 $29의 유료 시트를 사용합니다.","billingNote4":{"prefix":"자세한 내용은","link":"이곳","suffix":"을 참고하세요"}},"invite":{"title":"관리자 권한이 있어야 팀원을 초대할 수 있어요","requiredInfo":{"title":"필수 정보","emailLabel":"이메일","emailDescription":"(초대 메일이 발송돼요)","emailPlaceholder":"marcus@gmail.com"},"optionalInfo":{"title":"선택 항목","memoLabel":"메모","memoDescription":"(소속, 직무 등)","memoPlaceholder":"마케팅, 디자인 담당"},"process":{"title":"초대 프로세스 안내","items":["초대가 완료되면 사용자에게 이메일이 전송되고, 초대를 수락하면 바로 멤버로 등록돼요.","멤버를 추가로 초대하면, 초대를 수락한 시점부터 유료 좌석이 추가되고 남은 기간 요금은 일할 계산되어 다음 청구서에 반영돼요.","초대 메일을 다시 보내려면 대기 중인 초대를 취소한 뒤 다시 초대하면 돼요."]}},"removal":{"title":"관리자 권한이 있어야 구성원을 내보낼 수 있어요","afterRemoval":{"title":"구성원 내보내기 이후 발생하는 일","items":["해당 구성원은 즉시 팀 플랜에서 제외돼요.","워크스페이스 단어장 같은 공용 기능에 접근할 수 없고, 팀 플랜 혜택을 적용받을 수 없어요.","이미 결제하신 현재 주기 요금은 그대로 유지되고, 남은 기간에 대한 환불이나 차감은 없어요.","줄어든 인원 수는 다음 결제일부터 청구에 반영돼요."]},"memberData":{"title":"내보낸 구성원의 데이터","items":["내보낸 사용자가 기록한 노트는 삭제되지 않고 사용자의 계정에 남아요. 팀 플랜에서 제외되었더라도 여전히 기록된 노트에 접근할 수 있어요.","공유 콘텐츠(공용 단어장, 공용 템플릿 등)는 삭제되지 않고 워크스페이스에 남아요. 내보낸 사용자는 공유 콘텐츠에 접근할 수 없어요.","해당 사용자가 노트에 다른 팀원을 공동작업자로 초대했다면 초대된 팀원도 해당 노트에 접근할 수 있어요."]}},"permissions":{"changeableTitle":"변경 가능","conditionTitle":"조건","possibilityTitle":"가능 여부","memberToAdmin":{"condition":"언제든 가능"},"adminToMember":{"condition":"언제든 가능"},"adminToCreator":{"condition":"이메일 인증 필요"},"creatorChange":{"title":"Creator 변경","condition":"퇴사/이관 시, Admin이 지정 가능 (서류 인증 필요 시 Tiro 지원)"},"caution":{"title":"주의사항","description":"Creator 권한을 변경하면 기존 Creator는 권한이 Admin으로 자동 변경됩니다."},"recovery":{"title":"계정 복구","description":"Creator가 실수로 계정을 삭제해도 7일 이내라면 복구가 가능해요."},"bestPractices":{"title":"권한 설정 모범 사례","items":["<span className=\\"font-medium\\">워크스페이스 생성 시</span> 신중하게 Creator를 지정하세요.","<span className=\\"font-medium\\">조직 구조에 맞게</span> Admin과 Member를 적절히 분배하는 것이 좋습니다.","<span className=\\"font-medium\\">권한 변경 전</span> 해당 사용자에게 미리 알려 혼란을 방지하세요."]}}},"plans":{"recordingOveragePlanChangeTooltip":"추가 기록 사용 중에는 플랜을 변경할 수 없어요.","upgradeCta":{"paid":{"cta":"팀 플랜으로 업그레이드","ctaMax":"맥스로 업그레이드","ctaPro":"프로로 업그레이드","ctaMaxStart":"맥스로 시작하기"}},"lockedForTeam":"다른 구성원과 함께 이용 중인 워크스페이스에서는 팀 플랜만 구독이 가능해요.","teamUpgradeInAppGuide":{"title":"팀 플랜은 PC 결제로만 시작할 수 있어요","description":"현재 모바일 인앱결제로 개인 플랜을 구독 중이라 팀 플랜 결제를 바로 진행할 수 없어요. 아래 방법 중 하나로 진행해 주세요.","option1":"모바일 앱에서 인앱결제를 해지하고 구독이 만료된 다음, PC에서 팀 플랜을 다시 구독해 주세요.","option2":"새로운 워크스페이스를 만들어 팀 플랜을 구독해 주세요.","option3":"위 방법이 어려우면 고객 문의로 도움을 요청해 주세요.","contactSupport":"고객 문의하기"},"currencyToggle":{"label":"결제 통화","usd":"달러 (USD)","krw":"원화 (KRW)","jpy":"엔화 (JPY)"},"currencyCheckoutLink":{"lockedFallback":"이 계정은 해외 카드(USD) 결제로 설정되어 있어 USD로 진행합니다."}}}`,
  ),
  R = {
    subscribePlan: "플랜 구독하기",
    managePlan: "플랜 관리",
    deleteLabelTitle: "폴더 삭제",
    deleteLabelMessage:
      "이 폴더를 삭제하시겠어요? 폴더가 지정된 노트는 유지되지만, 폴더는 영구적으로 삭제돼요.",
    deleteLabelHasChildrenWarning:
      "이 폴더에는 하위 폴더가 있어요. 하위 폴더를 먼저 삭제해야 이 폴더를 삭제할 수 있어요.",
    deleteLabelConfirm: "폴더 삭제",
    deleteLabelCancel: "취소",
  },
  N = JSON.parse(
    `{"removeParticipant":"참석자 삭제","diarizationFailed":{"title":"화자 분리를 완료하지 못했어요","description":"스크립트는 그대로 사용할 수 있어요.\\n도움이 필요하면 오른쪽 아래 고객 문의를 열어 주세요."},"create":{"failed":"노트 생성에 실패했어요","permissionDenied":{"title":"기록 권한이 없어요","description":"이 워크스페이스에서 노트를 생성하거나 기록을 시작할 권한이 없어요. 관리자에게 권한 변경을 요청해 주세요."},"restrictNonOrgWorkspace":{"title":"이 워크스페이스에는 새 노트를 만들 수 없어요","description":"조직 워크스페이스에서만 새 노트를 만들 수 있어요.\\n조직 워크스페이스를 선택한 뒤 다시 시도해 주세요."}},"item":{"label":"노트","collaborators":{"moreCount":"외 {{count}}명"}},"tooltip":{"close":"닫기","openInFullView":"전체 보기"},"endNote":{"button":"기록 종료","tooltip":"기록을 종료하면 한페이지 문서가 생성돼요.\\n한번 종료되면 다시 기록을 재개할 수 없어요."},"bulk":{"selectedCount":"{{count}}개 노트 선택","more":"더보기","clearSelection":"선택 해제","deleteAll":"노트 삭제","downloadAll":"노트 다운로드","download":{"title":"다운로드","description":"선택된 <b>{{count}}개</b>의 노트를 다운로드합니다","note":"요약","transcript":"스크립트","onePager":"한페이지 문서","success":"{{count}}개의 노트를 다운로드했어요","error":"노트 다운로드에 실패했어요"},"delete":{"title":"삭제","description":"선택된 {{count}}개의 노트를 정말 삭제하시겠어요? 이 작업은 되돌릴 수 없어요.","confirm":"삭제","cancel":"취소","deleting":"삭제 중...","success":"{{count}}개의 노트가 삭제되었어요","error":"노트 삭제에 실패했어요"},"move":{"title":"옮기기","description":"선택된 {{count}}개의 노트를 옮깁니다","selectFolder":"폴더를 선택하세요","success":"{{count}}개의 노트가 이동되었어요","partialSuccess":"{{successCount}}개의 노트가 이동되었고, {{failCount}}개는 실패했어요","error":"노트 이동에 실패했어요. 다시 시도해주세요.","workspace":{"empty":"다른 워크스페이스가 없어요","selectPrompt":"워크스페이스를 선택하세요"},"button":{"cancel":"취소","move":"이동"}},"action":{"addToFolder":"폴더에 추가","moveToWorkspace":"워크스페이스 이동"},"addToFolder":{"title":"폴더에 추가","description":"선택한 노트 <b>{{count}}개</b>를 폴더에 추가해요","save":"저장","empty":"아직 폴더가 없어요","success":"노트 {{count}}개를 폴더에 추가했어요","partialError":"일부 노트를 폴더에 추가하지 못했어요","error":"폴더 추가에 실패했어요. 다시 시도해주세요."},"moveToWorkspace":{"title":"워크스페이스 이동","description":"선택한 노트 <b>{{count}}개</b>를 다른 워크스페이스로 이동해요.\\n현재 워크스페이스에서는 사라져요.","current":"현재","move":"이동"}},"topbar":{"lang":{"title":"언어 설정","listen":"대화","listenCaption":"참여자들이 말하는 언어","write":"기록","writeCaption":"노트가 저장될 언어","footnote":"BETA 언어는 인식 품질이 정식 출시 언어 대비 낮을 수 있습니다"},"record":{"startRealtime":"실시간 기록 시작","startRealtimeCaption":"실시간으로 대화를 기록하고 AI가 자동으로 변환해요","startOffline":"오프라인 녹음 시작","startOfflineCaption":"인터넷 연결 없이 녹음하고 나중에 노트로 변환해요","uploadFile":"파일 업로드","uploadFileCaption":"기존 음성 파일을 업로드하면 대화 기록으로 자동 변환돼요"}},"sidebar":{"title":"메뉴","open":"메뉴 열기"},"folder":{"allNotes":"모든 노트","trash":"삭제된 노트","sharedNotes":"공유받은 노트","inbox":"임시 보관함","inboxDescription":"폴더가 설정되지 않은 노트들이에요","privateMasked":"비공개 폴더","accessDenied":{"title":"접근 권한이 없는 폴더예요."},"addToFolder":"폴더에 추가하기","viewerCannotChange":"공유받은 노트는 폴더 위치를 지정하거나 변경할 수 없어요","addChip":"폴더","usage":{"warning":"곧 한도에 도달해요"},"upgrade":{"cta":"Pro로 업그레이드"},"section":{"private":"PRIVATE","workspace":"WORKSPACE"},"favorites":{"section":"FAVORITES","add":"즐겨찾기에 추가","remove":"즐겨찾기 해제","loadError":"즐겨찾기를 불러오지 못했어요","toast":{"addError":"즐겨찾기에 추가하지 못했어요. 다시 시도해 주세요.","removeError":"즐겨찾기를 해제하지 못했어요. 다시 시도해 주세요."}},"expand":"펼치기","collapse":"접기","teamInviteNudge":{"tooltip":"팀원을 워크스페이스에 초대하면, 워크스페이스 폴더에 추가해둔 노트들을 자동으로 함께 공유할 수 있어요.","cta":"팀원 초대하기"},"create":{"title":"폴더 생성","subtitle":"아래 템플릿을 사용하면 쉽게 폴더를 만들 수 있어요","titleAndIcon":"폴더 제목","namePlaceholder":"구분하기 쉬운 폴더 이름을 입력해주세요","description":"설명","descriptionPlaceholder":"폴더의 목적을 잘 드러내는 설명을 입력해주세요","access":"접근 권한","create":"폴더 생성하기","cancel":"취소","createSubfolderUnder":"하위 폴더로 생성"},"tab":{"info":"폴더 정보","automation":"자동화 설정"},"config":{"popover":{"edit":"폴더 설정","view":"폴더 정보","delete":"폴더 삭제","move":"폴더 이동","cannotAccess":"이 폴더 정보를 확인할 권한이 없어요","cannotAddNote":"이 노트를 폴더에 추가하려면 노트 편집 권한이 필요해요","cannotEditFolder":"이 폴더에 노트를 추가하려면 폴더 편집 권한이 필요해요","createSubfolder":"하위 폴더 생성"}},"creator":{"createdByMe":"내가 만든 폴더","creator":"폴더 소유자"},"settings":{"title":"폴더 설정"},"view":{"title":"폴더 정보"},"template":{"userInterview":"유저 인터뷰","userInterviewDescription":"{{}}와의 인터뷰에서 나온 이야기와 인사이트를 모아둡니다.","projects":"프로젝트","projectsDescription":"{{}} 프로젝트의 모든 것 - 회의부터 결정사항까지 한눈에 봅니다.","salesMeeting":"세일즈 미팅","salesMeetingDescription":"고객과의 만남에서 나눈 대화와 영업 포인트를 기록합니다.","teamMeeting":"팀 미팅","teamMeetingDescription":"{{}} 팀이 함께 나눈 이야기들을 차곡차곡 쌓아둡니다.","oneOnOne":"1 on 1","oneOnOneDescription":"{{}}와 나눈 솔직한 대화와 피드백을 담아둡니다.","lectureNotes":"강의 노트","lectureNotesDescription":"{{}} 강의에서 배운 내용들을 차근차근 정리해둡니다.","coffeeChat":"커피챗","coffeeChatDescription":"{{}}와의 편안한 대화 속에서 나온 좋은 이야기들을 기억합니다."},"access":{"private":"비공개","sharedWithDescription":"특정 팀원이나 외부 사용자와 공유되었어요","sharedBadge":"공유 폴더","allTeamMembersReadonly":"팀 내의 모든 구성원에게 공유하기 (읽기 전용)","allTeamMembersEditor":"팀 내의 모든 구성원에게 공유하기 (편집자)","specificMembers":"팀 내의 특정 구성원에게만 공유하기","searchMembers":"팀원 찾아보기","teamMember":"팀원","inviteEmail":"이메일로 초대하기","noMembers":"공유할 팀원이 없어요","noSearchResults":"검색 결과가 없어요"},"search":{"placeholder":"폴더 검색","noResults":"검색 결과가 없어요","section":"폴더"},"empty":"폴더가 없어요","success":{"created":"폴더가 생성되었어요","deleted":"폴더가 삭제되었어요"},"move":{"title":"{{folderName}} 이동","currentLocation":"현재 위치","selectLocation":"경로를 표시할 폴더의 위치를 선택하세요","button":{"cancel":"취소","move":"이동"},"selectedLocation":"선택된 위치","success":"폴더가 이동되었어요","error":{"circularReference":"폴더를 자기 자신의 하위 폴더로 이동할 수 없어요","notFound":"폴더를 찾을 수 없어요","forbidden":"폴더를 이동할 권한이 없어요","maxDepthReached":"폴더 깊이가 최대 5단계를 초과할 수 없어요","failed":"폴더 이동에 실패했어요. 다시 시도해주세요."}},"error":{"duplicatePersonalFolder":"이미 존재하는 이름이에요. 다른 이름을 입력해주세요.","duplicateTeamFolder":"이미 존재하는 이름이에요. 다른 이름을 입력해주세요.","createFailed":"폴더 생성에 실패했어요. 다시 시도해주세요.","maxDepthReached":"더 이상 하위 폴더를 생성할 수 없어요"},"automation":{"config":{"success":{"update":"폴더 설정이 업데이트되었어요","delete":"폴더 설정이 삭제되었어요"},"error":{"update":"폴더 설정 업데이트에 실패했어요","delete":"폴더 설정 삭제에 실패했어요"}},"description":"폴더별로 노트 정보와 공유 옵션을 자동화할 수 있어요.\\n폴더에서 새 노트를 만들면, 이곳에서 지정해둔 노트 정보들이 기본으로 적용돼요.\\n또한, 노트의 기록이 종료되었을 때 어떤 맞춤문서를 자동으로 생성할 지 설정할 수 있어요.","noteSettings":"노트 설정","noteTitle":"제목","noteTitlePlaceholder":"폴더 내 새 노트의 기본 제목","participants":"참석자","participantsSearchPlaceholder":"참석자 이름 또는 이메일 입력","participantsAdd":"추가","participantsAddAsEmail":"이메일로 추가","participantsAddAsName":"이름으로 추가","participantsSearchNoResults":"검색 결과가 없습니다","customDocument":"맞춤문서","templateSelect":"선택해 주세요","templateSearchPlaceholder":"템플릿 검색","templateSearchEmpty":"검색 결과가 없어요.","selectedTemplates":"{{title}} 외 {{count}}개","templateSelected":"선택됨","templateNotSelected":"선택 안 됨","autoShareSettings":"자동 공유 설정 (선택)","saving":"저장 중...","noteSettingsDescription":"이 폴더에서 새 노트가 만들어질 때 자동 적용","addTrigger":"연동 추가하기"},"toast":{"createError":"폴더 생성에 실패했어요","deleteError":"폴더 삭제에 실패했어요","deleteErrorHasChildren":"하위 폴더가 있어 삭제할 수 없어요. 하위 폴더를 먼저 삭제해주세요.","updateError":"폴더 수정에 실패했어요","noteAddError":"노트를 폴더에 추가하지 못했어요","noteRemoveError":"노트를 폴더에서 삭제하지 못했어요","userAddError":"구성원 추가에 실패했어요","userRemoveError":"구성원 삭제에 실패했어요","userUpdateError":"권한 변경에 실패했어요","userUpdateNotSharable":"공유 권한이 없는 노트가 있어요","userUpdateNotSharableDescription":"이 폴더에 내가 공유할 수 없는 노트가 포함되어 있어 권한을 변경할 수 없어요. 기존 폴더 소유자나 편집자에게 권한 변경을 요청해 주세요.","createForbidden":"폴더를 만들 권한이 없어요. 관리자에게 권한 변경을 요청해 주세요.","deleteForbidden":"폴더를 삭제할 권한이 없어요. 관리자에게 권한 변경을 요청해 주세요.","updateForbidden":"폴더를 수정할 권한이 없어요. 관리자에게 권한 변경을 요청해 주세요.","noteAddForbidden":"노트를 폴더에 추가할 권한이 없어요. 관리자에게 권한 변경을 요청해 주세요.","noteAddNotePermissionForbidden":"이 노트를 폴더에 추가하려면 노트 편집 권한이 필요해요.\\n노트 소유자에게 권한을 요청해 주세요.","noteAddFolderPermissionForbidden":"이 폴더에 노트를 추가하려면 폴더 편집 권한이 필요해요.\\n폴더 소유자에게 권한을 요청해 주세요.","noteRemoveForbidden":"노트를 폴더에서 삭제할 권한이 없어요. 관리자에게 권한 변경을 요청해 주세요.","userUpdateForbidden":"폴더 접근 권한을 변경할 권한이 없어요. 관리자에게 권한 변경을 요청해 주세요."}},"delete":"삭제하기","audio":{"toggle":{"tooltip":"음성 재생하기"}},"translate":{"toggle":{"tooltip":"번역된 스크립트 보기"}},"creatorMode":{"note":"요약","transcript":"스크립트","withTranscript":"요약과 스크립트","document":"문서","generateNote":"맞춤 문서 생성"},"detailTab":{"document":"문서","transcript":"원본","summary":"요약","script":"스크립트"},"documentTab":{"thisNotesDocuments":"이 노트의 문서","recommendedTemplates":"추천 템플릿","allTemplates":"모든 템플릿 보기","createNewTemplate":"새 템플릿 만들기","regenerateDocument":"문서 다시 생성","deleteDocumentWithName":"'{{templateName}}' 문서 삭제","deleteLanguageVersion":"이 {{language}} 버전 삭제","deleteTemplateDocuments":"'{{templateName}}' 문서 전체 삭제","selectTemplate":"문서 생성하기","generatedLanguages":"생성된 언어","availableLanguages":"다른 언어로 생성","deletedTemplateTooltip":"템플릿이 삭제되어 이 템플릿으로 다시 생성할 수 없어요.","generateDisabledTooltip":"대화 내용이 생긴 뒤 일시정지하거나 녹음을 종료하면 문서를 만들 수 있어요.","showCitations":"레퍼런스 보기"},"documentEmpty":{"activeTitle":"녹음 종료 시 자동으로 문서가 생성돼요","activeDefaultDescription":"자동 생성 템플릿: {{templateNames}}","activeAutomationDescription":"생성 예정 문서: {{templateNames}}","activeDescription":"녹음이 끝나면 바로 확인할 수 있어요.","endedTitle":"문서를 생성하고 있어요","endedDescription":"생성 중인 문서: {{templateNames}}","endedSubDescription":"준비되는 대로 여기에서 확인할 수 있어요.","configuredTemplates":"폴더 자동화 문서","noTemplateTitle":"자동 생성 예정인 문서가 없어요","noTemplateDescription":"내용이 있는 상태로 일시정지하거나 녹음을 종료한 뒤 문서 생성하기에서 원하는 템플릿을 선택할 수 있어요.","pausedTitle":"지금까지의 대화로 문서를 만들어볼 수 있어요","pausedDefaultDescription":"자동 생성 템플릿: {{templateNames}}","pausedAutomationDescription":"생성 예정 문서: {{templateNames}}","pausedDescription":"지금 문서를 만들고 녹음은 계속 이어갈 수 있어요.","generateNow":"지금 문서 생성하기"},"trash":{"empty":"삭제된 노트가 없어요.","restore":"복구","permanentDelete":"영구 삭제","permanentDeleteTitle":"노트를 영구 삭제할까요?","permanentDeleteMessage":"이 노트는 영구적으로 삭제되며 복구할 수 없어요.","permanentDeleteConfirm":"영구 삭제","deletedOn":"삭제일: {{date}}","daysUntilPurge":"{{count}}일 후 영구 삭제","purgeToday":"오늘 삭제 예정","emptyAll":"전체 삭제","emptyAllTitle":"삭제된 노트를 모두 영구 삭제할까요?","emptyAllMessage":"모든 노트가 영구 삭제되며, 이 작업은 되돌릴 수 없어요.","emptyAllConfirm":"모두 영구 삭제","emptyAllError":"전체 삭제에 실패했어요"},"list":{"mobileAppDownload":"모바일 앱 다운로드","giftTiro":"티로 선물하고 최대 $8 받기","deleteNoteTitle":"노트를 삭제할까요?","deleteNoteMessage":"삭제된 노트는 30일 동안 보관돼요. 보관 기간 중 언제든 복구할 수 있어요.","deleteNoteConfirm":"삭제","deleteNoteCancel":"취소","leaveNoteTitle":"공동 작업 노트에서 나가시겠어요?","leaveNoteMessage":"노트에서 나가시면 더 이상 접근이 불가능하며,\\n다시 참여하시려면 새로운 초대를 받으셔야 해요.","leaveNoteConfirm":"나가기","leaveNoteCancel":"취소","emptyFolder":{"title":"아직 작성된 노트가 없어요.","description":"이 폴더에 첫 번째 노트를 추가해보세요."},"emptyAllNotes":{"title":"아직 기록된 노트가 없어요.","description":"기록을 시작해 첫 노트를 만들어 보세요."},"emptyInbox":{"title":"임시 보관함이 비어있어요.","description":"어떤 폴더에도 속하지 않은 노트가 여기에 보여요."},"accessDenied":{"title":"접근 권한이 없는 폴더입니다.","description1":"관리자 권한으로 폴더 목록은 볼 수 있지만, 내부 노트는 확인할 수 없어요.","description2":"노트를 확인하려면 폴더 소유자에게 권한을 요청해 주세요."},"untitled":"제목 없는 노트"},"shared":{"emptyTitle":"공유받은 노트가 없어요.","emptyDescription":"다른 사용자가 노트를 공유하면 여기서 확인할 수 있어요."},"search":{"unified":{"placeholder":"노트와 폴더 검색","empty":"검색어를 입력하세요","noResults":"검색 결과가 없어요","dateFilter":"날짜","allDates":"전체 기간","foldersSection":"폴더","notesSection":"노트","hint":{"select":"선택","close":"닫기"}}},"audioReplay":{"loading":"음성을 준비하고 있어요.","expired":"보관 기간이 지나 이 음성은 다시 들을 수 없어요.","loadError":"음성을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.","play":"재생","pause":"일시 정지","seek":"재생 위치 이동","rewind":"10초 뒤로 이동","forward":"10초 앞으로 이동"},"paragraph":{"locked1":"무료 체험 중에는 노트당 50분까지만 대화 기록이 가능해요.","locked2":"하지만 대화 중간에 노트가 끊기지 않도록 기록을 중단하진 않았어요.","locked3":"플랜을 업그레이드하면 최대 300분까지 기록된 내용을 확인하실 수 있어요.","locked4":"걱정하지 마세요. 무료 체험 사용량에는 50분까지만 반영됩니다.","deleteParagraphTitle":"문단 삭제","deleteParagraphMessage":"이 작업은 되돌릴 수 없어요! 개인정보 보호를 위해, \\n이 문단과 관련된 모든 데이터가 영구적으로 삭제돼요.","deleteParagraphConfirm":"삭제","deleteParagraphCancel":"취소","selectedCount":"{{count}}개 선택","deleteSelected":"삭제","cancelSelection":"선택 취소","noEditPermission":"노트 편집 권한이 없습니다","selectMode":"단락 선택","selectParagraph":"선택","toast":{"updateError":"문단 수정에 실패했어요"}},"payToUnlock":{"recordingTitle":"무료 기록 시간을 넘었어요.","trialTitle":"티로 무료체험 중 D-{{days}}","body":"노트 후반부의 <b>스크립트 · 요약 · 번역 · Ask Tiro · 공유가 제한</b>돼요.","recordingCta":"구독하고 잠금 해제","endedCta":"구독 후 잠금 해제","collapse":"접기","expand":"펼치기","lockedMinutesTitle":"{{minutes}}분 분량의 대화가 잠겨 있어요.","expandedBody":"지금은 노트 후반부의 <b>요약・번역・Ask Tiro・공유</b>를 사용할 수 없어요.","upgradeIntro":"<b>Pro</b> 또는 <b>Max</b>로 업그레이드하면","benefit1":"<b>잠긴 발언과 결정 사항</b> 모두 <b>Unlock</b>","benefit2":"요약, 번역, Ask Tiro, 공유 <b>제한 해제</b>","benefit3":"노트당 <b>최대 300분</b>까지 끊김 없는 기록","benefit4":"<b>화자분리된 스크립트</b> 유지"},"upgradePlan":"플랜 업그레이드","detail":{"context":{"title":"맥락 입력","placeholder":"예시: AI 전문가의 '인공지능 미래 트렌드' 웨비나에 참석 중인 마케터입니다.\\n비전공자도 이해하기 쉽게 설명해주시고, AI 전문 용어는 영어와 한국어로 함께 알려주세요.","previousContexts":"이전 맥락 불러오기","addContextInSummary":"요약에 맥락 추가하기","fileUpload":{"title":"파일 업로드(최대 5개)","add":"첨부","dragText":"파일을 업로드해주세요\\npdf, image, text, md, csv","acceptedFormats":"pdf, image, text, md, csv","dragActiveText":"파일을 여기에 업로드하세요","limitReached":"최대 {{max}}개까지만\\n업로드 가능해요","uploadSuccess":"파일이 성공적으로 업로드되었어요.","uploadFailed":"파일 업로드에 실패했어요.","deleteSuccess":"파일이 안전하게 삭제되었어요.","deleteSuccessDescription":"파일이 성공적으로 제거되었습니다.","deleteFailed":"파일 삭제에 실패했어요.","deleteFailedDescription":"파일을 삭제하는 중 오류가 발생했습니다.","limitExceeded":"최대 {{max}}개까지만 업로드할 수 있어요.","fileSizeExceeded":"하나의 파일은 최대 20MB 까지만 업로드 가능해요.","pastedImageSuccess":"이미지가 업로드되었습니다","pastedImageFailed":"이미지 업로드에 실패했습니다","delete":"파일 삭제","pastedImageTooLarge":"이미지 크기가 너무 큽니다 (최대 20MB)","pastedImageLimitExceeded":"최대 {{max}}개까지 파일을 첨부할 수 있습니다","unsupportedImageFormat":"지원하지 않는 이미지 형식입니다","someFilesUnsupported":"지원하지 않는 형식의 파일은 제외했어요","toast":{"uploadError":"파일 업로드에 실패했어요","deleteError":"파일 삭제에 실패했어요","clearAllError":"파일 전체 삭제에 실패했어요"}}},"language":{"write":"기록 언어","listen":"대화 언어"},"microphone":{"blocked":{"title":"마이크 접근이 차단되어 있습니다.","description":"브라우저 설정에서 마이크 권한을 허용한 후 다시 시도해주세요."},"unavailable":{"title":"마이크를 시작하지 못했어요","description":"마이크 연결을 확인하고, Zoom·Google Meet·Teams 등 마이크를 쓰는 앱을 종료한 뒤 다시 시도해주세요. 계속되면 마이크를 다시 연결하거나 페이지를 새로고침해주세요."},"notFound":{"title":"사용할 수 있는 마이크를 찾지 못했어요","description":"마이크 연결과 시스템 입력 설정을 확인한 후 다시 시도해주세요."},"selectedDeviceUnavailable":{"title":"선택한 마이크를 사용할 수 없어요","description":"다른 마이크를 선택하거나 마이크 연결을 확인한 후 다시 시도해주세요."},"interrupted":{"title":"마이크 연결이 중단되었어요","description":"잠시 후 다시 시도해주세요."},"browserUnavailable":{"title":"현재 브라우저에서 마이크를 사용할 수 없어요","description":"다른 브라우저에서 tiro.ooo를 직접 열어 다시 시도해주세요."},"recordingInProgress":"대화 기록이 진행 중이에요. 대화 기록을 먼저 중단해 주세요.","deviceConnected":"{{deviceName}} 장치가 연결되었습니다.","gain":"마이크 감도"},"systemAudio":{"gain":"시스템 사운드","label":"시스템 오디오","tooltip":"화상회의, 동영상 등 컴퓨터에서 재생되는 소리를 녹음해요.","desktopApp":"데스크탑 앱","desktopCTASuffix":"에서 활성화하세요."},"screen":{"blocked":{"description":"시스템 설정에서 화면 공유 권한을 허용한 후 다시 시도해주세요.","title":"화면 공유가 차단되어 있어요."}}},"summary":{"writing":"대화 기록 중...","writingDescription":"한 문단이 완성되면, 스크립트의 내용이 더 정확해져요","retry":"문단 요약 다시 생성하기","toast":{"updateError":"요약 수정에 실패했어요"}},"share":{"more":"더보기","scopeRequired":"공유 링크 접근범위를 먼저 조정해 주세요","scopeRequiredDescription":"계정 설정의 기본 공유 범위가 '초대된 사람만'으로 설정돼 있어서, 범위를 변경해야 공유 링크를 만들 수 있어요.","linkDisabled":"링크 공유가 중지된 상태예요","linkDisabledDescription":"공유 범위를 선택하면 기존 링크가 다시 활성화돼요.","link":{"title":"링크 복사","rowTitle":"공유 링크","stateLive":"공유 링크가 켜져 있어요","stateStopped":"공유 링크가 중지돼 있어요","stateNone":"공유 링크가 없어요","accessTitle":"공유 범위","anyoneWithLink":"링크가 있는 모든 사용자","onlyMyCompany":"회사 구성원만","passwordProtected":"비밀번호로 보호","disabled":"링크 비활성화","show":"보기","hide":"숨기기","generating":"생성 중...","linkCopy":"링크 복사하기","linkCopyAria":"공유 링크 복사","linkCopied":"공유 링크가 복사되었어요."},"collaborator":{"title":"권한 설정","placeholder":"이름 또는 이메일로 검색","success":"{{email}}님을 노트에 초대했어요.","failed":"{{email}}님을 초대하지 못했어요. 다시 시도해주세요.","remove":"제거","button":"초대하기","addNewEmail":"새 이메일 추가","viewer":"읽기 전용","editor":"편집자","owner":"소유자","hasBeenRemoved":"님이 노트에서 삭제되었어요.","inviteAll":"{{count}}명 모두 초대하기","noTeamMembers":"초대할 팀원이 없어요","noCollaborators":"아직 초대된 팀원이 없어요","deleteCollaborator":"팀원 삭제","teamMembersInviteSuccess":"{{count}}명의 팀원을 초대했어요","teamMembersInviteFailed":"{{count}}명의 팀원 초대에 실패했어요","roleUpdateSuccess":"{{email}}님의 역할이 {{role}}(으)로 변경되었어요","roleUpdateFailed":"역할 변경에 실패했어요","nonMemberError":"팀 구성원이 아니어서 초대할 수 없어요","domainNotAllowedError":"허용되지 않은 워크스페이스 사용자예요","teamDirectory":"팀원 목록","add":"추가","noSearchResults":"검색 결과가 없어요","currentCollaborators":"초대된 사람들","toast":{"updateError":"공동작업자 변경에 실패했어요","deleteError":"공동작업자 삭제에 실패했어요"}},"createLink":{"button":"공유하기","success":"공유 링크를 만들었어요","failed":"링크 공유에 실패했어요. 다시 시도해 주세요.","linkSharingNotAllowed":"이 팀에서는 링크 공유하기가 허용되지 않아요.\\n관리자에게 문의해 주세요.","noteUnavailable":{"title":"공유에 필요한 노트 정보를 확인하지 못했어요.","description":"Esc 키로 현재 노트를 닫고, 노트 목록에서 공유할 노트를 다시 선택한 뒤 공유해 주세요."},"networkError":{"title":"티로 서버에 연결하지 못했어요.","description":"인터넷 연결을 확인한 뒤 다시 시도해 주세요."}},"includeShareLink":"공유 링크 첨부","includeShareLinkCreate":"공유 링크 만들기","includeShareLinkNeedsScope":"노트 공유 설정에서 공유 링크 접근범위를 먼저 조정해 주세요.","deleteLink":{"button":"공유 취소"},"slack":{"title":"슬랙으로 공유하기","to":"보낼 곳","searchChannelPlaceholder":"채널 검색","message":"메시지","messagePlaceholder":"노트와 함께 공유할 메시지를 입력해주세요...","threadContent":"스레드에 게시할 내용","optionalMessage":"채널 메시지 (선택 사항)","sendContentAsReplies":"선택한 내용을 Slack 스레드에 게시","post":"Slack으로 보내기","posting":"Slack으로 보내는 중...","success":{"description":"슬랙으로 보냈어요","open":"슬랙에서 보기"},"error":{"description":"슬랙으로 보내지 못했어요"},"noChannels":"채널을 찾을 수 없어요.","searching":"채널을 불러오는 중..."},"notion":{"title":"노션에 저장하기","parentPage":"저장 위치","destination":"저장 위치","searchDestinationPlaceholder":"페이지 또는 데이터베이스를 검색해주세요","page":"페이지","database":"데이터베이스","contentToInclude":"포함할 내용","create":"노션에 저장하기","success":{"description":"노션에 저장했어요","open":"노션에서 열기"},"error":{"description":"노션에 저장하지 못했어요","blockLimit":{"title":"선택한 내용이 너무 많아 노션에 저장하지 못했어요","description":"포함할 내용을 줄여 100개 블록 이하로 다시 시도해 주세요."}},"noPages":"검색 결과가 없어요","searching":"검색 중..."},"googleDrive":{"title":"Google Docs로 내보내기","connectedAccount":"연결된 계정","destination":"폴더","defaultFolder":"Tiro","willCreateFolder":"내 드라이브에 새로 만들어 저장해요","selectFolder":"폴더 선택","selectFolderOpensBrowser":"폴더 선택 창은 브라우저에서 열려요","saveAsDefault":"기본 폴더로 사용","contentToInclude":"포함할 내용","create":"내보내기","success":{"description":"‘{{folder}}’ 폴더로 내보냈어요","open":"Drive에서 열기"},"error":{"description":"Google Docs로 내보내지 못했어요.\\n잠시 후 다시 시도해 주세요"},"picker":{"error":"폴더 선택 창을 열지 못했어요.\\n잠시 후 다시 시도해 주세요"},"pickerPage":{"title":"Google Drive 폴더 선택","loading":"폴더 선택 창을 여는 중이에요","returning":"Tiro 앱으로 돌아가는 중이에요","error":"폴더 선택 창을 열지 못했어요. Tiro 앱에서 다시 시도해 주세요","openApp":"Tiro 앱 열기"}},"microsoftTeams":{"title":"Microsoft Teams에 공유하기","destination":"보낼 곳","channelDestination":"채널","directMessageDestination":"1:1 메시지","team":"팀","channel":"채널","recipient":"받는 사람","selectTeam":"팀을 선택해 주세요","selectChannel":"채널을 선택해 주세요","selectRecipient":"받는 사람을 선택해 주세요","selectTeamFirst":"먼저 팀을 선택해 주세요","searchTeam":"팀 검색","searchChannel":"채널 검색","recipientSource":"받는 사람 찾기","organizationSource":"조직 구성원","recentSource":"최근 대화","organizationDescription":"조직의 구성원을 이름이나 이메일로 검색하세요.","recentDescription":"최근 1:1 대화에서 찾아요. 외부 상대도 포함하며, 오래된 대화는 표시하지 않을 수 있어요.","noRecentChats":"최근 대화 상대가 없어요.","noRecentMatches":"최근 대화에서 일치하는 상대가 없어요.","searchPeople":"이름이나 이메일 검색","loading":"불러오는 중...","noTeams":"공유할 수 있는 팀이 없어요","noChannels":"공유할 수 있는 채널이 없어요","typeAtLeastTwo":"두 글자 이상 입력해 주세요","noPeople":"일치하는 구성원이 없어요","loadError":"목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.","retry":"다시 시도","authorizationExpired":"Microsoft Teams 연결이 만료됐어요. 다시 연결해 주세요.","reconnect":"다시 연결","reconnectError":"Microsoft Teams를 다시 연결하지 못했어요.\\n잠시 후 다시 시도해 주세요","channelContentDescription":"선택한 콘텐츠는 이 메시지에 답글로 이어서 보내요.","directMessageContentDescription":"선택한 콘텐츠는 이어서 별도 메시지로 보내요.","summary":"요약","transcript":"스크립트","post":"Teams에 공유하기","posting":"공유하는 중...","success":"Microsoft Teams에 공유했어요","open":"Teams에서 보기","destinationPermissionError":"Microsoft Teams에서 선택한 곳으로 메시지를 보낼 수 없어요.\\n직접 메시지를 보낼 수 있는 다른 채널이나 사람을 선택해 주세요","error":"Microsoft Teams에 공유하지 못했어요.\\n연동 상태와 보낼 곳의 권한을 확인해 주세요"},"confluence":{"title":"컨플루언스에 저장하기","selectSpacePlaceholder":"Space를 선택해주세요","searchParentPagePlaceholder":"상위 페이지를 검색해주세요","create":"컨플루언스에 저장하기","contentToInclude":"포함할 내용","success":{"description":"컨플루언스에 저장했어요","open":"컨플루언스에서 열기"},"error":{"description":"컨플루언스에 저장하지 못했어요"},"cloud":"Cloud","space":"Space","parentPage":"상위 페이지","noPages":"페이지를 찾을 수 없어요","searching":"검색 중...","searchSpacePlaceholder":"Space 검색","recentSpaces":"최근 사용한 Space","otherSpaces":"다른 Space","noSpaces":"Space를 찾을 수 없어요","selectCloudPlaceholder":"소속을 선택해주세요","searchCloudPlaceholder":"소속 검색","noClouds":"소속을 찾을 수 없어요"},"hubspot":{"title":"허브스팟에 기록하기","meetingTitle":"미팅 제목","companySearch":"회사 검색","contactSearchOptional":"연락처 검색 (선택사항)","meetingTitlePlaceholder":"미팅 제목을 입력하세요","companySearchPlaceholder":"회사명으로 검색","contactSearchPlaceholder":"이름 또는 이메일로 검색","noCompanies":"회사를 찾을 수 없어요","noContacts":"연락처를 찾을 수 없어요","searching":"검색 중...","contentToInclude":"포함할 내용","note":"요약","transcript":"스크립트","connected":"연결됨","recording":"기록 중...","record":"허브스팟에 기록하기","defaultMeetingTitle":"미팅 노트","success":{"title":"허브스팟에 기록했어요","open":"허브스팟에서 열기"},"error":{"title":"허브스팟에 기록하지 못했어요","selectCompany":"회사를 선택해주세요.","enterTitle":"미팅 제목을 입력해주세요."}},"salesforce":{"title":"Salesforce에 기록하기","connected":"연결된 조직","moreOptions":"추가 설정","subject":"제목","subjectPlaceholder":"Salesforce에 표시할 제목","event":"Salesforce 일정","newEvent":"새 일정 만들기","newEventBehavior":"새 일정을 만들고 선택한 내용을 일정 설명에 저장해요","recordAssociationRequired":"새 일정을 만들려면 고객 또는 잠재 고객 레코드를 선택해 주세요.","infoUnavailable":"Salesforce 설정을 불러오지 못했어요. 창을 닫고 다시 시도해 주세요.","newEventSuccess":"새 일정을 만들고 회의록을 설명에 저장했어요","noteSavedToDescription":"노트를 일정 설명에 저장했어요","noteAttachmentSkipped":"노트를 일정에 추가하지 못했어요","noteAttachmentSkippedDescription":"관리자에게 Chatter와 Notes 설정 및 권한 확인을 요청해 주세요","chooseEvent":"기존 일정 또는 새 일정 선택","existingEvents":"기존 일정","existingEventBehavior":"기존 일정의 다른 정보와 연결은 유지하고 선택한 내용으로 설명을 덮어써요","existingEventSuccess":"기존 일정의 설명을 회의록으로 업데이트했어요","eventPlaceholder":"일정 제목 검색","noEvents":"녹음 시간 앞뒤로 일정이 없어요","description":"본문","targetType":"기록 대상","account":"고객사","opportunity":"영업 기회","accountPlaceholder":"고객사 이름을 검색해 주세요","opportunityPlaceholder":"영업 기회 이름을 검색해 주세요","searching":"검색 중...","enterTwoCharacters":"검색어를 두 글자 이상 입력해 주세요","noAccounts":"고객사를 찾을 수 없어요","noOpportunities":"영업 기회를 찾을 수 없어요","noTarget":"고객사·영업 기회 연결 안 함","keepTarget":"기존 고객사·영업 기회 연결 유지","participant":"참석자 (선택)","participantType":"참석자 유형","contact":"연락처","lead":"잠재 고객","participantPlaceholder":"이름으로 검색","noParticipant":"참석자 선택 안 함","keepParticipant":"기존 참석자 유지","suggestedParticipants":"노트 참석자 추천","participantAutoSelected":"{{name}} 참석자를 자동으로 선택했어요","participantsAutoSelected":"노트 참석자 {{count}}명을 자동으로 선택했어요","participantsSelected":"참석자 {{count}}명 선택","removeParticipant":"{{name}} 참석자 제거","optional":"선택","noParticipants":"참석자를 찾을 수 없어요","leadUsesNoTarget":"잠재 고객 일정은 고객사·영업 기회와 함께 연결할 수 없어요","retry":"다시 시도","contentToInclude":"포함할 내용","export":"Salesforce에 기록하기","exporting":"기록 중...","viewEvent":"일정 열기","expired":"Salesforce 연동이 만료됐어요","reconnect":"다시 연동하기","error":{"enterDescription":"본문을 입력해 주세요","contentTooLong":"본문은 32,000자까지 기록할 수 있어요","search":"Salesforce에서 검색하지 못했어요.\\n잠시 후 다시 시도해 주세요","searchEvents":"기존 일정을 불러오지 못했어요.\\n잠시 후 다시 시도해 주세요","export":"Salesforce에 기록하지 못했어요.\\n연동 상태와 권한을 확인해 주세요","reconnect":"Salesforce를 다시 연동하지 못했어요.\\n잠시 후 다시 시도해 주세요"}},"pdf":{"title":"PDF로 내보내기","documentTitle":"문서 제목","documentTitlePlaceholder":"PDF 파일의 제목을 입력해주세요","contentToInclude":"포함할 내용","export":"내보내기","success":{"description":"PDF로 내보냈어요"},"error":{"description":"PDF로 내보내지 못했어요"}},"email":{"title":"이메일로 내보내기","documentTitle":"제목","documentTitlePlaceholder":"이메일 제목을 입력해주세요","contentToInclude":"포함할 내용","send":"이메일 앱 열기","success":"이메일 앱을 열었어요","toast":{"nextStepError":"다음 단계 전송에 실패했어요"}},"share":"공유하기","title":"노트 공유","passwordProtected":"비밀번호 보호","linkCopy":"링크 복사","linkPasswordCopy":"링크·비밀번호 복사","linkPasswordCopied":"공유 링크와 비밀번호가 복사되었어요","linkCreatedAndCopied":"공유 링크를 만들어 복사했어요","linkCreatedAndCopiedDescription":"이제 이 링크로 노트를 공유할 수 있어요","qr":{"title":"QR 코드","password":"비밀번호","saveImage":"이미지 저장"},"noteNowPublic":"노트가 전체 공개되었어요.","passwordRemovedMessage":"이제 비밀번호 없이 노트에 접근할 수 있어요.","noteNowPasswordProtected":"노트가 비밀번호로 보호되었어요.","copyText":"내용 복사","copyNote":"복사","passwordProtectedNote":"노트 비밀번호를 입력해주세요","conferencePasswordHint":"발표 화면에 표시된 비밀번호를 입력하세요","copy":{"success":{"description":"내용이 클립보드에 복사되었어요"},"error":{"description":"내용을 클립보드에 복사할 수 없어요"},"original":"원문","translation":"번역문","textOption":"텍스트로 복사","textDescription":"텍스트만 복사합니다.","htmlOption":"HTML로 복사","htmlDescription":"노션이나 슬랙 같은 앱에 붙여넣을 수 있는 HTML 형식입니다.","markdownOption":"마크다운(.md)으로 복사","markdownDescription":"LLM, Notion, Obsidian 등에 잘 호환되는 표준 마크다운 형식입니다.","linkCopied":"공유 링크가 복사되었어요","withTranscriptOption":"요약과 스크립트 함께 복사","withTranscriptDescription":"요약과 스크립트를 문단별로 묶어 함께 복사합니다.","timestampOption":"타임스탬프와 함께 복사","timestampDescription":"각 문단의 시작 시간을 포함해서 복사합니다."},"word":{"title":"Word로 내보내기","contentToInclude":"포함할 내용","documentTitle":"문서 제목","documentTitlePlaceholder":"문서 제목을 입력하세요","export":"내보내기","success":{"description":"Word로 내보냈어요"},"error":{"description":"Word로 내보내지 못했어요"}},"greenhouse":{"export":"Greenhouse로 내보내기","exportToGreenhouse":"Greenhouse로 요약 내보내기","candidateEmail":"후보자 이메일","searchByEmail":"이메일로 후보자 검색","searching":"검색 중...","candidateNotFound":"해당 이메일의 후보자를 찾을 수 없어요","contentToInclude":"포함할 내용","connectedAs":"연결된 계정","defaultWorkspace":"기본 워크스페이스","emailRequired":"후보자 이메일이 필요해요","exportSuccess":{"description":"Greenhouse에 요약을 보냈어요","open":"Greenhouse에서 열기"},"toast":{"credentialSaveError":"Greenhouse 인증 저장에 실패했어요","noteAddError":"Greenhouse 노트 추가에 실패했어요","disconnectError":"Greenhouse 연동 해제에 실패했어요","settingsUpdateError":"Greenhouse 설정 변경에 실패했어요"}},"selectiveShare":{"contentPath":"{{group}} - {{name}}","limitReached":"요약과 문서는 종류별로 최대 {{count}}개까지 선택할 수 있어요","transcriptTranslationIncomplete":"아직 번역되지 않은 문단이 있어 번역문으로는 공유할 수 없어요.","transcriptTranslationUnavailable":"이 노트에는 더 이상 번역문이 없어 번역문으로는 공유할 수 없어요. 선택을 해제해 주세요.","transcriptTranslationNoSpeaker":"번역문에는 화자 구분이 표시되지 않아요."},"sharedContent":"공유 범위","shareSettingsUpdated":"공유 설정이 업데이트되었습니다","disabled":{"tooltip":"대화 내용이 기록되고 나면 사용할 수 있어요"},"access":{"title":"액세스 권한","linkDescription":{"public":"받은 사람은 읽기 전용으로 봐요","company":"회사 계정으로 로그인한 구성원만 볼 수 있어요","password":"비밀번호를 입력해야 열려요","disabled":"초대된 사람만 접근할 수 있어요"}},"loginNotice":{"title":"공유받은 노트를 보려면 로그인이 필요해요","description":"이 노트는 회사 구성원에게만 공개돼 있어요. 회사 계정으로 로그인해 주세요.","invitedDescription":"이 노트는 초대된 사람만 볼 수 있어요. 초대받은 계정으로 로그인해 주세요."},"loadError":{"title":"일시적인 문제가 생겼어요","description":"노트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.","retryButton":"다시 시도"},"signupCta":{"title":"가장 정확한 AI 회의록 Tiro","description":"실시간 요약 · 다국어 동시 번역으로 자신 있게 대화하고 원하는 양식의 문서를 3초 만에 완성하여 공유해보세요.","button":"무료로 시작하기"},"linkOptions":{"title":"공유 링크 설정","subtitle":"받은 사람은 항상 읽기 전용으로 봐요","currentSetting":"현재 설정","generalAccess":"조회 권한","anyoneWithLink":"링크가 있는 누구나","onlyMyCompany":"회사 구성원만","peopleAtDomain":"{{domain}} 구성원만","peopleAtDomainMore":"{{domain}} 외 {{count}}개 도메인 구성원만","onlyInvited":"초대된 사람만","companyNeedsDomain":"회사 구성원만은 워크스페이스 설정에 회사 도메인을 등록하면 쓸 수 있어요.","createCta":"공유 링크 만들기","selectToActivate":"공유 링크 없음","restrictedByWorkspace":"워크스페이스 정책으로 일부 공유 범위가 제한돼 있어요."},"linkAccess":{"disabledDescription":"링크 공유를 다시 시작해도 주소와 설정은 그대로 유지돼요."},"linkRevoke":{"button":"링크 회수","confirmTitle":"공유 링크를 회수할까요?","confirmDescription":"기존 공유 링크는 비활성화되어 더 이상 접근할 수 없어요. 다시 공유하면 새로운 주소의 공유 링크가 만들어져요.","cancel":"취소","success":"공유 링크를 회수했어요.","failed":"공유 링크를 회수하지 못했어요. 다시 시도해 주세요."},"export":{"title":"내보내기","description":"슬랙·노션·PDF 등으로 내보내기","disabledTooltip":"녹음을 일시정지하면 내보낼 수 있어요","emptyTooltip":"내보낼 내용이 아직 없어요","connect":"연동하러 가기"},"recording":{"title":"기록 중에는 공유할 수 없어요","description":"녹음을 일시정지하면 공유 링크와 초대를 설정할 수 있어요"},"back":"뒤로","invite":{"placeholder":"이름 또는 이메일 입력","roleLabel":"역할 선택"}},"mobile":{"appGuidePopup":{"text1":"웹에서는 화면이 꺼지면 기록이 중단될 수 있어요!","text2":"화면을 켜고","text3":"사용해주세요.","dontShowAgain":"다시 보지 않기","confirm":"확인"}},"summaryTemplates":{"title":{"onePager":"한페이지 문서","meetingMinutes":"회의록","salesNote":"세일즈","lectureNote":"강의노트","interviewNote":"인터뷰","pitch":"IR · 피칭","blogContent":"블로그 콘텐츠","jobInterview":"채용 인터뷰","oneOnOne":"원온원 미팅","coffeeChat":"커피챗","userInterview":"유저 인터뷰","pressRelease":"홍보 기사","shareholdersMeeting":"주주총회","customTemplate":"모든 템플릿 보기","createMyOwn":"나만의 템플릿 만들기"},"example":{"onePager":"# 스티브 잡스의 비즈니스 시작과 기업가 정신\\n\\n## 서론\\n이 내용은 스티브 잡스가 비즈니스 시작, 기업가 정신, 그리고 성공적인 기업 운영에 대한 그의 통찰과 경험을 공유한 것을 담고 있다. 애플(Apple)의 창업부터 성장 과정, 그리고 기업 운영의 핵심 철학까지 포괄적으로 다루고 있다.\\n\\n## 비전과 기업가 정신\\n- 비전은 실제 존재하는 목표이며, 이를 지속적으로 상기시키고 1,001가지 방식으로 전달해야 함\\n- 성공적인 기업가의 특징은 단순한 금전적 이익 추구가 아닌, 자신의 아이디어를 세상에 표현하고자 하는 열망\\n- 기업가에게는 세상에 변화를 만들어낼 수 있다는 인식이 중요한 동기가 됨\\n\\n## 스타트업 창업과 초기 운영\\n- 회사 설립에는 예상보다 많은 실무적 업무가 필요함\\n  - 회사명, 로고 선정\\n  - 부품 번호 시스템, 은행 계좌 개설, 회계 장부 준비\\n  - 경영 정보 시스템과 사무실 기본 시설 구축\\n- 창업 6개월 후에는 초기의 특별한 대우가 끝나고 실질적인 성과를 보여야 함\\n- 자금 관리와 제품 출시 전까지의 생존이 핵심 과제\\n\\n## 애플의 시작과 성장\\n- 1975년 개인용 컴퓨터가 존재하지 않던 시기에 시작\\n- 스티브 워즈니악(Steve Wozniak)이 애플 1(Apple 1)과 애플 2(Apple 2)의 엔지니어링 담당\\n- 처음에는 자신들과 친구들을 위해 시작했으나, 점차 확장되어 2,500만 명의 사용자 확보\\n\\n## 성공적인 기업 운영을 위한 핵심 요소\\n### 인재 채용과 조직 운영\\n- 경력보다는 최신 기술에 대한 열정과 이해도가 높은 인재 선호\\n- 핵심 그룹 10명이 자체적으로 팀 확장을 관리하는 구조\\n- 단순한 조직 구조 유지와 똑똑한 인재 채용 강조\\n\\n### 제품 개발과 고객 중심 접근\\n- 고객 경험을 먼저 고려하고 거기서부터 기술을 역으로 개발\\n- 제품 품질에 대한 높은 기준 유지\\n- 문제 발생 시 즉시 중단하고 해결하는 원칙 준수\\n\\n### 전략과 계획\\n- 3-4년을 현실적인 계획 기간으로 설정\\n- 환경 변화에 따른 유연한 계획 조정\\n- 소수의 핵심 사업에 집중하는 전략 채택\\n\\n## 결론\\n스티브 잡스는 진정한 열정과 비전을 가지고 시작하는 것이 성공적인 비즈니스의 핵심이며, 고객 중심의 접근과 품질에 대한 끊임없는 추구가 중요하다고 강조한다. 또한 기업의 성공은 단순히 금전적 이익이 아닌, 세상에 의미 있는 변화를 만들어내고자 하는 열망에서 시작된다는 점을 역설한다.","meetingMinutes":"# 깃랩(GitLab) 주간 제품 마케팅 회의록 (2024년 12월 1일)\\n\\n## 1. 이벤트 지원 체계 개편 (20%)\\n\\n### 새로운 이벤트 관리 전략\\n- '고투마켓(Go to Market)' 팀이 이벤트 후원 및 등록을 담당하는 새로운 체계 도입\\n- 슬랙(Slack)을 통한 소통 채널 구축 및 긍정적 피드백 확인\\n- PMM과 캠페인 매니저의 협력 체계 구축\\n  - 타이(Ty)가 인원 배정 완료\\n  - GTM 팀의 추가 지원 필요성 확인\\n\\n### Corp Events 팀 운영\\n- 행사 관리와 인력 추적에 주력\\n- 쿠버콘(Kubecon) 참여 관련 캠페인 관리자의 명확한 커밋 요구\\n\\n## 2. 주요 컨퍼런스 참가 계획 (15%)\\n\\n### 확정된 컨퍼런스\\n- 리인벤트(Reinvent): 플랫폼 세션\\n- 구글 넥스트(Google Next): CI/CD 세션\\n- 쿠브콘(Kubecon): GitOps 세션\\n\\n### 팀 정기 회의\\n- 2주 간격으로 정기 회의 진행\\n- GitOps 교육 이후 일부 회의 취소\\n\\n## 3. 깃랩(GitLab) 14.0 제품 발표 준비 (25%)\\n\\n### 제품 발표 전략\\n- 버전 13.0 이후 주요 개선사항 정리 진행 중\\n- 취약점 관리(Vulnerability Management) 기능 포함\\n- 에픽 보드(Epic Board) 기능 구현 완료\\n\\n### 신규 기능\\n- VS 코드(VS Code) 통합 기능 2개 출시\\n- 테라폼(Terraform) 모듈 공식 지원\\n- 브로우주커(Browzucker) DAST 스캐너 베타 버전 출시\\n\\n## 4. 마케팅 메시지 프레임워크 개발 (25%)\\n\\n### 핵심 메시지\\n- \\"단일 진실 공급원(Single Source of Truth)\\"\\n- \\"엔드투엔드 컨트롤(End to End Control)\\"\\n- \\"더 빠른 속도, 더 적은 위험(More Speed, Less Risk)\\"\\n\\n### 제품 가치 제안\\n- 소프트웨어 팩토리 보안 강화\\n- 속도와 자신감의 균형 강조\\n- 모두를 위한 올인원(All in One) 솔루션\\n\\n## 5. 경쟁사 분석 프레임워크 (15%)\\n\\n### 등급 분류 체계\\n- 1등급(Tier 1): 주요 경쟁사 집중 분석\\n- 2등급(Tier 2), 3등급(Tier 3): 향후 분석 예정\\n- 객관적 비교 지표 개발 중\\n\\n## 주요 결정사항\\n- GTM 팀 중심의 새로운 이벤트 지원 체계 도입\\n- 취약점 관리 기능을 14.0 버전의 주요 기능으로 포지셔닝\\n- 마케팅 메시지 프레임워크 개선 필요성 합의\\n\\n## 후속 조치사항\\n- 담당: PR팀\\n  - 14.0 버전 기능 관련 보도자료 준비\\n  - 기한: 공개 일정에 맞춰 진행\\n\\n- 담당: 캠페인 관리자\\n  - 쿠버콘(Kubecon) 참여 커밋 등록\\n  - 기한: 즉시\\n\\n- 담당: GTM 팀\\n  - 이벤트 지원 체계 세부 프로세스 수립\\n  - 기한: 다음 주간 회의 전","salesNote":"# Overview\\n\\n* **미팅 날짜:** 2025년 6월 12일\\n* **고객:** StyleGen, 중견 이커머스 기업의 마케팅 부서. 마케팅 총괄인 David Kim이 이끌고 있으며, 현재 Asana, Google Drive, Slack 등 여러 툴이 분산되어 있어 프로젝트 관리에 비효율을 겪고 있음. 이로 인해 주요 캠페인 론칭이 10-15% 지연되는 등 명확한 비즈니스 손실이 발생하고 있음.\\n\\n# Main Discussion & Client Requirements\\n\\n고객(David Kim)은 현재의 문제점을 명확히 인지하고 있었으며, 이를 해결하기 위한 구체적인 예산, 권한, 필요성, 도입 시기를 제시했습니다.\\n\\n* **고객 요구사항:**\\n    * 분산된 툴을 하나로 통합하여, 수동적인 정보 취합에 낭비되는 시니어 인력의 시간을 줄여야 함\\n    * 캠페인 승인 및 피드백 프로세스를 명확히 하여, 프로젝트 지연을 방지할 수 있는 중앙화된 플랫폼이 필요함\\n\\n* **BANT Framework**\\n    * **Budget (예산):** 마케팅팀 30명을 기준으로, **사용자당 월 $50~$70 범위**의 예산을 고려하고 있음. 이 예산은 기존에 사용 중인 다른 SaaS 툴을 기준으로 책정됨\\n    * **Authority (결재권):** **David Kim이 솔루션 도입 및 예산에 대한 최종 결재권자**임. 다만, 기술적인 보안 및 통합 검토를 위해 **CTO인 Dr. Evelyn Reed의 최종 승인**이 필요함\\n    * **Needs (요구사항):** 현재의 비효율적인 시스템으로 인해 발생하는 **주요 캠페인 론칭의 10-15% 지연**이라는 핵심적인 비즈니스 병목 현상을 해결해야 함\\n    * **Timeline (도입 시기):** 연말 홀리데이 시즌 전에 시스템을 안정화해야 하므로, **향후 2개월 내에 최종 결정을 내리고 4분기 시작 전까지 도입을 완료**해야 한다는 명확한 마감일이 있음\\n\\n# Key Takeaways\\n\\n## 핵심 인사이트\\n\\n**고객 성향 및 구매 의지**: David는 문제 해결 의지가 매우 높고 직접적인 논의를 선호함. 단순 탐색이 아닌, 명확한 예산과 도입 시기를 가진 진성 구매자(Serious Buyer)로 판단됨.\\n\\n**명확한 도입 긴급성**: \\"주요 캠페인 론칭이 10-15% 지연되고 있다\\"는 정량적 손실을 언급하며, \\"4분기 시작 전까지 도입 완료\\"라는 명확한 마감일 제시. 이는 이 프로젝트가 매우 높은 우선순위를 가진다는 것을 의미.\\n\\n**이중 결재 구조 파악**: 최종 결재는 경제적 결재권자인 마케팅 총괄(David Kim)과 기술적 승인권자인 CTO(Dr. Evelyn Reed)의 승인이 모두 필요함을 확인함. 따라서 향후 영업 전략은 두 이해관계자를 모두 만족시키는 투-트랙(Two-track) 접근이 필수적.\\n\\n**가격 민감도 및 경쟁 구도**: \\"사용자당 월 $50~$70\\"라는 구체적인 예산 범위를 제시함. 특정 경쟁사는 언급되지 않았으나, 이는 기존 SaaS 툴을 기준으로 가격 대비 가치를 평가하고 있음을 시사하며, 명확한 가치 제안이 필요.\\n\\n**핵심 리스크 및 대응 방안**: 가장 큰 장애물은 CTO의 기술적 승인임. 데모 과정에서 우리 솔루션의 보안 및 기존 시스템과의 통합 용이성을 명확하게 증명하는 것이 핵심 과제.\\n\\n## 액션 아이템\\n\\n* David의 비서와 협력하여 다음 주 중으로 마케팅팀을 위한 1차 데모 미팅 일정 확정.\\n* 1차 데모 이후, CTO인 Dr. Evelyn Reed를 위한 기술 중심의 2차 세션을 별도로 제안하고 준비할 것.","lectureNote":"# 체력단련: 러닝 기초와 원리\\n\\n- 강사: 김상철 (체육교육과)\\n- 날짜: 2024년 10월 31일\\n\\n## 1. 체육 수업에서의 이론과 실습의 균형 (15%)\\n\\n체육 수업에서는 일반적으로 이론적 설명을 최소화하는 것이 관행이지만, 운동의 정확한 이해와 수행을 위해서는 적절한 이론적 기반이 필수적이다. 특히 운동에 대한 잘못된 편견을 바로잡고 높은 수준의 기술적 디테일을 습득하기 위해서는 이론과 실습의 균형이 중요하다.\\n\\n- 운동은 높은 수준의 기술적 디테일이 요구되는 활동임\\n- 발달 과정에서 정확한 운동 방법 습득의 중요성\\n- 이론적 설명과 지속적인 숙달 과정의 필요성 강조\\n\\n## 2. 걷기와 달리기의 기본 원리 (30%)\\n\\n걷기와 달리기는 일상적인 동작으로 보이지만, 실제로는 전혀 다른 역학적 원리와 기술을 필요로 한다. 특히 무게중심의 위치와 이동 방식에서 큰 차이를 보이며, 이는 각각의 목적과 효율성에 직접적인 영향을 미친다.\\n\\n- 걷기의 특징:\\n  - 한 발이 항상 지면에 붙어있어야 함\\n  - 무게중심이 몸통 안에 위치\\n  - 자유로운 방향 전환과 멈춤이 가능\\n\\n- 달리기의 특징:\\n  - 무게중심을 앞으로 이동시키는 것이 핵심\\n  - 최소한의 힘으로 역학적 원리를 활용\\n  - 직진성과 스피드가 주요 특징\\n\\n## 3. 발달 과정에서의 보행과 달리기 (25%)\\n\\n인간의 운동 발달 과정에서 보행과 달리기는 순차적으로 발달하며, 이는 신체 발달과 밀접한 관련이 있다. 특히 유아기부터 학령기까지의 발달 과정은 각 단계별로 특징적인 움직임 패턴을 보인다.\\n\\n- 보행 발달 단계:\\n  - 기어가기에서 시작\\n  - 일어서기\\n  - 기본적인 걸음걸이 습득\\n  - 달리기로 발전\\n\\n- 달리기 발달 특징:\\n  - 약 80%의 운동 신경이 좋은 학생들은 달리기 형태가 변화\\n  - 나머지는 걷기에서 발전된 형태의 달리기 유지\\n  - 초등학교부터 고등학교까지 지속적인 발달 과정\\n\\n## 4. 운동 방법과 트레이닝 추천사항 (30%)\\n\\n효과적인 운동을 위해서는 적절한 운동 방법의 선택과 순서가 중요하다. 특히 트레이드밀과 실외 러닝의 차이점을 이해하고, 각자의 상황에 맞는 최적의 운동 방법을 선택해야 한다.\\n\\n- 추천 운동 순서:\\n  - 1순위: 실외 지면 러닝\\n  - 2순위: 트레이드밀\\n  - 3순위: 자전거 운동\\n\\n- 트레이드밀 사용 시 주의사항:\\n  - 벨트 속도와 사용자 움직임의 차이로 인한 부상 위험\\n  - 위로 뛰는 형태의 운동이 주를 이룸\\n  - 동력/무동력 트레이드밀의 특성 이해 필요\\n\\n---\\n\\n## 이 강의의 핵심 포인트\\n\\n- 걷기와 달리기는 겉보기에 유사해 보이지만, 전혀 다른 역학적 원리와 기술이 필요한 독립적인 운동이다.\\n- 올바른 운동 방법의 습득을 위해서는 이론적 이해와 실제 훈련이 균형있게 이루어져야 한다.\\n- 효율적인 달리기는 무게중심의 전방 이동과 최소한의 힘으로 최대의 효과를 얻는 것이 핵심이다.\\n- 개인의 상황과 목적에 맞는 적절한 운동 방법의 선택이 중요하며, 가능한 실외 지면 러닝을 우선적으로 고려해야 한다.","interviewNote":"","pitch":"# DoorDash: 45분 이내 음식 배달 서비스 플랫폼\\n\\n## 기업 개요\\n\\n- 회사명: 도어대시(DoorDash)\\n- 서비스 지역: 메닐로 파크(Menlo Park), 팔로 알토(Palo Alto) 및 교외 지역\\n- YC 서머 2013 데모데이 발표 기업\\n\\n## 시장 분석\\n\\n- TAM: 미국 인구의 70% 이상이 음식점 배달 서비스 미개발 지역 거주\\n- 주요 경쟁사:씸리스(Seamless)그럽허브(Grubhub)기존 배달 대행 서비스\\n\\n## 문제점\\n\\n- 메닐로 파크와 팔로 알토 지역의 대부분 식당(피자 전문점 제외)이 배달 서비스 미제공\\n- 기존 배달 서비스의 한계:음식점과 제휴 관계 부재느린 배달 속도구조적 고비용\\n\\n## 솔루션/제품\\n\\n- 45분 이내 음식 배달 보장 서비스\\n- 자체 물류 시스템 운영\\n- 식당 파트너십 기반 서비스\\n- 주요 기술 인프라:음식점용 아이패드(iPad) 주문 시스템배달원 네트워크 관리 물류 소프트웨어\\n\\n## 비즈니스 모델\\n\\n- 식당 대상 서비스:배달 기사 제공물류 관리 서비스파트너십 기반 협력 관계\\n- 소비자 대상 서비스:45분 이내 배달 보장실시간 주문 처리\\n\\n## 트랙션 및 성과\\n\\n- 배달 실적:총 3,500건 이상 배달 완료평균 배달 시간 44분\\n- 성장률: 주간 주문량 30% 이상 증가\\n- 파트너 식당 매출 기여: 연간 150만 달러(약 19억 5천만 원) 이상\\n\\n## 팀\\n- 토니 쉬(Tony Xu): 도어대시의 공동 설립자이자 최고경영자(CEO)로, 중국에서 태어나 어린 시절 미국으로 이주했습니다. UC 버클리와 스탠퍼드 대학교에서 수학했으며, 이전에는 Square 등에서 근무한 경험이 있습니다.\\n- 스탠리 탕(Stanley Tang): 도어대시의 공동 설립자이자 제품 책임자(CPO)로, 홍콩에서 태어나 스탠퍼드 대학교에서 컴퓨터 과학을 전공했습니다.\\n- 앤디 팡(Andy Fang): 도어대시의 공동 설립자이자 최고기술책임자(CTO)로, 대만 이민자 가정에서 태어나 샌프란시스코 베이 지역에서 성장했습니다. 스탠퍼드 대학교에서 컴퓨터 과학 학위를 취득했습니다.\\n\\n## 미래 비전\\n\\n- 현대판 페덱스(FedEx) 구축 목표\\n- 서비스 확장 계획:음식 배달을 넘어선 다양한 서비스로 확장실시간 주문 배달 시스템 구축\\n- 차별화 전략:익일/당일 배송이 아닌 실시간 배달 서비스 제공자체 물류 네트워크 활용","blogContent":"# AI 시대의 마케팅, 기회와 도전 과제\\n\\n# Introduction\\n\\n디지털 마케팅의 패러다임이 인공지능(AI) 기술을 중심으로 빠르게 재편되고 있습니다. 과거의 마케팅이 감과 경험에 의존했다면, 오늘날의 마케팅은 데이터와 자동화에 기반한 정교한 전략을 요구합니다. 많은 마케터들이 AI가 가져올 변화에 대한 기대감과 동시에, 어떻게 적응해야 할지에 대한 막연한 불안감을 느끼고 있습니다.\\n\\n이 포스트에서는 AI가 마케팅의 핵심 요소를 어떻게 변화시키고 있는지 구체적인 사례를 통해 살펴보고, 미래의 마케터가 갖춰야 할 역량은 무엇인지 논의하고자 합니다.\\n\\n# Body\\n\\n## 초개인화 마케팅의 완성\\n\\nAI 기술은 고객 개개인의 행동 데이터와 선호도를 실시간으로 분석하여 맞춤형 경험을 제공하는 **초개인화(Hyper-Personalization)**를 가능하게 합니다. 이는 단순히 고객의 이름을 부르는 수준을 넘어섭니다.\\n\\n첫째, **고객 행동 예측**입니다. AI는 사용자의 이전 구매 기록, 웹사이트 방문 경로, 클릭 패턴 등을 분석하여 다음 행동을 예측하고 가장 적절한 상품이나 콘텐츠를 추천합니다. 넷플릭스의 콘텐츠 추천 엔진이 대표적인 사례입니다.\\n\\n둘째, **동적 콘텐츠 최적화**입니다. 동일한 광고나 이메일이라도 수신자에 따라 제목, 이미지, 문구가 실시간으로 최적화되어 전달됩니다. 이를 통해 마케팅 메시지의 전환율을 극대화할 수 있습니다.\\n\\n## 콘텐츠 제작의 자동화와 효율성\\n\\n**생성형 AI(Generative AI)**의 등장은 마케팅 콘텐츠 제작의 풍경을 완전히 바꾸어 놓았습니다. 단순 반복적인 작업을 자동화하여 마케터가 더 높은 가치를 창출하는 전략적 업무에 집중할 수 있도록 돕습니다.\\n\\n블로그 포스트 초안 작성, 소셜 미디어 게시물 아이디어 도출, 광고 카피 제작 등 텍스트 기반 콘텐츠는 물론, 간단한 배너 이미지나 영상 제작까지 AI가 담당할 수 있습니다. 이는 특히 리소스가 부족한 팀에게 강력한 무기가 됩니다.\\n\\n## 데이터 기반의 성과 측정과 예측\\n\\nAI는 마케팅 캠페인의 성과를 정확하게 측정하고 미래를 예측하는 데 핵심적인 역할을 합니다. 더 이상 어림짐작으로 예산을 분배하거나 성과를 판단할 필요가 없습니다.\\n\\nAI 기반 분석 툴은 각 채널의 광고수익률(ROAS)을 실시간으로 분석하여 가장 효율적인 채널에 예산을 자동으로 재분배합니다. 또한, **고객 이탈 예측 모델**을 통해 이탈 가능성이 높은 고객 그룹을 사전에 파악하고, 이들을 대상으로 한 선제적인 리텐션 마케팅을 펼칠 수 있습니다.\\n\\n# Transition / Connection\\n\\n결국 AI 시대의 마케팅은 초개인화, 콘텐츠 자동화, 그리고 데이터 기반 예측이라는 세 가지 축을 중심으로 전개됩니다. 이는 마케터의 역할이 '실행자'에서 '전략가'이자 'AI 시스템의 운영자'로 변화하고 있음을 의미합니다. AI라는 강력한 도구를 어떻게 활용하여 비즈니스 목표를 달성할 것인지가 핵심 과제가 되었습니다.\\n\\n# Conclusion\\n\\nAI 기술을 마케팅에 도입하는 것은 더 이상 선택이 아닌 필수입니다. 중요한 것은 AI를 맹목적으로 따르는 것이 아니라, AI가 제공하는 분석 결과와 자동화 기능을 비판적으로 수용하고 창의적인 전략과 결합하는 것입니다.\\n\\n미래의 마케터는 데이터 리터러시와 함께, AI의 윤리적 사용 및 고객 데이터 보호에 대한 책임 의식을 갖추어야 합니다. 여러분은 현재 마케팅 업무에서 AI를 어떻게 활용하고 계신가요? 댓글을 통해 여러분의 경험과 생각을 공유해 주세요.\\n\\n# References / Further Reading\\n\\n- **SEO 제안 제목**: \\"AI 마케팅 완벽 가이드: 2025년 최신 전략과 사례\\"\\n- **메타 설명**: \\"초개인화, 생성형 AI, 데이터 예측을 중심으로 AI가 마케팅을 어떻게 바꾸고 있는지 알아보고, 미래 마케터의 필수 역량을 확인하세요.\\"\\n- **관련 키워드**: AI 마케팅, 디지털 마케팅, 초개인화, 생성형 AI, 데이터 기반 마케팅, 마테크(MarTech)\\n- **내부 링크 제안**: 그로스 해킹 전략, 데이터 분석 툴 활용법, 콘텐츠 마케팅 성공 사례 관련 포스트\\n- **외부 참고 자료**: Marketing AI Institute, Gartner 마케팅 보고서, HubSpot 블로그","jobInterview":"# 면접 날짜 및 참석자 정보\\n\\n* **면접 날짜:** 2025년 6월 12일\\n* **참석자:**\\n    * **면접관:** David (채용 매니저, DataDrive)\\n    * **지원자:** Emily (Sales Manager 직무 지원자)\\n\\n# 면접 목적 및 지원자 프로필\\n\\n* **면접 목적:**\\n    * Sales Manager 직무에 지원한 Emily의 과거 영업 성과, 전략적 사고, 리더십 잠재력을 종합적으로 평가하기 위한 실무 면접. 특히, 데이터 기반의 영업 전략 수립 및 실행 능력을 검증하는 것을 목표로 함\\n\\n* **지원자 프로필:**\\n    * 이전 직장인 Innovate Inc. (이노베이트 주식회사)에서 B2B 엔터프라이즈 영업 경험을 쌓은 전문가. 전체 영업 사이클에 대한 높은 이해도를 보이며, 자신의 경험을 STAR(Situation, Task, Action, Result) 기법에 맞춰 체계적으로 설명하는 능력이 뛰어남. 데이터에 기반하여 답변하며, 사전 리서치를 통해 회사에 대한 깊은 관심을 보임\\n\\n# 면접 Q&A 노트\\n\\n**경력 및 주요 성과 리뷰**\\n\\n* **(Q):** 이전 직장인 Innovate Inc.에서의 경험에 대해 설명해 주세요.\\n* **(A):** B2B 소프트웨어 솔루션의 엔터프라이즈 영업을 담당했음. 단순 제품 판매를 넘어 고객의 문제를 해결하는 컨설팅 접근 방식을 주로 사용했다고 답변함\\n\\n* **(Q):** 그곳에서 달성한 가장 중요한 영업 성과는 무엇이었나요?\\n* **(A):** 주요 엔터프라이즈 고객사인 Globex Corp. (글로벡스 코퍼레이션)을 유치한 것을 꼽음. 이는 6자리 수(6-figure) 규모의 계약이었으며, 해당 분기 팀 매출을 20% 증대시키는 결과를 가져옴. 성공 요인으로 핵심 의사결정자를 파악하고, 고객 맞춤형 가치 제안서를 작성하여 접근했던 전략을 설명함\\n\\n**실패 경험 및 학습**\\n\\n* **(Q):** 영업 할당량(Quota)을 달성하지 못했던 경험에 대해 설명해 주세요. 무엇이 문제였고, 무엇을 배웠나요?\\n* **(A):** 작년 2분기, 단 하나의 대형 계약에 너무 의존하다가 막판에 계약이 무산되면서 목표를 10% 달성하지 못했던 경험을 공유함. 이를 통해 **파이프라인 다각화(pipeline diversification)**의 중요성을 깨달았다고 함. 이후 팀에 **가중치 기반 파이프라인 트래킹 시스템**을 도입하여 리스크를 관리하고 예측 정확도를 높였다고 답변하며, 실패를 통해 성장했음을 어필함\\n\\n**전략적 사고 및 계획**\\n\\n* **(Q):** DataDrive의 가장 큰 시장 기회는 무엇이라고 생각하며, 만약 입사한다면 첫 90일 동안 어떻게 접근하시겠습니까?\\n* **(A):** 사전 리서치를 통해 파악한 내용을 기반으로 답변함. 현재 DataDrive가 충분히 공략하지 못하고 있는 **'중견 금융 서비스' 섹터**를 가장 큰 기회로 꼽음\\n    * **첫 30일:** 내부 데이터 분석 및 프로덕트/마케팅팀과의 인터뷰를 통해 현재 상황 파악\\n    * **31-60일:** 타겟 고객에 맞춘 구체적인 영업 전략 및 아웃리치 메시지 개발\\n    * **61-90일:** 소규모 팀과 함께 파일럿 프로그램을 시작하여 시장 반응을 테스트하고, 성공 시 확장 계획 수립\\n\\n**지원자의 질문**\\n\\n* **(Q):** 현재 영업팀이 겪고 있는 가장 큰 어려움은 무엇인가요?\\n* **(A):** (면접관 답변) 기존의 중소기업(SMB) 중심 고객층에서, 더 큰 규모의 중견기업(Mid-market)으로 성공적으로 확장해 나가는 것이 현재의 가장 큰 과제임\\n\\n* **(Q):** 이 직무의 성공을 영업 할당량 외에 어떤 기준으로 측정하시나요?\\n* **(A):** (면접관 답변) 팀원의 성장 및 코칭 능력, 분기별 영업 예측의 정확성, 그리고 다른 부서(마케팅, 제품)과의 협업 능력 또한 중요한 성공 지표임\\n\\n* **(Q):** 팀의 문화는 어떤가요?\\n* **(A):** (면접관 답변) 개개인의 자율성을 존중하면서도, 데이터에 기반하여 투명하게 소통하는 협력적인 문화를 가지고 있음","oneOnOne":"# 1 on 1 Meeting\\n\\n이번 정기 원온원은 팀원 유진님이 최근 느끼는 커리어 성장 정체에 대한 고민을 해소하고, 역할 확장을 위한 구체적인 기회를 함께 모색하기 위해 진행되었습니다. 유진님은 현재 담당 중인 Project Phoenix (피닉스 프로젝트)에서 뛰어난 성과를 내고 있지만, 반복되는 업무에 대한 아쉬움과 제품 기획 초기 단계에 기여하고 싶다는 명확한 성장 의지를 보여주었습니다.\\n\\n# Discussion\\n\\n* **커리어 성장 및 역할 확장에 대한 고민 (Career Growth & Role Expansion Concerns)**\\n    * 유진님은 현재 업무에 만족하지만, 점차 역할이 반복적으로 느껴진다고 솔직하게 공유함\\n    * 단순히 주어진 기획안을 시각화하는 것을 넘어, 제품의 'Why'를 함께 고민하고 싶다는 강한 동기를 보여줌\\n    * **Q:** 구체적으로 어떤 부분에 기여하고 싶은가요?\\n    * **A:** 유저 리서치 결과 분석, 문제점 발견, 신규 기능 아이디어 브레인스토밍 등 기획 극초기 단계에 참여하고 싶다는 의사를 밝힘\\n\\n* **새로운 기회 제안 및 해결 방안 모색 (Proposing New Opportunities & Solutions)**\\n    * 유진님의 성장 의지에 맞춰, 다음 분기 시작 예정인 Project Odyssey (오디세이 프로젝트)의 초기 기획 워크숍 참여를 제안함\\n        * 이는 PM, 개발자와 함께 고객 문제를 정의하는 단계부터 참여하여 'Why'에 대한 고민을 함께할 좋은 기회가 될 것임\\n    * 데이터 분석 역량 강화를 위해, 데이터팀의 리아(Lia)님과의 연결을 제안했으며, 유진님은 이에 긍정적으로 화답함\\n\\n* **피드백 및 격려 (Feedback & Encouragement)**\\n    * Project Phoenix (피닉스 프로젝트)에서 보여준 섬세한 UI 디테일 역량을 칭찬함\\n    * 이러한 디테일에 대한 집요함이 기획 단계에서의 강점으로 발휘될 수 있음을 강조하며, 새로운 도전에 대한 자신감을 북돋아 줌\\n\\n# Action Items\\n\\n* **민준 (Min-jun) / 팀장**\\n    * **Description:** 유진님과 데이터팀 리아(Lia)님의 미팅 주선하기\\n    * **Deadline or Next Checkpoint:** 다음 주 초까지\\n    * **Description:** Project Odyssey (오디세이 프로젝트) 초기 기획 워크숍에 유진님 정식 멤버로 초대하기\\n    * **Deadline or Next Checkpoint:** 워크숍 일정 확정 시 즉시\\n\\n* **유진 (Yujin) / 팀원**\\n    * **Description:** Project Odyssey (오디세이 프로젝트)가 해결하려는 문제에 대해 리서치하고, 초기 가설 및 아이디어 2~3가지 준비하기\\n    * **Deadline or Next Checkpoint:** 첫 기획 워크숍 전까지\\n    * **Additional Notes:** 데이터팀 리아(Lia)님과의 미팅을 통해 필요한 데이터 지원을 요청할 수 있음\\n\\n# ## Next 1 on 1\\n\\n* **주요 팔로업 주제 (Key Follow-up Topics)**\\n    * 데이터팀과의 미팅 결과 및 배운 점에 대해 이야기 나누기\\n    * Project Odyssey (오디세이 프로젝트) 초기 리서치 내용과 아이디어를 함께 리뷰하고 발전시키기\\n\\n* **커리어 성장 논의 (Career Development Discussion)**\\n    * A (현재): 정의된 기획안의 디자인 실행 중심\\n    * B (목표): 문제 정의 및 기획 단계에 참여하는 역할로 확장\\n    * **How:** Project Odyssey (오디세이 프로젝트) 참여를 통해 실제 기획 프로세스를 경험하게 하고, 데이터 기반 의사결정 역량을 키울 수 있도록 지원할 예정\\n\\n* **신뢰 및 동기 부여 관리 (Trust & Motivation Management)**\\n    * **상황:** 업무 반복성에 대한 정체감과 성장 욕구 표출\\n    * **계획:** 선제적인 역할 확장 기회 제공 → 유진님의 성장 의지를 팀의 성과와 연결\\n    * **기대효과:** 동기 부여 증진 및 팀장과의 신뢰 관계 강화. 다음 원온원에서는 오디세이 프로젝트 참여 경험에 대한 감정과 어려움을 중점적으로 확인할 것","coffeeChat":"# Overview\\n\\n* **날짜:** 2025년 6월 11일\\n* **참석자:**\\n    * **박수진 (Sujin Park):** 주선자, 대기업 3년차 브랜드 마케터\\n    * **김지훈 (Jihun Kim):** 현직자, IT 스타트업 5년차 시니어 PMM (Product Marketing Manager)\\n* **목적:**\\n    * 대기업 마케터에서 IT 스타트업 PMM으로의 성공적인 커리어 전환을 위한 조언 및 네트워킹\\n* **배경:**\\n    * 주선자(수진)가 링크드인(LinkedIn)을 통해 현직자(지훈)의 커리어 스토리에 깊은 인상을 받아 커피챗을 먼저 요청함. IT 산업 및 PMM 직무에 대한 현실적인 정보와 준비 방법에 대한 논의를 위해 마련된 자리임\\n\\n# Discussion & Notes\\n\\n### 대기업 마케터 vs 스타트업 PMM 역할 비교\\n\\n* **Q: 대기업 마케터와 스타트업 PMM의 가장 큰 차이점은 무엇인가요?**\\n    * **A (지훈님의 답변 요약):** \\"정해진 길을 가는 것\\"과 \\"길을 직접 만드는 것\\"의 차이로 비유할 수 있음\\n    * **대기업 마케터:** 검증된 프로세스와 큰 예산 안에서 브랜드 메시지를 관리하고 캠페인을 운영하는 역할이 강함\\n    * **스타트업 PMM (Product Marketing Manager):**\\n        * **End-to-End 오너십:** 시장 조사, 고객 정의부터 시작하여 제품의 성공까지 A to Z를 책임짐\\n        * **긴밀한 협업:** 제품팀, 개발팀, 세일즈팀과의 끊임없는 소통을 통해 제품 방향성을 조율하고 고객의 목소리를 전달하는 역할이 매우 중요함\\n\\n### 스타트업의 조직 문화와 업무 환경\\n\\n* **Q: 스타트업의 조직 문화나 워라밸은 대기업과 비교해서 어떤가요?**\\n    * **A (지훈님의 답변 요약):** 회사와 스테이지별로 매우 다르지만, 공통적인 특징이 있음\\n    * **장점:** 수평적인 문화, 빠른 의사결정, 개인의 기여가 비즈니스 성과로 직접 이어지는 것을 보는 보람\\n    * **단점:** 체계가 부족할 수 있고, 역할의 경계가 모호할 때가 많음. 성과 중심적이라 압박감이 있을 수 있음\\n    * **핵심:** 정해진 시간에만 일하는 '워라밸'보다는, 업무 시간과 장소를 유연하게 조절하는 **'워크-라이프-블렌딩'**에 가까운 경우가 많음\\n\\n### PMM 전환을 위한 핵심 역량\\n\\n* **Q: PMM이 되기 위해 지금부터 어떤 역량을 준비하면 좋을까요?**\\n    * **A (지훈님의 답변 요약):** '데이터'와 '고객'이라는 두 가지 키워드를 중심으로 역량을 쌓아야 함\\n    * **데이터 분석 능력:**\\n        * SQL 활용 능력은 매우 강력한 무기가 될 수 있음\\n        * 구글 애널리틱스 (Google Analytics)와 같은 툴을 깊이 있게 사용하여 유저 행동을 분석하고, 가설을 세우고, 검증하는 연습이 필수적임\\n    * **주도적인 문제 해결 능력:**\\n        * **'사이드 프로젝트'**를 강력하게 추천함\\n        * **기대효과:** 스스로 '가설 → 실행 → 데이터 확인 → 개선'의 전체 사이클을 경험함으로써 면접 시 강력한 스토리텔링이 가능하며, 주도적인 인재라는 인상을 줄 수 있음\\n\\n### 이직 면접 및 포트폴리오 준비 전략\\n\\n* **Q: PMM 직무 면접은 주로 어떤 방식으로 진행되고, 포트폴리오는 어떻게 준비해야 할까요?**\\n    * **A (지훈님의 답변 요약):** 기술 면접보다는 경험과 문제 해결 능력을 검증하는 데 초점을 맞춤\\n    * **면접 프로세스:** 서류 이후, 실무진 면접에서 과거 경험에 대해 깊이 파고들고, 특정 상황을 가정한 과제를 주거나 케이스 인터뷰를 진행하는 경우가 많음\\n    * **포트폴리오 전략:**\\n        * 화려한 결과물 나열보다 **'어떤 문제를 어떻게 해결했는지'** 과정 중심으로 구성해야 함\\n        * 모든 프로젝트에 **정량적인 성과 (KPI 달성률, 전환율 개선 등)**를 숫자로 명확히 제시하는 것이 중요함\\n        * 사이드 프로젝트 경험은 포트폴리오에서 가장 강력한 차별화 포인트가 될 수 있음\\n\\n### PMM 직무의 매력과 최종 조언\\n\\n* **수진의 동기:** 제품 개선에 직접적인 영향을 주고, 유저의 피드백을 즉각적으로 확인하는 경험에 가장 큰 매력을 느낌\\n* **지훈님의 최종 조언:**\\n    * 즉각적인 피드백과 빠른 사이클은 스타트업의 가장 큰 매력이자 성장 동력임\\n    * 모든 것을 완벽하게 준비해서 도전하기보다, 일단 부딪혀보면서 배우는 자세가 훨씬 더 중요함. 망설이지 말고 도전할 것을 격려함","userInterview":"# Overview\\n\\n* **인터뷰 날짜:** 2025년 6월 12일\\n* **참여자 정보:**\\n    * **유저:** 마크 (Mark)\\n    * **유저 타입:** 주 3-4회 이상 직접 요리하는 30대 직장인\\n    * **주요 사용 목적:** 평일 저녁 및 주말 식사를 위한 레시피 탐색 및 효율적인 식료품 관리\\n    * **사용 환경:** 모바일 앱\\n\\n# Discussion & Notes\\n\\n### 현재 겪는 가장 큰 불편함\\n\\n* **혼란스러운 식사 계획:** \\"매우 혼란스럽다(chaotic)\\"고 표현함. 명확한 계획 없이 즉흥적으로 메뉴를 결정하다 보니, 결국 스파게티나 타코처럼 늘 먹는 몇 가지 메뉴만 반복하게 되어 식상함을 느낌\\n* **파편화된 장보기 프로세스:** 온라인에서 레시피를 찾은 후, ① 필요한 재료를 별도로 메모하고 ② 냉장고에 있는 재료를 확인한 뒤 ③ 최종 구매 목록을 작성하는 과정이 모두 분리되어 있어 번거롭고 시간이 많이 소요됨\\n* **식료품 낭비 및 중복 구매:**\\n    * 레시피에 필요한 양보다 많은 단위로 식자재(예: 파슬리 한 묶음)를 구매하게 되어, 남은 재료가 냉장고에서 시들어 버려지는 경우가 많음\\n    * 이미 집에 있는 재료(예: 올리브유)를 확인하는 것을 잊어버리고 중복으로 구매하는 실수가 잦다고 언급함\\n\\n### 앱에 대한 긍정적 피드백\\n\\n* **직관적인 UI:** 앱의 첫인상에 대해 \\"깔끔하다(clean)\\"고 평가함. 홈 화면의 \\"30분 이내 레시피\\"와 같은 카테고리가 명확하여 무엇을 할 수 있을지 쉽게 이해할 수 있다고 반응함\\n* **쇼핑 리스트 자동 추가 기능:** 레시피의 모든 재료를 쇼핑 리스트에 한 번에 추가하는 버튼을 보고 \\"이건 멋지다(cool)\\"고 표현함. 이는 자신이 겪는 가장 큰 문제점을 직접적으로 해결해 줄 핵심 기능으로 기대함\\n* **편리한 사용성:** 쇼핑 리스트에 추가된 재료가 '농산물', '식료품' 등으로 자동 분류되는 점과, 스와이프 동작으로 쉽게 항목을 삭제할 수 있는 점 등 직관적인 사용성에 긍정적인 반응을 보임\\n\\n### 사용자 제안 개선사항\\n\\n* **남은 재료 활용 레시피 추천 기능:** \\"하나의 레시피를 만들고 남은 재료를 활용할 수 있는 다른 레시피를 추천해주면 좋겠다\\"고 매우 구체적인 아이디어를 제안함. 이는 식료품 낭비 문제를 해결하려는 강한 니즈에서 비롯된 것으로 보임\\n\\n# Key Takeaways\\n\\n* **핵심 인사이트 1: 사용자의 진짜 고충은 '식료품 관리' 단계에 있다**\\n    * **근거:** 사용자는 \\"레시피를 찾는 것\\" 자체보다, 그 이후에 이어지는 \\"장보기 목록 작성\\"과 \\"재료 낭비\\" 과정에서 가장 큰 좌절감을 느끼고 있었음. \\"올리브유를 중복 구매했다\\"거나 \\"남은 파슬리가 시든다\\"는 구체적인 경험담이 이를 명확히 뒷받침함\\n    * **권장 조치:** 우리 앱의 핵심 가치를 단순 '레시피 제공'이 아닌, **'지능적인 식료품 관리 및 낭비 방지'**로 설정하고, '쇼핑 리스트 자동화' 기능을 핵심 기능으로 마케팅해야 함. 향후 '남은 재료 활용 레시피 추천' 기능 개발의 우선순위를 높게 검토할 필요가 있음\\n\\n* **핵심 인사이트 2: 사용자는 복잡한 기능보다 '직관적인 시간 절약'에 만족한다**\\n    * **근거:** 사용자는 '쇼핑 리스트 자동 분류'나 '스와이프로 항목 삭제'와 같이, 별도의 학습 없이도 즉각적으로 시간을 절약해주는 단순하고 직관적인 기능에 가장 긍정적으로 반응했음\\n    * **권장 조치:** 신규 기능을 기획할 때, 복잡성을 더하기보다 현재의 성공적인 사용자 경험을 해치지 않는 선에서, 사용자의 수고를 확실히 덜어주는 직관적인 솔루션을 우선적으로 고려해야 함","pressRelease":"","shareholdersMeeting":"# 회계보고\\n\\n2025년 3월 21일 개최된 제15기 정기주주총회에서 제15기 재무제표 및 이익잉여금 처분계산서(안)가 원안대로 승인되었습니다.\\n\\n* **주요 재무 데이터:**\\n    * 매출액: 2조 원\\n    * 당기순이익: 500억 원\\n* **배당 상세:**\\n    * 보통주 1주당 500원의 현금배당 결정\\n* **의결 결과:**\\n    * 제1호 의안: 제15기 재무제표 및 이익잉여금 처분계산서(안) 승인의 건 **(가결)**\\n\\n# 사업보고\\n\\n박지성 대표이사는 지난 회계연도의 주요 사업 성과와 전략적 방향성을 발표했습니다.\\n\\n* **주요 성과:** 주력 전기차 모델 '에테르(Aether)'가 총 5만 대 판매되었으며, **창사 이래 최초로 영업이익 흑자를 달성**하는 중요한 재무적 이정표를 세웠습니다.\\n* **글로벌 확장:** 성공적인 유럽 시장 진출을 통해 글로벌 판매망을 구축하고 브랜드 인지도를 높였습니다.\\n* **핵심 투자 및 파트너십:** 차세대 배터리 기술 확보 및 공급망 안정을 위해 '솔리드 스테이트(Solid State Inc.)' 사와 전략적 파트너십을 체결했습니다.\\n* **기술 개발:** 자율주행 소프트웨어 '오디세이 OS(Odyssey OS)'는 안전을 최우선으로 지속적인 데이터 축적 및 고도화 작업을 진행 중입니다.\\n\\n# 부의안건 심의 및 의결 (Agenda Items and Voting Results)\\n\\n상정된 모든 부의안건은 주주들의 동의를 얻어 원안대로 가결되었습니다.\\n\\n* 제1호 의안: 제15기 재무제표 및 이익잉여금 처분계산서(안) 승인의 건 **(가결)**\\n* 제2호 의안: 이사 선임의 건 (사외이사 김소연 선임) **(가결)**\\n* 제3호 의안: 이사 보수 한도(총 30억 원) 승인의 건 **(가결)**\\n* 제4호 의안: 정관 일부 변경의 건 (배당 기준일 관련) **(가결)**\\n\\n# Q&A\\n\\n주주들과의 질의응답 세션에서는 다음과 같은 주요 논의가 있었습니다.\\n\\n* **Q: '솔리드 스테이트(Solid State Inc.)'와의 배터리 파트너십이 생산 단가에 미칠 구체적인 영향은 무엇인가요?**\\n    * **A:** 단순 공급을 넘어선 공동 개발 협력입니다. 장기적으로 배터리 내재화 비용을 20% 이상 절감하고, 안정적인 공급망을 확보하여 원가 경쟁력을 크게 높일 것으로 기대합니다.\\n\\n* **Q: 자율주행 소프트웨어 '오디세이 OS(Odyssey OS)'의 발전 속도가 경쟁사 대비 더디다는 우려에 대한 입장은 무엇인가요?**\\n    * **A:** 회사는 시장 출시 속도보다 '안전'을 최우선 개발 철학으로 삼고 있습니다. 수백만 km의 실제 주행 데이터를 기반으로 안정성을 고도화하고 있으며, 올 하반기 대규모 업데이트를 통해 진보된 기능을 선보일 예정입니다.\\n\\n# 특이사항\\n\\n이번 주주총회에서 주목해야 할 핵심적인 사항 3가지는 다음과 같습니다.\\n\\n1.  **창사 첫 영업이익 흑자 달성:** 지속적인 성장을 증명하고 재무적 안정성의 기반을 마련한 매우 의미 있는 성과입니다. 이는 향후 투자 유치 및 사업 확장에 긍정적인 신호로 작용할 것입니다.\\n2.  **차세대 배터리 공급망 확보:** '솔리드 스테이트'와의 전략적 파트너십은 미래 전기차 시장의 핵심인 배터리 기술 경쟁력과 원가 경쟁력을 동시에 확보하기 위한 중요한 전략적 결정입니다.\\n3.  **안전 중심의 기술 개발 철학 재확인:** 자율주행 기술 경쟁 속에서 '안전'을 최우선으로 삼는 회사의 확고한 개발 철학을 다시 한번 강조했습니다. 이는 장기적인 브랜드 신뢰도 구축에 기여할 것입니다.","customTemplate":""},"form":{"title":"템플릿 제목","sample":"샘플","sampleDescription":"💡 Tip: URL이 아닌 원문을 그대로 복사 후 붙여넣기 해주세요. 원하는 형식의 글이 완성된 버전을 넣어주세요.","samplePlaceholder":"# 스티브 잡스: 사업 시작하기\\n\\n스티브 잡스는 기업가 정신에서 열정, 비전, 그리고 고객 중심의 중요성을 강조합니다.\\n\\n- 비전: 회사의 방향을 명확히 하고 핵심 목표에 집중합니다.\\n- 창업: 필수 사항을 설정하며, 금전적 이익이 주된 동기가 되어서는 안 됩니다.\\n- 팀 빌딩: 재능 있고 열정적인 인재를 채용하며, 단순한 구조를 선호합니다.\\n- 고객 중심: 기술보다 고객 경험을 우선시합니다.\\n- 품질: 출시 전에 최고의 품질을 추구하며, 리더십이 기준을 세웁니다.\\n- 전략: 3-4년을 계획하고, 몇 가지 핵심 과제에 집중합니다.\\n- 철학: 열정을 느끼는 일을 찾고, 끈기를 갖는 것이 중요합니다.\\n- 애플의 여정: 개인 프로젝트에서 시작해 수백만 명에게 영향을 주는 기업으로 성장했습니다.\\n- 결론: 성공은 열정과 비전, 그리고 핵심 가치에서 비롯됩니다.","saveTemplate":"템플릿 저장하기","generateNote":"이 템플릿으로 노트 생성하기"},"delete":{"title":"{{templateTitle}} 삭제","description":"이 문서를 삭제하시겠습니까? 이 작업은 되돌릴 수 없어요.","confirm":"삭제","cancel":"취소","success":"문서가 삭제되었어요.","error":"문서 삭제에 실패했어요."}},"participants":"대화참석자","participantsMore":"더보기","manageParticipants":"대화 참석자 관리","addParticipants":"대화 참석자 추가","addParticipantButton":"참석자 추가","createParticipant":"생성","addAsName":"이름으로 추가","addAsEmail":"이메일로 추가","currentParticipants":"현재 참석자","noSuggestedParticipants":"추천 참석자가 없습니다","script":{"view":"스크립트 보기","hide":"스크립트 숨기기"},"editor":{"updateDescription":"변경사항이 저장되었어요"},"writing":{"message1":"티로가 대화 기록을 분석해서 기록 품질을 높이고 있어요","message2":"티로가 대화의 핵심을 짜임새 있게 담아내고 있어요","message3":"티로가 키워드와 수치를 정리하고 있어요","message4":"티로가 대화의 실마리를 풀어가는 중이에요"},"peek":{"viewDetail":"전체 화면 보기","viewDetailAria":"노트 전체 화면으로 보기"},"menu":{"options":"옵션 메뉴"},"initialContext":{"description":"대화 상황, 주제, 고유명사 등 대화와 관련된 맥락을 입력해주시면 기록되는 노트의 성능이 크게 높아져요.","examples":"예시:\\n - 대화 상황: 스티브 잡스의 스탠포드 대학 졸업 연설\\n - 주제: Connecting The Dots, Love and Loss, About Death\\n - 고유명사: 스티브 잡스, 애플, 삶과 죽음, 픽사","titleAndParticipants":"제목과 참석자를 입력해주세요","preMemo":"미리 메모하실 것이 있나요? 주제, 회사/제품명, 사람 이름, 상황을 적어두시면 기록 성능이 높아져요.","startWithRedButton":"빨간색 버튼을 눌러 티로와 함께 기록을 시작하세요!"},"action":{"delete":"노트 삭제","deleteAria":"노트 삭제하기","addToFavorites":"즐겨찾기에 추가","moveToWorkspace":{"label":"워크스페이스로 이동","loading":"워크스페이스 불러오는 중...","empty":"다른 워크스페이스가 없어요","success_one":"{{workspaceName}}로 옮겼어요","success_other":"{{count}}개의 노트를 {{workspaceName}}로 옮겼어요","error":"노트를 옮기지 못했어요. 잠시 후 다시 시도해주세요.","notEnded":"노트 기록을 종료해야 다른 워크스페이스로 이동할 수 있어요.","restrictNonOrgWorkspace":"이 워크스페이스로는 노트를 옮길 수 없어요.","disabledRole":{"badge":{"viewer":"Viewer","unpaidAdmin":"Unpaid admin"},"tooltip":"이 워크스페이스의 {{role}} 구성원이기 때문에 노트를 여기로 옮길 수 없어요. 워크스페이스 Admin에게 Member 또는 Admin 역할을 요청해주세요."},"toast":{"allFail":{"title":"노트를 옮기지 못했어요","notOwner":"공유받은 노트는 다른 워크스페이스로 옮길 수 없어요. 본인이 만든 노트만 옮길 수 있어요.","notEnded":"아직 기록 중인 노트는 옮길 수 없어요. 기록을 종료한 뒤 다시 시도해주세요.","recording":"아직 기록 중인 노트는 옮길 수 없어요. 기록을 종료한 뒤 다시 시도해주세요.","notFound":"삭제되었거나 찾을 수 없는 노트예요. 목록을 새로고침한 뒤 다시 시도해주세요.","mixed":"{{causes}}가 있어요. 해당 노트를 확인한 뒤 다시 시도해주세요.","unknown":"잠시 후 다시 시도해주세요. 문제가 계속되면 고객 문의로 알려주세요."},"partial":{"title":"{{count}}개 노트를 옮겼어요","notOwner":"나머지 {{count}}개는 공유받은 노트라 옮길 수 없어요. 본인이 만든 노트만 옮길 수 있어요.","notEnded":"나머지 {{count}}개는 아직 기록 중이라 옮길 수 없어요. 기록을 종료한 뒤 다시 시도해주세요.","recording":"나머지 {{count}}개는 아직 기록 중이라 옮길 수 없어요. 기록을 종료한 뒤 다시 시도해주세요.","notFound":"나머지 {{count}}개는 삭제되었거나 찾을 수 없어요. 목록을 새로고침한 뒤 다시 시도해주세요.","mixed":"나머지 {{count}}개 중에는 {{causes}}가 있어요. 해당 노트를 확인한 뒤 다시 시도해주세요.","unknown":"나머지 {{count}}개는 옮기지 못했어요. 잠시 후 다시 시도해주세요."},"cause":{"notOwner":"공유받은 노트","notEnded":"기록 중인 노트","recording":"기록 중인 노트","notFound":"삭제되었거나 찾을 수 없는 노트"},"causeJoin":{"two":"{{first}}와 {{second}}"}}}},"documentTemplates":{"tiro":"티로","description":"설명","descriptionPlaceholder":"목적, 맥락, 도메인, 톤과 보이스 등 원하는 문서의 특징을 자유롭게 입력해주세요.","untitledTemplate":"제목 없는 템플릿","sectionCopy":"섹션 복사","deleteSection":"섹션 삭제","sectionTitle":"섹션 제목","sections":"섹션","addSection":"섹션 추가","sectionTypes":{"plainText":"일반 텍스트","actionItems":"액션 아이템","qna":"Q&A","example":"예시 문서"},"sectionPlaceholders":{"plainText":"이 섹션에 작성되었으면 하는 아웃풋의 형식을 티로에게 알려주세요.\\n예시1: 전체 내용을 한 문단으로 요약해줘.\\n예시2: 향후 타임라인별 액션 아이템을 도출해줘.","actionItems":"이 섹션에서 도출하고자 하는 액션 아이템의 유형이나 형식을 티로에게 알려주세요.\\n예시1: 논의된 내용을 To-do 리스트 형태로 정리해줘.\\n예시2: 대화 내용을 바탕으로 우선순위가 높은 업무를 구분해줘.\\n예시3: 이번 주에 실행할 수 있는 구체적인 액션 아이템을 제안해줘.","qna":"세일즈 인터뷰, 전문가 인터뷰와 같이 사전 질문지가 정해져 있는 대화 상황인 경우, 각 질문을 섹션별로 하나씩 입력해주세요. 각 섹션에서 입력된 문항에 해당하는 답변 및 대화 내용을 티로가 빠짐없이 정리해줄 거예요.","example":"예시 양식으로 활용하고 싶은 문서가 있다면 여기에 그대로 붙여넣으세요. 티로가 문서의 양식을 꼼꼼히 분석해서 비슷한 형태로 만들어 드릴게요.\\n전체 문서를 하나의 섹션에 한 번에 입력하셔도 좋고, 문서 구조를 더 명확히 구분하고 싶다면 원하는 부분마다 섹션을 나누어 입력해 보세요."},"delete":{"title":"{{templateTitle}} 삭제","description":"이 문서를 삭제하시겠습니까? 이 작업은 되돌릴 수 없어요.","confirm":"삭제","cancel":"취소","success":"문서가 삭제되었어요.","error":"문서 삭제에 실패했어요."}},"speakerLabeling":{"searchPlaceholder":"참가자 검색 또는 추가...","scope":{"current":"이 섹션만","fromThis":"이 섹션부터","entire":"전체 섹션"},"applying":"변경 중","apply":"적용","toast":{"speakerUpdateError":"화자 변경에 실패했어요","segmentSplitError":"세그먼트 분할에 실패했어요","segmentMergeError":"세그먼트 병합에 실패했어요"}},"multilingual":{"title":"컨퍼런스 모드","backToNote":"노트로 돌아가기","disabledHint":"다국어로 대화를 기록할 때만 사용할 수 있어요. 대화 언어를 다국어로 바꿔주세요","scrollHint":{"jumpToLive":"최신으로"},"recording":{"pause":"일시정지","resume":"재개","start":"시작","preparing":"준비 중"},"translation":{"label":"번역","toggleAriaLabel":"번역 표시","notConfigured":"번역 언어 미설정"},"context":{"openButton":"맥락","guide":"사전에 발표 주제와 인명·기업명 같은 고유명사, 전문용어, 도메인 용어를 입력해두면 기록 정확도가 높아져요."},"guide":{"openButton":"가이드","firstVisitHint":"컨퍼런스 모드가 처음이시라면, 가이드를 읽어보세요","dialogTitle":"Tiro 컨퍼런스 모드 가이드","dialogDescription":"성공적인 이벤트 개최를 위해 사전에 아래 가이드를 읽고 Tiro 실시간 자막과 번역을 셋업해보세요.","tabs":{"preparation":"준비","audio":"음향","display":"화면","troubleshooting":"문제 해결"},"preparation":{"heading":"준비 체크","intro":"성공적인 이벤트를 위해, 아래 순서대로 Tiro 컨퍼런스 모드를 미리 준비해주세요.","phases":[{"title":"전날까지","items":["노트에 이벤트 이름·발표자·장소를 미리 채워두세요. 자막 헤더와 공유 링크에 그대로 쓰여요.","사람 이름·회사명·자주 나올 약어는 메모에 적어두세요. 자막이 훨씬 정확하게 잡아요.","현장 와이파이 속도를 확인하세요. 다운로드 10Mbps·업로드 5Mbps면 안정적이에요.","사람이 많이 몰리면 와이파이가 끊길 수 있어요. 이벤트 전에 사람이 많은 상황을 가정하고 미리 점검해두세요."]},{"title":"현장에 도착하면","items":["마이크를 노트북에 연결하고 소리가 들어오는지 확인하세요. (음향 탭 참고)","자막 띄울 화면을 정하고, 맨 뒷자리까지 가서 글씨가 잘 읽히는지 직접 확인하세요.","노트북 절전·화면 보호기를 꺼두세요. 발표 중에 화면이 꺼지면 곤란해요."]},{"title":"시작 직전","items":["이벤트 시작 전에 테스트 기록을 한 번 진행해보세요. 자막이 화면에 매끄럽게 적히고 자동으로 스크롤되는지 확인하면 준비 끝이에요."]}]},"audio":{"heading":"음향 연결","intro":"자막 품질의 절반 이상이 음향에서 갈려요. 5분만 더 들여 깨끗한 소리를 받아보세요.","body":"현장 마이크 소리를 USB 오디오 인터페이스로 노트북에 직접 받으면, 박수나 주변 잡음이 빠진 깨끗한 음성이 들어와요. 휴대폰이나 노트북 내장 마이크로 받을 때보다 자막 정확도가 1.5~2배까지 올라가요.","stepsHeading":"연결 순서","steps":["음향 감독에게 메인 믹서의 라인아웃 한 채널을 빌려요. (XLR 또는 1/4\\" TRS)","USB 오디오 인터페이스(Focusrite Scarlett Solo 등)로 변환해 노트북에 꽂아요.","테스트 녹음으로 소리가 깨끗하게 들어오는지 확인해요."],"copyMessage":"음향 감독에게 보낼 메시지 복사하기","copySuccess":"복사했어요","copyFailed":"복사하지 못했어요","messageTemplate":"안녕하세요. 현장에서 실시간 자막을 제공하려고 하는데, 깨끗한 음성을 받으려면 발표 음향을 노트북으로 직접 받아야 합니다. 메인 믹서의 라인아웃 한 채널(XLR 또는 1/4\\" TRS)을 사용할 수 있을까요? 변환에 필요한 USB 오디오 인터페이스는 저희가 준비해 갑니다. 연결과 점검에는 30분 정도면 충분합니다. 감사합니다."},"display":{"heading":"화면 구성","intro":"현장 화면 크기와 발표 자료 비중에 맞춰 골라보세요. 청중이 가장 편하게 읽을 수 있는 방식으로 다양하게 설정할 수 있어요.","options":[{"name":"풀스크린 자막","when":"발표 자료 없이 토크나 대담 위주로 진행할 때 좋아요. 자막만 큼직하게 띄워 한눈에 들어와요."},{"name":"발표 자료 + 자막 분할","when":"슬라이드와 자막을 한 화면에 함께 보여주고 싶을 때. 화면을 좌우로 나눠 둘 다 놓치지 않아요."},{"name":"사이드 모니터","when":"메인 화면은 발표 자료로 두고, 옆 보조 모니터에 자막만 따로 띄우고 싶을 때."},{"name":"QR 공유","when":"메인 스크린이 작거나 멀어서 잘 안 보일 때. 청중이 각자 휴대폰으로 자막을 받아 봐요."},{"name":"하이브리드","when":"큰 화면 자막과 QR을 함께 쓰고 싶을 때. 가까이·멀리 앉은 청중까지 모두 챙길 수 있어요."}],"qrTip":"QR 모드를 적극적으로 활용해보세요. 청중이 자신의 기기에서 자기 속도로 읽고, 이벤트를 마친 후 노트를 가져갈 수 있어서, 큰 화면 자막보다 더 좋을 때도 많아요."},"troubleshooting":{"heading":"문제 해결(Troubleshooting)","intro":"이벤트 중 자주 나오는 상황과 대처법을 모았어요.","items":[{"q":"자막이 자꾸 끊기거나 느려요","a":"네트워크부터 확인해주세요. 유선 LAN이 가장 안정적이고, 와이파이라면 사람이 몰릴 때 끊기지 않는지 이벤트 전에 점검해두세요."},{"q":"사람 이름·회사명 같은 고유명사를 정확히 담고 싶어요","a":"이벤트 전에 노트 맥락에 자주 나올 이름·용어·도메인 표현을 미리 입력해두세요. 자막이 훨씬 정확하게 따라가요."},{"q":"발표 중에 화면이 꺼져요","a":"노트북 절전·화면 보호기를 미리 꺼두세요. 화면이 꺼지면 자막도 함께 멈춰요."},{"q":"QR을 미처 못 본 청중이 있어요","a":"시작 슬라이드·좌석 안내에 QR을 띄워두고, 진행자가 시작 직전 한 번 더 안내해주세요."}]}},"settings":{"screenSettings":"화면 설정","darkMode":"다크 모드","pinHeader":"헤더 항상 표시","fontSize":"글자 크기","decreaseFontSize":"글자 크기 줄이기","increaseFontSize":"글자 크기 늘리기","contentWidth":"본문 너비","decreaseContentWidth":"본문 너비 줄이기","increaseContentWidth":"본문 너비 늘리기","displayMode":"디스플레이 모드","displayModes":{"horizontal":"좌우","horizontalMirrored":"좌우 반전","vertical":"상하","verticalMirrored":"상하 반전","fixedSingle":"고정","fixedSingleMirrored":"고정 반전","translationOnly":"번역만"}}},"shareQr":{"openButton":"QR","closeButton":"닫기","eyebrow":"Tiro가 받아쓰고 있어요","instruction":"휴대폰 카메라로 QR 코드를 스캔하세요","untitled":"제목 없음","addMeta":"메타 추가","addSpeaker":"발화자","addVenue":"장소","addNote":"자유 문구","speakerPlaceholder":"발화자","venuePlaceholder":"장소","notePlaceholder":"자유 문구","passwordLabel":"암호","editField":"{{field}} 편집","copy":{"button":"링크 복사","success":"공유 링크가 복사되었어요","failed":"복사에 실패했습니다"},"prompt":{"title":"QR로 실시간 자막을 공유해 보세요","body":"QR 코드를 스캔하면 자기 폰에서 실시간 자막을 볼 수 있어요.","cta":"공유 QR 만들기","scopeReason":"기본 공유 범위가 '초대된 사람만'으로 설정돼 있어요. QR로 공유하려면 링크를 열 수 있는 범위를 선택해 주세요."},"visibility":{"anyone":"링크가 있는 누구나 볼 수 있어요","company":"회사 구성원만 볼 수 있어요. 외부 참석자는 열 수 없어요","private":"초대된 사람만 볼 수 있어요. 다른 참석자는 열 수 없어요"}},"recording":{"download":"음성파일 다운로드","saveAs":"녹음 파일 저장","blockedByPolicy":"조직 정책에 따라 음성파일을 다운로드할 수 없어요","pauseToDownload":"다운로드하려면 녹음을 일시정지하세요","pause":"녹음 일시정지","start":"녹음 시작","resume":"녹음 재개","deviceSelect":"마이크 장치 선택","systemDefault":"시스템 기본값","microphoneSection":"마이크 선택","sameAsSystem":"시스템과 동일","pausedByAnotherRecording":{"title":"녹음이 일시정지됐어요","description":"같은 계정에서 다른 녹음이 시작되어 이 녹음을 일시정지했어요. 지금까지 저장된 내용은 노트에서 확인할 수 있어요.","learnMore":"자세히 알아보기"},"realtimeTranslation":{"label":"번역"}},"transcriptTabs":{"all":"전체","conversationMultilingual":"다국어","languageSelect":"언어 선택","localeNames":{"ko":"한국어","en":"영어","ja":"일본어","de":"독일어","es":"스페인어","fr":"프랑스어","it":"이탈리아어","th":"태국어","sv":"스웨덴어","vi":"베트남어","id":"인도네시아어","zh":"중국어","ms":"말레이어","ru":"러시아어","hi":"힌디어","auto":"다국어"}},"toast":{"deleteError":"노트 삭제에 실패했어요","bulkDeleteError":"노트 삭제에 실패했어요","endError":"노트 종료에 실패했어요","titleUpdateError":"노트 제목 수정에 실패했어요","deleteForbidden":"노트를 삭제할 권한이 없어요. 관리자에게 권한 변경을 요청해 주세요.","titleUpdateForbidden":"노트 제목을 수정할 권한이 없어요. 관리자에게 권한 변경을 요청해 주세요.","restoreError":"노트 복구에 실패했어요","restoreSuccess":"노트를 복구했어요","permanentDeleteError":"노트 영구 삭제에 실패했어요"},"document":{"toast":{"generateError":"문서 생성에 실패했어요","templateCreateError":"문서 템플릿 생성에 실패했어요","templateDeleteError":"문서 템플릿 삭제에 실패했어요","templateUpdateError":"문서 템플릿 수정에 실패했어요","sectionCreateError":"문서 섹션 추가에 실패했어요","sectionUpdateError":"문서 섹션 수정에 실패했어요","sectionContentLengthError":"현재 {{currentLength}}자예요. 10,000자 이하로 저장해 주세요.","sectionDeleteError":"문서 섹션 삭제에 실패했어요","shareError":"문서 템플릿 공유에 실패했어요","unshareError":"문서 템플릿 공유 해제에 실패했어요"}},"recordingSource":{"call":"통화 녹음","watch":"Watch 녹음","text":"가져온 전사본"},"documentRecovery":{"done":"문서를 되돌렸어요.","title":"문서를 초기화할까요?","description":"문서의 모든 수정 내용을 생성본으로 되돌립니다. 초기화하기 전 수정으로는 돌아갈 수 없어요."},"transcriptRecovery":{"resetKind":"{{kind}} 초기화","resetKindDescription":"모든 문단의 {{kind}} 수정 내용을 자동 생성본으로 되돌립니다. 다른 종류의 내용은 유지됩니다. 초기화 이전의 이 수정은 되돌릴 수 없어요.","originalSpeakers":"원문의 화자 배정도 자동 생성 상태로 돌아갑니다.","kinds":{"original":"원문","translated":"번역","summary":"문단 요약"},"done":"변경을 되돌렸어요.","undoSpeakers":"화자 되돌리기"},"summaryRecovery":{"unknownResult":"처리 결과를 확인하지 못했어요. 새로고침해 주세요.","edited":"수정됨","undo":"되돌리기","reset":"초기화","title":"요약을 초기화할까요?","description":"생성된 요약으로 돌아갑니다. 지금까지의 수정은 되돌릴 수 없어요.","done":"요약을 되돌렸어요."},"contentEdit":{"edited":"(edited)","title":"생성본으로 되돌릴까요?","description":"현재 수정 내용은 복구할 수 없어요. 저장된 생성본으로 돌아갑니다.","cancel":"취소","restore":"생성본으로 되돌리기","restored":"생성본으로 되돌렸어요.","conflict":"내용이 변경됐어요. 확인한 뒤 다시 시도해 주세요.","failed":"되돌리지 못했어요. 다시 시도해 주세요.","speakers":"화자 정보도 생성본으로 돌아갑니다.","saveFailed":"저장하지 못했어요. 작성한 내용은 그대로 남아 있어요.","saveConflict":"다른 수정이 먼저 저장됐어요. 작성한 내용은 그대로 남아 있어요.","retryRead":"다시 불러오기","refreshRequired":"저장된 내용을 확인하면 편집을 계속할 수 있어요.","segmentChangeFailed":"저장된 내용을 다시 불러왔어요. 변경 내용을 확인해 주세요.","savedRefreshFailed":"저장됐지만 최신 내용을 불러오지 못했어요.","refreshFailed":"복원됐지만 최신 내용을 불러오지 못했어요."}}`,
  ),
  O = {
    placeholder: "노트에서 검색...",
    noResults: "검색 결과가 없어요",
    searching: "검색 중...",
    oneItemChanged: "1개 항목이 변경되었습니다",
    itemsChanged: "{{count}}개 항목이 변경되었습니다",
    itemsRestored: "{{count}}개 항목이 복원되었습니다",
    changeError: "변경 중 오류가 발생했습니다",
    restoreError: "복원 중 오류가 발생했습니다",
    enterSearchAndReplace: "검색어와 바꿀 텍스트를 모두 입력해주세요",
    currentTab: "현재 탭",
    searchIn: "{{tab}}에서 검색",
    editWords: "단어 수정하기",
    enterReplaceText: "바꿀 텍스트를 입력하세요",
    replace: "바꾸기",
    replaceAll: "모두 바꾸기",
    undo: "실행 취소",
    all: "전체",
  },
  F = {
    customerSupport: "고객문의",
    minute: "분",
    cancel: "취소",
    create: "생성",
    creating: "생성 중...",
    submit: "제출",
    actions: "작업",
    noteActions: "노트 작업",
    save: "저장",
    edit: "수정",
    delete: "삭제",
    deleting: "삭제 중...",
    saving: "저장 중...",
    close: "닫기",
    copy: "복사",
    confirm: "확인",
    search: "검색",
    synchronizing: "저장 중...",
    noContexts: "이전 맥락이 없습니다",
    back: "뒤로",
    refresh: "새로고침",
    retry: "다시 시도",
    backToNotes: "노트 목록",
    backToWiki: "위키",
    error: "오류가 발생했어요",
    tryAgainLater: "잠시 후 다시 시도해주세요",
    exporting: "내보내는 중...",
    loading: "로딩 중...",
    loadMoreFailed: "다음 목록을 불러오지 못했어요. 다시 시도해 주세요.",
    remove: "제거",
    removing: "제거 중...",
    moving: "이동 중...",
    comingSoon: "곧 출시될 기능이에요",
  },
  x = {
    startDate: "시작일",
    endDate: "종료일",
    pickEndDate: "달력에서 시작일과 종료일을 차례로 선택하세요",
    exceedsMax: "최대 {{maxDays}}일까지 선택할 수 있어요",
    dayCount: "{{count}}일",
    clear: "초기화",
    cancel: "취소",
    apply: "적용",
    presets: {
      today: "오늘",
      last7Days: "최근 7일",
      last30Days: "최근 30일",
      last90Days: "최근 90일",
      thisMonth: "이번 달",
      lastMonth: "지난달",
      lastYear: "최근 1년",
    },
  },
  B = {
    upcomingEvents: "예정된 일정",
    connectCalendar: "캘린더 연결하기",
    connectCalendarDescription:
      "캘린더를 연결해 예정된 일정을 확인하실 수 있어요.",
    joinMeeting: "미팅 참여",
    createNote: "노트 생성",
    noEvents: "예정된 일정이 없습니다",
    expiredConnectionTitle: "{{provider}} 캘린더 연동이 만료되었어요",
    expiredConnectionDescription:
      "{{email}} · 정상 캘린더 일정은 계속 표시돼요",
    reconnect: "재연동",
    today: "오늘",
    tomorrow: "내일",
    previousMonth: "이전 달",
    nextMonth: "다음 달",
    allDay: "하루 종일",
    desktopAppDownload: "<b>데스크탑 앱</b>에서 <bb>미팅 전 알림</bb> 받기",
    desktopAppDownload2:
      "<b>비대면 회의</b>는 <bb>데스크탑 앱</bb>에서 기록하세요.",
    showMore: "더보기",
    showLess: "접기",
    expand: "펼치기",
    collapse: "접기",
    viewAllEvents: "일정 전체 보기",
    nearEvents: "가까운 일정",
    startsSoon: "곧 시작",
    options: "일정 옵션",
    refresh: "캘린더 새로고침",
    inProgress: "진행 중",
    connectButton: "연결하기",
    desktopNudgeSubtitle: "15분 전에 알려드려요",
    desktopNudgeTitle: "회의 자동 녹음",
    desktopNudgeInlineButton: "데스크탑에서 미팅 15분 전 알림 받기",
  },
  U = {
    recording: {
      createFailed: "노트 생성에 실패했어요",
      noMatchingSession: "해당 녹음 세션을 찾을 수 없어요",
    },
  },
  W = {
    justNow: "방금",
    minutesAgo: "{{minutes}}분 전",
    hoursAgo: "{{hours}}시간 전",
    yesterday: "어제",
    daysAgo: "{{days}}일 전",
    weeksAgo: "{{weeks}}주 전",
  },
  _ = {
    personDeleted: { description: "참석자를 목록에서 삭제했어요" },
    transcriptionPaused: {
      title: "대화 기록 일시 중지",
      description: "15분 동안 대화 기록이 없어 일시 중지했어요",
      dismiss: "닫기",
    },
    connectionLost: {
      title: "네트워크 연결이 불안정해요",
      description: "네트워크가 복구되면 대화 기록이 자동으로 다시 시작돼요",
      dismiss: "닫기",
    },
    generationConnectionUnavailable: {
      title: "연결이 끊겨 생성할 수 없어요",
      description: "네트워크 연결을 확인한 뒤 다시 시도해주세요",
    },
    systemAudioCaptureFailed: {
      title: "시스템 사운드를 녹음하지 못했어요",
      description:
        "마이크는 정상 녹음 중이에요. 컴퓨터 소리가 안 잡히면 해결 방법을 확인해 주세요.",
      action: "해결 방법",
    },
    systemAudioCaptureEnded: {
      title: "시스템 사운드 수음 중단",
      description: "시스템 사운드 수음이 중단됐어요. 마이크만 녹음 중이에요.",
    },
    nativeAudioStartFailed: {
      title: "녹음을 시작하지 못했어요",
      description:
        "마이크 또는 시스템 사운드에 접근하지 못했어요. 권한과 오디오 장치를 확인한 뒤 다시 시도해주세요.",
    },
    nativeAudioFailure: {
      captureFailed: {
        title: "오디오를 사용할 수 없어요",
        description: `마이크 또는 시스템 오디오를 사용할 수 없어요.
오디오 장치를 확인한 뒤 다시 시도해주세요.`,
      },
      systemUnavailable: {
        title: "시스템 사운드를 사용할 수 없어요",
        description: `시스템 오디오 장치를 확인한 뒤 다시 시도해주세요.
마이크만으로는 녹음할 수 없어요.`,
      },
      noSources: {
        title: "사용할 오디오 소스가 없어요",
        description:
          "마이크 또는 시스템 오디오 장치를 연결한 뒤 다시 시도해주세요.",
      },
      micPermission: {
        title: "마이크 권한이 필요해요",
        description:
          "시스템 설정에서 Tiro의 마이크 사용을 허용한 뒤 다시 시도해주세요.",
      },
      systemPermission: {
        title: "시스템 오디오 권한이 필요해요",
        description:
          "시스템 설정에서 Tiro의 시스템 오디오 녹음을 허용한 뒤 다시 시도해주세요.",
      },
      permissionDenied: {
        title: "오디오 권한이 필요해요",
        description:
          "Tiro의 마이크와 시스템 오디오 권한을 확인한 뒤 다시 시도해주세요.",
      },
      startTimeout: {
        title: "오디오 시작이 지연되고 있어요",
        description: "오디오 장치를 확인한 뒤 녹음을 다시 시도해주세요.",
      },
      processTerminated: {
        title: "오디오 구성 요소가 종료됐어요",
        description: `운영체제 또는 다른 프로그램이 Tiro의 오디오 구성 요소를 종료했어요.
오디오 관련 프로그램을 종료한 뒤 다시 시도해주세요.`,
      },
      processExited: {
        title: "오디오 구성 요소가 비정상 종료됐어요",
        description: "오디오 장치를 확인한 뒤 녹음을 다시 시도해주세요.",
      },
      processUnresponsive: {
        title: "오디오 구성 요소가 응답하지 않아요",
        description: `Tiro의 오디오 구성 요소가 응답하지 않아요.
오디오 장치를 확인한 뒤 다시 시도해주세요.`,
      },
      unsupportedOs: {
        title: "이 macOS에서는 Desktop 녹음을 쓸 수 없어요",
        description:
          "Desktop 녹음은 macOS 14.2 이상에서 지원해요. macOS를 업데이트하거나 웹에서 녹음해 주세요.",
      },
    },
    nativeAudioMicNotFound: {
      title: "마이크를 찾지 못했어요",
      description: `마이크가 없는 환경이라면 시스템 소리만 기록할 수 있어요.
이 경우 내 목소리는 녹음되지 않아요.`,
      settings: "마이크 설정 확인",
      systemOnly: "시스템 소리만 기록",
      cancel: "취소",
    },
    systemOnlyRecordingStarted: {
      title: "시스템 소리만 기록을 시작했어요",
      description: "내 목소리는 녹음되지 않아요.",
    },
  },
  q = {
    description: `인앱 브라우저에서는 소셜 로그인(구글, 마이크로소프트 등)이 정상적으로 안될 수 있어요.
사용하시는 기기의 기본 브라우저에서 티로를 사용해주세요!`,
    usingBrowser: "현재 {{browser}} 브라우저를 사용 중이신 것 같아요",
    copyLink: "링크 복사하기",
    linkCopied: {
      title: "링크가 복사되었어요!",
      description: "브라우저를 열어 링크를 붙여넣어주세요.",
    },
    kakaotalk: "카카오톡",
    facebook: "페이스북",
    instagram: "인스타그램",
    naver: "네이버",
    linkedin: "링크드인",
    twitter: "트위터",
    threads: "스레드",
    "in-app": "인앱",
  },
  G = {
    title: "티로 앱으로 이동 중...",
    redirectToAppStore: "App Store로 이동합니다",
    redirectToPlayStore: "Google Play로 이동합니다",
    redirectToWebsite: "웹사이트로 이동합니다",
    clickHere: "여기를 클릭하여 직접 이동",
  },
  H = {
    title: "티로로 녹음 시작",
    description: "아래 버튼을 누르면 티로 앱이 열리고 녹음이 시작됩니다.",
    openApp: "티로 앱에서 녹음 시작",
    noApp: "앱이 없으신가요? 티로 설치하기",
  },
  V = {
    hours_one: "{{count}}시간",
    hours_other: "{{count}}시간",
    minutes_one: "{{count}}분",
    minutes_other: "{{count}}분",
    seconds_one: "{{count}}초",
    seconds_other: "{{count}}초",
  },
  K = {
    failedToUpdate: "변경사항을 반영하지 못했어요",
    pleaseTryAgain: "잠시 후 다시 시도해 주세요.",
    title: "잠시만요!",
    description: "일시적인 문제가 발생했어요. 다시 시도해주시겠어요?",
    notFound: "페이지를 찾지 못했어요",
    notFoundDescription:
      "요청하신 페이지를 찾을 수 없어요. 주소를 다시 한 번 확인해주세요.",
    goBack: "이전 페이지로",
    goHome: "메인으로",
    maintenance: "티로는 지금 점검 중이에요",
    maintenanceDescription:
      "더 나은 서비스를 제공하기 위해 티로를 점검하고 있어요.",
    contactSupport: {
      title: "앗! 문제가 발생했어요.",
      description: "메신저를 통해 티로 팀에 문의해 주세요.",
      button: "문의하기",
    },
  },
  z = {
    helpCenter: "사용가이드",
    contactTeam: "문의하기",
    noAudioDetected: {
      title: "소리가 들어오지 않고 있어요",
      description:
        "마이크 입력이 감지되지 않아요. 마이크 음소거나 입력 장치 설정을 확인해보세요.",
      action: "확인 방법 보기",
      dismiss: "닫기",
    },
    noAudioForWhile: {
      title: "한동안 소리가 들리지 않아요",
      description:
        "자리를 비우신 거라면 괜찮아요. 계속 녹음 중이어야 한다면 마이크 상태를 확인해보세요.",
      action: "확인 방법 보기",
      dismiss: "닫기",
    },
    micPermissionDenied: {
      title: "마이크 접근 권한이 필요해요",
      description:
        "마이크 접근이 차단돼 소리를 받지 못하고 있어요. 설정에서 마이크 권한을 허용해주세요.",
      action: "확인 방법 보기",
      dismiss: "닫기",
    },
  },
  Q = {
    join: {
      description: `워크스페이스에 초대받았어요.
초대를 수락하여 함께 협업하세요.`,
      acceptButton: "합류하기",
      laterButton: "나중에",
    },
    invalid: {
      description: `초대 링크가 올바르지 않아요.
워크스페이스 어드민에게 링크를 다시 요청해 주세요.`,
      backButton: "티로로 돌아가기",
    },
  },
  j = {
    title: "문의하기",
    helpTitle: "도움이 필요하시거나 궁금하신 점이 있으신가요?",
    enterpriseTitle: "팀을 위한 Tiro 도입을 고려하고 계신가요?",
    helpCenterTitle: "고객센터나 자주 묻는 질문을 찾으시나요?",
    visitHelpCenter: "고객센터 방문하기",
    visitFAQ: "자주 묻는 질문 보기",
  },
  $ = {
    links: {
      pricing: "가격 안내",
      roiEstimate: "도입 견적",
      guide: "사용 가이드",
      changelog: "체인지로그",
      blog: "블로그",
      press: "언론 보도",
      contact: "일반 문의",
      contactTeamPlan: "기업 문의",
      termsOfService: "서비스 이용약관",
      privacyPolicy: "개인정보처리방침",
      status: "서비스 상태",
      apiReference: "API 문서",
      cli: "CLI",
      mcpServer: "MCP Server",
      webhooks: "Webhook",
      accessibility: "접근성 지원",
    },
    colTitles: {
      product: "프로덕트",
      developer: "개발자 도구",
      compare: "서비스 비교",
      contact: "고객 지원",
      legal: "약관·보안",
    },
    compareHub: "AI 회의록 15종 비교",
    business: {
      name: "주식회사 더플레이토",
      registrationNumber: "사업자등록번호 649-81-03140",
      ceo: "대표이사 임은성",
      mailOrder: "통신판매업 신고 제 2025-서울강남-02575호",
      mailOrderLookup: "통신판매정보 확인",
      addressLocal: "서울특별시 관악구 관악로17길 9, 3층",
      addressUs: "455 Market St Ste 1940, San Francisco, CA 94105, USA",
      emailLabel: "이메일",
      partnersLabel: "사업 제휴 문의",
      copyright: "© 2026 ThePlato Inc.",
    },
    slogan: "We make something wonderful.",
  },
  Z = {
    heading: "Press",
    description:
      "티로 Tiro가 주인공으로 다뤄진 보도와 인터뷰를 모았습니다. 필요한 기사와 영상을 빠르게 찾아보세요.",
    filters: {
      all: "All",
      coverage: "보도",
      interviews: "인터뷰",
      funding: "투자",
      global: "글로벌",
      social: "영상·소셜",
    },
    controls: {
      searchPlaceholder: "기사 검색",
      rss: "RSS",
      openArticle: "열기",
      noResults: "조건에 맞는 보도가 없습니다.",
    },
    kinds: {
      article: "Article",
      profile: "Profile",
      social: "Social",
      video: "Video",
    },
    meta: {
      title: "Press | 티로 Tiro",
      description:
        "티로가 주인공으로 다뤄진 보도와 인터뷰를 모았습니다. AI 회의록, 업무 맥락, 글로벌 확장에 관한 공식 언론 기록을 확인하세요.",
      keywords:
        "티로, Tiro, ThePlato, 더플레이토, Press, AI 회의록, 비즈니스 컨텍스트, 회의 자동화, AI 에이전트, MCP, 언론 보도, 인터뷰",
    },
  },
  Y = {
    selectFileToUpload: "업로드할 파일을 선택하세요",
    orDragAndDrop: "또는 여기에 드래그 앤 드롭하세요",
    contextFileUpload: "맥락 파일 업로드",
    supportedFormats: "MP4, MP3, MOV, 등. ",
    fileSizeLimit: "1GB 이하, 5시간 이내",
    selectFile: "파일 선택",
    context:
      "대화 상황이나 맥락을 알려주시면 더 정확한 요약을 받아보실 수 있어요.",
    contextHint: `맥락을 입력하면 기록되는 노트의 정확도가 크게 높아져요.
캡쳐한 이미지를 붙여넣으실 수도 있어요.`,
    contextAdd: "맥락 추가",
    noteLanguage: "기록 언어",
    speakerCount: "화자수 입력",
    speakerCountAutoDetect: "자동 감지",
    speakerCountOption_one: "{{count}}명",
    speakerCountOption_other: "{{count}}명",
    convert: "변환하기",
    uploading: "업로드 중...",
    converting: "변환 중...",
    error: "오류",
    unsupportedFormat: "지원하지 않는 파일 형식입니다",
    fileSizeError: "파일이 너무 큽니다",
    pleaseCheckSize: "1GB 미만의 파일을 업로드해주세요",
    pleaseCheckFormat: "지원되는 형식의 오디오 파일을 업로드해주세요",
    emptyFileTitle: "파일이 비어 있어 업로드할 수 없어요",
    emptyFileDescription:
      "파일을 열어 재생되는지 확인한 뒤 다시 선택해 주세요.",
    loadingDuration: "재생 시간 불러오는 중...",
    estimatedDuration: "예상 처리 시간: {{duration}}",
    progress: {
      REQUEST_RECEIVED: "파일을 업로드하고 있어요...",
      TRANSCRIPTION_STARTED: "음성을 텍스트로 변환하고 있어요...",
      TRANSCRIPTION_COMPLETED: "텍스트 변환이 완료되었어요!",
      TRANSCRIPTION_ERROR: "변환 중 오류가 발생했어요. 다시 시도해주시겠어요?",
      PARAGRAPHS_SPLIT: "티로가 구조화된 문단으로 내용을 정리하고 있어요...",
      SENTENCES_SPLIT: "티로가 문장 구조를 정리하고 있어요...",
      PARAGRAPHS_SUMMARIZING_STARTED: "문단 요약을 생성하고 있어요...",
      PARAGRAPHS_SUMMARIZING_COMPLETED: "문단 요약이 완료되었어요!",
      NOTE_METADATA_EXTRACTION_STARTED: "한페이지 문서를 생성하고 있어요...",
      NOTE_METADATA_EXTRACTION_COMPLETED: "한페이지 문서를 생성하고 있어요...",
      NOTE_SUMMARY_GENERATION_STARTED: "한페이지 문서를 생성하고 있어요...",
      NOTE_SUMMARY_GENERATION_COMPLETED: "한페이지 문서이 완료되었어요!",
      COMPLETED: "노트 정리가 완료되었어요!",
      ERROR: "처리 중 오류가 발생했어요. 다시 시도해주세요.",
    },
    googleDriveFileName: "구글 드라이브 파일",
    invalidLinkError:
      "유효한 링크가 아니에요. 지금은 구글 드라이브 링크만 지원하고 있어요.",
    linkUploadTooltip: `현재 링크 업로드는 구글 드라이브만 지원하고 있어요.
구글 드라이브 링크 입력시 권한을 확인해주세요`,
    linkPlaceholder:
      "구글 드라이브 링크를 입력하실 수도 있어요. https://drive.google.com/file/d/:fileId",
    contextPlaceholder: `인터뷰
[일론 머스크]와의 인터뷰입니다. [로켓 과학] 분야의 전문 용어와 인물 이름이 많이 나오니, 정확하게 기록하고 요약은 친근한 톤으로 작성해주세요.
사람/회사/제품: [테슬라], [뉴럴링크], [로보택시]`,
    fileUpload: "파일 업로드",
    networkBlockedTitle: "파일 업로드에 실패했어요",
    networkBlockedDescription:
      "기업 네트워크 방화벽이 업로드를 차단했을 수 있어요. 모바일 핫스팟으로 연결 후 다시 시도해 주세요.",
  },
  J = {
    unsupportedOs: {
      message: "Desktop 녹음은 macOS {{minimumVersion}} 이상에서 지원해요",
      detail: "macOS를 업데이트하거나 웹에서 녹음해 주세요.",
    },
    unavailable: {
      message: "macOS 버전을 확인하지 못해 Desktop 녹음을 시작할 수 없어요",
      detail:
        "Desktop 녹음은 macOS {{minimumVersion}} 이상에서 지원해요. 웹에서 녹음해 주세요.",
    },
    folderOpenFailed: {
      message: "녹음 폴더를 열지 못했어요",
      detail:
        "폴더가 아직 없거나 열 수 있는 권한이 없을 수 있어요. 잠시 후 다시 시도해 주세요.",
    },
    webOpenFailed: {
      message: "웹을 열지 못했어요",
      detail: "브라우저에서 Tiro 웹에 접속해 녹음해 주세요.",
    },
    recordOnWeb: "웹에서 녹음하기",
    openRecordingFolder: "녹음 폴더 열기",
    close: "닫기",
  },
  X = {
    title: "Tiro가 대화를 기록할 수 있도록 허용해주세요",
    description: `마이크와 컴퓨터 소리를 함께 담아 나와 상대의 대화를 모두 기록해요.
회의에 들어오는 봇 없이, Tiro로 기록하는 동안에만 작동해요.`,
    transcribeMyVoice: "내 목소리 기록하기",
    transcribeMyVoiceHint: "마이크로 들어오는 내 목소리를 기록해요",
    transcribeOthersVoice: "상대의 목소리 기록하기",
    transcribeOthersVoiceHint: "스피커로 들리는 상대의 목소리를 기록해요",
    enable: "권한 허용",
    granted: "허용됨",
    continue: "계속하기",
  },
  ee = {
    menu: {
      ariaLabel: "메뉴 열기",
      newNote: "새 노트",
      settings: "설정",
      checkForUpdates: "업데이트 확인...",
      restartToApply: "재시작하여 업데이트 적용",
      logout: "로그아웃",
      quit: "종료",
      file: "파일",
      edit: "편집",
      view: "보기",
      help: "도움말",
      undo: "실행 취소",
      redo: "다시 실행",
      cut: "잘라내기",
      copy: "복사",
      paste: "붙여넣기",
      selectAll: "전체 선택",
      reload: "새로고침",
      resetZoom: "기본 크기",
      zoomIn: "확대",
      zoomOut: "축소",
      toggleFullscreen: "전체 화면 전환",
      toggleDevTools: "개발자 도구",
      keyboardShortcuts: "키보드 단축키",
      changelog: "새 소식",
      about: "Tiro 정보",
      update: {
        upToDate: {
          message: "최신 버전을 사용 중이에요",
          detail: "현재 버전: {{version}}",
          confirm: "확인",
        },
        available: {
          message: "새 버전 {{version}}을 받았어요",
          detail: "지금 설치하면 Tiro를 재시작해 새 버전으로 전환돼요.",
          updateNow: "지금 설치",
          later: "나중에",
        },
        downloading: {
          message: "새 버전을 받고 있어요",
          detail:
            "백그라운드에서 {{version}}을 내려받는 중이에요. 다 받으면 알려드릴게요.",
          confirm: "확인",
        },
        error: {
          message: "업데이트를 확인하지 못했어요",
          detail: "잠시 후 다시 시도해주세요.",
          confirm: "확인",
        },
      },
    },
  },
  te = {
    upToDate: {
      message: "최신 버전을 사용 중이에요.",
      detail: "현재 버전: {{version}}",
      confirm: "확인",
    },
    available: {
      message: "새 버전({{version}})이 준비됐어요.",
      detail: "지금 설치하면 Tiro를 재시작해 새 버전으로 전환돼요.",
      updateNow: "지금 설치",
      later: "나중에",
    },
    downloading: {
      message: "새 버전을 사용할 수 있어요.",
      detail: `지금 백그라운드에서 받고 있어요. 다 받으면 메뉴의 ‘Restart to Apply Update’를 눌러 적용할 수 있어요.
{{current}} → {{latest}}`,
      confirm: "확인",
    },
    error: {
      message: "업데이트를 확인하지 못했어요.",
      detail: "잠시 후 다시 시도해주세요.",
      confirm: "확인",
    },
  },
  ie = {
    installNewVersion: "지금 v{{version}} 업데이트",
    available: "새로운 버전의 업데이트가 있어요",
    description: "지금 설치하시겠어요?",
    button: "업데이트",
    nextTime: "나중에",
    newFeatures: "{{version}} 변경사항",
    required: "필수 업데이트 안내",
    forceDescription: `티로가 여러분을 위해 놀라운 변경사항들을 준비했어요.
앱을 최신 버전으로 업데이트 해주세요!`,
    updateNow: "지금 업데이트",
    completed: {
      title: "업데이트가 완료됐어요",
      description: "새로운 기능을 사용해보세요",
      viewChangelog: "변경사항 보러가기",
      badge: "v{{version}} 업데이트 완료",
    },
  },
  oe = {
    systemSuspend: {
      title: "대화 기록을 중단했어요",
      body: "기록된 내용을 확인해보세요",
      action: "노트 확인하기",
    },
  },
  ne = {
    welcome: {
      logoAlt: "Tiro",
      closeAria: "온보딩 환영 모달 닫기",
      title: "가입을 환영합니다!",
      creditLabel: "유효기간 3주",
      validUntil: "{{date}}까지 사용할 수 있어요",
      creditUnit: "분",
      breakdown:
        "지금 바로 <b>{{earned}}분</b> · 온보딩 {{steps}}단계로 <b>+{{remaining}}분</b>",
      startButton: "바로 노트 만들기",
    },
    tasks: {
      eyebrow: "시작하기",
      title: "Tiro 온보딩을 통한 무료 사용량 획득",
      setupTitle: "Tiro 설정 완료하기",
      collapseAria: "온보딩 태스크 접기",
      expandAria: "온보딩 태스크 펼치기",
      collapsedTitle: "무료 사용량 받기",
      collapsedDoneTitle: "모두 완료했어요",
      minutesUnit: "분",
      completed: "{{completed}}/{{total}} 완료",
      completedSuffix: "완료",
      calendarTitle: "캘린더 연동",
      required: "· 필수",
      calendarDescription: "회의 참여와 기록을 바로 시작해요.",
      desktopTitle: "데스크탑 앱 설치",
      desktopDescription: "원본 저장·화상 미팅 기록을 지원해요.",
      mobileTitle: "모바일 앱 설치",
      mobileDescription: "노트북 없이 어디서나 기록해요.",
      firstNoteTitle: "첫 노트 만들기",
      firstNoteDescription: "문단 요약, 문서 생성을 경험해봐요.",
      connectButton: "연결",
      installButton: "설치",
      recordButton: "기록",
      credit: "+{{minutes}}",
      endTitle: "Tiro 온보딩 종료하기",
      endDescription: "필요한 설정은 나중에 다시 바꿀 수 있어요.",
      calloutTitle: "티로를 더 잘 활용하는 법",
      calloutDescription: "즐겨 쓰는 AI에 붙여넣고 물어보세요.",
    },
    firstNoteRecording: {
      questions: {
        team: "어떤 팀에서 일하고 계신가요?",
        role: "어떤 역할을 맡고 계신가요?",
        terms: "자주 쓰는 이름이나 용어가 있나요?",
        finish: "일시정지 후 기록 종료를 눌러주세요.",
      },
    },
    firstNoteResult: {
      eyebrow: "첫 기록",
      title: `방금 60초에서
티로가 이렇게 기록했어요`,
      paragraphStat: "기록된 문단",
      keywordStat: "키워드",
      termsLabel: "이름과 용어",
      loadingKeywords:
        "방금 말한 내용에서 기억하면 좋을 이름과 용어를 찾고 있어요.",
      keywordError: "키워드를 불러오지 못했어요. 노트는 그대로 저장됐어요.",
      emptyKeywords: "추가할 키워드를 찾지 못했어요. 노트는 그대로 저장됐어요.",
      rememberNote: "단어장에 추가하면 다음 회의에서 기억할게요.",
      addButton: "단어장에 추가하기",
      addingButton: "추가 중",
      extractingButton: "키워드 찾는 중",
      goToNoteButton: "내 노트로 가기",
      retryButton: "다시 녹음",
      saveAllButton: "단어장에 모두 저장하기",
      addKeywordAria: "{{keyword}} 단어장에 추가",
      addedKeywordAria: "{{keyword}} 저장됨",
      createdToastTitle: "첫 노트가 만들어졌어요.",
      createdToastDescription:
        "이제 캘린더를 연동하고 실제 회의에서 사용해 보세요.",
      addSuccess: "단어장에 추가했어요",
      addError: "단어장에 추가하지 못했어요",
    },
    audioReplayPreference: {
      title: "음성 원본, 지금 정해요",
      description: `기록을 시작하기 전에 한 번만 고르면 돼요.
설정에서 언제든 바꿀 수 있어요.`,
      discardTitle: "원본 폐기",
      discardDescription: "텍스트만 남길 때",
      keepTitle: "원본 보관",
      keepDescription: "원문 확인이 필요할 때",
      discardNotice: "텍스트만 남기고, 음성은 전사 직후 삭제해요.",
      keepNotice: "음성 원본을 보관하고, 문단별로 다시 들을 수 있어요.",
      paragraphReplayTitle: "문단별 다시 듣기",
      paragraphReplayDescription: "각 문단에서 원본 음성을 재생할 수 있어요.",
      wholeAudioBackupTitle: "전체 음성 백업",
      wholeAudioBackupDescription: "데스크탑 앱에서만 가능",
      wholeAudioBackupOrgLocked: "조직 정책으로 잠겨 있어요",
      wholeAudioBackupDesktopDescription: "전체 음성 파일을 이 기기에 보관해요",
      continueButton: "계속하기",
    },
    aiPrompt: {
      title: `Tiro와 잘 협업하는 법,
AI에게 물어봐요.`,
      description:
        "Tiro 활용 방법을 AI에게 물어볼 수 있는 프롬프트를 복사합니다.",
      closeAria: "AI 협업 프롬프트 모달 닫기",
      prompt: `당신은 이미 Tiro를 쓰기 시작한 팀이 Tiro와 더 잘 협업하도록 돕는 AI 어드바이저입니다.

Tiro는 회의 대화, 결정, 맥락, 다음 할 일을 AI agent가 바로 쓸 수 있는 컨텍스트로 정리합니다. 사용자가 팀, 역할, 회의 방식, 자주 쓰는 도구, 반복 업무를 말하면 아래를 제안하세요.

1. Tiro로 먼저 기록하면 좋은 회의
2. 회의 후 자동화하면 좋은 후속 작업
3. 단어장에 추가하면 정확도가 좋아질 이름과 용어
4. MCP, API, Webhook, 내보내기로 연결하면 좋은 워크플로우
5. 이번 주 바로 시도할 수 있는 작은 액션

모르는 제품 세부 정보는 단정하지 말고, Tiro 공식 문서나 팀에 확인하라고 안내하세요.

먼저 이렇게 물어보세요:
“어떤 팀에서 일하고 있고, 회의가 끝난 뒤 가장 번거로운 일이 무엇인가요?”`,
      steps: {
        copy: "아래 버튼으로 프롬프트를 복사해요.",
        paste: "Claude·ChatGPT·Gemini 등 AI agent 대화창에 붙여넣어요.",
        context: "나와 우리 팀 상황을 알려주면 활용 방법을 같이 찾아 줘요.",
      },
      promptLabel: "프롬프트 내용",
      promptCount: "{{count}}자",
      expandButton: "펼쳐 보기",
      collapseButton: "접기",
      copyButton: "프롬프트 복사 하기",
      copiedButton: "복사 완료",
      copyFailedButton: "다시 시도",
    },
    step1: {
      badge: "핵심 기능 ➀",
      title: "실시간 대화 기록",
      description:
        "새 노트를 만든 후, 하단의 **빨간색 버튼**을 누르면 기록이 시작돼요.",
      audioReplay: {
        title: "음성 다시 듣기",
        description: "설정을 켜두면 음성파일을 나중에 다시 들을 수 있어요.",
        off: "OFF",
        on: "ON",
      },
    },
    step2: {
      badge: "핵심 기능 ➁",
      title: "맞춤 문서 생성",
      description: `클릭 한 번으로 대화를 한페이지 맞춤형 문서로 만들어보세요.
기본 템플릿과 나만의 템플릿 모두 지원합니다.`,
    },
    step3: {
      badge: "핵심 기능 ➂",
      title: "원하는 방식으로 공유",
      description: `공유 URL을 생성하거나 공동 작업자를 초대하세요.
자주 쓰는 툴에 바로 저장하고, 원한다면 파일로도 내보낼 수도 있어요.`,
    },
    step4: {
      badge: "데스크탑 앱 안내",
      title: "비대면 회의는 데스크탑 앱에서 기록하세요.",
      features: {
        systemAudio: "시스템 사운드 기록 가능 (화상회의, 동영상)",
        calendarIntegration: "캘린더 연동하고 미팅 15분 전 알림 받기",
      },
      downloadButton: "다운로드",
    },
    step5: {
      badge: "무료체험 안내",
      title: "티로가 <b>무료체험 {{quotaMinutes}}분</b>을 선물했어요.",
      description: `3주 동안 티로의 모든 기능을 경험하실 수 있어요.
지금 바로 노트를 만들어볼까요?`,
      eventBadge: "EVENT",
      eventDescription:
        "가입 후 **24시간** 안에 **10분 이상** 노트 기록 시 **50분 추가 크레딧**을 드려요.",
      createNoteButton: "바로 노트 만들기",
      heroTitle: `3주간 사용 가능한
무료체험 크레딧`,
      heroDescription: `약 {{count}}회 분량의 회의를
기록할 수 있어요.`,
    },
    navigation: { previous: "이전", next: "다음" },
  },
  re = {
    advisorDebug: {
      toggle: "자동 제안 진단",
      details: "실행 상세",
      noCard: "카드 없는 실행",
      inputCount: "입력 문단 {{count}}개",
      paragraph: "문단 {{number}}",
      unknownParagraph: "문단으로 이동",
      navigationFailed: "문단으로 이동하지 못했어요.",
      response: "모델 응답",
      validation: "검증 결과",
      validatedDraft: "검증된 카드 내용",
      query: "검색 요청",
      sources: "최종 근거",
      noSources: "사용할 근거가 없어요.",
      moreEvidence: "나머지 원문 보기",
      outcomes: {
        CARD_CREATED: "카드 생성",
        SILENT: "침묵",
        FAILED: "실패",
        TIMED_OUT: "시간 초과",
      },
      stages: {
        INPUT_PREPARATION: "입력 준비",
        QUERY_ANALYSIS: "발언 분석",
        SOURCE_RETRIEVAL: "근거 검색",
        CARD_COMPOSITION: "카드 판단",
      },
      statuses: {
        SUCCEEDED: "완료",
        FAILED: "실패",
        TIMED_OUT: "시간 초과",
        NOT_RUN: "미실행",
      },
    },
    proactiveAdvisory: {
      badge: "과거 결정",
      dismiss: "닫기",
      goToParagraph: "해당 발언으로 이동",
    },
    placeholder: "@로 노트, 폴더를 참조하여 무엇이든 물어보세요",
    tooltip: {
      newChat: "새로운 대화 시작하기",
      copy: "내용 복사하기",
      stop: "생성 중지",
      openPanel: "Ask Tiro 열기",
      closePanel: "Ask Tiro 닫기",
      devTrace: "Ask Tiro 개발자 트레이스",
    },
    empty: {
      title: "무엇을 도와드릴까요?",
      description: `노트를 참조하거나, 미팅을
요약하거나, 필요한 내용을 찾아드려요`,
      note: {
        chip1: { label: "핵심 내용 요약", prompt: "주요 내용을 알려줘" },
        chip2: { label: "할 일 정리", prompt: "해야 할 일을 정리해줘" },
        chip3: { label: "결정사항 정리", prompt: "주요 결정사항들을 알려줘" },
        chip4: { label: "한 줄 요약", prompt: "핵심만 한 줄로 요약해줘" },
      },
      allNotes: {
        chip1: {
          label: "최근 미팅 요약",
          prompt: "최근 2주간의 미팅을 요약해줘",
        },
        chip2: {
          label: "자주 나온 키워드",
          prompt: "최근 3주간 가장 많이 언급된 키워드는?",
        },
        chip3: {
          label: "이번 주 할 일",
          prompt: "이번주에 해야하는 액션 아이템을 정리해줘.",
        },
        chip4: {
          label: "주요 결정사항",
          prompt: "최근 노트들의 주요 결정사항을 정리해줘",
        },
      },
    },
    example: {
      note: {
        example1: "주요 내용을 알려줘",
        example2: "해야 할 일을 정리해줘",
        example3: "주요 결정사항들을 알려줘",
        example4: "아직 해결되지 않은 이슈를 정리해줘",
      },
      allNotes: {
        example1: "최근 2주간의 미팅을 요약해줘",
        example2: "최근 3주간 가장 많이 언급된 키워드는?",
        example3: "이번주에 해야하는 액션 아이템을 정리해줘.",
        example4: "최근 노트들의 주요 결정사항을 정리해줘",
      },
    },
    noParagraphFound: "참조 문단을 찾을 수 없습니다",
    citation: {
      noContent: "내용을 불러올 수 없습니다",
      backToSummary: "문서로 돌아가기",
      sourceCount: "{{count}}개 출처",
    },
    progress: {
      summaryReady: "참조한 내용을 정리했어요",
      moreReferences: "외 {{count}}개",
      noteReferences: "참조한 노트",
      wikiReferences: "참조한 위키 페이지",
      referenceSample: "전체 {{total}}개 중 {{shown}}개 표시",
      noResults: "관련 내용을 찾지 못했어요",
      refCountNote_one: "노트 {{count}}개",
      refCountNote_other: "노트 {{count}}개",
      refCountWiki_one: "위키 {{count}}개",
      refCountWiki_other: "위키 {{count}}개",
      thinking: "생각하고 있어요…",
      thinkingProcess: "Thinking Process",
      summaryTitle: "참고한 정보",
      summaryStage: {
        note_search: "참조한 노트",
        wiki_search: "참조한 위키 페이지",
        wiki_relation_expansion: "연관 위키 정보",
        tool_execution: "활용한 도구",
      },
      stage: {
        query_analysis: {
          started: "질문을 분석하고 있어요",
          completed: "질문 분석을 마쳤어요",
          failed: "일부 정보를 가져오지 못했어요",
          skipped: "질문 분석을 건너뛰었어요",
        },
        note_search: {
          started: "관련 노트를 확인하고 있어요",
          completed: "관련 노트를 확인했어요",
          failed: "일부 정보를 가져오지 못했어요",
          skipped: "노트 검색을 건너뛰었어요",
        },
        wiki_search: {
          started: "관련 위키 페이지를 확인하고 있어요",
          completed: "관련 위키 페이지를 확인했어요",
          skipped: "위키 확인을 건너뛰었어요",
          failed: "일부 정보를 가져오지 못했어요",
        },
        wiki_relation_expansion: {
          started: "연관 정보를 찾는 중이에요",
          completed: "연관 정보를 찾아봤어요",
          failed: "일부 정보를 가져오지 못했어요",
          skipped: "연관 정보 탐색을 건너뛰었어요",
        },
        tool_execution: {
          started: "도구를 활용하는 중이에요",
          completed: "도구를 활용했어요",
          failed: "일부 정보를 가져오지 못했어요",
          skipped: "도구 활용을 건너뛰었어요",
        },
        answer_drafting: {
          started: "답변을 작성하고 있어요",
          completed: "답변 작성을 마쳤어요",
          failed: "일부 정보를 가져오지 못했어요",
          skipped: "답변 작성을 건너뛰었어요",
        },
        completed: { completed: "답변이 준비됐어요" },
        cancelled: { completed: "답변 생성을 중지했어요" },
        error: { failed: "답변 생성에 실패했어요" },
      },
    },
    devTrace: {
      title: "개발자 트레이스",
      empty: "표시할 트레이스가 없습니다",
      eventCount: "{{count}}개 이벤트",
      redaction: { raw: "raw", redacted: "redacted", summary: "summary" },
    },
    devPreview: {
      tooltip: "Ask Tiro 진행 상태 미리보기",
      title: "진행 상태 미리보기",
      iconVariant: {
        title: "아이콘 타입 비교",
        sourceOutline: "A. 타입 컬러 아이콘",
        sourceTile: "B. 컬러 타일 아이콘",
        sourceDuo: "C. 타입 + 상태 아이콘",
      },
      clear: "미리보기 지우기",
      scenario: {
        wiki: "위키 페이지 참조",
        relation: "위키 관계 이해",
        note: "노트 확인",
        tool: "도구 실행",
        answer: "답변 작성",
        error: "오류 상태",
        trace: "Raw trace",
      },
      preview: {
        query: {
          wiki: "AskTiro dev preview: 위키 페이지 진행 상태",
          relation: "AskTiro dev preview: 위키 관계 진행 상태",
          note: "AskTiro dev preview: 노트 확인 진행 상태",
          tool: "AskTiro dev preview: 도구 실행 진행 상태",
          answer: "AskTiro dev preview: 답변 작성 진행 상태",
          error: "AskTiro dev preview: 오류 상태",
          trace: "AskTiro dev preview: raw trace",
        },
        answer: {
          wiki: "Project Alpha와 Launch Plan 위키 페이지를 함께 참고해 답변 초안을 구성하는 예시입니다.",
          relation:
            "두 위키 페이지 사이의 dependency 관계를 확인한 뒤 결론을 정리하는 예시입니다.",
          note: "최근 전략 회의와 고객 인터뷰 노트를 확인해 근거를 좁혀가는 예시입니다.",
          tool: "노트 검색 도구와 위키 컨텍스트 도구를 실행하며 상태를 보여주는 예시입니다.",
          answer:
            "검색과 관계 확인이 끝난 뒤 답변을 작성하는 진행 상태를 보여주는 예시입니다.",
          error:
            "위키 컨텍스트 로딩 실패가 사용자에게 어떻게 보이는지 확인하는 예시입니다.",
          trace:
            "raw thinking, tool call, tool result가 dev trace panel에 노출되는 예시입니다.",
        },
      },
      progress: {
        queryAnalysis: "질문 의도와 참조 범위를 확인했어요",
        wiki: "Project Alpha 페이지와 Launch Plan 페이지를 함께 참조하고 있어요",
        relationPages: "관련 위키 페이지 2개를 확인했어요",
        relation:
          "Project Alpha 페이지와 Launch Plan 페이지의 관계를 이해하고 있어요",
        note: "전략 회의 노트와 고객 인터뷰 노트를 확인하고 있어요",
        toolStarted: "wiki_context.search 도구를 실행하고 있어요",
        toolCompleted: "wiki_context.search 도구 실행을 마쳤어요",
        answerContext: "답변에 필요한 위키 페이지를 확인했어요",
        answer: "참조한 위키와 노트를 답변으로 정리하고 있어요",
        errorWiki: "위키 컨텍스트 로딩에 실패했어요",
        error: "일부 참조를 불러오지 못해 답변 생성을 중단했어요",
        traceWiki: "raw trace 예시에 사용할 위키 컨텍스트를 확인했어요",
        traceTool: "tool call과 tool result를 trace panel에 기록했어요",
      },
    },
  },
  ae = {
    expiredOrExhausted: {
      title: "무료체험이 끝났어요🥲",
      description: "티로를 더 사용하고 싶다면 유료구독을 시작하세요!",
      cta: "구독 시작하기",
    },
    usageNearlyExhausted: {
      title: "무료체험 사용량이 {{minutesLeft}}분 남았어요😮",
      description: "지금 구독하고 티로를 계속 사용해보세요!",
      cta: "구독 시작하기",
    },
    trialOneMonth: {
      title: "티로 무료체험 중: 종료까지 {{daysLeft}}일 남았어요!",
      description: "",
      cta: "구독 시작하기",
    },
    trialOneYear: {
      title: "티로 무료체험 중: 무료체험 사용량이 {{minutesLeft}}분 남았어요!",
      description: "",
      cta: "구독 시작하기",
    },
    expiryApproaching: {
      title: "티로 무료체험 중: 종료까지 {{daysLeft}}일밖에 남지 않았어요!",
      description: "지금 구독하고 티로를 계속 사용해보세요!",
      cta: "구독 시작하기",
    },
    recordingControls: {
      title: "티로 무료체험 중",
      upgrade: "플랜 업그레이드",
      languageSelect: {
        addLanguage: "언어 추가",
        recordingLanguage: "기록 언어",
        recordingLanguageLabel: "기록",
        translationLanguage: "실시간 번역 언어",
      },
    },
  },
  se = {
    reward_granted: {
      title: "새 리워드가 도착했어요",
      activationDescription: `<b>{{amount}}</b>가 도착했어요
초대한 친구가 10분 이상 기록했어요.`,
      paidDescription: `<b>{{amount}}</b>가 도착했어요
초대한 친구가 유료 결제를 했어요.`,
      cta: "리워드 확인하기",
    },
    payment_expired: {
      title: "결제 정보 업데이트가 필요합니다.",
      rightLabel: "D-{{days}}",
      body: "결제 정보가 업데이트되지 않아 노트 기록이 제한됩니다.",
      cta: "결제 정보 수정",
    },
    quota_exhausted: {
      title: "{{planName}}",
      rightLabel: "{{used}} / {{total}}분",
      body: "기록 시간이 모두 소진되었습니다. 플랜 업그레이드로 다시 사용하세요.",
    },
    trial_expired: {
      title: "무료 체험 기간 만료",
      body: "새 미팅 기록이 제한되었습니다. 결제 시 즉시 복구됩니다.",
      cta: "플랜 활성화",
    },
    enterprise_quota_exhausted: {
      title: "계약량 소진",
      rightLabel: "{{used}} / {{total}}분",
      body: "계약량 도달로 신규 기록이 차단되었습니다. 추가 결제가 필요합니다.",
      cta: "고객센터로 문의",
    },
    payment_failed: {
      title: "결제 실패",
      rightLabel: "D-{{days}}",
      body: "{{date}}까지 결제 정보 업데이트가 필요합니다.",
    },
    trial_member_limit: {
      title: "무료 체험 인원 한도 도달",
      rightLabel: "{{used}} / {{total}}명",
      body: "더 많은 구성원과 함께 사용하려면 플랜을 활성화해주세요.",
    },
    trial_ending: {
      title: "무료 체험 종료 예정",
      rightLabel: "D-{{days}}",
      body: "결제하고 남은 작업을 끊김 없이 이어서 사용해보세요.",
    },
    trial_invite_members: {
      title: "팀원과 함께 써보세요",
      body: "워크스페이스 구성원을 초대하고 회의 기록을 함께 공유해보세요.",
    },
    freeTrialTitle: "무료 체험 중",
    quota_warning_80: {
      title: "{{planName}}",
      rightLabel: "{{used}} / {{total}}분",
      body: "한도의 80%에 도달했습니다. 플랜에 가입하여 한도를 늘려보세요.",
    },
    overage_ready: {
      title: "{{planName}}",
      rightLabel: "{{used}} / {{total}}분",
      body: "추가 기록이 켜져 있어요. 기본 제공 시간을 다 써도 기록이 멈추지 않고, 초과분은 분당 $0.025로 청구돼요.",
    },
    overage_active: {
      title: "{{planName}}",
      rightLabel: "{{used}} / {{total}}분",
      body: "추가 기록으로 계속 기록되고 있어요. 지금까지 초과한 {{minutes}}분은 분당 $0.025로 청구돼요.",
    },
    plan_change_scheduled: {
      title: "{{planName}} 종료 예정",
      rightLabel: "D-{{days}}",
      body: "다음 결제일({{date}})까지 {{planName}}이 유지되며, 이후 노트 기록이 제한됩니다.",
    },
    trial_usage: {
      title: "무료 체험 중",
      rightLabel: "{{used}} / {{total}}분",
      body: "플랜에 가입하여 한도를 늘려보세요.",
    },
    upsell_pro: {
      title: "더 많은 시간이 필요하다면",
      body: "Pro 플랜을 이용하여 월 사용량을 늘릴 수 있어요.",
    },
    upsell_max: {
      title: "더 큰 한도가 필요하다면",
      body: "Max 플랜을 이용하여 월 사용량을 늘릴 수 있어요.",
    },
    upsell_team: {
      title: "여러 명이 함께 사용한다면",
      body: "팀 플랜으로 워크스페이스를 공유하고 함께 작업할 수 있어요.",
    },
    subscribe_nudge: {
      title: "플랜을 시작해 보세요",
      body: "Tiro의 모든 기능을 제한 없이 사용할 수 있어요.",
    },
  },
  le = {
    micInUse: {
      title: "대화 중이신 것 같아요",
      body: "바로 기록을 시작해보세요",
      action: "노트 생성",
      startRecording: "실시간 기록 시작하기",
    },
  },
  ce = {
    prompt: {
      title: "화상미팅이 끝난 것 같아요",
      description: "녹음은 계속되고 있어요. 잠깐 멈출까요?",
      pause: "일시정지",
    },
  },
  de = {
    openSettings: "설정 열기",
    openAskTiro: "Ask Tiro 열기",
    goBack: "뒤로 가기",
    goForward: "앞으로 가기",
    startOfflineRecording: "오프라인 녹음 시작",
    title: "키보드 단축키",
    showShortcuts: "키보드 단축키 보기",
    openSearch: "통합 검색 열기",
    selectNote: "이전·다음 노트 선택",
    openSelectedNote: "선택한 노트를 전체 화면으로 열기",
    expandPreview: "미리보기 노트를 전체 화면으로 열기",
    closeNote: "노트 닫기 또는 목록으로 돌아가기",
    findInNote: "노트에서 검색·바꾸기 열기",
    bold: "굵게",
    italic: "기울임",
    strikethrough: "취소선",
    highlight: "형광펜",
    resetTextColor: "기본 글자색 적용 또는 재설정",
    toggleRecording: "기록 일시정지",
    startRecording: "기록 시작 또는 재개",
    group: {
      general: "일반",
      recording: "기록",
      navigation: "노트 찾기와 이동",
      editing: "노트 본문 편집",
      view: "화면과 앱",
    },
    where: {
      notes: "노트 화면",
      noteList: "노트 목록",
      notePreview: "노트 미리보기",
      noteFullView: "노트 전체 화면",
    },
  },
  pe = { lengthLimit: "컨텍스트가 최대 {{max}}자로 자동 조정되었습니다" },
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
        success: "트리거가 생성되었습니다",
        error: "트리거 생성에 실패했습니다",
      },
      update: {
        success: "트리거가 업데이트되었습니다",
        error: "트리거 업데이트에 실패했습니다",
      },
      delete: {
        success: "트리거가 삭제되었습니다",
        error: "트리거 삭제에 실패했습니다",
      },
      toggle: {
        activated: "트리거가 활성화되었습니다",
        deactivated: "트리거가 비활성화되었습니다",
        error: "트리거 활성화/비활성화에 실패했습니다",
      },
    },
  },
  ge = {
    recording: {
      button: {
        start: "음성 녹음",
        tooltip: `인터넷 연결이 원활하지 않은 장소에서도 녹음할 수 있어요.
녹음이 끝나면 자동으로 업로드되어 변환이 시작돼요.`,
      },
      controls: {
        language: "언어 선택",
        languageTooltip: `기록이 종료되면, 선택하신 언어로 문서를 생성해요.
대화 언어는 티로가 자동으로 감지하고 기록하니 걱정하지 않으셔도 돼요.`,
        pause: "일시정지",
        resume: "기록 재개",
        stop: "기록 종료",
        folderTooltip: "노트가 저장될 폴더를 선택하세요",
      },
      success: {
        uploaded: "업로드 완료",
        uploadedDescription: "녹음이 업로드되었어요. 변환이 시작됩니다.",
        goToNote: "노트로 이동",
      },
      error: {
        uploadFailed: "업로드 실패",
        uploadFailedDescription:
          "녹음 업로드에 실패했어요. 다시 시도하거나 파일을 다운로드해주세요.",
        startFailed: "녹음 시작에 실패했어요",
        pauseFailed: "녹음 일시정지에 실패했어요",
        resumeFailed: "녹음 재개에 실패했어요",
        stopFailed: "녹음 종료에 실패했어요",
        microphoneAccess: "마이크 접근에 실패했어요",
        recoveryFailed: "녹음 복구에 실패했어요",
        maxRetriesReached: "최대 재시도 횟수 초과",
        maxRetriesReachedDescription:
          "업로드를 여러 번 시도했지만 실패했어요. 파일을 다운로드하거나 나중에 다시 시도해주세요.",
        s3UploadExpired: "업로드 링크가 만료됐어요",
        s3UploadExpiredDescription:
          "업로드 링크의 유효기간이 지났어요. 다시 시도하면 새 링크로 업로드돼요.",
        s3UploadFailed: "업로드 서버 오류",
        s3UploadFailedDescription:
          "파일 서버에 업로드하는 중 오류가 발생했어요. 다시 시도하거나 파일을 다운로드해주세요.",
      },
      retry: "다시 시도",
      status: {
        recording: "녹음 중",
        paused: "일시정지됨",
        uploadPending: "업로드 대기 중",
        uploading: "업로드 중",
        uploadFailed: "업로드 실패",
      },
      autoStopped: { title: "오프라인 녹음이 자동 종료되어 업로드돼요" },
      cancel: {
        title: "녹음을 취소하시겠습니까?",
        description: "녹음된 내용은 저장되지 않으며 되돌릴 수 없어요.",
        keepRecording: "돌아가기",
        confirm: "녹음 취소",
        success: "녹음이 취소되었어요",
      },
      sessionDiscarded: "녹음이 삭제되었어요",
      recovery: {
        title: "저장되지 않은 녹음이 있어요",
        description: "저장되지 않은 오프라인 녹음 {{count}}개가 있어요.",
        resumable: "이전 녹음을 이어서 기록할 수 있어요",
        resumeRecording: "기록 재개",
        dismiss: "무시",
        sessionTitle: "오프라인 녹음",
        upload: "업로드",
        discard: "삭제",
        discardAll: "모두 삭제",
        close: "닫기",
      },
      unconverted: {
        title: "녹음 파일 복구",
        description:
          "기기에 남아 있는 녹음 파일이에요. 이미 노트로 처리된 녹음도 포함될 수 있어요.",
        descriptionAction:
          "WAV로 내려받아 확인하거나 파일 업로드로 새 노트를 만들 수 있어요.",
        itemTitle: "{{date}} 녹음",
        modifiedAt: "수정 {{date}}",
        download: "WAV 다운로드",
        downloadFileName: "Tiro 복구 녹음 {{timestamp}}.wav",
        openFolder: "폴더에서 보기",
        downloadNamed: "{{fileName}} WAV 다운로드",
        openFolderNamed: "{{fileName}} 폴더에서 보기",
        deleteNamed: "{{fileName}} 삭제",
        empty: "복구할 녹음 파일이 없어요.",
        stopFailure: {
          title: "녹음 종료를 완료하지 못했어요",
          description:
            "녹음 파일은 삭제하지 않고 보관했어요. 복구 화면에서 WAV로 저장하거나 삭제할 수 있어요.",
        },
        cancelFailure: {
          title: "녹음을 완전히 삭제하지 못했어요",
          description:
            "남아 있을 수 있는 녹음 파일을 보관했어요. 복구 화면에서 확인하고 직접 삭제할 수 있어요.",
        },
        toast: { action: "녹음 보기" },
        unplayable: {
          title: "재생할 수 없는 파일",
          description:
            "파일 형식을 확인할 수 없어 재생하거나 WAV로 다운로드할 수 없어요.",
        },
        deleteDialog: {
          title: "이 녹음 파일을 삭제할까요?",
          description: "삭제한 녹음 파일은 복구할 수 없어요.",
        },
        success: {
          download: "WAV 파일을 저장했어요.",
          delete: "녹음 파일을 삭제했어요.",
        },
        error: {
          list: "녹음 파일을 불러오지 못했어요. 새로고침한 뒤 다시 시도해주세요.",
          play: "녹음 파일을 재생하지 못했어요.",
          download: "WAV 파일을 저장하지 못했어요.",
          delete: "녹음 파일을 삭제하지 못했어요.",
        },
      },
    },
  },
  be = JSON.parse(
    '{"tabs":{"overview":"개요","apiKeys":"API Key","webhooks":"Webhook","oauthApps":"OAuth 앱"},"sidebar":{"user":"계정","expandSidebar":"사이드바 펼치기","collapseSidebar":"사이드바 접기","oauthAppsOrganizationOnly":"조직 범위에서만 등록할 수 있어요.","oauthAppsIntegrationManagerOnly":"조직 관리자와 개발자만 관리할 수 있어요.","oauthAppsAccessUnavailable":"조직 권한을 확인하는 중이거나 확인하지 못했어요."},"context":{"label":"관리할 곳","placeholder":"계정, 조직 또는 워크스페이스 선택","workspaces":"워크스페이스","organizations":"조직","organizationFallback":"내 조직","accounts":"계정","account":"내 계정"},"overview":{"title":"개요","openDocs":"개발자 문서","documentation":{"title":"문서","restApi":{"title":"REST API","description":"첫 API 요청을 보내보세요."},"mcp":{"title":"MCP Server","description":"AI 도구에 Tiro를 연결해보세요."},"cli":{"title":"CLI","description":"CLI를 설치하고 시작해보세요."},"webhookGuide":{"title":"Webhook 가이드","description":"이벤트를 받도록 설정해보세요."}}},"common":{"copy":"복사","actions":"더보기","edit":"수정","delete":"삭제","cancel":"취소","done":"완료","save":"저장","saving":"저장 중...","creating":"만드는 중...","deleting":"삭제 중...","nameLabel":"이름","nameRequired":"이름을 입력해 주세요","copyFailed":"복사하지 못했어요","status":{"active":"활성","inactive":"비활성"}},"notice":{"workspaceLoadFailed":"워크스페이스를 불러오지 못했어요","retry":"다시 시도","noWorkspaceTitle":"워크스페이스가 없어요","noWorkspaceDescription":"워크스페이스에 참여하면 이곳에서 리소스를 관리할 수 있어요.","workspaceListLoadFailedTitle":"워크스페이스를 불러오지 못했어요","workspaceListLoadFailedDescription":"잠시 후 다시 시도해 주세요.","workspaceNotFoundTitle":"워크스페이스를 찾을 수 없어요","workspaceNotFoundDescription":"워크스페이스가 삭제됐거나 접근 권한이 없을 수 있어요.","contextLoadFailedTitle":"관리할 곳을 불러오지 못했어요","contextLoadFailedDescription":"잠시 후 다시 시도해 주세요.","organizationAccessDeniedTitle":"조직 리소스를 볼 수 없어요","organizationAccessDeniedDescription":"조직 관리자나 개발자 역할이 있어야 볼 수 있어요. 필요하다면 관리자에게 요청해 보세요.","organizationAccessLoadFailedTitle":"조직 권한을 확인하지 못했어요","organizationAccessLoadFailedDescription":"잠시 후 다시 시도해 주세요.","workspaceAdminOnlyTitle":"워크스페이스 연동은 관리자만 만들 수 있어요","workspaceAdminOnlyDescription":"워크스페이스 관리자에게 요청하거나 내 계정으로 전환해 개인 연동을 만들어 보세요.","switchToAccount":"내 계정으로 전환"},"apiKeys":{"title":"API Key","workspaceDescription":"워크스페이스 관리자가 만들고 관리할 수 있어요. 폴더 목록·트리 조회에는 계정 API Key 또는 OAuth 로그인이 필요해요.","organizationDescription":"조직 관리자와 개발자가 만들고 관리할 수 있어요. 폴더 목록·트리 조회에는 계정 API Key 또는 OAuth 로그인이 필요해요.","accountDescription":"내가 접근할 수 있는 워크스페이스에서 내 권한으로 동작해요. 개인 키가 필요한 연동에는 이 계정 API Key를 사용하세요.","folderBoundaryNoticeTitle":"일부 API Key는 아직 이전 범위로 동작해요","folderBoundaryNoticeDescription":"이 키도 워크스페이스 전체에 공유한 폴더의 노트만 다루도록 차례로 변경할 예정이에요. 개인 폴더의 노트가 필요하다면, 접근할 수 있는 노트를 모두 다루는 계정 API Key를 써보세요.","folderBoundaryNoticeOrganizationDescription":"이 키도 워크스페이스 전체에 공유한 폴더의 노트만 다루도록 차례로 변경할 예정이에요.","createButton":"API Key 만들기","empty":{"title":"Tiro API 연동을 시작해 보세요","description":"API Key로 요청을 인증하고 필요한 데이터에 안전하게 접근해 보세요.","guide":"API 시작 가이드"},"table":{"name":"이름","keyId":"Key ID","status":"상태","expires":"만료","lastUsed":"마지막 사용","created":"생성일","scopes":"권한","allowedHosts":"허용 호스트","allScopes":"모든 권한","anyHost":"모든 호스트"},"status":{"expired":"만료됨","neverExpires":"만료 없음","neverUsed":"사용한 적 없음"},"notice":{"userLoadFailed":"계정 API Key를 불러오지 못했어요","workspaceLoadFailed":"워크스페이스 API Key를 불러오지 못했어요","organizationLoadFailed":"조직 API Key를 불러오지 못했어요"},"dialog":{"createTitle":"API Key 만들기","namePlaceholder":"예: 내 연동 서비스","descriptionLabel":"설명","descriptionPlaceholder":"이 키를 어디에 사용하는지 적어두세요","expirationLabel":"만료 기한","expiry90days":"90일 (기본)","expiry1year":"1년","expiryNever":"만료 없음","expiryCustom":"직접 선택","createConfirm":"만들기","editTitle":"API Key 수정","deleteTitle":"API Key 삭제","deleteDescription":"이 API Key를 삭제할까요? 삭제하면 되돌릴 수 없고, 이 키를 사용하는 연동을 즉시 중단해요.","deleteConfirm":"삭제","scopesLabel":"권한","scopesPlaceholder":"권한 선택","scopesSelected":"{{count}}개 선택됨","scopesSearchPlaceholder":"권한 검색","scopesEmpty":"권한을 찾을 수 없어요","scopeModeAll":"모든 권한","scopeModeAllDescription":"이 키가 접근할 수 있는 리소스 안에서 모든 API 작업을 허용해요. 키 종류와 사용자 권한에 따른 접근 제한은 유지돼요.","scopeModeRestricted":"선택한 권한만","workspaceAccessLabel":"접근할 워크스페이스","workspaceAccessModeAll":"현재와 앞으로 추가할 모든 워크스페이스","workspaceAccessModeAllDescription":"추천하는 설정이에요. 새 워크스페이스도 자동으로 포함해요.","workspaceAccessModeRestricted":"선택한 워크스페이스만","workspacesPlaceholder":"워크스페이스 선택","workspacesSelected":"{{count}}개 선택됨","workspacesSearchPlaceholder":"워크스페이스 검색","workspacesEmpty":"일치하는 워크스페이스가 없어요","workspaceSelectionRequired":"워크스페이스를 1개 이상 선택해 주세요","removeWorkspace":"워크스페이스 선택 해제","unavailableWorkspace":"현재 접근할 수 없는 워크스페이스 ({{guid}})","removeScope":"권한 제거","allowedHostsLabel":"허용 호스트","allowedHostsPlaceholder":"호스트를 입력하고 Enter를 누르세요","allowedHostsHint":"비워 두면 모든 호스트를 허용해요.","applyDelayHint":"변경한 내용이 적용되기까지 최대 1분 정도 걸릴 수 있어요.","removeHost":"호스트 제거","inheritedHostsHeading":"조직에서 상속됨 (항상 적용)","inheritedHostsTooltip":"조직 설정에서 관리해요. 여기서는 변경할 수 없어요."},"secret":{"title":"API Key를 안전한 곳에 보관해 주세요","description":"이 키는 지금 한 번만 보여드려요. 창을 닫으면 다시 확인할 수 없어요.","copied":"API Key를 복사했어요"},"toast":{"created":"API Key를 만들었어요","createFailed":"API Key를 만들지 못했어요","updated":"API Key를 수정했어요","updateFailed":"API Key를 수정하지 못했어요","deleted":"API Key를 삭제했어요","deleteFailed":"API Key를 삭제하지 못했어요","keyIdCopied":"Key ID를 복사했어요"}},"oauthApps":{"title":"OAuth 앱","description":"앱은 허용한 사용자의 권한과 동의한 범위 안에서만 접근할 수 있어요.","createButton":"OAuth 앱 등록","listLoadFailed":"OAuth 앱을 불러오지 못했어요","loadMore":"더 보기","loadingMore":"불러오는 중...","loadMoreFailed":"다음 목록을 불러오지 못했어요. 다시 시도해 주세요.","empty":{"title":"등록한 OAuth 앱이 없어요","description":"사용자 동의를 받아 Tiro External API를 호출할 앱을 등록해 보세요."},"metadata":{"loadFailed":"등록에 사용할 OAuth 권한을 확인하지 못했어요","createDisabled":"기존 앱 조회와 폐기는 계속 사용할 수 있어요. 권한 정보를 다시 불러오기 전까지 새 앱은 등록할 수 없어요."},"unknown":{"title":"앱 등록 결과를 확인해 주세요","reconciling":"OAuth 앱 목록을 다시 확인하고 있어요.","description":"OAuth 앱이 등록됐는지 확인하지 못했어요. 등록된 경우 Client Secret은 다시 볼 수 없어요. 목록에 새 앱이 있으면 다시 등록하지 말고, 보이지 않을 때만 다시 등록해 주세요.","reconcileFailed":"OAuth 앱이 등록됐는지 확인하지 못했고 목록도 불러오지 못했어요. 목록을 불러오기 전에는 새 앱을 등록할 수 없어요.","reviewed":"목록 확인 완료"},"table":{"name":"이름","clientId":"Client ID","status":"상태","created":"등록일"},"status":{"STAGED":"이전 비활성 등록","ACTIVE":"활성","DISABLED_FOR_NEW_GRANTS":"신규 승인 중단","REVOKED":"폐기됨","stagedDescription":"이전 방식으로 등록돼 사용할 수 없어요"},"dialog":{"createTitle":"OAuth 앱 등록","editTitle":"OAuth 앱 수정","editDescription":"앱 정보와 사용자에게 요청할 권한을 바꿀 수 있어요.","scopeNarrowingNotice":"권한을 빼면({{scopes}}) 이미 허용한 사용자는 남은 권한 안에서만 계속 사용해요. 남은 권한이 없으면 다시 허용해야 해요.","description":"앱 정보와 사용자에게 요청할 권한을 입력해 주세요.","secretDescription":"지금 보여드린 Client ID와 Client Secret을 저장해야 등록을 마칠 수 있어요.","namePlaceholder":"예: 사내 자동화 도구","redirectUrisLabel":"Redirect URI 목록","redirectUriRowLabel":"{{index}}번째 Redirect URI","redirectUrisHint":"인증 요청에는 등록한 주소 중 하나와 정확히 같은 redirect_uri를 사용해 주세요.","addRedirectUri":"Redirect URI 추가","removeRedirectUri":"{{index}}번째 Redirect URI 제거","redirectUriErrors":{"required":"Redirect URI를 입력해 주세요.","duplicate":"같은 Redirect URI를 두 번 등록할 수 없어요.","invalid":"올바른 Redirect URI를 입력해 주세요. HTTP는 localhost, 127.0.0.1, [::1]에서만 사용할 수 있어요."},"scopesLabel":"요청할 권한","resource":"대상 리소스: {{resource}}","scopePresets":{"all":"전체 선택","readOnly":"읽기 전용","clear":"선택 해제"},"createConfirm":"등록"},"scopeDescriptions":{"note_read":"노트 목록과 메타데이터, 스크립트를 읽어요.","note_write":"노트 제목 등 메타데이터를 수정해요. 노트 읽기 권한을 포함해요.","note_summary_read":"노트의 요약 문서를 읽어요.","note_document_read":"Tiro가 생성한 문서를 읽어요.","note_document_template_read":"문서 템플릿 목록과 내용을 읽어요.","folder_read":"폴더를 읽어요.","folder_write":"폴더를 만들고 수정하거나 삭제해요. 폴더 읽기 권한을 포함해요.","wiki_read":"Wiki를 읽고 검색해요.","word_memory_read":"단어 메모리를 읽어요."},"secret":{"title":"Client Secret을 안전한 곳에 보관해 주세요","description":"Client Secret은 지금 한 번만 보여드려요. 창을 닫으면 다시 확인할 수 없어요.","copied":"Client Secret을 복사했어요","savedAcknowledgement":"Client ID와 Client Secret을 안전한 곳에 저장했어요"},"edit":{"action":"수정"},"disable":{"action":"신규 승인 중단","title":"새 사용자 승인을 중단할까요?","description":"새로 이 앱을 허용하려는 사용자만 막아요. 이미 허용한 사용자는 그대로 계속 사용할 수 있어요. 언제든 다시 재개할 수 있어요.","confirm":"중단","disabling":"중단 중..."},"enable":{"action":"신규 승인 재개"},"regenerate":{"action":"Secret 재발급","title":"Client Secret을 재발급할까요?","unknownTitle":"재발급 결과를 확인해 주세요","description":"재발급하면 기존 Client Secret은 즉시 사용할 수 없어요. 이 앱을 쓰는 서비스에 새 Client Secret을 넣어야 계속 연동돼요.","confirm":"재발급","regenerating":"재발급 중...","secretTitle":"새 Client Secret을 저장해 주세요","secretDescription":"기존 Client Secret은 더 이상 사용할 수 없어요. 이 앱을 쓰는 서비스에 새 Client Secret을 넣어 주세요.","savedAcknowledgement":"새 Client Secret을 안전한 곳에 저장했어요","unknown":"재발급 결과를 확인하지 못했어요. Client Secret이 이미 바뀌었을 수 있어요. 기존 Client Secret이 동작하지 않으면 다시 재발급해 주세요."},"discard":{"action":"이전 등록 폐기","title":"OAuth 앱 등록을 폐기할까요?","description":"이전 방식의 비활성 등록은 사용할 수 없어요. 사용하려면 이 등록을 폐기하고 OAuth 앱을 다시 등록해 주세요.","confirm":"등록 폐기","discarding":"폐기 중..."},"toast":{"created":"OAuth 앱을 등록했어요","updated":"OAuth 앱을 수정했어요","updateFailed":"OAuth 앱을 수정하지 못했어요.\\n잠시 후 다시 시도해 주세요.","enabled":"신규 승인을 재개했어요","disabled":"신규 승인을 중단했어요","enabledChangeFailed":"상태를 바꾸지 못했어요.\\n잠시 후 다시 시도해 주세요.","createFailed":"OAuth 앱을 등록하지 못했어요.\\n잠시 후 다시 시도해 주세요.","discarded":"OAuth 앱 등록을 폐기했어요","discardFailed":"OAuth 앱 등록을 폐기하지 못했어요.\\n잠시 후 다시 시도해 주세요.","regenerateFailed":"Client Secret을 재발급하지 못했어요.\\n잠시 후 다시 시도해 주세요.","clientIdCopied":"Client ID를 복사했어요"}},"webhooks":{"title":"Webhook","workspaceDescription":"워크스페이스 관리자가 만들고 관리할 수 있어요.","organizationDescription":"조직 관리자와 개발자가 만들고 관리할 수 있어요.","accountDescription":"내가 접근할 수 있는 워크스페이스의 이벤트를 받아요.","folderBoundaryNoticeTitle":"일부 Webhook은 아직 이전 발송 범위로 동작해요","folderBoundaryNoticeDescription":"이 Webhook도 워크스페이스 전체에 공유한 폴더의 노트 이벤트만 받도록 차례로 변경할 예정이에요.","createButton":"Webhook 만들기","empty":{"title":"Webhook으로 작업을 자동화해 보세요","description":"노트가 생성되거나 수정될 때 등록한 HTTPS 엔드포인트로 이벤트를 보내드려요.","guide":"Webhook 가이드"},"table":{"name":"이름","url":"URL","events":"이벤트","status":"상태","created":"생성일","eventCount_other":"이벤트 {{count}}개"},"notice":{"userLoadFailed":"계정 Webhook을 불러오지 못했어요","workspaceLoadFailed":"워크스페이스 Webhook을 불러오지 못했어요","organizationLoadFailed":"조직 Webhook을 불러오지 못했어요"},"dialog":{"createTitle":"Webhook 엔드포인트 만들기","createDescription":"HTTPS 엔드포인트로 이벤트 알림을 받아보세요.","namePlaceholder":"예: 알림 연동","urlLabel":"URL","urlRequired":"URL을 입력해 주세요","urlInvalid":"올바른 URL을 입력해 주세요","urlHelp":"Tiro가 이 URL로 Webhook POST 요청을 보내요.","eventTypesLabel":"이벤트 유형","selectAll":"모두 선택","deselectAll":"모두 해제","eventsSelected_other":"이벤트 유형 {{count}}개 선택됨","eventsRequired":"이벤트 유형을 1개 이상 선택해 주세요","activeLabel":"활성","activeDescription":"끄면 Webhook 발송을 잠시 멈춰요.","createConfirm":"만들기","editTitle":"Webhook 엔드포인트 수정","editDescription":"엔드포인트의 URL과 이벤트를 수정할 수 있어요.","deleteTitle":"Webhook 삭제","deleteDescription":"이 Webhook 엔드포인트를 삭제할까요? 삭제하면 되돌릴 수 없어요.","deleteConfirm":"삭제"},"secret":{"title":"Webhook 시크릿을 안전한 곳에 보관해 주세요","description":"이 시크릿은 지금 한 번만 보여드려요. Tiro가 보내는 Webhook 페이로드를 검증할 때 쓰니 지금 복사해 두세요.","copied":"Webhook 시크릿을 복사했어요"},"toast":{"created":"Webhook을 만들었어요","createFailed":"Webhook을 만들지 못했어요","updated":"Webhook을 수정했어요","updateFailed":"Webhook을 수정하지 못했어요","deleted":"Webhook을 삭제했어요","deleteFailed":"Webhook을 삭제하지 못했어요"},"eventTypeLabels":{"note_created":"노트 생성","note_deleted":"노트 삭제","note_ended":"노트 종료","note_participants_updated":"참석자 변경","note_user_content_updated":"노트 내용 수정","note_recording_completed":"녹음 일시정지","folder_note_added":"폴더에 노트 추가","folder_note_removed":"폴더에서 노트 제거","note_document_generated":"문서 생성","note_document_updated":"문서 수정","note_document_deleted":"문서 삭제","note_summary_generated":"요약 생성","note_summary_updated":"요약 수정","note_summary_deleted":"요약 삭제"},"resourceTypeLabels":{"note":"노트","foldernoterelation":"폴더","notedocument":"문서","notesummary":"요약"}}}',
  ),
  he = JSON.parse(
    `{"wordMemory":{"title":"조직 단어장","description":"조직 전체에 공통으로 적용하는 단어장이에요. 자주 쓰는 도메인 용어와 서비스명, 내부 시스템명을 추가하면 티로가 대화를 기록할 때 정확하게 받아 적어요.","bulkImport":"일괄 추가","bulkExample":"르네상스, Renaissance\\n키케로, Cicero\\n니체, Nietzsche","bulkSubmit":"{{count}}개 추가","bulkSubmitting":"추가하는 중...","bulkUpload":"CSV 파일 선택","bulkDownloadSample":"예시 CSV 받기","bulkCancel":"닫기","sampleCsv":"르네상스,Renaissance\\n키케로,Cicero\\n니체,Nietzsche","noWords":"등록한 단어가 없어요","loadError":"단어장을 불러오지 못했어요.","entryColumn":"발음","subEntryColumn":"표기","entryPlaceholder":"예: 르네상스","subEntryPlaceholder":"예: Renaissance","optional":"(선택)","addAriaLabel":"단어 추가","deleteAriaLabel":"{{word}} 삭제","editAriaLabel":"단어 편집","editEntryAriaLabel":"발음 편집","editSubEntryAriaLabel":"표기 편집","saveAriaLabel":"저장","cancelAriaLabel":"취소"},"policy":{"title":"보안 정책","loadError":"보안 정책을 불러오지 못했어요.","retry":"다시 시도","locked":"조회만 가능","lockedHint":"조직 정책에 따라 조회만 할 수 있어요.\\n변경하려면 담당 매니저에게 문의해 주세요.","enterpriseOption":"엔터프라이즈 옵션","enterpriseOptionHint":"지금 계약에 없는 옵션이에요.\\n도입하려면 담당 매니저에게 문의해 주세요.","groups":{"appAndWorkspace":"앱 및 워크스페이스 사용","audioData":"음성 데이터","contentAndSharing":"콘텐츠 보호 및 공유","members":"구성원 관리","invitesAndAccess":"초대 및 접속 제한"},"allowCapture":{"title":"화면 캡처 허용","description":"구성원이 Tiro 앱에서 화면을 캡처하도록 허용해요. 끄면 모든 구성원의 화면 캡처를 막아요.","updateSuccess":"화면 캡처 정책을 변경했어요","updateError":"화면 캡처 정책을 변경하지 못했어요"},"masking":{"title":"개인정보 마스킹","description":"새로 만드는 노트의 전화번호, 이메일, 주민등록번호 같은 개인정보를 자동으로 마스킹해요. 이미 저장한 노트에는 적용하지 않아요.","updateSuccess":"개인정보 마스킹 설정을 변경했어요","updateError":"개인정보 마스킹 설정을 변경하지 못했어요"},"audioRetention":{"title":"음성 다시 듣기","description":"다시 듣기를 차단하면 음성을 바로 삭제하고, 기간을 정하면 그 기간이 지난 뒤 삭제해요. 대화 내용과 노트는 그대로 남아요.","blocked":"차단","unlimited":"허용","threeDays":"3일간 허용","sevenDays":"7일간 허용","custom":"기간 설정","fieldLabel":"다시 듣기 허용 기간","daysUnit":"일","rangeError":"1일부터 365일까지 입력해 주세요.","confirmTitle":"음성 다시 듣기 설정을 변경할까요?","confirmDescription":"이전 녹음에도 새 설정을 적용해요. 다시 듣기를 차단하거나 새 허용 기간이 이미 지난 음성은 바로 지우고, 한번 지우면 복구할 수 없어요.","confirmAction":"설정 변경","updateSuccess":"음성 다시 듣기 설정을 변경했어요","updateError":"음성 다시 듣기 설정을 변경하지 못했어요.\\n잠시 후 다시 시도해 주세요."},"deleteLocalAudioAfterProcessing":{"title":"음성 처리 후 음성파일 자동 삭제","description":"음성 처리가 끝나면 구성원 기기에 남은 음성파일을 자동으로 삭제하고, 그 파일의 공유와 내보내기도 막아요. 설정을 켠 뒤 기록한 음성부터 적용해요.","confirmTitle":"음성파일 자동 삭제를 켤까요?","confirmDescription":"켜면 음성 처리가 끝난 뒤 구성원 기기에 남은 음성파일을 자동으로 삭제해요. 지운 파일은 설정을 다시 꺼도 복구할 수 없어요.","confirmAction":"켜기","updateSuccess":"음성파일 자동 삭제 정책을 변경했어요","updateError":"음성파일 자동 삭제 정책을 변경하지 못했어요"},"restrictShareLink":{"title":"공유 링크 차단","description":"공유 링크 생성과 기존 링크 열람을 모두 막아요. 앱에서 구성원을 직접 초대하는 공유는 그대로 쓸 수 있어요."},"sharePolicy":{"title":"공유 링크 정책","description":"조직의 모든 워크스페이스에 적용하는 기본 공유 링크 정책이에요. 워크스페이스 설정과 비교해 더 엄격한 쪽을 적용해요.","updateSuccess":"공유 링크 정책을 변경했어요","updateError":"공유 링크 정책을 변경하지 못했어요","companyOnly":{"title":"회사 이메일로만 열람","description":"켜면 새 공유는 물론 기존 공유 링크도 허용 도메인 이메일로 로그인해야 열 수 있어요.","privateLockedHint":"지금은 '비공개(링크 공유 불가)' 상한이 걸려 있어 회사 이메일로만 열람보다 더 엄격해요.\\n변경하려면 담당 매니저나 partners@theplato.io로 문의해 주세요."},"maxDuration":{"title":"링크 최대 유효기간","description":"링크를 만든 뒤 이 기간이 지나면 열 수 없어요. 비워 두면 계속 열 수 있어요.","unlimited":"무제한","days":"{{days}}일"},"domains":{"title":"허용 이메일 도메인","description":"회사 이메일로만 열람할 때 허용할 도메인이에요. 워크스페이스에도 도메인이 있으면 두 목록에 모두 있는 도메인만 허용해요.","placeholder":"예: {{domain}}","add":"추가","remove":"도메인 제거","empty":"설정한 도메인이 없어요."}},"restrictNonOrgWorkspace":{"title":"조직 워크스페이스만 사용","description":"켜면 구성원은 조직 워크스페이스에서만 노트를 만들고 녹음할 수 있어요.","updateSuccess":"조직 워크스페이스만 사용 설정을 변경했어요","updateError":"조직 워크스페이스만 사용 설정을 변경하지 못했어요"},"allowMemberWorkspaceCreation":{"title":"구성원 워크스페이스 생성","description":"구성원도 새 워크스페이스를 만들도록 허용해요. 끄면 조직 관리자만 만들 수 있어요.","updateSuccess":"구성원 워크스페이스 생성 설정을 변경했어요","updateError":"구성원 워크스페이스 생성 설정을 변경하지 못했어요"},"allowedHosts":{"title":"API Key 허용 호스트","description":"등록한 호스트로 보낸 요청만 인증하고, 다른 호스트로 부르면 키가 맞아도 거절해요. 조직의 모든 API Key에 적용하며, 비워 두면 제한하지 않아요.","applyDelayHint":"변경한 내용이 적용되기까지 최대 1분 정도 걸릴 수 있어요.","placeholder":"예: mycompany.api.tiro.ooo","add":"추가","remove":"호스트 제거","anyHost":"제한 없음 (모든 호스트 허용)","updateSuccess":"허용 호스트를 변경했어요","updateError":"허용 호스트를 변경하지 못했어요"},"inviteDomains":{"title":"초대 허용 도메인","description":"초대할 수 있는 이메일 도메인을 정해 조직 밖 사람이 자료에 닿지 않게 해요. 워크스페이스 구성원과 노트 공동작업자를 따로 설정하고, 비워 두면 제한하지 않아요.","inputLabel":"허용할 도메인","placeholder":"예: {{domain}}","add":"추가","remove":"{{domain}} 제거","anyDomain":"이 목록으로는 제한하지 않아요","workspaceMember":{"title":"워크스페이스 구성원 초대","description":"등록한 도메인의 이메일만 워크스페이스 구성원으로 초대해요. 도메인을 지우면 조건에 맞지 않는 대기 중 초대를 자동으로 취소해요."},"noteUser":{"title":"노트 공동작업자 초대","description":"등록한 도메인의 이메일만 노트 공동작업자로 초대해요. 워크스페이스별 허용 도메인과 함께 적용하고, 조직 설정이 상한이라 워크스페이스에서 더 넓힐 수는 없어요."},"lastDomainWarning":{"title":"목록을 비우면 제한이 풀려요","description":"저장하면 이 목록으로는 더 이상 제한하지 않아요. 제한을 계속 두려면 도메인을 먼저 추가해 주세요.","confirm":"제한 해제하고 저장하기"},"updateSuccess":"초대 허용 도메인을 변경했어요","updateError":"초대 허용 도메인을 변경하지 못했어요"},"leaverNotePreservation":{"title":"이탈 구성원 노트 보존","description":"구성원이 조직을 떠나도 노트를 조직 보관 워크스페이스에 보존해요.","updateSuccess":"이탈 구성원 노트 보존 설정을 변경했어요","updateError":"이탈 구성원 노트 보존 설정을 변경하지 못했어요"},"allowedIps":{"title":"접속 허용 IP","description":"등록한 IP에서 온 요청만 허용해요. 구성원 접속과 조직 API Key에 모두 적용하고, 비워 두면 모든 IP에서 접속할 수 있어요.","currentIp":"저장할 때 지금 접속한 IP({{currentIpCidr}})를 항상 포함해요.","currentIpLoadError":"지금 접속한 IP를 확인하지 못해 설정을 변경할 수 없어요.","loadError":"접속 허용 IP를 불러오지 못했어요.","retry":"다시 시도","inputLabel":"허용할 IP 또는 CIDR","placeholder":"예: 203.0.113.10 또는 203.0.113.0/24","add":"IP 추가","remove":"{{cidr}} 제거","disable":"IP 제한 해제","anyIp":"제한 없음 (모든 IP 허용)","updateSuccess":"접속 허용 IP를 변경했어요","updateError":"접속 허용 IP를 변경하지 못했어요.\\n다시 시도해 주세요."}},"noMembers":"구성원이 없어요","name":"이름","email":"이메일","createdAt":"생성일","role":{"unpaidAdmin":"무료 관리자","viewer":"읽기 전용","label":"조직 역할","allRoles":"전체 역할","admin":"관리자","member":"구성원","developer":"개발자"},"tabs":{"overview":"개요","workspaces":"워크스페이스","members":"구성원","memberHistory":"감사(Audit)","usage":"통계","security":"보안","directorySync":"디렉토리 동기화(SCIM)","wordMemory":"단어장"},"directorySync":{"title":"디렉토리 동기화(SCIM)","loadError":"디렉토리 동기화 정보를 불러오지 못했어요.","retry":"다시 시도","connection":{"title":"IdP 연결","description":"Okta, Microsoft Entra ID 같은 IdP를 연결하면 구성원과 그룹을 자동으로 동기화해요.","connect":"IdP 연결하기","continueSetup":"설정 계속하기","portalLinkError":"설정 링크를 발급하지 못했어요","syncStatusPending":"변경 사항 기록 중","syncStatusActive":"동기화 적용 중","disconnected":"연결 해제됨"},"groups":{"title":"그룹과 워크스페이스 연결","description":"IdP 그룹을 워크스페이스에 연결하면 그룹 구성원 변경을 해당 워크스페이스에 반영해요. 연결하지 않은 그룹의 변경은 반영하지 않아요.","groupColumn":"그룹","workspaceColumn":"연결한 워크스페이스","map":"워크스페이스 연결","change":"변경","add":"추가","searchPlaceholder":"워크스페이스 검색","suggested":"제안","bulk":{"trigger":"이름으로 한 번에 연결 ({{total}})","title":"이름이 같은 워크스페이스에 연결","description":"선택한 그룹을 이름이 같은 기존 워크스페이스에 연결해요. 그 그룹 구성원은 해당 워크스페이스에 이미 있는 노트도 볼 수 있으니, 목록을 확인한 뒤 적용해 주세요.","matched":"연결 가능 {{count}}","ambiguous":"이름 중복 {{count}}","none":"같은 이름 없음 {{count}}","groupColumn":"그룹","workspaceColumn":"연결할 워크스페이스","manualHeading":"직접 정해야 하는 그룹 {{count}}개","ambiguousItem":"{{name}} (워크스페이스 {{count}}개)","emptyMatched":"이름이 같은 워크스페이스가 하나뿐인 그룹이 없어요. 그룹별로 직접 연결해 주세요.","apply":"{{count}}개 연결","applying":"연결 중 {{done}}/{{total}}","cancel":"취소","success":"{{applied}}개 그룹을 연결했어요.\\n연동을 켜면 구성원이 합류하고, 이미 켜져 있다면 '지금 동기화'를 실행해야 바로 반영해요.","partial":"{{applied}}개까지 연결했어요.\\n나머지는 다시 시도해 주세요.","error":"연결하지 못했어요.\\n잠시 후 다시 시도해 주세요.","loadingCandidates":"후보를 불러오는 중이에요","loadError":"후보를 불러오지 못했어요.","retry":"다시 시도","duplicateGroup":"그룹 이름 중복 {{count}}","duplicateGroupItem":"{{name}} (이름이 같은 그룹이 둘 이상)"},"noSearchResults":"검색 결과가 없어요","workspacesLoadError":"워크스페이스 목록을 불러오지 못했어요.","empty":"아직 동기화한 그룹이 없어요. IdP에서 그룹을 할당하면 여기에 보여드려요.","loadMore":"더 보기","loadError":"그룹 목록을 불러오지 못했어요.","unmappedWarning":"연결 전이에요. 이 그룹의 구성원 변경은 반영하지 않아요.","deletedWorkspace":"{{name}} (삭제됨)","removeMapping":"연결 해제","mappingCreateSuccess":"그룹을 워크스페이스에 연결했어요","mappingCreateError":"그룹을 연결하지 못했어요","mappingUpdateSuccess":"연결한 워크스페이스를 변경했어요","mappingUpdateError":"연결한 워크스페이스를 변경하지 못했어요","mappingDeleteSuccess":"연결을 해제했어요","mappingDeleteError":"연결을 해제하지 못했어요"},"apply":{"title":"적용","descriptionPending":"지금은 IdP 변경 사항을 기록만 하고 실제 소속에는 반영하지 않아요. 예상 변경 사항을 확인한 뒤 적용을 시작하세요.","descriptionActive":"IdP 변경 사항을 실제 소속에 반영하고 있어요.","previewTitle":"예상 변경 사항","previewRefresh":"미리보기 새로고침","previewLoadError":"미리보기를 불러오지 못했어요.","directoryUserCount":"전체 디렉토리 사용자","addOrgMembers":"조직에 추가될 구성원","deprovision":"Tiro 접근이 중지될 구성원","unmappedGroups":"워크스페이스 미연결 그룹","conflicts":"다른 조직 소속 사용자","workspaceAdds":"워크스페이스에 추가될 구성원","workspaceRemovals":"해제될 워크스페이스 소속","grantRevokes":"회수될 워크스페이스 부여","peopleCount":"{{count}}명","groupCount":"{{count}}개","activate":"적용 시작","confirmTitle":"동기화 적용을 시작할까요?","confirmDescription":"이 시점부터 IdP 변경 사항을 실제 소속에 반영하고, 전체 동기화를 한 번 실행해요.","confirmAction":"적용 시작","activateSuccess":"동기화 적용을 시작했어요","activateError":"동기화 적용을 시작하지 못했어요","deactivate":"적용 일시정지","deactivateSuccess":"동기화 적용을 일시정지했어요","deactivateError":"동기화 적용을 일시정지하지 못했어요","reconcile":"지금 동기화","reconcileSuccess":"동기화를 요청했어요","reconcileError":"동기화를 요청하지 못했어요","membershipCount":"{{count}}건","countUnknown":"확인 불가","reconcileConfirmTitle":"지금 동기화할까요?","reconcileConfirmDescription":"이번 동기화로 워크스페이스 소속 {{count}}건이 해제될 수 있어요.","reconcileConfirmDescriptionUnknown":"해제될 소속 수를 확인하지 못했어요. 미리보기를 새로고침해 예상 변경 사항을 확인한 뒤 실행하는 것을 권장해요.","reconcileConfirmAction":"동기화"}},"memberHistory":{"title":"권한 변경 이력","description":"구성원 추가와 제거, 역할 변경 내역을 조회할 수 있어요. 개인정보 보호와 감사 목적으로 기록해요.","searchPlaceholder":"이름 또는 이메일로 검색","startDate":"시작일","endDate":"종료일","allActions":"전체 유형","actionLabel":"유형","action":{"added":"추가","removed":"제거","roleChanged":"역할 변경"},"member":"대상 구성원","change":"변경 내용","performedBy":"수행한 사람","occurredAt":"발생 시각","systemActor":"시스템","unknownUser":"확인할 수 없는 사용자","deletedUser":"탈퇴한 사용자","empty":"권한 변경 이력이 없어요","loadError":"이력을 불러오지 못했어요","emptyFiltered":"조건에 맞는 권한 변경 이력이 없어요","showing":"{{count}}건 표시 중, 더 불러올 수 있어요","loadMore":"더 보기"},"auditLog":{"tabs":{"permissionHistory":"권한 변경 이력","auditLog":"감사 로그","accessLog":"접속 로그"},"title":"감사 로그","description":"구성원 권한 변경과 로그 파일 생성 기록을 CSV로 만들 수 있어요.","selectDates":"조회 기간 선택","actionFilter":"작업 유형","actionsSelected":"작업 유형 {{count}}개","actions":{"all":"전체 작업","authLogin":"로그인 성공","noteRead":"노트 조회","noteUpdate":"노트 수정","noteDelete":"노트 삭제","transcriptDelete":"전사 문단 삭제","memberRoleAdd":"구성원 역할 부여","memberRoleChange":"구성원 역할 변경","memberRoleRemove":"구성원 역할 해제","auditLogSearch":"감사 로그 조회","auditLogExport":"감사 로그 내보내기","wikiPageList":"위키 페이지 목록 조회","wikiPageView":"위키 페이지 조회","wikiSearch":"위키 검색","wikiGraphSeed":"위키 그래프 조회","wikiGraphExpand":"위키 그래프 확장","wikiGraphAround":"위키 그래프 주변 탐색","wikiSourceOpen":"위키 원본 출처 조회"},"createExport":"로그 파일 만들기","download":"다운로드","status":{"QUEUED":"대기 중","RUNNING":"만드는 중","READY":"준비됨","FAILED":"실패","EXPIRED":"만료됨"},"list":{"title":"요청 이력","requestedFilter":"요청일","requestedWithin":{"7":"최근 7일","30":"최근 30일","90":"최근 90일","365":"최근 1년","all":"전체"},"emptyFiltered":"{{range}}에 요청한 로그 파일이 없어요","requestedAt":"요청 시각","period":"기간","requestedBy":"요청자","status":"상태","recordCount":"결과 건수","expiresAt":"만료 {{datetime}}","failureReason":"실패 사유","truncated":"일부만 포함","empty":"아직 만든 로그 파일이 없어요","loadError":"로그 파일 요청 이력을 불러오지 못했어요","showing":"{{count}}건 표시 중, 더 불러올 수 있어요","loadMore":"더 보기"},"export":{"timezone":"시간대","timezoneHelp":"지역 시간대 또는 UTC 오프셋을 입력하세요. 예: Asia/Seoul, America/New_York, +09:00","timezoneUtc":"UTC (UTC+00:00)","timezoneSeoul":"한국 표준시 (UTC+09:00)","title":"로그 파일 만들기","description":"다운로드 사유는 감사 기록으로 남아요. 파일은 최대 1GB까지 만들 수 있어요.","period":"로그 기간","periodHelp":"최대 {{maxDays}}일까지 만들 수 있어요. 최근 15분은 자동으로 제외해요.","reason":"다운로드 사유","reasons":{"CUSTOMER_REQUEST":"고객 요청","INCIDENT_INVESTIGATION":"사고 조사","LEGAL_AUDIT":"법적 감사","INTERNAL_OPERATION":"내부 운영","PERIODIC_REVIEW":"정기 점검","OTHER":"기타"},"detail":"상세 사유","detailPlaceholder":"예: 2026년 3분기 정기 보안 점검","detailHelp":"앞뒤 공백을 제외하고 10자 이상 200자 이하로 입력해 주세요.","detailError":"상세 사유를 10자 이상 200자 이하로 입력해 주세요.","submit":"만들기"},"failure":{"archivedRange":"선택한 기간의 일부 로그를 장기 보관 중이라 바로 조회할 수 없어요. 관리자에게 복원을 요청해 주세요.","rangeTooLong":"선택한 기간이 너무 길어요. 기간을 줄여 다시 시도해 주세요.","scanBudget":"조회할 기록이 너무 많아요. 기간을 좁혀 다시 시도해 주세요.","exportSizeLimit":"로그 파일이 1GB를 초과해 만들지 못했어요. 기간을 좁혀 다시 시도해 주세요.","exportProcessingTimeout":"로그 파일 처리 시간이 길어져 작업이 중단됐어요. 기간을 좁혀 다시 시도해 주세요.","archiveParse":"일부 로그를 읽는 중 문제가 생겼어요. 다시 시도해도 계속되면 문의해 주세요.","internal":"로그 파일을 만들지 못했어요. 잠시 후 다시 시도해 주세요.","unknown":"로그 파일을 만들지 못했어요. 조건을 확인한 뒤 다시 시도해 주세요."},"errors":{"invalidTimezone":"유효한 지역 시간대 또는 UTC 오프셋을 입력해주세요.","selectRange":"시작일과 종료일을 모두 선택해 주세요.","noSettledRecords":"선택한 기간에 만들 수 있는 로그가 아직 없어요. 15분 뒤 다시 시도해 주세요.","exportRangeTooLong":"선택한 시간대 기준으로 조회 가능 기간을 초과했어요. 종료일을 하루 앞당겨 주세요.","tooManyJobs":"처리 중인 요청이 많아요. 요청 하나가 끝난 뒤 다시 시도해 주세요.","invalidRequest":"선택한 기간을 처리할 수 없어요. 기간을 줄여 다시 시도해 주세요.","createFailed":"로그 파일 만들기를 시작하지 못했어요. 잠시 후 다시 시도해 주세요.","downloadFailed":"다운로드를 시작하지 못했어요. 잠시 후 다시 시도해 주세요."}},"accessLog":{"title":"접속 로그","description":"조직 구성원의 접속 로그를 CSV로 만들 수 있어요."},"usage":{"title":"통계","reportTabs":{"usage":"사용량","signups":"신규 가입자"},"granularityOptions":{"daily":"일별","weekly":"주별","monthly":"월별"},"accumulated":"누적","startDate":"시작일","endDate":"종료일","dateRangeValidation":"시작일은 종료일보다 빨라야 해요","usageChart":"사용량","signupChart":"신규 가입자","signupDefinition":"현재 조직 구성원이 Tiro 계정을 만든 날짜를 기준으로 집계해요.","signupTotal_one":"선택한 기간의 신규 가입자는 {{count}}명이에요.","signupTotal_other":"선택한 기간의 신규 가입자는 {{count}}명이에요.","signupCount":"신규 가입자","signupLoadError":"가입자 통계를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.","signupRefreshError":"최신 가입자 통계를 불러오지 못해 이전에 불러온 데이터를 보여드려요.","signupLoading":"가입자 통계를 불러오는 중이에요.","signupExport":{"button":"신규 가입자 CSV","exporting":"내려받는 중...","success":"신규 가입자 CSV를 내려받았어요.","error":"신규 가입자 CSV를 내려받지 못했어요. 다시 시도해 주세요."},"period":"기간","showDataTable":"데이터 표 보기","hideDataTable":"데이터 표 숨기기","quotaReference":"사용 한도","minutesUsed":"분 사용","loading":"불러오는 중...","noData":"데이터가 없어요","noteCount":"노트 수","recordingMinutes":"녹음 시간(분)","activeUsers":"활성 사용자","activeUsersDefinition":"해당 기간에 녹음한 구성원 수예요. 일, 주, 월 단위에 따라 DAU/WAU/MAU로 바뀌어요.","activeUsersCount_one":"활성 사용자 {{count}}명","activeUsersCount_other":"활성 사용자 {{count}}명","usageFilter":{"button":"사용량 필터","title":"사용량 기준 필터","description":"선택한 기간의 녹음 사용량(분)으로 구성원을 필터링해요.","minPrefix":"","minSuffix":"분 이상","maxPrefix":"","maxSuffix":"분 미만","noLimitPlaceholder":"제한 없음","apply":"적용","reset":"초기화","invalidRange":"0 이상의 정수를 입력하고, 최소값은 최대값보다 작아야 해요","chipMin":"{{min}}분 이상","chipMax":"{{max}}분 미만","chipRange":"{{min}}분 이상 {{max}}분 미만","matchCount_one":"{{count}}명","matchCount_other":"{{count}}명","emptyResult":"조건에 맞는 구성원이 없어요","clearFilter":"필터 해제"},"memberBreakdown":"구성원별 사용량","memberName":"이름","memberEmail":"이메일","totalRecordingMinutes":"총 녹음 시간","totalNoteCount":"총 노트 수","totalCreditsUsed":"총 크레딧 사용량","totalOverageMinutes":"총 초과 사용량","orgQuotaUsage":"{{used}}분 / {{quota}}분","orgUsageValue":"{{used}}분","orgQuotaPeriodHint":"현재 구독 주기의 사용량이에요.","export":{"button":"사용량 CSV","exporting":"내보내는 중...","sectionTotals":"선택 기간 합계","sectionTimeseries":"기간별 리포트","sectionRaw":"원본 데이터","memberBreakdown":"구성원별 합계","timeseries":"전체","memberTimeseries":"구성원별","workspaceTimeseries":"워크스페이스별","memberWorkspaceTimeseries":"구성원 × 워크스페이스","cumulativeChip":"누적","cumulativeHint":"누적이 켜져 있어 선택한 기간 전체를 하나로 합산한 CSV를 내려받아요.","success":"CSV 파일을 내려받았어요","error":"내보내지 못했어요.\\n다시 시도해 주세요.","workspaceBreakdown":"워크스페이스별 합계"},"workspaceBreakdown":"워크스페이스별 사용량","workspaceName":"워크스페이스 이름"},"overview":{"subscription":"구독 정보","subscriptionStart":"시작일","subscriptionEnd":"종료일","noSubscriptionEnd":"없음","paymentState.active":"활성","paymentState.canceling":"취소 예정","paymentState.pending":"대기 중","paymentState.expired":"만료됨","noSubscription":"활성 구독이 없어요","editName":"조직명 편집","saveName":"저장","cancelEdit":"취소","manageMembers":"구성원 관리","manageWorkspaces":"워크스페이스 관리","viewUsage":"사용량 보기","currentUsage":"현재 사용량","unlimited":"한도 없음","usagePercent":"{{percent}}% 사용","loadError":"조직 상태를 불러오지 못했어요.","loadErrorDescription":"잠시 후 다시 시도해 주세요.","retry":"다시 시도","updateSuccess":"조직 이름을 변경했어요","updateError":"조직 이름을 변경하지 못했어요"},"workspaces":{"createSuccess":"워크스페이스를 만들었어요","createError":"워크스페이스를 만들지 못했어요","deleteSuccess":"워크스페이스를 삭제했어요","deleteError":"워크스페이스를 삭제하지 못했어요","memberAddSuccess":"구성원을 추가했어요","memberAddError":"구성원을 추가하지 못했어요","memberRemoveSuccess":"구성원을 제거했어요","memberRemoveError":"구성원을 제거하지 못했어요","memberRoleUpdateSuccess":"역할을 변경했어요","memberRoleUpdateError":"역할을 변경하지 못했어요","searchPlaceholder":"워크스페이스 이름으로 검색","addWorkspace":"워크스페이스 만들기","totalCount":"전체 {{count}}개","noWorkspaces":"워크스페이스가 없어요.","loadError":"워크스페이스를 불러오지 못했어요.","emptyFiltered":"검색 결과가 없어요.","columnName":"이름","columnMembers":"구성원","columnUsage":"사용량 / 사용 한도","columnCreatedAt":"생성일","systemBadge":"시스템","onboardingBadge":"온보딩","onboarding":{"title":"온보딩 워크스페이스","description":"조직에 새로 가입한 구성원을 아래 워크스페이스에 자동으로 추가해요.","empty":"지정한 워크스페이스가 없어요.","add":"추가","searchPlaceholder":"워크스페이스 이름으로 검색","noSearchResults":"검색 결과가 없어요.","limitReached":"최대 {{max}}개까지 지정할 수 있어요.","remove":"온보딩 워크스페이스에서 제거","loadError":"온보딩 워크스페이스를 불러오지 못했어요.","updateError":"온보딩 워크스페이스를 변경하지 못했어요"},"usageValue":"{{used}}분 / {{quota}}분","usageValueUnlimited":"{{used}}분 / -","usageValueBlocked":"{{used}}분 / 차단","quotaUpdateSuccess":"사용 한도를 변경했어요","quotaUpdateError":"사용 한도를 변경하지 못했어요","nameUpdateSuccess":"워크스페이스 이름을 변경했어요","nameUpdateError":"워크스페이스 이름을 변경하지 못했어요","quota":{"quotaLabel":"사용 한도","mode":{"unlimited":"한도 없음","blocked":"차단 (0분)","limit":"한도 설정"},"minutesPerMonth":"분 / 월","placeholder":"예: 500","hint":"이 워크스페이스의 총 사용량이 한도에 도달하면 새 기록을 시작할 수 없어요.","quickEditLabel":"사용 한도 설정"},"memberCount":"{{count}}명","deleteWorkspace":"워크스페이스 삭제","loadMore":"더 보기","createDialogTitle":"새 워크스페이스 만들기","createDialogDescription":"조직에 새 워크스페이스를 만들어요.","nameLabel":"워크스페이스 이름","namePlaceholder":"워크스페이스 이름을 입력하세요","create":"만들기","deleteDialogTitle":"워크스페이스 삭제","deleteDialogDescription":"정말 {{name}} 워크스페이스를 삭제할까요? 이 작업은 되돌릴 수 없어요.","detail":{"back":"목록으로","loadError":"워크스페이스 정보를 불러오지 못했어요.","editName":"이름 수정","quotaTitle":"사용 한도","createdAt":"생성일","updatedAt":"수정일","membersTitle":"구성원","membersShowing":"{{count}}명 표시 중","membersLoadError":"구성원 목록을 불러오지 못했어요.","memberSearchLoadError":"구성원 검색 결과를 불러오지 못했어요.","addMember":"구성원 추가","emailPlaceholder":"이메일을 입력하세요","selectMemberPlaceholder":"구성원을 선택하세요","searchMemberPlaceholder":"이름 또는 이메일로 검색","noMemberSearchResults":"검색 결과가 없어요","add":"추가","noMembers":"아직 구성원이 없어요.","removeMember":"구성원 제거","dangerTitle":"워크스페이스 삭제","dangerDescription":"워크스페이스를 삭제하면 되돌릴 수 없어요."}},"members":{"searchPlaceholder":"이름 또는 이메일로 검색","columns":"열","visibleColumns":"표시할 열","joinedAt":"가입일","showing":"{{count}}명 표시 중, 더 불러올 수 있어요","totalCount":"전체 {{count}}명","loadError":"구성원을 불러오지 못했어요","emptyFiltered":"조건에 맞는 구성원이 없어요","loadMore":"더 보기","updateSuccess":"조직 역할을 변경했어요","updateError":"구성원 정보를 변경하지 못했어요","removeMember":"구성원 제거","removeMemberDialogTitle":"구성원 제거","removeMemberDialogDescription":"{{memberName}}님을 조직에서 제거할까요? 되돌릴 수 없어요.","preserveNotesLabel":"이 구성원의 노트를 보존","preserveNotesDescription":"워크스페이스 폴더에 공유하지 않은 노트를 조직 보관 워크스페이스로 옮겨요.","removeSuccess":"구성원을 제거했어요","removeError":"구성원을 제거하지 못했어요","moreActions":"더보기","suspendRecording":"기록 차단","resumeRecording":"기록 허용","recordingSuspendedBadge":"기록 차단됨","recordingSuspendSuccess":"이 구성원의 기록을 차단했어요","recordingResumeSuccess":"이 구성원의 기록을 허용했어요","onboardMembers":"초대 및 배정","onboardDialogTitle":"구성원 초대 및 배정","onboardDialogDescription":"조직 역할과 워크스페이스 배정을 함께 설정해 여러 구성원을 한 번에 초대해요.","onboardManualInput":"직접 입력","onboardCsvUpload":"CSV 업로드","onboardEmailPlaceholder":"이메일 주소를 쉼표 또는 줄바꿈으로 구분하여 입력하세요","onboardDefaultRole":"조직 역할","onboardDownloadTemplate":"CSV 템플릿 다운로드","onboardSubmit":"초대 및 배정","onboardSubmitting":"처리 중...","onboardMaxExceeded":"한 번에 최대 {{max}}명까지 초대할 수 있어요.","onboardParsedCount":"{{count}}명 초대 준비 완료","onboardResultTitle":"초대 및 배정 결과","onboardResultInvitedNew":"새 사용자 초대 완료","onboardResultInvitedExisting":"기존 사용자 초대 완료","onboardResultAlreadyMembers":"이미 구성원","onboardResultRoleUpdated":"역할 변경됨","onboardResultFailed":"실패","onboardError":"초대하고 배정하지 못했어요","onboardCsvMissingEmailColumn":"CSV 파일에 email 열이 필요해요","onboardCsvLegacyTeamNameHeader":"teamName 헤더는 더 이상 지원하지 않아요. 헤더를 workspaceName으로 바꿔서 다시 올려 주세요.","onboardCsvParseError":"CSV 파일을 분석하지 못했어요","onboardCsvInvalidAction":"action 값은 ADD 또는 DELETE만 사용할 수 있어요","onboardNoValidEmails":"유효한 이메일 주소가 없어요","onboardProviderHint":"Google 또는 Microsoft 계정으로 로그인할 수 있는 이메일만 초대할 수 있어요.","onboardUnsupportedProviderWarning":"{{emails}} 주소는 Google/Microsoft 계정이 아니라서 초대하지 못할 수 있어요.","onboardCsvGuideTitle":"CSV는 이렇게 채워주세요","onboardCsvGuideColumnEmail":"초대할 이메일 주소예요. 꼭 채워 주세요.","onboardCsvGuideColumnRole":"조직 역할이에요. ADMIN 또는 MEMBER를 넣고, 비워 두면 MEMBER로 들어가요.","onboardCsvGuideColumnWorkspace":"배정할 워크스페이스예요. 비워 두면 배정하지 않고, 없는 이름을 넣으면 워크스페이스를 새로 만들어요.","onboardCsvGuideColumnAction":"ADD는 추가와 초대, DELETE는 워크스페이스에서 제거예요. 비워 두면 ADD로 처리해요.","onboardCsvGuideMoveTip":"워크스페이스를 옮길 땐 기존 워크스페이스를 DELETE 한 줄, 새 워크스페이스를 ADD 한 줄로 나눠서 적어 주세요.","workspaces":"워크스페이스","allWorkspaces":"전체 워크스페이스","workspaceFilterSelectedCount":"워크스페이스 {{count}}개","workspaceFilterSearchPlaceholder":"워크스페이스 이름으로 검색","workspaceFilterNoResults":"검색 결과가 없어요","workspaceFilterLoadError":"워크스페이스를 불러오지 못했어요","workspaceFilterWithoutWorkspace":"소속 없는 구성원만 보기","noWorkspace":"소속 없음","memberSheet":{"addToWorkspace":"워크스페이스에 추가","selectWorkspacePlaceholder":"워크스페이스를 선택하세요","add":"추가","noAvailableWorkspaces":"추가할 수 있는 워크스페이스가 없어요.","membershipsLabel":"소속 워크스페이스","noMemberships":"아직 소속된 워크스페이스가 없어요.","loadError":"워크스페이스 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.","removeFromWorkspace":"워크스페이스에서 제거","searchWorkspacePlaceholder":"워크스페이스 이름으로 검색","noWorkspaceSearchResults":"검색 결과가 없어요"},"onboardWorkspaceName":"워크스페이스 이름","onboardWorkspaceNamePlaceholder":"워크스페이스 이름 입력 (선택사항)","onboardWorkspaceAutoCreateTooltip":"없는 이름을 입력하면 워크스페이스를 새로 만들어요.","onboardResultWorkspaceUpdated":"워크스페이스 변경됨","onboardResultWorkspaceRemoved":"워크스페이스에서 제거됨","onboardResultInvitationsRevoked":"초대 철회됨","resetPassword":"비밀번호 재설정","passwordRecovery":{"confirmTitle":"재설정 이메일을 보낼까요?","confirmDescription":"구성원이 새 비밀번호를 설정하기 전까지는 기존 비밀번호를 사용할 수 있어요.","confirmSend":"이메일 보내기","description":"구성원이 직접 비밀번호를 바꿀 수 있도록 재설정 링크를 이메일로 보내요.","sendEmail":"재설정 이메일 보내기","sending":"보내는 중…","sent":"비밀번호 재설정 이메일을 보냈어요.","sendError":"이메일을 보내지 못했어요. 잠시 후 다시 시도해 주세요.","rateLimited":"이메일을 너무 자주 요청했어요. 잠시 후 다시 시도해 주세요."},"resetPasswordDialogTitle":"비밀번호 재설정","resetPasswordDialogDescriptionLine1":"{{memberName}}님의 비밀번호를 재설정할까요?","resetPasswordDialogDescriptionLine2":"임시 비밀번호가 생성되며, 구성원에게 직접 전달해야 해요.","resetPasswordConfirm":"재설정","resetPasswordResultTitle":"임시 비밀번호 생성됨","resetPasswordResultDescriptionLine1":"{{memberName}}님의 임시 비밀번호예요.","resetPasswordResultDescriptionLine2":"안전하게 전달하고, 로그인 후 비밀번호를 변경하도록 안내해 주세요.","newPassword":"임시 비밀번호","copyPassword":"복사","resetPasswordAdminContact":"관리자 비밀번호 초기화는 담당 매니저 또는 partners@theplato.io로 문의해 주세요.","resetPasswordError":"비밀번호를 재설정하지 못했어요","loginProvider":{"local":"이메일"},"detail":{"back":"목록으로","loadError":"구성원 정보를 불러오지 못했어요.","infoTitle":"구성원 정보","recordingSuspendDescription":"비활성화하면 새 기록을 시작할 수 없고, 진행 중인 실시간 기록도 종료해요.","resetPasswordDescription":"임시 비밀번호가 생성되며, 구성원에게 직접 전달해야 해요.","loginMethodLabel":"로그인 방식","dangerTitle":"구성원 제거","dangerDescription":"조직에서 구성원을 제거하면 되돌릴 수 없어요."}},"sidebar":{"organization":"조직","user":"사용자","management":"조직 관리","policies":"정책"}}`,
  ),
  Te = {
    message: "로그인 중입니다...",
    subtitle: "잠시만 기다려주세요.",
    back: "뒤로 가기",
  },
  ye = {
    conferenceMode: "컨퍼런스 모드",
    enterConference: "컨퍼런스 모드",
    normalView: "일반 보기",
    translation: "번역",
    toggleTranslation: "번역 표시",
    waitingForCaptions: "곧 실시간 자막이 시작돼요",
    eventInfo: "이벤트 정보",
    appBanner: {
      title: "내 회의도 Tiro로 기록해보세요",
      description: "실시간 요약·번역부터 회의록까지",
      download: "다운로드",
      dismiss: "닫기",
    },
  },
  Se = {
    status: {
      recording: "기록 중",
      uploading: "업로드 중...",
      uploadComplete: "업로드 완료",
      uploadFailed: "업로드 실패",
    },
    lockedNote: "잠긴 노트",
  },
  Ae = {
    title: "보안 | 티로",
    description:
      "강력한 보안 정책. 모든 음성은 전사 즉시 폐기되며, Okta 등 주요 IdP 기반 SSO와 SCIM을 지원합니다.",
    keywords:
      "Tiro 보안, AI 회의록 보안, SOC 2, ISO 27001, 데이터 암호화, Okta SSO, SCIM",
    hero: {
      title: "강력한 보안 정책",
      subtitle:
        "모든 음성은 전사 즉시 폐기되며, 어떠한 데이터도 학습에 사용되지 않습니다.",
      caption:
        "Tiro는 바쁜 비즈니스 리더를 위한 AI 미팅 어시스턴트입니다. 엄격한 보안 정책 하에 실시간 기록, 자동 요약, 검색 가능한 구조화 노트를 제공합니다.",
    },
    principles: {
      sectionTitle: "엄격한 데이터 보호 원칙",
      processing: {
        title: "음성 즉시 폐기 & 데이터 암호화",
        description:
          "음성파일은 전사 직후 복구 불가능한 형태로 폐기되어 평문 디스크에 저장되지 않습니다. 회의록·요약 등 텍스트 데이터는 AES-256으로 암호화되어 저장되며, 사용자별로 별도의 암호화 키를 생성합니다. 전송 구간은 TLS 1.2 이상으로 보호됩니다.",
      },
      location: {
        title: "AWS 서울 리전 저장",
        description:
          "AWS 서울 리전(ap-northeast-2)에 Multi-AZ 구성으로 저장되어 국내 데이터 주권 요건을 충족하고, 단일 가용영역 장애에도 가용성을 유지합니다. Enterprise 계약에 따라 다른 리전·전용 VPC 구성으로 물리적 테넌트 분리도 가능합니다.",
      },
      noTraining: {
        title: "AI 모델 학습에 사용 안 함",
        description:
          "고객의 대화 기록을 비롯한 어떠한 정보도 모델 학습·파인튜닝에 활용하지 않습니다. 무료/유료/기업 고객 무관 일관되게 적용되며, 모든 LLM·STT 벤더와 학습 미사용·비저장(Zero Data Retention) DPA가 체결되어 있습니다.",
      },
    },
    overview: {
      sectionTitle: "보안 현황",
      encryption: {
        title: "암호화",
        description:
          "모든 데이터 저장소(데이터베이스·블록 스토리지·오브젝트 스토리지)의 저장 데이터는 AES-256, 전송 구간은 TLS 1.2 이상으로 암호화됩니다. 민감 콘텐츠에는 사용자별 추가 암호화 계층이 적용되어, DB에 직접 접근할 수 있는 운영자조차 평문으로 볼 수 없습니다.",
      },
      location: {
        title: "데이터 저장 위치",
        description:
          "AWS 서울 리전(ap-northeast-2)으로 국내 데이터 주권 요건을 충족합니다. Multi-AZ 배포로 가용성을 유지하며, Enterprise 계약에 따라 다른 리전·전용 VPC 구성으로 물리적 테넌트 분리도 가능합니다.",
      },
      keyManagement: {
        title: "키 관리 (KMS / HSM)",
        description:
          "AWS KMS는 FIPS 140-2 Level 3 검증 HSM으로 키를 보호하며, 12개월 주기로 자동 로테이션됩니다. 어플리케이션은 평문 키를 직접 보유하지 않고 KMS API를 통해 암복호화 요청만 수행합니다.",
      },
      accessControl: {
        title: "접근 제어",
        description:
          "RBAC·ABAC로 최소 권한 접근을 적용합니다. 평문 콘텐츠 직접 접근은 명시적으로 승인된 소수 인원으로 제한되며, 모든 접근은 쿼리·컬럼 단위로 영구 기록됩니다.",
      },
      monitoring: {
        title: "모니터링 & 감사 로그",
        description:
          "AWS GuardDuty(위협 탐지), Inspector(취약점), WAF + Cloudflare(웹 공격 방어), Datadog 대시보드로 연중무휴 24시간 모니터링합니다. 감사 로그는 격리된 변조 방지 저장소로 전송되어 운영 시스템에서 수정할 수 없도록 보호됩니다.",
      },
      backup: {
        title: "서비스 가용성 & 백업",
        description:
          "월 99.9% SLA를 적용하며, 미달 시 서비스 크레딧을 제공합니다. 데이터베이스는 KMS 암호화로 자동 백업되며, 연 1회 복구 테스트를 수행합니다. 구체 복구 목표는 계약 단계에서 협의 가능합니다.",
      },
    },
    enterprise: {
      sectionTitle: "엔터프라이즈 보안 기능",
      description:
        "티로는 엔터프라이즈 환경에 최적화된 보안 제어 옵션들을 제공합니다.",
      features: {
        sso: {
          label: "Okta SSO",
          title: "Okta 등 주요 IdP SSO",
          description:
            "SAML 2.0/OIDC로 Okta, Azure AD, Google Workspace 등 사내 IdP와 연동합니다. 사용자는 회사 계정 하나로 Tiro에 로그인하며, 계정 권한 변경이 IdP 정책과 일관되게 동기화됩니다.",
        },
        mfa: {
          label: "MFA (다중 인증)",
          title: "MFA (다중 인증)",
          description:
            "OTP·인증 앱·하드웨어 키 등 추가 인증 수단을 통한 계정 보안 강화. 비밀번호 유출 시에도 무단 로그인을 차단합니다.",
        },
        ip: {
          label: "IP 접근 제한",
          title: "IP 접근 제한 (워크스페이스 IP 대역 기반)",
          description:
            "워크스페이스 단위로 허용 IP 대역을 지정하고, 그 외 대역에서의 접근을 차단합니다 (사무실/VPN 전용). IdP 조건부 접근 정책과 별개로 동작하는 자체 기능입니다.",
        },
        admin: {
          label: "Admin Console",
          title: "Admin Console",
          description: "조직/팀별 사용 현황 대시보드, 정책 일괄 관리.",
        },
        audit: {
          label: "Audit Logs",
          title: "Audit Logs (감사 로그)",
          description:
            "사용자/관리자 활동 이력 기록 및 보관 (보관 기간 1년~7년 커스터마이즈 가능). CSV/JSON Export 또는 SIEM 연동(Splunk, Datadog Cloud SIEM, Sumo Logic, Elastic 등)으로 자사 보안 모니터링 환경에 직접 통합할 수 있습니다.",
        },
        share: {
          label: "외부 공유 제한",
          title: "외부 공유 제한",
          description:
            "허용 도메인 외 노트 공유 차단. 화이트리스트 도메인만 허용 구성 가능.",
        },
        capture: {
          label: "모바일 캡처 방지",
          title: "모바일 캡처 방지",
          description: "모바일 앱 화면 캡처 차단 및 시도 로그 기록.",
        },
        scim: {
          label: "SCIM 2.0 프로비저닝 (Enterprise 옵션)",
          title: "SCIM 2.0 프로비저닝 (Enterprise 옵션, 일정·범위 협의)",
          description:
            "IdP 연동 사용자 자동 동기화 (추가/삭제/변경)를 Enterprise 옵션으로 제공 예정입니다. 도입 일정과 적용 범위는 계약 시 협의해 확정합니다.",
        },
        pii: {
          label: "개인정보 마스킹 (PII)",
          title: "개인정보 마스킹 (PII Auto-Masking)",
          description:
            "회의록 내 개인정보 자동 비식별 처리. 주민등록번호·전화번호·계좌번호 등 민감 식별자를 검출해 마스킹 처리합니다.",
        },
        retention: {
          label: "데이터 보존 정책",
          title: "데이터 보존 정책",
          description:
            "도메인 단위 회의록 보관 기간 설정(예: 90일/180일/1년) 및 기간 경과 시 자동 삭제.",
        },
        delete: {
          label: "회원탈퇴 시 데이터 완전 삭제",
          title: "회원탈퇴 시 데이터 완전 삭제",
          description:
            "계정 삭제 시 관련 데이터 복구 불가능한 상태로 제거 (최장 30일 이내).",
        },
        receipt: {
          label: "삭제 증빙",
          title: "삭제 증빙 (Erasure Receipt)",
          description:
            "삭제 요청 → 수행 → 완료 시점을 감사로그로 남기고 증빙(JSON/PDF) 발급.",
        },
        vendor: {
          label: "벤더 라우팅 화이트리스트",
          title: "벤더 라우팅 화이트리스트",
          description:
            "사용 가능 LLM·STT 벤더를 고객사가 선택, 한국 리전 한정 라우팅 등 커스터마이즈 가능. 데이터 주권 요건이나 특정 벤더 비허용 정책이 있는 경우 적용합니다.",
        },
        session: {
          label: "세션·디바이스 통제",
          title: "세션·디바이스 통제",
          description:
            "세션 만료 시간, 동시 접속 제한, 디바이스 등록 제한 등 정책 단위 설정.",
        },
      },
      review: {
        badge: "IT & Security Review",
        title: "Okta 연동 시 확인 가능한 통제",
        description:
          "보안팀이 검토하는 인증·프로비저닝·감사 항목을 기존 사내 정책에 맞춰 구성할 수 있습니다.",
        items: {
          protocol: {
            title: "SSO 프로토콜",
            description: "SAML 2.0/OIDC로 Okta 앱 설정과 연결합니다.",
          },
          mfa: {
            title: "MFA 정책",
            description: "Okta MFA와 조건부 접근 정책을 로그인에 적용합니다.",
          },
          scim: {
            title: "SCIM 동기화 (Enterprise 옵션)",
            description:
              "사용자 생성, 비활성화, 그룹 변경의 자동 반영은 Enterprise 옵션으로, 도입 일정과 범위를 협의해 제공합니다.",
          },
          audit: {
            title: "감사 추적",
            description:
              "관리자·사용자 활동 로그를 보안 검토 자료로 제공합니다.",
          },
        },
      },
      calloutLabel: "Enterprise 옵션:",
      calloutDescription:
        "전용 클라우드 환경(물리적 테넌트 분리) + 맞춤 보안 옵션 협의 가능",
      calloutCta: "엔터프라이즈 문의",
    },
    dataHandling: {
      sectionTitle: "데이터 처리 및 삭제",
      principleLabel: "오디오 처리 원칙:",
      principleQuote:
        "전사를 위해서만 처리되고, 처리 직후 복구 불가능하게 폐기",
      tableHeaders: { mode: "모드", flow: "처리 흐름", storage: "저장" },
      rows: {
        realtime: {
          mode: "실시간 (Streaming)",
          flow: "마이크/시스템 오디오 → STT 엔진(스트리밍) → 텍스트 변환 후 메모리/스트림에서 폐기",
          storage: "평문 디스크 저장 없음",
        },
        batch: {
          mode: "배치 (Upload)",
          flow: "오디오/영상 파일 업로드 → STT/화자분리 처리 → 즉시 폐기",
          storage: "처리 후 자동 폐기",
        },
        training: { mode: "AI 학습", flow: "-", storage: "일절 사용하지 않음" },
      },
      exceptionLabel: "예외 - 사용자 명시 요청 시 원본 오디오 보관:",
      exceptionBody:
        "일부 사용자가 회의록 검증·백업 목적으로 원본 보관을 원하는 경우, 사용자 본인 계정의 암호화된 스토리지에 한해 저장 옵션을 제공합니다. 별도 키로 암호화되며, 사용자 삭제 요청 시 즉시 파기됩니다. 기본값은 false이며, 기업 단위로 옵션 설정·통제 가능합니다.",
      deletionTitle: "삭제 시 처리 범위",
      deletionBody:
        "운영 DB / 자동 백업 / 벡터 인덱스 / 캐시 등 전 영역에서 삭제가 이루어집니다. 일부 항목은 법령상 보존 의무로 인해 분리 보관되며, 보존 기간 경과 시 자동 파기됩니다. 회원 탈퇴 시에는 AWS KMS 고객 키를 삭제 스케줄링하여 잔여 암호화 데이터를 영구적으로 접근 불가능하게 처리합니다.",
    },
    compliance: {
      sectionTitle: "컴플라이언스 인증 현황",
      description:
        "Tiro는 ISO 27001:2022 인증과 5개 Trust Services Criteria 전 범위의 SOC 2 Type 2 인증을 취득했으며, 전용 GRC 플랫폼으로 통제 체계를 운영합니다.",
      tableHeaders: {
        cert: "인증",
        stage: "단계",
        status: "상태",
        document: "문서 제공",
      },
      rows: {
        iso1: {
          cert: "ISO 27001:2022",
          stage: "Stage 1 (Readiness Review)",
          statusLabel: "완료",
          document: "NDA 체결 후 공유",
        },
        iso2: {
          cert: "ISO 27001:2022",
          stage: "Stage 2 (Certification Audit)",
          statusLabel: "인증 취득",
          document: "NDA 체결 후 공유",
        },
        soc2type2: {
          cert: "SOC 2 Type 2",
          stage:
            "5 TSC (Security, Availability, Confidentiality, Processing Integrity, Privacy) 전 범위 + 감사 기간 중 운영 효과성",
          statusLabel: "인증 취득",
          document: "NDA(Clickwrap) 체결 후 즉시 공유",
        },
      },
      noteLabel: "NDA 미체결 시점에도 인증과 동일한 통제",
      noteBody:
        "(동일 컨트롤 운영, 정책 문서화, Evidence 수집)가 작동하고 있으며, 본 Trust Document와 정책서로 입증해 드릴 수 있습니다.",
      contactPrompt:
        "인증 보고서, DPA, 정책서 요청은 <a>{{email}}</a>로 문의 부탁드립니다.",
    },
    faq: {
      sectionTitle: "자주 묻는 질문",
      items: {
        aiTraining: {
          question: "Tiro는 제 대화 데이터로 AI를 학습시키나요?",
          answer:
            "아니요. 고객의 대화 기록을 비롯한 어떠한 정보도 모델 학습·파인튜닝에 활용하지 않습니다. 무료/유료/기업 고객 무관 일관되게 적용되며, 모든 LLM·STT 벤더와 학습 미사용·비저장(Zero Data Retention) DPA가 체결되어 있습니다.",
        },
        dataLocation: {
          question: "제 데이터는 어디에 저장되나요?",
          answer:
            "AWS 서울 리전(ap-northeast-2)에 Multi-AZ로 저장됩니다. 데이터는 사용자별 키로 AES-256 암호화됩니다. Enterprise 계약 시 전용 VPC나 다른 리전 구성을 협의할 수 있습니다.",
        },
        access: {
          question: "누가 제 데이터에 접근할 수 있나요?",
          answer:
            "기본적으로 본인과 공유한 사람만 접근할 수 있습니다. 운영상 평문 콘텐츠 직접 접근은 명시적으로 승인된 소수 인원으로 엄격히 제한되며, 모든 접근 요청은 쿼리·컬럼 단위로 영구 기록됩니다. 임직원은 입사 시 필수 보안 교육을 이수하고 분기별 접근 권한 재검토를 거칩니다.",
        },
        voice: {
          question: "음성 녹음은 어떻게 처리되나요?",
          answer:
            "실시간 모드는 마이크/시스템 오디오가 STT 엔진을 스트리밍 통과한 직후 메모리에서 폐기됩니다. 평문 디스크 저장은 없습니다. 업로드된 오디오·영상 파일도 처리 완료 시점에 자동 폐기됩니다. 예외적으로 사용자가 명시 요청한 경우에만 본인 계정의 암호화 스토리지에 한해 보관 옵션이 활성화됩니다(기본값 off).",
        },
        control: {
          question:
            "음성 저장 여부, 보관 기간, 외부 공유 범위를 직접 설정할 수 있나요?",
          answer:
            "네. 음성 저장 여부, 회의록 보관 기간, 외부 공유 범위 등 데이터의 생애주기를 고객이 직접 설정할 수 있습니다. Enterprise 플랜에서는 조직 단위로 도메인별 보관 정책(예: 90일/180일/1년), 외부 공유 도메인 화이트리스트, 세션 만료 시간 등을 일괄 통제할 수 있습니다.",
        },
        delete: {
          question: "노트나 계정을 삭제하면 데이터는 어떻게 되나요?",
          answer:
            "노트 본문·전사·요약은 운영 데이터베이스·벡터 인덱스·캐시에서 즉시 완전 삭제됩니다. 자동 백업은 보존 기간이 지나면 폐기됩니다. 계정 종료 시 AWS KMS 고객 키가 폐기 예약되어 잔여 데이터는 암호학적으로 접근할 수 없게 됩니다. 엔터프라이즈 고객은 요청 시 삭제 증적을 받을 수 있습니다.",
        },
        certs: {
          question: "SOC 2 / ISO 27001 인증이 있나요?",
          answer:
            "네. SOC 2는 Type 2 인증을 취득했습니다(감사인 Sensiba LLP, 5 TSC 전 범위: Security, Availability, Confidentiality, Processing Integrity, Privacy, 적정의견). ISO 27001:2022는 Stage 1(Readiness Review)과 Stage 2(Certification Audit)를 모두 완료하고 인증을 취득했습니다. 전용 GRC 플랫폼으로 통제를 운영하며, 인증 보고서는 NDA 체결 후 제공합니다.",
        },
        dpa: {
          question: "DPA(데이터 처리 위탁 계약)를 받을 수 있나요?",
          answer: "네, 제공해 드립니다. <a>{{email}}</a>로 문의해 주세요.",
        },
        subprocessors: {
          question: "어떤 하위 처리자(sub-processor)를 사용하나요?",
          answer:
            "인프라는 AWS(서울 리전), LLM은 Azure OpenAI(Primary), Anthropic Claude(Fallback), Google Vertex AI/Gemini, AWS Bedrock을 사용합니다. STT는 Deepgram, AssemblyAI, ElevenLabs, 네이버클라우드 Clova, Google Speech-to-Text를 사용합니다. 결제는 Stripe·RevenueCat, 트랜잭션 이메일은 SendGrid를 사용합니다. 모든 LLM·STT 파트너와 학습 금지·비저장(Zero Data Retention) 조항이 포함된 DPA를 체결했습니다.",
        },
        sso: {
          question: "SSO / MFA를 지원하나요?",
          answer:
            "Enterprise 플랜에서 Okta, Azure AD, Google Workspace 등 주요 IdP 기반 SAML 2.0/OIDC SSO와 MFA를 지원하며, SCIM 프로비저닝으로 사용자 자동 동기화도 가능합니다.",
        },
        deployment: {
          question: "Private Cloud / On-Premise도 지원하나요?",
          answer:
            "네, 고객사의 보안 요구사항에 따라 SaaS, Private Cloud, On-Premise 모두 협의 가능합니다. 격리 수준과 운영 방식 등 세부 조건은 <a>{{email}}</a>로 문의해 주세요.",
        },
        report: {
          question: "보안 이슈는 어떻게 신고하나요?",
          answer:
            "보안 취약점 발견 시 <a>{{email}}</a>로 신고해 주세요. Enterprise 고객 대상으로는 최초 응답 4시간 이내, 보안 사고는 24시간 이내 고객 통지 SLA를 운영합니다.",
        },
      },
    },
    contact: {
      sectionTitle: "문의",
      intro:
        "보안 검토와 관련해 추가 자료가 필요하시거나 문의사항이 있으시면, 언제든 편히 연락 부탁드립니다.",
      label: "Security Contact",
      body: "보안 검토, DPA 요청, 인증 보고서 공유, 취약점 신고 등 보안 관련 문의는 아래로 연락해 주세요.",
      email: "partners@theplato.io",
    },
    footerLink: "Security",
    trustCenter: "Trust Center",
  },
  ve = JSON.parse(
    '{"title":"Trust Center | Tiro","description":"Tiro의 보안 인증, 통제, 컴플라이언스 문서를 한곳에서 확인하세요 — ISO/IEC 27001:2022 인증 취득, SOC 2 Type 1·Type 2 보고서 발급(5개 Trust Services Criteria 전 범위).","keywords":"Tiro Trust Center, security, SOC 2, ISO 27001, compliance, subprocessors, DPA","hero":{"eyebrow":"Trust Center","company":"Tiro","tagline":"보안은 기능이 아닙니다. Tiro가 일하는 방식입니다.","description":"Tiro는 시작부터 보안을 염두에 두고 만든 AI 미팅 어시스턴트입니다. 인증, 통제, 정책을 살펴보고 보안팀에 필요한 문서를 요청하세요.","requestAccess":"자료 요청","lastUpdated":"최종 업데이트 {{date}}","privacyPolicy":"개인정보처리방침"},"nav":{"aria":"Trust Center 섹션","overview":"개요","controls":"보안 통제","resources":"자료","subprocessors":"하위 처리자","faq":"자주 묻는 질문","updates":"업데이트"},"overview":{"title":"보안 검토를 시작하세요","intro":"Tiro의 Trust Center에 오신 것을 환영합니다. 이 포털에서 Tiro의 보안 현황을 살펴보고, 인증과 통제를 확인하며, 보안팀에 필요한 문서를 요청하실 수 있어요.","viewAll":"전체 보기","viewMore":"통제 {{count}}개 더 보기","cta":{"request":"문서 요청","requestDesc":"SOC 2, ISO, 정책 문서를 NDA 체결 후 받아보세요.","browse":"자료 둘러보기","browseDesc":"제공 가능한 보고서, 정책, 법무 문서를 확인하세요.","contact":"보안팀 문의"}},"compliance":{"sectionTitle":"컴플라이언스","description":"독립 감사를 거친 인증과 Tiro의 보안 프로그램이 정합한 프레임워크입니다.","status":{"certified":"인증 취득","attested":"보고서 발급","inProgress":"진행 중"},"certs":{"iso":{"name":"ISO/IEC 27001:2022","detail":"2026년 6월 4일 인증 · Sensiba LLP","blurb":"정보보안 경영 시스템(ISMS)에 대한 국제 표준으로, 독립된 인정 감사를 통해 확인되었습니다."},"soc2type1":{"name":"SOC 2 Type 1","detail":"5개 Trust Services Criteria","blurb":"특정 시점을 기준으로 5개 Trust Services Criteria 전반에 걸쳐 보안 통제가 적절하게 설계되어 있음을 입증합니다."},"soc2type2":{"name":"SOC 2 Type 2","detail":"2026년 7월 24일 발급 · Sensiba LLP","blurb":"동일한 5개 Trust Services Criteria를 대상으로, 해당 통제가 감사 기간 동안 실제로 어떻게 운영됐는지를 평가한 보고서입니다. 적정의견을 받았습니다."}},"frameworksTitle":"프레임워크 및 자체 선언","frameworksDescription":"Tiro의 정보보안 프로그램이 정합한 프레임워크입니다. 감사가 별도로 명시되지 않은 경우 자체 선언(self-attested) 기준입니다.","frameworks":{"nistCsf":"NIST CSF","nistAiRmf":"NIST AI RMF","cis":"CIS Controls 8.1","gdpr":"GDPR","ccpa":"CCPA / CPRA"}},"controls":{"sectionTitle":"보안 통제","description":"Tiro의 인프라와 조직 전반에서 운영 중인 보안 통제를 영역별로 정리했습니다.","summary":"통제 {{count}}개 · 최종 검토 {{date}}","controlCount":"통제 {{count}}개","statusActive":"운영 중","categories":{"data":{"title":"데이터 보안 및 암호화","items":{"audio":{"title":"전사 직후 음성 폐기","desc":"음성은 전사 직후 복구 불가능한 형태로 폐기되며, 평문 상태로 디스크에 저장되지 않습니다."},"encryption":{"title":"저장 및 전송 구간 암호화","desc":"저장 데이터는 AES-256으로, 전송 구간은 TLS 1.2 이상으로 암호화됩니다."},"keys":{"title":"사용자별 암호화 키","desc":"민감 콘텐츠는 사용자별 별도 키로 암호화되어, DB에 직접 접근할 수 있는 운영자조차 평문으로 볼 수 없습니다."},"kms":{"title":"관리형 키 보관 (KMS / HSM)","desc":"키는 FIPS 140-2 Level 3 검증 HSM을 사용하는 AWS KMS로 보호되며, 12개월 주기로 자동 로테이션됩니다."},"noTraining":{"title":"고객 데이터를 AI 학습에 사용 안 함","desc":"대화 기록을 포함한 어떠한 고객 데이터도 모델 학습이나 파인튜닝에 사용하지 않으며, 모든 요금제에 동일하게 적용됩니다."},"deletion":{"title":"복구 불가능한 삭제","desc":"삭제는 운영 DB, 백업, 벡터 인덱스, 캐시 전 영역에 적용되며, 회원 탈퇴 시 KMS 키를 삭제 스케줄링합니다."}}},"access":{"title":"접근 제어 및 인증","items":{"rbac":{"title":"최소 권한 접근 (RBAC / ABAC)","desc":"RBAC·ABAC로 시스템과 데이터에 대한 최소 권한 접근을 적용합니다."},"plaintext":{"title":"평문 접근 제한","desc":"평문 콘텐츠 직접 접근은 최소 권한 원칙에 따라 명시적으로 승인된 소수 인원으로 제한되며, 모든 접근은 쿼리·컬럼 단위로 기록됩니다."},"sso":{"title":"싱글 사인온 (SAML 2.0)","desc":"Okta, Azure AD, Google Workspace 등 IdP 연동 엔터프라이즈 SSO로 접근 권한을 사내 정책과 동기화합니다."},"mfa":{"title":"다중 인증(MFA)","desc":"OTP, 인증 앱, 하드웨어 키로 2차 인증을 추가하여 비밀번호가 유출되어도 무단 로그인을 차단합니다."},"ip":{"title":"접근 IP 제한","desc":"허용된 IP 대역으로 접근을 제한하여 사무실이나 VPN 트래픽만 허용할 수 있습니다."},"scim":{"title":"SCIM 프로비저닝","desc":"IdP의 사용자 입·퇴사가 SCIM을 통해 Tiro에 자동으로 동기화됩니다."},"session":{"title":"세션·디바이스 통제","desc":"기본 30분 유휴 타임아웃(엔터프라이즈별 조정 가능)과 함께 동시 접속·디바이스 등록을 정책 단위로 통제합니다."}}},"infra":{"title":"인프라 및 가용성","items":{"region":{"title":"국내 데이터 저장 (AWS 서울)","desc":"데이터는 AWS 서울 리전(ap-northeast-2)에 저장되며, 엔터프라이즈 고객은 전용 VPC나 다른 리전을 선택할 수 있습니다."},"multiAz":{"title":"Multi-AZ 이중화","desc":"Multi-AZ 배포로 단일 가용영역 장애가 발생해도 서비스 가용성을 유지합니다."},"backup":{"title":"암호화된 자동 백업","desc":"데이터베이스는 KMS 암호화 상태로 자동 백업되며, 연 1회 복구 테스트를 수행합니다."},"restore":{"title":"검증된 복구 목표","desc":"연 1회 복구 테스트로 백업 복구 절차를 검증합니다. 구체 복구 목표는 계약 단계에서 협의 가능합니다."},"sla":{"title":"99.9% 가용성 SLA","desc":"월간 99.9% 가용성 SLA를 제공하며, 미달 시 서비스 크레딧을 지급합니다."}}},"monitoring":{"title":"모니터링 및 위협 탐지","items":{"guardduty":{"title":"24×7 위협 탐지","desc":"AWS GuardDuty로 환경 내 위협을 24×7 상시 모니터링합니다."},"inspector":{"title":"취약점 스캔","desc":"AWS Inspector로 워크로드의 취약점을 상시 스캔합니다."},"waf":{"title":"웹 공격 방어","desc":"WAF와 Cloudflare를 함께 운영하여 일반적인 웹 공격을 방어합니다."},"cloudtrail":{"title":"변조 방지 로깅","desc":"감사·인프라 로그는 격리된 변조 방지 저장소로 전송되어 운영 시스템에서 수정할 수 없도록 보호됩니다."},"auditLog":{"title":"감사 로그","desc":"사용자·관리자 활동을 기록하며, 보관 기간을 설정하고 자사 SIEM으로 Export하거나 스트리밍할 수 있습니다."},"pentest":{"title":"모의 침투 테스트","desc":"모의 침투 테스트와 취약점 평가를 수행하여 위험을 선제적으로 식별하고 조치합니다."}}},"ai":{"title":"AI 보안 및 데이터 프라이버시","items":{"noTraining":{"title":"고객 데이터로 모델 학습 안 함","desc":"고객의 대화, 전사, 요약은 모델 학습이나 파인튜닝에 일절 사용하지 않습니다."},"zdr":{"title":"Zero Data Retention 벤더 계약","desc":"모든 LLM·STT 벤더와 학습을 금지하고 Zero Data Retention을 요구하는 DPA를 체결합니다."},"pii":{"title":"개인정보(PII) 자동 마스킹","desc":"회의록 내 개인식별정보를 자동으로 검출해 마스킹 처리할 수 있습니다."},"retention":{"title":"맞춤형 데이터 보존","desc":"도메인 단위로 보존 기간을 설정하고, 기간 경과 시 자동으로 삭제할 수 있습니다."},"vendorRouting":{"title":"벤더 라우팅 통제","desc":"테넌트에서 사용할 LLM·STT 벤더를 선택할 수 있으며, 한국 리전 한정 라우팅도 가능합니다."}}},"governance":{"title":"데이터 거버넌스 및 공유","items":{"sharing":{"title":"외부 공유 통제","desc":"노트 공유를 신뢰할 수 있는 도메인 화이트리스트로 제한할 수 있습니다."},"screenCapture":{"title":"모바일 화면 캡처 방지","desc":"모바일 앱 내 화면 캡처를 차단하며, 모든 시도를 로그로 기록합니다."},"retentionPolicy":{"title":"조직 보존 정책","desc":"엔터프라이즈 관리자는 조직 전체의 보존 기간을 중앙에서 일괄 적용할 수 있습니다."},"deletionOnClose":{"title":"탈퇴 시 완전 삭제","desc":"계정이 종료되면 관련 개인정보는 14일 이내에 삭제되고, 이를 보호하던 암호화 키는 폐기 예약되어 잔여 사본은 암호학적으로 접근할 수 없게 됩니다."},"erasureReceipt":{"title":"삭제 로깅","desc":"각 삭제 요청·실행·완료가 기록되며, 엔터프라이즈 고객은 요청 시 삭제 증적을 받을 수 있습니다."}}},"corporate":{"title":"전사 및 조직 보안","items":{"training":{"title":"보안 교육","desc":"임직원은 입사 시 보안 교육을 필수로 이수합니다."},"accessReviews":{"title":"분기별 접근 권한 검토","desc":"분기마다 접근 권한을 재검토하여 최소 권한 상태를 유지합니다."},"policyLibrary":{"title":"정보보안 정책","desc":"전체 정보보안 정책 체계를 전용 GRC 플랫폼에서 유지·운영합니다."},"vendorDpa":{"title":"벤더 실사","desc":"하위 처리자는 학습을 금지하고 Zero Data Retention을 요구하는 DPA로 구속됩니다."}}},"resilience":{"title":"사고 대응 및 연속성","items":{"incidentResponse":{"title":"사고 대응","desc":"엔터프라이즈 고객에게는 보안 사고에 대한 최초 응답 4시간 SLA를 적용합니다."},"notificationSla":{"title":"침해 통지 SLA","desc":"보안 사고 발생 시 영향을 받은 고객에게 24시간 통지 SLA로 안내합니다."},"continuity":{"title":"업무 연속성 및 재해 복구","desc":"백업, Multi-AZ 배포, 검증된 복구 목표를 토대로 업무 연속성과 재해 복구 체계를 운영합니다."},"changeManagement":{"title":"변경 관리","desc":"운영 환경 변경은 통제된 검토·배포 프로세스를 따릅니다."}}}}},"resources":{"sectionTitle":"자료","description":"보안팀에 제공 가능한 보고서와 정책입니다. 일부 문서는 NDA 체결이 필요하며, 자료 요청 후 받아보실 수 있어요.","available":"제공 가능","requestAccess":"자료 요청","groups":{"reports":{"title":"보고서 및 인증서"},"policies":{"title":"정책"},"legal":{"title":"법무 및 개인정보"}},"docs":{"iso":"ISO/IEC 27001:2022 인증서","soc2type1":"SOC 2 Type 1 보고서","soc2type2":"SOC 2 Type 2 보고서","infosec":"정보보안 정책","access":"접근 제어 정책","dataProtection":"데이터 보호 정책","bcdr":"업무 연속성 및 재해 복구 계획","incident":"사고 대응 계획","vendor":"벤더 관리 정책","dpa":"데이터 처리 위탁 계약(DPA)","subprocessors":"하위 처리자 목록","privacy":"개인정보처리방침","terms":"서비스 이용약관"}},"subprocessors":{"sectionTitle":"하위 처리자","description":"Tiro가 서비스 운영을 위해 활용하는 외부 서비스입니다. 모든 LLM·STT 파트너는 학습을 금지하고 Zero Data Retention을 요구하는 DPA로 구속됩니다.","asOf":"{{date}} 기준","note":"서비스 발전에 따라 이 목록을 업데이트합니다.","headers":{"name":"하위 처리자","purpose":"용도","location":"위치","dataProcessed":"처리하는 데이터"},"purposes":{"infra":"인프라","llm":"LLM 제공","stt":"음성 인식(STT)","payments":"결제","email":"이메일 발송","cdn":"CDN·TLS 종단","sso":"SSO·인증 연동","observability":"관측성(로그·APM)","errorMonitoring":"에러 모니터링"},"locations":{"us":"미국","kr":"한국","global":"글로벌"},"zdrNote":"모든 LLM·음성 인식 제공자는 Zero Data Retention 계약 하에 운영되며, 고객 데이터를 학습에 사용하는 것이 계약으로 금지되어 있습니다.","data":{"infra":"저장 데이터 암호화(전체 항목)","llm":"전사·프롬프트 텍스트 — ZDR, 학습 미사용","stt":"전사를 위한 회의 음성 — ZDR","payments":"결제·구독 정보. 카드 정보는 PCI-DSS Level 1 결제사가 처리하며 Tiro 서버에 저장되지 않습니다","email":"이메일 주소 및 메시지 내용","cdn":"전송 중 트래픽(TLS 종단, WAF·DDoS 엣지)","sso":"엔터프라이즈 SSO용 인증 식별자(이메일·디렉터리 ID)","observability":"운영 로그·트레이스(PII 자동 마스킹)","errorMonitoring":"에러 이벤트·스택 트레이스(PII 자동 마스킹)"}},"dataCollected":{"sectionTitle":"Tiro가 처리하는 데이터","description":"Tiro가 처리하는 데이터와 각 항목을 어떻게 보호하는지 정리했습니다.","items":{"audio":"회의 음성 — 전사 직후 즉시 폐기","notes":"전사·요약 — 저장 시 AES-256으로 암호화","account":"계정 및 조직 정보","usage":"사용 및 진단 로그"}},"updates":{"sectionTitle":"업데이트","description":"보안·컴플라이언스 주요 이정표를 최신순으로 정리했습니다. 이 기록은 Tiro 팀이 직접 관리합니다.","categories":{"compliance":"컴플라이언스","security":"보안","product":"제품"},"entries":{"iso":{"title":"ISO/IEC 27001:2022 인증 취득","body":"Tiro의 정보보안 경영 시스템이 Sensiba LLP로부터 ISO/IEC 27001:2022 인증을 받았습니다."},"pentest":{"title":"모의 침투 테스트 프로그램 시작","body":"보안 위험을 선제적으로 식별하고 조치하기 위해 모의 침투 테스트와 취약점 평가를 시작했습니다."},"soc2type2":{"title":"SOC 2 Type 2 보고서 완료","body":"Type 1과 동일한 5개 Trust Services Criteria를 대상으로 SOC 2 Type 2 보고서를 적정의견으로 받았습니다(감사인: Sensiba LLP). 보고서는 NDA 체결 후 제공합니다."},"soc2type1":{"title":"SOC 2 Type 1 보고서 완료","body":"5개 Trust Services Criteria 전반에 대한 SOC 2 Type 1 보고서를 완료했습니다(감사인: Sensiba LLP)."}},"subscribeNote":"향후 업데이트를 받아보시겠어요?","subscribeCta":"Trust Center에서 구독하기"},"dataFlow":{"sectionTitle":"데이터는 이렇게 흐릅니다","description":"회의가 수집되고 삭제되기까지 어떤 일이 일어나는지, 그리고 어떤 제공자가 무엇을 보는지 정리했습니다.","steps":{"capture":{"title":"수집","desc":"회의 음성은 수집되어 TLS 1.2 이상으로 전송되며, 평문 상태로 디스크에 저장되지 않습니다."},"transcribe":{"title":"전사","desc":"음성은 Zero Data Retention 계약을 맺은 음성 인식(STT) 제공자로 전달되어 텍스트로 변환된 뒤 곧바로 폐기됩니다."},"summarize":{"title":"요약","desc":"전사 텍스트는 LLM 제공자(Zero Data Retention, 학습 미사용)로 전달되어 요약과 답변을 생성합니다."},"store":{"title":"저장","desc":"노트·전사·요약은 AWS 서울 리전에서 AES-256으로 암호화되어 저장되며, 사용자별 암호화 키로 격리됩니다."},"delete":{"title":"삭제","desc":"삭제 시 콘텐츠는 데이터베이스·백업·벡터 인덱스·캐시 전 영역에서 제거되며, 회원 탈퇴 시 KMS 키를 삭제 스케줄링합니다."}}},"dataOwnership":{"sectionTitle":"데이터 소유권 및 프라이버시","description":"데이터의 주인은 고객입니다. Tiro가 소유권, 처리 조건, 데이터 저장 위치를 어떻게 다루는지 정리했습니다.","points":{"ownership":{"title":"데이터의 주인은 고객입니다","desc":"고객 콘텐츠는 고객의 것입니다. Tiro는 서비스 제공을 위해서만 데이터를 처리하며, 판매하거나 AI 모델 학습에 사용하지 않습니다."},"dpa":{"title":"DPA 및 SCC","desc":"데이터 처리 위탁 계약(DPA)을 제공하며, 국가 간 이전을 위한 EU 표준계약조항(SCC)을 포함합니다."},"residency":{"title":"데이터 저장 위치","desc":"데이터는 기본적으로 AWS 서울 리전(ap-northeast-2)에 저장됩니다. 엔터프라이즈 고객은 전용 리전이나 VPC를 요청할 수 있습니다."},"rights":{"title":"정보주체의 권리","desc":"GDPR과 CCPA에 따라 데이터 열람·정정·반출·삭제 요청을 지원합니다."}}},"incident":{"sectionTitle":"사고 대응 및 가용성","description":"보안 사고를 어떻게 탐지·대응·전파하는지, 그리고 실시간 서비스 상태는 어디서 확인하는지 안내합니다.","steps":{"detect":{"title":"탐지","desc":"24×7 모니터링(AWS GuardDuty, Inspector, WAF, CloudTrail)으로 이상 징후를 실시간으로 포착합니다."},"respond":{"title":"대응","desc":"보안 사고가 확인되면 엔터프라이즈 고객에게 최초 응답 4시간 SLA가 적용됩니다."},"notify":{"title":"통지","desc":"영향을 받은 고객에게는 24시간 침해 통지 SLA에 따라 범위·영향·조치 내용을 안내합니다."},"review":{"title":"사후 검토","desc":"모든 사고는 사후 검토와 재발 방지 조치로 마무리합니다."}},"statusLabel":"시스템 상태","slaLabel":"서비스 수준 협약(SLA)"},"vdp":{"sectionTitle":"취약점 신고","description":"보안 연구자의 신고를 환영하며, 책임 있게 처리합니다.","reportCta":"취약점 신고하기","report":"보안 취약점은 {{email}}로 신고해 주세요.","response":"신고는 영업일 기준 3일 이내에 접수 확인하며, 조치 완료까지 진행 상황을 계속 알려드립니다.","safeHarbor":"본 정책을 따르는 선의의 연구 활동은 허용되며, 정책을 준수한 연구자에게는 법적 조치를 취하지 않습니다.","securityTxtLabel":"security.txt 보기"},"faq":{"sectionTitle":"보안 질의서 및 자주 묻는 질문","description":"보안팀이 가장 자주 묻는 질문에 대한 답변을 평가 영역별로 정리했습니다.","requestFull":"전체 CAIQ, SIG 또는 보안 질의서가 필요하신가요? 요청하기","groups":{"ownership":{"title":"데이터 소유권"},"dataHandling":{"title":"데이터 처리 및 보존"},"access":{"title":"접근 및 인력"},"aiVendors":{"title":"AI 및 하위 처리자"},"resilience":{"title":"복원력 및 사고 대응"},"compliance":{"title":"컴플라이언스 및 법무"}},"items":{"dataOwnership":{"q":"데이터와 콘텐츠에 대한 권리는 누구에게 있나요?","a":"고객에게 있습니다. 고객 콘텐츠는 서비스 이용약관에 따라 고객의 것으로 유지되며, Tiro는 서비스 제공을 위해서만 처리하고 어떠한 소유권도 주장하지 않습니다."},"dataLeaveProduction":{"q":"고객 데이터가 운영 시스템 밖으로 나가는 경우는 언제인가요?","a":"암호화된 상태로만, 그리고 서비스 제공에 필요한 하위 처리자(음성 인식, LLM, 스토리지)에게만 전달되며, 각 파트너는 Zero Data Retention DPA로 구속됩니다. 데이터는 마케팅이나 모델 학습 목적으로 반출되지 않습니다."},"dataLocation":{"q":"데이터는 어디에 저장되고 서버는 어디에 있나요?","a":"AWS 서울 리전(ap-northeast-2)에 Multi-AZ로 저장되며, 사용자별 키를 사용해 AES-256으로 암호화됩니다."},"residencyOptions":{"q":"데이터 저장 위치 옵션을 제공하나요?","a":"기본값은 서울 리전입니다. 엔터프라이즈 고객은 전용 리전이나 VPC를 요청할 수 있으며, 벤더 라우팅도 한국 리전 한정 등으로 제한할 수 있습니다."},"retention":{"q":"데이터 보존 정책은 어떻게 되나요?","a":"보존은 고객이 직접 통제합니다. 음성은 전사 직후 폐기되며, 노트·전사·요약은 고객이 삭제하거나 설정한 보존 기간이 경과할 때까지 보관됩니다(예: 엔터프라이즈의 경우 90·180·365일)."},"deletionPropagation":{"q":"데이터를 삭제하면 어딘가에 여전히 남아 있나요?","a":"아니요. 삭제는 운영 데이터베이스·벡터 인덱스·캐시에 즉시 반영되고, 자동 백업은 보존 기간이 지나면 폐기되며, 계정 종료 시 데이터를 보호하던 KMS 키가 폐기 예약되어 잔여 사본은 암호학적으로 접근할 수 없게 됩니다."},"voice":{"q":"회의 음성은 어떻게 처리되나요?","a":"실시간 모드에서는 음성이 음성 인식 엔진을 스트리밍 통과한 직후 메모리에서 곧바로 폐기되며, 평문으로 저장되지 않습니다. 업로드된 파일도 처리 직후 폐기됩니다. 사용자가 명시적으로 선택한 경우에 한해 본인 계정의 암호화 스토리지에 음성을 보관하는 옵션을 제공합니다(기본값 off)."},"whoAccess":{"q":"Tiro에서 고객 데이터에 접근할 수 있는 사람은 누구인가요?","a":"기본적으로 본인과 공유한 사람만 접근할 수 있습니다. 운영상 평문 접근은 명시적으로 승인된 소수 인원으로 제한되며, 모든 접근은 쿼리·컬럼 단위로 기록됩니다."},"employeeVetting":{"q":"접근 권한이 있는 임직원에게는 어떤 통제가 적용되나요?","a":"입사 시 보안 교육을 필수로 이수하고, RBAC·ABAC로 최소 권한을 적용하며, 분기마다 접근 권한을 재검토합니다."},"aiTraining":{"q":"고객 데이터로 AI 모델을 학습시키나요?","a":"전혀 하지 않습니다. 대화·전사·요약을 비롯한 어떠한 고객 데이터도 모든 요금제에 걸쳐 모델 학습이나 파인튜닝에 사용하지 않습니다. 모든 LLM·음성 인식 벤더는 Zero Data Retention과 학습 미사용을 계약으로 보장합니다."},"vendorData":{"q":"어떤 AI 하위 처리자가 어떤 데이터를 받나요?","a":"음성 인식 벤더는 전사를 위해 회의 음성을 받고, LLM 벤더는 요약을 위해 전사·프롬프트 텍스트를 받습니다. 모두 Zero Data Retention 계약 하에 처리됩니다. 전체 목록과 각 벤더가 받는 데이터는 하위 처리자 페이지에서 확인하실 수 있어요."},"humanReview":{"q":"사람이 제 콘텐츠를 검토하나요?","a":"일상적인 사람 검토는 없습니다. 평문 접근은 지원·디버깅 목적에 한해 승인된 소수 인원으로 제한되며, 모든 접근이 기록됩니다."},"incidentResponse":{"q":"사고 대응 프로세스는 어떻게 되나요?","a":"24×7 모니터링으로 이상 징후를 탐지하며, 사고가 확인되면 엔터프라이즈 고객에게 최초 응답 4시간 SLA, 24시간 이내 고객 통지, 사후 검토가 이어집니다. 보안 이슈는 <a>{{email}}</a>로 신고해 주세요."},"breachNotification":{"q":"침해 발생 시 고객에게 어떻게, 언제 통지하나요?","a":"영향을 받은 엔터프라이즈 고객에게는 24시간 침해 통지 SLA에 따라 범위·영향·조치 단계를 포함해 안내합니다."},"bcdr":{"q":"업무 연속성과 재해 복구 대책은 무엇인가요?","a":"Multi-AZ 배포, KMS 암호화 자동 백업과 연 1회 복구 테스트, 월간 99.9% 가용성 SLA를 운영합니다. 구체 복구 목표는 계약 단계에서 협의 가능합니다."},"pentestCadence":{"q":"모의 침투 테스트는 얼마나 자주 수행하나요?","a":"모의 침투 테스트와 취약점 평가 프로그램을 운영하며, 결과 요약본은 발급 이후 NDA 체결 시 제공합니다. 연구자는 취약점 신고 정책을 통해 발견 사항을 제보할 수도 있습니다."},"certs":{"q":"어떤 인증과 감사를 보유하고 있나요?","a":"ISO/IEC 27001:2022(Sensiba LLP 인증), SOC 2 Type 1·Type 2(모두 Sensiba LLP 감사, 5개 Trust Services Criteria 전 범위, 적정의견)를 보유하고 있습니다. 또한 NIST CSF, NIST AI RMF, CIS Controls 8.1에 정합합니다. 보고서는 NDA 체결 후 제공합니다."},"dpa":{"q":"DPA와 SCC를 받을 수 있나요?","a":"네, 가능합니다. EU 표준계약조항(SCC)을 포함한 데이터 처리 위탁 계약(DPA)을 제공합니다. <a>{{email}}</a>로 요청해 주세요."}}},"meta":{"controls":{"title":"보안 통제 · Trust Center | Tiro","description":"Tiro가 회의 데이터를 어떻게 보호하는지 — 암호화, 접근 통제, 인프라 복원력, 모니터링, AI 공급업체 통제까지 보안 프로그램 전반을 확인하세요."},"resources":{"title":"보안 문서 및 리포트 · Trust Center | Tiro","description":"Tiro의 SOC 2·ISO 27001 리포트, 보안 정책, DPA, 하위 처리자 목록을 NDA 하에 보안팀이 받아볼 수 있도록 요청하세요."},"subprocessors":{"title":"하위 처리자 · Trust Center | Tiro","description":"Tiro가 서비스를 제공하기 위해 사용하는 하위 처리자와 각 업체가 처리하는 데이터·위치, 그리고 AI 공급업체와의 무데이터 보존(ZDR) 조건을 확인하세요."},"faq":{"title":"보안 FAQ · Trust Center | Tiro","description":"데이터 소유권, 저장 위치, 보존 기간, AI 학습, 접근 권한, 사고 대응, 컴플라이언스 등 보안팀이 자주 묻는 질문에 대한 답변을 확인하세요."},"updates":{"title":"보안 업데이트 · Trust Center | Tiro","description":"Tiro의 보안 태세, 인증, 컴플라이언스 마일스톤의 최신 변경 사항을 확인하세요."}},"vdi":{"sectionTitle":"VDI·폐쇄망 환경 호환","description":"Tiro는 별도 클라이언트 설치 없이 폐쇄망·VDI 환경에서 그대로 동작합니다. 금융·공공·엔터프라이즈 조직이 사내 가상 데스크톱(VDI)을 통해 사용하고 있습니다.","points":{"clientless":{"title":"클라이언트 설치 불필요","desc":"표준 HTTPS 웹 앱으로, VDI 안의 Chrome·Edge·Safari에서 네이티브 클라이언트나 에이전트 설치 없이 동작합니다."},"network":{"title":"게이트웨이·CASB 연동","desc":"모든 트래픽이 *.tiro.ooo 도메인으로 통합되어 VDI 게이트웨이·CASB(Prisma Access, Netskope, Zscaler 등)에서 도메인·IP 기반 정책을 적용할 수 있습니다. 엔터프라이즈는 고정 IP·도메인 화이트리스트도 제공됩니다."},"export":{"title":"내보내기 관리자 제어","desc":"노트 내보내기(PDF·Markdown·DOCX)는 관리자 수준에서 제어되고, 모든 다운로드·내보내기 이벤트가 감사 로그에 기록됩니다. 조직의 VDI 데이터 유출 통제가 Tiro까지 이어집니다."},"endpoint":{"title":"단말에 의존하지 않음","desc":"기밀성은 단말이 아니라 서버 측 사용자별 암호화에서 나옵니다. 데이터베이스 원본은 운영자에게도 평문으로 노출되지 않습니다."}}}}',
  ),
  fe = {
    title: "템플릿 관리",
    myTemplates: {
      title: "나만의 템플릿",
      personal: "개인",
      workspaceShared: "{{workspaceName}} 공유 템플릿",
      library: "티로 라이브러리",
    },
    tiroTemplates: {
      title: "티로의 템플릿",
      custom: "내가 만든",
      suggested: "추천",
    },
    section: {
      showMore: "+ {{count}}개 더 보기",
      collapse: "접기",
      empty: "비어있어요",
    },
    create: {
      button: "새 템플릿",
      dropdownLabel: "새 템플릿 옵션",
      blank: "빈 템플릿 만들기",
      importCsv: "CSV로 불러오기",
      downloadCsvTemplate: "CSV 양식 다운로드",
      csvImportSuccess: "CSV에서 템플릿을 만들었어요",
      csvImportEmpty: "CSV에 섹션이 없어요",
      csvImportInvalid: "CSV 형식이 올바르지 않아요",
    },
    scope: {
      personal: "개인",
      workspaceShared: "{{workspaceName}} 공유",
      shareToWorkspace: "{{workspaceName}}에 공유하기",
      movedToPersonal: "개인 템플릿으로 옮겼어요",
      sharedToWorkspace: "{{workspaceName}}에 공유했어요",
      managed: "티로 라이브러리",
    },
    detail: { untitled: "제목 없는 템플릿", createdAt: "{{date}} 생성" },
    empty: {
      title: "템플릿을 선택해주세요",
      description: "왼쪽 목록에서 템플릿을 선택하면 상세 내용을 볼 수 있어요",
    },
    actions: {
      duplicate: "템플릿 복제하기",
      copyToMine: "내 템플릿으로 복제",
      delete: "삭제",
      menu: "더보기",
    },
  },
  ke = {
    invitedBy: "{{name}}님의 초대",
    addWorkspace: "새 워크스페이스 추가",
    createTitle: "워크스페이스 만들기",
    createDescription:
      "팀 이름이나 프로젝트 이름으로 시작해보세요. 나중에 바꿀 수 있어요.",
    createNameLabel: "워크스페이스 이름",
    createNamePlaceholder: "예: The Plato",
    createHelp: "새 워크스페이스는 별도의 구독이 필요해요.",
    nameRequired: "워크스페이스 이름을 입력해 주세요.",
    nameMaxLength: "워크스페이스 이름은 {{max}}자 이하로 입력해 주세요.",
    createAction: "워크스페이스 만들기",
    createSuccess: "워크스페이스가 생성되었어요.",
    createError: "워크스페이스 생성에 실패했어요. 잠시 후 다시 시도해 주세요.",
    createRestrictedTooltip: "조직 관리자만 워크스페이스를 만들 수 있어요.",
    switchError: "워크스페이스를 바꾸지 못했어요. 잠시 후 다시 시도해 주세요.",
    switchDisabledRecording:
      "녹음 중이거나 녹음 업로드/동기화가 끝날 때까지 워크스페이스를 바꿀 수 없어요.",
    switchLoading: "워크스페이스를 준비하고 있어요...",
    pendingInvitations: "받은 초대",
    acceptInvitation: "수락",
    declineInvitation: "거절",
    emptyInvitations: {
      title: "받은 초대가 없어요",
      description: "새 워크스페이스에 초대되면 여기에 표시돼요.",
    },
    invitationSeatCapacityError: `좌석이 부족해 초대를 수락할 수 없어요.
워크스페이스 관리자에게 문의해 주세요.`,
    invitationSeatContractError: `구독 상태를 확인해야 참여할 수 있어요.
워크스페이스 관리자에게 문의해 주세요.`,
    invitationSeatPaymentError: `워크스페이스 결제가 완료되지 않았어요.
관리자에게 문의해 주세요.`,
    invitationSeatPendingError: `좌석 변경으로 초대를 수락할 수 없어요.
관리자에게 감소 예약 취소가 필요한지, 진행 중인 변경 결과는 확인됐는지 문의해 주세요.`,
    invitationAcceptError:
      "초대를 수락하지 못했어요. 잠시 후 다시 시도해 주세요.",
    invitationDeclineSuccess: "초대를 거절했어요.",
    invitationDeclineError:
      "초대를 거절하지 못했어요. 잠시 후 다시 시도해 주세요.",
    settings: "워크스페이스 설정",
    noWorkspace: {
      title: "아직 워크스페이스가 없어요",
      pendingInvitations: "받은 초대 {{count}}개 확인하기",
      calendar: {
        title: "캘린더 연동",
        description: "미팅 전에 알림을 받고 바로 기록을 시작하세요.",
        action: "연동하기",
      },
      desktop: {
        title: "데스크톱 앱 다운로드",
        description: "시스템 오디오까지 더 안정적으로 기록할 수 있어요.",
        action: "다운로드",
      },
    },
  },
  we = {
    previewInWiki: "위키에서 미리보기",
    syncing: "동기화 중",
    conflict: "확인 필요",
    error: "동기화 오류",
    wikiFilter: { knowledge: "지식" },
    activationScenario: {
      READY: "위키 사용 가능",
      UNINITIALIZED: "위키가 활성화되지 않음",
      IN_PROGRESS: "위키 설정 진행 중",
      ADMIN_BLOCKED: "관리자 승인 필요",
      PLAN_BLOCKED: "플랜 업그레이드 필요",
      FEATURE_FLAG_DISABLED: "기능 플래그 비활성",
    },
    lockedPreview: {
      ariaLabel: "위키 통합 미리보기",
      close: "미리보기 닫기",
      breadcrumb: "위키 미리보기",
      mockBadge: "Mock",
      readOnlyBadge: "읽기 전용",
      mappedFrom: "{{source}}에서 연결",
      source: {
        personTag: "인물 태그",
        regularWord: "단어장",
        phoneticWord: "발음 단어장",
      },
      activationBlockedTitle:
        "이 워크스페이스에서는 아직 위키를 사용할 수 없어요",
      activationBlockedDescription:
        "활성화 후 이 소스가 어디로 합쳐지는지 미리 보여주는 화면이에요. 위키를 사용할 수 있을 때까지 편집은 잠겨 있어요.",
      readOnlyTitle: "읽기 전용 워크스페이스",
      readOnlyDescription:
        "소스 목록에서 위키 페이지를 확인할 수 있지만, 위키 편집과 소스 수정은 비활성화돼요.",
      activateCta: "위키 활성화",
      descriptionTitle: "설명",
      aliasTitle: "별칭",
      lifecycleTitle: "소스 생명주기",
      description: {
        person:
          "인물 태그에서 만들어진 오래 유지되는 PERSON 엔티티 페이지예요. 이메일은 별칭으로 보존되어 이름을 바꾼 뒤에도 기존 멘션이 이어져요.",
        regularWord:
          "단어장에서 만들어진 개념 페이지예요. soft migration 중에도 기존 단어장은 계속 동작하고, 이 항목은 위키 지식 그래프에 합쳐져요.",
        phoneticWord:
          "발음 단어장은 기본적으로 발음/별칭 메타데이터로 붙어요. 팀이 명시적으로 연결하기로 선택하면 개념 페이지로 승격할 수 있어요.",
      },
      policy: {
        person:
          "이름 변경은 위키 canonical name으로 전파되고 이전 태그 값은 별칭으로 남아요. 소스 태그를 삭제해도 소스 연결만 제거돼요.",
        regularWord:
          "소스 단어 이름을 바꾸면 canonical concept이 갱신되고 이전 단어는 별칭으로 보존돼요. 단어장을 삭제해도 오래 유지되는 위키 내용은 삭제되지 않아요.",
        phoneticWord:
          "발음 항목은 기본적으로 별칭 또는 발음 메타데이터로 저장돼요. 소스를 삭제하면 소스 연결만 제거되고 승격된 위키 페이지는 유지돼요.",
      },
    },
  },
  Ce = JSON.parse(
    '{"toast":{"pageDeleted":"위키 페이지가 삭제되었어요.","pageDeleteError":"위키 페이지를 삭제하지 못했어요. 다시 시도해 주세요.","pageMerged":"위키 페이지가 병합되었어요.","pageMergeError":"위키 페이지를 병합하지 못했어요. 다시 시도해 주세요.","renamed":"이름이 변경되었어요.","renameError":"이름을 변경하지 못했어요. 다시 시도해 주세요.","aliasAdded":"다른 이름이 추가되었어요.","aliasAddError":"다른 이름을 추가하지 못했어요. 다시 시도해 주세요.","aliasDeleted":"다른 이름이 삭제되었어요.","aliasDeleteError":"다른 이름을 삭제하지 못했어요. 다시 시도해 주세요.","descriptionSaved":"설명이 저장되었어요.","descriptionSaveError":"설명을 저장하지 못했어요. 다시 시도해 주세요.","descriptionRegenerating":"AI가 설명을 다시 생성하고 있어요.","descriptionRegenerateError":"재생성 요청을 보내지 못했어요. 잠시 후 다시 시도해 주세요."},"actions":{"rename":"이름 바꾸기","blacklist":"자동 추출 차단","delete":"페이지 삭제","menuLabel":"페이지 작업","namePlaceholder":"이름을 입력해 주세요","save":"저장","cancel":"취소","errorRequired":"이름을 입력해 주세요.","errorConflict":"같은 이름의 페이지가 이미 있어요.","deleteTitle":"위키 페이지를 삭제할까요?","deleteDescription":"‘{{name}}’ 페이지와 연결된 별칭, 관계가 삭제돼요. 노트의 멘션은 사라지지 않아요.","deleteConfirm":"삭제","merge":"이 페이지 머지","mergeDialogTitle":"어느 페이지로 머지할까요?","mergeDialogDescription":"‘{{name}}’ 페이지가 선택한 페이지로 머지되고 별칭, 관계, 멘션이 모두 옮겨져요. 머지 후 이 페이지는 삭제돼요.","mergePickerPlaceholder":"병합할 페이지 검색"},"picker":{"placeholder":"위키 페이지 검색","empty":"결과가 없어요","loading":"검색 중..."},"similar":{"title":"이 페이지와 비슷한 위키","merge":"병합","meta":"멘션 {{mentions}} · 별칭 {{aliases}}","mergeTitle":"이 페이지를 병합할까요?","mergeDescription":"‘{{from}}’ 페이지가 ‘{{to}}’(으)로 병합돼요. 별칭, 관계, 멘션이 모두 옮겨지고, 이 페이지는 삭제돼요."},"alias":{"conflictMergeTitle":"‘{{alias}}’ 페이지가 이미 있어요","conflictMergeDescription":"‘{{alias}}’ 라는 이름의 위키 페이지가 이미 있어요. 두 페이지를 합치시겠어요? 현재 페이지가 기존 페이지로 합쳐지고 별칭, 관계, 멘션이 모두 옮겨져요.","conflictMergeConfirm":"합치기","conflictMergeCancel":"취소","navigateToTarget":"{{name}} 페이지 열기","add":"추가","addLabel":"별칭 추가","addPlaceholder":"별칭을 입력해 주세요","adding":"추가 중...","deleteAlias":"별칭 삭제","autoGeneratedTooltip":"자동으로 생성된 별칭이에요. 자동 생성 별칭은 수정할 수 없어요.","empty":"별칭이 아직 없어요","manageTitle":"다르게 불리는 이름 관리"},"mention":{"deletedNote":"삭제된 노트"},"lint":{"panelLabel":"위키 정리","title":"위키 정리","launcher":"위키 정리하기","close":"닫기","options":"정리 옵션","run":"정리 시작","totalCount":"후보 {{count}}개","queueTitle":"정리 예정 작업","accepted":"수락함","skipped":"넘어감","pending":"대기","submit":"정리하기","submitShortcut":"Enter","submitProcessing":"정리 중","submitComplete":"적용 완료","submitStatusHint":"정리가 끝나면 다음 후보를 이어서 확인할 수 있어요.","submittedDescription":"선택한 {{count}}개 작업이 적용되었어요.","submitPartial":"일부만 적용됐어요","submitPartialDescription":"{{applied}}개 적용, {{stale}}개 변경됨, {{failed}}개 실패","submitFailed":"정리를 적용하지 못했어요.","submitFailedDescription":"선택 내용은 유지했어요. 다시 시도해 주세요.","loadFailed":"후보를 불러오지 못했어요.","loadFailedDescription":"잠시 뒤 다시 시도해 주세요.","retry":"다시 시도","loadingTitle":"후보를 찾고 있어요","loadingDescription":"현재 위키 상태를 기준으로 정리할 항목을 불러오는 중이에요.","emptyTitle":"정리할 후보가 없어요","emptyDescription":"위키가 바뀐 뒤 다시 정리해보세요.","partialResultTitle":"일부 작업만 적용됐어요","partialResultDescription":"{{applied}}개 적용, {{skipped}}개 넘어감, {{stale}}개 변경됨, {{failed}}개 실패","cleanupOptions":"정리 옵션","rerun":"새로고침","rerunCandidates":"후보 다시 뽑기","batchSize":"정리 후보 수","batchRange":"5-10개","orphan":{"low":"약하게","medium":"보통","high":"강하게"},"draftActionsTitle":"정리 작업","revise":"다시 보기","reviseCandidate":"{{count}}번 선택 바꾸기","status":{"pending":"대기","accepted":"수락함","skipped":"넘어감"},"action":{"merge":"Merge","delete":"Delete"},"effect":"적용 결과","effectDelete":"‘{{name}}’ 페이지는 위키에서 삭제돼요. 원본 노트는 그대로 남아요.","effectMerge":"‘{{from}}’ 페이지가 ‘{{to}}’ 페이지로 합쳐져요. 별칭, 출처, 관계는 남는 페이지로 옮겨져요.","headlineDelete":"‘{{name}}’ 페이지는 위키에서 삭제돼요.","headlineMerge":"‘{{from}}’ → ‘{{to}}’ 페이지로 합쳐져요.","headlineFallback":"위키 정리 후보예요.","headlineDeleteSuffix":"페이지는 위키에서 삭제돼요.","headlineMergeSuffix":"페이지로 합쳐져요.","supportDelete":"원본 노트와 문단은 그대로 남아요.","supportMerge":"관련 링크, 별칭, 출처, 관계가 함께 옮겨져요.","humanReasonMerge":"두 페이지가 같은 내용을 가리키는 것 같아요.","humanReasonDeleteOrphan":"연결된 링크가 거의 없어요.","humanReasonDeleteLowSignal":"워크스페이스 지식으로 남기기엔 의미가 너무 넓어요.","candidatePages":"확인할 위키","source":"출처","relationship":"관계","orphanNode":"고립 노드","connectedNode":"멘션 {{mentions}}개, 관계 {{links}}개","duplicateReason":"중복 판단 근거","preview":"적용 미리보기","reason":"판단 근거","accept":"수락하기","skip":"넘어가기"},"home":{"title":"위키","workspace":"워크스페이스","workspaceEmpty":"워크스페이스가 준비되면 위키를 만들 수 있어요.","statusLoading":"위키 상태 확인 중...","statusError":"위키 상태를 불러올 수 없습니다.","unknownError":"알 수 없는 오류","heroHeading":"지식이 깊어지는 위키","heroDescription":"노트에서 자동으로 발견된 개념과 직접 추가한 항목이 서로 연결되며 자라요","heroStatsPages":"{{count}}개 페이지","heroStatsConnections":"{{count}}개 연결","graphLoading":"그래프 로딩 중...","graphError":"그래프를 불러올 수 없습니다."},"graph":{"summary":{"overview":"전체 지도 · 페이지 {{shown}}개 · 클러스터 {{clusters}}개 · 전체 {{total}}개 중 {{omitted}}개 숨김","context":"주변 탐색 · 페이지 {{shown}}개 · 전체 {{total}}개 중 {{omitted}}개 숨김","cluster":"클러스터 · 페이지 {{shown}}/{{total}}개 · {{omitted}}개 더 있음"},"search":{"clusterPages":"페이지 {{count}}개","reason":{"title":"이름 일치","alias":"별칭 일치","mention":"언급 일치","description":"설명 일치"}}},"list":{"loading":"위키 로딩 중...","error":"위키를 불러올 수 없습니다.","unknownError":"알 수 없는 오류","emptyTitle":"아직 키울 위키가 없어요","emptyDescription":"한 노트에서 여러 번 언급되거나, 직접 추가한 항목만 위키가 돼요. 노트가 쌓일수록 자동으로 자라나요.","searchEmptyTitle":"검색 결과가 없어요","searchEmptyDescription":"다른 검색어를 입력하거나, 전체 리스트를 다시 확인해 보세요.","mentionCount":"출처 {{count}}","loadMore":"더 불러오기","table":{"totalPages":"총 {{count}}개 페이지","lastUpdated":"마지막 업데이트 {{value}}","searching":"검색 중...","page":"페이지","type":"분류","updated":"업데이트"},"timeline":{"eyebrow":"최근 변화","title":"위키가 무엇을 배웠는가","subtitle":"최근 업데이트된 위키를 시간순으로 보고, 어떤 페이지를 다시 읽어야 할지 판단할 수 있어요.","today":"오늘","yesterday":"어제","thisWeek":"이번 주","earlier":"이전","unknown":"업데이트 시점 없음","summaryPages":"페이지","summaryUpdated":"업데이트됨","summarySources":"출처","summaryRelations":"관계","previewTitle":"위키 미리보기","previewEmpty":"왼쪽에서 페이지를 선택하면 최근 상태를 볼 수 있어요.","updatedUnknown":"업데이트 시점 없음","sourceMetric":"출처","relationMetric":"관계","aliasMetric":"별칭","aliasCount":"별칭 {{count}}","partial":"일부 추출","descriptionFailed":"설명 실패","whyUpdated":"왜 다시 볼 만한가","whyUpdatedDescription":"최근 업데이트 시점과 현재 출처·관계 수를 기준으로 표시합니다. 실제 변화량은 서버가 제공할 때까지 추정하지 않습니다.","openDetail":"상세 열기"}},"floating":{"filter":{"all":"전체","person":"사람","org":"조직","concept":"개념","decision":"결정"},"search":{"placeholder":"위키 페이지 검색","empty":"검색 결과가 없어요"},"folderFilter":{"label":"그래프 폴더","all":"모든 폴더"},"newPage":"새 페이지","scopeExpand":{"trigger":"위키 더 키우기","popoverTitle":"어느 기간까지 키울까요?","month3":"3개월","month6":"6개월","month12":"12개월","month24":"24개월","successToast":"위키를 {{months}}개월치로 확장하는 중이에요"},"viewToggle":{"graph":"그래프 보기","list":"목록 보기"},"zoom":{"in":"확대","out":"축소","fit":"화면에 맞추기","reset":"처음으로"},"onboarding":{"uninitTitle":"Wiki 시작하기","uninitDescription":"최근 6개월 노트로 위키를 만들어요","uninitButton":"시작하기","progressTitle":"위키를 만드는 중이에요","progressDescription":"{{count}}건의 노트를 정리하고 있어요"}},"panel":{"resizerAria":"패널 너비 조절","header":{"copy":"복사","more":"더 보기","fullscreen":"전체화면","fullscreenExit":"전체화면 종료","close":"패널 접기","back":"뒤로","exitFullscreen":"전체화면 종료","merge":"다른 페이지와 합치기","aliasManage":"다르게 불리는 이름 관리","delete":"이 페이지 삭제","deleteTitle":"이 페이지를 삭제할까요?","deleteDescription":"「{{name}}」 관련 출처 메타·별칭·관계가 모두 사라져요. 이 동작은 되돌릴 수 없어요.","deleteConfirm":"삭제","deleteCancel":"취소"},"breadcrumb":{"root":"위키"},"error":{"fetch":"위키 페이지를 불러오지 못했어요"},"dirtyIndicator":"저장하지 않은 변경이 있어요","ariaLabel":"위키 페이지 패널"},"topMeta":{"typeLabel":{"person":"사람","organization":"조직","concept":"개념","decision":"결정","place":"장소","product":"제품","event":"행사","entity":"항목"},"aliasChevron":"별칭","updatedAt":"{{date}} 업데이트"},"visibility":{"private":{"label":"나만 보기","description":"다른 워크스페이스 멤버에게 공개되지 않아요."},"workspace":{"label":"워크스페이스","description":"워크스페이스 멤버가 찾고 볼 수 있어요."},"sourceAcl":{"label":"출처 노트 권한","title":"출처 노트 권한을 따르는 페이지입니다.","autoTitle":"자동으로 만들어진 페이지입니다.","description":"이 페이지는 연결된 출처 노트를 볼 수 있는 사람에게만 보입니다. 접근 범위는 여기서 바꿀 수 없습니다."}},"description":{"title":"설명","placeholder":"이 페이지에 대한 설명을 추가해보세요","editTooltip":"수정","saveButton":"저장","cancelButton":"취소","addButton":"설명 추가","loading":"설명을 불러오는 중...","generating":"AI가 설명을 작성하고 있어요. 잠시만 기다려 주세요.","generationFailed":"설명 생성에 실패했어요.","regenerateButton":"AI로 다시 생성","regenerateShort":"재생성","retryButton":"다시 시도","editorPlaceholder":"이 페이지에 대한 설명을 작성해 주세요.","savingButton":"저장 중...","empty":"아직 설명이 작성되지 않았습니다.","saveFailure":"저장하지 못했어요. 다시 시도해주세요."},"sources":{"title":"출처 노트","titleWithCount":"출처 노트 {{count}}","connectNote":"노트 연결","connectNoteComingSoon":"노트 연결은 곧 지원될 예정입니다.","paragraphLabel":"문단 {{number}}","paragraphListLabel":"문단 {{numbers}}","mentionCountInNote":"{{count}}회 언급","showMore":"{{count}}건 더 보기","showLess":"접기","untitledFallback":"제목 없는 출처 노트","unavailableText":"출처 내용을 불러올 수 없어요.","empty":"이 페이지에 연결된 출처가 아직 없어요","transcriptTitle":"출처 대화록","transcriptLoading":"출처 노트를 불러오는 중...","openOriginalNote":"원본 노트로 이동","closeTranscript":"출처 대화록 닫기","paragraphNotFound":"해당 문단을 찾을 수 없습니다.","card":{"menu":"더 보기","removeLabel":"이 출처를 위키에서 빼기","removingLabel":"빼는 중..."},"removeSuccess":"「{{noteTitle}}」 출처 연결이 해제됐어요","removeError":"출처 연결을 해제하지 못했어요. 다시 시도해 주세요.","removedToast":"「{{noteTitle}}」 출처 연결이 해제됐어요","undo":"되돌리기"},"relations":{"deleteConfirm":"이 관계를 삭제할까요?","deleteAria":"관계 삭제","selectRelationAria":"{{name}} 관계 선택","openPageAria":"{{name}} 페이지 열기","title":"관련 위키 페이지","titleWithCount":"관련 위키 페이지 {{count}}","empty":"연결된 관련 위키 페이지가 없습니다.","editToggleStart":"편집","editToggleEnd":"완료","editTypeLabel":"관계 종류 수정","showMore":"{{count}}건 더 보기","createSuccess":"관계가 추가되었습니다.","createError":"관계를 추가하지 못했습니다. 다시 시도해 주세요.","deleteSuccess":"관계가 삭제되었습니다.","deleteError":"관계를 삭제하지 못했습니다. 다시 시도해 주세요.","updateSuccess":"관계가 수정되었습니다.","updateError":"관계를 수정하지 못했습니다. 다시 시도해 주세요.","addPill":"+ 페이지 연결","unresolvedPage":"연결된 페이지","sentenceDefault":"{{source}}은(는) {{target}}의 {{relation}}입니다.","removedToast":"「{{targetName}}」과의 연결이 해제됐어요","undo":"되돌리기"},"relationAdd":{"step1Title":"연결할 페이지 찾기","step1Placeholder":"페이지 이름 검색","step1Empty":"검색 결과가 없어요","step2BackButton":"← 다른 페이지","step2Preview":"{{source}}은(는) @{{target}}의 관계입니다.","step2Helper":"어떤 관계인가요?","step2Confirm":"이 관계로 추가","creating":"추가 중...","createFailure":"관계를 추가하지 못했어요. 다시 시도해주세요."},"copy":{"typeEntity":"엔티티","relatedPages":"관련 페이지","meta":"이름 · 설명 · 출처 노트 · 관련 페이지","text":{"label":"텍스트로 복사","desc":"텍스트만 복사합니다."},"textDescription":"텍스트만 복사합니다.","html":{"label":"HTML로 복사","desc":"노션이나 슬랙 같은 앱에 붙여넣을 수 있는 HTML 형식입니다."},"htmlDescription":"노션이나 슬랙 같은 앱에 붙여넣을 수 있는 HTML 형식입니다.","markdown":{"label":"LLM용으로 복사","desc":"ChatGPT 등 LLM에 최적화된 마크다운 형식입니다."},"markdownDescription":"ChatGPT 등 LLM에 최적화된 마크다운 형식입니다.","successToast":"복사했어요","trigger":"복사","headerMeta":"이름 · 설명 · 출처 노트 · 관련 페이지","success":"복사했어요","error":"복사하지 못했어요. 다시 시도해주세요."},"create":{"trigger":"새 페이지","dialogTitle":"새 위키 페이지","nameLabel":"이름","namePlaceholder":"예: OSS팀, 박상무, Q2 결정","nameErrorRequired":"이름을 입력해 주세요.","typeLabel":"종류","typePerson":"사람","typeOrg":"조직","typeConcept":"개념","typeDecision":"결정","typeErrorRequired":"종류를 선택해 주세요.","descriptionLabel":"설명 (선택)","descriptionPlaceholder":"이 페이지가 어떤 항목인지 한두 문장으로 설명해 주세요.","linkedPagesLabel":"연결할 페이지 (선택)","linkedPagesPlaceholder":"이미 있는 위키 페이지 검색","submitButton":"페이지 만들기","cancelButton":"취소","successToastTitle":"「{{name}}」 페이지가 만들어졌어요","successToastDescription":"접근 범위는 페이지에서 확인할 수 있어요.","linkFailureToast":"「{{target}}」과의 연결에 실패했어요. 패널에서 다시 시도해주세요.","createFailure":"페이지를 만들지 못했어요. 다시 시도해주세요.","title":"새 위키 페이지","cancel":"취소","creating":"만드는 중...","submit":"페이지 만들기","linkFail":"「{{target}}」과의 연결에 실패했어요. 패널에서 다시 시도해주세요.","removeLinkedPage":"선택 해제","error":{"nameRequired":"이름을 입력해 주세요.","nameMaxLength":"이름은 256자 이하로 입력해 주세요.","kindRequired":"종류를 선택해 주세요."},"kind":{"person":"사람","organization":"조직","concept":"개념","decision":"결정"},"field":{"name":"이름","namePlaceholder":"예: OSS팀, 박상무, Q2 결정","kind":"종류","visibility":"접근 범위","description":"설명","descriptionPlaceholder":"이 페이지가 어떤 항목인지 한두 문장으로 설명해 주세요.","linkedPages":"연결할 페이지","linkedPagesPlaceholder":"이미 있는 위키 페이지 검색","optional":"선택"},"visibility":{"private":{"label":"나만 보기","description":"다른 워크스페이스 멤버에게 공개되지 않아요."},"workspace":{"label":"워크스페이스","description":"워크스페이스 멤버가 찾고 볼 수 있어요."},"helper":"기본은 나만 보기예요. 필요할 때 워크스페이스에 공유할 수 있어요.","change":"접근 범위 변경: {{visibility}}"},"success":{"title":"「{{name}}」 페이지가 만들어졌어요","desc":"접근 범위는 페이지에서 확인할 수 있어요."}},"overflow":{"merge":"다른 페이지와 합치기","aliasManage":"다르게 불리는 이름 관리","delete":"이 페이지 삭제"},"delete":{"dialogTitle":"이 페이지를 삭제할까요?","dialogDescription":"「{{name}}」 관련 출처 메타·별칭·관계가 모두 사라져요. 이 동작은 되돌릴 수 없어요.","confirmButton":"삭제","cancelButton":"취소"},"merge":{"dialogTitle":"다른 페이지와 합치기","step1Description":"같은 사람이 두 페이지로 나뉘어 있나요? 합칠 페이지를 찾아 골라주세요.","step1Placeholder":"페이지 이름 검색","step1ResultMeta":"{{type}} · 출처 노트 {{count}}","step1Empty":"검색 결과가 없어요.","step2NameRadioLabel":"기본으로 둘 이름","step2NameRadioMeta":"출처 노트 {{count}}","step2DescRadioLabel":"설명은 어떻게 할까요?","step2DescBase":"{{name}} 설명만 유지","step2DescTarget":"{{name}} 설명만 유지","step2DescBoth":"둘 다 두기 (나중에 편집)","step2ImpactLabel":"합치고 나면","step2ImpactSources":"출처 노트 {{from}} + {{to}} → {{total}}건","step2ImpactAliases":"별칭 {{from}} + {{to}} → {{total}}개 (자동 통합)","step2ImpactRelations":"관계 {{from}} + {{to}} → {{total}}개 (자동 통합)","backButton":"← 뒤로","cancelButton":"취소","confirmButton":"합치기","failureToast":"합치기에 실패했어요. 다시 시도해주세요."},"aliasManage":{"dialogTitle":"다르게 불리는 이름 관리","empty":"별칭이 아직 없어요","addPlaceholder":"별칭 추가...","addButton":"추가","primary":"대표","createFailure":"별칭을 추가하지 못했어요.","removeFailure":"별칭을 삭제하지 못했어요."},"transcript":{"loading":"노트를 불러오는 중이에요...","error":"노트를 불러오지 못했어요","back":"← 페이지로 돌아가기"},"breadcrumb":{"ariaLabel":"위키 페이지 경로","root":"위키"},"newPage":{"button":"새 페이지"},"onboarding":{"emptyLogoAlt":"Tiro 로고","emptyTitle":"아직 만들어진 위키가 없어요","emptyDescription":"노트가 만들어지면 Tiro가 자동으로 위키를 만들어요. 먼저 노트를 만들어 주세요.","previewLabels":{"cloudMigration":"클라우드 전환","ossTeam":"OSS팀","developmentTeam":"개발팀","projectX":"프로젝트 X","acme":"ACME","meeting":"회의","plato":"플라톤","lgUplus":"LG U+"},"previewAlt":"티로 위키 그래프 미리보기","title":"티로 위키를 활성화해보세요","description":"노트에서 중요한 개념과 관계를 자동으로 연결해 위키를 만들어요.","docsButton":"위키 문서 보기","activateButton":"위키 활성화하기","activatingButton":"활성화 중...","readyToBuildTitle":"위키가 활성화됐어요","readyToBuildDescription":"최근 {{months}}개월의 완료된 노트를 분석해 위키를 만들 수 있어요.","backfillButton":"최근 {{months}}개월 노트로 위키 만들기","backfillingButton":"위키 생성 중...","noEligibleTitle":"아직 만들 위키가 없어요","noEligibleDescription":"최근 {{months}}개월 안에 10분 이상 기록된 완료 노트가 없어요.\\n긴 노트를 만든 뒤 다시 시도해 주세요.","upgradeTitle":"위키는 Pro 이상 플랜에서 사용할 수 있어요","upgradeDescription":"현재 플랜에서는 위키를 활성화할 수 없어요.\\n플랜을 업그레이드하고 티로 위키를 사용해보세요","upgradeButton":"플랜 업그레이드","adminTitle":"워크스페이스 관리자만 위키를 활성화할 수 있어요","adminDescription":"이 워크스페이스에서는 위키를 사용할 수 있지만, 활성화는 관리자만 할 수 있어요.\\n워크스페이스 관리자에게 위키 활성화를 요청해보세요","subscriptionInactiveTitle":"위키를 활성화하려면 구독 상태 확인이 필요해요","subscriptionInactiveDescription":"팀 또는 엔터프라이즈 플랜을 사용 중인데 이 메시지가 보인다면, 워크스페이스의 구독 상태를 확인해 주세요.","unavailableTitle":"아직 이 워크스페이스에서 위키를 사용할 수 없어요","unavailableDescription":"기능 공개 상태를 확인하는 중입니다. 위키 문서에서 사용 조건을 먼저 확인할 수 있어요.","uninitTitle":"Wiki 시작하기","uninitDesc":"최근 6개월 노트로 위키를 만들어요","startButton":"위키 활성화하기","startingButton":"활성화 중...","inProgressTitle":"위키를 만드는 중이에요","inProgressBody":"{{count}}건의 노트를 정리하고 있어요","inProgressNotice":"새 노트 {{count}}개를 분석 중이에요","inProgressNoticePendingNames":"분석 중인 노트: {{names}}","inProgressNoticeOverflow":"외 {{count}}개","inProgressNoticeDismissHint":"닫아도 분석은 계속돼요","inProgressNoticeCloseAria":"분석 진행 알림 닫기"},"activation":{"error":"위키를 활성화할 수 없습니다."},"backfill":{"error":"위키 생성을 시작할 수 없습니다.","noEligibleTitle":"아직 위키를 만들 노트가 없어요","noEligibleDescription":"10분 이상 기록된 완료 노트를 만든 뒤 다시 시도해 주세요."},"scopeExpand":{"chip":"위키 더 키우기","popoverTitle":"어느 기간까지 키울까요?","option":"{{months}}개월","toastInProgress":"위키를 {{months}}개월치로 확장하는 중이에요"},"search":{"placeholder":"위키 페이지 검색","noResults":"검색 결과가 없어요","loading":"검색 중...","close":"검색 닫기"},"filter":{"all":"전체","person":"사람","org":"조직","concept":"개념","decision":"결정"},"zoom":{"in":"확대","out":"축소","fit":"화면에 맞추기","reset":"레이아웃 재정렬"},"viewToggle":{"graph":"그래프 보기","list":"목록 보기","graphShort":"그래프","listShort":"리스트"},"sidebar":{"label":"위키","badgeNew":"NEW","badgeBeta":"Beta"}}',
  ),
  Pe = {
    sessionExpired: {
      toast: {
        title: "다시 로그인해주세요",
        description:
          "보안을 위해 로그인이 종료됐어요. 다시 로그인하면 이어서 사용할 수 있어요.",
      },
      expired: {
        title: "로그인이 만료됐어요",
        description:
          "로그인 유효 시간이 지나 로그아웃됐어요. 다시 로그인하면 이어서 사용할 수 있어요.",
      },
      revoked: {
        title: "보안을 위해 로그아웃됐어요",
        description:
          "비밀번호 변경이나 원격 로그아웃으로 로그인이 종료됐어요. 다시 로그인하면 이어서 사용할 수 있어요.",
      },
      recordingStopped: {
        title: "녹음이 중단됐어요",
        description:
          "로그인이 종료되어 녹음을 멈췄어요. 저장된 내용은 노트에서 확인할 수 있어요.",
      },
    },
  },
  De = {
    pageTitle: "보이스패드",
    statusIdle: "대기",
    statusSpeaking: "재생 중",
    esTitle: "시작하기 전에",
    esStep1:
      "티로 노트에서 마이크 아이콘을 눌러 <strong>시스템 사운드 볼륨이 100%</strong>로 설정되어 있는지 확인하세요.",
    esStep2:
      "문장을 입력하고 Enter를 누르면 스피커로 재생되며, 동시에 티로 노트에 기록됩니다.",
    esStep3: "데스크탑 스피커를 음소거해도 티로 노트에는 그대로 기록됩니다.",
    esStep4: "출력되는 음성 언어는 설정(톱니바퀴 아이콘)에서 변경할 수 있어요.",
    esOpenApp: "티로 노트 열기",
    inputPlaceholder: "말할 내용을 입력하세요",
    stop: "정지",
    metaQueued: "대기 중",
    metaSpeaking: "재생 중",
    metaDone: "재생 완료",
    metaCanceled: "취소됨",
    metaError: "재생 실패",
    msgReplayTitle: "클릭하면 다시 말합니다",
    settingsVoice: "음성",
    settingsSpeed: "속도",
    settingsName: "이름",
    namePlaceholder: "예: 샛별",
    settingsPrefix: "문장 앞에 이름을 붙여 재생",
    addChip: "+ 새 문장 추가",
    addChipTitle: "자주 쓰는 문장을 새로 추가합니다",
    editTitle: "편집",
    deleteTitle: "삭제",
    bannerNoSynth:
      "이 브라우저는 음성 합성을 지원하지 않습니다. Chrome 또는 Edge에서 열어 주세요.",
    bannerNoVoice:
      "선택한 언어의 음성을 찾지 못했습니다. 최신 Chrome 또는 Edge에서 열어 주세요.",
    bannerEdge:
      "Edge 브라우저에서 열면 더 자연스러운 음성을 사용할 수 있습니다.",
  },
  Ee = {
    metaTitle: "파트너 링크 성과 | 티로 Tiro",
    metaDescription:
      "티로 제휴 파트너가 자신의 레퍼럴 링크 성과를 확인하는 페이지입니다.",
    eyebrow: "파트너 링크",
    title: "레퍼럴 링크 성과",
    ranges: { 7: "최근 7일", 14: "최근 14일", 30: "최근 30일", all: "전체" },
    linkFilterLabel: "링크 선택",
    allLinks: "전체 링크",
    allLinksWithCount: "전체 링크 ({{count}})",
    metrics: {
      signup: "가입",
      signupNote: "링크로 가입한 사용자",
      activated: "활성화",
      activatedRate: "가입 대비 {{rate}}",
      paid: "유료 전환",
      paidRate: "가입 대비 {{rate}}",
    },
    cards: {
      activationRate: "활성화율",
      activationNote: "가입 {{signups}}명 → 활성화 {{activated}}명",
      paidRate: "결제 전환율",
      paidNote: "활성화 {{activated}}명 → 결제 {{paid}}명",
      signupPaidRate: "가입 대비 {{rate}}",
    },
    conversions: { title: "전환율" },
    benefits: {
      paymentRewardFirstMonthPartial:
        "{{planName}} 플랜 첫 달 {{percent}}% 할인",
      paymentRewardFirstMonthFree: "{{planName}} 플랜 첫 달 무료",
      paymentRewardFirstMonthFreeWithSecondMonthDiscount:
        "{{planName}} 플랜 첫 달 무료 + 둘째 달 {{percent}}% 할인",
      freeTrialMinutes: "무료체험 {{minutes}}분",
      none: "혜택 없음",
      loading: "불러오는 중",
    },
    dailyTitle: "일별 추이",
    dailySubtitle: "가입, 활성화, 유료 전환을 같은 기간 기준으로 봅니다.",
    emptyDaily: "아직 표시할 활동이 없습니다.",
    copy: "복사",
    copied: "복사됨",
    showMore: "더 보기",
    tableTitle: "링크별 현황",
    table: {
      date: "날짜",
      link: "링크",
      benefit: "혜택",
      signup: "가입",
      activated: "활성화",
      paid: "결제",
      activatedRate: "활성화율",
      total: "합계",
      actions: "작업",
    },
    loading: "파트너 링크 현황을 불러오는 중입니다.",
    errorTitle: "파트너 링크 현황을 불러오지 못했습니다.",
    errorDescription: "잠시 후 다시 시도해 주세요.",
    retry: "다시 시도",
    notPartner: {
      title: "티로 제휴 파트너가 아닙니다.",
      description: '파트너 활동을 원하신다면 "{{email}}"로 문의해 주세요.',
      button: "이메일 보내기",
      copiedButton: "이메일 주소 복사됨",
      mailSubject: "티로 제휴 파트너 문의",
    },
  },
  Ie = {
    pricing: {
      title: "요금제 | 티로 Tiro",
      description:
        "실시간 회의록 티로의 Lite, Pro, Max, 팀 플랜을 비교해 보세요. 모든 플랜은 300분 크레딧이 포함된 무료 체험으로 시작합니다.",
      heading: "요금제",
    },
    downloadApp: {
      title: "티로 다운로드 | Mac, Windows, iOS, Android",
      description:
        "데스크톱과 모바일에서 티로를 내려받으세요. 회의를 녹음하고 실시간 전사와 요약을 받아, 어느 기기에서든 같은 노트를 이어서 볼 수 있습니다.",
    },
    privacyPolicy: {
      title: "개인정보처리방침 | 티로 Tiro",
      description:
        "티로가 개인정보를 수집하고 이용하고 보관하고 파기하는 방식을 안내합니다. 음성 데이터 처리, 보유 기간, 정보주체가 행사할 수 있는 권리를 담고 있습니다.",
    },
    termsOfService: {
      title: "서비스 이용약관 | 티로 Tiro",
      description:
        "티로 이용에 적용되는 약관입니다. 계정, 구독과 결제, 금지 행위, 지식재산권, 이용 종료에 관한 내용을 담고 있습니다.",
    },
    termsOfServiceIos: {
      title: "iOS 서비스 이용약관 | 티로 Tiro",
      description:
        "티로 iOS 앱에 적용되는 약관입니다. App Store 결제, 구독 자동 갱신, 플랫폼별 조건을 담고 있습니다.",
    },
    serviceLevelAgreement: {
      title: "서비스 수준 계약(SLA) | 티로 Tiro",
      description:
        "유료 플랜에 적용되는 티로의 가동 약속입니다. 서비스 수준, 서비스 크레딧, 제외 사항, 크레딧 청구 절차, 책임 제한을 담고 있습니다.",
    },
    referralRewardsTerms: {
      title: "티로 선물하기 리워드 이용 조건",
      description:
        "티로 선물하기 리워드 운영 규칙입니다. 참여 자격, 리워드 적립과 사용, 소멸 시점, 부정 적립분의 회수 방식을 담고 있습니다.",
    },
  },
  Le = {
    title: "접근성 지원 프로그램 | 티로",
    description:
      "농인·난청인 개인과 기관을 위한 티로 접근성 지원 프로그램. 모든 요금제 평생 반값, 기관이 후원 계약을 맺으면 소속된 분들은 요금을 내지 않습니다.",
    keywords:
      "티로 접근성 지원, 청각장애인 자막 앱, 농인 실시간 문자통역, 난청인 지원 프로그램, 장애학생지원센터 자막, 수어통역센터",
    footerLink: "접근성 지원",
    hero: {
      title: "누구도 소외되지 않는 대화, 티로가 함께 만듭니다",
      subtitle:
        "티로는 회의와 수업에서 오가는 말을 실시간으로, 정확하게 글자로 옮깁니다. 농인·난청인 개인과, 그분들과 함께 일하고 배우는 기관이 각자에게 맞는 방식으로 티로를 쓸 수 있도록 지원합니다.",
      ctaPersonal: "개인 신청",
      ctaOrg: "기관 도입 문의",
      subtitle1:
        "티로는 회의와 수업에서 오가는 말을 실시간으로, 정확하게 글자로 옮깁니다.",
      subtitle2: "농인·난청인 개인과, 그분들과 함께 일하고 배우는 기관이",
      subtitle3: "각자에게 맞는 방식으로 티로를 쓸 수 있도록 지원합니다.",
    },
    usage: {
      sectionTitle: "4만 5천 번의 대화, 농인·난청인 곁에 티로가 있었습니다",
      body: "접근성 지원을 받는 분들은 한 사람당 138번의 대화, 57시간을 티로로 남겼습니다. 모두 합치면 611일, 1년 8개월이 넘는 기록입니다. 그리고 10명 중 9명 가까이가 최근 한 달 안에도 티로를 켰습니다.",
      stats: {
        conversations: { value: "138번", label: "한 분이 기록한 대화" },
        hours: { value: "57시간", label: "한 분이 남긴 기록 시간" },
        days: { value: "611일", label: "모두 합친 기록" },
        active: { value: "10명 중 9명", label: "최근 한 달 내 사용" },
      },
      note: "2026년 8월 기준. 접근성 지원 프로그램 이용자의 절반은 이보다 많이 기록했습니다.",
      eyebrow: "지금까지",
    },
    voices: {
      sectionTitle: "쓰고 계신 분들의 이야기",
      reviews: [
        {
          body: "청각장애가 있어서 여러 가지 속기 어플과 청각보조자막 시스템을 써봤는데요. 티로가 가장 정확도가 높아요. 거기에다가 실시간 자막 기능까지…",
          source: "App Store 리뷰 · 2025년 6월",
        },
        {
          body: "청각장애가 있어서 회의 때 정확하게 말 알아듣기 힘들어서 속기앱 이것저것 사용해봤는데, 실시간으로 받아쓰는 건 이 앱이 제일 좋은 것 같아요.",
          source: "App Store 리뷰 · 2025년 9월",
        },
        {
          body: "아버지가 청각 장애가 있으셔서 소통이 어려웠습니다. 항상 다른 사람들이 무슨 말을 하는지 궁금하신 아버지께 이 어플을 추천해드리니 매우 좋아하셨어요.",
          source: "App Store 리뷰 · 2026년 7월",
        },
        {
          body: "멀리 있어도 음성 인식이 잘돼서 깜짝 놀랐어요. 청각장애를 가진 분들한테 실시간 대화나 회의 듣는 데 어려움이 있다면 너무 유용해요.",
          source: "App Store 리뷰 · 2025년 6월",
        },
        {
          body: "청각장애가 있어 업무할 때 정말 많이 도움받고 있습니다. 실시간 번역 기능도 실시간으로 보면서 진행하고 있어요.",
          source: "Google Play 리뷰 · 2026년",
        },
      ],
      video: {
        title: "한 기업이 찾아간 농인의 자취방",
        body: "소리가 없는 집에서 하루가 어떻게 흘러가는지, 그 안에서 티로가 어떻게 쓰이는지 담겼습니다.",
        caption: "유튜브 · 1분",
        iframeTitle: "농인의 자취방엔 어떤 아이템이 있을까?",
      },
      request: {
        lead: "그리고 한 가지 요청이 있었습니다.",
        source: "App Store 리뷰 · 2025년 8월",
        answer: "그래서, 접근성 지원 프로그램을 시작했습니다.",
        bodyKey:
          "장애인 사용자들을 위한 가격 조정이나 지원 프로그램이 마련된다면 정말 도움이 될 것 같습니다.",
        bodyLead1:
          "덕분에 비장애인과 의사소통을 불편함 없이, 대화와 업무에서 꼭 필요한 어플이라 매우 유용하게 쓰고 있습니다.",
        bodyLead2:
          "다만 비즈니스 요금제의 가격이 부담스러워 사용을 이어가기 어려운 점이 아쉽습니다.",
      },
      eyebrow: "사용자 이야기",
    },
    support: {
      sectionTitle: "그래서, 접근성 지원 프로그램을 시작했습니다",
      personalTitle: "농인·난청인 개인",
      plans: [
        {
          name: "Lite",
          desc: "가벼운 노트와 요약",
          was: "8,900원",
          now: "4,450원",
          unit: "/ 월",
          bullet: "월 300분",
        },
        {
          name: "Pro",
          desc: "일상 사용자를 위한 표준",
          was: "19,900원",
          now: "9,950원",
          unit: "/ 월",
          bullet: "월 1,000분 · 화자 분리",
        },
        {
          name: "Max",
          desc: "파워 유저용 무제한",
          was: "42,000원",
          now: "21,000원",
          unit: "/ 월",
          bullet: "무제한 사용량",
        },
      ],
      forever: "한 번 승인되면, 쓰시는 동안 평생 반값입니다.",
      annual: "연간 결제 시 2개월 무료",
      orgTitle: "함께하는 기관",
      orgBody:
        "대학 장애학생지원센터, 수어통역센터, 협회, 공공기관이 구성원의 이용을 지원하는 계약을 맺으면, 소속된 분들은 요금을 내지 않습니다.",
      securityNote: "보안 정책과 인증 현황은",
      securityLink: "보안 페이지",
      securityNoteSuffix: "에서 확인하실 수 있습니다.",
      eyebrow: "지원 내용",
    },
    contexts: {
      sectionTitle: "기관은 이렇게 쓰고 있습니다",
      items: [
        {
          tab: "국제개발 NGO",
          badge: "국제개발 NGO",
          headline:
            "청각장애 단원 7명이 6개월 해외 파견을 티로와 함께 마쳤습니다",
          tags: ["해외 파견", "팀 회의", "문자통역"],
          steps: [
            "파견 전에는 여러 명이 모이는 자리를 피할 만큼 소통이 부담이었습니다.",
            "매주 현지 회의마다 티로를 켜자 팀원들과의 소통이 쉬워졌습니다.",
            "문자통역 정확도가 높아, 활동 후반에는 인공와우를 뺀 채로도 회의에 참여했습니다.",
          ],
        },
        {
          tab: "대학 · 정식 도입",
          badge: "대학 장애학생지원센터",
          headline:
            "한 학기 시범 운영 후, 사용한 학생 전원이 계속 쓰겠다고 답했습니다",
          tags: ["청각장애 학생 4명", "2학기 정식 도입", "센터 일괄 결제"],
          steps: [
            "교수님께 질문하는 순간, 조별과제, 필드트립처럼 지원이 닿기 어려운 시간을 티로가 메웠습니다.",
            "한 학기 동안 무료로 써본 학생 전원이 다음 학기에도 티로를 쓰고 싶다고 답했습니다.",
            "2학기부터 센터가 직접 결제해 정식 도입했고, 필기 지원을 받던 지체장애 학생들도 체험을 시작합니다.",
          ],
        },
        {
          tab: "대학 · 시범 운영",
          badge: "대학 장애학생지원센터",
          headline:
            "자막 프로그램을 찾던 센터가 먼저 연락해 시범 운영을 시작했습니다",
          tags: ["학생 2명 + 센터", "한 학기 무료", "10월 중간 피드백"],
          steps: [
            "수업에서 쓸 자막 프로그램을 찾다가 센터가 먼저 문의를 주셨습니다.",
            "전공 용어 단어장, 비대면 수업용 데스크탑 앱까지 사용 안내를 센터와 함께 정리했습니다.",
            "10월 말에 학생들에게 불편한 점을 직접 묻고, 12월에 이용 현황을 정리해 센터에 전달합니다.",
          ],
        },
      ],
      eyebrow: "도입 사례",
    },
    apply: {
      sectionTitle: "어떻게 신청하나요",
      personalTitle: "농인·난청인 개인",
      personalCta: "신청서 작성하기",
      personalNote:
        "등록증은 확인 즉시 파기합니다 · 앱스토어·플레이스토어 결제는 웹 결제 전환이 필요합니다",
      orgTitle: "기관 담당자",
      orgCta: "기관 도입 문의하기",
      eyebrow: "신청 방법",
      orgNote: "계좌이체 · 전자세금계산서 가능",
      personalBody1:
        "청각장애인 등록증 사본과 티로 계정 이메일만 있으면 됩니다.",
      personalBody2:
        "1분이면 끝나고, 확인 후 영업일 3일 이내에 메일로 안내드립니다.",
      orgBody1: "지원할 인원과 기간을 알려주시면",
      orgBody2: "견적서와 계약 절차를 안내해 드립니다.",
    },
  },
  Me = {
    paymentScope:
      "지금 결제할 총금액에는 미결제 요금과 크레딧이 포함될 수 있어요. 총금액을 확인한 뒤 결제해 주세요. 결제가 완료되면 초대 또는 역할 변경을 직접 다시 시도해 주세요.",
    retryAdmission:
      "좌석 결제가 완료됐어요. 초대 또는 역할 변경을 직접 다시 시도해 주세요.",
    loading: "좌석 정보를 확인하고 있어요.",
    retry: "다시 확인",
    recordingBlocked: {
      title: "구매한 좌석보다 멤버가 많아 녹음할 수 없어요",
      admin: "좌석을 추가로 구매하거나 멤버 수를 줄이면 다시 녹음할 수 있어요.",
      member:
        "워크스페이스 관리자에게 좌석 추가 구매 또는 멤버 수 조정을 요청해 주세요.",
    },
    roleChange:
      "구매한 좌석 하나를 사용해요. 자리가 부족하면 좌석을 먼저 추가해 주세요.",
    manage: "좌석 관리",
    description:
      "추가 좌석은 결제 후 바로 이용할 수 있어요. 좌석 감소는 다음 갱신일에 적용돼요.",
    quantity: "변경 후 총 좌석 수",
    currentPurchased: "현재 구매한 좌석: {{count}}석",
    totalDue: "오늘 결제할 총금액",
    afterPayment: "결제가 완료되면 총 {{count}}석을 이용할 수 있어요.",
    previewLoading: "결제 금액을 확인하고 있어요…",
    reservedHint: "대기 중인 초대도 좌석을 사용해요.",
    invitationSeats:
      "이번 초대에 필요한 좌석: {{required}}석 · 사용 가능한 좌석: {{available}}석",
    sendingInvites: "초대를 보내고 있어요…",
    integer: "좌석 수는 정수로 입력해 주세요.",
    minimum: `사용 중인 멤버와 대기 초대를 포함해 최소 {{minimum}}석이 필요해요.
먼저 멤버나 초대를 정리해 주세요.`,
    maximum: "{{maximum}}석을 넘는 구매는 고객센터에 문의해 주세요.",
    floor: "현재 최소 {{minimum}}석이 필요해요.",
    members: "멤버 관리로 돌아가기",
    decrease: `{{date}}부터 변경돼요.
그전까지 구매한 {{purchased}}석을 모두 사용할 수 있어요. 좌석 감소에 따른 환불이나 크레딧은 없어요.`,
    pending: "결과 확인 중",
    pay: "결제하고 좌석 추가",
    preview: "결제 금액 확인",
    schedule: "감소 예약",
    purchasedSeats: "구매 좌석",
    usedSeats: "사용 중",
    reservedSeats: "초대 대기",
    availableSeats: "사용 가능",
    next: "{{date}} 갱신 예정: {{count}}석",
    cancelSchedule: "감소 예약 취소",
    unknown:
      "변경 결과를 확인하고 있어요. 기존 구매 좌석은 유지돼요. 다시 결제하지 말고 결과를 확인해 주세요.",
    readback: "변경 결과 확인",
    paymentFailed:
      "결제하지 못해 기존 좌석을 유지했어요. 다른 카드로 변경하거나 고객센터에 문의해 주세요.",
    failed: "변경하지 못했어요. 최신 좌석 상태를 확인해 주세요.",
    loadFailed: "좌석 정보를 불러오지 못했어요. 잠시 후 다시 확인해 주세요.",
    buy: "좌석 추가",
    admissionPending:
      "감소 예약이 있으면 취소한 뒤 다시 시도해 주세요. 진행 중인 좌석 변경이 있다면 결과를 먼저 확인해 주세요.",
    inviteScheduledReduction:
      "다음 갱신의 예약 좌석보다 인원이 많아져 초대할 수 없어요. 감소 예약을 취소한 뒤 다시 초대해 주세요.",
    inviteBlocked:
      "사용할 자리가 부족해요. 좌석을 추가한 후 초대 또는 역할 변경을 다시 시도해 주세요.",
    guideInvite:
      "유료 역할로 초대하면 구매한 좌석 하나를 사용해요. 남은 좌석이 없으면 좌석을 먼저 추가해 주세요.",
    guideRemoval: `구성원을 내보내도 구매한 좌석 수는 그대로예요.
빈 좌석은 다른 구성원에게 쓰거나 좌석 관리에서 줄일 수 있어요.`,
  },
  Re = {
    customDate: "직접 지정",
    backDates: "‹ 기간 선택",
    selectedCount: "{{count}}개 선택",
    allFilter: "전체 {{filter}}",
    clear: "해제",
    noCreators: "일치하는 생성자가 없어요.",
    folderScope:
      "이 폴더의 노트에서 검색합니다. 다른 폴더까지 찾으려면 모든 노트에서 검색하세요.",
    currentFolder: "현재 폴더에서 검색",
    count: "{{count}}개",
    newest: "최신순 · 오래된순으로 변경",
    oldest: "오래된순 · 최신순으로 변경",
    emptyHint: "검색어를 바꾸거나 필터를 해제해보세요.",
    clearFilter: "{{filter}} 필터 해제",
    maxSelections: "한 종류의 필터는 최대 100개까지 선택할 수 있어요.",
    title: "노트 검색",
    query: "검색어를 입력하세요",
    clearQuery: "검색어 지우기",
    close: "검색 종료",
    creators: "생성자",
    findCreator: "생성자 검색",
    me: "{{name}} (나)",
    folders: "폴더",
    dates: "날짜",
    allDates: "전체 기간",
    today: "오늘",
    yesterday: "어제",
    days: "지난 {{count}}일",
    months: "지난 3개월",
    year: "올해",
    from: "시작일",
    to: "종료일",
    apply: "기간 적용",
    reset: "필터 초기화",
    loading: "검색 중…",
    error: "검색하지 못했어요.",
    retry: "다시 시도",
    empty: "조건에 맞는 노트가 없어요.",
    results: "검색 결과",
    more: "더 보기",
    done: "완료",
  },
  Ne = {
    sidebar: {
      focus: "안내로 이동",
      done: "확인",
      query: "팀 회의",
      project: "프로젝트",
      myProject: "내 프로젝트",
      private: "나만 보기",
      step1: {
        title: "노트 검색이 더 정확해졌어요",
        description: `노트와 폴더를 빠르게 찾을 수 있어요.
날짜로 노트 검색 범위를 좁힐 수 있어요.`,
      },
      step2: {
        title: "자주 쓰는 폴더를 즐겨찾기로",
        description: `폴더 메뉴에서 즐겨찾기에 추가할 수 있어요.
펼치지 않아도 바로 열려요.`,
      },
      step3: {
        title: "폴더 구분이 더 명확해졌어요",
        description: `나만 보는 폴더에는 자물쇠가 붙어요.
워크스페이스 폴더는 구성원과 공유돼요.`,
      },
    },
  },
  Oe = {
    asanNanum: o,
    d4d: n,
    igybFestival: r,
    aifesta: a,
    impact: s,
    referralGift: l,
    billing: c,
    payment: d,
    checkoutLink: p,
    inviteNudge: u,
    title: m,
    description: g,
    keywords: b,
    applicationName: h,
    beta: T,
    date: y,
    onboarding: S,
    onboarding2: A,
    landing: v,
    global: t,
    loginComplete: f,
    mcpAuthCallback: k,
    mcpConsent: w,
    connectComplete: C,
    coupon: P,
    referral: D,
    download: E,
    pricing: I,
    subscription: L,
    settings: M,
    layout: R,
    note: N,
    search: O,
    common: F,
    dateRange: x,
    calendar: B,
    deeplink: U,
    time: W,
    toast: _,
    inAppBrowser: q,
    appRedirect: G,
    record: H,
    duration: V,
    error: K,
    help: z,
    invite: Q,
    contact: j,
    footer: $,
    press: Z,
    fileUpload: Y,
    recordingSupport: J,
    permission: X,
    titlebar: ee,
    appMenu: te,
    update: ie,
    notification: oe,
    onboardingPopup: ne,
    askTiro: re,
    freeTrialBanner: ae,
    sidebarBanner: se,
    notifications: le,
    meetingEnd: ce,
    shortcut: de,
    context: pe,
    editor: ue,
    automation: me,
    offline: ge,
    developers: be,
    organization: he,
    oauthLoading: Te,
    shared: ye,
    noteList: Se,
    security: Ae,
    trustCenter: ve,
    templateManager: fe,
    workspace: ke,
    wikiConvergence: we,
    wiki: Ce,
    auth: Pe,
    voicepad: De,
    partnerLinks: Ee,
    pageMeta: Ie,
    accessibility: Le,
    teamSeats: Me,
    inlineSearch: Re,
    featureGuidance: Ne,
  };
exports.accessibility = Le;
exports.aifesta = a;
exports.appMenu = te;
exports.appRedirect = G;
exports.applicationName = h;
exports.asanNanum = o;
exports.askTiro = re;
exports.auth = Pe;
exports.automation = me;
exports.beta = T;
exports.billing = c;
exports.calendar = B;
exports.checkoutLink = p;
exports.common = F;
exports.connectComplete = C;
exports.contact = j;
exports.context = pe;
exports.coupon = P;
exports.d4d = n;
exports.date = y;
exports.dateRange = x;
exports.deeplink = U;
exports.default = Oe;
exports.description = g;
exports.developers = be;
exports.download = E;
exports.duration = V;
exports.editor = ue;
exports.error = K;
exports.featureGuidance = Ne;
exports.fileUpload = Y;
exports.footer = $;
exports.freeTrialBanner = ae;
exports.global = t;
exports.help = z;
exports.igybFestival = r;
exports.impact = s;
exports.inAppBrowser = q;
exports.inlineSearch = Re;
exports.invite = Q;
exports.inviteNudge = u;
exports.keywords = b;
exports.landing = v;
exports.layout = R;
exports.loginComplete = f;
exports.mcpAuthCallback = k;
exports.mcpConsent = w;
exports.meetingEnd = ce;
exports.note = N;
exports.noteList = Se;
exports.notification = oe;
exports.notifications = le;
exports.oauthLoading = Te;
exports.offline = ge;
exports.onboarding = S;
exports.onboarding2 = A;
exports.onboardingPopup = ne;
exports.organization = he;
exports.pageMeta = Ie;
exports.partnerLinks = Ee;
exports.payment = d;
exports.permission = X;
exports.press = Z;
exports.pricing = I;
exports.record = H;
exports.recordingSupport = J;
exports.referral = D;
exports.referralGift = l;
exports.search = O;
exports.security = Ae;
exports.settings = M;
exports.shared = ye;
exports.shortcut = de;
exports.sidebarBanner = se;
exports.subscription = L;
exports.teamSeats = Me;
exports.templateManager = fe;
exports.time = W;
exports.title = m;
exports.titlebar = ee;
exports.toast = _;
exports.trustCenter = ve;
exports.update = ie;
exports.voicepad = De;
exports.wiki = Ce;
exports.wikiConvergence = we;
exports.workspace = ke;
//# sourceMappingURL=common-ESyrnCuW.js.map
