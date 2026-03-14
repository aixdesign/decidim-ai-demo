# AI-Enhanced Decidim Debates

A redesigned democratic debate interface built as a new [Decidim](https://decidim.org) component. Piloted with the example of [Som Energia](https://somenergia.coop), a Catalan renewable energy cooperative.

Civic platforms still expect people to participate through long text boxes and bureaucratic workflows. This project reimagines the Decidim "Debates" module as a multimodal civic space — closer to how people already communicate online — where AI quietly supports transcription, translation, and summarization in the background instead of taking over decision-making.

## Background

This work grew out of five years of facilitation experience with Decidim and research (originally with students and educators in 2022) into why civic tech consistently fails to reflect the expressive modes of digital-native and multilingual communities. Civic platforms rarely embrace the informal vernaculars — images, voice notes, audio — that dominate everyday communication. This project builds on that lineage alongside AIxD's **Slow AI** and **Small AI** research programs, which explore careful, situated uses of AI in public life rather than large extractive systems.

## What it does

Members propose and debate topics (energy storage, tariffs, governance). The interface lets them contribute via text, image, audio, or video, and surfaces AI-generated insights to help participants engage more effectively — while reducing the invisible care work of moderation and facilitation.

- Multi-media contributions: text, image, audio (with AI transcript), video
- AI summary panel: overview, key highlights, detected topics
- AI-generated translations to improve multi-language accessibility
- AI-generated speech-to-text transcripts for easier content comprehension
- AI-generated questions to stimulate participation
- Emoji reactions, threaded replies, flagging
- Filter contributions by type, date, replies, emoji, tag, keyword
- Browse and search debates by status
- Sort by date, reply count, or reaction count

## Stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS 4**
- **React Router 7**
- **shadcn/ui** (Radix UI primitives)
- **Lucide React** icons

## Getting started

```bash
nvm use          # Node 22.21.0
yarn install
yarn dev         # http://localhost:5173
```

## Project structure

```
src/
├── app/
│   ├── main.tsx              # Entry point
│   ├── routes.tsx            # / and /debate/:id
│   ├── translations.ts       # All static UI strings
│   ├── components/           # Header, cards, modal, filters, AI panel
│   ├── pages/                # DebateList, DebateDetail
│   └── data/mockData.ts      # Types + 3 mock debates (Catalan/Spanish content)
├── assets/                   # Placeholder PNGs (replace with real assets)
└── styles/                   # Tailwind + theme + fonts
```

See [`docs/`](docs/) for full documentation:
- [`overview.md`](docs/overview.md) — features and tech stack
- [`architecture.md`](docs/architecture.md) — structure, routing, data flow
- [`components.md`](docs/components.md) — component reference
- [`data-model.md`](docs/data-model.md) — TypeScript types and mock data
- [`setup.md`](docs/setup.md) — setup notes and known fixes
- [`translations.md`](docs/translations.md) — i18n system

## Roadmap

With continued support the project aims to:
- Integrate transcription, translation, and summarization into a deployable Decidim component
- Run pilot tests with communities and document the process
- Produce open guidelines and toolkits for replication
- Release all code under an open-source license with bilingual documentation

Success means seeing multimodal debate spaces adopted across participatory platforms — measured by deployments, diversity of contribution types, facilitator feedback, and participation from youth and multilingual communities.

## Notes

- Frontend-only prototype; no backend or API calls
- All debate content is mock data in Catalan/Spanish; UI and AI content is in English
- `src/imports/Desktop1.tsx` is the original Figma Make export, kept for reference
