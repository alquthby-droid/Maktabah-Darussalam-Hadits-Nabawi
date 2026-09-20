import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Bookmark, 
  FileText, 
  Sparkles, 
  Scale, 
  Share2, 
  Type, 
  Minus, 
  Plus, 
  ShieldCheck, 
  BookOpen, 
  Hash, 
  Info,
  Layers,
  Compass,
  TrendingUp,
  GitBranch,
  UserCheck,
  MoveHorizontal
} from 'lucide-react';
import { HadithItem, SyamilaSettings, KitabInfo } from '../types';
import { removeTashkil, formatHadithForCopy } from '../utils/arabic';
import { HADITH_LEXICAL_ANALYSIS } from '../data/mujamData';
import { HADITH_SANAD_MAP } from '../data/jarhData';

interface HadithReaderProps {
  hadith: HadithItem | null;
  kitab: KitabInfo;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (hadith: HadithItem) => void;
  onOpenNote: (hadith: HadithItem) => void;
  onOpenAIWithTab: (tab: 'syarah' | 'takhrij' | 'ask') => void;
  onOpenMujam?: (initialQuery?: string) => void;
  onOpenJarh?: (rawiId?: string) => void;
  onOpenSanadGraph?: (hadith?: HadithItem) => void;
  onOpenDeveloperProfile?: () => void;
  onOpenStats?: () => void;
  todayReadCount?: number;
  dailyGoal?: number;
  settings: SyamilaSettings;
  onUpdateSettings: (newSettings: Partial<SyamilaSettings>) => void;
  currentIndex: number;
  totalInView: number;
}

export const HadithReader: React.FC<HadithReaderProps> = ({
  hadith,
  kitab,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isBookmarked,
  onToggleBookmark,
  onOpenNote,
  onOpenAIWithTab,
  onOpenMujam,
  onOpenJarh,
  onOpenSanadGraph,
  onOpenDeveloperProfile,
  onOpenStats,
  todayReadCount = 0,
  dailyGoal = 10,
  settings,
  onUpdateSettings,
  currentIndex,
  totalInView,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showSanadDetails, setShowSanadDetails] = useState<boolean>(settings.showSanad);

  // Panel reference for instantaneous scroll-to-top on hadith change
  const panelRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const mouseStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [swipeNotice, setSwipeNotice] = useState<string | null>(null);

  // Smoothly scroll back to top of reader whenever the displayed hadith changes
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [hadith?.id]);

  // Touch Swipe Handlers for smooth mobile gesture navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;

    // Detect if user intention is horizontal swipe (x movement dominates y movement)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      setIsDragging(true);
      // Elastic damping factor
      let damping = 0.42;
      if ((dx > 0 && !hasPrevious) || (dx < 0 && !hasNext)) {
        damping = 0.12; // boundary resistance
      }
      const clampedOffset = Math.max(-130, Math.min(130, dx * damping));
      setDragOffset(clampedOffset);
    }
  }, [hasNext, hasPrevious]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const dt = Date.now() - touchStartRef.current.time;

    touchStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    // If gesture was predominantly horizontal
    if (Math.abs(dx) > Math.abs(dy) * 1.15) {
      const isQuickFlick = dt < 320 && Math.abs(dx) > 35;
      const isLongSwipe = Math.abs(dx) > 60;

      if (isQuickFlick || isLongSwipe) {
        if (dx < 0 && hasNext) {
          onNext();
          setSwipeNotice('Hadits Selanjutnya ➔');
          setTimeout(() => setSwipeNotice(null), 1200);
        } else if (dx > 0 && hasPrevious) {
          onPrevious();
          setSwipeNotice('⬅ Hadits Sebelumnya');
          setTimeout(() => setSwipeNotice(null), 1200);
        }
      }
    }
  }, [hasNext, hasPrevious, onNext, onPrevious]);

  // Desktop Mouse Drag Gesture Handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea')) return;
    mouseStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mouseStartRef.current) return;
    const dx = e.clientX - mouseStartRef.current.x;
    const dy = e.clientY - mouseStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) {
      setIsDragging(true);
      let damping = 0.35;
      if ((dx > 0 && !hasPrevious) || (dx < 0 && !hasNext)) {
        damping = 0.1;
      }
      setDragOffset(Math.max(-110, Math.min(110, dx * damping)));
    }
  }, [hasNext, hasPrevious]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!mouseStartRef.current) return;
    const dx = e.clientX - mouseStartRef.current.x;
    const dy = e.clientY - mouseStartRef.current.y;
    mouseStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0 && hasNext) {
        onNext();
      } else if (dx > 0 && hasPrevious) {
        onPrevious();
      }
    }
  }, [hasNext, hasPrevious, onNext, onPrevious]);

  if (!hadith) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center"
        style={{ color: 'var(--syamila-muted)' }}
      >
        <BookOpen className="w-16 h-16 opacity-30 mb-4" />
        <h3 className="text-lg font-bold">Pilih Kitab atau Hadits</h3>
        <p className="text-sm max-w-md mt-1 opacity-80">
          Silakan pilih kitab dari daftar fihris di sebelah kiri atau gunakan fitur pencarian untuk menemukan hadits yang ingin dikaji.
        </p>
      </div>
    );
  }

  const handleCopy = async () => {
    const textToCopy = formatHadithForCopy(hadith);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const getDerajatBadgeColor = (derajat: string) => {
    switch (derajat) {
      case 'Muttafaqun \'Alaih':
        return 'bg-emerald-700 text-white border-emerald-600';
      case 'Shahih':
        return 'bg-emerald-600/90 text-white border-emerald-500';
      case 'Hasan Shahih':
      case 'Hasan':
        return 'bg-amber-600 text-white border-amber-500';
      default:
        return 'bg-stone-600 text-white border-stone-500';
    }
  };

  const displayArabicText = settings.showTashkil ? hadith.arab : removeTashkil(hadith.arab);
  const fontClass = settings.arabicFontFamily === 'scheherazade' 
    ? 'font-arabic-scheherazade' 
    : 'font-arabic-amiri';

  return (
    <main 
      id="hadith-reader-panel" 
      ref={panelRef}
      className="flex-1 overflow-y-auto px-3 sm:px-8 py-6 max-w-5xl mx-auto w-full pb-28 md:pb-8 touch-scroll relative"
    >
      {/* Floating Swipe Indicator Pill while dragging */}
      {isDragging && Math.abs(dragOffset) > 12 && (
        <div 
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 py-1.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-opacity animate-in fade-in zoom-in-95 duration-150"
          style={{
            backgroundColor: dragOffset < 0 
              ? (hasNext ? 'rgba(180, 83, 9, 0.95)' : 'rgba(75, 75, 75, 0.92)')
              : (hasPrevious ? 'rgba(180, 83, 9, 0.95)' : 'rgba(75, 75, 75, 0.92)'),
            color: '#FFFFFF'
          }}
        >
          {dragOffset < 0 ? (
            hasNext ? (
              <>
                <span>Geser ke Hadits Selanjutnya</span>
                <ChevronRight className="w-4 h-4 animate-pulse" />
              </>
            ) : (
              <span>Sudah di Hadits Terakhir</span>
            )
          ) : (
            hasPrevious ? (
              <>
                <ChevronLeft className="w-4 h-4 animate-pulse" />
                <span>Geser ke Hadits Sebelumnya</span>
              </>
            ) : (
              <span>Sudah di Hadits Pertama</span>
            )
          )}
        </div>
      )}

      {/* Ephemeral Notification on Successful Swipe Navigation */}
      {swipeNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 py-1.5 rounded-full bg-amber-700/95 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 animate-bounce">
          <MoveHorizontal className="w-3.5 h-3.5" />
          <span>{swipeNotice}</span>
        </div>
      )}

      {/* Top Header Navigation & Meta */}
      <div 
        className="mb-6 p-4 sm:p-5 rounded-2xl border shadow-2xs transition-colors"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b"
          style={{ borderColor: 'var(--syamila-border)' }}
        >
          {/* Kitab & Chapter Title */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-600/15 text-amber-800 dark:text-amber-300 border border-amber-600/30">
                {kitab.name}
              </span>
              <span className="text-xs font-mono opacity-70">
                No. {hadith.number}
              </span>
              {onOpenStats && (
                <button
                  id="btn-reader-mini-stats"
                  onClick={onOpenStats}
                  className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border transition-colors hover:bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-600/30"
                  title="Target Harian & Statistik Membaca (Klik untuk melihat grafik bulanan)"
                >
                  <TrendingUp className="w-3 h-3 text-amber-600" />
                  <span>Target: {todayReadCount}/{dailyGoal}</span>
                </button>
              )}
            </div>
            <h1 className="text-base sm:text-lg font-bold mt-1.5 flex items-center gap-2">
              <span>{hadith.chapterTitle}</span>
            </h1>
            <p className="font-arabic-amiri text-sm opacity-80 text-amber-800 dark:text-amber-300 mt-0.5">
              {hadith.chapterArabic}
            </p>
          </div>

          {/* Quick Controls: Previous / Next & Font Size Slider */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Font Size Modifier */}
            <div className="flex items-center border rounded-lg p-0.5 text-xs"
              style={{
                backgroundColor: 'var(--syamila-card)',
                borderColor: 'var(--syamila-border)'
              }}
            >
              <button
                id="btn-font-dec"
                onClick={() => onUpdateSettings({ arabicFontSize: Math.max(18, settings.arabicFontSize - 2) })}
                className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
                title="Perkecil Ukuran Teks Arab"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono text-[11px] font-medium" title="Ukuran Font Arab">
                {settings.arabicFontSize}px
              </span>
              <button
                id="btn-font-inc"
                onClick={() => onUpdateSettings({ arabicFontSize: Math.min(40, settings.arabicFontSize + 2) })}
                className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
                title="Perbesar Ukuran Teks Arab"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tashkil toggle */}
            <button
              id="btn-toggle-tashkil"
              onClick={() => onUpdateSettings({ showTashkil: !settings.showTashkil })}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                settings.showTashkil
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'border-black/10 dark:border-white/10 opacity-75'
              }`}
              title="Tampilkan / Hilangkan Harakat Arab"
            >
              حَرَكَات
            </button>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              <button
                id="btn-prev-hadith"
                onClick={onPrevious}
                disabled={!hasPrevious}
                className={`p-1.5 rounded-lg border transition-colors ${
                  hasPrevious
                    ? 'hover:bg-amber-600/10 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed'
                }`}
                style={{
                  borderColor: 'var(--syamila-border)',
                  backgroundColor: 'var(--syamila-card)'
                }}
                title="Hadits Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono px-1 opacity-75">
                {currentIndex + 1} / {totalInView}
              </span>
              <button
                id="btn-next-hadith"
                onClick={onNext}
                disabled={!hasNext}
                className={`p-1.5 rounded-lg border transition-colors ${
                  hasNext
                    ? 'hover:bg-amber-600/10 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed'
                }`}
                style={{
                  borderColor: 'var(--syamila-border)',
                  backgroundColor: 'var(--syamila-card)'
                }}
                title="Hadits Selanjutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hadith Metadata Banner */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-[11px] shadow-2xs ${getDerajatBadgeColor(hadith.derajat)}`}>
              <ShieldCheck className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
              {hadith.derajat}
            </span>
            <span className="opacity-75">
              Perawi: <strong>{hadith.rawiSahabat}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setShowSanadDetails(!showSanadDetails)}
              className="text-amber-800 dark:text-amber-300 hover:underline font-medium"
            >
              {showSanadDetails ? 'Sembunyikan Sanad' : 'Lihat Rantai Sanad'}
            </button>
          </div>
        </div>

        {/* Mobile Swipe Gesture Helper Bar */}
        <div className="sm:hidden pt-2.5 border-t mt-2.5 flex items-center justify-between text-[11px] opacity-75" style={{ borderColor: 'var(--syamila-border)' }}>
          <span className="flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Geser kanan: sebelumnya</span>
          </span>
          <span className="flex items-center gap-1">
            <span>Geser kiri: selanjutnya</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Floating Quick Action Buttons on Mobile Edges */}
      {hasPrevious && (
        <button
          onClick={onPrevious}
          className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full shadow-lg border backdrop-blur-md opacity-85 hover:opacity-100 transition-all active:scale-95 sm:hidden"
          style={{
            backgroundColor: 'var(--syamila-surface)',
            borderColor: 'var(--syamila-border)',
            color: 'var(--syamila-text)'
          }}
          title="Hadits Sebelumnya (Geser layar ke kanan)"
        >
          <ChevronLeft className="w-5 h-5 text-amber-700 dark:text-amber-300" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={onNext}
          className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full shadow-lg border backdrop-blur-md opacity-85 hover:opacity-100 transition-all active:scale-95 sm:hidden"
          style={{
            backgroundColor: 'var(--syamila-surface)',
            borderColor: 'var(--syamila-border)',
            color: 'var(--syamila-text)'
          }}
          title="Hadits Selanjutnya (Geser layar ke kiri)"
        >
          <ChevronRight className="w-5 h-5 text-amber-700 dark:text-amber-300" />
        </button>
      )}

      {/* Main Hadith Reading Paper with Smooth Drag & Swipe */}
      <article 
        id={`hadith-card-${hadith.id}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { setIsDragging(false); setDragOffset(0); }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`p-5 sm:p-8 rounded-2xl border shadow-xs relative swipe-container select-text ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)',
          transform: `translateX(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)',
          willChange: isDragging ? 'transform' : 'auto',
        }}
      >
        {/* Sanad Chain Block (Collapsible) */}
        {showSanadDetails && (
          <div 
            className="mb-6 p-4 rounded-xl text-xs sm:text-sm border leading-relaxed space-y-3"
            style={{
              backgroundColor: 'var(--syamila-card)',
              borderColor: 'var(--syamila-border)',
              color: 'var(--syamila-muted)'
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-bold text-[11px] uppercase tracking-wider opacity-80 flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>Rantai Sanad (سلسلة السند):</span>
              </div>
              <div className="flex items-center gap-2">
                {onOpenSanadGraph && (
                  <button
                    id="btn-open-sanad-graph-badge"
                    onClick={() => onOpenSanadGraph(hadith)}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg border bg-amber-500/15 border-amber-500/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/25 font-semibold flex items-center gap-1 transition-colors"
                    title="Buka visualisasi bagan sanad D3.js interaktif untuk hadits ini"
                  >
                    <GitBranch className="w-3 h-3 text-amber-600" />
                    <span>Bagan Sanad (D3)</span>
                  </button>
                )}
                <button
                  onClick={() => onOpenJarh?.()}
                  className="text-[11px] text-amber-700 dark:text-amber-300 hover:underline font-semibold flex items-center gap-1"
                  title="Buka Al-Jarh wa At-Ta'dil untuk meneliti rantai sanad ini"
                >
                  <span>Kaji Jarh & Ta'dil</span>
                  <Scale className="w-3 h-3 text-amber-600" />
                </button>
              </div>
            </div>

            <p className="italic">
              "{hadith.sanad}"
            </p>

            {/* Perawi Chips from HADITH_SANAD_MAP */}
            {HADITH_SANAD_MAP[hadith.id] && (
              <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-1.5">
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                  Rangkaian Perawi (Klik untuk lihat biografi & akreditasi):
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {HADITH_SANAD_MAP[hadith.id].silsilah.map((node, nIdx) => (
                    <button
                      key={nIdx}
                      onClick={() => onOpenJarh?.(node.rawiId)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs bg-black/5 dark:bg-white/5 hover:bg-amber-600/15 hover:border-amber-600/40 text-amber-900 dark:text-amber-200 transition-colors"
                      title={`${node.rawiName} (${node.statusLabel})`}
                    >
                      <span className="w-4 h-4 rounded-full bg-amber-700/20 text-[10px] flex items-center justify-center font-bold">
                        {node.order}
                      </span>
                      <span className="font-medium">{node.rawiName.split(' ')[0]} {node.rawiName.split(' ')[1] || ''}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Matan: Arabic Text */}
        <div className="my-6">
          <div 
            className={`${fontClass} select-text text-right`}
            style={{ fontSize: `${settings.arabicFontSize}px` }}
          >
            {displayArabicText}
          </div>
        </div>

        {/* Translation: Indonesian */}
        {settings.showTranslation && (
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--syamila-border)' }}>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-2 opacity-70">
              Terjemahan Bahasa Indonesia:
            </div>
            <p className="text-sm sm:text-base leading-relaxed select-text font-normal">
              "{hadith.terjemah}"
            </p>
          </div>
        )}

        {/* Classical Syarah & Takhrij Summary Banner */}
        <div 
          className="mt-8 p-4 rounded-xl border space-y-2 text-xs sm:text-sm"
          style={{
            backgroundColor: 'var(--syamila-card)',
            borderColor: 'var(--syamila-border)'
          }}
        >
          {hadith.takhrijRingkas && (
            <div>
              <strong className="text-amber-800 dark:text-amber-300">Takhrij: </strong>
              <span className="opacity-90">{hadith.takhrijRingkas}</span>
            </div>
          )}
          {hadith.syarahRingkas && (
            <div>
              <strong className="text-amber-800 dark:text-amber-300">Syarah Ringkas: </strong>
              <span className="opacity-90 leading-relaxed">{hadith.syarahRingkas}</span>
            </div>
          )}
          {hadith.tema && hadith.tema.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] opacity-70">Tema:</span>
              {hadith.tema.map((t) => (
                <span 
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Mu'jam Al-Mufahras Lexical Roots Strip */}
        <div 
          className="mt-6 p-4 rounded-xl border space-y-2 text-xs"
          style={{
            backgroundColor: 'var(--syamila-card)',
            borderColor: 'var(--syamila-border)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="font-bold text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Akar Kata Mu'jam Al-Mufahras (المعجم المفهرس لألفاظ الحديث):</span>
            </div>
            <button
              onClick={() => onOpenMujam?.()}
              className="text-[11px] text-amber-700 dark:text-amber-300 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Buka Fihris Lengkap</span>
              <Compass className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {(HADITH_LEXICAL_ANALYSIS[hadith.id] || [
              { word: 'نَوَى', rootStr: 'ن و ي', makna: 'Bermaksud / berkehendak kalbu' },
              { word: 'عَمَل', rootStr: 'ع م ل', makna: 'Perbuatan fisik / batiniah' },
              { word: 'عِلْم', rootStr: 'ع ل م', makna: 'Pengetahuan syariat' }
            ]).map((lex, idx) => (
              <button
                key={idx}
                onClick={() => onOpenMujam?.(lex.rootStr.replace(/\s+/g, ''))}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs bg-black/5 dark:bg-white/5 hover:bg-amber-600/15 hover:border-amber-600/30 text-amber-900 dark:text-amber-100 transition-colors"
                title={`Telusuri akar kata [${lex.rootStr}] di Kutubut Tis'ah menurut Mu'jam Al-Mufahras`}
              >
                <span className="font-arabic-amiri font-bold text-sm">{lex.word}</span>
                <span className="text-[10px] font-mono opacity-75 px-1 py-0.2 rounded bg-black/5 dark:bg-white/10">
                  {lex.rootStr}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[11px] opacity-70 italic mt-0.5">
            Klik salah satu akar kata untuk membuka analisis derivat dan persebaran syahid di 9 kitab induk hadits.
          </p>
        </div>

        {/* Action Toolbar on the Hadith */}
        <div className="mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-2"
          style={{ borderColor: 'var(--syamila-border)' }}
        >
          {/* Left Actions: Copy & Bookmark & Note */}
          <div className="flex items-center gap-2">
            <button
              id="btn-copy-hadith"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                copied 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              style={{
                borderColor: copied ? undefined : 'var(--syamila-border)'
              }}
              title="Salin teks Arab, terjemahan, dan rujukan hadits"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Hadits'}</span>
            </button>

            <button
              id="btn-toggle-bookmark"
              onClick={() => onToggleBookmark(hadith)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isBookmarked
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              style={{
                borderColor: isBookmarked ? undefined : 'var(--syamila-border)'
              }}
              title="Simpan hadits ke markah bacaan"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{isBookmarked ? 'Ditandai' : 'Tandai'}</span>
            </button>

            <button
              id="btn-open-note"
              onClick={() => onOpenNote(hadith)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              style={{ borderColor: 'var(--syamila-border)' }}
              title="Tulis catatan dan faedah ilmiah untuk hadits ini"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ta'liq / Catatan</span>
            </button>
          </div>

          {/* Right Actions: AI Syarah & Takhrij Assistant, Mu'jam Mufahras, Jarh wa Ta'dil, Bagan Sanad */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenSanadGraph && (
              <button
                id="btn-open-sanad-graph-hadith"
                onClick={() => onOpenSanadGraph(hadith)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-700/25 text-amber-900 dark:text-amber-200 border border-amber-600/40 hover:bg-amber-700/35 transition-colors shadow-2xs"
                title="Buka visualisasi bagan jalur sanad D3.js interaktif untuk hadits ini"
              >
                <GitBranch className="w-3.5 h-3.5 text-amber-600" />
                <span>Bagan Sanad (D3)</span>
              </button>
            )}

            <button
              id="btn-open-jarh-hadith"
              onClick={() => onOpenJarh?.()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-700/20 text-amber-900 dark:text-amber-200 border border-amber-600/40 hover:bg-amber-700/30 transition-colors shadow-2xs"
              title="Kaji kredibilitas perawi & maratib jarh wa ta'dil hadits ini"
            >
              <Scale className="w-3.5 h-3.5 text-amber-600" />
              <span>Jarh wa Ta'dil</span>
            </button>

            <button
              id="btn-open-mujam"
              onClick={() => onOpenMujam?.()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-700/15 text-amber-900 dark:text-amber-200 border border-amber-600/35 hover:bg-amber-700/25 transition-colors shadow-2xs"
              title="Kaji konkordansi akar kata & persebaran lafadz dengan Al-Mu'jam Al-Mufahras"
            >
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Mu'jam Mufahras</span>
            </button>

            <button
              id="btn-open-ai-syarah"
              onClick={() => onOpenAIWithTab('syarah')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-600/15 text-amber-800 dark:text-amber-300 border border-amber-600/30 hover:bg-amber-600/25 transition-colors shadow-2xs"
              title="Kaji syarah mendalam, asbabul wurud & faedah fiqih dengan Asisten AI"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Syarah Mendalam AI</span>
            </button>

            <button
              id="btn-open-ai-takhrij"
              onClick={() => onOpenAIWithTab('takhrij')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              style={{ borderColor: 'var(--syamila-border)' }}
              title="Kaji jalur sanad dan syawahid hadits ini"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Takhrij Sanad</span>
            </button>
          </div>
        </div>
      </article>

      {/* Bottom Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
            hasPrevious 
              ? 'hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer shadow-2xs' 
              : 'opacity-40 cursor-not-allowed'
          }`}
          style={{
            backgroundColor: 'var(--syamila-surface)',
            borderColor: 'var(--syamila-border)'
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Hadits Sebelumnya</span>
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
            hasNext 
              ? 'hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer shadow-2xs' 
              : 'opacity-40 cursor-not-allowed'
          }`}
          style={{
            backgroundColor: 'var(--syamila-surface)',
            borderColor: 'var(--syamila-border)'
          }}
        >
          <span>Hadits Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Developer & Khadim Maktabah Dedication Footer */}
      <footer 
        className="mt-10 pt-5 pb-4 border-t text-center text-xs opacity-85 space-y-2"
        style={{ borderColor: 'var(--syamila-border)' }}
      >
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-medium leading-relaxed">
          <span>Aplikasi Maktabah Darussalam Hadits dikembangkan oleh</span>
          <strong className="text-amber-800 dark:text-amber-300">Al-Faqir Husni, S. Kom. I</strong>
          <span>•</span>
          <span className="text-emerald-800 dark:text-emerald-300">Penyuluh Agama Islam Kemenag Lombok Barat</span>
        </div>
        <p className="text-[11px] opacity-75">
          Alumni Yayasan Ponpes Darussalam Bermi & STID Mustafa Ibrahim Al-Ishlahuddiny Kediri Lombok Barat
        </p>
        {onOpenDeveloperProfile && (
          <div className="pt-1">
            <button
              id="btn-reader-open-dev-profile"
              onClick={onOpenDeveloperProfile}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Profil Pengembang & Khadim Maktabah</span>
            </button>
          </div>
        )}
      </footer>
    </main>
  );
};
