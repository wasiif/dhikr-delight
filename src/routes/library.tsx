import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { BookOpen, Search, Sparkles, Star } from "lucide-react";
import { useDhikr } from "@/lib/dhikr-store";
import { DEFAULT_DHIKRS, FATIMAH_ID } from "@/lib/dhikr-data";
import { TASBIH_COLLECTION, tr, type TasbihItem } from "@/lib/tasbih-collection";
import { LibraryTile } from "@/components/library/LibraryTile";
import { ListSkeleton, TileGridSkeleton } from "@/components/Skeletons";

const NamesGrid = lazy(() => import("@/components/library/NamesGrid"));
const DuasSection = lazy(() => import("@/components/library/DuasSection"));

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Tasbihs, 99 Names & Duas" },
      {
        name: "description",
        content:
          "One library for everything to count or read: named tasbihs, the 99 names of Allah, and guided morning and evening adhkar.",
      },
      { property: "og:title", content: "Library — Tasbihs, 99 Names & Duas" },
      {
        property: "og:description",
        content:
          "Named tasbihs, the 99 names of Allah and guided adhkar routines in one calm library.",
      },
    ],
  }),
  component: LibraryPage,
});

type Tab = "tasbihs" | "names" | "duas";

function LibraryPage() {
  const { t, lang, state, dispatch } = useDhikr();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("tasbihs");
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const q = query.trim().toLowerCase();

  // Paint the first tab immediately, then warm the heavier chunks in the background.
  useEffect(() => {
    setReady(true);
    const idle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 300);
    const handle = idle(() => {
      void import("@/components/library/NamesGrid");
      void import("@/components/library/DuasSection");
    });
    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(handle as number);
      else window.clearTimeout(handle as number);
    };
  }, []);

  const tasbihs = useMemo(() => {
    const extras: TasbihItem[] = DEFAULT_DHIKRS.filter(
      (d) => !["astaghfirullah", "la-hawla", "salawat"].includes(d.id),
    ).map((d) => ({
      id: d.id,
      arabic: d.arabic,
      transliteration: d.transliteration,
      translations: d.translations,
      target: d.defaultTarget,
    }));
    const all = [...TASBIH_COLLECTION, ...extras];
    if (!q) return all;
    return all.filter(
      (item) =>
        item.transliteration.toLowerCase().includes(q) ||
        item.arabic.includes(query.trim()) ||
        tr(item.translations, lang).toLowerCase().includes(q),
    );
  }, [q, query, lang]);

  const tabs: { id: Tab; label: string; icon: typeof Star }[] = [
    { id: "tasbihs", label: t.tabTasbihs, icon: Star },
    { id: "names", label: t.tabNames, icon: Sparkles },
    { id: "duas", label: t.tabDuas, icon: BookOpen },
  ];

  function openTasbih(item: TasbihItem) {
    if (item.sequenced) {
      dispatch({ type: "select", id: FATIMAH_ID });
    } else {
      dispatch({
        type: "activate",
        dhikr: {
          id: item.id,
          arabic: item.arabic,
          transliteration: item.transliteration,
          translations: item.translations,
          defaultTarget: item.target,
        },
        target: item.target,
      });
    }
    navigate({ to: "/" });
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.dhikrLibrary}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{t.libraryHeading}</h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          {t.libraryLead}
        </p>
      </header>

      <div className="relative">
        <Search
          className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchLibrary}
          aria-label={t.searchLibrary}
          className="w-full rounded-full border border-input bg-card/60 px-11 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring"
        />
      </div>

      <div
        role="tablist"
        aria-label={t.libraryHeading}
        className="flex gap-2 overflow-x-auto pb-1"
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            onPointerEnter={() => {
              if (id === "names") void import("@/components/library/NamesGrid");
              if (id === "duas") void import("@/components/library/DuasSection");
            }}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
              tab === id
                ? "border-gold/60 bg-gold/10 font-medium text-gold"
                : "border-border/70 text-muted-foreground hover:bg-secondary/60"
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {!ready ? (
        <TileGridSkeleton />
      ) : (
        <>
          {tab === "tasbihs" &&
            (tasbihs.length === 0 ? (
              <Empty text={t.noResults} />
            ) : (
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {tasbihs.map((item) => (
                  <li key={item.id}>
                    <LibraryTile
                      active={state.selectedId === item.id}
                      arabic={item.arabic}
                      title={item.transliteration}
                      subtitle={tr(item.translations, lang)}
                      badge={
                        item.reciteOnce
                          ? t.reciteOnce
                          : tr(item.sequence, lang) || `× ${item.target}`
                      }
                      note={tr(item.reference, lang)}
                      onClick={() => openTasbih(item)}
                    />
                  </li>
                ))}
              </ul>
            ))}

          {tab === "names" && (
            <Suspense fallback={<TileGridSkeleton count={12} />}>
              <NamesGrid query={query} />
            </Suspense>
          )}

          {tab === "duas" && (
            <Suspense fallback={<ListSkeleton />}>
              <DuasSection />
            </Suspense>
          )}
        </>
      )}

      <blockquote className="rounded-2xl border border-border/60 bg-card/40 p-5 text-center">
        <p className="font-arabic text-xl text-gold" dir="rtl">
          {t.verseArabic}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{t.verseText}</p>
        <footer className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">
          {t.verseRef}
        </footer>
      </blockquote>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <p className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
      {text}
    </p>
  );
}
