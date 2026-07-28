import { Globe } from "lucide-react";
import { useDhikr } from "@/lib/dhikr-store";
import { LANGUAGES, type Language } from "@/lib/i18n";

export function LanguageSwitcher({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const { lang, setLanguage, t } = useDhikr();

  if (variant === "full") {
    return (
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((option) => (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={lang === option.code}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              lang === option.code
                ? "border-gold/70 bg-gold/10 text-gold"
                : "border-border/70 text-muted-foreground hover:border-gold/40"
            }`}
          >
            {option.native}
          </button>
        ))}
      </div>
    );
  }

  return (
    <label className="flex items-center gap-1.5 text-muted-foreground">
      <Globe className="size-4" aria-hidden="true" />
      <span className="sr-only">{t.chooseLanguage}</span>
      <select
        value={lang}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="rounded-full border border-border/70 bg-transparent px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-ring"
      >
        {LANGUAGES.map((option) => (
          <option key={option.code} value={option.code} className="bg-card text-foreground">
            {option.native}
          </option>
        ))}
      </select>
    </label>
  );
}
