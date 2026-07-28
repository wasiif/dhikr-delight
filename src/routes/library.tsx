import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useDhikr } from "@/lib/dhikr-store";
import {
  DEFAULT_DHIKRS,
  FATIMAH_ID,
  FATIMAH_STEPS,
  FATIMAH_TOTAL,
  meaning,
} from "@/lib/dhikr-data";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Dhikr Library — Essential Adhkar" },
      {
        name: "description",
        content:
          "Essential adhkar with Arabic text, transliteration, translation and recommended counts. Tap one to start counting.",
      },
      { property: "og:title", content: "Dhikr Library — Essential Adhkar" },
      {
        property: "og:description",
        content:
          "Essential adhkar with Arabic text, transliteration, translation and recommended counts.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const { state, dispatch, t, lang } = useDhikr();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.dhikrLibrary}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{t.libraryTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.libraryIntro}</p>
      </header>

      <section className="rounded-2xl border border-gold/40 bg-card/70 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gold">{t.fatimahTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.fatimahDesc}</p>
        <ol className="mt-4 space-y-1 text-sm" dir="ltr">
          {FATIMAH_STEPS.map((step, i) => (
            <li key={step.id} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{i + 1}.</span>
              <span className="font-arabic text-lg text-gold" dir="rtl">
                {step.arabic}
              </span>
              <span className="text-muted-foreground">
                {step.transliteration} × {step.defaultTarget}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
            {t.fatimahTotal} ({FATIMAH_TOTAL})
          </span>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "select", id: FATIMAH_ID });
              navigate({ to: "/" });
            }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {state.selectedId === FATIMAH_ID && <Check className="size-3.5" />}
            {state.selectedId === FATIMAH_ID ? t.activeNow : t.setActive}
          </button>
        </div>
      </section>

      <ul className="space-y-4">
        {DEFAULT_DHIKRS.map((d) => {
          const active = state.selectedId === d.id;
          return (
            <li
              key={d.id}
              className="rounded-2xl border border-border/70 bg-card/60 p-5 shadow-sm"
            >
              <p className="font-arabic text-3xl leading-relaxed text-gold" dir="rtl">
                {d.arabic}
              </p>
              <p className="mt-2 text-base font-medium" dir="ltr">
                {d.transliteration}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {meaning(d, lang)}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
                  {d.customizableTarget
                    ? t.customizable
                    : `${t.recommended}: ${d.defaultTarget}`}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "select", id: d.id });
                    navigate({ to: "/" });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {active && <Check className="size-3.5" />}
                  {active ? t.activeNow : t.setActive}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <blockquote className="rounded-2xl border border-border/60 bg-card/40 p-5 text-center">
        <p className="text-sm text-muted-foreground">{t.hadithText}</p>
        <footer className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">
          {t.hadithRef}
        </footer>
      </blockquote>
    </div>
  );
}
