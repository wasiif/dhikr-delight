import type { Language } from "./i18n";

export type LibraryDict = {
  tabTasbihs: string;
  tabNames: string;
  tabDuas: string;
  searchLibrary: string;
  noResults: string;
  reciteOnce: string;
  reference: string;
  openCounter: string;
  duasIntro: string;
  libraryHeading: string;
  libraryLead: string;
  resultsCount: (n: number) => string;
};

export const LIBRARY: Record<Language, LibraryDict> = {
  en: {
    tabTasbihs: "Tasbihs",
    tabNames: "99 Names of Allah",
    tabDuas: "Duas",
    searchLibrary: "Search tasbihs, names, duas…",
    noResults: "Nothing matches your search.",
    reciteOnce: "Recite once",
    reference: "Reference",
    openCounter: "Open counter",
    duasIntro:
      "Guided routines that sequence through each dhikr with its count.",
    libraryHeading: "Library",
    libraryLead:
      "Everything to count or read, in one place — tasbihs, the 99 names, and guided adhkar.",
    resultsCount: (n) => `${n} item${n === 1 ? "" : "s"}`,
  },
  ar: {
    tabTasbihs: "التسابيح",
    tabNames: "أسماء الله الحسنى",
    tabDuas: "الأدعية",
    searchLibrary: "ابحث في التسابيح والأسماء والأدعية…",
    noResults: "لا توجد نتائج مطابقة.",
    reciteOnce: "تُقرأ مرة",
    reference: "المرجع",
    openCounter: "افتح العدّاد",
    duasIntro: "أوراد موجهة تتنقل بين الأذكار مع أعدادها.",
    libraryHeading: "المكتبة",
    libraryLead: "كل ما تعدّه أو تقرأه في مكان واحد.",
    resultsCount: (n) => `${n} عنصرًا`,
  },
  ur: {
    tabTasbihs: "تسبیحات",
    tabNames: "اسمائے حسنیٰ",
    tabDuas: "دعائیں",
    searchLibrary: "تسبیح، نام یا دعا تلاش کریں…",
    noResults: "کوئی نتیجہ نہیں ملا۔",
    reciteOnce: "ایک بار پڑھیں",
    reference: "حوالہ",
    openCounter: "کاؤنٹر کھولیں",
    duasIntro: "رہنمائی شدہ اذکار جو ہر ذکر کو اس کی تعداد کے ساتھ ترتیب دیتے ہیں۔",
    libraryHeading: "لائبریری",
    libraryLead: "شمار کرنے اور پڑھنے کی ہر چیز ایک ہی جگہ۔",
    resultsCount: (n) => `${n} اشیاء`,
  },
};
