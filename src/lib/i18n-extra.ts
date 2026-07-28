import type { Language } from "./i18n";

export type ExtraDict = {
  nav2: { library: string; names: string; routine: string };

  // library
  libraryTitle: string;
  libraryIntro: string;
  recommended: string;
  customizable: string;
  setActive: string;
  activeNow: string;

  // names
  namesTitle: string;
  namesIntro: string;
  searchNames: string;
  noNames: string;

  // routine
  routineTitle: string;
  routineIntro: string;
  start: string;
  next: string;
  previous: string;
  stepOf: (a: number, b: number) => string;
  routineComplete: string;
  restart: string;
  repeat: string;

  // tasbih fatimah
  fatimahTitle: string;
  fatimahDesc: string;
  fatimahStage: (a: number, b: number) => string;
  fatimahComplete: string;
  fatimahTotal: string;

  // micro-copy
  verseArabic: string;
  verseText: string;
  verseRef: string;
  hadithText: string;
  hadithRef: string;
};

export const EXTRA: Record<Language, ExtraDict> = {
  en: {
    nav2: { library: "Library", names: "99 Names", routine: "Adhkar" },
    libraryTitle: "Dhikr library",
    libraryIntro: "Essential adhkar with Arabic, transliteration and meaning.",
    recommended: "Recommended count",
    customizable: "Customizable",
    setActive: "Count this",
    activeNow: "Counting now",
    namesTitle: "Asma-ul-Husna",
    namesIntro: "The 99 beautiful names of Allah. Tap a name to count it.",
    searchNames: "Search a name…",
    noNames: "No names match your search.",
    routineTitle: "Morning & evening adhkar",
    routineIntro: "A short guided sequence. Complete each dhikr, then continue.",
    start: "Start",
    next: "Next",
    previous: "Back",
    stepOf: (a, b) => `Step ${a} of ${b}`,
    routineComplete: "Routine complete — may it be accepted.",
    restart: "Start again",
    repeat: "Repeat",
    fatimahTitle: "Tasbih Fatimah",
    fatimahDesc:
      "33 SubhanAllah, then 33 Alhamdulillah, then 34 Allahu Akbar — 100 counts, one complete tasbih.",
    fatimahStage: (a, b) => `Part ${a} of ${b}`,
    fatimahComplete: "Tasbih Fatimah complete — 100 counts.",
    fatimahTotal: "100 total",
    verseArabic: "أَلَا بِذِكْرِ ٱللَّٰهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
    verseText: "Verily, in the remembrance of Allah do hearts find rest.",
    verseRef: "Qur'an 13:28",
    hadithText:
      "Two words light on the tongue, heavy on the scale, beloved to the Most Merciful: SubhanAllahi wa bihamdih, SubhanAllahil-'Azeem.",
    hadithRef: "Bukhari & Muslim",
  },
  ar: {
    nav2: { library: "المكتبة", names: "الأسماء الحسنى", routine: "الأذكار" },
    libraryTitle: "مكتبة الأذكار",
    libraryIntro: "أذكار أساسية بالعربية مع النطق والمعنى.",
    recommended: "العدد المستحب",
    customizable: "حسب رغبتك",
    setActive: "ابدأ العد",
    activeNow: "قيد العد",
    namesTitle: "أسماء الله الحسنى",
    namesIntro: "أسماء الله الحسنى التسعة والتسعون. اضغط على اسم لتعدّه.",
    searchNames: "ابحث عن اسم…",
    noNames: "لا توجد نتائج مطابقة.",
    routineTitle: "أذكار الصباح والمساء",
    routineIntro: "تسلسل مختصر موجّه. أكمل كل ذكر ثم تابع.",
    start: "ابدأ",
    next: "التالي",
    previous: "السابق",
    stepOf: (a, b) => `الخطوة ${a} من ${b}`,
    routineComplete: "تم الورد، تقبل الله.",
    restart: "ابدأ من جديد",
    repeat: "كرر",
    fatimahTitle: "تسبيح فاطمة",
    fatimahDesc:
      "٣٣ سبحان الله، ثم ٣٣ الحمد لله، ثم ٣٤ الله أكبر — مئة تسبيحة كاملة.",
    fatimahStage: (a, b) => `الجزء ${a} من ${b}`,
    fatimahComplete: "اكتمل تسبيح فاطمة — مئة تسبيحة.",
    fatimahTotal: "المجموع ١٠٠",
    verseArabic: "أَلَا بِذِكْرِ ٱللَّٰهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
    verseText: "ألا بذكر الله تطمئن القلوب.",
    verseRef: "الرعد: ٢٨",
    hadithText:
      "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم.",
    hadithRef: "متفق عليه",
  },
  ur: {
    nav2: { library: "لائبریری", names: "اسمائے حسنیٰ", routine: "اذکار" },
    libraryTitle: "ذکر لائبریری",
    libraryIntro: "بنیادی اذکار: عربی، رومن نقل اور ترجمہ کے ساتھ۔",
    recommended: "مستحب تعداد",
    customizable: "اپنی مرضی کے مطابق",
    setActive: "شمار کریں",
    activeNow: "ابھی جاری",
    namesTitle: "اسمائے حسنیٰ",
    namesIntro: "اللہ کے ننانوے خوبصورت نام۔ کسی نام پر ٹیپ کر کے شمار کریں۔",
    searchNames: "نام تلاش کریں…",
    noNames: "کوئی نام نہیں ملا۔",
    routineTitle: "صبح و شام کے اذکار",
    routineIntro: "ایک مختصر رہنمائی شدہ ترتیب۔ ہر ذکر مکمل کر کے آگے بڑھیں۔",
    start: "شروع کریں",
    next: "اگلا",
    previous: "پچھلا",
    stepOf: (a, b) => `مرحلہ ${a} از ${b}`,
    routineComplete: "اذکار مکمل ہوئے — اللہ قبول فرمائے۔",
    restart: "دوبارہ شروع کریں",
    repeat: "دہرائیں",
    fatimahTitle: "تسبیحِ فاطمہ",
    fatimahDesc:
      "۳۳ بار سبحان اللہ، پھر ۳۳ بار الحمد للہ، پھر ۳۴ بار اللہ اکبر — کل ۱۰۰، ایک مکمل تسبیح۔",
    fatimahStage: (a, b) => `حصہ ${a} از ${b}`,
    fatimahComplete: "تسبیحِ فاطمہ مکمل — ۱۰۰ شمار۔",
    fatimahTotal: "کل ۱۰۰",
    verseArabic: "أَلَا بِذِكْرِ ٱللَّٰهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
    verseText: "سن لو! اللہ کے ذکر سے ہی دلوں کو اطمینان ملتا ہے۔",
    verseRef: "الرعد ۲۸",
    hadithText:
      "دو کلمے زبان پر ہلکے، میزان میں بھاری اور رحمٰن کو محبوب ہیں: سبحان اللہ وبحمدہ، سبحان اللہ العظیم۔",
    hadithRef: "بخاری و مسلم",
  },
};
