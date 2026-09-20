import React, { useState } from 'react';
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
  UserCheck
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
      className="flex-1 overflow-y-auto px-3 sm:px-8 py-6 max-w-5xl mx-auto w-full transition-colors duration-200 pb-28 md:pb-8 touch-scroll"
    >
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
              <ShieldCheck className="w-3 h-3 inline mr-1 -mt-0.5" />
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
      </div>

      {/* Main Hadith Reading Paper */}
      <article 
        id={`hadith-card-${hadith.id}`}
        className="p-5 sm:p-8 rounded-2xl border shadow-xs transition-colors relative"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
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
