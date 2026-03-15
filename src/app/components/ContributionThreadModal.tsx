import { useEffect, useRef, useState } from 'react';
import {
  X, MessageSquare, Globe, Sparkles, Play, Pause,
  FileText, Image as ImageIcon, Mic, Video, Upload, Square, Plus, Maximize2, Minimize2,
} from 'lucide-react';
import { Contribution } from '../data/mockData';

type MediaZone = 'image' | 'audio' | 'video';

interface ImagePreview {
  id: string;
  preview: string;
  name: string;
}

interface ContributionThreadModalProps {
  contribution: Contribution | null;
  onClose: () => void;
  autoFocusCompose?: boolean;
}

const fmt = (secs: number) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function ContributionThreadModal({ contribution, onClose, autoFocusCompose }: ContributionThreadModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [translatedReplies, setTranslatedReplies] = useState<Set<string>>(new Set());

  // Compose state
  const [composeOpen, setComposeOpen] = useState(false);
  const [textareaExpanded, setTextareaExpanded] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [activeZones, setActiveZones] = useState<Set<MediaZone>>(new Set());
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [audioState, setAudioState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [audioTime, setAudioTime] = useState(0);
  const [waveformBars, setWaveformBars] = useState<number[]>(() => Array(32).fill(20));
  const [videoState, setVideoState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [videoTime, setVideoTime] = useState(0);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioUploadRef = useRef<HTMLInputElement>(null);
  const videoUploadRef = useRef<HTMLInputElement>(null);
  const audioIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveformIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleReplyTranslation = (replyId: string) => {
    setTranslatedReplies(prev => {
      const next = new Set(prev);
      next.has(replyId) ? next.delete(replyId) : next.add(replyId);
      return next;
    });
  };

  /* ── Audio helpers ── */
  const clearAudio = () => {
    if (audioIntervalRef.current) { clearInterval(audioIntervalRef.current); audioIntervalRef.current = null; }
  };
  const startAudio = () => {
    setAudioState('recording');
    setAudioTime(0);
    audioIntervalRef.current = setInterval(() => setAudioTime(t => t + 1), 1000);
  };
  const stopAudio = () => { clearAudio(); setAudioState('recorded'); };
  const resetAudio = () => { clearAudio(); setAudioState('idle'); setAudioTime(0); };

  /* ── Video helpers ── */
  const clearVideo = () => {
    if (videoIntervalRef.current) { clearInterval(videoIntervalRef.current); videoIntervalRef.current = null; }
  };
  const startVideo = () => {
    setVideoState('recording');
    setVideoTime(0);
    videoIntervalRef.current = setInterval(() => setVideoTime(t => t + 1), 1000);
  };
  const stopVideo = () => { clearVideo(); setVideoState('recorded'); };
  const resetVideo = () => { clearVideo(); setVideoState('idle'); setVideoTime(0); };

  /* ── Zone toggle ── */
  const toggleZone = (zone: MediaZone) => {
    setActiveZones(prev => {
      const next = new Set(prev);
      if (next.has(zone)) {
        next.delete(zone);
        if (zone === 'audio') resetAudio();
        if (zone === 'video') resetVideo();
        if (zone === 'image') setImages([]);
      } else {
        next.add(zone);
      }
      return next;
    });
  };

  /* ── Image upload ── */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setImages(prev => [...prev, {
          id: Math.random().toString(36).slice(2),
          preview: ev.target?.result as string,
          name: file.name,
        }]);
      };
      reader.readAsDataURL(file);
    });
    if (e.target) e.target.value = '';
  };

  /* ── Reset compose ── */
  const resetCompose = () => {
    setComposeOpen(false);
    setTextareaExpanded(false);
    setTextContent('');
    setActiveZones(new Set());
    setImages([]);
    resetAudio();
    resetVideo();
  };

  useEffect(() => {
    if (!contribution) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [contribution, onClose]);

  // Reset state when modal opens a new contribution
  useEffect(() => {
    setIsPlaying(false);
    setTranslatedReplies(new Set());
    resetCompose();
    if (autoFocusCompose) setComposeOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contribution?.id]);

  // Waveform animation
  useEffect(() => {
    if (audioState === 'recording') {
      waveformIntervalRef.current = setInterval(() => {
        setWaveformBars(Array.from({ length: 32 }, () => 12 + Math.random() * 88));
      }, 120);
    } else {
      if (waveformIntervalRef.current) clearInterval(waveformIntervalRef.current);
      if (audioState === 'recorded') {
        setWaveformBars(Array.from({ length: 32 }, () => 12 + Math.random() * 70));
      }
    }
    return () => {
      if (waveformIntervalRef.current) clearInterval(waveformIntervalRef.current);
    };
  }, [audioState]);

  if (!contribution) return null;

  const formatDate = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const getTypeBadge = () => {
    switch (contribution.type) {
      case 'image': return { icon: <ImageIcon className="w-3 h-3" />, label: 'Image', color: 'bg-blue-100 text-blue-700' };
      case 'audio': return { icon: <Mic className="w-3 h-3" />, label: 'Audio', color: 'bg-purple-100 text-purple-700' };
      default:      return { icon: <FileText className="w-3 h-3" />, label: 'Text', color: 'bg-gray-100 text-gray-600' };
    }
  };

  const badge = getTypeBadge();
  const replies = contribution.replies ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">

        {/* HEADER */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#afb5e8] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-medium">
              {contribution.author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{contribution.author}</p>
            <p className="text-xs text-gray-400">{formatDate(contribution.timestamp)} · {formatTime(contribution.timestamp)}</p>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 flex-shrink-0 ${badge.color}`}>
            {badge.icon}
            <span>{badge.label}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0 ml-1"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex flex-1 flex-col md:flex-row min-h-0 overflow-hidden">

          {/* LEFT PANEL — Media */}
          <div className="md:w-1/2 flex flex-col overflow-y-auto border-r border-gray-100">

            {/* Media */}
            {contribution.type === 'image' && contribution.imageUrl && (
              <div className="bg-gray-50 flex-shrink-0" style={{ aspectRatio: '16/9' }}>
                <img
                  src={contribution.imageUrl}
                  alt={contribution.content}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {contribution.type === 'audio' && (
              <div className="bg-[#E2E8DE] flex flex-col items-center gap-4 p-6 flex-shrink-0">
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying
                    ? <Pause className="w-7 h-7 text-purple-600" />
                    : <Play className="w-7 h-7 text-purple-600 ml-1" />
                  }
                </button>
                <div className="flex items-center gap-0.5 h-10 w-full">
                  {[...Array(48)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#0B2E34] rounded-full"
                      style={{
                        height: `${20 + Math.sin(i * 0.7) * 60 + Math.random() * 20}%`,
                        opacity: isPlaying && i < 24 ? 1 : 0.25,
                        transition: 'opacity 0.3s',
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#0B2E34] font-medium">2:34</span>

                {contribution.aiTranscript && (
                  <div className="w-full bg-white/70 rounded-xl p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">AI Transcript</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed italic">"{contribution.aiTranscript}"</p>
                  </div>
                )}
              </div>
            )}

            {contribution.type === 'text' && (
              <div className="bg-[#f0f3ec] p-6 flex-shrink-0">
                <p className="text-gray-700 text-sm leading-relaxed">{contribution.content}</p>
              </div>
            )}

            {/* Caption for non-text types */}
            {contribution.type !== 'text' && contribution.content && (
              <div className="px-5 py-4 flex-shrink-0">
                <p className="text-sm text-gray-700 leading-relaxed">{contribution.content}</p>
              </div>
            )}

            {/* Tags + AI translation */}
            <div className="px-5 py-4 flex flex-col gap-3">
              {contribution.tags && contribution.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {contribution.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-500 capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {contribution.aiTranslation?.trim() && (
                <div className="bg-[#f0f3ec] rounded-xl p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Globe className="w-4 h-4 text-[#2b6342]" />
                    <span className="text-xs font-semibold text-[#2b6342] uppercase tracking-wide">AI Translation</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic">{contribution.aiTranslation}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL — Thread + Compose */}
          <div className="md:w-1/2 flex flex-col overflow-hidden">
            {/* Thread header */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <MessageSquare className="w-4 h-4 text-[#2b6342]" />
              <span className="text-sm font-semibold text-gray-900">Conversation thread</span>
              <span className="px-2 py-0.5 rounded-full bg-[#2b6342] text-white text-xs font-medium ml-1">
                {replies.length}
              </span>
            </div>

            {/* Reply list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">
              {replies.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                  <MessageSquare className="w-10 h-10 opacity-30" />
                  <p className="text-sm">No replies yet</p>
                </div>
              ) : (
                replies.map(reply => {
                  const isTranslated = translatedReplies.has(reply.id);
                  return (
                    <div key={reply.id} className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#afb5e8] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">
                          {reply.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900 truncate">{reply.author}</span>
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {new Date(reply.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {isTranslated && reply.aiTranslation ? reply.aiTranslation : reply.summary}
                        </p>
                        {reply.aiTranslation && (
                          <button
                            onClick={() => toggleReplyTranslation(reply.id)}
                            className={`mt-1.5 flex items-center gap-1 text-xs font-medium transition-colors ${
                              isTranslated
                                ? 'text-[#2b6342] hover:text-[#0c4c27]'
                                : 'text-gray-400 hover:text-[#2b6342]'
                            }`}
                          >
                            <Globe className="w-3 h-3" />
                            {isTranslated ? 'Original' : 'Translate'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Compose area */}
            {!composeOpen ? (
              /* Idle bar */
              <div
                className="border-t border-gray-100 px-4 py-3 flex-shrink-0 cursor-text"
                onClick={() => setComposeOpen(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#afb5e8] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-medium">You</span>
                  </div>
                  <span className="text-sm text-gray-400 flex-1">Write a reply…</span>
                </div>
              </div>
            ) : (
              /* Active compose */
              <div className="border-t border-gray-100 flex flex-col gap-3 p-4 flex-shrink-0">

                {/* Hidden file inputs */}
                <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                <input ref={audioUploadRef} type="file" accept="audio/*" className="hidden" onChange={() => { setAudioState('recorded'); setAudioTime(93); }} />
                <input ref={videoUploadRef} type="file" accept="video/*" className="hidden" onChange={() => { setVideoState('recorded'); setVideoTime(47); }} />

                {/* Textarea */}
                <div className="relative">
                  <textarea
                    value={textContent}
                    onChange={e => setTextContent(e.target.value)}
                    placeholder={`Reply to ${contribution.author}…`}
                    rows={textareaExpanded ? 6 : 3}
                    autoFocus
                    className="w-full px-3 py-2.5 pr-8 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2b6342]/25 focus:border-[#2b6342]/40 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setTextareaExpanded(x => !x)}
                    title={textareaExpanded ? 'Collapse' : 'Expand'}
                    className="absolute bottom-2 right-2 w-5 h-5 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    {textareaExpanded
                      ? <Minimize2 className="w-3.5 h-3.5" />
                      : <Maximize2 className="w-3.5 h-3.5" />
                    }
                  </button>
                </div>

                {/* Image zone */}
                {activeZones.has('image') && (
                  <div className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Images</span>
                    </div>
                    {images.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {images.map(img => (
                          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                            <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                            <button
                              onClick={() => setImages(prev => prev.filter(i => i.id !== img.id))}
                              className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => imageInputRef.current?.click()}
                          className="aspect-square rounded-xl border-2 border-dashed border-blue-300 flex items-center justify-center text-blue-400 hover:bg-blue-100 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        className="w-full py-6 flex flex-col items-center gap-2 text-blue-400 hover:text-blue-600 transition-colors"
                      >
                        <Upload className="w-6 h-6" />
                        <span className="text-xs font-medium">Upload images</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Audio zone */}
                {activeZones.has('audio') && (
                  <div className="rounded-xl border-2 border-purple-200 bg-purple-50/40 p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Mic className="w-3.5 h-3.5 text-purple-500" />
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Audio</span>
                    </div>
                    {audioState === 'idle' && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={startAudio}
                          className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-xs font-medium"
                        >
                          <div className="w-2 h-2 rounded-full bg-white" />
                          Record
                        </button>
                        <span className="text-gray-300 text-xs">or</span>
                        <button
                          onClick={() => audioUploadRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-purple-200 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors text-xs font-medium"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Upload
                        </button>
                      </div>
                    )}
                    {audioState === 'recording' && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-xs font-mono font-semibold text-red-600 w-10">{fmt(audioTime)}</span>
                        </div>
                        <div className="flex-1 flex items-center gap-0.5 h-8">
                          {waveformBars.map((h, i) => (
                            <div key={i} className="flex-1 bg-purple-500 rounded-full transition-all duration-100" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                        <button
                          onClick={stopAudio}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-xs font-medium flex-shrink-0"
                        >
                          <Square className="w-3 h-3 fill-white" />
                          Stop
                        </button>
                      </div>
                    )}
                    {audioState === 'recorded' && (
                      <div className="flex items-center gap-3 bg-white rounded-xl p-2.5 border border-purple-200">
                        <button className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors flex-shrink-0">
                          <Play className="w-3.5 h-3.5 ml-0.5" />
                        </button>
                        <div className="flex-1 flex items-center gap-0.5 h-6">
                          {waveformBars.map((h, i) => (
                            <div key={i} className="flex-1 bg-purple-300 rounded-full" style={{ height: `${h}%`, opacity: 0.55 }} />
                          ))}
                        </div>
                        <span className="text-xs text-purple-600 font-mono flex-shrink-0">{fmt(audioTime)}</span>
                        <button
                          onClick={resetAudio}
                          className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Video zone */}
                {activeZones.has('video') && (
                  <div className="rounded-xl border-2 border-rose-200 bg-rose-50/40 p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Video className="w-3.5 h-3.5 text-rose-500" />
                      <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">Video</span>
                    </div>
                    {videoState === 'idle' && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={startVideo}
                          className="flex items-center gap-2 px-3 py-1.5 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors text-xs font-medium"
                        >
                          <div className="w-2 h-2 rounded-full bg-white" />
                          Record
                        </button>
                        <span className="text-gray-300 text-xs">or</span>
                        <button
                          onClick={() => videoUploadRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-200 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors text-xs font-medium"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Upload
                        </button>
                      </div>
                    )}
                    {videoState === 'recording' && (
                      <div className="space-y-2">
                        <div className="w-full aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-white text-xs font-mono font-semibold">{fmt(videoTime)}</span>
                          </div>
                          <p className="text-gray-500 text-xs">Recording…</p>
                        </div>
                        <button
                          onClick={stopVideo}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-xs font-medium"
                        >
                          <Square className="w-3 h-3 fill-white" />
                          Stop
                        </button>
                      </div>
                    )}
                    {videoState === 'recorded' && (
                      <div className="space-y-2">
                        <div className="w-full aspect-video bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                          <div className="text-center">
                            <Play className="w-8 h-8 text-white/50 mx-auto mb-1" />
                            <p className="text-white/50 text-xs font-mono">{fmt(videoTime)}</p>
                          </div>
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-rose-500 text-white text-xs rounded-full font-medium">Recorded</span>
                        </div>
                        <button
                          onClick={resetVideo}
                          className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Remove video
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer: media toggles + actions */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleZone('image')}
                      title="Add image"
                      className={`p-1.5 rounded-lg border text-xs transition-all ${
                        activeZones.has('image')
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleZone('audio')}
                      title="Add audio"
                      className={`p-1.5 rounded-lg border text-xs transition-all ${
                        activeZones.has('audio')
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'border-gray-200 text-gray-500 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleZone('video')}
                      title="Add video"
                      className={`p-1.5 rounded-lg border text-xs transition-all ${
                        activeZones.has('video')
                          ? 'bg-rose-500 text-white border-rose-500'
                          : 'border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetCompose}
                      className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors rounded-xl hover:bg-gray-100"
                    >
                      Discard
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-1.5 bg-[#2b6342] text-white text-sm font-medium rounded-xl hover:bg-[#0c4c27] transition-colors"
                    >
                      Submit reply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
