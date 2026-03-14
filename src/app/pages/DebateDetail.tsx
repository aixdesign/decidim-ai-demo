import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Plus,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import Header from "../components/Header";
import ContributionCard from "../components/ContributionCard";
import AISummaryPanel from "../components/AISummaryPanel";
import ContributionModal from "../components/ContributionModal";
import ContributionFilters, {
  FilterState,
} from "../components/ContributionFilters";
import { mockDebates } from "../data/mockData";
import imgBackground from "@/assets/imgBackground.png";
import { t } from "../translations";

const DEFAULT_FILTERS: FilterState = {
  mediaType: "all",
  date: "all",
  replies: "all",
  emoji: null,
  tag: null,
  search: "",
  sortBy: "date",
  sortDir: "desc",
};

function isWithinRange(
  timestamp: string,
  range: FilterState["date"],
): boolean {
  if (range === "all") return true;
  const date = new Date(timestamp).getTime();
  const now = Date.now();
  const DAY = 86_400_000;
  if (range === "today") return now - date < DAY;
  if (range === "week") return now - date < 7 * DAY;
  if (range === "month") return now - date < 30 * DAY;
  return true;
}

export default function DebateDetail() {
  const { id } = useParams();
  const debate = mockDebates.find((d) => d.id === id);
  const [filters, setFilters] =
    useState<FilterState>(DEFAULT_FILTERS);
  const [contributionModalOpen, setContributionModalOpen] =
    useState(false);
  const [questionsExpanded, setQuestionsExpanded] =
    useState(true);

  if (!debate) {
    return (
      <div className="min-h-screen bg-[#f0f3ec]">
        <Header />
        <div className="max-w-[1536px] mx-auto px-12 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.debateDetail.notFoundTitle}
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-700"
            >
              {t.debateDetail.notFoundLink}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Derived filter options from actual data ───── */
  const availableTags = useMemo(() => {
    const s = new Set<string>();
    debate.contributions.forEach((c) =>
      c.tags?.forEach((tag) => s.add(tag)),
    );
    return [...s].sort();
  }, [debate.contributions]);

  const availableEmojis = useMemo(() => {
    const s = new Set<string>();
    debate.contributions.forEach((c) =>
      c.reactions?.forEach((r) => s.add(r.emoji)),
    );
    return [...s];
  }, [debate.contributions]);

  /* ── Filter + sort ────────────────────────────── */
  const filteredContributions = useMemo(() => {
    let result = debate.contributions.filter((c) => {
      if (
        filters.mediaType !== "all" &&
        c.type !== filters.mediaType
      )
        return false;
      if (!isWithinRange(c.timestamp, filters.date))
        return false;
      if (
        filters.replies === "with" &&
        (c.replyCount ?? 0) === 0
      )
        return false;
      if (
        filters.replies === "without" &&
        (c.replyCount ?? 0) > 0
      )
        return false;
      if (
        filters.emoji &&
        !c.reactions?.some((r) => r.emoji === filters.emoji)
      )
        return false;
      if (filters.tag && !c.tags?.includes(filters.tag))
        return false;

      if ((filters.search || '').trim().length > 0) {
        const query = filters.search.toLowerCase();
        const inContent = c.content.toLowerCase().includes(query);
        const inTranscript = c.aiTranscript?.toLowerCase().includes(query) ?? false;
        const inAuthor = c.author.toLowerCase().includes(query);
        if (!inContent && !inTranscript && !inAuthor) return false;
      }

      return true;
    });

    result = [...result].sort((a, b) => {
      let diff = 0;
      if (filters.sortBy === "date")
        diff =
          new Date(a.timestamp).getTime() -
          new Date(b.timestamp).getTime();
      if (filters.sortBy === "replies")
        diff = (a.replyCount ?? 0) - (b.replyCount ?? 0);
      if (filters.sortBy === "reactions")
        diff =
          (a.reactions?.reduce((s, r) => s + r.count, 0) ?? 0) -
          (b.reactions?.reduce((s, r) => s + r.count, 0) ?? 0);
      return filters.sortDir === "desc" ? -diff : diff;
    });

    return result;
  }, [debate.contributions, filters]);

  return (
    <div className="min-h-screen bg-[#f0f3ec] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={imgBackground}
          alt=""
          className="absolute -top-[500%] left-0 w-1/2 h-auto opacity-50"
        />
      </div>

      <Header />

      <main className="relative max-w-[1536px] mx-auto px-12 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#2b6342] hover:text-[#0c4c27] mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>{t.debateDetail.backButton}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Debate Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {debate.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-[#afb5e8] text-[#0c4c27] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-normal text-[#020203] mb-4 tracking-tight">
                {debate.title}
              </h1>

              {/* Description */}
              <p className="text-[#3e4c5c] mb-6 leading-relaxed">
                {debate.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm text-[#3e4c5c] pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {debate.startDate || t.debateDetail.dateIndefinite}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${debate.status === "open"
                        ? "bg-green-500"
                        : debate.status === "deliberation"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                  />
                  <span className="capitalize">
                    {debate.status}
                  </span>
                </div>
              </div>
            </div>

            {/* AI-Generated Questions */}
            {debate.aiQuestions &&
              debate.aiQuestions.length > 0 && (
                <div className="bg-gradient-to-br from-white to-[#f0f3ec] rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() =>
                      setQuestionsExpanded(!questionsExpanded)
                    }
                    className="w-full flex items-center gap-2 p-6 hover:bg-white/50 transition-colors text-left"
                  >
                    <Sparkles className="w-5 h-5 text-[#afb5e8]" />
                    <h2 className="text-lg font-medium text-[#020203]">
                      {t.debateDetail.suggestedQuestionsTitle}
                    </h2>
                    <span className="px-2 py-0.5 text-xs bg-[#afb5e8]/20 text-[#0B2E34] rounded-full font-medium">
                      {t.debateDetail.aiGeneratedBadge}
                    </span>
                    <ChevronDown
                      className={`ml-auto w-5 h-5 text-gray-400 transition-transform ${questionsExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {questionsExpanded && (
                    <div className="px-6 pb-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-[#3e4c5c] mb-4">
                        {t.debateDetail.aiQuestionsDescription}
                      </p>
                      <div className="space-y-2">
                        {debate.aiQuestions
                          .slice(0, 3)
                          .map((question, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setContributionModalOpen(true);
                              }}
                              className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-[#afb5e8] hover:bg-[#afb5e8]/5 transition-all group"
                            >
                              <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#afb5e8]/20 text-[#0B2E34] text-xs font-semibold flex items-center justify-center mt-0.5">
                                  {index + 1}
                                </span>
                                <p className="text-sm text-[#020203] leading-relaxed group-hover:text-[#0B2E34]">
                                  {question}
                                </p>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            {/* Filters */}
            <ContributionFilters
              filters={filters}
              onChange={setFilters}
              availableTags={availableTags}
              availableEmojis={availableEmojis}
              resultCount={filteredContributions.length}
              totalCount={debate.contributions.length}
            />

            {/* Contributions */}
            <div>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Add contribution card — always first */}
                <button
                  onClick={() => setContributionModalOpen(true)}
                  className="relative flex flex-col items-center justify-center bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-[#2b6342] hover:bg-[#f0f3ec] transition-all group"
                  style={{ aspectRatio: "1 / 1.618" }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-300 group-hover:border-[#2b6342] group-hover:bg-[#2b6342] flex items-center justify-center transition-all">
                      <Plus className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-gray-400 group-hover:text-[#2b6342] transition-colors">
                      {t.debateDetail.addContributionButton}
                    </span>
                  </div>
                </button>

                {filteredContributions.length === 0 ? (
                  <div className="col-span-2 flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
                    <span className="text-3xl">🔍</span>
                    <p className="text-sm">
                      {t.debateDetail.noContributionsMessage}
                    </p>
                  </div>
                ) : (
                  filteredContributions.map((contribution) => (
                    <ContributionCard
                      key={contribution.id}
                      contribution={contribution}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {debate.aiSummary && (
              <AISummaryPanel
                summary={debate.aiSummary}
                participantCount={debate.participantCount}
                contributionCount={debate.contributionCount}
              />
            )}
          </div>
        </div>
      </main>

      <ContributionModal
        isOpen={contributionModalOpen}
        onClose={() => setContributionModalOpen(false)}
        mode="contribution"
      />
    </div>
  );
}
