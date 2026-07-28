import type { Language } from "./i18n";
import { FATIMAH_ID, FATIMAH_STEPS } from "./dhikr-data";

export type TasbihItem = {
  id: string;
  arabic: string;
  transliteration: string;
  translations: Record<Language, string>;
  /** Suggested count. 1 means "recite once". */
  target: number;
  /** Short human sequence label, e.g. "33 + 33 + 34 = 100". */
  sequence?: Record<Language, string>;
  /**
   * Only verifiable references are included. Items without a confirmed
   * citation intentionally carry no reference rather than a guessed one.
   */
  reference?: Record<Language, string>;
  /** Long recitation shown in full rather than counted repeatedly. */
  reciteOnce?: boolean;
  /** Multi-stage tasbih handled by the counter (Tasbih Fatimah). */
  sequenced?: boolean;
};

export const TASBIH_COLLECTION: TasbihItem[] = [
  {
    id: FATIMAH_ID,
    arabic: "تَسْبِيحُ فَاطِمَةَ",
    transliteration: "Tasbih Fatimah",
    translations: {
      en: "SubhanAllah ×33, Alhamdulillah ×33, Allahu Akbar ×34 — recited after each obligatory prayer.",
      ar: "سبحان الله ٣٣، الحمد لله ٣٣، الله أكبر ٣٤ — تُقال بعد كل صلاة مفروضة.",
      ur: "سبحان اللہ ۳۳، الحمد للہ ۳۳، اللہ اکبر ۳۴ — ہر فرض نماز کے بعد۔",
    },
    target: FATIMAH_STEPS.reduce((s, x) => s + x.defaultTarget, 0),
    sequence: {
      en: "33 + 33 + 34 = 100",
      ar: "٣٣ + ٣٣ + ٣٤ = ١٠٠",
      ur: "۳۳ + ۳۳ + ۳۴ = ۱۰۰",
    },
    reference: {
      en: "Sahih al-Bukhari and Sahih Muslim",
      ar: "صحيح البخاري وصحيح مسلم",
      ur: "صحیح بخاری و صحیح مسلم",
    },
    sequenced: true,
  },
  {
    id: "kalima-tayyibah",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ",
    transliteration: "La ilaha illallah, Muhammadur Rasulullah",
    translations: {
      en: "There is no god but Allah; Muhammad is the Messenger of Allah — the declaration of faith.",
      ar: "لا إله إلا الله محمد رسول الله — كلمة التوحيد.",
      ur: "اللہ کے سوا کوئی معبود نہیں، محمد ﷺ اللہ کے رسول ہیں — کلمۂ طیبہ۔",
    },
    target: 100,
  },
  {
    id: "istighfar-100",
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
    transliteration: "Astaghfirullah",
    translations: {
      en: "I seek forgiveness from Allah.",
      ar: "أطلب المغفرة من الله.",
      ur: "میں اللہ سے بخشش مانگتا ہوں۔",
    },
    target: 100,
    sequence: { en: "100 ×", ar: "١٠٠ مرة", ur: "۱۰۰ بار" },
    reference: {
      en: "The Prophet ﷺ sought forgiveness a hundred times a day — Sahih Muslim",
      ar: "كان النبي ﷺ يستغفر في اليوم مائة مرة — صحيح مسلم",
      ur: "نبی ﷺ روزانہ سو بار استغفار کرتے تھے — صحیح مسلم",
    },
  },
  {
    id: "durood-ibrahim",
    arabic:
      "ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration:
      "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad, kama sallayta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hameedun Majeed",
    translations: {
      en: "O Allah, send blessings upon Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim; You are Praiseworthy, Glorious.",
      ar: "اللهم صل على محمد وعلى آل محمد كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد.",
      ur: "اے اللہ! محمد ﷺ اور آلِ محمد پر رحمت نازل فرما جیسے تو نے ابراہیم اور آلِ ابراہیم پر نازل فرمائی، بے شک تو قابلِ تعریف اور بزرگ ہے۔",
    },
    target: 10,
    reference: {
      en: "Sahih al-Bukhari and Sahih Muslim",
      ar: "صحيح البخاري وصحيح مسلم",
      ur: "صحیح بخاری و صحیح مسلم",
    },
  },
  {
    id: "hasbunallah",
    arabic: "حَسْبُنَا ٱللَّٰهُ وَنِعْمَ ٱلْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal wakeel",
    translations: {
      en: "Allah is sufficient for us, and He is the best disposer of affairs.",
      ar: "حسبنا الله ونعم الوكيل.",
      ur: "ہمیں اللہ کافی ہے اور وہ بہترین کارساز ہے۔",
    },
    target: 100,
    reference: {
      en: "Qur'an 3:173",
      ar: "آل عمران: ١٧٣",
      ur: "آلِ عمران ۱۷۳",
    },
  },
  {
    id: "la-hawla-collection",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ",
    transliteration: "La hawla wa la quwwata illa billah",
    translations: {
      en: "There is no might nor power except with Allah.",
      ar: "لا حول ولا قوة إلا بالله.",
      ur: "نہ کوئی طاقت ہے نہ قوت مگر اللہ کی مدد سے۔",
    },
    target: 100,
    reference: {
      en: "Described as a treasure of Paradise — Sahih al-Bukhari and Sahih Muslim",
      ar: "كنز من كنوز الجنة — صحيح البخاري وصحيح مسلم",
      ur: "جنت کے خزانوں میں سے ایک خزانہ — صحیح بخاری و صحیح مسلم",
    },
  },
  {
    id: "ayat-al-kursi",
    arabic:
      "ٱللَّٰهُ لَا إِلَٰهَ إِلَّا هُوَ ٱلْحَيُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِي ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِي يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
    transliteration: "Ayat al-Kursi",
    translations: {
      en: "The Verse of the Throne — recite once, with presence of heart.",
      ar: "آية الكرسي — تُقرأ مرة واحدة بحضور قلب.",
      ur: "آیت الکرسی — ایک بار حضورِ قلب کے ساتھ پڑھیں۔",
    },
    target: 1,
    reciteOnce: true,
    reference: {
      en: "Qur'an 2:255",
      ar: "البقرة: ٢٥٥",
      ur: "البقرہ ۲۵۵",
    },
  },
];

export function tr<T extends Record<Language, string>>(
  map: T | undefined,
  lang: Language,
): string {
  if (!map) return "";
  return map[lang] ?? map.en ?? "";
}
