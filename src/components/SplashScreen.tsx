import { useDhikr } from "@/lib/dhikr-store";

export function SplashScreen() {
  const { t } = useDhikr();

  return (
    <div
      className="girih fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <span
        className="relative flex size-28 items-center justify-center rounded-full border border-gold/30"
        aria-hidden="true"
      >
        <span className="absolute inset-2 rotate-45 rounded-[1.75rem] border border-gold/25" />
        <span className="absolute inset-2 rounded-[1.75rem] border border-gold/25" />
        <span className="font-arabic text-3xl text-gold">ذِكْر</span>
      </span>
      <p className="text-2xl font-semibold tracking-wide">{t.appName}</p>
      <p className="text-sm text-muted-foreground">{t.splashTagline}</p>
    </div>
  );
}
