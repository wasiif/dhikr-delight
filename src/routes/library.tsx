import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { useDhikr } from "@/lib/dhikr-store";
import { DEFAULT_DHIKRS, FATIMAH_ID, meaning } from "@/lib/dhikr-data";
import { ASMA_UL_HUSNA, nameMeaning } from "@/lib/asma-data";
import { ROUTINES, type Routine } from "@/lib/routine-data";
import { TASBIH_COLLECTION, tr, type TasbihItem } from "@/lib/tasbih-collection";

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
  const q = query.trim().toLowerCase();

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

  const names = useMemo(() => {
    if (!q) return ASMA_UL_HUSNA;
    return ASMA_UL_HUSNA.filter(
      (n) =>
        n.transliteration.toLowerCase().includes(q) ||
        n.arabic.includes(query.trim()) ||
        nameMeaning(n, lang).toLowerCase().includes(q),
    );
  }, [q, query, lang]);

  const tabs: { id: Tab; label: string; icon: typeof Star; count: number }[] = [
    { id: "tasbihs", label: t.tabTasbihs, icon: Star, count: tasbihs.length },
    { id: "names", label: t.tabNames, icon: Sparkles, count: names.length },
    { id: "duas", label: t.tabDuas, icon: BookOpen, count: ROUTINES.length },
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

      {tab === "tasbihs" &&
        (tasbihs.length === 0 ? (
          <Empty text={t.noResults} />
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {tasbihs.map((item) => (
              <li key={item.id}>
                <Tile
                  active={state.selectedId === item.id}
                  arabic={item.arabic}
                  title={item.transliteration}
                  subtitle={tr(item.translations, lang)}
                  badge={
                    item.reciteOnce
                      ? t.reciteOnce
                      : (tr(item.sequence, lang) || `× ${item.target}`)
                  }
                  note={tr(item.reference, lang)}
                  onClick={() => openTasbih(item)}
                />
              </li>
            ))}
          </ul>
        ))}

      {tab === "names" &&
        (names.length === 0 ? (
          <Empty text={t.noResults} />
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {names.map((n) => {
              const id = `name-${n.n}`;
              return (
                <li key={n.n}>
                  <Tile
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
        ))}

      {tab === "duas" && <DuasSection />}

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

function Tile({
  arabic,
  title,
  subtitle,
  badge,
  note,
  active,
  onClick,
}: {
  arabic: string;
  title: string;
  subtitle: string;
  badge?: string;
  note?: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex h-full w-full flex-col gap-3 rounded-3xl border p-5 text-start shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
        active
          ? "border-gold/60 bg-gold/5"
          : "border-border/70 bg-card/60 hover:bg-secondary/50"
      }`}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-full border border-gold/30 text-gold"
      >
        <Star className="size-3.5" />
      </span>
      <span
        className="font-arabic line-clamp-2 text-2xl leading-relaxed text-gold"
        dir="rtl"
      >
        {arabic}
      </span>
      <span className="min-w-0">
        <span className="line-clamp-2 text-sm font-medium" dir="ltr">
          {title}
        </span>
        <span className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {subtitle}
        </span>
      </span>
      <span className="mt-auto flex flex-col gap-2 pt-1">
        {badge && (
          <span className="w-fit rounded-full border border-gold/40 px-2.5 py-0.5 text-[11px] text-gold">
            {badge}
          </span>
        )}
        {note && (
          <span className="line-clamp-2 text-[11px] leading-snug text-muted-foreground/80">
            {note}
          </span>
        )}
      </span>
    </button>
  );
}

function DuasSection() {
  const { t, lang } = useDhikr();
  const [openId, setOpenId] = useState<Routine["id"] | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t.duasIntro}</p>
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
            className="flex w-full items-center justify-between gap-4 rounded-3xl border border-border/70 bg-card/60 p-5 text-start shadow-sm transition-colors hover:bg-secondary/60"
          >
            <span className="min-w-0">
              <span className="block text-lg font-semibold">
                {routine.titles[lang]}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {routine.windows[lang]} · {routine.steps.length}
              </span>
            </span>
            <Play className="size-5 shrink-0 text-gold" aria-hidden="true" />
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
    <section className="rounded-3xl border border-gold/40 bg-card/70 p-6 shadow-sm">
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
            <RotateCcw className="size-4" aria-hidden="true" />
            {t.restart}
          </button>
        </div>
      ) : (
        <>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.stepOf(index + 1, routine.steps.length)}
          </p>
          <p className="font-arabic mt-3 text-2xl leading-loose text-gold" dir="rtl">
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
              <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
              {t.previous}
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => i + 1)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
            >
              {t.next}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
