import { createContext } from "react";
import type { Session } from "./export-history";
import type { Dhikr } from "./dhikr-data";
import type { Language } from "./i18n";

export type DhikrContextValue = {
  state: {
    count: number;
    target: number;
    selectedId: string;
    customPhrases: Dhikr[];
    note: string;
    history: Session[];
    sessionStart: number;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    autoReset: boolean;
    darkMode: boolean;
    arabicScale: number;
    language: Language;
    fatimahStage: number;
  };
  dispatch: React.Dispatch<unknown>;
  phrases: Dhikr[];
  active: Dhikr;
  progress: number;
  isFatimah: boolean;
  fatimahStage: number;
  fatimahSteps: Dhikr[];
  fatimahTotal: number;
  streak: number;
  todayTotal: number;
  weekTotal: number;
  hydrated: boolean;
  tap: (by: number) => void;
  lang: Language;
  t: ReturnType<typeof import("./i18n").getDict>;
  rtl: boolean;
  locale: string;
  setLanguage: (language: Language) => void;
};

export const DhikrContext = createContext<DhikrContextValue | null>(null);
