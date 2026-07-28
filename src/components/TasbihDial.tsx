import { useDhikr } from "@/lib/dhikr-store";

export function TasbihDial() {
  const { state, active, progress, tap } = useDhikr();
  const complete = state.count >= state.target;

  const size = 288;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <button
      type="button"
      onClick={() => tap(1)}
      aria-label={`Count ${active.transliteration}`}
      className={`bead-pulse relative mx-auto flex size-72 items-center justify-center rounded-full border border-gold/25 bg-card/80 transition-shadow active:scale-[0.985] ${
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
          className="stroke-gold transition-[stroke-dashoffset] duration-300 ease-out"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
        />
      </svg>

      {complete ? <span className="shimmer-sweep" aria-hidden="true" /> : null}


      <span className="relative flex flex-col items-center gap-1 px-8 text-center">
        <span className="font-arabic text-3xl leading-tight text-gold">
          {active.arabic}
        </span>
        <span className="text-6xl font-semibold tabular-nums text-foreground">
          {state.count}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          of {state.target}
        </span>
      </span>
    </button>
  );
}
