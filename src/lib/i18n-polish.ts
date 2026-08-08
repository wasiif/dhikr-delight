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

  // settings extras
  theme: string;
  lightMode: string;
  nightMode: string;
  arabicFontSize: string;
  fontSmall: string;
  fontMedium: string;
  fontLarge: string;
  fontPreviewLabel: string;
  dangerZone: string;
  resetAllData: string;
  resetAllBody: string;
  aboutTitle: string;
  aboutBody: string;
  credits: string;
  textSize: string;
  aboutFeedback: string;
  developer: string;
  viewGithub: string;
  splashTagline: string;
  mainNavLabel: string;
  sectionNavLabel: string;
  countStatus: (a: number, b: number) => string;
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
    theme: "Theme",
    lightMode: "Light",
    nightMode: "Night",
    arabicFontSize: "Arabic text size",
    fontSmall: "Small",
    fontMedium: "Medium",
    fontLarge: "Large",
    fontPreviewLabel: "Preview",
    dangerZone: "Data",
    resetAllData: "Reset all data",
    resetAllBody:
      "This clears your history, custom adhkar, preferences and current count. It cannot be undone.",
    aboutTitle: "About",
    aboutBody:
      "Dhikr is the remembrance of Allah — a quiet, steady practice of the heart. This app is only a simple aid for counting; the intention and sincerity are yours. Arabic texts follow standard, widely accepted wordings.",
    credits: "Built with care. Fonts: Amiri, Noto Naskh Arabic, Noto Nastaliq Urdu.",
    textSize: "Text size",
    aboutFeedback:
      "Found a mistake in a text or reference, or have a suggestion? Please reach out — corrections are welcome and appreciated.",
    developer: "Developer",
    viewGithub: "github.com/wasiif",
    splashTagline: "A calm digital tasbih",
    mainNavLabel: "Main navigation",
    sectionNavLabel: "Sections",
    countStatus: (a, b) => `${a} of ${b} counted`,
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
    theme: "المظهر",
    lightMode: "فاتح",
    nightMode: "ليلي",
    arabicFontSize: "حجم النص العربي",
    fontSmall: "صغير",
    fontMedium: "متوسط",
    fontLarge: "كبير",
    fontPreviewLabel: "معاينة",
    dangerZone: "البيانات",
    resetAllData: "حذف جميع البيانات",
    resetAllBody: "سيتم مسح السجل والأذكار المخصصة والتفضيلات والعدّ الحالي. لا يمكن التراجع.",
    aboutTitle: "عن التطبيق",
    aboutBody:
      "الذكر هو تذكّر الله، عمل قلبي هادئ ومستمر. هذا التطبيق مجرد وسيلة بسيطة للعدّ، والنية والإخلاص لك. النصوص العربية وفق الصيغ المعتمدة المشهورة.",
    credits: "صُنع بعناية. الخطوط: أميري، نوتو نسخ، نوتو نستعليق.",
    textSize: "حجم النص",
    aboutFeedback: "هل وجدت خطأً في نص أو مرجع، أو لديك اقتراح؟ تواصل معنا — التصحيحات مرحّب بها.",
    developer: "المطوّر",
    viewGithub: "github.com/wasiif",
    splashTagline: "مسبحة رقمية هادئة",
    mainNavLabel: "التنقل الرئيسي",
    sectionNavLabel: "الأقسام",
    countStatus: (a, b) => `${a} من ${b}`,
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
    theme: "تھیم",
    lightMode: "روشن",
    nightMode: "رات",
    arabicFontSize: "عربی متن کا سائز",
    fontSmall: "چھوٹا",
    fontMedium: "درمیانہ",
    fontLarge: "بڑا",
    fontPreviewLabel: "نمونہ",
    dangerZone: "ڈیٹا",
    resetAllData: "تمام ڈیٹا حذف کریں",
    resetAllBody: "اس سے تاریخ، اپنے اذکار، ترجیحات اور موجودہ شمار مٹ جائیں گے۔ واپسی ممکن نہیں۔",
    aboutTitle: "تعارف",
    aboutBody:
      "ذکر اللہ کی یاد ہے — دل کا پرسکون اور مستقل عمل۔ یہ ایپ صرف شمار کے لیے ایک سادہ مددگار ہے؛ نیت اور اخلاص آپ کا ہے۔ عربی متون معروف اور مستند الفاظ کے مطابق ہیں۔",
    credits: "محبت سے بنایا گیا۔ فونٹس: امیری، نوٹو نسخ، نوٹو نستعلیق۔",
    textSize: "متن کا سائز",
    aboutFeedback:
      "اگر کسی متن یا حوالے میں غلطی نظر آئے یا کوئی تجویز ہو تو رابطہ کریں — اصلاح خوش آئند ہے۔",
    developer: "ڈیولپر",
    viewGithub: "github.com/wasiif",
    splashTagline: "ایک پرسکون ڈیجیٹل تسبیح",
    mainNavLabel: "مرکزی نیویگیشن",
    sectionNavLabel: "حصے",
    countStatus: (a, b) => `${b} میں سے ${a}`,
  },
};
