import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  UserCheck, 
  ShieldAlert, 
  BookOpen, 
  Layers, 
  Award, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  BookMarked,
  Scale
} from 'lucide-react';
import { HadithItem, RawiProfile, RawiStatusCategory } from '../types';
import { 
  RAWI_PROFILES, 
  HADITH_SANAD_MAP, 
  MARATIB_TA_DIL, 
  MARATIB_JARH, 
  KAIDAH_JARH_TADIL 
} from '../data/jarhData';

interface JarhTadilModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHadith?: HadithItem | null;
  onSelectHadith?: (kitabId: string, hadithId: string) => void;
  initialRawiId?: string;
}

export const JarhTadilModal: React.FC<JarhTadilModalProps> = ({
  isOpen,
  onClose,
  currentHadith,
  initialRawiId
}) => {
  const [activeTab, setActiveTab] = useState<'sanad' | 'rawi' | 'maratib' | 'ai'>('sanad');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThabaqah, setSelectedThabaqah] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<RawiStatusCategory | 'all'>('all');
  const [selectedRawi, setSelectedRawi] = useState<RawiProfile>(() => {
    if (initialRawiId) {
      const found = RAWI_PROFILES.find(r => r.id === initialRawiId);
      if (found) return found;
    }
    return RAWI_PROFILES[0];
  });

  // AI custom lookup state
  const [customRawiName, setCustomRawiName] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Sync initialRawiId if passed
  useEffect(() => {
    if (initialRawiId) {
      const found = RAWI_PROFILES.find(r => r.id === initialRawiId);
      if (found) {
        setSelectedRawi(found);
        setActiveTab('rawi');
      }
    }
  }, [initialRawiId]);

  if (!isOpen) return null;

  // Active hadith sanad analysis
  const activeSanadAnalysis = currentHadith ? HADITH_SANAD_MAP[currentHadith.id] : null;

  // Filtered rawi list
  const filteredRawiList = RAWI_PROFILES.filter(rawi => {
    const matchesSearch = 
      rawi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rawi.nameArabic.includes(searchQuery) ||
      (rawi.kunyah && rawi.kunyah.toLowerCase().includes(searchQuery.toLowerCase())) ||
      rawi.statusTaqrib.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesThabaqah = selectedThabaqah === 'all' || rawi.thabaqahNumber === selectedThabaqah;
    const matchesStatus = selectedStatus === 'all' || rawi.statusCategory === selectedStatus;

    return matchesSearch && matchesThabaqah && matchesStatus;
  });

  // Handle AI Custom Rawi Research
  const handleQueryCustomRawi = async (rawiName: string) => {
    if (!rawiName.trim()) return;
    setAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch('/api/hadith/jarh-watadil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawiQuery: rawiName.trim(),
          hadithContext: currentHadith ? {
            kitabName: currentHadith.kitabName,
            number: currentHadith.number,
            sanad: currentHadith.sanad
          } : undefined
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setSelectedRawi(data.data);
        setActiveTab('rawi');
      } else {
        setAiError(data.error || 'Gagal meneliti data perawi dari turats.');
      }
    } catch (err: any) {
      setAiError('Terjadi gangguan jaringan saat meneliti biografi perawi.');
    } finally {
      setAiLoading(false);
    }
  };

  const getStatusBadge = (category: RawiStatusCategory) => {
    switch (category) {
      case 'sahabat':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30">
            <Award className="w-3 h-3 text-amber-600" />
            <span>Sahabat (Kulluhum 'Udul)</span>
          </span>
        );
      case 'tsiqah':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Tsiqah / Tsabat / Hafizh</span>
          </span>
        );
      case 'shaduq':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-800 dark:text-blue-200 border border-blue-500/30">
            <UserCheck className="w-3 h-3 text-blue-600" />
            <span>Shaduq (Hasanul Hadits)</span>
          </span>
        );
      case 'dhaif':
      case 'layyin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/15 text-yellow-800 dark:text-yellow-200 border border-yellow-500/30">
            <AlertTriangle className="w-3 h-3 text-yellow-600" />
            <span>Dha'if / Layyinul Hadits</span>
          </span>
        );
      case 'matruk':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-800 dark:text-red-200 border border-red-500/30">
            <ShieldAlert className="w-3 h-3 text-red-600" />
            <span>Matruk / Muttaham</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-500/15 text-stone-800 dark:text-stone-200 border border-stone-500/30">
            <span>Maqbul</span>
          </span>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--syamila-bg)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ 
            backgroundColor: 'var(--syamila-card)',
            borderColor: 'var(--syamila-border)'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-700/15 border border-amber-600/30 flex items-center justify-center text-amber-700 dark:text-amber-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">Al-Jarh wa At-Ta'dil</h2>
                <span className="font-arabic-amiri text-lg text-amber-700 dark:text-amber-300 font-bold">
                  (عِلْمُ الجَرْحِ وَالتَّعْدِيلِ)
                </span>
              </div>
              <p className="text-xs opacity-75">
                Kritik & Akreditasi Rijalul Hadits, Tingkatan Maratib Jarh/Ta'dil, dan Analisis Silsilah Sanad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-colors"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div 
          className="flex items-center gap-2 px-6 py-2.5 border-b overflow-x-auto shrink-0 text-xs font-semibold"
          style={{ 
            backgroundColor: 'var(--syamila-card)',
            borderColor: 'var(--syamila-border)'
          }}
        >
          <button
            onClick={() => setActiveTab('sanad')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'sanad'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Silsilah Sanad Hadits Ini</span>
            {currentHadith && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20">
                {currentHadith.kitabName} #{currentHadith.number}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('rawi')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'rawi'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Biografi & Akreditasi Rawi ({RAWI_PROFILES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('maratib')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'maratib'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Tingkatan Maratib & Kaidah</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'ai'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Uji Rawi Baru (Kutub Rijal)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: SILSILAH SANAD HADITS */}
          {activeTab === 'sanad' && (
            <div className="space-y-6">
              {currentHadith ? (
                <>
                  {/* Hadith Overview Strip */}
                  <div 
                    className="p-4 rounded-xl border space-y-2"
                    style={{
                      backgroundColor: 'var(--syamila-card)',
                      borderColor: 'var(--syamila-border)'
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-amber-700 dark:text-amber-300">
                          {currentHadith.kitabName} — Hadits No. {currentHadith.number}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30">
                          {currentHadith.derajat}
                        </span>
                      </div>
                      <div className="text-xs opacity-75">
                        Sahabat Rawi: <strong className="font-semibold">{currentHadith.rawiSahabat}</strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-black/5 dark:border-white/5">
                      <p className="text-xs opacity-80 leading-relaxed font-sans">
                        <strong className="text-amber-800 dark:text-amber-300">Teks Sanad Kitab: </strong>
                        {currentHadith.sanad}
                      </p>
                    </div>
                  </div>

                  {/* Sanad Analysis Summary */}
                  {activeSanadAnalysis ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/30">
                          <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300">
                            Ittishal as-Sanad (Ketersambungan)
                          </span>
                          <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200 mt-1">
                            {activeSanadAnalysis.ittishalSanad} (Bersambung Penuh)
                          </p>
                          <p className="text-xs opacity-80 mt-1">
                            Setiap perawi mendengar langsung dengan shighah tahammul yang sah.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
                          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-800 dark:text-amber-300">
                            Derajat Sanad
                          </span>
                          <p className="text-sm font-bold text-amber-900 dark:text-amber-200 mt-1">
                            {activeSanadAnalysis.derajatSanad}
                          </p>
                          <p className="text-xs opacity-80 mt-1">
                            Diakui keabsahannya dalam standardisasi jarh wa ta'dil para huffazh.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl border bg-blue-500/10 border-blue-500/30">
                          <span className="text-[11px] uppercase tracking-wider font-bold text-blue-800 dark:text-blue-300">
                            Total Ruwat dalam Sanad
                          </span>
                          <p className="text-sm font-bold text-blue-900 dark:text-blue-200 mt-1">
                            {activeSanadAnalysis.silsilah.length} Perawi Bertingkat
                          </p>
                          <p className="text-xs opacity-80 mt-1">
                            Klik nama perawi di bawah untuk melihat akreditasi dan riwayatnya.
                          </p>
                        </div>
                      </div>

                      {/* Interactive Sanad Chain Diagram */}
                      <div 
                        className="p-5 rounded-2xl border space-y-4"
                        style={{
                          backgroundColor: 'var(--syamila-card)',
                          borderColor: 'var(--syamila-border)'
                        }}
                      >
                        <div className="flex items-center justify-between border-b pb-3 border-black/5 dark:border-white/5">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-600" />
                            <h3 className="text-sm font-bold">
                              Visualisasi Rantai Perawi (Silsilah ar-Ruwat)
                            </h3>
                          </div>
                          <span className="text-xs opacity-75">
                            Dari Pengarang Kitab hingga Rasulullah ﷺ
                          </span>
                        </div>

                        {/* Step-by-step Nodes */}
                        <div className="space-y-3 pt-2">
                          {activeSanadAnalysis.silsilah.map((node, index) => {
                            const rawiProf = RAWI_PROFILES.find(r => r.id === node.rawiId);

                            return (
                              <div key={node.rawiId || index} className="relative">
                                {/* Connector Line */}
                                {index < activeSanadAnalysis.silsilah.length - 1 && (
                                  <div className="absolute left-6 top-10 bottom-[-14px] w-0.5 bg-amber-600/30 z-0" />
                                )}

                                <div 
                                  onClick={() => {
                                    if (rawiProf) {
                                      setSelectedRawi(rawiProf);
                                      setActiveTab('rawi');
                                    }
                                  }}
                                  className="relative z-10 flex items-start gap-4 p-3.5 rounded-xl border transition-all cursor-pointer hover:border-amber-600/60 hover:shadow-md hover:bg-black/5 dark:hover:bg-white/5"
                                  style={{
                                    backgroundColor: 'var(--syamila-bg)',
                                    borderColor: 'var(--syamila-border)'
                                  }}
                                >
                                  {/* Step Number */}
                                  <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-800 dark:text-amber-200 border border-amber-600/40 flex items-center justify-center text-xs font-bold shrink-0">
                                    {node.order}
                                  </div>

                                  {/* Details */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-sm text-amber-900 dark:text-amber-100">
                                          {node.rawiName}
                                        </h4>
                                        <span className="text-xs font-mono opacity-60">
                                          ({node.thabaqah})
                                        </span>
                                      </div>
                                      <span className="font-arabic-amiri text-sm font-bold text-amber-800 dark:text-amber-300" dir="rtl">
                                        {node.rawiArabic}
                                      </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                                      <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 font-mono text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
                                        Shighah: {node.shighahTahammul}
                                      </span>
                                      {getStatusBadge(node.statusCategory)}
                                      <span className="text-[11px] opacity-75 font-semibold">
                                        Predikat: {node.statusLabel}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center text-xs text-amber-700 dark:text-amber-300 font-semibold opacity-75 hover:opacity-100 shrink-0">
                                    <span>Lihat Profil</span>
                                    <ChevronRight className="w-4 h-4 ml-0.5" />
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {/* Terminal Node: Rasulullah SAW */}
                          <div className="relative z-10 flex items-center gap-4 p-4 rounded-xl border bg-amber-600/15 border-amber-600/40 text-amber-950 dark:text-amber-100">
                            <div className="w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                              ★
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                              <div>
                                <h4 className="font-bold text-sm">Rasulullah Muhammad shallallahu 'alaihi wa sallam</h4>
                                <p className="text-xs opacity-80">Sumber risalah dan wahyu nabawiyyah (Shadiqul Mashduq)</p>
                              </div>
                              <span className="font-arabic-amiri text-lg font-bold text-amber-800 dark:text-amber-200" dir="rtl">
                                رَسُولُ اللَّهِ ﷺ
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Kaidah Jarh wa Ta'dil Explanation */}
                        <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
                          <strong className="text-amber-800 dark:text-amber-200 font-bold block text-sm">
                            Kaidah Jarh wa Ta'dil pada Sanad Ini:
                          </strong>
                          <p className="opacity-90 leading-relaxed">
                            {activeSanadAnalysis.kaidahJarh}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="p-6 rounded-2xl border text-center space-y-3"
                      style={{
                        backgroundColor: 'var(--syamila-card)',
                        borderColor: 'var(--syamila-border)'
                      }}
                    >
                      <UserCheck className="w-10 h-10 mx-auto text-amber-600 opacity-60" />
                      <h4 className="font-bold text-base">Sanad Sedang Dikaji</h4>
                      <p className="text-xs opacity-75 max-w-md mx-auto">
                        Sanad hadits ini bersambung ke sahabat <strong>{currentHadith.rawiSahabat}</strong>. Anda dapat meneliti biografi para perawi di tab "Biografi & Akreditasi Rawi" atau mencari nama perawi khusus melalui tab "Uji Rawi Baru".
                      </p>
                      <button
                        onClick={() => setActiveTab('rawi')}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors"
                      >
                        Buka Katalog Biografi Rawi
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-12 text-center opacity-70">
                  <Layers className="w-12 h-12 mx-auto mb-3 text-amber-600" />
                  <p className="text-sm">Buka hadits di Maktabah Syamila untuk menelaah silsilah sanadnya secara interaktif.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BIOGRAFI & AKREDITASI RAWI */}
          {activeTab === 'rawi' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Rawi Filter & List (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                {/* Search Box */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari perawi (Umar, Malik, Aisyah, Sufyan...)"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-amber-600/40"
                    style={{
                      backgroundColor: 'var(--syamila-card)',
                      borderColor: 'var(--syamila-border)'
                    }}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-50 hover:opacity-100"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filters */}
                <div className="flex gap-2 text-xs">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="flex-1 px-2.5 py-1.5 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: 'var(--syamila-card)',
                      borderColor: 'var(--syamila-border)'
                    }}
                  >
                    <option value="all">Semua Status Akreditasi</option>
                    <option value="sahabat">Sahabat Nabi</option>
                    <option value="tsiqah">Tsiqah / Tsabat / Hafizh</option>
                    <option value="shaduq">Shaduq</option>
                    <option value="dhaif">Dha'if</option>
                  </select>

                  <select
                    value={selectedThabaqah}
                    onChange={(e) => setSelectedThabaqah(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="flex-1 px-2.5 py-1.5 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: 'var(--syamila-card)',
                      borderColor: 'var(--syamila-border)'
                    }}
                  >
                    <option value="all">Semua Thabaqah</option>
                    <option value="1">Thabaqah 1 (Sahabat)</option>
                    <option value="2">Thabaqah 2 (Kibar Tabi'in)</option>
                    <option value="3">Thabaqah 3 (Wustha Tabi'in)</option>
                    <option value="4">Thabaqah 4 (Tabi'in)</option>
                    <option value="5">Thabaqah 5 (Shighar Tabi'in)</option>
                    <option value="7">Thabaqah 7 (Kibar Atba')</option>
                    <option value="8">Thabaqah 8 (Atba' Tabi'in)</option>
                    <option value="10">Thabaqah 10 (Syaikhul Aimmah)</option>
                    <option value="11">Thabaqah 11 (Aimmatul Hadits)</option>
                  </select>
                </div>

                {/* Rawi List */}
                <div className="space-y-2 max-h-[58vh] overflow-y-auto pr-1">
                  {filteredRawiList.length > 0 ? (
                    filteredRawiList.map((rawi) => {
                      const isSelected = selectedRawi?.id === rawi.id;
                      return (
                        <div
                          key={rawi.id}
                          onClick={() => setSelectedRawi(rawi)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-amber-600/15 border-amber-600 shadow-xs'
                              : 'hover:bg-black/5 dark:hover:bg-white/5'
                          }`}
                          style={{
                            borderColor: isSelected ? 'var(--syamila-gold)' : 'var(--syamila-border)'
                          }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-100">
                                {rawi.name}
                              </h4>
                              <p className="text-[11px] opacity-70 mt-0.5">
                                {rawi.thabaqah} • Wafat {rawi.deathYear}
                              </p>
                            </div>
                            <span className="font-arabic-amiri text-sm font-bold text-amber-800 dark:text-amber-300" dir="rtl">
                              {rawi.nameArabic.split(' ')[0]} {rawi.nameArabic.split(' ')[1] || ''}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            {getStatusBadge(rawi.statusCategory)}
                            <div className="flex items-center gap-0.5 text-[10px] font-mono opacity-80 px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10">
                              {rawi.kutubSymbols.map((sym, sIdx) => (
                                <span key={sIdx} className="font-bold">{sym}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-xs opacity-60">
                      Tidak ditemukan perawi dengan kriteria tersebut.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Detailed Rawi Dossier (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {selectedRawi ? (
                  <div 
                    className="p-5 sm:p-6 rounded-2xl border space-y-5"
                    style={{
                      backgroundColor: 'var(--syamila-card)',
                      borderColor: 'var(--syamila-border)'
                    }}
                  >
                    {/* Header Card */}
                    <div className="space-y-3 pb-4 border-b border-black/5 dark:border-white/5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">
                              {selectedRawi.thabaqah}
                            </span>
                            <span className="text-xs opacity-50">•</span>
                            <span className="text-xs opacity-80">Domisili: {selectedRawi.domicile}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold mt-1 text-amber-950 dark:text-amber-100">
                            {selectedRawi.name}
                          </h3>
                          {selectedRawi.kunyah && (
                            <p className="text-xs opacity-75 mt-0.5">
                              Kunyah: <span className="font-semibold">{selectedRawi.kunyah}</span> | Nasab: {selectedRawi.nasab}
                            </p>
                          )}
                        </div>

                        {/* Ruzmu Kutubus Sittah */}
                        <div className="text-right">
                          <div className="text-[10px] uppercase font-bold opacity-60 mb-1">
                            Kutubus Sittah
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            {selectedRawi.kutubSymbols.map((sym, i) => (
                              <span 
                                key={i}
                                className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs bg-amber-700 text-white shadow-2xs"
                                title={`Diriwayatkan dalam kitab berkode [${sym}]`}
                              >
                                {sym}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Arabic Full Name Banner */}
                      <div className="p-3 rounded-xl bg-amber-600/10 border border-amber-600/25 text-right" dir="rtl">
                        <p className="font-arabic-amiri text-lg sm:text-xl font-bold text-amber-900 dark:text-amber-200 leading-relaxed">
                          {selectedRawi.nameArabic}
                        </p>
                        <p className="text-xs opacity-80 mt-1 font-sans text-left" dir="ltr">
                          Wafat: <strong>{selectedRawi.deathYear}</strong>
                        </p>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {getStatusBadge(selectedRawi.statusCategory)}
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                          {selectedRawi.statusTaqrib}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono opacity-75 bg-black/5 dark:bg-white/5">
                          {selectedRawi.maratibTadil}
                        </span>
                      </div>
                    </div>

                    {/* Section: Aqwal al-Aimmah (Penilaian Para Imam Jarh & Ta'dil) */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                          Penilaian Para Imam Naqqad (أَقْوَالُ أَئِمَّةِ الجَرْحِ وَالتَّعْدِيلِ)
                        </h4>
                      </div>

                      <div className="space-y-2.5">
                        {selectedRawi.aqwalAimmah.map((qawl, qIdx) => (
                          <div 
                            key={qIdx}
                            className="p-3 rounded-xl border text-xs space-y-1.5"
                            style={{
                              backgroundColor: 'var(--syamila-bg)',
                              borderColor: 'var(--syamila-border)'
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-amber-900 dark:text-amber-200">
                                {qawl.imam}
                              </span>
                              <span className="text-[10px] opacity-60">Imam Naqqad</span>
                            </div>

                            <p className="font-arabic-amiri text-sm font-semibold text-amber-800 dark:text-amber-300 text-right leading-relaxed" dir="rtl">
                              «{qawl.qawl}»
                            </p>

                            <p className="opacity-80 italic text-[11px] pt-1 border-t border-black/5 dark:border-white/5">
                              "{qawl.indonesia}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section: Syuyukh & Talamidz */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div 
                        className="p-3.5 rounded-xl border space-y-1.5 text-xs"
                        style={{
                          backgroundColor: 'var(--syamila-bg)',
                          borderColor: 'var(--syamila-border)'
                        }}
                      >
                        <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Guru-guru Masyhur (الشيوخ):</span>
                        </div>
                        <ul className="space-y-1 opacity-85 list-disc list-inside">
                          {selectedRawi.syuyukh.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div 
                        className="p-3.5 rounded-xl border space-y-1.5 text-xs"
                        style={{
                          backgroundColor: 'var(--syamila-bg)',
                          borderColor: 'var(--syamila-border)'
                        }}
                      >
                        <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Murid-murid Masyhur (التلاميذ):</span>
                        </div>
                        <ul className="space-y-1 opacity-85 list-disc list-inside">
                          {selectedRawi.talamidz.map((t, idx) => (
                            <li key={idx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Section: Ringkasan Biografi & Kiprah Ilmiah */}
                    <div 
                      className="p-4 rounded-xl border text-xs space-y-1.5"
                      style={{
                        backgroundColor: 'var(--syamila-bg)',
                        borderColor: 'var(--syamila-border)'
                      }}
                    >
                      <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5" />
                        <span>Kiprah Ilmiah & Kedudukan dalam Hadits:</span>
                      </div>
                      <p className="opacity-90 leading-relaxed text-justify">
                        {selectedRawi.biographySummary}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center opacity-60">
                    Pilih salah satu perawi dari daftar di samping.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TINGKATAN MARATIB & KAIDAH */}
          {activeTab === 'maratib' && (
            <div className="space-y-6">
              {/* Introduction */}
              <div 
                className="p-4 rounded-xl border space-y-2 text-xs"
                style={{
                  backgroundColor: 'var(--syamila-card)',
                  borderColor: 'var(--syamila-border)'
                }}
              >
                <h3 className="font-bold text-sm text-amber-900 dark:text-amber-200">
                  Sistematika Maratib Al-Jarh wa At-Ta'dil
                </h3>
                <p className="opacity-80 leading-relaxed">
                  Para imam naqqad hadits (seperti Ibnu Abi Hatim ar-Razi dalam <em>Al-Jarh wa At-Ta'dil</em>, Ibnu ash-Shalah dalam <em>Muqaddimah</em>, dan Al-Hafizh Ibnu Hajar dalam <em>Taqrib at-Tahdzib</em>) menyusun lafadz-lafadz akreditasi perawi ke dalam tingkatan martabat bertingkat untuk menentukan apakah suatu hadits dapat menjadi hujjah mandiri, pendukung (i'tibar), atau harus ditolak.
                </p>
              </div>

              {/* 6 Maratib Ta'dil */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                    6 Tingkatan Ta'dil (مَرَاتِبُ التَّعْدِيلِ)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MARATIB_TA_DIL.map((item) => (
                    <div 
                      key={item.tingkat}
                      className="p-4 rounded-xl border space-y-2 text-xs"
                      style={{
                        backgroundColor: 'var(--syamila-card)',
                        borderColor: 'var(--syamila-border)'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">
                          {item.nama}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-bold">
                          Tingkat #{item.tingkat}
                        </span>
                      </div>

                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-right" dir="rtl">
                        <span className="font-arabic-amiri text-sm font-bold text-emerald-950 dark:text-emerald-200">
                          {item.lafadz}
                        </span>
                      </div>

                      <p className="opacity-85 text-[11px] leading-relaxed">
                        <strong>Hukum Riwayat: </strong>{item.hukum}
                      </p>

                      <p className="opacity-70 text-[11px]">
                        <strong>Contoh Tokoh: </strong>{item.contoh}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6 Maratib Jarh */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                    6 Tingkatan Jarh (مَرَاتِبُ الجَرْحِ)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MARATIB_JARH.map((item) => (
                    <div 
                      key={item.tingkat}
                      className="p-4 rounded-xl border space-y-2 text-xs"
                      style={{
                        backgroundColor: 'var(--syamila-card)',
                        borderColor: 'var(--syamila-border)'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-800 dark:text-amber-300">
                          {item.nama}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-200 font-bold">
                          {item.status}
                        </span>
                      </div>

                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-right" dir="rtl">
                        <span className="font-arabic-amiri text-sm font-bold text-amber-950 dark:text-amber-200">
                          {item.lafadz}
                        </span>
                      </div>

                      <p className="opacity-85 text-[11px] leading-relaxed">
                        <strong>Hukum Riwayat: </strong>{item.hukum}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kaidah Emas Jarh wa Ta'dil */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                    Kaidah-Kaidah Emas Tarjih Jarh wa Ta'dil
                  </h4>
                </div>

                <div className="space-y-3">
                  {KAIDAH_JARH_TADIL.map((k, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl border space-y-2 text-xs"
                      style={{
                        backgroundColor: 'var(--syamila-card)',
                        borderColor: 'var(--syamila-border)'
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                          {k.judul}
                        </h5>
                        <span className="font-arabic-amiri text-base font-bold text-amber-700 dark:text-amber-300" dir="rtl">
                          {k.arab}
                        </span>
                      </div>
                      <p className="opacity-85 leading-relaxed text-justify">
                        {k.kaidah}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: UJI RAWI BARU (AI & TURATS) */}
          {activeTab === 'ai' && (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div 
                className="p-6 rounded-2xl border text-center space-y-4"
                style={{
                  backgroundColor: 'var(--syamila-card)',
                  borderColor: 'var(--syamila-border)'
                }}
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-700/15 border border-amber-600/30 flex items-center justify-center mx-auto text-amber-700 dark:text-amber-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Penelitian Rijalul Hadits dengan Turats Klasik
                  </h3>
                  <p className="text-xs opacity-75 max-w-lg mx-auto mt-1">
                    Ketik nama perawi hadits yang ingin diteliti status kredibilitasnya menurut rujukan <em>Tahdzibul Kamal</em>, <em>Taqrib at-Tahdzib</em>, dan <em>Al-Jarh wa At-Ta'dil</em>.
                  </p>
                </div>

                <div className="flex gap-2 max-w-md mx-auto pt-2">
                  <input
                    type="text"
                    value={customRawiName}
                    onChange={(e) => setCustomRawiName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleQueryCustomRawi(customRawiName)}
                    placeholder="Contoh: Hammad bin Zaid, Ibnu Sirin, Al-Auza'i..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-amber-600/40"
                    style={{
                      backgroundColor: 'var(--syamila-bg)',
                      borderColor: 'var(--syamila-border)'
                    }}
                  />
                  <button
                    onClick={() => handleQueryCustomRawi(customRawiName)}
                    disabled={aiLoading || !customRawiName.trim()}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-50 transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Meneliti...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5" />
                        <span>Teliti Rawi</span>
                      </>
                    )}
                  </button>
                </div>

                {aiError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-700 dark:text-red-300">
                    {aiError}
                  </div>
                )}
              </div>

              {/* Suggestion Chips */}
              <div className="space-y-2">
                <span className="text-xs font-semibold opacity-70 block text-center">
                  Rekomendasi Tokoh Perawi untuk Diteliti:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    'Sufyan Ats-Tsauri',
                    'Al-Hasan Al-Bashri',
                    'Muhammad bin Sirin',
                    'Al-Auza\'i',
                    'Hammad bin Zaid',
                    'Ishaq bin Rahawaih',
                    'Abu Hanifah',
                    'Al-Laits bin Sa\'d'
                  ].map((name, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCustomRawiName(name);
                        handleQueryCustomRawi(name);
                      }}
                      className="px-3 py-1 rounded-lg border text-xs bg-black/5 dark:bg-white/5 hover:bg-amber-600/15 hover:border-amber-600/40 transition-colors"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div 
          className="flex items-center justify-between px-6 py-3 border-t text-xs opacity-75 shrink-0"
          style={{ 
            backgroundColor: 'var(--syamila-card)',
            borderColor: 'var(--syamila-border)'
          }}
        >
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-600" />
            <span>Rujukan: Tahdzib Al-Kamal, Taqrib at-Tahdzib, Al-Jarh wat-Ta'dil Ibnu Abi Hatim</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5 font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
