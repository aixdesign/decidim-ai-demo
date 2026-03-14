# Project Overview

## What it is
A redesigned **democratic debate platform** for **Som Energia** — a Catalan renewable energy cooperative. Members propose ideas and debate topics (energy storage, tariffs, governance), and AI-powered features help surface insights and stimulate participation.

This is a **demo/prototype** exported from Figma Make and adapted for local development by DemxAI.

## Context
- Product name in production: **Participa** (Som Energia's participation platform)
- Debate content is in Catalan/Spanish; UI chrome is in English (extracted to `translations.ts`)
- Not connected to a backend — all data is static mock data

## Key Features
- Browse and search debates with status filtering
- View debate details: description, tags, dates, status
- Contribute via **text**, **image**, **audio** (with AI auto-transcription notice), or **video**
- **AI Summary panel** — overview, key highlights, detected topics
- **AI-generated suggested questions** to stimulate participation
- Per-contribution actions: translate, AI summarise, reply, flag
- Emoji reactions on contributions
- Threaded replies (read-only overlay on each card)
- Filter contributions by media type, date range, replies, emoji reaction, tag, keyword search
- Sort contributions by date, reply count, or reaction count

## Tech Stack
| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build | Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + `tw-animate-css` |
| Routing | React Router 7 (`createBrowserRouter`) |
| UI primitives | shadcn/ui (Radix UI) + MUI icons |
| Icons | Lucide React |
| Package manager | Yarn (lockfile present); also supports pnpm (override in `package.json`) |
| Node version | 22.21.0 (`.nvmrc`) |

## Status
- Frontend-only prototype; no API calls
- Assets are empty placeholder PNGs (see `src/assets/`) — need to be replaced with real images
- `src/imports/Desktop1.tsx` is a raw Figma Make export kept for reference; not used in routing
