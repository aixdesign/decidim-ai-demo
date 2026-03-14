# Translations

## Location
`src/app/translations.ts` — single exported object `t` with all static UI strings.

## Structure
```
t.header                  Header nav, search, breadcrumb
t.debateList              Page title, subtitle, filters, stats, empty state
t.debateDetail            Back button, AI questions section, contribution actions
t.debateCard              Stats labels, AI summary label, CTA button
t.contributionCard        Type badges, overlays, menu items, emoji picker
t.contributionModal       All form labels, placeholders, media zones, preview, buttons
t.contributionFilters     Filter/sort labels, result counts, clear button
t.aiSummary               Panel header, section titles, action buttons
```

## Usage
```tsx
import { t } from '../translations';  // from components/
import { t } from './translations';   // from same directory as translations.ts

<h1>{t.debateList.title}</h1>
<input placeholder={t.header.searchPlaceholder} />
```

## Dynamic Strings
Some values are functions for strings with interpolated variables:

```ts
t.contributionCard.repliesTitle(count)          // "3 Replies" / "1 Reply"
t.contributionCard.aiSummaryBody(tag)           // "This contribution argues for {tag}..."
t.contributionModal.titleReply(replyTo)         // "Reply to {name}"
t.contributionModal.replyingTo(name)            // "Replying to {name}"
t.contributionModal.textPlaceholderReply(name)  // "Write your reply to {name}…"
t.contributionModal.badgeImages(count)          // "1 image" / "3 images"
t.contributionFilters.resultCount(total)        // "5 contributions" / "1 contribution"
t.contributionFilters.resultCountFiltered(n, total)  // "3 of 10"
t.contributionFilters.clearFilters(count)       // "Clear filters (2)"
t.contributionFilters.filterByEmoji(emoji)      // "Filter by 👍"
t.aiSummary.lastUpdated(date)                   // "Last updated: Mar 3, 2026"
```

## Fallback Values
Some dynamic strings have companion fallback keys for when the variable is absent:
- `t.contributionModal.titleReplyFallback` → `"contribution"` (used when `replyTo` is undefined)
- `t.contributionModal.textPlaceholderReplyFallback` → `"this contribution"`
- `t.contributionCard.aiSummaryDefaultTag` → `"a key point"`

## Adding a New Language
The current setup is not a full i18n library — it's a plain TypeScript object. To add a language:

1. Duplicate `translations.ts` as e.g. `translations.ca.ts`
2. Replace all string values with Catalan equivalents
3. Swap the import in each component (or add a language selector + dynamic import)

For a production i18n setup, consider replacing the object with a library like `react-i18next` — the extraction is already done, making migration straightforward.
