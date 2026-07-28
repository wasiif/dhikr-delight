import { useRef } from "react";
import { useDhikr } from "@/lib/dhikr-store";

export function TasbihDial() {
  const { state, active, progress, tap, t } = useDhikr();
  const complete = state.count >= state.target;

  const size = 288;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
    swiped.current = false;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dist = Math.hypot(e.clientX - s.x, e.clientY - s.y);
    if (dist > 28) {
      swiped.current = true;
      tap(1);
    }
  };

  const onClick = () => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    tap(1);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (start.current = null)}
        onClick={onClick}
        aria-label={`${t.countAria(active.transliteration)} — ${t.tapOrSwipe}`}
        className={`bead-pulse relative mx-auto flex size-72 max-w-[85vw] touch-none select-none items-center justify-center rounded-full border border-gold/25 bg-card/80 shadow-lg shadow-primary/5 transition-shadow active:scale-[0.985] sm:size-80 ${
          complete ? "completion-glow" : ""
        }`}
        key={state.count}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            className="stroke-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            className="stroke-gold transition-[stroke-dashoffset] duration-500 ease-out"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
          />
        </svg>

        {complete ? <span className="shimmer-sweep" aria-hidden="true" /> : null}

        <span className="relative flex flex-col items-center gap-1 px-10 text-center">
          <span className="font-arabic text-3xl leading-tight text-gold" dir="rtl">
            {active.arabic}
          </span>
          <span className="text-6xl font-semibold tabular-nums text-foreground sm:text-7xl">
            {state.count}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.ofTarget} {state.target}
          </span>
        </span>
      </button>

      <p aria-live="polite" className="sr-only">
        {t.countStatus(state.count, state.target)}
      </p>
      <p className="text-xs text-muted-foreground">{t.tapOrSwipe}</p>
    </div>
  );
}
