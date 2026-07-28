import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useDhikr } from "@/lib/dhikr-store";
import { meaning } from "@/lib/dhikr-data";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Dhikr Counter" },
      {
        name: "description",
        content:
          "Choose your language, dhikr and target, add custom phrases and tune sound, vibration and theme.",
      },
      { property: "og:title", content: "Settings — Dhikr Counter" },
      {
        property: "og:description",
        content:
          "Choose your language, dhikr and target, add custom phrases and tune sound, vibration and theme.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { state, dispatch, phrases, t, lang } = useDhikr();
  const [arabic, setArabic] = useState("");
  const [name, setName] = useState("");

  const addPhrase = () => {
    const transliteration = name.trim();
    if (!transliteration) return;
    dispatch({
      type: "addPhrase",
      phrase: {
        id: `custom-${Date.now()}`,
        arabic: arabic.trim() || transliteration,
        transliteration,
        translations: {
          en: t.customDhikr,
          ar: t.customDhikr,
          ur: t.customDhikr,
        },
        defaultTarget: state.target,
        custom: true,
      },
    });
    setArabic("");
    setName("");
  };

  const toggles = [
    { key: "soundEnabled", label: t.soundFeedback },
    { key: "vibrationEnabled", label: t.vibration },
    { key: "autoReset", label: t.autoReset },
    { key: "darkMode", label: t.nightTheme },
  ] as const;

  return (
    <div className="mx-auto max-w-2xl space-y-10 animate-fade-in">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.settings}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{t.personalize}</h1>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {t.language}
        </h2>
        <LanguageSwitcher variant="full" />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {t.targetRepetitions}
        </h2>
        <input
          type="number"
          min={1}
          value={state.target}
          onChange={(e) =>
            dispatch({ type: "setTarget", target: Number(e.target.value) })
          }
          dir="ltr"
          className="w-32 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {t.dhikrLibrary}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {phrases.map((phrase) => {
            const selected = phrase.id === state.selectedId;
            return (
              <div
                key={phrase.id}
                className={`relative rounded-xl border p-4 text-start transition-colors ${
                  selected
                    ? "border-gold/70 bg-gold/10"
                    : "border-border/70 bg-card/60 hover:border-gold/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => dispatch({ type: "select", id: phrase.id })}
                  className="block w-full text-start"
                >
                  <span className="font-arabic block text-2xl text-gold" dir="rtl">
                    {phrase.arabic}
                  </span>
                  <span className="mt-1 block font-medium" dir="ltr">
                    {phrase.transliteration}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {meaning(phrase, lang)} · {phrase.defaultTarget}
                    {t.times}
                  </span>
                </button>
                {phrase.custom ? (
                  <button
                    type="button"
                    aria-label={t.remove(phrase.transliteration)}
                    onClick={() => dispatch({ type: "removePhrase", id: phrase.id })}
                    className="absolute end-2 top-2 rounded-full p-1 text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {t.addCustomDhikr}
        </h2>
        <div className="flex flex-wrap gap-2">
          <input
            value={arabic}
            onChange={(e) => setArabic(e.target.value)}
            placeholder={t.arabicOptional}
            dir="rtl"
            className="font-arabic min-w-40 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-lg outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.transliteration}
            dir="ltr"
            className="min-w-40 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onClick={addPhrase}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" /> {t.add}
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {t.preferences}
        </h2>
        <div className="divide-y divide-border/70 rounded-xl border border-border/70 bg-card/60">
          {toggles.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm">{label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={state[key]}
                aria-label={label}
                onClick={() => dispatch({ type: "toggle", key })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  state[key] ? "bg-gold" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 size-5 rounded-full bg-background transition-all ${
                    state[key] ? "start-[1.375rem]" : "start-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
