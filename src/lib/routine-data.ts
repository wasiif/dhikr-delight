import type { Language } from "./i18n";

export type RoutineStep = {
  id: string;
  arabic: string;
  transliteration: string;
  translations: Record<Language, string>;
  count: number;
};

export type Routine = {
  id: "morning" | "evening";
  titles: Record<Language, string>;
  windows: Record<Language, string>;
  steps: RoutineStep[];
};

const shared: RoutineStep[] = [
  {
    id: "tasbih-bihamdihi",
    arabic: "سُبْحَانَ ٱللَّٰهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa bihamdih",
    translations: {
      en: "Glory be to Allah and praise be to Him",
      ar: "تنزيهًا لله وبحمده",
      ur: "اللہ پاک ہے اور اسی کی تعریف ہے",
    },
    count: 100,
  },
  {
    id: "tahlil-full",
    arabic:
      "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ ٱلْمُلْكُ وَلَهُ ٱلْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration:
      "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadeer",
    translations: {
      en: "There is no god but Allah alone, without partner. His is the dominion and His is the praise, and He is over all things capable.",
      ar: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
      ur: "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی اور اسی کی تعریف ہے، اور وہ ہر چیز پر قادر ہے",
    },
    count: 10,
  },
  {
    id: "bismillahilladhi",
    arabic:
      "بِسْمِ ٱللَّٰهِ ٱلَّذِي لَا يَضُرُّ مَعَ ٱسْمِهِ شَيْءٌ فِي ٱلْأَرْضِ وَلَا فِي ٱلسَّمَاءِ وَهُوَ ٱلسَّمِيعُ ٱلْعَلِيمُ",
    transliteration:
      "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-Samee'ul-'Aleem",
    translations: {
      en: "In the name of Allah, with whose name nothing on earth or in the heaven can cause harm; He is the All-Hearing, the All-Knowing.",
      ar: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم",
      ur: "اللہ کے نام سے، جس کے نام کے ساتھ زمین و آسمان کی کوئی چیز نقصان نہیں دے سکتی، اور وہ سننے والا جاننے والا ہے",
    },
    count: 3,
  },
  {
    id: "hasbiyallah",
    arabic:
      "حَسْبِيَ ٱللَّٰهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ ٱلْعَرْشِ ٱلْعَظِيمِ",
    transliteration:
      "Hasbiyallahu la ilaha illa huwa, 'alayhi tawakkaltu wa huwa Rabbul-'Arshil-'Azeem",
    translations: {
      en: "Allah is sufficient for me; there is no god but Him. In Him I put my trust, and He is Lord of the Mighty Throne.",
      ar: "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم",
      ur: "مجھے اللہ کافی ہے، اس کے سوا کوئی معبود نہیں، اسی پر میں نے بھروسہ کیا اور وہ عرشِ عظیم کا رب ہے",
    },
    count: 7,
  },
  {
    id: "radeetu",
    arabic:
      "رَضِيتُ بِٱللَّٰهِ رَبًّا، وَبِٱلْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى ٱللَّٰهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    transliteration:
      "Radeetu billahi Rabban, wa bil-Islami deenan, wa bi Muhammadin (sallallahu 'alayhi wa sallam) Nabiyya",
    translations: {
      en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.",
      ar: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد ﷺ نبيًا",
      ur: "میں اللہ کے رب ہونے، اسلام کے دین ہونے اور محمد ﷺ کے نبی ہونے پر راضی ہوں",
    },
    count: 3,
  },
  {
    id: "istighfar-atubu",
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha wa atubu ilayh",
    translations: {
      en: "I seek Allah's forgiveness and turn to Him in repentance",
      ar: "أستغفر الله وأتوب إليه",
      ur: "میں اللہ سے بخشش مانگتا ہوں اور اس کی طرف رجوع کرتا ہوں",
    },
    count: 100,
  },
  {
    id: "salawat-routine",
    arabic: "ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ",
    transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad",
    translations: {
      en: "O Allah, send blessings upon Muhammad and upon the family of Muhammad",
      ar: "اللهم صل على محمد وعلى آل محمد",
      ur: "اے اللہ! محمد ﷺ اور آلِ محمد پر رحمت نازل فرما",
    },
    count: 10,
  },
];

export const ROUTINES: Routine[] = [
  {
    id: "morning",
    titles: { en: "Morning adhkar", ar: "أذكار الصباح", ur: "صبح کے اذکار" },
    windows: {
      en: "From after Fajr until sunrise",
      ar: "من بعد الفجر إلى شروق الشمس",
      ur: "فجر کے بعد سے طلوعِ آفتاب تک",
    },
    steps: [
      {
        id: "asbahna",
        arabic:
          "أَصْبَحْنَا وَأَصْبَحَ ٱلْمُلْكُ لِلَّٰهِ، وَٱلْحَمْدُ لِلَّٰهِ، لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration:
          "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah",
        translations: {
          en: "We have entered the morning and the dominion belongs to Allah; all praise is for Allah. There is no god but Allah alone, without partner.",
          ar: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له",
          ur: "ہم نے صبح کی اور بادشاہی اللہ کی ہے، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں",
        },
        count: 1,
      },
      ...shared,
    ],
  },
  {
    id: "evening",
    titles: { en: "Evening adhkar", ar: "أذكار المساء", ur: "شام کے اذکار" },
    windows: {
      en: "From after Asr until nightfall",
      ar: "من بعد العصر إلى المغرب",
      ur: "عصر کے بعد سے رات تک",
    },
    steps: [
      {
        id: "amsayna",
        arabic:
          "أَمْسَيْنَا وَأَمْسَى ٱلْمُلْكُ لِلَّٰهِ، وَٱلْحَمْدُ لِلَّٰهِ، لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration:
          "Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah",
        translations: {
          en: "We have entered the evening and the dominion belongs to Allah; all praise is for Allah. There is no god but Allah alone, without partner.",
          ar: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له",
          ur: "ہم نے شام کی اور بادشاہی اللہ کی ہے، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں",
        },
        count: 1,
      },
      ...shared,
    ],
  },
];
