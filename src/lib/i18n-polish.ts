import type { Language } from "./i18n";

export type PolishDict = {
  // counter interaction
  tapOrSwipe: string;
  countProgress: (a: number, b: number) => string;
  tasbihComplete: string;
  tasbihCompleteNote: string;
  continueCounting: string;
  resetAndContinue: string;
  autoReset: string;

  // reset confirmation
  confirmReset: string;
  confirmResetBody: (n: number) => string;
  cancel: string;
  confirm: string;

  // stats
  stats: string;
  today: string;
  thisWeek: string;
  streakLabel: string;
  totalCounts: string;
  noStatsYet: string;
  loading: string;
};

export const POLISH: Record<Language, PolishDict> = {
  en: {
    tapOrSwipe: "Tap or swipe the bead to count",
    countProgress: (a, b) => `${a} / ${b}`,
    tasbihComplete: "Tasbih complete",
    tasbihCompleteNote: "May it be accepted.",
    continueCounting: "Keep counting",
    resetAndContinue: "Reset and continue",
    autoReset: "Auto-reset at target",
    confirmReset: "Reset the counter?",
    confirmResetBody: (n) => `${n} counts in this session will be cleared.`,
    cancel: "Cancel",
    confirm: "Reset",
    stats: "Your practice",
    today: "Today",
    thisWeek: "This week",
    streakLabel: "Streak",
    totalCounts: "counts",
    noStatsYet: "Your totals will appear here once you complete a session.",
    loading: "Loading your practice…",
  },
  ar: {
    tapOrSwipe: "اضغط أو مرّر لتعدّ",
    countProgress: (a, b) => `${a} / ${b}`,
    tasbihComplete: "اكتمل التسبيح",
    tasbihCompleteNote: "تقبل الله.",
    continueCounting: "تابع العد",
    resetAndContinue: "أعد التصفير وتابع",
    autoReset: "تصفير تلقائي عند الهدف",
    confirmReset: "إعادة تعيين العدّاد؟",
    confirmResetBody: (n) => `سيتم مسح ${n} من هذه الجلسة.`,
    cancel: "إلغاء",
    confirm: "إعادة التعيين",
    stats: "ممارستك",
    today: "اليوم",
    thisWeek: "هذا الأسبوع",
    streakLabel: "التتابع",
    totalCounts: "مرة",
    noStatsYet: "ستظهر إحصاءاتك هنا بعد إكمال أول جلسة.",
    loading: "جارٍ التحميل…",
  },
  ur: {
    tapOrSwipe: "شمار کے لیے ٹیپ یا سوائپ کریں",
    countProgress: (a, b) => `${a} / ${b}`,
    tasbihComplete: "تسبیح مکمل",
    tasbihCompleteNote: "اللہ قبول فرمائے۔",
    continueCounting: "شمار جاری رکھیں",
    resetAndContinue: "ری سیٹ کر کے جاری رکھیں",
    autoReset: "ہدف پر خودکار ری سیٹ",
    confirmReset: "کاؤنٹر ری سیٹ کریں؟",
    confirmResetBody: (n) => `اس سیشن کے ${n} شمار مٹ جائیں گے۔`,
    cancel: "منسوخ",
    confirm: "ری سیٹ",
    stats: "آپ کی عبادت",
    today: "آج",
    thisWeek: "اس ہفتے",
    streakLabel: "تسلسل",
    totalCounts: "بار",
    noStatsYet: "پہلا سیشن مکمل کرنے پر یہاں اعداد و شمار نظر آئیں گے۔",
    loading: "لوڈ ہو رہا ہے…",
  },
};
