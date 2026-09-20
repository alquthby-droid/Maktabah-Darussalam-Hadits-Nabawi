import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  X, 
  BookMarked, 
  Sparkles, 
  Layers, 
  BookOpen, 
  ExternalLink, 
  RefreshCw,
  Info,
  Hash,
  Compass,
  FileText
} from 'lucide-react';
import { HadithItem, MujamRootEntry } from '../types';
import { MUJAM_ROOTS_DATABASE, HADITH_LEXICAL_ANALYSIS } from '../data/mujamData';
import { MUJAM_KUTUB_SYMBOLS, removeTashkil, normalizeArabic } from '../utils/arabic';

interface MujamModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHadith?: HadithItem | null;
  onSelectHadith?: (kitabId: string, hadithId: string) => void;
  initialQuery?: string;
}

export const MujamModal: React.FC<MujamModalProps> = ({
  isOpen,
  onClose,
  currentHadith,
  onSelectHadith,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedRootId, setSelectedRootId] = useState<string>('root-nwy');
  const [activeTab, setActiveTab] = useState<'concordance' | 'hadith-words' | 'symbols-guide'>('concordance');
  const [customRootData, setCustomRootData] = useState<MujamRootEntry | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Sync initial query if passed
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      handleSearchRoot(initialQuery);
    }
  }, [initialQuery]);

  // Words breakdown for the active hadith
  const hadithWordAnalysis = useMemo(() => {
    if (!currentHadith) return [];
    if (HADITH_LEXICAL_ANALYSIS[currentHadith.id]) {
      return HADITH_LEXICAL_ANALYSIS[currentHadith.id];
    }
    // Fallback extraction from words in arab text
    const words = removeTashkil(currentHadith.arab)
      .replace(/[«»،.؟!:؛]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2)
      .slice(0, 10);

    return words.map((w) => ({
      word: w,
      normalized: normalizeArabic(w),
      rootId: 'root-nwy',
      rootStr: 'جذر لغوي',
      wazan: 'صيغة عربية',
      makna: 'Lafadz matan hadits yang dapat ditelusuri konkordansinya',
    }));
  }, [currentHadith]);

  // Filter roots database
  const filteredRoots = useMemo(() => {
    const q = normalizeArabic(searchQuery.trim().toLowerCase());
    if (!q) return MUJAM_ROOTS_DATABASE;

    return MUJAM_ROOTS_DATABASE.filter((entry) => {
      const rootClean = normalizeArabic(entry.root.replace(/\s+/g, ''));
      const arabicClean = normalizeArabic(entry.rootArabic);
      const translitClean = entry.transliteration.toLowerCase();
      const meaningClean = entry.generalMeaning.toLowerCase();
      const hasDerivative = entry.derivatives.some(
        (d) => normalizeArabic(d.arabic).includes(q) || d.meaning.toLowerCase().includes(q)
      );

      return (
        rootClean.includes(q) ||
        arabicClean.includes(q) ||
        translitClean.includes(q) ||
        meaningClean.includes(q) ||
        hasDerivative
      );
    });
  }, [searchQuery]);

  // Current active root entry to display
  const activeRoot = useMemo(() => {
    if (customRootData) return customRootData;
    const found = MUJAM_ROOTS_DATABASE.find((r) => r.id === selectedRootId);
    return found || filteredRoots[0] || MUJAM_ROOTS_DATABASE[0];
  }, [customRootData, selectedRootId, filteredRoots]);

  const handleSelectRoot = (rootId: string) => {
    setCustomRootData(null);
    setSelectedRootId(rootId);
    setActiveTab('concordance');
  };

  const handleSearchRoot = async (queryToSearch: string) => {
    const q = queryToSearch.trim();
    if (!q) return;

    // Check if in local list first
    const normQ = normalizeArabic(q);
    const localMatch = MUJAM_ROOTS_DATABASE.find((r) => {
      const rootClean = normalizeArabic(r.root.replace(/\s+/g, ''));
      const arabicClean = normalizeArabic(r.rootArabic);
      return (
        rootClean.includes(normQ) ||
        normQ.includes(rootClean) ||
        arabicClean.includes(normQ) ||
        normQ.includes(arabicClean) ||
        r.transliteration.toLowerCase().includes(q.toLowerCase())
      );
    });

    if (localMatch) {
      setCustomRootData(null);
      setSelectedRootId(localMatch.id);
      setActiveTab('concordance');
      return;
    }

    // Otherwise invoke the AI concordance API
    setLoadingAi(true);
    setAiError(null);
    try {
      const res = await fetch('/api/hadith/mujam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          currentHadith: currentHadith ? {
            kitabName: currentHadith.kitabName,
            number: currentHadith.number,
            arab: currentHadith.arab,
          } : undefined,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCustomRootData(json.data);
        setActiveTab('concordance');
      } else {
        setAiError(json.error || 'Konkordansi tidak ditemukan.');
      }
    } catch (err: any) {
      setAiError('Gagal memuat konkordansi kata.');
    } finally {
      setLoadingAi(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-5xl h-[92vh] max-h-[860px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden transition-colors"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b flex items-center justify-between gap-3"
          style={{ borderColor: 'var(--syamila-border)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-amber-100 shadow-sm border border-amber-600/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-sans">
                  Al-Mu'jam Al-Mufahras
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-600/15 text-amber-800 dark:text-amber-200 border border-amber-600/30">
                  المعجم المفهرس لألفاظ الحديث
                </span>
              </div>
              <p className="text-xs opacity-75 mt-0.5">
                Indeks Konkordansi Akar Kata & Persebaran Lafadz Hadits di Kutubut Tis'ah (A.J. Wensinck dkk)
              </p>
            </div>
          </div>

          <button
            id="btn-close-mujam"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Tutup Mu'jam"
            aria-label="Close Mu'jam"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 pt-3 flex items-center gap-2 border-b overflow-x-auto text-xs sm:text-sm"
          style={{ borderColor: 'var(--syamila-border)' }}
        >
          <button
            id="tab-mujam-concordance"
            onClick={() => setActiveTab('concordance')}
            className={`flex items-center gap-2 pb-2.5 px-3 font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'concordance'
                ? 'border-amber-700 text-amber-800 dark:text-amber-300'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Fihris Akar Kata & Konkordansi</span>
            {activeRoot && (
              <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10">
                {activeRoot.root}
              </span>
            )}
          </button>

          {currentHadith && (
            <button
              id="tab-mujam-hadith-words"
              onClick={() => setActiveTab('hadith-words')}
              className={`flex items-center gap-2 pb-2.5 px-3 font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'hadith-words'
                  ? 'border-amber-700 text-amber-800 dark:text-amber-300'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Analisis Lafadz Hadits Ini (#{currentHadith.number})</span>
            </button>
          )}

          <button
            id="tab-mujam-symbols"
            onClick={() => setActiveTab('symbols-guide')}
            className={`flex items-center gap-2 pb-2.5 px-3 font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'symbols-guide'
                ? 'border-amber-700 text-amber-800 dark:text-amber-300'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Panduan Simbol Kutubut Tis'ah (الرموز)</span>
          </button>
        </div>

        {/* Tab 1: Concordance & Root Explorer */}
        {activeTab === 'concordance' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left: Root Selection Directory & Search */}
            <div 
              className="w-full md:w-80 border-r flex flex-col overflow-hidden"
              style={{ borderColor: 'var(--syamila-border)', backgroundColor: 'var(--syamila-card)' }}
            >
              {/* Search Bar */}
              <div className="p-3 border-b" style={{ borderColor: 'var(--syamila-border)' }}>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchRoot(searchQuery);
                  }}
                  className="relative"
                >
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    id="input-mujam-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari akar kata (cth: ن و ي, عمل, هجر)..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl text-xs border focus:outline-hidden focus:ring-1 focus:ring-amber-600 transition-colors"
                    style={{
                      backgroundColor: 'var(--syamila-surface)',
                      borderColor: 'var(--syamila-border)',
                      color: 'var(--syamila-text)'
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>

                {/* AI Root Search Trigger */}
                {searchQuery.trim() && (
                  <button
                    id="btn-mujam-ai-lookup"
                    onClick={() => handleSearchRoot(searchQuery)}
                    disabled={loadingAi}
                    className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold bg-amber-600/15 text-amber-900 dark:text-amber-200 border border-amber-600/30 hover:bg-amber-600/25 transition-all"
                  >
                    {loadingAi ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span>{loadingAi ? 'Menganalisis Mu\'jam...' : 'Telusuri Konkordansi Kata Ini'}</span>
                  </button>
                )}
              </div>

              {/* Roots List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 opacity-60">
                  Daftar Akar Kata Populer (الجذور)
                </div>
                {filteredRoots.map((entry) => {
                  const isSelected = activeRoot?.id === entry.id;
                  return (
                    <button
                      key={entry.id}
                      onClick={() => handleSelectRoot(entry.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2 border ${
                        isSelected
                          ? 'bg-amber-700/15 text-amber-900 dark:text-amber-100 border-amber-600/40 shadow-2xs font-semibold'
                          : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-arabic-amiri text-base font-bold">
                            {entry.rootArabic}
                          </span>
                          <span className="text-xs font-mono opacity-80">
                            [{entry.root}]
                          </span>
                        </div>
                        <p className="text-[11px] line-clamp-1 opacity-70 mt-0.5">
                          {entry.generalMeaning}
                        </p>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-mono shrink-0">
                        {entry.totalOccurrences}x
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Root Details & Concordances */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {loadingAi && (
                <div className="p-8 text-center flex flex-col items-center justify-center">
                  <RefreshCw className="w-8 h-8 animate-spin text-amber-600 mb-3" />
                  <p className="text-sm font-semibold">Mengonkordansi leksikon Mu'jam Al-Mufahras...</p>
                  <p className="text-xs opacity-70 mt-1">Mencari persebaran lafadz dan derivat di Kutubut Tis'ah.</p>
                </div>
              )}

              {aiError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs">
                  {aiError}
                </div>
              )}

              {activeRoot && !loadingAi && (
                <div className="space-y-6">
                  {/* Root Overview Banner */}
                  <div 
                    className="p-5 rounded-2xl border shadow-2xs relative overflow-hidden"
                    style={{
                      backgroundColor: 'var(--syamila-card)',
                      borderColor: 'var(--syamila-border)'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl sm:text-4xl font-arabic-amiri font-bold text-amber-800 dark:text-amber-200">
                            {activeRoot.rootArabic}
                          </span>
                          <span className="text-lg sm:text-xl font-mono px-3 py-1 rounded-xl bg-amber-600/10 text-amber-900 dark:text-amber-200 border border-amber-600/25">
                            {activeRoot.root}
                          </span>
                          <span className="text-xs font-medium opacity-70">
                            ({activeRoot.transliteration})
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm mt-2 leading-relaxed opacity-90 max-w-2xl">
                          <strong>Makna Lughawi:</strong> {activeRoot.generalMeaning}
                        </p>
                      </div>

                      <div className="shrink-0 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-center sm:text-right">
                        <div className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-300">
                          {activeRoot.totalOccurrences}
                        </div>
                        <div className="text-[11px] opacity-70 uppercase tracking-wider">
                          Kemunculan di Kutubut Tis'ah
                        </div>
                      </div>
                    </div>

                    {activeRoot.sharhMufahras && (
                      <div className="mt-4 pt-3 border-t text-xs leading-relaxed opacity-80"
                        style={{ borderColor: 'var(--syamila-border)' }}
                      >
                        <strong className="text-amber-800 dark:text-amber-300">Catatan Mu'jam: </strong>
                        {activeRoot.sharhMufahras}
                      </div>
                    )}
                  </div>

                  {/* Derivatives Grid */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 opacity-80">
                      <Layers className="w-4 h-4 text-amber-600" />
                      <span>Ragam Bentuk Derivasi & Shighah (الصيغ المشتقة)</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {activeRoot.derivatives.map((der, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border flex items-center justify-between gap-3 shadow-2xs"
                          style={{
                            backgroundColor: 'var(--syamila-card)',
                            borderColor: 'var(--syamila-border)'
                          }}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-arabic-amiri text-lg font-bold text-amber-800 dark:text-amber-200">
                                {der.arabic}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 opacity-75">
                                {der.form}
                              </span>
                            </div>
                            <p className="text-xs opacity-80 mt-0.5">
                              {der.meaning}
                            </p>
                          </div>
                          <span className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-amber-600/10 text-amber-800 dark:text-amber-200">
                            ~{der.count}x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Occurrences in Kutubut Tis'ah Table */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 opacity-80">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span>Persebaran Lafadz di Kitab Hadits (مواضع الحديث بالرموز)</span>
                      </h3>
                      <span className="text-xs opacity-70">
                        Total {activeRoot.occurrences.length} syahid terindeks
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {activeRoot.occurrences.map((occ, idx) => {
                        const symbolInfo = MUJAM_KUTUB_SYMBOLS[occ.symbol] || {
                          symbol: occ.symbol,
                          name: occ.kitabName,
                          author: '',
                          color: 'text-stone-700',
                          badgeBg: 'bg-stone-500/15 border-stone-500/30 text-stone-900',
                          kitabId: occ.kitabId
                        };

                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border transition-all hover:border-amber-600/50 shadow-2xs"
                            style={{
                              backgroundColor: 'var(--syamila-card)',
                              borderColor: 'var(--syamila-border)'
                            }}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b"
                              style={{ borderColor: 'var(--syamila-border)' }}
                            >
                              <div className="flex items-center gap-2">
                                {/* Rumuz Badge */}
                                <span 
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm border shadow-2xs font-arabic-amiri ${symbolInfo.badgeBg}`}
                                  title={`Simbol Mu'jam: [${occ.symbol}] = ${symbolInfo.name}`}
                                >
                                  {occ.symbol}
                                </span>
                                <div>
                                  <span className="font-bold text-xs sm:text-sm">
                                    {occ.kitabName}
                                  </span>
                                  <span className="text-xs font-mono opacity-70 ml-2">
                                    No. {occ.hadithNumber}
                                  </span>
                                </div>
                              </div>

                              {/* Form in context */}
                              <span className="text-xs font-arabic-amiri font-bold px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-amber-800 dark:text-amber-200">
                                {occ.lafadzForm}
                              </span>
                            </div>

                            {/* Bab name */}
                            <p className="text-xs opacity-75 mt-2 italic font-sans">
                              {occ.babName}
                            </p>

                            {/* Excerpt */}
                            <div className="mt-2.5 p-2.5 rounded-lg bg-black/5 dark:bg-white/5 font-arabic-amiri text-right text-sm sm:text-base leading-relaxed">
                              «{occ.excerpt}»
                            </div>

                            {/* Jump to hadith if available */}
                            {onSelectHadith && (
                              <div className="mt-3 flex justify-end">
                                <button
                                  onClick={() => {
                                    onSelectHadith(occ.kitabId, `${occ.kitabId}-${occ.hadithNumber}`);
                                    onClose();
                                  }}
                                  className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline"
                                >
                                  <span>Buka Hadits di Syamila</span>
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Hadith Word Breakdown (Analisis Lafadz Hadits Ini) */}
        {activeTab === 'hadith-words' && currentHadith && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-600/15 text-amber-800 dark:text-amber-200 border border-amber-600/30">
                  {currentHadith.kitabName} No. {currentHadith.number}
                </span>
                <span className="text-xs opacity-70">
                  {currentHadith.chapterTitle}
                </span>
              </div>
              <div className="font-arabic-amiri text-right text-lg leading-relaxed p-3 bg-black/5 dark:bg-white/5 rounded-xl">
                {currentHadith.arab}
              </div>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 opacity-80">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Peta Konkordansi Mu'jam untuk Lafadz Matan:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hadithWordAnalysis.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border flex flex-col justify-between gap-3 shadow-2xs hover:border-amber-600/50 transition-all"
                    style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-arabic-amiri text-xl font-bold text-amber-800 dark:text-amber-200">
                          {item.word}
                        </span>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-600/15 text-amber-900 dark:text-amber-200 border border-amber-600/25">
                          جذر: {item.rootStr}
                        </span>
                      </div>
                      <div className="text-[11px] opacity-75 font-mono mt-1">
                        Wazan / Shighah: {item.wazan}
                      </div>
                      <p className="text-xs opacity-85 mt-2 leading-relaxed">
                        {item.makna}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        handleSearchRoot(item.rootStr.replace(/\s+/g, ''));
                      }}
                      className="self-end flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-amber-600/20 text-amber-800 dark:text-amber-200 transition-colors"
                    >
                      <span>Lihat Konkordansi Mu'jam</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Symbols Guide (Panduan Rumuz Kutubut Tis'ah) */}
        {activeTab === 'symbols-guide' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="p-4 rounded-xl border space-y-2"
              style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
            >
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 text-amber-800 dark:text-amber-200">
                <BookMarked className="w-5 h-5 text-amber-600" />
                <span>Metodologi Al-Mu'jam Al-Mufahras li Alfazh Al-Hadits An-Nabawi</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed opacity-85">
                Kitab <strong>Al-Mu'jam Al-Mufahras li Alfazh Al-Hadits An-Nabawi</strong> (المعجم المفهرس لألفاظ الحديث النبوي) adalah karya monumen leksikografi hadits terakurat yang merangkum seluruh perbendaharaan kata sabda Rasulullah shallallahu 'alaihi wa sallam di dalam 9 kitab hadits induk (Kutubut Tis'ah).
              </p>
              <p className="text-xs sm:text-sm leading-relaxed opacity-85">
                Setiap hadits disingkat dengan <strong>simbol huruf tunggal/ganda (رموز الكتب)</strong> untuk mempermudah perujukan cepat:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {Object.entries(MUJAM_KUTUB_SYMBOLS).map(([sym, info]) => (
                <div
                  key={sym}
                  className="p-4 rounded-xl border shadow-2xs flex items-start gap-3.5"
                  style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg font-arabic-amiri shrink-0 border ${info.badgeBg}`}>
                    {sym}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">
                        {info.name}
                      </span>
                    </div>
                    <div className="text-xs opacity-75 mt-0.5">
                      Penyusun: {info.author}
                    </div>
                    <div className="text-[11px] font-mono opacity-60 mt-1">
                      Kode Mu'jam: [{sym}]
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border text-xs leading-relaxed opacity-80"
              style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
            >
              <strong>Cara Membaca Konkordansi:</strong> Misalnya tertulis <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">خ: بدء الوحي ١</code>, maknanya hadits tersebut diriwayatkan oleh <strong>Imam Bukhari (خ)</strong> dalam <strong>Kitab Bad'ul Wahyi</strong> pada hadits nomor <strong>1</strong>.
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs opacity-75"
          style={{ borderColor: 'var(--syamila-border)' }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Basis Data Konkordansi Mu'jam Aktif & Tersinkronisasi</span>
          </div>
          <div>
            Kutubut Tis'ah: Bukhari, Muslim, Abu Dawud, Tirmidzi, Nasa'i, Ibnu Majah, Malik, Ahmad, Darimi.
          </div>
        </div>
      </div>
    </div>
  );
};
