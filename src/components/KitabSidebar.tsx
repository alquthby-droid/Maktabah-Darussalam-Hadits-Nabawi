import React, { useState } from 'react';
import { 
  Book, 
  ChevronRight, 
  Hash, 
  X, 
  Layers, 
  User, 
  Calendar, 
  Info,
  Check,
  TrendingUp,
  Flame
} from 'lucide-react';
import { KitabInfo, KitabCategory } from '../types';

interface KitabSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  kitabs: KitabInfo[];
  selectedKitabId: string;
  onSelectKitab: (kitabId: string) => void;
  selectedChapterId: number;
  onSelectChapter: (chapterId: number) => void;
  onJumpToHadithNumber: (num: number) => void;
  totalHadithInSelectedKitab: number;
  onOpenStats?: () => void;
  todayReadCount?: number;
  dailyGoal?: number;
  streak?: number;
}

export const KitabSidebar: React.FC<KitabSidebarProps> = ({
  isOpen,
  onClose,
  kitabs,
  selectedKitabId,
  onSelectKitab,
  selectedChapterId,
  onSelectChapter,
  onJumpToHadithNumber,
  totalHadithInSelectedKitab,
  onOpenStats,
  todayReadCount = 0,
  dailyGoal = 10,
  streak = 0,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [jumpInput, setJumpInput] = useState<string>('');
  const [showBookDetails, setShowBookDetails] = useState<boolean>(false);

  const categories = ['Semua', 'Kutubus Sittah', 'Kitab Populer & Fiqih Hadits', "Kutubut Tis'ah"];

  const filteredKitabs = kitabs.filter((k) => {
    const matchCategory = activeCategory === 'Semua' || k.category === activeCategory;
    const matchSearch = 
      k.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      k.arabicName.includes(searchFilter) ||
      k.author.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCategory && matchSearch;
  });

  const currentKitab = kitabs.find((k) => k.id === selectedKitabId) || kitabs[0];

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput.trim(), 10);
    if (!isNaN(num) && num > 0) {
      onJumpToHadithNumber(num);
      setJumpInput('');
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        id="kitab-sidebar"
        className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-80 sm:w-96 flex flex-col border-r transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--syamila-border)' }}>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            <span className="font-bold text-sm">Fihris Kitab & Bab</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
            title="Tutup Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Jump to Hadith Number */}
        <div className="p-3 border-b" style={{ borderColor: 'var(--syamila-border)', backgroundColor: 'var(--syamila-card)' }}>
          <form onSubmit={handleJumpSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none opacity-60 text-xs">
                No.
              </span>
              <input
                id="input-jump-hadith"
                type="number"
                min="1"
                max={currentKitab.totalHadith}
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                placeholder={`Lompat ke No. (1 - ${currentKitab.totalHadith})`}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border outline-none transition-all focus:ring-1 focus:ring-amber-500"
                style={{
                  backgroundColor: 'var(--syamila-surface)',
                  borderColor: 'var(--syamila-border)',
                  color: 'var(--syamila-text)'
                }}
              />
            </div>
            <button
              id="btn-submit-jump"
              type="submit"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-amber-700 hover:bg-amber-800 transition-colors shadow-2xs"
            >
              Buka
            </button>
          </form>
        </div>

        {/* Mini Reading Progress Banner */}
        {onOpenStats && (
          <div
            id="sidebar-mini-stats"
            onClick={onOpenStats}
            className="px-3 py-2 border-b flex items-center justify-between text-xs cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
            style={{
              borderColor: 'var(--syamila-border)',
              backgroundColor: 'var(--syamila-surface)'
            }}
            title="Klik untuk membuka Dashboard Statistik Membaca Lengkap"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-600 shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold truncate">Target Hari Ini</span>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
                    {todayReadCount}/{dailyGoal}
                  </span>
                  {streak > 0 && (
                    <span className="flex items-center text-[10px] text-orange-600 dark:text-orange-400 font-semibold" title={`${streak} hari berturut-turut membaca hadits`}>
                      <Flame className="w-2.5 h-2.5 fill-orange-500 inline" />{streak}d
                    </span>
                  )}
                </div>
                <div className="w-28 sm:w-32 bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.round((todayReadCount / dailyGoal) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Grafik →
            </span>
          </div>
        )}

        {/* Kitab Categories */}
        <div 
          className="p-2 border-b flex gap-1 overflow-x-auto text-[11px] no-scrollbar touch-scroll scroll-smooth select-none" 
          style={{ 
            borderColor: 'var(--syamila-border)',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
            overscrollBehaviorX: 'contain'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-700 text-white font-semibold shadow-2xs'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
              }`}
            >
              {cat === 'Kitab Populer & Fiqih Hadits' ? 'Fiqih & Populer' : cat}
            </button>
          ))}
        </div>

        {/* Search Kitab Filter */}
        <div className="px-3 py-2 border-b" style={{ borderColor: 'var(--syamila-border)' }}>
          <input
            type="text"
            placeholder="Saring nama kitab / mu'allif..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full px-2.5 py-1 text-xs rounded-md border outline-none focus:ring-1 focus:ring-amber-500"
            style={{
              backgroundColor: 'var(--syamila-card)',
              borderColor: 'var(--syamila-border)',
              color: 'var(--syamila-text)'
            }}
          />
        </div>

        {/* Scrollable Books & Chapters List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-black/5 dark:divide-white/5 touch-scroll overscroll-contain">
          {filteredKitabs.map((kitab) => {
            const isSelected = kitab.id === selectedKitabId;
            return (
              <div key={kitab.id} className="pt-1.5 first:pt-0">
                {/* Book Card */}
                <button
                  id={`kitab-item-${kitab.id}`}
                  onClick={() => {
                    onSelectKitab(kitab.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-2 ${
                    isSelected 
                      ? 'shadow-xs border ring-1 ring-amber-600/50' 
                      : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--syamila-card)' : 'transparent',
                    borderColor: isSelected ? 'var(--syamila-border)' : 'transparent'
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-semibold text-xs sm:text-sm truncate">
                        {kitab.name}
                      </h4>
                      <span className="font-arabic-amiri text-xs opacity-75 shrink-0 text-amber-700 dark:text-amber-300">
                        {kitab.arabicName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] opacity-70">
                      <span className="truncate">{kitab.author.split(' ').slice(-2).join(' ')}</span>
                      <span>•</span>
                      <span>{kitab.totalHadith.toLocaleString()} Hadits</span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>

                {/* Chapter List Accordion if Selected */}
                {isSelected && (
                  <div className="mt-2 ml-2 pl-2 border-l-2 border-amber-600/40 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold px-2 py-1 opacity-70">
                      <span>DAFTAR BAB (الأبواب)</span>
                      <span>{kitab.chapters.length} Bab</span>
                    </div>

                    {kitab.chapters.map((ch) => {
                      const isChActive = ch.id === selectedChapterId;
                      return (
                        <button
                          key={ch.id}
                          id={`chapter-item-${ch.id}`}
                          onClick={() => {
                            onSelectChapter(ch.id);
                            if (window.innerWidth < 1024) {
                              onClose();
                            }
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between gap-1 ${
                            isChActive 
                              ? 'bg-amber-600 text-white font-medium shadow-2xs' 
                              : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-85'
                          }`}
                        >
                          <span className="truncate">{ch.title}</span>
                          <span className="text-[10px] opacity-75 shrink-0 font-mono">
                            {ch.hadithRange}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Book Info Footer */}
        <div 
          className="p-3 border-t text-xs space-y-1.5"
          style={{ borderColor: 'var(--syamila-border)', backgroundColor: 'var(--syamila-card)' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold truncate">{currentKitab.name}</span>
            <button
              onClick={() => setShowBookDetails(!showBookDetails)}
              className="text-[10px] text-amber-700 dark:text-amber-300 underline font-medium hover:opacity-80"
            >
              {showBookDetails ? 'Tutup Info' : 'Info Kitab'}
            </button>
          </div>

          {showBookDetails ? (
            <div className="text-[11px] opacity-85 space-y-1 pt-1 border-t border-black/5 dark:border-white/5">
              <p><strong>Pengarang:</strong> {currentKitab.author}</p>
              <p><strong>Wafat:</strong> {currentKitab.authorDeath}</p>
              <p className="leading-relaxed">{currentKitab.description}</p>
            </div>
          ) : (
            <p className="text-[11px] opacity-70 line-clamp-1">
              {currentKitab.author} (W. {currentKitab.authorDeath})
            </p>
          )}
        </div>
      </aside>
    </>
  );
};
