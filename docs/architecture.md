# Architecture

## File Structure
```
src/
├── app/
│   ├── main.tsx            # React root entry point
│   ├── App.tsx             # RouterProvider wrapper
│   ├── routes.tsx          # Route definitions
│   ├── translations.ts     # All static UI strings
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── DebateCard.tsx
│   │   ├── ContributionCard.tsx
│   │   ├── ContributionModal.tsx
│   │   ├── ContributionFilters.tsx
│   │   ├── AISummaryPanel.tsx
│   │   └── ui/             # shadcn/ui primitives (accordion, dialog, etc.)
│   ├── pages/
│   │   ├── DebateList.tsx
│   │   └── DebateDetail.tsx
│   ├── data/
│   │   └── mockData.ts     # Type definitions + 3 mock debates
│   └── styles/
│       ├── index.css       # @import entry (fonts + tailwind + theme)
│       ├── fonts.css
│       ├── tailwind.css    # @import 'tailwindcss' + source glob
│       └── theme.css
├── assets/                 # Static image assets (placeholder PNGs)
│   └── *.png
├── imports/
│   └── Desktop1.tsx        # Raw Figma Make export (reference only)
└── styles/ → src/styles/  (same as app/styles — mounted at /src/styles/ in index.html)
```

> Note: `src/styles/` and `src/app/styles/` are the same directory. `index.html` references `/src/styles/index.css`.

## Routing
| Path | Component | Description |
|---|---|---|
| `/` | `DebateList` | Grid of debate cards with search/filter |
| `/debate/:id` | `DebateDetail` | Full debate view with contributions |

- Uses `createBrowserRouter` from React Router 7
- No nested layouts; `Header` is rendered inside each page

## Data Flow
```
mockData.ts
  └── mockDebates[]
        ├── DebateList → maps to DebateCard[]
        └── DebateDetail (finds by id)
              ├── ContributionFilters (filter/sort state lives in DebateDetail)
              ├── ContributionCard[] (filtered + sorted contributions)
              └── AISummaryPanel (debate.aiSummary)
```

- All state is local React state — no global store, no context
- `ContributionFilters` is fully controlled: `filters` state + `onChange` live in `DebateDetail`
- `ContributionModal` is used in 3 places: new debate (DebateList), new contribution (DebateDetail), reply (ContributionCard)

## Styling Approach
- Tailwind CSS 4 with Vite plugin (`@tailwindcss/vite`)
- Source scanning configured via `@source '../**/*.{js,ts,jsx,tsx}'` in `tailwind.css`
- Brand colours used as inline hex values (`#afb5e8`, `#0c4c27`, `#c8ff6b`, `#0B2E34`, `#CDFF80`, `#f0f3ec`)
- No CSS modules; all styling via Tailwind utility classes
- `tw-animate-css` provides `animate-in`, `fade-in`, `slide-in-from-*` utilities

## Path Aliases
- `@` → `src/` (configured in `vite.config.ts`)
- Used for asset imports: `@/assets/*.png`
