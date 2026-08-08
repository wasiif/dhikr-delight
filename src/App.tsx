import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Flame, CircleDot, History, Settings, BookOpen } from "lucide-react";

import { DhikrProvider, useDhikr } from "@/lib/dhikr-store";
import { SplashScreen } from "@/components/SplashScreen";
import CounterPage from "@/routes/index";
import LibraryPage from "@/routes/library";
import HistoryPage from "@/routes/history";
import SettingsPage from "@/routes/settings";

const navItems = [
  { to: "/", key: "counter", icon: CircleDot },
  { to: "/library", key: "library", icon: BookOpen },
  { to: "/history", key: "history", icon: History },
  { to: "/settings", key: "settings", icon: Settings },
] as const;

function AppShell() {
  const { streak, t, hydrated } = useDhikr();
  const labels = { ...t.nav, ...t.nav2 } as Record<string, string>;

  if (!hydrated) {
    return <SplashScreen />;
  }

  return (
    <div className="girih min-h-dvh bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur">
        <div
          dir="ltr"
          className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-4"
        >
          <span className="flex items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1 text-xs font-medium text-gold">
            <Flame className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{t.streakLabel}: </span>
            {t.streak(streak)}
          </span>
          <div className="flex items-center gap-4">
            <nav aria-label={t.mainNavLabel} className="hidden gap-5 text-sm sm:flex">
              {navItems.map(({ to, key }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `text-muted-foreground transition-colors ${
                      isActive ? "text-gold font-medium" : ""
                    }`
                  }
                >
                  {labels[key]}
                </NavLink>
              ))}
            </nav>
            <NavLink to="/" className="flex items-baseline gap-2" aria-label={t.appName}>
              <span className="font-arabic text-2xl leading-none text-gold">ذِكْر</span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-28 pt-6 sm:pb-14">
        <Routes>
          <Route path="/" element={<CounterPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <nav
        aria-label={t.sectionNavLabel}
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border/60 bg-background/95 backdrop-blur sm:hidden"
      >
        <div className="mx-auto flex max-w-3xl">
          {navItems.map(({ to, key, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex min-h-14 flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors ${
                  isActive ? "text-gold" : "text-muted-foreground"
                }`
              }
            >
              <Icon className="size-5" aria-hidden="true" />
              {labels[key]}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <NavLink
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DhikrProvider>
        <AppShell />
      </DhikrProvider>
    </BrowserRouter>
  );
}
