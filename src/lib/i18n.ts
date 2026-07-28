export type Language = "en" | "ar" | "ur";

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "ur", label: "Urdu", native: "اردو" },
];

export const RTL_LANGUAGES: Language[] = ["ar", "ur"];

export const isRtl = (lang: Language) => RTL_LANGUAGES.includes(lang);

type Dict = {
  appName: string;
  language: string;
  chooseLanguage: string;
  nav: { counter: string; history: string; settings: string };
  streak: (n: number) => string;

  // counter
  currentDhikr: string;
  percentComplete: (n: number) => string;
  targetReached: string;
  resetCounter: string;
  completeSession: string;
  sessionNote: string;
  sessionNotePlaceholder: string;
  countAria: (name: string) => string;
  ofTarget: string;

  // history
  record: string;
  sessionHistory: string;
  clear: string;
  emptyHistory: string;
  of: string;
  minutes: string;

  // settings
  settings: string;
  personalize: string;
  targetRepetitions: string;
  dhikrLibrary: string;
  addCustomDhikr: string;
  arabicOptional: string;
  transliteration: string;
  add: string;
  remove: (name: string) => string;
  preferences: string;
  soundFeedback: string;
  vibration: string;
  nightTheme: string;
  customDhikr: string;
  times: string;
};

const en: Dict = {
  appName: "Dhikr Counter",
  language: "Language",
  chooseLanguage: "Choose language",
  nav: { counter: "Counter", history: "History", settings: "Settings" },
  streak: (n) => `${n} day${n === 1 ? "" : "s"}`,

  currentDhikr: "Current dhikr",
  percentComplete: (n) => `${n}% complete`,
  targetReached: "target reached, alhamdulillah",
  resetCounter: "Reset counter",
  completeSession: "Complete session",
  sessionNote: "Session note",
  sessionNotePlaceholder: "Record your intention or gratitude for this session",
  countAria: (name) => `Count ${name}`,
  ofTarget: "of",

  record: "Record",
  sessionHistory: "Session history",
  clear: "Clear",
  emptyHistory:
    "No sessions saved yet. Complete a session on the counter and it will appear here.",
  of: "of",
  minutes: "min",

  settings: "Settings",
  personalize: "Personalize your practice",
  targetRepetitions: "Target repetitions",
  dhikrLibrary: "Dhikr library",
  addCustomDhikr: "Add custom dhikr",
  arabicOptional: "Arabic (optional)",
  transliteration: "Transliteration",
  add: "Add",
  remove: (name) => `Remove ${name}`,
  preferences: "Preferences",
  soundFeedback: "Sound feedback",
  vibration: "Vibration",
  nightTheme: "Night theme",
  customDhikr: "Custom dhikr",
  times: "×",
};

const ar: Dict = {
  appName: "عدّاد الذكر",
  language: "اللغة",
  chooseLanguage: "اختر اللغة",
  nav: { counter: "العدّاد", history: "السجل", settings: "الإعدادات" },
  streak: (n) => `${n} يوم`,

  currentDhikr: "الذكر الحالي",
  percentComplete: (n) => `${n}٪ مكتمل`,
  targetReached: "تم بلوغ الهدف، الحمد لله",
  resetCounter: "إعادة التعيين",
  completeSession: "إنهاء الجلسة",
  sessionNote: "ملاحظة الجلسة",
  sessionNotePlaceholder: "دوّن نيتك أو امتنانك في هذه الجلسة",
  countAria: (name) => `عدّ ${name}`,
  ofTarget: "من",

  record: "السجل",
  sessionHistory: "سجل الجلسات",
  clear: "مسح",
  emptyHistory: "لا توجد جلسات محفوظة بعد. أكمل جلسة في العدّاد لتظهر هنا.",
  of: "من",
  minutes: "دقيقة",

  settings: "الإعدادات",
  personalize: "خصّص ممارستك",
  targetRepetitions: "عدد التكرارات المستهدف",
  dhikrLibrary: "مكتبة الأذكار",
  addCustomDhikr: "أضف ذكرًا مخصصًا",
  arabicOptional: "بالعربية (اختياري)",
  transliteration: "النطق اللاتيني",
  add: "إضافة",
  remove: (name) => `حذف ${name}`,
  preferences: "التفضيلات",
  soundFeedback: "الصوت",
  vibration: "الاهتزاز",
  nightTheme: "المظهر الليلي",
  customDhikr: "ذكر مخصص",
  times: "×",
};

const ur: Dict = {
  appName: "ذکر کاؤنٹر",
  language: "زبان",
  chooseLanguage: "زبان منتخب کریں",
  nav: { counter: "کاؤنٹر", history: "تاریخ", settings: "ترتیبات" },
  streak: (n) => `${n} دن`,

  currentDhikr: "موجودہ ذکر",
  percentComplete: (n) => `${n}٪ مکمل`,
  targetReached: "ہدف مکمل ہوا، الحمد للہ",
  resetCounter: "کاؤنٹر ری سیٹ کریں",
  completeSession: "سیشن مکمل کریں",
  sessionNote: "سیشن نوٹ",
  sessionNotePlaceholder: "اس سیشن کی نیت یا شکرگزاری لکھیں",
  countAria: (name) => `${name} شمار کریں`,
  ofTarget: "میں سے",

  record: "ریکارڈ",
  sessionHistory: "سیشن کی تاریخ",
  clear: "صاف کریں",
  emptyHistory:
    "ابھی کوئی سیشن محفوظ نہیں۔ کاؤنٹر پر سیشن مکمل کریں، یہاں نظر آئے گا۔",
  of: "میں سے",
  minutes: "منٹ",

  settings: "ترتیبات",
  personalize: "اپنی عبادت کو ترتیب دیں",
  targetRepetitions: "ہدف تکرار",
  dhikrLibrary: "ذکر لائبریری",
  addCustomDhikr: "اپنا ذکر شامل کریں",
  arabicOptional: "عربی (اختیاری)",
  transliteration: "رومن نقل",
  add: "شامل کریں",
  remove: (name) => `${name} حذف کریں`,
  preferences: "ترجیحات",
  soundFeedback: "آواز",
  vibration: "وائبریشن",
  nightTheme: "رات کا تھیم",
  customDhikr: "اپنا ذکر",
  times: "×",
};

export const TRANSLATIONS: Record<Language, Dict> = { en, ar, ur };

export const getDict = (lang: Language): Dict => TRANSLATIONS[lang] ?? en;

export const LOCALES: Record<Language, string> = {
  en: "en-US",
  ar: "ar",
  ur: "ur-PK",
};
