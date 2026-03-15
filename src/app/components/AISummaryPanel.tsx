import { useState } from 'react';
import { Sparkles, Clock, TrendingUp } from 'lucide-react';
import { t } from '../translations';

type SummaryEntry = {
  overview: string;
  keyPoints: string[];
  topics: string[];
  lastUpdated: string;
};

interface AISummaryPanelProps {
  summary: SummaryEntry[];
  participantCount: number;
  contributionCount: number;
  onTopicClick?: (topic: string) => void;
}

export default function AISummaryPanel({
  summary,
  participantCount,
  contributionCount,
  onTopicClick,
}: AISummaryPanelProps) {
  const [summaryIndex, setSummaryIndex] = useState(0);
  const activeSummary = summary[summaryIndex];

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 sticky top-6">
      {/* Header */}
      <div className="bg-gray-50 p-3 rounded-t-lg border-b border-gray-200">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-6 h-6 bg-[#afb5e8]/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#afb5e8]" />
            </div>
            <div>
              <h3 className="text-sm font-medium">AI Summary</h3>
              <p className="text-xs text-gray-500">Auto-generated insights</p>
            </div>
          </div>

          {/* Stats badges */}
          <div className="flex items-center gap-2">
            <div className="bg-[#E2E8DE] rounded-full px-3 py-1 flex items-center gap-1.5">
              <p className="text-sm font-bold text-[#0B2E34]">{participantCount}</p>
              <p className="text-xs text-[#0B2E34]">Participants</p>
            </div>
            <div className="bg-[#CED5D0] rounded-full px-3 py-1 flex items-center gap-1.5">
              <p className="text-sm font-bold text-[#0c4c27]">{contributionCount}</p>
              <p className="text-xs text-[#0c4c27]">Contributions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Overview */}
        <div className="bg-[#F0F3EC] rounded-xl p-4 border border-[#D6DDD1]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-[#0B2E34] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-3 h-3 text-[#CDFF80]" />
            </div>
            <h4 className="text-xs font-semibold text-[#0B2E34] uppercase tracking-wide">{t.aiSummary.overviewTitle}</h4>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{activeSummary.overview}</p>
        </div>

        {/* Key Points */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">{t.aiSummary.keyHighlightsTitle}</h4>
          <ul className="space-y-2">
            {activeSummary.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#afb5e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Topics */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">{t.aiSummary.detectedTopicsTitle}</h4>
          <div className="flex flex-wrap gap-2">
            {activeSummary.topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => onTopicClick?.(topic)}
                className={`px-3 py-1 text-xs rounded-full bg-[#CED5D0] text-[#0B2E34] font-medium border border-[#CED5D0] transition-all ${onTopicClick ? 'hover:bg-[#0B2E34] hover:text-white hover:border-[#0B2E34] cursor-pointer' : 'cursor-default'}`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{t.aiSummary.lastUpdated(formatDate(activeSummary.lastUpdated))}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            className="w-full px-4 py-2 bg-[#0B2E34] text-white rounded-lg hover:bg-[#0c4c27] transition-colors text-sm font-medium"
            onClick={() => setSummaryIndex(i => (i + 1) % 2)}
          >
            {t.aiSummary.regenerateButton}
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            {t.aiSummary.exportButton}
          </button>
        </div>
      </div>
    </div >
  );
}
