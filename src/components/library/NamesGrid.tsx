import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ASMA_UL_HUSNA, nameMeaning } from "@/lib/asma-data";
import { useDhikr } from "@/lib/dhikr-store";
import { LibraryTile } from "./LibraryTile";

export default function NamesGrid({ query }: { query: string }) {
  const { t, lang, state, dispatch } = useDhikr();
  const navigate = useNavigate();
  const q = query.trim().toLowerCase();

  const names = useMemo(() => {
    if (!q) return ASMA_UL_HUSNA;
    return ASMA_UL_HUSNA.filter(
      (n) =>
        n.transliteration.toLowerCase().includes(q) ||
        n.arabic.includes(query.trim()) ||
        nameMeaning(n, lang).toLowerCase().includes(q),
    );
  }, [q, query, lang]);

  if (names.length === 0) {
    return (
      <p className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
        {t.noResults}
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {names.map((n) => {
        const id = `name-${n.n}`;
        return (
          <li key={n.n}>
            <LibraryTile
              active={state.selectedId === id}
              arabic={n.arabic}
              title={n.transliteration}
              subtitle={nameMeaning(n, lang)}
              badge={`${n.n} / 99`}
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
            />
          </li>
        );
      })}
    </ul>
  );
}
