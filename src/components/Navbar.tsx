import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Sparkles, 
  Settings, 
  Menu,
  Sun,
  Moon,
  Compass,
  Scale,
  BarChart2,
  Download,
  GitBranch,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Database
} from 'lucide-react';
import { SyamilaSettings, SyamilaTheme } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenAI: () => void;
  onOpenMujam: () => void;
  onOpenJarh: () => void;
  onOpenSanadGraph?: () => void;
  onOpenDeveloperProfile?: () => void;
  onOpenStats: () => void;
  onOpenSettings: () => void;
  onOpenBackup?: () => void;
  onOpenInstallPrompt?: () => void;
  onToggleSidebar: () => void;
  settings: SyamilaSettings;
  onUpdateSettings: (newSettings: Partial<SyamilaSettings>) => void;
  activeKitabName: string;
  activeHadithNumber: number;
  bookmarkCount: number;
  todayReadCount?: number;
  dailyGoal?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenBookmarks,
  onOpenAI,
  onOpenMujam,
  onOpenJarh,
  onOpenSanadGraph,
  onOpenDeveloperProfile,
  onOpenStats,
  onOpenSettings,
  onOpenBackup,
  onOpenInstallPrompt,
  onToggleSidebar,
  settings,
  onUpdateSettings,
  activeKitabName,
  activeHadithNumber,
  bookmarkCount,
  todayReadCount = 0,
  dailyGoal = 10,
}) => {
  const { isInstalled } = usePWAInstall();

  // Reference for horizontal scroll track
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Drag-to-scroll state for desktop & touch
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const updateScrollState = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
      return () => {
        el.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }
  }, [updateScrollState]);

  // Touch Swipe Handlers on the Navbar Actions Track
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1 || !scrollRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    hasMovedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current || e.touches.length !== 1) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.25;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    updateScrollState();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 100);
    updateScrollState();
  };

  // Mouse Drag Handlers for Desktop/Laptop trackpad or mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    hasMovedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    updateScrollState();
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 100);
    updateScrollState();
  };

  const scrollHorizontally = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -180 : 180;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(updateScrollState, 250);
  };

  const toggleTheme = () => {
    if (hasMovedRef.current) return;
    const nextTheme: Record<SyamilaTheme, SyamilaTheme> = {
      'syamila-classic': 'emerald-mushaf',
      'emerald-mushaf': 'light',
      'light': 'dark',
      'dark': 'syamila-classic'
    };
    onUpdateSettings({ theme: nextTheme[settings.theme] });
  };

  const getThemeLabel = (t: SyamilaTheme) => {
    switch (t) {
      case 'syamila-classic': return 'Kertas Klasik';
      case 'emerald-mushaf': return 'Emerald';
      case 'light': return 'Terang';
      case 'dark': return 'Malam';
    }
  };

  // Prevent accidental button trigger when finishing a horizontal swipe gesture
  const safeClick = (callback?: () => void) => () => {
    if (hasMovedRef.current) return;
    callback?.();
  };

  return (
    <header 
      id="main-app-header"
      className="sticky top-0 z-30 border-b backdrop-blur-md transition-colors duration-200"
      style={{
        backgroundColor: 'var(--syamila-surface)',
        borderColor: 'var(--syamila-border)',
        color: 'var(--syamila-text)'
      }}
    >
      {/* Primary Top Bar */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 relative">
        {/* Left: Sidebar Toggle & Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            id="btn-toggle-sidebar"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Buka / Tutup Daftar Kitab"
            aria-label="Toggle Daftar Kitab"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs border border-amber-600/30 bg-white/95 dark:bg-black/30 flex items-center justify-center shrink-0">
              <img 
                src="https://cdn.phototourl.com/free/2026-09-20-b0c74d12-3376-480e-b5a0-efb20f8b4a76.png" 
                alt="Logo Maktabah Darussalam" 
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-darussalam.png';
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight font-sans whitespace-nowrap">
                  Maktabah Darussalam
                </span>
                <span className="hidden md:inline-block text-[11px] px-1.5 py-0.5 rounded font-medium bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30 shrink-0">
                  الحديث
                </span>
              </div>
              <p className="text-[11px] hidden sm:block opacity-70 leading-none mt-0.5 truncate">
                مكتبة دار السلام للحديث النبوي الشريف
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Trigger Button (Desktop & Tablets) */}
        <div className="flex-1 max-w-xs sm:max-w-sm lg:max-w-md mx-1 sm:mx-2 hidden md:block min-w-0">
          <button
            id="btn-search-trigger"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-sm rounded-xl border transition-all text-left shadow-2xs hover:shadow-xs group cursor-pointer"
            style={{
              backgroundColor: 'var(--syamila-card)',
              borderColor: 'var(--syamila-border)',
              color: 'var(--syamila-muted)'
            }}
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
              <span className="truncate">
                Cari lafadz Arab, no. hadits, atau perawi...
              </span>
            </div>
            <kbd className="hidden xl:inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono shrink-0">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Actions Container with Smooth Touch-Swipe & Mouse-Drag */}
        <div className="flex-1 md:flex-initial min-w-0 flex items-center justify-end relative">
          {/* Scroll Left Button & Gradient Fade (Shows when scrolled) */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pr-2 bg-gradient-to-r from-[var(--syamila-surface)] via-[var(--syamila-surface)] to-transparent">
              <button
                onClick={() => scrollHorizontally('left')}
                className="p-1 rounded-full bg-amber-700/90 text-white shadow-md hover:bg-amber-600 transition-transform active:scale-95"
                title="Geser ke kiri"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Horizontally Scrollable Action Track with Touch & Mouse Gestures */}
          <div
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar touch-scroll scroll-smooth select-none py-1 px-1 max-w-full"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x pan-y',
              overscrollBehaviorX: 'contain'
            }}
          >
            {/* Mobile search icon (Mobile only) */}
            <button
              id="btn-search-mobile"
              onClick={safeClick(onOpenSearch)}
              className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
              title="Pencarian Hadits"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Al-Jarh wa At-Ta'dil Button */}
            <button
              id="btn-open-jarh-nav"
              onClick={safeClick(onOpenJarh)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-amber-600/10 text-amber-900 dark:text-amber-200 border-amber-600/30 shrink-0 cursor-pointer"
              title="Al-Jarh wa At-Ta'dil (Kritik & Akreditasi Rijalul Hadits, Maratib & Sanad)"
            >
              <Scale className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="whitespace-nowrap">Jarh wa Ta'dil</span>
            </button>

            {/* Mu'jam Al-Mufahras Button */}
            <button
              id="btn-open-mujam-nav"
              onClick={safeClick(onOpenMujam)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-amber-600/10 text-amber-900 dark:text-amber-200 border-amber-600/30 shrink-0 cursor-pointer"
              title="Al-Mu'jam Al-Mufahras li Alfazh Al-Hadits An-Nabawi (Konkordansi & Akar Kata)"
            >
              <Compass className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="whitespace-nowrap">Mu'jam Mufahras</span>
            </button>

            {/* AI Assistant Button */}
            <button
              id="btn-open-ai"
              onClick={safeClick(onOpenAI)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-transform active:scale-95 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white shrink-0 cursor-pointer"
              title="Asisten Syarah & Takhrij Syamila AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span className="whitespace-nowrap">Syamila AI</span>
            </button>

            {/* Statistik Membaca Button */}
            <button
              id="btn-open-stats-nav"
              onClick={safeClick(onOpenStats)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:bg-amber-600/10 text-amber-900 dark:text-amber-200 border-amber-600/30 shrink-0 cursor-pointer"
              title={`Statistik Membaca: Hari ini ${todayReadCount}/${dailyGoal} hadits`}
            >
              <BarChart2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="whitespace-nowrap hidden sm:inline">Statistik</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 shrink-0">
                {todayReadCount}/{dailyGoal}
              </span>
            </button>

            {/* Bookmarks */}
            <button
              id="btn-open-bookmarks"
              onClick={safeClick(onOpenBookmarks)}
              className="relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
              title="Markah & Catatan Tersimpan"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 text-[9px] font-bold rounded-full bg-amber-600 text-white flex items-center justify-center">
                  {bookmarkCount > 9 ? '9+' : bookmarkCount}
                </span>
              )}
            </button>

            {/* Theme Quick Switcher */}
            <button
              id="btn-quick-theme"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
              title={`Ganti Tema: ${getThemeLabel(settings.theme)}`}
            >
              {settings.theme === 'dark' ? (
                <Moon className="w-5 h-5 text-amber-300" />
              ) : settings.theme === 'emerald-mushaf' ? (
                <div className="w-4 h-4 rounded-full bg-emerald-600 border border-emerald-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-600" />
              )}
            </button>

            {/* Install PWA Button */}
            {!isInstalled && onOpenInstallPrompt && (
              <button
                id="btn-pwa-install-nav"
                onClick={safeClick(onOpenInstallPrompt)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs transition-transform active:scale-95 shrink-0 cursor-pointer"
                title="Pasang Aplikasi Maktabah Darussalam (Android/iOS PWA)"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Pasang</span>
              </button>
            )}

            {/* Bagan Sanad D3.js Button */}
            {onOpenSanadGraph && (
              <button
                id="btn-open-sanad-graph-nav"
                onClick={safeClick(onOpenSanadGraph)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-amber-600/10 text-amber-900 dark:text-amber-200 border-amber-600/30 shrink-0 cursor-pointer"
                title="Bagan Sanad Interaktif (D3.js Graph Jalur Periwayatan)"
              >
                <GitBranch className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="whitespace-nowrap">Bagan Sanad</span>
              </button>
            )}

            {/* Profil Pengembang & Khadim Button */}
            {onOpenDeveloperProfile && (
              <button
                id="btn-open-developer-profile-nav"
                onClick={safeClick(onOpenDeveloperProfile)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 border-emerald-600/30 shrink-0 cursor-pointer"
                title="Khadim Maktabah: Al-Faqir Husni, S. Kom. I"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="whitespace-nowrap">Khadim</span>
              </button>
            )}

            {/* Cadangan & Pulihkan Data JSON Button */}
            {onOpenBackup && (
              <button
                id="btn-open-backup-nav"
                onClick={safeClick(onOpenBackup)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-amber-600/10 text-amber-900 dark:text-amber-200 border-amber-600/30 shrink-0 cursor-pointer"
                title="Cadangkan & Pulihkan Data (Ekspor / Impor JSON Antar-Perangkat)"
              >
                <Database className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="whitespace-nowrap hidden lg:inline">Cadangan</span>
              </button>
            )}

            {/* Settings Modal */}
            <button
              id="btn-open-settings"
              onClick={safeClick(onOpenSettings)}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
              title="Pengaturan Tampilan Syamila"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Scroll Right Button & Gradient Fade (Shows when more items exist to the right) */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pl-2 bg-gradient-to-l from-[var(--syamila-surface)] via-[var(--syamila-surface)] to-transparent pointer-events-none">
              <button
                onClick={() => scrollHorizontally('right')}
                className="p-1 rounded-full bg-amber-700/90 text-white shadow-md hover:bg-amber-600 transition-transform active:scale-95 pointer-events-auto"
                title="Geser ke kanan untuk melihat fitur lainnya"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Responsive Feature Ribbon Bar (visible on screens < 768px for optimal touch swiping) */}
      <div 
        className="md:hidden border-t px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-scroll select-none"
        ref={mobileScrollRef}
        style={{
          borderColor: 'var(--syamila-border)',
          backgroundColor: 'var(--syamila-card)',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x pan-y',
          overscrollBehaviorX: 'contain'
        }}
      >
        <button
          onClick={onOpenJarh}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-amber-600/30 text-amber-900 dark:text-amber-200 bg-amber-600/5 shrink-0"
        >
          <Scale className="w-3 h-3 text-amber-600 shrink-0" />
          <span>Jarh wa Ta'dil</span>
        </button>

        <button
          onClick={onOpenMujam}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-amber-600/30 text-amber-900 dark:text-amber-200 bg-amber-600/5 shrink-0"
        >
          <Compass className="w-3 h-3 text-amber-600 shrink-0" />
          <span>Mu'jam</span>
        </button>

        <button
          onClick={onOpenAI}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-2xs shrink-0"
        >
          <Sparkles className="w-3 h-3 text-amber-200 shrink-0" />
          <span>Syamila AI</span>
        </button>

        <button
          onClick={onOpenStats}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold border border-amber-600/30 text-amber-900 dark:text-amber-200 shrink-0"
        >
          <BarChart2 className="w-3 h-3 text-amber-600 shrink-0" />
          <span>Statistik</span>
          <span className="px-1 rounded bg-amber-500/20 text-[9px]">
            {todayReadCount}/{dailyGoal}
          </span>
        </button>

        {onOpenSanadGraph && (
          <button
            onClick={onOpenSanadGraph}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-amber-600/30 text-amber-900 dark:text-amber-200 shrink-0"
          >
            <GitBranch className="w-3 h-3 text-amber-600 shrink-0" />
            <span>Bagan Sanad</span>
          </button>
        )}

        {onOpenDeveloperProfile && (
          <button
            onClick={onOpenDeveloperProfile}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-emerald-600/30 text-emerald-800 dark:text-emerald-300 shrink-0"
          >
            <UserCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Khadim</span>
          </button>
        )}

        {!isInstalled && onOpenInstallPrompt && (
          <button
            onClick={onOpenInstallPrompt}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-700 text-white shrink-0"
          >
            <Download className="w-3 h-3 shrink-0" />
            <span>Pasang</span>
          </button>
        )}
      </div>
    </header>
  );
};
