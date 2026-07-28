import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Play, RotateCcw } from "lucide-react";
import { useDhikr } from "@/lib/dhikr-store";
import { ROUTINES, type Routine } from "@/lib/routine-data";

export const Route = createFileRoute("/routine")({
  head: () => ({
    meta: [
      { title: "Morning & Evening Adhkar — Guided Routine" },
      {
        name: "description",
        content:
          "A guided morning and evening adhkar routine that sequences through each dhikr with its recommended count.",
      },
      { property: "og:title", content: "Morning & Evening Adhkar" },
      {
        property: "og:description",
        content:
          "A guided routine that sequences through the morning and evening adhkar with counts.",
      },
    ],
  }),
  component: RoutinePage,
});

function RoutinePage() {
  const { t, lang } = useDhikr();
  const [openId, setOpenId] = useState<Routine["id"] | null>(null);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.nav2.routine}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{t.routineTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.routineIntro}</p>
      </header>

      {ROUTINES.map((routine) =>
        openId === routine.id ? (
          <RoutineRunner
            key={routine.id}
            routine={routine}
            onClose={() => setOpenId(null)}
          />
        ) : (
          <button
            key={routine.id}
            type="button"
            onClick={() => setOpenId(routine.id)}
            className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/60 p-5 text-start shadow-sm transition-colors hover:bg-secondary/60"
          >
            <span>
              <span className="block text-lg font-semibold">
                {routine.titles[lang]}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {routine.windows[lang]} · {routine.steps.length}
              </span>
            </span>
            <Play className="size-5 text-gold" />
          </button>
        ),
      )}
    </div>
  );
}

function RoutineRunner({
  routine,
  onClose,
}: {
  routine: Routine;
  onClose: () => void;
}) {
  const { t, lang, dispatch } = useDhikr();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const done = index >= routine.steps.length;
  const step = routine.steps[Math.min(index, routine.steps.length - 1)];

  return (
    <section className="rounded-2xl border border-gold/40 bg-card/70 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{routine.titles[lang]}</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          {t.clear}
        </button>
      </div>

      {done ? (
        <div className="mt-6 space-y-4 text-center">
          <p className="font-arabic text-2xl text-gold" dir="rtl">
            {t.verseArabic}
          </p>
          <p className="text-sm text-muted-foreground">{t.routineComplete}</p>
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm transition-colors hover:bg-secondary"
          >
            <RotateCcw className="size-4" />
            {t.restart}
          </button>
        </div>
      ) : (
        <>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.stepOf(index + 1, routine.steps.length)}
          </p>
          <p
            className="font-arabic mt-3 text-2xl leading-loose text-gold"
            dir="rtl"
          >
            {step.arabic}
          </p>
          <p className="mt-3 text-sm font-medium" dir="ltr">
            {step.transliteration}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {step.translations[lang]}
          </p>
          <span className="mt-4 inline-block rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
            {t.repeat} × {step.count}
          </span>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                dispatch({
                  type: "activate",
                  dhikr: {
                    id: `routine-${step.id}`,
                    arabic: step.arabic,
                    transliteration: step.transliteration,
                    translations: step.translations,
                    defaultTarget: step.count,
                  },
                  target: step.count,
                });
                navigate({ to: "/" });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.setActive}
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary disabled:opacity-40"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" />
              {t.previous}
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => i + 1)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
            >
              {t.next}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
