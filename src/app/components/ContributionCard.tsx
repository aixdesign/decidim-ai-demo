import { useState, useRef, useEffect } from 'react';
import {
  Play, Pause, FileText, Image as ImageIcon, Mic,
  Globe, Sparkles, Flag, Reply, MoreVertical, X, Check, MessageSquare, SmilePlus, ArrowRight
} from 'lucide-react';
import { Contribution, Reaction } from '../data/mockData';
import ContributionModal from './ContributionModal';
import { t } from '../translations';

interface ContributionCardProps {
  contribution: Contribution;
}

type MenuAction = 'translate' | 'summarize' | 'flag' | 'reply' | null;

export default function ContributionCard({ contribution }: ContributionCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<MenuAction>(null);
  const [flagged, setFlagged] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>(contribution.reactions ?? []);
  const [myReactions, setMyReactions] = useState<Set<string>>(new Set());
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getTypeBadge = () => {
    switch (contribution.type) {
      case 'image':
        return { icon: <ImageIcon className="w-3 h-3" />, label: t.contributionCard.typeBadgeImage, color: 'bg-blue-100 text-blue-700' };
      case 'audio':
        return { icon: <Mic className="w-3 h-3" />, label: t.contributionCard.typeBadgeAudio, color: 'bg-purple-100 text-purple-700' };
      default:
        return { icon: <FileText className="w-3 h-3" />, label: t.contributionCard.typeBadgeText, color: 'bg-gray-100 text-gray-600' };
    }
  };

  const badge = getTypeBadge();

  const handleMenuAction = (action: MenuAction) => {
    if (action === 'flag') {
      setFlagged(f => !f);
      setMenuOpen(false);
      return;
    }
    if (action === 'reply') {
      setReplyModalOpen(true);
      setMenuOpen(false);
      return;
    }
    setActiveAction(action);
    setMenuOpen(false);
  };

  const menuItems = [
    { key: 'translate' as MenuAction, icon: <Globe className="w-4 h-4" />, label: t.contributionCard.menuTranslate, color: 'text-[#2b6342]' },
    { key: 'summarize' as MenuAction, icon: <Sparkles className="w-4 h-4" />, label: t.contributionCard.menuSummarize, color: 'text-purple-600' },
    { key: 'reply' as MenuAction, icon: <Reply className="w-4 h-4" />, label: t.contributionCard.menuReply, color: 'text-[#3e4c5c]' },
    { key: 'flag' as MenuAction, icon: <Flag className="w-4 h-4" />, label: flagged ? t.contributionCard.menuUnflag : t.contributionCard.menuFlag, color: flagged ? 'text-red-600' : 'text-orange-500' },
  ];

  /* ── Overlays ──────────────────────────────────── */
  const renderOverlay = () => {

    // Transcript overlay
    if (showTranscript && contribution.aiTranscript) {
      return (
        <div className="absolute inset-0 z-10 bg-white rounded-xl flex flex-col">
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-900">{t.contributionCard.aiTranscriptTitle}</span>
            </div>
            <button
              onClick={() => setShowTranscript(false)}
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <p className="text-xs text-gray-700 leading-relaxed italic">
              "{contribution.aiTranscript}"
            </p>
          </div>
        </div>
      );
    }

    // Replies overlay
    if (showReplies) {
      const replies = contribution.replies ?? [];
      return (
        <div className="absolute inset-0 z-10 bg-white rounded-xl flex flex-col">
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#2b6342]" />
              <span className="text-sm font-semibold text-gray-900">
                {t.contributionCard.repliesTitle(replies.length)}
              </span>
            </div>
            <button
              onClick={() => setShowReplies(false)}
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-2 px-3 space-y-3 min-h-0">
            {replies.map((reply) => (
              <div key={reply.id} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#afb5e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-[8px] font-medium">
                    {reply.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-[10px] font-semibold text-gray-900 truncate">{reply.author}</span>
                    <span className="text-[9px] text-gray-400 flex-shrink-0">
                      {new Date(reply.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{reply.summary}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-3 pb-3 pt-2 border-t border-gray-100 flex-shrink-0">
            <button
              onClick={() => { setShowReplies(false); setReplyModalOpen(true); }}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#2b6342] text-white text-xs font-medium hover:bg-[#0c4c27] transition-colors"
            >
              <span>{t.contributionCard.readFullThread}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      );
    }

    // Action overlays (translate / summarize)
    if (!activeAction) return null;

    const overlayContent: Record<string, { title: string; body: React.ReactNode }> = {
      translate: {
        title: t.contributionCard.translationTitle,
        body: (
          <p className="text-sm text-gray-700 leading-relaxed italic">
            {t.contributionCard.aiTranslationPrefix} {contribution.aiTranslation}
          </p>
        ),
      },
      summarize: {
        title: t.contributionCard.aiSummaryTitle,
        body: (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-purple-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wide">{t.contributionCard.generatedByAI}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t.contributionCard.aiSummaryBody(contribution.tags?.[0] ?? t.contributionCard.aiSummaryDefaultTag)}
            </p>
          </div>
        ),
      },
    };

    const content = overlayContent[activeAction];
    if (!content) return null;

    return (
      <div className="absolute inset-0 z-10 bg-white/97 backdrop-blur-sm rounded-xl flex flex-col p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-900">{content.title}</span>
          <button
            onClick={() => setActiveAction(null)}
            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{content.body}</div>
      </div>
    );
  };

  const toggleReaction = (emoji: string) => {
    const alreadyReacted = myReactions.has(emoji);
    const exists = reactions.some(r => r.emoji === emoji);

    setMyReactions(prev => {
      const next = new Set(prev);
      alreadyReacted ? next.delete(emoji) : next.add(emoji);
      return next;
    });

    if (exists) {
      setReactions(prev =>
        prev
          .map(r => r.emoji === emoji ? { ...r, count: r.count + (alreadyReacted ? -1 : 1) } : r)
          .filter(r => r.count > 0)
      );
    } else {
      setReactions(prev => [...prev, { emoji, count: 1 }]);
    }

    setEmojiPickerOpen(false);
  };

  const EMOJI_OPTIONS = ['👍', '❤️', '🔥', '🤔', '💡', '👏', '🌱', '😮', '😄', '🙌', '✨', '🎉', '👀', '💪', '🫶'];

  return (
    <>
      {/* Portrait card — golden ratio 1:1.618 */}
      <div
        className="relative flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
        style={{ aspectRatio: '1 / 1.618' }}
      >
        {/* Overlay (transcript / replies / actions) */}
        {renderOverlay()}

        {/* ── Media area (top 61.8%) ────────────────── */}
        <div className="relative flex-shrink-0" style={{ height: '61.8%' }}>
          {contribution.type === 'image' && contribution.imageUrl && (
            <img
              src={contribution.imageUrl}
              alt={contribution.content}
              className="w-full h-full object-cover"
            />
          )}

          {contribution.type === 'audio' && (
            <div className="w-full h-full bg-[#E2E8DE] flex flex-col items-center justify-center gap-3 p-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying
                  ? <Pause className="w-6 h-6 text-purple-600" />
                  : <Play className="w-6 h-6 text-purple-600 ml-1" />
                }
              </button>
              {/* Waveform */}
              <div className="flex items-center gap-0.5 h-8 w-full px-2">
                {[...Array(36)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#0B2E34] rounded-full"
                    style={{
                      height: `${20 + Math.sin(i * 0.7) * 60 + Math.random() * 20}%`,
                      opacity: isPlaying && i < 18 ? 1 : 0.25,
                      transition: 'opacity 0.3s',
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-[#0B2E34] font-medium">{t.contributionCard.audioDuration}</span>
            </div>
          )}

          {contribution.type === 'text' && (
            <div className="w-full h-full bg-[#F0F3EC] flex items-center justify-center p-5">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-6 text-center">
                {contribution.content}
              </p>
            </div>
          )}

          {/* Type badge — top left */}
          <div className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm ${badge.color}`}>
            {badge.icon}
            <span>{badge.label}</span>
          </div>

          {/* Flag indicator — top right */}
          {flagged && (
            <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow">
              <Flag className="w-3 h-3 text-white fill-white" />
            </div>
          )}
        </div>

        {/* ── Info area (bottom 38.2%) ──────────────── */}
        <div className="flex flex-col flex-1 p-3 min-h-0">
          {/* Author row */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-[#afb5e8] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-medium">
                {contribution.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">{contribution.author}</p>
              <p className="text-[10px] text-gray-400">{formatDate(contribution.timestamp)} · {formatTime(contribution.timestamp)}</p>
            </div>
          </div>

          {/* Caption / content snippet for image / audio */}
          {contribution.type !== 'text' && contribution.content && (
            <p className="text-xs text-gray-600 leading-snug line-clamp-2 mb-2 flex-shrink-0">
              {contribution.content}
            </p>
          )}

          {/* AI transcript toggle — opens overlay */}
          {contribution.type === 'audio' && contribution.aiTranscript && (
            <button
              onClick={() => setShowTranscript(true)}
              className="flex items-center gap-1 text-[10px] text-purple-600 font-medium mb-2 hover:text-purple-800 flex-shrink-0 w-fit"
            >
              <Sparkles className="w-3 h-3" />
              {t.contributionCard.showAiTranscript}
            </button>
          )}

          {/* Tags */}
          {contribution.tags && contribution.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 flex-shrink-0">
              {contribution.tags.map((tag, i) => (
                <span key={i} className="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-500 capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* ── Reactions + reply count + menu ───────── */}
          <div className="flex items-center gap-1 mt-1">

            {/* Emoji reactions */}
            {reactions.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap flex-1 min-w-0">
                {reactions.map(r => (
                  <button
                    key={r.emoji}
                    onClick={() => toggleReaction(r.emoji)}
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium border transition-all ${myReactions.has(r.emoji)
                      ? 'bg-[#2b6342] border-[#2b6342] text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#2b6342]/40 hover:bg-[#f0f3ec]'
                      }`}
                  >
                    <span>{r.emoji}</span>
                    <span>{r.count}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Add emoji button + picker */}
            <div ref={emojiPickerRef} className="relative flex-shrink-0">
              <button
                onClick={() => setEmojiPickerOpen(o => !o)}
                title={t.contributionCard.addReactionTitle}
                className={`flex items-center justify-center w-[26px] h-[18px] rounded-full border text-[10px] transition-all ${emojiPickerOpen
                  ? 'bg-[#2b6342] border-[#2b6342] text-white'
                  : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-[#2b6342]/40 hover:text-[#2b6342] hover:bg-[#f0f3ec]'
                  }`}
              >
                <SmilePlus className="w-3 h-3" />
              </button>

              {emojiPickerOpen && (
                <div className="absolute bottom-full right-0 mb-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-30 p-2 w-44">
                  <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5 px-0.5">{t.contributionCard.reactWith}</p>
                  <div className="grid grid-cols-5 gap-0.5">
                    {EMOJI_OPTIONS.map(emoji => {
                      const alreadyIn = myReactions.has(emoji);
                      return (
                        <button
                          key={emoji}
                          onClick={() => toggleReaction(emoji)}
                          className={`w-7 h-7 flex items-center justify-center rounded-lg text-base transition-all hover:scale-110 ${alreadyIn ? 'bg-[#2b6342]/10 ring-1 ring-[#2b6342]/30' : 'hover:bg-gray-100'
                            }`}
                        >
                          {emoji}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Reply count badge */}
            {(contribution.replyCount ?? 0) > 0 && (
              <button
                onClick={() => setShowReplies(true)}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-50 border border-gray-200 text-gray-500 hover:border-[#2b6342]/40 hover:text-[#2b6342] hover:bg-[#f0f3ec] transition-all flex-shrink-0"
              >
                <MessageSquare className="w-2.5 h-2.5" />
                <span>{contribution.replyCount}</span>
              </button>
            )}

            {/* Context menu */}
            <div ref={menuRef} className="relative flex-shrink-0 ml-auto">
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                aria-label={t.contributionCard.menuAriaLabel}
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div className="absolute bottom-full right-0 mb-1 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleMenuAction(item.key)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${item.color}`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.key === 'flag' && flagged && (
                        <Check className="w-3.5 h-3.5 ml-auto text-red-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reply modal */}
      <ContributionModal
        isOpen={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        mode="reply"
        replyTo={contribution.author}
      />
    </>
  );
}
