import { useState, useEffect, useRef } from 'react';
import {
  X, Image as ImageIcon, Mic, Video, Upload, Play, Pause,
  Square, ChevronRight, ChevronLeft, Check, Sparkles, Plus,
  FileText, Hash, AlignLeft,
} from 'lucide-react';
import { t } from '../translations';

export type ModalMode = 'reply' | 'contribution' | 'new-debate';
type MediaZone = 'image' | 'audio' | 'video';

export interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  replyTo?: string;
}

interface ImagePreview {
  id: string;
  preview: string;
  name: string;
}

const fmt = (secs: number) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function ContributionModal({
  isOpen,
  onClose,
  mode,
  replyTo,
}: ContributionModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [activeZones, setActiveZones] = useState<Set<MediaZone>>(new Set());

  // Text
  const [textContent, setTextContent] = useState('');

  // Images
  const [images, setImages] = useState<ImagePreview[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Audio
  const [audioState, setAudioState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [audioTime, setAudioTime] = useState(0);
  const [waveformBars, setWaveformBars] = useState<number[]>(() => Array(32).fill(20));
  const audioIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveformIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioUploadRef = useRef<HTMLInputElement>(null);

  // Video
  const [videoState, setVideoState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [videoTime, setVideoTime] = useState(0);
  const videoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoUploadRef = useRef<HTMLInputElement>(null);

  // New-debate fields
  const [debateTitle, setDebateTitle] = useState('');
  const [debateDescription, setDebateDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [debateStatus, setDebateStatus] = useState<'open' | 'deliberation' | 'closed'>('open');

  /* ── reset on close ─────────────────────────────── */
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setActiveZones(new Set());
        setTextContent('');
        setImages([]);
        setAudioState('idle');
        setAudioTime(0);
        setVideoState('idle');
        setVideoTime(0);
        setDebateTitle('');
        setDebateDescription('');
        setTags([]);
        setTagInput('');
        setDebateStatus('open');
        clearAudio();
        clearVideo();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* ── waveform animation ─────────────────────────── */
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

  /* ── keyboard close ─────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  /* ── audio helpers ──────────────────────────────── */
  const clearAudio = () => {
    if (audioIntervalRef.current) { clearInterval(audioIntervalRef.current); audioIntervalRef.current = null; }
  };
  const startAudio = () => {
    setAudioState('recording');
    setAudioTime(0);
    audioIntervalRef.current = setInterval(() => setAudioTime(time => time + 1), 1000);
  };
  const stopAudio = () => { clearAudio(); setAudioState('recorded'); };
  const resetAudio = () => { clearAudio(); setAudioState('idle'); setAudioTime(0); };

  /* ── video helpers ──────────────────────────────── */
  const clearVideo = () => {
    if (videoIntervalRef.current) { clearInterval(videoIntervalRef.current); videoIntervalRef.current = null; }
  };
  const startVideo = () => {
    setVideoState('recording');
    setVideoTime(0);
    videoIntervalRef.current = setInterval(() => setVideoTime(time => time + 1), 1000);
  };
  const stopVideo = () => { clearVideo(); setVideoState('recorded'); };
  const resetVideo = () => { clearVideo(); setVideoState('idle'); setVideoTime(0); };

  /* ── zone toggle ────────────────────────────────── */
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

  /* ── image upload ───────────────────────────────── */
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

  /* ── tag helpers ────────────────────────────────── */
  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) setTags(prev => [...prev, tag]);
    setTagInput('');
  };

  /* ── derived ────────────────────────────────────── */
  const modalTitles: Record<ModalMode, string> = {
    reply: t.contributionModal.titleReply(replyTo || t.contributionModal.titleReplyFallback),
    contribution: t.contributionModal.titleNewContribution,
    'new-debate': t.contributionModal.titleNewDebate,
  };

  const zoneConfig = [
    { key: 'image' as MediaZone, icon: <ImageIcon className="w-4 h-4" />, label: t.contributionModal.mediaImage, active: 'bg-blue-500 text-white border-blue-500', inactive: 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50' },
    { key: 'audio' as MediaZone, icon: <Mic className="w-4 h-4" />, label: t.contributionModal.mediaAudio, active: 'bg-purple-500 text-white border-purple-500', inactive: 'border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50' },
    { key: 'video' as MediaZone, icon: <Video className="w-4 h-4" />, label: t.contributionModal.mediaVideo, active: 'bg-rose-500 text-white border-rose-500', inactive: 'border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50' },
  ];

  const canPreview = mode === 'new-debate' ? debateTitle.trim().length > 0 : true;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] animate-in">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-semibold text-gray-900 text-base">{modalTitles[mode]}</h2>
            {mode === 'reply' && replyTo && (
              <p className="text-xs text-gray-400 mt-0.5">{t.contributionModal.replyingTo(replyTo)}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Step indicator */}
            <div className="flex items-center gap-1.5">
              {[t.contributionModal.stepCompose, t.contributionModal.stepPreview].map((label, i) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    step === i + 1
                      ? 'bg-[#2b6342] text-white'
                      : step > i + 1
                        ? 'bg-[#c8ff6b] text-[#0c4c27]'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step > i + 1
                      ? <Check className="w-3 h-3" />
                      : <span className="w-3 text-center">{i + 1}</span>
                    }
                    <span>{label}</span>
                  </div>
                  {i < 1 && <div className="w-3 h-px bg-gray-200" />}
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">

          {/* ══ STEP 1: COMPOSE ══════════════════════ */}
          {step === 1 && (
            <div className="p-6 space-y-5">

              {/* New-debate metadata */}
              {mode === 'new-debate' && (
                <div className="space-y-4 pb-5 border-b border-gray-100">
                  {/* Title */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                      <AlignLeft className="w-3.5 h-3.5" />
                      {t.contributionModal.debateTitleLabel} <span className="text-red-400 normal-case">*</span>
                    </label>
                    <input
                      type="text"
                      value={debateTitle}
                      onChange={e => setDebateTitle(e.target.value)}
                      placeholder={t.contributionModal.debateTitlePlaceholder}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6342]/25 focus:border-[#2b6342]/40 transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      {t.contributionModal.descriptionLabel}
                    </label>
                    <textarea
                      value={debateDescription}
                      onChange={e => setDebateDescription(e.target.value)}
                      placeholder={t.contributionModal.descriptionPlaceholder}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2b6342]/25 focus:border-[#2b6342]/40 transition-all"
                    />
                  </div>

                  {/* Tags + Status row */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                        <Hash className="w-3.5 h-3.5" />
                        {t.contributionModal.tagsLabel}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={e => setTagInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                          placeholder={t.contributionModal.tagInputPlaceholder}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6342]/25 transition-all"
                        />
                        <button
                          onClick={addTag}
                          className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors flex-shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-2.5 py-0.5 bg-[#afb5e8]/30 text-[#2b6342] rounded-full text-xs font-medium">
                              {tag}
                              <button onClick={() => setTags(prev => prev.filter(t2 => t2 !== tag))} className="hover:text-red-500 transition-colors">
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                        {t.contributionModal.statusLabel}
                      </label>
                      <select
                        value={debateStatus}
                        onChange={e => setDebateStatus(e.target.value as typeof debateStatus)}
                        className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2b6342]/25 transition-all"
                      >
                        <option value="open">{t.contributionModal.statusOpen}</option>
                        <option value="deliberation">{t.contributionModal.statusDeliberation}</option>
                        <option value="closed">{t.contributionModal.statusClosed}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Media toolbar */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2.5">
                  {mode === 'new-debate' ? t.contributionModal.openingContributionLabel : t.contributionModal.addMediaLabel}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {zoneConfig.map(({ key, icon, label, active, inactive }) => {
                    const on = activeZones.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleZone(key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${on ? active : inactive}`}
                      >
                        {icon}
                        {label}
                        {on && <X className="w-3 h-3 ml-0.5 opacity-70" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Text zone (always visible) ── */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t.contributionModal.textLabel}</span>
                </div>
                <textarea
                  value={textContent}
                  onChange={e => setTextContent(e.target.value)}
                  placeholder={
                    mode === 'reply'
                      ? t.contributionModal.textPlaceholderReply(replyTo || t.contributionModal.textPlaceholderReplyFallback)
                      : mode === 'new-debate'
                        ? t.contributionModal.textPlaceholderNewDebate
                        : t.contributionModal.textPlaceholderContribution
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2b6342]/25 focus:border-[#2b6342]/40 transition-all"
                />
              </div>

              {/* ── Image zone ── */}
              {activeZones.has('image') && (
                <div className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{t.contributionModal.imagesLabel}</span>
                  </div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {images.length > 0 ? (
                    <div className="space-y-3">
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
                    </div>
                  ) : (
                    <button
                      onClick={() => imageInputRef.current?.click()}
                      className="w-full py-8 flex flex-col items-center gap-2 text-blue-400 hover:text-blue-600 transition-colors"
                    >
                      <Upload className="w-7 h-7" />
                      <span className="text-sm font-medium">{t.contributionModal.uploadImagesButton}</span>
                      <span className="text-xs opacity-70">{t.contributionModal.supportedFormats}</span>
                    </button>
                  )}
                </div>
              )}

              {/* ── Audio zone ── */}
              {activeZones.has('audio') && (
                <div className="rounded-xl border-2 border-purple-200 bg-purple-50/40 p-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Mic className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">{t.contributionModal.audioLabel}</span>
                  </div>
                  <input
                    ref={audioUploadRef}
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={() => { setAudioState('recorded'); setAudioTime(93); }}
                  />

                  {audioState === 'idle' && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={startAudio}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-sm font-medium"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        {t.contributionModal.startRecording}
                      </button>
                      <span className="text-gray-300 text-sm">{t.contributionModal.orSeparator}</span>
                      <button
                        onClick={() => audioUploadRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 border border-purple-200 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors text-sm font-medium"
                      >
                        <Upload className="w-4 h-4" />
                        {t.contributionModal.uploadAudio}
                      </button>
                    </div>
                  )}

                  {audioState === 'recording' && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm font-mono font-semibold text-red-600 w-10">{fmt(audioTime)}</span>
                      </div>
                      <div className="flex-1 flex items-center gap-0.5 h-10">
                        {waveformBars.map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-purple-500 rounded-full transition-all duration-100"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <button
                        onClick={stopAudio}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium flex-shrink-0"
                      >
                        <Square className="w-3.5 h-3.5 fill-white" />
                        {t.contributionModal.stopButton}
                      </button>
                    </div>
                  )}

                  {audioState === 'recorded' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-purple-200">
                        <button className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors flex-shrink-0">
                          <Play className="w-4 h-4 ml-0.5" />
                        </button>
                        <div className="flex-1 flex items-center gap-0.5 h-7">
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
                      <div className="flex items-center gap-1.5 text-purple-500">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="text-xs">{t.contributionModal.aiTranscribeNotice}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Video zone ── */}
              {activeZones.has('video') && (
                <div className="rounded-xl border-2 border-rose-200 bg-rose-50/40 p-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Video className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">{t.contributionModal.videoLabel}</span>
                  </div>
                  <input
                    ref={videoUploadRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={() => { setVideoState('recorded'); setVideoTime(47); }}
                  />

                  {videoState === 'idle' && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={startVideo}
                        className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors text-sm font-medium"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        {t.contributionModal.startRecording}
                      </button>
                      <span className="text-gray-300 text-sm">{t.contributionModal.orSeparator}</span>
                      <button
                        onClick={() => videoUploadRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 border border-rose-200 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors text-sm font-medium"
                      >
                        <Upload className="w-4 h-4" />
                        {t.contributionModal.uploadVideo}
                      </button>
                    </div>
                  )}

                  {videoState === 'recording' && (
                    <div className="space-y-3">
                      <div className="w-full aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-white text-sm font-mono font-semibold">{fmt(videoTime)}</span>
                        </div>
                        <p className="text-gray-500 text-xs">{t.contributionModal.recordingInProgress}</p>
                      </div>
                      <button
                        onClick={stopVideo}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium"
                      >
                        <Square className="w-3.5 h-3.5 fill-white" />
                        {t.contributionModal.stopRecording}
                      </button>
                    </div>
                  )}

                  {videoState === 'recorded' && (
                    <div className="space-y-2">
                      <div className="w-full aspect-video bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                        <div className="text-center">
                          <Play className="w-10 h-10 text-white/50 mx-auto mb-1" />
                          <p className="text-white/50 text-sm font-mono">{fmt(videoTime)}</p>
                        </div>
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-rose-500 text-white text-xs rounded-full font-medium">{t.contributionModal.recordedBadge}</span>
                      </div>
                      <button
                        onClick={resetVideo}
                        className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        {t.contributionModal.removeVideo}
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* ══ STEP 2: PREVIEW ══════════════════════ */}
          {step === 2 && (
            <div className="p-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                {t.contributionModal.previewLabel}
              </p>

              {/* Debate meta card (new-debate only) */}
              {mode === 'new-debate' && (
                <div className="bg-[#f0f3ec] rounded-xl p-4 mb-4 border border-[#c8e6c9]">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 text-xs rounded-full bg-[#afb5e8] text-[#0c4c27] font-medium">{tag}</span>
                    ))}
                    <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${
                      debateStatus === 'open' ? 'bg-green-100 text-green-700' :
                      debateStatus === 'deliberation' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{debateStatus}</span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">{debateTitle}</p>
                  {debateDescription && (
                    <p className="text-sm text-gray-600 line-clamp-2">{debateDescription}</p>
                  )}
                </div>
              )}

              {/* Contribution preview card */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                {/* Author */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#afb5e8] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">{t.contributionModal.previewAuthor}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{t.contributionModal.previewAuthor}</p>
                    <p className="text-xs text-gray-400">{t.contributionModal.previewTimestamp}</p>
                  </div>
                  {/* Type badges */}
                  <div className="flex gap-1 flex-wrap justify-end">
                    {textContent && <span className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-500 font-medium">{t.contributionModal.badgeText}</span>}
                    {images.length > 0 && <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-100 text-blue-600 font-medium">{t.contributionModal.badgeImages(images.length)}</span>}
                    {audioState === 'recorded' && <span className="px-2 py-0.5 text-[10px] rounded-full bg-purple-100 text-purple-600 font-medium">{t.contributionModal.badgeAudio}</span>}
                    {videoState === 'recorded' && <span className="px-2 py-0.5 text-[10px] rounded-full bg-rose-100 text-rose-600 font-medium">{t.contributionModal.badgeVideo}</span>}
                  </div>
                </div>

                {/* Text */}
                {textContent && (
                  <p className="text-sm text-gray-700 leading-relaxed">{textContent}</p>
                )}

                {/* Images */}
                {images.length > 0 && (
                  <div className={`grid gap-2 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {images.map(img => (
                      <img key={img.id} src={img.preview} alt="" className="w-full rounded-lg object-cover aspect-video" />
                    ))}
                  </div>
                )}

                {/* Audio */}
                {audioState === 'recorded' && (
                  <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-purple-900">{t.contributionModal.voiceRecordingLabel}</p>
                      <p className="text-xs text-purple-500">{fmt(audioTime)}</p>
                    </div>
                    <div className="flex-1 flex items-center gap-0.5 h-6 ml-2">
                      {waveformBars.slice(0, 20).map((h, i) => (
                        <div key={i} className="flex-1 bg-purple-300 rounded-full" style={{ height: `${h}%`, opacity: 0.5 }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Video */}
                {videoState === 'recorded' && (
                  <div className="flex items-center gap-3 bg-rose-50 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-rose-900">{t.contributionModal.videoRecordingLabel}</p>
                      <p className="text-xs text-rose-500">{fmt(videoTime)}</p>
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {!textContent && images.length === 0 && audioState !== 'recorded' && videoState !== 'recorded' && (
                  <p className="text-sm text-gray-400 italic text-center py-4">{t.contributionModal.emptyState}</p>
                )}
              </div>
            </div>
          )}

        </div>

        {/* ── Footer ─────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between flex-shrink-0 bg-gray-50/60 rounded-b-2xl">
          <button
            onClick={step === 1 ? onClose : () => setStep(1)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors rounded-xl hover:bg-gray-100"
          >
            {step === 2 && <ChevronLeft className="w-4 h-4" />}
            {step === 1 ? t.contributionModal.cancelButton : t.contributionModal.backButton}
          </button>

          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              disabled={!canPreview}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2b6342] text-white rounded-xl hover:bg-[#0c4c27] transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.contributionModal.stepPreview}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#c8ff6b] text-[#0c4c27] rounded-xl hover:bg-[#b8ef5b] transition-colors text-sm font-medium"
            >
              <Check className="w-4 h-4" />
              {mode === 'new-debate' ? t.contributionModal.startDebateButton : t.contributionModal.submitButton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
