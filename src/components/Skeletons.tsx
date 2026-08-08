/** Lightweight placeholders shown while lazy chunks / hydration settle. */

export function TileSkeleton() {
  return (
    <div className="flex h-full w-full animate-pulse flex-col gap-3 rounded-3xl border border-border/60 bg-card/40 p-5">
      <span className="size-8 rounded-full bg-muted/70" />
      <span className="h-6 w-3/4 self-end rounded bg-muted/70" />
      <span className="h-3 w-2/3 rounded bg-muted/60" />
      <span className="h-3 w-1/2 rounded bg-muted/50" />
      <span className="mt-auto h-4 w-14 rounded-full bg-muted/60" />
    </div>
  );
}

export function TileGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <TileSkeleton />
        </li>
      ))}
    </ul>
  );
}

export function ListSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-24 w-full animate-pulse rounded-3xl border border-border/60 bg-card/40"
        />
      ))}
    </div>
  );
}

export function CounterSkeleton() {
  return (
    <div className="mx-auto max-w-xl animate-pulse space-y-8 py-4" aria-hidden="true">
      <div className="flex flex-col items-center gap-3">
        <span className="h-3 w-28 rounded bg-muted/60" />
        <span className="h-9 w-56 rounded bg-muted/70" />
        <span className="h-5 w-36 rounded bg-muted/60" />
      </div>
      <span className="mx-auto block size-72 max-w-[85vw] rounded-full border-[14px] border-muted/50 sm:size-80" />
      <div className="flex justify-center gap-2">
        <span className="h-11 w-14 rounded-full bg-muted/60" />
        <span className="h-11 w-16 rounded-full bg-muted/70" />
      </div>
    </div>
  );
}
