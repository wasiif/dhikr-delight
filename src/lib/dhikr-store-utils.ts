import type { Session } from "./export-history";

export const STORAGE_KEY = "dhikr-counter-app-state";

export function computeStreak(history: Session[]): number {
  if (!history.length) return 0;

  const days = new Set(history.map((s) => new Date(s.completedAt).toDateString()));
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

let audioCtx: AudioContext | null = null;

export function playChime() {
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
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
