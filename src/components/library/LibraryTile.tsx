import { Star } from "lucide-react";

export function LibraryTile({
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
        active ? "border-gold/60 bg-gold/5" : "border-border/70 bg-card/60 hover:bg-secondary/50"
      }`}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-full border border-gold/30 text-gold"
      >
        <Star className="size-3.5" />
      </span>
      <span className="font-arabic line-clamp-2 text-2xl leading-relaxed text-gold" dir="rtl">
        {arabic}
      </span>
      <span className="min-w-0">
        <span className="line-clamp-2 text-sm font-medium" dir="ltr">
          {title}
        </span>
        <span className="mt-1 line-clamp-2 text-xs text-muted-foreground">{subtitle}</span>
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
