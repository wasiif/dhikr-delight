export type Dhikr = {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  defaultTarget: number;
  custom?: boolean;
};

export const DEFAULT_TARGET = 33;

export const DEFAULT_DHIKRS: Dhikr[] = [
  {
    id: "subhanallah",
    arabic: "سُبْحَانَ ٱللَّٰه",
    transliteration: "SubhanAllah",
    translation: "Glory be to Allah",
    defaultTarget: 33,
  },
  {
    id: "alhamdulillah",
    arabic: "ٱلْحَمْدُ لِلَّٰه",
    transliteration: "Alhamdulillah",
    translation: "All praise is due to Allah",
    defaultTarget: 33,
  },
  {
    id: "allahu-akbar",
    arabic: "ٱللَّٰهُ أَكْبَر",
    transliteration: "Allahu Akbar",
    translation: "Allah is the Greatest",
    defaultTarget: 34,
  },
  {
    id: "la-ilaha-illallah",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰه",
    transliteration: "La ilaha illallah",
    translation: "There is no god but Allah",
    defaultTarget: 100,
  },
  {
    id: "astaghfirullah",
    arabic: "أَسْتَغْفِرُ ٱللَّٰه",
    transliteration: "Astaghfirullah",
    translation: "I seek forgiveness from Allah",
    defaultTarget: 100,
  },
];
