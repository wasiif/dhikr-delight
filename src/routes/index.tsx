import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, RotateCcw, Sparkles } from "lucide-react";
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
  const {
    state,
    dispatch,
    active,
    progress,
    tap,
    t,
    lang,
    hydrated,
    isFatimah,
    fatimahStage,
    fatimahSteps,
  } = useDhikr();
  const [confirmReset, setConfirmReset] = useState(false);
  const complete = state.count >= state.target;

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 animate-fade-in">
        <span className="size-16 animate-[pulse_2s_ease-in-out_infinite] rounded-full border-2 border-gold/40" />
        <p className="text-sm text-muted-foreground">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-8 animate-fade-in">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {isFatimah ? t.fatimahTitle : t.currentDhikr}
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

      {isFatimah ? (
        <div className="mx-auto flex max-w-sm items-center justify-center gap-2">
          {fatimahSteps.map((step, i) => (
            <span
              key={step.id}
              className={`flex-1 rounded-full border px-2 py-1 text-center text-[11px] transition-colors ${
                i === fatimahStage
                  ? "border-gold/60 bg-gold/10 text-gold"
                  : i < fatimahStage
                    ? "border-gold/30 text-gold/60"
                    : "border-border/60 text-muted-foreground"
              }`}
              dir="ltr"
            >
              {step.transliteration} × {step.defaultTarget}
            </span>
          ))}
        </div>
      ) : null}

      <TasbihDial />

      {isFatimah ? (
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t.fatimahStage(fatimahStage + 1, fatimahSteps.length)}
        </p>
      ) : null}

      <p className="text-center text-sm tabular-nums text-muted-foreground" dir="ltr">
        {t.countProgress(state.count, state.target)} ·{" "}
        {t.percentComplete(Number(progress.toFixed(0)))}
      </p>

      {complete ? (
        <div className="completion-glow rounded-2xl border border-gold/40 bg-gold/10 p-5 text-center animate-scale-in">
          <Sparkles className="mx-auto size-5 text-gold" aria-hidden="true" />
          <p className="mt-2 text-lg font-semibold text-gold">{t.tasbihComplete}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.tasbihCompleteNote}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "complete" })}
              className="min-h-11 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.resetAndContinue}
            </button>
            <button
              type="button"
              onClick={() => tap(1)}
              className="min-h-11 rounded-full border border-gold/50 px-5 text-sm text-gold transition-colors hover:bg-gold/10"
            >
              {t.continueCounting}
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "decrement", by: 1 })}
          disabled={state.count === 0}
          className="inline-flex min-h-11 min-w-14 items-center justify-center gap-1 rounded-full border border-border px-4 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
        >
          <Minus className="size-3.5" />1
        </button>
        <button
          type="button"
          onClick={() => tap(1)}
          className="inline-flex min-h-11 min-w-16 items-center justify-center gap-1 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-3.5" />1
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          disabled={state.count === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm transition-colors hover:bg-secondary disabled:opacity-40"
        >
          <RotateCcw className="size-4" />
          {t.resetCounter}
        </button>
      </div>

      {confirmReset ? (
        <div className="rounded-2xl border border-destructive/40 bg-card/80 p-5 text-center animate-scale-in">
          <p className="font-medium">{t.confirmReset}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.confirmResetBody(state.count)}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="min-h-11 rounded-full border border-border px-5 text-sm transition-colors hover:bg-secondary"
            >
              {t.cancel}
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "reset" });
                setConfirmReset(false);
              }}
              className="min-h-11 rounded-full bg-destructive px-5 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90"
            >
              {t.confirm}
            </button>
          </div>
        </div>
      ) : null}


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

