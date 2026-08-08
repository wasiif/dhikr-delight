# Architecture

Reference notes for anyone extending the Dhikr Counter.

## Rendering model

TanStack Start renders on the server and hydrates in the browser.

- `src/routes/__root.tsx` owns the `<html>` shell (`HeadContent`, `Scripts`), sitewide
  head defaults, the header/nav chrome, and the providers (`QueryClientProvider`,
  `DhikrProvider`).
- Every file in `src/routes/` becomes a route; `src/routeTree.gen.ts` is generated —
  never edit it by hand.
- All persisted state lives in `localStorage`, which is browser-only. The store starts
  with deterministic defaults on the server, then loads real values in an effect and
  flips `hydrated` to `true`. Screens render `SplashScreen`/skeletons until then, which
  is what keeps SSR and client markup identical.

## State: `src/lib/dhikr-store.tsx`

A single React Context wrapping `useReducer`.

State shape (persisted as one JSON blob):

```text
selectedId      active dhikr id
count, target   current progress
phrases         built-in + user-added adhkar
history         completed sessions [{ id, dhikrId, count, completedAt }]
lang            "en" | "ur"
theme           "dark" | "light"
scale           global text-size multiplier (0.9 – 1.25)
sound, haptics, autoReset
```

Key actions: `tap`, `reset`, `select`, `activate` (load an arbitrary dhikr + target),
`addPhrase`, `setTarget`, `setLang`, `setTheme`, `wipe`.

Derived values exposed by `useDhikr()`: `active`, `progress`, `todayTotal`,
`weekTotal`, `streak`, `t` (translations), `locale`, `isFatimah`, `fatimahStage`,
`fatimahSteps`, `hydrated`.

Side effects handled in the provider:

- write state back to `localStorage` on change
- set `document.documentElement.dir` (`rtl` for Urdu) and `lang`
- toggle the `dark` class and the `--app-scale` CSS variable
- WebAudio click + `navigator.vibrate` haptics on tap and milestone

### Tasbih Fatimah

`FATIMAH_STEPS` in `src/lib/dhikr-data.ts` defines the three stages (33/33/34). When the
active id is `FATIMAH_ID`, the reducer advances the stage as thresholds are crossed and
fires a distinct vibration pattern; the counter screen reads `fatimahStage` to show which
phrase is current.

## Content data

Plain, typed TypeScript modules — no database, no network:

| File                   | Contents                                                                |
| ---------------------- | ----------------------------------------------------------------------- |
| `dhikr-data.ts`        | Default adhkar + Tasbih Fatimah steps                                   |
| `tasbih-collection.ts` | Named tasbihs: Arabic, transliteration, translations, target, reference |
| `asma-data.ts`         | The 99 Names with transliteration and meaning                           |
| `routine-data.ts`      | Morning & evening adhkar sequences                                      |

Translations for a data item live on the item itself (`translations: { en, ur }`) and are
resolved with the `tr()` helper; UI strings live in the `i18n*.ts` dictionaries.

To add a tasbih: append an entry to `TASBIH_COLLECTION` with `en` and `ur` translations
and a verifiable reference (or none at all). It appears in the Library grid automatically.

## Internationalisation

- Dictionaries are split across `i18n.ts`, `i18n-extra.ts`, `i18n-library.ts`,
  `i18n-polish.ts` and merged into the `t` object.
- Never hardcode user-visible strings in components — add a key to the dictionary.
- Layout must work in both directions: use logical utilities (`ms-*`, `me-*`, `start-*`,
  `end-*`, `text-start`) instead of `left`/`right`, and add `rtl-mirror` to directional
  icons.
- Urdu (Nastaliq) needs extra vertical room: `styles.css` raises line-height and disables
  line clamping for Urdu text.

## Styling

Tailwind v4 configured entirely in `src/styles.css` — no `tailwind.config.js`.

- `@theme` defines OKLCH tokens: midnight-teal background, sand foreground, `--gold`
  accent, card/border/muted roles. Light mode overrides the same tokens.
- Never hardcode colours (`text-white`, `bg-[#...]`) in components — use the semantic
  tokens so both themes and RTL keep working.
- Custom utilities: `.girih` (low-opacity 8-point star lattice background),
  `.font-arabic`, `.rtl-mirror`.
- Animations: `animate-fade-in`, `bead-pulse` on tap, `completion-glow` and
  `shimmer-sweep` on reaching a target.

## Performance

- `NamesGrid` and `DuasSection` are `React.lazy` chunks; the Library paints the Tasbihs
  tab immediately, then warms the other chunks on `requestIdleCallback` and on tab hover.
- Skeletons (`src/components/Skeletons.tsx`) cover hydration and lazy loading so no
  screen shows a blank flash.
- Google Fonts are trimmed to the weights actually used and preconnected in `__root.tsx`.

## SEO

- Each leaf route's `head()` returns its own `title`, `description`, `og:*`,
  `twitter:*`, a self-referencing `canonical`, and where relevant JSON-LD `scripts`.
  Title is a `meta` entry, not a top-level field.
- `canonical` lives on leaf routes only — a root canonical would be emitted twice.
- `src/routes/sitemap[.]xml.ts` is a server route returning XML; paths are relative until
  `BASE_URL` is filled in with a real domain.

## Conventions

- Add a route file before linking to it; every parent route must render `<Outlet />`.
- Keep components small and presentational; business rules belong in the store or `lib/`.
- No backend calls — if a feature needs persistence beyond the device, that is a
  deliberate architecture change, not an incremental edit.
