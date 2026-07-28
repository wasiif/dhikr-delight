import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useDhikr } from "@/lib/dhikr-store";
import { ASMA_UL_HUSNA, nameMeaning } from "@/lib/asma-data";

export const Route = createFileRoute("/names")({
  head: () => ({
    meta: [
      { title: "Asma-ul-Husna — 99 Names of Allah" },
      {
        name: "description",
        content:
          "Browse the 99 names of Allah in Arabic with transliteration and meaning, and tap any name to count it as your dhikr.",
      },
      { property: "og:title", content: "Asma-ul-Husna — 99 Names of Allah" },
      {
        property: "og:description",
        content:
          "The 99 beautiful names of Allah with transliteration and meaning, tappable for counting.",
      },
    ],
  }),
  component: NamesPage,
});

function NamesPage() {
  const { state, dispatch, t, lang } = useDhikr();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const names = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ASMA_UL_HUSNA;
    return ASMA_UL_HUSNA.filter(
      (n) =>
        n.transliteration.toLowerCase().includes(q) ||
        n.arabic.includes(query.trim()) ||
        nameMeaning(n, lang).toLowerCase().includes(q),
    );
  }, [query, lang]);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.nav2.names}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{t.namesTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.namesIntro}</p>
      </header>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.searchNames}
        className="w-full rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      {names.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">{t.noNames}</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {names.map((n) => {
            const id = `name-${n.n}`;
            const active = state.selectedId === id;
            return (
              <li key={n.n}>
                <button
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: "activate",
                      dhikr: {
                        id,
                        arabic: n.arabic,
                        transliteration: n.transliteration,
                        translations: n.meanings,
                        defaultTarget: 33,
                      },
                    });
                    navigate({ to: "/" });
                  }}
                  className={`w-full rounded-2xl border p-4 text-start shadow-sm transition-colors hover:bg-secondary/60 ${
                    active ? "border-gold/60 bg-gold/5" : "border-border/70 bg-card/60"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-arabic text-2xl text-gold" dir="rtl">
                      {n.arabic}
                    </span>
                    <span className="text-xs text-muted-foreground">{n.n}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium" dir="ltr">
                    {n.transliteration}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {nameMeaning(n, lang)}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
