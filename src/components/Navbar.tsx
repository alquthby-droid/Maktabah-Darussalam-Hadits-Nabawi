import React from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Sparkles, 
  Settings, 
  Menu,
  Sun,
  Moon,
  Palette,
  Compass,
  Scale,
  BarChart2,
  Download,
  GitBranch,
  UserCheck
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

  const toggleTheme = () => {
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

  return (
    <header className="sticky top-0 z-30 border-b backdrop-blur-md transition-colors duration-200"
      style={{
        backgroundColor: 'var(--syamila-surface)',
        borderColor: 'var(--syamila-border)',
        color: 'var(--syamila-text)'
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Sidebar Toggle & Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="btn-toggle-sidebar"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Buka / Tutup Daftar Kitab"
            aria-label="Toggle Daftar Kitab"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm text-white bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-600/30">
              <BookOpen className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight font-sans">
                  Maktabah Darussalam
                </span>
                <span className="hidden md:inline-block text-[11px] px-1.5 py-0.5 rounded font-medium bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30">
                  الحديث
                </span>
              </div>
              <p className="text-[11px] hidden sm:block opacity-70 leading-none mt-0.5">
                مكتبة دار السلام للحديث النبوي الشريف
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Trigger Button */}
        <div className="flex-1 max-w-md mx-2 hidden sm:block">
          <button
            id="btn-search-trigger"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-sm rounded-xl border transition-all text-left shadow-2xs hover:shadow-xs group"
            style={{
              backgroundColor: 'var(--syamila-card)',
              borderColor: 'var(--syamila-border)',
              color: 'var(--syamila-muted)'
            }}
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="truncate">
                Cari lafadz Arab, no. hadits, atau perawi...
              </span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Actions (Mobile Search, AI Assistant, Bookmarks, Theme, Settings) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search icon */}
          <button
            id="btn-search-mobile"
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Pencarian Hadits"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Al-Jarh wa At-Ta'dil Button */}
          <button
            id="btn-open-jarh-nav"
            onClick={onOpenJarh}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-amber-600/10 text-amber-900 dark:text-amber-200 border-amber-600/30"
            title="Al-Jarh wa At-Ta'dil (Kritik & Akreditasi Rijalul Hadits, Maratib & Sanad)"
          >
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden lg:inline">Jarh wa Ta'dil</span>
          </button>

          {/* Mu'jam Al-Mufahras Button */}
          <button
            id="btn-open-mujam-nav"
            onClick={onOpenMujam}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-amber-600/10 text-amber-900 dark:text-amber-200 border-amber-600/30"
            title="Al-Mu'jam Al-Mufahras li Alfazh Al-Hadits An-Nabawi (Konkordansi & Akar Kata Kutubut Tis'ah)"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden lg:inline">Mu'jam Mufahras</span>
          </button>

          {/* AI Assistant Button */}
          <button
            id="btn-open-ai"
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-transform active:scale-95 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white"
            title="Asisten Syarah & Takhrij Syamila AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span className="hidden md:inline">Syamila AI</span>
          </button>

          {/* Statistik Membaca Button */}
          <button
            id="btn-open-stats-nav"
            onClick={onOpenStats}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:bg-amber-600/10 text-amber-900 dark:text-amber-200 border-amber-600/30"
            title={`Statistik Membaca: Hari ini ${todayReadCount}/${dailyGoal} hadits`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">Statistik</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300">
              {todayReadCount}/{dailyGoal}
            </span>
          </button>

          {/* Bookmarks */}
          <button
            id="btn-open-bookmarks"
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1"
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
              onClick={onOpenInstallPrompt}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs transition-transform active:scale-95"
              title="Pasang Aplikasi Maktabah Darussalam (Android/iOS PWA)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pasang</span>
            </button>
          )}

          {/* Bagan Sanad D3.js Button */}
          {onOpenSanadGraph && (
            <button
              id="btn-open-sanad-graph-nav"
              onClick={onOpenSanadGraph}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-amber-600/10 text-amber-900 dark:text-amber-200 border-amber-600/30"
              title="Bagan Sanad Interaktif (D3.js Graph Jalur Periwayatan Hadits dari Sahabat ke Mukharrij)"
            >
              <GitBranch className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xl:inline">Bagan Sanad</span>
            </button>
          )}

          {/* Profil Pengembang & Khadim Button */}
          {onOpenDeveloperProfile && (
            <button
              id="btn-open-developer-profile-nav"
              onClick={onOpenDeveloperProfile}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 border-emerald-600/30"
              title="Khadim Maktabah: Al-Faqir Husni, S. Kom. I (Penyuluh Agama Islam Kemenag Lombok Barat)"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">Khadim</span>
            </button>
          )}

          {/* Settings Modal */}
          <button
            id="btn-open-settings"
            onClick={onOpenSettings}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Pengaturan Tampilan Syamila"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
