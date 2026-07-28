import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { DEFAULT_DHIKRS, DEFAULT_TARGET, type Dhikr } from "./dhikr-data";
import { getDict, isRtl, LOCALES, type Language } from "./i18n";
import type { Session } from "./export-history";

const STORAGE_KEY = "dhikr-counter-app-state";

export type DhikrState = {
  count: number;
  target: number;
  selectedId: string;
  customPhrases: Dhikr[];
  note: string;
  history: Session[];
  sessionStart: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  darkMode: boolean;
  language: Language;
};

const initialState: DhikrState = {
  count: 0,
  target: DEFAULT_TARGET,
  selectedId: DEFAULT_DHIKRS[0].id,
  customPhrases: [],
  note: "",
  history: [],
  sessionStart: 0,
  soundEnabled: true,
  vibrationEnabled: true,
  darkMode: true,
  language: "en",
};

type Action =
  | { type: "hydrate"; state: Partial<DhikrState> }
  | { type: "increment"; by: number }
  | { type: "decrement"; by: number }
  | { type: "reset" }
  | { type: "complete" }
  | { type: "setTarget"; target: number }
  | { type: "select"; id: string }
  | { type: "addPhrase"; phrase: Dhikr }
  | { type: "removePhrase"; id: string }
  | { type: "setNote"; note: string }
  | { type: "clearHistory" }
  | { type: "setLanguage"; language: Language }
  | { type: "toggle"; key: "soundEnabled" | "vibrationEnabled" | "darkMode" };


function reducer(state: DhikrState, action: Action): DhikrState {
  switch (action.type) {
    case "hydrate":
      return { ...state, ...action.state };
    case "increment":
      return {
        ...state,
        count: state.count + action.by,
        sessionStart: state.sessionStart || Date.now(),
      };
    case "decrement":
      return { ...state, count: Math.max(0, state.count - action.by) };
    case "reset":
      return { ...state, count: 0, sessionStart: 0 };
    case "complete": {
      if (state.count === 0) return state;
      const all = [...DEFAULT_DHIKRS, ...state.customPhrases];
      const dhikr = all.find((d) => d.id === state.selectedId) ?? DEFAULT_DHIKRS[0];
      const start = state.sessionStart || Date.now();
      const session: Session = {
        id: `${Date.now()}`,
        phrase: dhikr.transliteration,
        arabic: dhikr.arabic,
        count: state.count,
        target: state.target,
        note: state.note,
        completedAt: Date.now(),
        durationMinutes: Math.max(1, Math.round((Date.now() - start) / 60000)),
      };
      return {
        ...state,
        count: 0,
        note: "",
        sessionStart: 0,
        history: [session, ...state.history],
      };
    }
    case "setTarget":
      return { ...state, target: Math.max(1, action.target || 1) };
    case "select": {
      const all = [...DEFAULT_DHIKRS, ...state.customPhrases];
      const dhikr = all.find((d) => d.id === action.id);
      return {
        ...state,
        selectedId: action.id,
        count: 0,
        sessionStart: 0,
        target: dhikr?.defaultTarget ?? state.target,
      };
    }
    case "addPhrase":
      return { ...state, customPhrases: [...state.customPhrases, action.phrase] };
    case "removePhrase":
      return {
        ...state,
        customPhrases: state.customPhrases.filter((p) => p.id !== action.id),
        selectedId:
          state.selectedId === action.id ? DEFAULT_DHIKRS[0].id : state.selectedId,
      };
    case "setNote":
      return { ...state, note: action.note };
    case "clearHistory":
      return { ...state, history: [] };
    case "toggle":
      return { ...state, [action.key]: !state[action.key] };
    default:
      return state;
  }
}

function computeStreak(history: Session[]): number {
  if (!history.length) return 0;
  const days = new Set(
    history.map((s) => new Date(s.completedAt).toDateString()),
  );
  let streak = 0;
  const cursor = new Date();
  if (!days.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(cursor.toDateString())) return 0;
  }
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

type DhikrContextValue = {
  state: DhikrState;
  dispatch: React.Dispatch<Action>;
  phrases: Dhikr[];
  active: Dhikr;
  progress: number;
  streak: number;
  hydrated: boolean;
  tap: (by: number) => void;
};

const DhikrContext = createContext<DhikrContextValue | null>(null);

export function DhikrProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useReducer(() => true, false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", state: JSON.parse(raw) });
    } catch {
      /* ignore malformed storage */
    }
    setHydrated();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, hydrated]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.darkMode);
  }, [state.darkMode]);

  const phrases = useMemo(
    () => [...DEFAULT_DHIKRS, ...state.customPhrases],
    [state.customPhrases],
  );
  const active =
    phrases.find((p) => p.id === state.selectedId) ?? DEFAULT_DHIKRS[0];
  const progress =
    state.target > 0 ? Math.min((state.count / state.target) * 100, 100) : 0;
  const streak = useMemo(() => computeStreak(state.history), [state.history]);

  const value: DhikrContextValue = {
    state,
    dispatch,
    phrases,
    active,
    progress,
    streak,
    hydrated,
    tap: (by: number) => {
      if (state.vibrationEnabled && typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(18);
      }
      if (state.soundEnabled) playChime();
      dispatch({ type: "increment", by });
    },
  };

  return <DhikrContext.Provider value={value}>{children}</DhikrContext.Provider>;
}

let audioCtx: AudioContext | null = null;
function playChime() {
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    audioCtx = audioCtx ?? new Ctor();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = 660;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } catch {
    /* audio unavailable */
  }
}

export function useDhikr() {
  const ctx = useContext(DhikrContext);
  if (!ctx) throw new Error("useDhikr must be used within DhikrProvider");
  return ctx;
}
