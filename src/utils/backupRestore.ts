import {
  BookmarkItem,
  HadithNote,
  ReadingStats,
  SyamilaSettings,
  BackupData,
  BackupPayload,
  BackupSummary
} from '../types';

/**
 * Downloads a JavaScript object as a pretty-printed JSON file to the user's browser.
 */
export function downloadJSON(filename: string, data: object): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Creates and triggers a standardized JSON backup export.
 */
export function exportBackupFile(data: BackupData, includeSettings: boolean = true): string {
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `maktabah-darussalam-backup-${dateStr}.json`;

  const payload: BackupPayload = {
    version: 1,
    appName: 'Maktabah Darussalam Hadits',
    exportedAt: new Date().toISOString(),
    data: {
      bookmarks: data.bookmarks || [],
      notes: data.notes || [],
      readingStats: data.readingStats || { dailyGoal: 10, records: [] },
      ...(includeSettings && data.settings ? { settings: data.settings } : {}),
    },
  };

  downloadJSON(filename, payload);
  return filename;
}

export interface ParseResult {
  success: boolean;
  error?: string;
  data?: BackupData;
  summary?: BackupSummary;
}

/**
 * Parses and validates an uploaded JSON backup file string.
 * Supports both standard BackupPayload structure and raw flat JSON exports.
 */
export function parseBackupJSON(jsonString: string): ParseResult {
  try {
    const raw = JSON.parse(jsonString);
    if (!raw || typeof raw !== 'object') {
      return { success: false, error: 'Format file tidak valid (bukan objek JSON).' };
    }

    // Determine if wrapped in standard BackupPayload or flat structure
    let extractedData: Partial<BackupData> | null = null;
    let exportedAt: string | undefined;
    let appName: string | undefined;

    if (raw.data && typeof raw.data === 'object') {
      // Standard BackupPayload
      extractedData = raw.data;
      exportedAt = typeof raw.exportedAt === 'string' ? raw.exportedAt : undefined;
      appName = typeof raw.appName === 'string' ? raw.appName : undefined;
    } else {
      // Flat structure (fallback for compatibility)
      extractedData = raw;
      exportedAt = typeof raw.exportedAt === 'string' ? raw.exportedAt : undefined;
    }

    if (!extractedData) {
      return { success: false, error: 'Struktur data cadangan tidak ditemukan di dalam file.' };
    }

    // Validate and sanitize Bookmarks
    const rawBookmarks = Array.isArray(extractedData.bookmarks) ? extractedData.bookmarks : [];
    const validBookmarks: BookmarkItem[] = rawBookmarks
      .filter((b): b is BookmarkItem => Boolean(b && typeof b === 'object' && b.hadithId))
      .map((b) => ({
        id: b.id || `bm-${b.hadithId}-${Date.now()}`,
        hadithId: String(b.hadithId),
        kitabId: b.kitabId || 'bukhari',
        kitabName: b.kitabName || 'Kitab Hadits',
        number: Number(b.number) || 1,
        snippet: b.snippet || '',
        date: b.date || new Date().toISOString().slice(0, 10),
      }));

    // Validate and sanitize Notes
    const rawNotes = Array.isArray(extractedData.notes) ? extractedData.notes : [];
    const validNotes: HadithNote[] = rawNotes
      .filter((n): n is HadithNote => Boolean(n && typeof n === 'object' && n.hadithId && typeof n.note === 'string'))
      .map((n) => ({
        hadithId: String(n.hadithId),
        note: String(n.note),
        updatedAt: n.updatedAt || new Date().toISOString(),
      }));

    // Validate and sanitize Reading Stats
    let validStats: ReadingStats = { dailyGoal: 10, records: [] };
    if (extractedData.readingStats && typeof extractedData.readingStats === 'object') {
      const rs = extractedData.readingStats;
      const records = Array.isArray(rs.records) ? rs.records : [];
      validStats = {
        dailyGoal: typeof rs.dailyGoal === 'number' && rs.dailyGoal > 0 ? rs.dailyGoal : 10,
        records: records
          .filter((r) => Boolean(r && typeof r === 'object' && r.hadithId))
          .map((r, idx) => ({
            id: r.id || `rec-${r.hadithId}-${idx}-${Date.now()}`,
            hadithId: String(r.hadithId),
            kitabId: r.kitabId || 'bukhari',
            kitabName: r.kitabName || 'Kitab Hadits',
            hadithNumber: Number(r.hadithNumber) || 1,
            readAt: r.readAt || new Date().toISOString(),
            date: r.date || new Date().toISOString().slice(0, 10),
          })),
      };
    }

    // Validate optional settings
    let validSettings: SyamilaSettings | undefined = undefined;
    if (extractedData.settings && typeof extractedData.settings === 'object') {
      const s = extractedData.settings;
      if (typeof s.theme === 'string' && typeof s.arabicFontSize === 'number') {
        validSettings = s as SyamilaSettings;
      }
    }

    // Ensure at least one section has data or stats
    if (validBookmarks.length === 0 && validNotes.length === 0 && validStats.records.length === 0 && !validSettings) {
      return {
        success: false,
        error: 'File JSON tidak memuat data markah, catatan, ataupun statistik bacaan yang dapat dipulihkan.',
      };
    }

    const validatedData: BackupData = {
      bookmarks: validBookmarks,
      notes: validNotes,
      readingStats: validStats,
      ...(validSettings ? { settings: validSettings } : {}),
    };

    const summary: BackupSummary = {
      bookmarksCount: validBookmarks.length,
      notesCount: validNotes.length,
      readingRecordsCount: validStats.records.length,
      dailyGoal: validStats.dailyGoal,
      hasSettings: Boolean(validSettings),
      exportedAt,
      appName,
    };

    return {
      success: true,
      data: validatedData,
      summary,
    };
  } catch (err) {
    return {
      success: false,
      error: `Gagal membaca file JSON: ${err instanceof Error ? err.message : 'Format tidak dikenal'}`,
    };
  }
}

/**
 * Merges incoming backup data with the existing user data without losing existing records.
 */
export function mergeBackupData(current: BackupData, incoming: BackupData): BackupData {
  // Merge Bookmarks: keep existing ones, add new ones by hadithId
  const bookmarkMap = new Map<string, BookmarkItem>();
  current.bookmarks.forEach((b) => bookmarkMap.set(b.hadithId, b));
  incoming.bookmarks.forEach((b) => {
    if (!bookmarkMap.has(b.hadithId)) {
      bookmarkMap.set(b.hadithId, b);
    }
  });

  // Merge Notes: keep existing ones, update if incoming note is newer or nonexistent
  const noteMap = new Map<string, HadithNote>();
  current.notes.forEach((n) => noteMap.set(n.hadithId, n));
  incoming.notes.forEach((n) => {
    const existing = noteMap.get(n.hadithId);
    if (!existing) {
      noteMap.set(n.hadithId, n);
    } else {
      const existingTime = new Date(existing.updatedAt || 0).getTime();
      const incomingTime = new Date(n.updatedAt || 0).getTime();
      if (incomingTime >= existingTime) {
        noteMap.set(n.hadithId, n);
      }
    }
  });

  // Merge Reading Stats Records
  const existingRecordKeys = new Set(
    current.readingStats.records.map((r) => r.id || `${r.hadithId}_${r.readAt}`)
  );
  const combinedRecords = [...current.readingStats.records];
  incoming.readingStats.records.forEach((r) => {
    const key = r.id || `${r.hadithId}_${r.readAt}`;
    if (!existingRecordKeys.has(key)) {
      existingRecordKeys.add(key);
      combinedRecords.push(r);
    }
  });

  // Sort reading records chronologically
  combinedRecords.sort((a, b) => new Date(a.readAt).getTime() - new Date(b.readAt).getTime());

  const mergedStats: ReadingStats = {
    dailyGoal: incoming.readingStats.dailyGoal || current.readingStats.dailyGoal || 10,
    records: combinedRecords,
  };

  return {
    bookmarks: Array.from(bookmarkMap.values()),
    notes: Array.from(noteMap.values()),
    readingStats: mergedStats,
    settings: incoming.settings && current.settings
      ? { ...current.settings, ...incoming.settings }
      : current.settings,
  };
}

/**
 * Completely overwrites current data with incoming backup data.
 */
export function overwriteBackupData(incoming: BackupData, currentSettings?: SyamilaSettings): BackupData {
  return {
    bookmarks: [...incoming.bookmarks],
    notes: [...incoming.notes],
    readingStats: {
      dailyGoal: incoming.readingStats.dailyGoal || 10,
      records: [...incoming.readingStats.records],
    },
    settings: incoming.settings || currentSettings,
  };
}
