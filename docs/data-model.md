# Data Model

All types are defined in `src/app/data/mockData.ts`.

## Types

### `Debate`
```ts
{
  id: string
  title: string
  description: string
  participantCount: number
  contributionCount: number        // denormalised; not computed from contributions[]
  status: 'open' | 'deliberation' | 'closed'
  startDate?: string               // ISO 8601
  endDate?: string
  tags: string[]
  contributions: Contribution[]
  aiSummary?: AISummary
  aiQuestions?: string[]           // AI-generated prompts to stimulate participation
}
```

### `Contribution`
```ts
{
  id: string
  type: 'text' | 'image' | 'audio'   // 'video' exists in modal UI but not in mock data
  author: string
  avatar?: string                     // unused in current UI (initials used instead)
  timestamp: string                   // ISO 8601
  content: string                     // caption for image/audio; body text for text
  imageUrl?: string                   // external Unsplash URL in mock data
  audioUrl?: string                   // local path in mock data (non-functional)
  aiTranscript?: string               // English transcript for audio contributions
  tags?: string[]                     // e.g. 'argument', 'question', 'support', 'evidence'
  replyCount?: number                 // denormalised count
  reactions?: Reaction[]
  replies?: ContributionReply[]
}
```

### `Reaction`
```ts
{ emoji: string; count: number }
```

### `ContributionReply`
```ts
{
  id: string
  author: string
  timestamp: string
  summary: string    // AI-summarised reply text (not the full reply)
}
```

### `AISummary`
```ts
{
  overview: string
  keyPoints: string[]
  topics: string[]
  lastUpdated: string    // ISO 8601
}
```

## Mock Data
Three debates are included:

| id | Title (truncated) | Status | Contributions |
|---|---|---|---|
| `1` | Baterías autoinstalables 5kWh | `open` | 10 (text × 5, image × 3, audio × 2) |
| `2` | Millores tarifa indexada | `open` | 3 (text × 2, audio × 1) |
| `3` | Comunitats energètiques CEL | `deliberation` | 3 (image × 1, audio × 1, text × 1) |

- Debate 1 and 3 have `aiSummary` and `aiQuestions`
- Debate 2 has `aiSummary` but no `aiQuestions`
- Content languages: Catalan and Spanish; AI transcripts in English

## Notable Gaps vs. UI
- `contributionCount` on `Debate` is manually set and doesn't match `contributions.length`
- `ContributionType` doesn't include `'video'` — the modal supports video but no mock data uses it
- `avatar` field exists on `Contribution` but is unused; initials are derived from `author` name
- Reply `summary` is a pre-summarised string, not the original reply text
