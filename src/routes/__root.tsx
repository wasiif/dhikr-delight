import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  Flame,
  CircleDot,
  History,
  Settings,
  BookOpen,
} from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { DhikrProvider, useDhikr } from "../lib/dhikr-store";
import { SplashScreen } from "../components/SplashScreen";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dhikr Counter — Digital Tasbih" },
      {
        name: "description",
        content:
          "A calm digital tasbih for daily dhikr: targets, session notes, history and streaks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0b2a2c" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@500;600;700&family=Alegreya+Sans:wght@400;500;700&family=Noto+Naskh+Arabic:wght@400;500;700&family=Noto+Nastaliq+Urdu:wght@400;500;700&display=swap",
      },

      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const navItems = [
  { to: "/", key: "counter", icon: CircleDot },
  { to: "/library", key: "library", icon: BookOpen },
  { to: "/history", key: "history", icon: History },
  { to: "/settings", key: "settings", icon: Settings },
] as const;


function Chrome({ children }: { children: ReactNode }) {
  const { streak, t, hydrated } = useDhikr();
  const labels = { ...t.nav, ...t.nav2 } as Record<string, string>;

  if (!hydrated) return <SplashScreen />;

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
                <Link
                  key={to}
                  to={to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-gold font-medium" }}
                  activeOptions={{ exact: to === "/" }}
                >
                  {labels[key]}
                </Link>
              ))}
            </nav>
            <Link to="/" className="flex items-baseline gap-2" aria-label={t.appName}>
              <span className="font-arabic text-2xl leading-none text-gold">ذِكْر</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-28 pt-6 sm:pb-14">{children}</main>

      <nav aria-label={t.sectionNavLabel} className="fixed inset-x-0 bottom-0 z-20 border-t border-border/60 bg-background/95 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-3xl">
          {navItems.map(({ to, key, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex min-h-14 flex-1 flex-col items-center justify-center gap-1 py-2 text-xs text-muted-foreground transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: to === "/" }}
            >
              <Icon className="size-5" aria-hidden="true" />
              {labels[key]}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <DhikrProvider>
        <Chrome>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </Chrome>
      </DhikrProvider>
    </QueryClientProvider>
  );
}
