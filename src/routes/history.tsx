import { createFileRoute } from "@tanstack/react-router";
import { Download, Trash2 } from "lucide-react";
import { useDhikr } from "@/lib/dhikr-store";
import { exportHistory } from "@/lib/export-history";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Session History — Dhikr Counter" },
      {
        name: "description",
        content:
          "Review your dhikr sessions grouped by day and export the full record as JSON or CSV.",
      },
      { property: "og:title", content: "Session History — Dhikr Counter" },
      {
        property: "og:description",
        content:
          "Review your dhikr sessions grouped by day and export the full record as JSON or CSV.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { state, dispatch, hydrated } = useDhikr();

  const grouped = state.history.reduce<Record<string, typeof state.history>>(
    (acc, session) => {
      const date = new Date(session.completedAt).toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      (acc[date] ||= []).push(session);
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Record
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Session history</h1>
      </header>

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
          <Trash2 className="size-4" /> Clear
        </button>
      </div>

      {hydrated && !state.history.length ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No sessions saved yet. Complete a session on the counter and it will appear
          here.
        </p>
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
                className="rounded-xl border border-border/70 bg-card/60 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-arabic text-xl text-gold">{session.arabic}</p>
                    <p className="mt-1 font-medium">{session.phrase}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold tabular-nums">
                      {session.count}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      of {session.target}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {new Date(session.completedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  · {session.durationMinutes} min
                </p>
                {session.note ? (
                  <p className="mt-3 border-l-2 border-gold/40 pl-3 text-sm text-muted-foreground">
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
