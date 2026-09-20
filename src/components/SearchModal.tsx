import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Filter, 
  ArrowRight, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { HadithItem, KitabInfo } from '../types';
import { normalizeArabic } from '../utils/arabic';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  hadithDatabase: HadithItem[];
  kitabs: KitabInfo[];
  onSelectHadith: (kitabId: string, hadithId: string) => void;
}

type SearchField = 'all' | 'arab' | 'terjemah' | 'rawi' | 'tema';

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  hadithDatabase,
  kitabs,
  onSelectHadith,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedKitabFilter, setSelectedKitabFilter] = useState<string>('all');
  const [searchField, setSearchField] = useState<SearchField>('all');

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const normArabicQuery = normalizeArabic(trimmed);

    return hadithDatabase.filter((item) => {
      // Kitab filter
      if (selectedKitabFilter !== 'all' && item.kitabId !== selectedKitabFilter) {
        return false;
      }

      // Check fields based on searchField
      const matchNumber = item.number.toString() === trimmed;
      const matchIndo = item.terjemah.toLowerCase().includes(trimmed);
      const matchRawi = item.rawiSahabat.toLowerCase().includes(trimmed);
      const matchChapter = item.chapterTitle.toLowerCase().includes(trimmed);
      const matchTema = item.tema.some((t) => t.toLowerCase().includes(trimmed));

      const normArabicText = normalizeArabic(item.arab);
      const matchArab = normArabicText.includes(normArabicQuery);

      if (searchField === 'arab') return matchArab;
      if (searchField === 'terjemah') return matchIndo;
      if (searchField === 'rawi') return matchRawi;
      if (searchField === 'tema') return matchTema || matchChapter;

      // 'all'
      return matchArab || matchIndo || matchRawi || matchNumber || matchChapter || matchTema;
    });
  }, [query, selectedKitabFilter, searchField, hadithDatabase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="w-full max-w-3xl rounded-2xl border shadow-xl flex flex-col max-h-[88vh] overflow-hidden my-auto"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        {/* Modal Header & Input */}
        <div className="p-4 border-b space-y-3" style={{ borderColor: 'var(--syamila-border)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-base">Pencarian Syamila (البحث في الأحاديث)</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              id="input-search-modal"
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik lafadz Arab (misal: نيّة, صلاة), terjemahan, nama sahabat, atau tema..."
              className="w-full pl-4 pr-10 py-2.5 text-sm rounded-xl border outline-none transition-all focus:ring-2 focus:ring-amber-600/50"
              style={{
                backgroundColor: 'var(--syamila-card)',
                borderColor: 'var(--syamila-border)',
                color: 'var(--syamila-text)'
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xs opacity-60 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters Bar: Scope & Kitab selection */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
            {/* Field filters */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <span className="opacity-70 text-[11px] mr-1">Cari Pada:</span>
              {(['all', 'arab', 'terjemah', 'rawi', 'tema'] as SearchField[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setSearchField(f)}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    searchField === f
                      ? 'bg-amber-700 text-white font-medium'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
                  }`}
                >
                  {f === 'all' && 'Semua'}
                  {f === 'arab' && 'Teks Arab'}
                  {f === 'terjemah' && 'Terjemah'}
                  {f === 'rawi' && 'Perawi'}
                  {f === 'tema' && 'Tema/Bab'}
                </button>
              ))}
            </div>

            {/* Kitab Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 opacity-70" />
              <select
                id="select-search-kitab-filter"
                value={selectedKitabFilter}
                onChange={(e) => setSelectedKitabFilter(e.target.value)}
                className="px-2 py-1 rounded-md border text-xs outline-none"
                style={{
                  backgroundColor: 'var(--syamila-card)',
                  borderColor: 'var(--syamila-border)',
                  color: 'var(--syamila-text)'
                }}
              >
                <option value="all">Semua Kitab Hadits</option>
                {kitabs.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-black/5 dark:divide-white/5 space-y-3">
          {query.trim() === '' ? (
            <div className="py-12 text-center opacity-60 text-xs sm:text-sm">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>Mendukung pencarian lafadz Arab (otomatis toleran harakat & alif-hamzah),</p>
              <p className="mt-1">terjemahan bahasa Indonesia, nomor hadits, atau nama rawi sahabat.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                <span className="opacity-70 text-xs mr-1">Contoh:</span>
                {['إِنَّمَا الأَعْمَالُ', 'Niat', 'Umar bin Khattab', 'Shalat', 'Menuntut Ilmu'].map((example) => (
                  <button
                    key={example}
                    onClick={() => setQuery(example)}
                    className="px-2 py-0.5 rounded text-xs bg-black/5 dark:bg-white/5 hover:bg-amber-600/20 text-amber-800 dark:text-amber-200 border border-black/5"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center opacity-70 text-sm">
              <p>Tidak ditemukan hadits yang sesuai dengan kata kunci "<strong>{query}</strong>".</p>
              <p className="text-xs opacity-75 mt-1">Coba gunakan kata kunci yang lebih umum atau pilih "Semua Kitab".</p>
            </div>
          ) : (
            <>
              <div className="text-xs font-semibold opacity-75 pb-1">
                Ditemukan {searchResults.length} riwayat hadits:
              </div>
              {searchResults.map((hadith) => (
                <div
                  key={hadith.id}
                  id={`search-result-${hadith.id}`}
                  onClick={() => {
                    onSelectHadith(hadith.kitabId, hadith.id);
                    onClose();
                  }}
                  className="pt-3 first:pt-0 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-600/15 text-amber-800 dark:text-amber-300">
                        {hadith.kitabName}
                      </span>
                      <span className="text-[11px] font-mono opacity-70">
                        No. {hadith.number}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">
                        {hadith.derajat}
                      </span>
                    </div>

                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-600" />
                  </div>

                  {/* Arabic preview */}
                  <p className="font-arabic-amiri text-sm mt-2 text-right line-clamp-2 leading-relaxed opacity-90">
                    {hadith.arab}
                  </p>

                  {/* Indonesian preview */}
                  <p className="text-xs mt-1 line-clamp-2 opacity-80 leading-normal">
                    "{hadith.terjemah}"
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[11px] opacity-60">
                    <span>Bab: {hadith.chapterTitle}</span>
                    <span>Perawi: {hadith.rawiSahabat}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t flex items-center justify-between text-[11px] opacity-70"
          style={{ borderColor: 'var(--syamila-border)', backgroundColor: 'var(--syamila-card)' }}
        >
          <span>Pencarian Maktabah Darussalam v2.5</span>
          <span>Tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
};
