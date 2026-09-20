import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { KitabSidebar } from './components/KitabSidebar';
import { HadithReader } from './components/HadithReader';
import { SearchModal } from './components/SearchModal';
import { SyamilaAIAssistant } from './components/SyamilaAIAssistant';
import { BookmarksNotesDrawer } from './components/BookmarksNotesDrawer';
import { SettingsModal } from './components/SettingsModal';
import { MujamModal } from './components/MujamModal';
import { JarhTadilModal } from './components/JarhTadilModal';
import { StatsDashboardModal } from './components/StatsDashboardModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallModal } from './components/PWAInstallModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SanadGraphModal } from './components/SanadGraphModal';
import { DeveloperModal } from './components/DeveloperModal';
import { KITAB_LIST, HADITH_DATABASE } from './data/hadithData';
import { 
  SyamilaSettings, 
  BookmarkItem, 
  HadithNote, 
  HadithItem,
  ReadingStats
} from './types';
import {
  loadReadingStats,
  recordHadithRead,
  calculateDailyProgress,
  calculateReadingStreak
} from './utils/readingStats';

const DEFAULT_SETTINGS: SyamilaSettings = {
  theme: 'syamila-classic',
  arabicFontSize: 28,
  showTashkil: true,
  showTranslation: true,
  showSanad: true,
  showTakhrij: true,
  arabicFontFamily: 'amiri',
};

export default function App() {
  // Settings with LocalStorage persistence
  const [settings, setSettings] = useState<SyamilaSettings>(() => {
    try {
      const saved = localStorage.getItem('syamila_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Bookmarks with LocalStorage persistence
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('syamila_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Notes with LocalStorage persistence
  const [notes, setNotes] = useState<HadithNote[]>(() => {
    try {
      const saved = localStorage.getItem('syamila_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation State
  const [selectedKitabId, setSelectedKitabId] = useState<string>('bukhari');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [currentHadithIndex, setCurrentHadithIndex] = useState<number>(0);

  // Modal / Drawer visibility
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  });
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);
  const [aiInitialTab, setAiInitialTab] = useState<'syarah' | 'takhrij' | 'ask'>('syarah');
  const [bookmarksOpen, setBookmarksOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [mujamOpen, setMujamOpen] = useState<boolean>(false);
  const [mujamInitialQuery, setMujamInitialQuery] = useState<string>('');
  const [jarhModalOpen, setJarhModalOpen] = useState<boolean>(false);
  const [jarhInitialRawiId, setJarhInitialRawiId] = useState<string | undefined>(undefined);
  const [statsOpen, setStatsOpen] = useState<boolean>(false);
  const [pwaInstallOpen, setPwaInstallOpen] = useState<boolean>(false);
  const [sanadGraphOpen, setSanadGraphOpen] = useState<boolean>(false);
  const [graphTargetHadith, setGraphTargetHadith] = useState<HadithItem | null>(null);
  const [developerModalOpen, setDeveloperModalOpen] = useState<boolean>(false);

  // Reading Statistics State
  const [readingStats, setReadingStats] = useState<ReadingStats>(() => loadReadingStats());

  // Calculate today's reading progress & streak
  const todayProgress = useMemo(() => calculateDailyProgress(readingStats), [readingStats]);
  const streakInfo = useMemo(() => calculateReadingStreak(readingStats.records), [readingStats.records]);

  // Save settings when changed
  useEffect(() => {
    try {
      localStorage.setItem('syamila_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('syamila_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  // Save notes
  useEffect(() => {
    try {
      localStorage.setItem('syamila_notes', JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  // Active Kitab object
  const activeKitab = useMemo(() => {
    return KITAB_LIST.find((k) => k.id === selectedKitabId) || KITAB_LIST[0];
  }, [selectedKitabId]);

  // Filtered Hadiths for active Kitab
  const hadithsInActiveKitab = useMemo(() => {
    return HADITH_DATABASE.filter((h) => h.kitabId === selectedKitabId);
  }, [selectedKitabId]);

  // Active Hadith
  const currentHadith = useMemo(() => {
    if (hadithsInActiveKitab.length === 0) return null;
    return hadithsInActiveKitab[currentHadithIndex] || hadithsInActiveKitab[0];
  }, [hadithsInActiveKitab, currentHadithIndex]);

  // When active hadith changes, sync the chapter and record reading progress
  useEffect(() => {
    if (currentHadith) {
      setSelectedChapterId(currentHadith.chapterId);
      const updated = recordHadithRead(currentHadith);
      setReadingStats({ ...updated });
    }
  }, [currentHadith]);

  // Handle selecting Kitab
  const handleSelectKitab = useCallback((kitabId: string) => {
    setSelectedKitabId(kitabId);
    setCurrentHadithIndex(0);
    const newKitab = KITAB_LIST.find((k) => k.id === kitabId);
    if (newKitab && newKitab.chapters.length > 0) {
      setSelectedChapterId(newKitab.chapters[0].id);
    }
  }, []);

  // Handle selecting Chapter
  const handleSelectChapter = useCallback((chapterId: number) => {
    setSelectedChapterId(chapterId);
    // Jump to the first hadith in that chapter if available in database
    const idx = hadithsInActiveKitab.findIndex((h) => h.chapterId === chapterId);
    if (idx !== -1) {
      setCurrentHadithIndex(idx);
    }
  }, [hadithsInActiveKitab]);

  // Handle jumping to Hadith number
  const handleJumpToNumber = useCallback((hadithNum: number) => {
    const idx = hadithsInActiveKitab.findIndex((h) => h.number === hadithNum);
    if (idx !== -1) {
      setCurrentHadithIndex(idx);
    } else {
      // If exact number is not cached locally, we can focus the closest or notify
      alert(`Hadits nomor ${hadithNum} pada ${activeKitab.name} berada dalam jangkauan kitab. Membuka hadits terdekat yang tersedia di basis data Syamila.`);
      if (hadithsInActiveKitab.length > 0) {
        setCurrentHadithIndex(0);
      }
    }
  }, [hadithsInActiveKitab, activeKitab.name]);

  // Navigation: Next / Prev
  const handleNextHadith = useCallback(() => {
    if (currentHadithIndex < hadithsInActiveKitab.length - 1) {
      setCurrentHadithIndex((prev) => prev + 1);
    }
  }, [currentHadithIndex, hadithsInActiveKitab.length]);

  const handlePrevHadith = useCallback(() => {
    if (currentHadithIndex > 0) {
      setCurrentHadithIndex((prev) => prev - 1);
    }
  }, [currentHadithIndex]);

  // Direct selection from search / bookmarks
  const handleSelectHadithDirect = useCallback((kitabId: string, hadithId: string) => {
    setSelectedKitabId(kitabId);
    const inKitab = HADITH_DATABASE.filter((h) => h.kitabId === kitabId);
    const idx = inKitab.findIndex((h) => h.id === hadithId);
    if (idx !== -1) {
      setCurrentHadithIndex(idx);
      setSelectedChapterId(inKitab[idx].chapterId);
    }
  }, []);

  // Bookmarking
  const isCurrentBookmarked = useMemo(() => {
    if (!currentHadith) return false;
    return bookmarks.some((b) => b.hadithId === currentHadith.id);
  }, [bookmarks, currentHadith]);

  const handleToggleBookmark = useCallback((hadith: HadithItem) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.hadithId === hadith.id);
      if (exists) {
        return prev.filter((b) => b.hadithId !== hadith.id);
      } else {
        const newItem: BookmarkItem = {
          id: `bm-${Date.now()}`,
          hadithId: hadith.id,
          kitabId: hadith.kitabId,
          kitabName: hadith.kitabName,
          number: hadith.number,
          snippet: hadith.terjemah.slice(0, 100) + '...',
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        };
        return [newItem, ...prev];
      }
    });
  }, []);

  const handleRemoveBookmark = useCallback((hadithId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.hadithId !== hadithId));
  }, []);

  // Notes
  const handleSaveNote = useCallback((hadithId: string, noteText: string) => {
    if (!noteText.trim()) return;
    setNotes((prev) => {
      const filtered = prev.filter((n) => n.hadithId !== hadithId);
      const newNote: HadithNote = {
        hadithId,
        note: noteText,
        updatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      };
      return [newNote, ...filtered];
    });
  }, []);

  const handleDeleteNote = useCallback((hadithId: string) => {
    setNotes((prev) => prev.filter((n) => n.hadithId !== hadithId));
  }, []);

  // AI Assistant trigger with specific tab
  const handleOpenAIWithTab = useCallback((tab: 'syarah' | 'takhrij' | 'ask') => {
    setAiInitialTab(tab);
    setAiAssistantOpen(true);
  }, []);

  // Mu'jam Al-Mufahras trigger
  const handleOpenMujam = useCallback((initialQuery?: string) => {
    setMujamInitialQuery(initialQuery || '');
    setMujamOpen(true);
  }, []);

  const handleOpenJarh = useCallback((rawiId?: string) => {
    setJarhInitialRawiId(rawiId);
    setJarhModalOpen(true);
  }, []);

  // Sanad Graph D3.js Trigger
  const handleOpenSanadGraph = useCallback((targetHadith?: HadithItem) => {
    setGraphTargetHadith(targetHadith || currentHadith);
    setSanadGraphOpen(true);
  }, [currentHadith]);

  // Developer Profile Trigger
  const handleOpenDeveloperProfile = useCallback(() => {
    setDeveloperModalOpen(true);
  }, []);

  // Global Keyboard shortcuts (Ctrl+K for search, ArrowLeft/Right for hadith navigation, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setAiAssistantOpen(false);
        setBookmarksOpen(false);
        setSettingsOpen(false);
        setMujamOpen(false);
        setJarhModalOpen(false);
        setStatsOpen(false);
        setPwaInstallOpen(false);
        setSanadGraphOpen(false);
        setDeveloperModalOpen(false);
      } else if (!isInput && !searchOpen && !aiAssistantOpen && !settingsOpen && !bookmarksOpen && !mujamOpen && !jarhModalOpen && !statsOpen && !sanadGraphOpen && !developerModalOpen) {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          handleNextHadith();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          handlePrevHadith();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextHadith, handlePrevHadith, searchOpen, aiAssistantOpen, settingsOpen, bookmarksOpen, mujamOpen, jarhModalOpen, statsOpen, sanadGraphOpen, developerModalOpen]);

  return (
    <div 
      className={`h-[100dvh] max-h-[100dvh] w-full flex flex-col font-sans theme-${settings.theme} overflow-hidden`}
      style={{
        backgroundColor: 'var(--syamila-bg)',
        color: 'var(--syamila-text)'
      }}
    >
      {/* Top Navigation */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenAI={() => handleOpenAIWithTab('syarah')}
        onOpenMujam={() => handleOpenMujam()}
        onOpenJarh={() => handleOpenJarh()}
        onOpenSanadGraph={() => handleOpenSanadGraph(currentHadith || undefined)}
        onOpenDeveloperProfile={handleOpenDeveloperProfile}
        onOpenStats={() => setStatsOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenInstallPrompt={() => setPwaInstallOpen(true)}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        settings={settings}
        onUpdateSettings={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
        activeKitabName={activeKitab.name}
        activeHadithNumber={currentHadith?.number || 1}
        bookmarkCount={bookmarks.length}
        todayReadCount={todayProgress.count}
        dailyGoal={readingStats.dailyGoal}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative min-h-0 overflow-hidden">
        {/* Left Book Explorer & Chapter Sidebar */}
        <KitabSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          kitabs={KITAB_LIST}
          selectedKitabId={selectedKitabId}
          onSelectKitab={handleSelectKitab}
          selectedChapterId={selectedChapterId}
          onSelectChapter={handleSelectChapter}
          onJumpToHadithNumber={handleJumpToNumber}
          totalHadithInSelectedKitab={activeKitab.totalHadith}
          onOpenStats={() => setStatsOpen(true)}
          todayReadCount={todayProgress.count}
          dailyGoal={readingStats.dailyGoal}
          streak={streakInfo.streak}
        />

        {/* Center Hadith Reader Canvas */}
        <HadithReader
          hadith={currentHadith}
          kitab={activeKitab}
          onPrevious={handlePrevHadith}
          onNext={handleNextHadith}
          hasPrevious={currentHadithIndex > 0}
          hasNext={currentHadithIndex < hadithsInActiveKitab.length - 1}
          isBookmarked={isCurrentBookmarked}
          onToggleBookmark={handleToggleBookmark}
          onOpenNote={() => setBookmarksOpen(true)}
          onOpenAIWithTab={handleOpenAIWithTab}
          onOpenMujam={handleOpenMujam}
          onOpenJarh={handleOpenJarh}
          onOpenSanadGraph={handleOpenSanadGraph}
          onOpenDeveloperProfile={handleOpenDeveloperProfile}
          onOpenStats={() => setStatsOpen(true)}
          todayReadCount={todayProgress.count}
          dailyGoal={readingStats.dailyGoal}
          settings={settings}
          onUpdateSettings={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
          currentIndex={currentHadithIndex}
          totalInView={hadithsInActiveKitab.length}
        />
      </div>

      {/* Modal Dialogs */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        hadithDatabase={HADITH_DATABASE}
        kitabs={KITAB_LIST}
        onSelectHadith={handleSelectHadithDirect}
      />

      <SyamilaAIAssistant
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        hadith={currentHadith}
        initialTab={aiInitialTab}
      />

      <MujamModal
        isOpen={mujamOpen}
        onClose={() => setMujamOpen(false)}
        currentHadith={currentHadith}
        onSelectHadith={handleSelectHadithDirect}
        initialQuery={mujamInitialQuery}
      />

      <JarhTadilModal
        isOpen={jarhModalOpen}
        onClose={() => setJarhModalOpen(false)}
        currentHadith={currentHadith}
        onSelectHadith={handleSelectHadithDirect}
        initialRawiId={jarhInitialRawiId}
      />

      <StatsDashboardModal
        isOpen={statsOpen}
        onClose={() => setStatsOpen(false)}
        stats={readingStats}
        onUpdateStats={setReadingStats}
        onSelectHadith={handleSelectHadithDirect}
      />

      <BookmarksNotesDrawer
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarks={bookmarks}
        notes={notes}
        onRemoveBookmark={handleRemoveBookmark}
        onSelectHadith={handleSelectHadithDirect}
        onSaveNote={handleSaveNote}
        onDeleteNote={handleDeleteNote}
        activeHadith={currentHadith}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
        onOpenDeveloperProfile={handleOpenDeveloperProfile}
      />

      {/* Sanad Graph Interactive D3.js Visualization Modal */}
      <SanadGraphModal
        isOpen={sanadGraphOpen}
        onClose={() => setSanadGraphOpen(false)}
        hadith={graphTargetHadith || currentHadith}
        onSelectHadith={(h) => {
          handleSelectHadithDirect(h.kitabId, h.id);
          setSanadGraphOpen(false);
        }}
        onOpenRawiDetail={(rawiId) => {
          setJarhInitialRawiId(rawiId);
          setJarhModalOpen(true);
        }}
      />

      {/* Developer Profile & Dedication Modal (Al-Faqir Husni, S. Kom. I) */}
      <DeveloperModal
        isOpen={developerModalOpen}
        onClose={() => setDeveloperModalOpen(false)}
      />

      {/* PWA Install Prompt Modal for Android and iOS */}
      <PWAInstallModal
        isOpen={pwaInstallOpen}
        onClose={() => setPwaInstallOpen(false)}
      />

      {/* Real-time Offline Connectivity Status Pill */}
      <OfflineIndicator />

      {/* Responsive Bottom Navigation Bar for Mobile (Android/iOS) */}
      <MobileBottomNav
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMujam={() => handleOpenMujam()}
        onOpenJarh={() => handleOpenJarh()}
        onOpenSanadGraph={() => handleOpenSanadGraph(currentHadith || undefined)}
        onOpenStats={() => setStatsOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenAI={() => handleOpenAIWithTab('syarah')}
        onOpenInstallModal={() => setPwaInstallOpen(true)}
        bookmarkCount={bookmarks.length}
        todayReadCount={todayProgress.count}
        dailyGoal={readingStats.dailyGoal}
      />
    </div>
  );
}
