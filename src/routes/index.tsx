import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, RotateCcw, Sparkles } from "lucide-react";
import { TasbihDial } from "@/components/TasbihDial";
import { CounterSkeleton } from "@/components/Skeletons";

import { useDhikr } from "@/lib/dhikr-store";
import { meaning } from "@/lib/dhikr-data";

const HOME_TITLE = "Digital Tasbih Counter — Free Online Dhikr Counter";
const HOME_DESC =
  "Free digital tasbih counter for daily dhikr: tap or swipe to count, set targets like 33, 99 and 100, follow Tasbih Fatimah, and track streaks — works offline in your browser.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      {
        name: "keywords",
        content:
          "tasbih counter, digital tasbih, dhikr counter, online tasbeeh, misbaha, zikr counter, tasbih fatimah, 99 names of allah",
      },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Dhikr Counter — Digital Tasbih",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Any (web browser)",
          browserRequirements: "Requires JavaScript",
          description: HOME_DESC,
          inLanguage: ["en", "ur"],
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          featureList: [
            "Tap and swipe dhikr counting",
            "Custom targets (33, 99, 100, 1000)",
            "Tasbih Fatimah sequence",
            "99 Names of Allah",
            "Morning and evening adhkar",
            "Session history and streaks",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is a digital tasbih counter?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A digital tasbih is an online version of prayer beads (misbaha). You tap the dial to count each dhikr, and the app tracks your progress toward a target such as 33, 99 or 100.",
              },
            },
            {
              "@type": "Question",
              name: "What is Tasbih Fatimah?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Tasbih Fatimah is SubhanAllah 33 times, Alhamdulillah 33 times and Allahu Akbar 34 times — 100 in total. The counter advances through each phrase automatically.",
              },
            },
            {
              "@type": "Question",
              name: "Does the dhikr counter work offline?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Counts, targets and history are stored locally in your browser, so no account is needed and your data stays on your device.",
              },
            },
          ],
        }),
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
    return <CounterSkeleton />;
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

