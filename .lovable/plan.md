## Context

This Lovable project is still the blank starter — the DhikrCounter code from GitHub is not in it, and the project's git remote is Lovable's own storage, not your repo. Branch creation isn't something I can do from chat (it's a Lovable UI / Labs feature), so your GitHub `main` stays untouched either way: nothing I do here writes to that repo. If you later connect Git sync, we can push this work as `islamic-redesign`.

Plan: rebuild the app's full feature set in this project's stack, with the Islamic redesign applied.

## What gets built

Feature parity with your repo, re-implemented:

- Counter: current dhikr phrase, count vs target, animated progress, +1/+5/+10 and -1/-5, reset, complete session
- Phrase library: the 5 defaults (SubhanAllah, Alhamdulillah, Allahu Akbar, La ilaha illallah, Astaghfirullah) with Arabic script + transliteration + translation, plus user-added custom phrases
- Settings: target repetitions (default 33), phrase selection, sound / vibration / dark mode toggles
- Session history: grouped by date, session notes, JSON + CSV export, clear history
- Daily streak tracking
- Everything persists to `localStorage` under the same key shape, guarded for SSR

## Design direction

Islamic-inspired, deliberately not generic:

- Deep midnight-teal and warm sand palette with muted gold accents; light and dark themes
- Geometric star-and-tessellation motifs as subtle background texture, not clip art
- Arabic phrase set in a proper Arabic display face (Amiri / Scheherazade via a `<link>` in the root route), Latin text in a clean humanist sans
- Counter as a large circular tasbih dial: the ring fills as you count, tap-anywhere-to-increment target, gentle bead-pulse animation on each tap and a completion glow at target
- All colors as semantic tokens in `src/styles.css` — no hardcoded color utilities

## Structure

- `/` — the counter (replaces the placeholder index route)
- `/history` — session history and exports
- `/settings` — phrases, target, toggles
- Shared shell (header with streak badge, bottom nav on mobile) in `__root.tsx`

## Technical details

- Stack stays TanStack Start + React 19 + Tailwind v4 + shadcn/ui (already installed); no new router, no Vite/plain-CSS port
- State: one `useDhikr` hook backed by `useReducer` + a localStorage sync effect, shared via a small context provider mounted in `__root.tsx` — replaces the prop-drilling from `App.jsx`
- Phrase catalog moves out of the component into `src/lib/dhikr-data.ts` (typed `Dhikr[]` with `arabic`, `transliteration`, `translation`, `defaultTarget`); custom phrases merge in from storage
- Hydration-safe: storage reads happen in `useEffect`, never in `useState` initializers
- Export logic (JSON/CSV blob download) lifted to `src/lib/export-history.ts`
- Per-route `head()` metadata with distinct titles/descriptions
- No backend needed — fully client-side, same as your original
