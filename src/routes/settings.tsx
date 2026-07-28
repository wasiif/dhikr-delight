import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X, Sun, Moon, Trash2, Heart } from "lucide-react";
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
          "Choose your language, theme, Arabic text size and target, add custom adhkar and tune sound and haptics.",
      },
      { property: "og:title", content: "Settings — Dhikr Counter" },
      {
        property: "og:description",
        content:
          "Choose your language, theme, Arabic text size and target, add custom adhkar and tune sound and haptics.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { state, dispatch, phrases, t, lang } = useDhikr();
  const [arabic, setArabic] = useState("");
  const [name, setName] = useState("");
  const [confirmWipe, setConfirmWipe] = useState(false);

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
  ] as const;

  const themes = [
    { dark: false, label: t.lightMode, Icon: Sun },
    { dark: true, label: t.nightMode, Icon: Moon },
  ];

  const sizes = [
    { scale: 1, label: t.fontSmall },
    { scale: 1.15, label: t.fontMedium },
    { scale: 1.35, label: t.fontLarge },
  ];

  const sectionTitle =
    "text-sm font-medium uppercase tracking-[0.2em] text-gold";

  return (
    <div className="mx-auto max-w-2xl space-y-10 animate-fade-in">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.settings}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{t.personalize}</h1>
      </header>

      <section className="space-y-3">
        <h2 className={sectionTitle}>{t.language}</h2>
        <LanguageSwitcher variant="full" />
      </section>

      <section className="space-y-3">
        <h2 className={sectionTitle}>{t.theme}</h2>
        <div
          className="grid grid-cols-2 gap-3"
          role="radiogroup"
          aria-label={t.theme}
        >
          {themes.map(({ dark, label, Icon }) => {
            const selected = state.darkMode === dark;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => dispatch({ type: "setDarkMode", darkMode: dark })}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border text-sm transition-colors ${
                  selected
                    ? "border-gold/70 bg-gold/10 text-gold"
                    : "border-border/70 bg-card/60 text-muted-foreground hover:border-gold/40"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className={sectionTitle}>{t.arabicFontSize}</h2>
        <div
          className="grid grid-cols-3 gap-3"
          role="radiogroup"
          aria-label={t.arabicFontSize}
        >
          {sizes.map(({ scale, label }) => {
            const selected = Math.abs(state.arabicScale - scale) < 0.01;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => dispatch({ type: "setArabicScale", scale })}
                className={`min-h-12 rounded-2xl border text-sm transition-colors ${
                  selected
                    ? "border-gold/70 bg-gold/10 text-gold"
                    : "border-border/70 bg-card/60 text-muted-foreground hover:border-gold/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/60 p-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.fontPreviewLabel}
          </p>
          <p className="font-arabic mt-2 text-3xl text-gold" dir="rtl">
            سُبْحَانَ اللَّٰهِ وَبِحَمْدِهِ
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className={sectionTitle}>{t.targetRepetitions}</h2>
        <input
          type="number"
          min={1}
          value={state.target}
          aria-label={t.targetRepetitions}
          onChange={(e) =>
            dispatch({ type: "setTarget", target: Number(e.target.value) })
          }
          dir="ltr"
          className="min-h-11 w-32 rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </section>

      <section className="space-y-3">
        <h2 className={sectionTitle}>{t.dhikrLibrary}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {phrases.map((phrase) => {
            const selected = phrase.id === state.selectedId;
            return (
              <div
                key={phrase.id}
                className={`relative rounded-2xl border p-4 text-start transition-colors ${
                  selected
                    ? "border-gold/70 bg-gold/10"
                    : "border-border/70 bg-card/60 hover:border-gold/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => dispatch({ type: "select", id: phrase.id })}
                  aria-pressed={selected}
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
                    className="absolute end-2 top-2 rounded-full p-2 text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className={sectionTitle}>{t.addCustomDhikr}</h2>
        <div className="flex flex-wrap gap-2">
          <input
            value={arabic}
            onChange={(e) => setArabic(e.target.value)}
            placeholder={t.arabicOptional}
            aria-label={t.arabicOptional}
            dir="rtl"
            className="font-arabic min-h-11 min-w-40 flex-1 rounded-xl border border-input bg-background px-3 text-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.transliteration}
            aria-label={t.transliteration}
            dir="ltr"
            className="min-h-11 min-w-40 flex-1 rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="button"
            onClick={addPhrase}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" aria-hidden="true" /> {t.add}
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className={sectionTitle}>{t.preferences}</h2>
        <div className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card/60">
          {toggles.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm">{label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={state[key]}
                aria-label={label}
                onClick={() => dispatch({ type: "toggle", key })}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
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

      <section className="space-y-3">
        <h2 className={sectionTitle}>{t.dangerZone}</h2>
        {confirmWipe ? (
          <div className="rounded-2xl border border-destructive/40 bg-card/60 p-5 animate-scale-in">
            <p className="font-medium">{t.resetAllData}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.resetAllBody}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setConfirmWipe(false)}
                className="min-h-11 rounded-full border border-border px-5 text-sm transition-colors hover:bg-secondary"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "resetAll" });
                  setConfirmWipe(false);
                }}
                className="min-h-11 rounded-full bg-destructive px-5 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmWipe(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-destructive/40 px-5 text-sm text-destructive transition-colors hover:bg-destructive/10"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            {t.resetAllData}
          </button>
        )}
      </section>

      <section className="space-y-3">
        <h2 className={sectionTitle}>{t.aboutTitle}</h2>
        <div className="rounded-2xl border border-border/70 bg-card/60 p-5">
          <p className="font-arabic text-xl text-gold" dir="rtl">
            {t.verseArabic}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t.aboutBody}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Heart className="size-3.5 text-gold" aria-hidden="true" />
            {t.credits}
          </p>
        </div>
      </section>
    </div>
  );
}
