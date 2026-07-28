import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, RotateCcw, Check } from "lucide-react";
import { TasbihDial } from "@/components/TasbihDial";
import { useDhikr } from "@/lib/dhikr-store";
import { meaning } from "@/lib/dhikr-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tasbih Counter — Dhikr Counter" },
      {
        name: "description",
        content:
          "Tap the tasbih dial to count your dhikr, set a target and save the session with a note.",
      },
      { property: "og:title", content: "Tasbih Counter — Dhikr Counter" },
      {
        property: "og:description",
        content:
          "Tap the tasbih dial to count your dhikr, set a target and save the session with a note.",
      },
    ],
  }),
  component: CounterPage,
});

function CounterPage() {
  const { state, dispatch, active, progress, tap, t, lang } = useDhikr();

  return (
    <div className="space-y-8">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.currentDhikr}
        </p>
        <p className="font-arabic mt-3 text-4xl leading-relaxed text-gold" dir="rtl">
          {active.arabic}
        </p>
        <h1 className="mt-2 text-2xl font-semibold" dir="ltr">
          {active.transliteration}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {meaning(active, lang)}
        </p>
      </header>

      <TasbihDial />

      <p className="text-center text-sm text-muted-foreground">
        {t.percentComplete(Number(progress.toFixed(0)))}
        {state.count >= state.target ? ` — ${t.targetReached}` : ""}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {[5, 1].map((n) => (
          <button
            key={`minus-${n}`}
            type="button"
            onClick={() => dispatch({ type: "decrement", by: n })}
            disabled={state.count === 0}
            className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <Minus className="size-3.5" />
            {n}
          </button>
        ))}
        {[1, 5, 10].map((n) => (
          <button
            key={`plus-${n}`}
            type="button"
            onClick={() => tap(n)}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="size-3.5" />
            {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "reset" })}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm transition-colors hover:bg-secondary"
        >
          <RotateCcw className="size-4" />
          {t.resetCounter}
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "complete" })}
          disabled={state.count === 0}
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10 disabled:opacity-40"
        >
          <Check className="size-4" />
          {t.completeSession}
        </button>
      </div>

      <div className="rounded-xl border border-border/70 bg-card/60 p-5">
        <label
          htmlFor="session-note"
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          {t.sessionNote}
        </label>
        <textarea
          id="session-note"
          rows={3}
          value={state.note}
          onChange={(e) => dispatch({ type: "setNote", note: e.target.value })}
          placeholder={t.sessionNotePlaceholder}
          className="mt-3 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <blockquote className="text-center">
        <p className="font-arabic text-xl leading-loose text-gold" dir="rtl">
          {t.verseArabic}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{t.verseText}</p>
        <footer className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
          {t.verseRef}
        </footer>
      </blockquote>
    </div>
  );
}

