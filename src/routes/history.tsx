import { createFileRoute } from "@tanstack/react-router";
import { Download, Trash2 } from "lucide-react";
import { useDhikr } from "@/lib/dhikr-store";
import { exportHistory } from "@/lib/export-history";

const H_TITLE = "Dhikr History & Streaks — Dhikr Counter";
const H_DESC =
  "Review your dhikr sessions day by day, see today's and this week's totals, track your streak and export the full record as JSON or CSV.";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: H_TITLE },
      { name: "description", content: H_DESC },
      { property: "og:title", content: H_TITLE },
      { property: "og:description", content: H_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/history" },
      { name: "twitter:title", content: H_TITLE },
      { name: "twitter:description", content: H_DESC },
    ],
    links: [{ rel: "canonical", href: "/history" }],
  }),
  component: HistoryPage,
});


function HistoryPage() {
  const { state, dispatch, hydrated, t, locale, todayTotal, weekTotal, streak } =
    useDhikr();

  const grouped = state.history.reduce<Record<string, typeof state.history>>(
    (acc, session) => {
      const date = new Date(session.completedAt).toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      (acc[date] ||= []).push(session);
      return acc;
    },
    {},
  );

  const stats = [
    { label: t.today, value: `${todayTotal}`, unit: t.totalCounts },
    { label: t.thisWeek, value: `${weekTotal}`, unit: t.totalCounts },
    { label: t.streakLabel, value: `${streak}`, unit: t.streak(streak) },
  ];

  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-fade-in">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.record}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{t.sessionHistory}</h1>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border/70 bg-card/60 p-4 text-center shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-gold" dir="ltr">
              {s.value}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.unit}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => exportHistory(state.history, "json")}
          disabled={!state.history.length}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary disabled:opacity-40"
        >
          <Download className="size-4" /> JSON
        </button>
        <button
          type="button"
          onClick={() => exportHistory(state.history, "csv")}
          disabled={!state.history.length}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary disabled:opacity-40"
        >
          <Download className="size-4" /> CSV
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "clearHistory" })}
          disabled={!state.history.length}
          className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-40"
        >
          <Trash2 className="size-4" /> {t.clear}
        </button>
      </div>

      {!state.history.length ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground">{t.emptyHistory}</p>
          <p className="mt-2 text-xs text-muted-foreground/70">{t.noStatsYet}</p>
        </div>
      ) : null}

      <div className="space-y-8">
        {Object.entries(grouped).map(([date, sessions]) => (
          <section key={date} className="space-y-3">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              {date}
            </h2>
            {sessions.map((session) => (
              <article
                key={session.id}
                className="rounded-2xl border border-border/70 bg-card/60 p-4 shadow-sm transition-colors hover:border-gold/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-arabic text-xl text-gold" dir="rtl">
                      {session.arabic}
                    </p>
                    <p className="mt-1 font-medium" dir="ltr">
                      {session.phrase}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-2xl font-semibold tabular-nums">
                      {session.count}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.of} {session.target}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {new Date(session.completedAt).toLocaleTimeString(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  · {session.durationMinutes} {t.minutes}
                </p>
                {session.note ? (
                  <p className="mt-3 border-s-2 border-gold/40 ps-3 text-sm text-muted-foreground">
                    {session.note}
                  </p>
                ) : null}
              </article>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
