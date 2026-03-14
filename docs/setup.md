# Setup & Development

## Prerequisites
- Node.js 22.21.0 (use `nvm use` with the included `.nvmrc`)
- Yarn (primary package manager)

## Install & Run
```bash
yarn install
yarn dev        # starts Vite dev server at http://localhost:5173
yarn build      # production build to dist/
```

## Known Setup Fixes (already applied)
The original Figma Make export had two issues that were fixed:

1. **Missing entry point** — `index.html` referenced `/src/app/main.tsx` which didn't exist.
   - Fix: created `src/app/main.tsx` with standard React 19 `createRoot` mount.

2. **Wrong CSS path** — `index.html` referenced `/src/app/styles/index.css` but the file lives at `/src/styles/index.css`.
   - Fix: corrected the `<link>` href in `index.html`.

3. **Figma asset imports** — all `import x from "figma:asset/*.png"` imports were invalid outside Figma Make.
   - Fix: replaced with `import x from "@/assets/*.png"` and created placeholder files via `touch`.
   - The placeholder PNGs are **empty files** — replace them with real images when available.

## Placeholder Assets
Six placeholder PNGs exist in `src/assets/`:

| File | Used as |
|---|---|
| `77877d16231e3929ce0fcc5c47fcd37fa98f90bc.png` | Logo (Som Energia) |
| `imgBackground.png` | Background decoration |
| `3f97dbfef28c5689f310051ecb2a29701dce6c69.png` | Background (Desktop1 only) |
| `e86727915b760b1d3211638c4589c03f9b1022ba.png` | Image 1 (Desktop1 only) |
| `e22a0a6087a67f8cc7a87c63d1e6e5e1b6d129f5.png` | Image 2 (Desktop1 only) |
| `f01221802f7ba8cfbe22c3f70b32eff2b752eae9.png` | Page link image (Desktop1 only) |

Replace any of these with real PNGs of the same filename — no code changes needed.

## Vite Config
- `@vitejs/plugin-react` + `@tailwindcss/vite` plugins
- `@` alias → `./src`
- Raw asset imports enabled for `.svg` and `.csv`
