import { useState } from 'react';
import {
  FileText, Image as ImageIcon, Mic, Video, LayoutGrid,
  MessageSquare, MessageSquareOff, Calendar, SortAsc, ChevronDown, X, Tag, Filter, Search
} from 'lucide-react';
import { t } from '../translations';

export type MediaTypeFilter = 'all' | 'text' | 'image' | 'audio' | 'video';
export type DateFilter = 'all' | 'today' | 'week' | 'month';
export type RepliesFilter = 'all' | 'with' | 'without';
export type SortBy = 'date' | 'replies' | 'reactions';

export interface FilterState {
  mediaType: MediaTypeFilter;
  date: DateFilter;
  replies: RepliesFilter;
  emoji: string | null;
  tag: string | null;
  search: string;
  sortBy: SortBy;
  sortDir: 'desc' | 'asc';
}

interface ContributionFiltersProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  availableTags: string[];
  availableEmojis: string[];
  resultCount: number;
  totalCount: number;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

const MEDIA_TYPES: { value: MediaTypeFilter; label: string; icon: React.ReactNode }[] = [
  { value: 'all',   label: t.contributionFilters.mediaAll,    icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { value: 'text',  label: t.contributionFilters.mediaText,   icon: <FileText   className="w-3.5 h-3.5" /> },
  { value: 'image', label: t.contributionFilters.mediaImages, icon: <ImageIcon  className="w-3.5 h-3.5" /> },
  { value: 'audio', label: t.contributionFilters.mediaAudio,  icon: <Mic        className="w-3.5 h-3.5" /> },
  { value: 'video', label: t.contributionFilters.mediaVideo,  icon: <Video      className="w-3.5 h-3.5" /> },
];

const DATE_OPTIONS: { value: DateFilter; label: string }[] = [
  { value: 'all',   label: t.contributionFilters.dateAnyTime  },
  { value: 'today', label: t.contributionFilters.dateToday    },
  { value: 'week',  label: t.contributionFilters.dateLastWeek },
  { value: 'month', label: t.contributionFilters.dateLastMonth },
];

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'date',      label: t.contributionFilters.sortDate      },
  { value: 'replies',   label: t.contributionFilters.sortReplies   },
  { value: 'reactions', label: t.contributionFilters.sortReactions },
];

function Pill({
  active,
  onClick,
  children,
  className = '',
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
        active
          ? 'bg-[#0B2E34] border-[#0B2E34] text-white'
          : 'bg-white border-gray-200 text-gray-600 hover:border-[#0B2E34]/40 hover:text-[#0B2E34] hover:bg-[#f0f3ec]'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default function ContributionFilters({
  filters,
  onChange,
  availableTags,
  availableEmojis,
  resultCount,
  totalCount,
  isExpanded: isExpandedProp,
  onExpandedChange,
}: ContributionFiltersProps) {
  const [isExpandedInternal, setIsExpandedInternal] = useState(false);
  const isExpanded = isExpandedProp !== undefined ? isExpandedProp : isExpandedInternal;
  const setIsExpanded = (value: boolean) => {
    setIsExpandedInternal(value);
    onExpandedChange?.(value);
  };

  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });

  const activeCount = [
    filters.mediaType !== 'all',
    filters.date !== 'all',
    filters.replies !== 'all',
    filters.emoji !== null,
    filters.tag !== null,
    (filters.search || '').length > 0,
  ].filter(Boolean).length;

  const clearAll = () =>
    onChange({ mediaType: 'all', date: 'all', replies: 'all', emoji: null, tag: null, search: '', sortBy: filters.sortBy, sortDir: filters.sortDir });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Toggle Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">
            {t.contributionFilters.filtersAndSorting}
          </span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 bg-[#0B2E34] text-white text-xs rounded-full font-medium">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {resultCount === totalCount
              ? t.contributionFilters.resultCount(totalCount)
              : t.contributionFilters.resultCountFiltered(resultCount, totalCount)}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="p-4 pt-0 space-y-4 border-t border-gray-100">

          {/* Search Row */}
          <div className="pt-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0B2E34] transition-colors" />
              <input
                type="text"
                value={filters.search || ''}
                onChange={(e) => set({ search: e.target.value })}
                placeholder={t.contributionFilters.searchPlaceholder}
                className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2E34]/20 focus:border-[#0B2E34] transition-all"
              />
              {(filters.search || '').length > 0 && (
                <button
                  onClick={() => set({ search: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* ── Row 1: Media type pills ─────────────────────── */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-14 flex-shrink-0">{t.contributionFilters.typeLabel}</span>
            <div className="flex gap-1.5 flex-wrap">
              {MEDIA_TYPES.map(media => (
                <Pill key={media.value} active={filters.mediaType === media.value} onClick={() => set({ mediaType: media.value })}>
                  {media.icon}
                  {media.label}
                </Pill>
              ))}
            </div>
          </div>

          {/* ── Row 2: Date + Replies + Emoji + Tag ────────── */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-14 flex-shrink-0">{t.contributionFilters.filterLabel}</span>

            {/* Date */}
            <div className="flex gap-1.5 flex-wrap">
              {DATE_OPTIONS.filter(d => d.value !== 'all').map(d => (
                <Pill
                  key={d.value}
                  active={filters.date === d.value}
                  onClick={() => set({ date: filters.date === d.value ? 'all' : d.value })}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {d.label}
                </Pill>
              ))}
            </div>

            <div className="w-px h-4 bg-gray-200 flex-shrink-0" />

            {/* Replies */}
            <Pill
              active={filters.replies === 'with'}
              onClick={() => set({ replies: filters.replies === 'with' ? 'all' : 'with' })}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {t.contributionFilters.withReplies}
            </Pill>
            <Pill
              active={filters.replies === 'without'}
              onClick={() => set({ replies: filters.replies === 'without' ? 'all' : 'without' })}
            >
              <MessageSquareOff className="w-3.5 h-3.5" />
              {t.contributionFilters.withoutReplies}
            </Pill>

            {/* Emoji reactions */}
            {availableEmojis.length > 0 && (
              <>
                <div className="w-px h-4 bg-gray-200 flex-shrink-0" />
                <div className="flex gap-1 flex-wrap">
                  {availableEmojis.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => set({ emoji: filters.emoji === emoji ? null : emoji })}
                      title={t.contributionFilters.filterByEmoji(emoji)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm border transition-all hover:scale-110 ${
                        filters.emoji === emoji
                          ? 'bg-[#0B2E34] border-[#0B2E34] ring-2 ring-[#0B2E34]/20'
                          : 'bg-white border-gray-200 hover:border-[#0B2E34]/40'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Tag pills */}
            {availableTags.length > 0 && (
              <>
                <div className="w-px h-4 bg-gray-200 flex-shrink-0" />
                <div className="flex gap-1.5 flex-wrap">
                  {availableTags.map(tag => (
                    <Pill
                      key={tag}
                      active={filters.tag === tag}
                      onClick={() => set({ tag: filters.tag === tag ? null : tag })}
                      className="capitalize"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      {tag}
                    </Pill>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Row 3: Sort + result count + clear ─────────── */}
          <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-14 flex-shrink-0">{t.contributionFilters.sortLabel}</span>

            <div className="flex gap-1.5 flex-wrap">
              {SORT_OPTIONS.map(s => (
                <button
                  key={s.value}
                  onClick={() => {
                    if (filters.sortBy === s.value) {
                      set({ sortDir: filters.sortDir === 'desc' ? 'asc' : 'desc' });
                    } else {
                      set({ sortBy: s.value, sortDir: 'desc' });
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    filters.sortBy === s.value
                      ? 'bg-[#CDFF80] border-[#CDFF80] text-[#0B2E34]'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <SortAsc className={`w-3.5 h-3.5 transition-transform ${filters.sortBy === s.value && filters.sortDir === 'asc' ? 'rotate-180' : ''}`} />
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex-1" />

            {/* Clear all */}
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {t.contributionFilters.clearFilters(activeCount)}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
