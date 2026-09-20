import React from 'react';
import { 
  BookOpen, 
  Search, 
  Compass, 
  Scale, 
  BarChart2, 
  Bookmark,
  Sparkles,
  Download,
  GitBranch
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobileBottomNavProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenMujam: () => void;
  onOpenJarh: () => void;
  onOpenSanadGraph?: () => void;
  onOpenStats: () => void;
  onOpenBookmarks: () => void;
  onOpenAI: () => void;
  onOpenInstallModal: () => void;
  bookmarkCount: number;
  todayReadCount?: number;
  dailyGoal?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onToggleSidebar,
  onOpenSearch,
  onOpenMujam,
  onOpenJarh,
  onOpenSanadGraph,
  onOpenStats,
  onOpenBookmarks,
  onOpenAI,
  onOpenInstallModal,
  bookmarkCount,
  todayReadCount = 0,
  dailyGoal = 10,
}) => {
  const { isInstalled } = usePWAInstall();

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Navigasi Bawah Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-lg shadow-lg pb-safe transition-colors select-none"
      style={{
        backgroundColor: 'var(--syamila-surface)',
        borderColor: 'var(--syamila-border)',
        color: 'var(--syamila-text)'
      }}
    >
      <div className="flex items-center justify-around px-1 h-14 max-w-lg mx-auto">
        {/* 1. Kitab / Bab */}
        <button
          id="btn-mobile-kitab"
          onClick={onToggleSidebar}
          className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg active:scale-95 transition-all text-[10px] font-medium opacity-80 hover:opacity-100 min-h-[44px]"
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span className="truncate max-w-[56px]">Kitab</span>
        </button>

        {/* 2. Cari Hadits */}
        <button
          id="btn-mobile-search"
          onClick={onOpenSearch}
          className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg active:scale-95 transition-all text-[10px] font-medium opacity-80 hover:opacity-100 min-h-[44px]"
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span className="truncate max-w-[56px]">Cari</span>
        </button>

        {/* 3. Mu'jam Mufahras */}
        <button
          id="btn-mobile-mujam"
          onClick={onOpenMujam}
          className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg active:scale-95 transition-all text-[10px] font-medium opacity-80 hover:opacity-100 min-h-[44px]"
          title="Al-Mu'jam Al-Mufahras"
        >
          <Compass className="w-4 h-4 mb-0.5 text-amber-600" />
          <span className="truncate max-w-[56px]">Mu'jam</span>
        </button>

        {/* 4. Jarh wa Ta'dil */}
        <button
          id="btn-mobile-jarh"
          onClick={onOpenJarh}
          className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg active:scale-95 transition-all text-[10px] font-medium opacity-80 hover:opacity-100 min-h-[44px]"
          title="Jarh wa Ta'dil (Biografi & Akreditasi Rawi)"
        >
          <Scale className="w-4 h-4 mb-0.5 text-amber-600" />
          <span className="truncate max-w-[56px]">Jarh</span>
        </button>

        {/* 4b. Bagan Sanad (D3) */}
        {onOpenSanadGraph && (
          <button
            id="btn-mobile-sanad-graph"
            onClick={onOpenSanadGraph}
            className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg active:scale-95 transition-all text-[10px] font-medium opacity-80 hover:opacity-100 min-h-[44px]"
            title="Bagan Sanad D3.js"
          >
            <GitBranch className="w-4 h-4 mb-0.5 text-amber-600" />
            <span className="truncate max-w-[56px]">Sanad</span>
          </button>
        )}

        {/* 5. Statistik Bacaan */}
        <button
          id="btn-mobile-stats"
          onClick={onOpenStats}
          className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg active:scale-95 transition-all text-[10px] font-medium opacity-80 hover:opacity-100 min-h-[44px] relative"
          title={`Target: ${todayReadCount}/${dailyGoal}`}
        >
          <div className="relative">
            <BarChart2 className="w-4 h-4 mb-0.5 text-amber-600" />
            <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-amber-500/25 text-[8px] font-bold text-amber-900 dark:text-amber-200 flex items-center justify-center">
              {todayReadCount}
            </span>
          </div>
          <span className="truncate max-w-[56px]">Statistik</span>
        </button>

        {/* 6. Markah / Catatan */}
        <button
          id="btn-mobile-bookmarks"
          onClick={onOpenBookmarks}
          className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg active:scale-95 transition-all text-[10px] font-medium opacity-80 hover:opacity-100 min-h-[44px] relative"
        >
          <div className="relative">
            <Bookmark className="w-4 h-4 mb-0.5" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-amber-600 text-[8px] font-bold text-white flex items-center justify-center">
                {bookmarkCount > 9 ? '9+' : bookmarkCount}
              </span>
            )}
          </div>
          <span className="truncate max-w-[56px]">Markah</span>
        </button>

        {/* 7. Pasang App (PWA) jika belum di-install */}
        {!isInstalled && (
          <button
            id="btn-mobile-pwa"
            onClick={onOpenInstallModal}
            className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg active:scale-95 transition-all text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 min-h-[44px]"
            title="Pasang Aplikasi ke Layar Utama Android/iOS"
          >
            <Download className="w-4 h-4 mb-0.5 animate-bounce" />
            <span className="truncate max-w-[56px]">Pasang</span>
          </button>
        )}
      </div>
    </nav>
  );
};
