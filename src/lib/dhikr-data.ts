import type { Language } from "./i18n";

export type Dhikr = {
  id: string;
  arabic: string;
  transliteration: string;
  /** Meaning of the dhikr per UI language. */
  translations: Record<Language, string>;
  defaultTarget: number;
  custom?: boolean;
};

export const DEFAULT_TARGET = 33;

export function meaning(dhikr: Dhikr, lang: Language): string {
  return dhikr.translations?.[lang] ?? dhikr.translations?.en ?? "";
}

export const DEFAULT_DHIKRS: Dhikr[] = [
  {
    id: "subhanallah",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    transliteration: "SubhanAllah",
    translations: {
      en: "Glory be to Allah",
      ar: "تنزيهًا لله عن كل نقص",
      ur: "اللہ پاک ہے",
    },
    defaultTarget: 33,
  },
  {
    id: "alhamdulillah",
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    transliteration: "Alhamdulillah",
    translations: {
      en: "All praise is due to Allah",
      ar: "الثناء كله لله",
      ur: "تمام تعریفیں اللہ کے لیے ہیں",
    },
    defaultTarget: 33,
  },
  {
    id: "allahu-akbar",
    arabic: "ٱللَّٰهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translations: {
      en: "Allah is the Greatest",
      ar: "الله أعظم من كل شيء",
      ur: "اللہ سب سے بڑا ہے",
    },
    defaultTarget: 34,
  },
  {
    id: "la-ilaha-illallah",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
    transliteration: "La ilaha illallah",
    translations: {
      en: "There is no god but Allah",
      ar: "لا معبود بحق إلا الله",
      ur: "اللہ کے سوا کوئی معبود نہیں",
    },
    defaultTarget: 100,
  },
  {
    id: "astaghfirullah",
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
    transliteration: "Astaghfirullah",
    translations: {
      en: "I seek forgiveness from Allah",
      ar: "أطلب المغفرة من الله",
      ur: "میں اللہ سے معافی مانگتا ہوں",
    },
    defaultTarget: 100,
  },
];
