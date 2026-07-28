export type Session = {
  id: string;
  phrase: string;
  arabic: string;
  count: number;
  target: number;
  note: string;
  completedAt: number;
  durationMinutes: number;
};

function download(payload: string, fileName: string) {
  const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function exportHistory(history: Session[], format: "json" | "csv") {
  const rows = history.map((s) => ({
    phrase: s.phrase,
    arabic: s.arabic,
    count: s.count,
    target: s.target,
    note: s.note,
    completedAt: new Date(s.completedAt).toISOString(),
    durationMinutes: s.durationMinutes,
  }));

  if (format === "csv") {
    const header = [
      "Phrase",
      "Arabic",
      "Count",
      "Target",
      "Note",
      "Finished At",
      "Duration (min)",
    ];
    const q = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
    const body = rows.map((r) =>
      [
        q(r.phrase),
        q(r.arabic),
        r.count,
        r.target,
        q(r.note),
        r.completedAt,
        r.durationMinutes,
      ].join(","),
    );
    download([header.join(","), ...body].join("\n"), "dhikr-history.csv");
    return;
  }

  download(JSON.stringify(rows, null, 2), "dhikr-history.json");
}
