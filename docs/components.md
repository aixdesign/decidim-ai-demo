# Components

## Pages

### `DebateList`
- Displays a grid of all debates with search + status filter
- Stats banner (active debates, total participants, total contributions)
- "New Debate" button opens `ContributionModal` in `new-debate` mode
- No-results empty state

### `DebateDetail`
- Fetches debate by `id` from `mockDebates`; renders not-found state if missing
- Left column (2/3): debate header, AI questions panel, filters, contribution grid
- Right column (1/3): sticky `AISummaryPanel`
- Filter state (`FilterState`) lives here and is passed down to `ContributionFilters` + used to filter/sort `filteredContributions` (via `useMemo`)
- "Add contribution" card is always the first item in the contribution grid

## Shared Components

### `Header`
- Fixed top bar with logo, search input (non-functional), nav buttons, breadcrumb
- Logo image from `src/assets/` (placeholder)
- Breadcrumb: Home → Have your say → Forum (hardcoded nav hierarchy)

### `DebateCard`
- Displays debate summary: tags, title, description, participant/contribution counts
- Shows contribution type breakdown (text/image/audio icon counts)
- Image preview grid (up to 3) if debate has image contributions
- AI Summary preview snippet if `debate.aiSummary` present
- Links to `/debate/:id`

### `ContributionCard`
Portrait-ratio card (1:1.618 golden ratio) with three overlays:

| Overlay | Trigger | Content |
|---|---|---|
| AI Transcript | "Show AI transcript" button | Audio transcript text |
| Replies | Reply count badge | Thread of replies + "Read full thread" button |
| Translate | Context menu → Translate | `[AI Translation]` prefix + original content |
| AI Summarise | Context menu → AI Summarise | Generated summary paragraph |

- Media area (top 61.8%): image / audio waveform player / text excerpt
- Info area (bottom 38.2%): author, timestamp, tags, reactions, menu
- Emoji reactions: toggle on/off, local state only, picker with 15 emoji options
- Context menu: Translate, AI Summarise, Reply (opens `ContributionModal`), Flag/Unflag

### `ContributionModal`
Two-step wizard (Compose → Preview) with three modes:

| Mode | Title | Special fields |
|---|---|---|
| `contribution` | New contribution | — |
| `reply` | Reply to {name} | Replying-to label |
| `new-debate` | Start a new debate | Title, description, tags, status |

Media zones (independently togglable):
- **Image**: multi-image upload with preview grid
- **Audio**: record (simulated timer + animated waveform) or upload; AI transcription notice on recorded audio
- **Video**: record (simulated) or upload; "Recorded" badge overlay

Step 2 (Preview): renders a live preview card with author "You" and all added content.

### `ContributionFilters`
Collapsible filter/sort panel (collapsed by default):
- **Search**: keyword search across content, transcript, and author
- **Type pills**: All / Text / Images / Audio / Video
- **Filter row**: date range (Today / Last week / Last month), replies (With / Without), emoji reaction filter, tag filter
- **Sort row**: Date / Replies / Reactions (each toggleable asc/desc)
- Active filter count badge; "Clear filters (n)" button
- Result count: "N contributions" or "N of M" when filtered

### `AISummaryPanel`
Sticky sidebar panel with:
- Participant + contribution count stats
- Overview paragraph
- Key highlights list (numbered)
- Detected topics (pill tags)
- Last updated timestamp
- Regenerate / Export buttons (non-functional)

## UI Primitives (`components/ui/`)
Full set of shadcn/ui components (accordion, alert, avatar, button, calendar, card, carousel, chart, checkbox, command, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip).

Most are unused in the current pages — included as the full shadcn/ui kit from the Figma Make export.
