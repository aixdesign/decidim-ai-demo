import { Link } from 'react-router';
import { Users, MessageSquare, Image as ImageIcon, Mic, FileText, ArrowRight } from 'lucide-react';
import { Debate } from '../data/mockData';
import { t } from '../translations';

interface DebateCardProps {
  debate: Debate;
}

export default function DebateCard({ debate }: DebateCardProps) {
  const textContributions = debate.contributions.filter(c => c.type === 'text');
  const imageContributions = debate.contributions.filter(c => c.type === 'image');
  const audioContributions = debate.contributions.filter(c => c.type === 'audio');

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 h-full flex-col justify-between">
        <div className="">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {debate.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-[#afb5e8] text-[#0c4c27]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-[#020203] mb-3 line-clamp-2">
            {debate.title}
          </h3>

          {/* Description */}
          <p className="text-[#3e4c5c] mb-4 line-clamp-3">
            {debate.description}
          </p>

          {/* AI Summary Preview */}
          {debate.aiSummary && (
            <div className="bg-[#E2E8DE] p-3 rounded-lg mb-4">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-6 h-6 bg-[#0B2E34] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-[#0B2E34] mb-1">{t.debateCard.aiSummaryLabel}</p>
                  <p className="text-xs text-gray-700 line-clamp-2">{debate.aiSummary.overview}</p>
                </div>
              </div>
            </div>
          )}



          {/* Preview Images */}
          {imageContributions.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {imageContributions.slice(0, 3).map((contribution) => (
                <div
                  key={contribution.id}
                  className="aspect-video rounded overflow-hidden bg-gray-100"
                >
                  <img
                    src={contribution.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}



        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            {/* Contribution Types */}
            <div className="flex items-center gap-3 mb-4">
              {textContributions.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-[#3e4c5c]">
                  <FileText className="w-4 h-4" />
                  <span>{textContributions.length}</span>
                </div>
              )}
              {imageContributions.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-[#3e4c5c]">
                  <ImageIcon className="w-4 h-4" />
                  <span>{imageContributions.length}</span>
                </div>
              )}
              {audioContributions.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-[#3e4c5c]">
                  <Mic className="w-4 h-4" />
                  <span>{audioContributions.length}</span>
                </div>
              )}
            </div>
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-[#3e4c5c]">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{debate.participantCount} {t.debateCard.participantsLabel}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{debate.contributionCount} {t.debateCard.contributionsLabel}</span>
              </div>
            </div>
          </div>

          {/* Action */}
          <Link
            to={`/debate/${debate.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#c8ff6b] text-[#0c4c27] rounded-md hover:bg-[#b8ef5b] transition-colors font-medium"
          >
            {t.debateCard.seeDetailsButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
