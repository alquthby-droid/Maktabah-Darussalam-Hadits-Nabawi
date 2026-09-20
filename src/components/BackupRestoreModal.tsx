import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Upload,
  Database,
  CheckCircle2,
  AlertCircle,
  FileText,
  Bookmark,
  BarChart2,
  FileUp,
  Settings as SettingsIcon,
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import {
  BookmarkItem,
  HadithNote,
  ReadingStats,
  SyamilaSettings,
  BackupData,
  BackupSummary
} from '../types';
import {
  exportBackupFile,
  parseBackupJSON,
  mergeBackupData,
  overwriteBackupData
} from '../utils/backupRestore';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkItem[];
  notes: HadithNote[];
  readingStats: ReadingStats;
  settings: SyamilaSettings;
  onRestoreData: (restoredData: BackupData) => void;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  notes,
  readingStats,
  settings,
  onRestoreData,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [includeSettingsInExport, setIncludeSettingsInExport] = useState<boolean>(true);
  const [exportedFilename, setExportedFilename] = useState<string | null>(null);

  // Import state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [parsedBackup, setParsedBackup] = useState<{
    data: BackupData;
    summary: BackupSummary;
    filename: string;
  } | null>(null);
  const [restoreMode, setRestoreMode] = useState<'merge' | 'overwrite'>('merge');
  const [restoreSuccessMessage, setRestoreSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      const currentData: BackupData = {
        bookmarks,
        notes,
        readingStats,
        settings,
      };
      const filename = exportBackupFile(currentData, includeSettingsInExport);
      setExportedFilename(filename);
      setTimeout(() => {
        setExportedFilename(null);
      }, 5000);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const processFile = (file: File) => {
    setImportError(null);
    setRestoreSuccessMessage(null);
    setParsedBackup(null);

    if (!file.name.toLowerCase().endsWith('.json') && file.type !== 'application/json') {
      setImportError('Mohon unggah file dengan format .JSON.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content !== 'string') {
        setImportError('Gagal membaca isi file.');
        return;
      }

      const result = parseBackupJSON(content);
      if (!result.success || !result.data || !result.summary) {
        setImportError(result.error || 'Format file cadangan tidak valid.');
        return;
      }

      setParsedBackup({
        data: result.data,
        summary: result.summary,
        filename: file.name,
      });
    };
    reader.onerror = () => {
      setImportError('Terjadi kesalahan saat memproses file.');
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // Reset input value so same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleExecuteRestore = () => {
    if (!parsedBackup) return;

    try {
      const currentData: BackupData = {
        bookmarks,
        notes,
        readingStats,
        settings,
      };

      const finalData = restoreMode === 'merge'
        ? mergeBackupData(currentData, parsedBackup.data)
        : overwriteBackupData(parsedBackup.data, settings);

      onRestoreData(finalData);

      const actionWord = restoreMode === 'merge' ? 'digabungkan' : 'dipulihkan (ditimpa)';
      setRestoreSuccessMessage(
        `Alhamdulillah! Data berhasil ${actionWord}. Tersimpan: ${finalData.bookmarks.length} markah, ${finalData.notes.length} catatan, dan ${finalData.readingStats.records.length} riwayat bacaan.`
      );
      setParsedBackup(null);
    } catch (err) {
      setImportError(`Gagal memulihkan data: ${err instanceof Error ? err.message : 'Kesalahan internal'}`);
    }
  };

  return (
    <div 
      id="modal-backup-restore-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id="modal-backup-restore-container"
        className="w-full max-w-xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--syamila-border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-700/15 text-amber-800 dark:text-amber-300 flex items-center justify-center border border-amber-600/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-snug">Cadangkan & Pulihkan Data</h3>
              <p className="text-xs opacity-70">Ekspor atau Impor Markah, Catatan, & Statistik Antar-Perangkat</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b px-4 sm:px-5 gap-2 text-xs font-semibold" style={{ borderColor: 'var(--syamila-border)' }}>
          <button
            id="tab-btn-export"
            onClick={() => {
              setActiveTab('export');
              setImportError(null);
            }}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'export'
                ? 'border-amber-600 text-amber-800 dark:text-amber-300 font-bold'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Cadangan (Download JSON)</span>
          </button>

          <button
            id="tab-btn-import"
            onClick={() => {
              setActiveTab('import');
              setExportedFilename(null);
            }}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'import'
                ? 'border-amber-600 text-amber-800 dark:text-amber-300 font-bold'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Impor & Pulihkan (Upload JSON)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* TAB 1: EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-600/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed opacity-90">
                  Fitur ini mengekspor seluruh catatan kajian penuntut ilmu, markah hadits, dan riwayat membaca ke dalam file berformat <strong>JSON standar</strong>. File ini aman disimpan di Google Drive, flashdisk, atau dikirim ke ponsel lain.
                </p>
              </div>

              {/* Current Data Overview */}
              <div className="space-y-2">
                <label className="font-bold text-xs uppercase tracking-wider opacity-75">
                  Ringkasan Data Saat Ini yang Siap Dicadangkan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div 
                    className="p-3 rounded-xl border flex items-center gap-3"
                    style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                  >
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 shrink-0">
                      <Bookmark className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs opacity-70">Markah Tersimpan</div>
                      <div className="text-base font-bold font-mono">{bookmarks.length} hadits</div>
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-xl border flex items-center gap-3"
                    style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs opacity-70">Catatan / Ta'liq</div>
                      <div className="text-base font-bold font-mono">{notes.length} catatan</div>
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-xl border flex items-center gap-3"
                    style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                  >
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-800 dark:text-blue-300 shrink-0">
                      <BarChart2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs opacity-70">Riwayat Bacaan</div>
                      <div className="text-base font-bold font-mono">{readingStats.records.length} rekaman</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Include Settings Option */}
              <label 
                className="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                style={{ borderColor: 'var(--syamila-border)' }}
              >
                <div className="flex items-center gap-2.5">
                  <SettingsIcon className="w-4 h-4 opacity-70 text-amber-700 dark:text-amber-400" />
                  <div>
                    <span className="font-semibold text-xs block">Sertakan Pengaturan Tampilan</span>
                    <span className="text-[11px] opacity-70">Tema visual, ukuran teks Arab ({settings.arabicFontSize}px), jenis huruf ({settings.arabicFontFamily}), dan opsi terjemah</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeSettingsInExport}
                  onChange={(e) => setIncludeSettingsInExport(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
              </label>

              {/* Download Button */}
              <div className="pt-2">
                <button
                  id="btn-download-backup-json"
                  onClick={handleExport}
                  className="w-full py-3 px-4 rounded-xl text-white font-semibold text-xs sm:text-sm bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File Cadangan JSON (.json)</span>
                </button>
              </div>

              {/* Export Success Alert */}
              {exportedFilename && (
                <div className="p-3 rounded-xl border bg-emerald-500/15 border-emerald-600/30 text-emerald-900 dark:text-emerald-200 flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span className="text-xs">
                    File cadangan berhasil diunduh: <strong>{exportedFilename}</strong>. Simpan file ini dengan baik.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: IMPORT */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              {/* Success Notification */}
              {restoreSuccessMessage && (
                <div className="p-3.5 rounded-xl border bg-emerald-500/15 border-emerald-600/30 text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    {restoreSuccessMessage}
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {importError && (
                <div className="p-3 rounded-xl border bg-red-500/15 border-red-600/30 text-red-900 dark:text-red-200 flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span className="text-xs leading-relaxed">{importError}</span>
                </div>
              )}

              {/* Drag & Drop Zone */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="hidden"
              />

              {!parsedBackup ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                    isDragging
                      ? 'border-amber-600 bg-amber-500/15 scale-99'
                      : 'border-amber-600/30 hover:border-amber-600 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-600/15 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                    <FileUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm">
                      Tarik & Lepaskan File Cadangan JSON di Sini
                    </h4>
                    <p className="text-xs opacity-70 mt-0.5">
                      atau klik untuk memilih file dari komputer / ponsel Anda
                    </p>
                  </div>
                  <span className="text-[11px] px-3 py-1 rounded-full font-medium bg-amber-600/15 text-amber-800 dark:text-amber-300 border border-amber-600/30">
                    Mendukung file .json
                  </span>
                </div>
              ) : (
                /* Parsed Backup Confirmation Screen */
                <div className="space-y-4">
                  <div 
                    className="p-4 rounded-xl border space-y-3"
                    style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                  >
                    <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: 'var(--syamila-border)' }}>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-xs">File Cadangan Valid Ditemukan</span>
                      </div>
                      <button
                        onClick={() => setParsedBackup(null)}
                        className="text-[11px] text-amber-700 hover:underline cursor-pointer"
                      >
                        Pilih file lain
                      </button>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="opacity-70">Nama File:</span>
                        <span className="font-mono font-medium truncate max-w-[200px]">{parsedBackup.filename}</span>
                      </div>
                      {parsedBackup.summary.exportedAt && (
                        <div className="flex justify-between">
                          <span className="opacity-70">Waktu Pencadangan:</span>
                          <span>{new Date(parsedBackup.summary.exportedAt).toLocaleString('id-ID')}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-center">
                        <div className="text-[11px] opacity-70">Markah</div>
                        <div className="font-bold font-mono text-sm text-amber-700 dark:text-amber-300">
                          {parsedBackup.summary.bookmarksCount}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-center">
                        <div className="text-[11px] opacity-70">Catatan</div>
                        <div className="font-bold font-mono text-sm text-emerald-700 dark:text-emerald-300">
                          {parsedBackup.summary.notesCount}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-center">
                        <div className="text-[11px] opacity-70">Riwayat Bacaan</div>
                        <div className="font-bold font-mono text-sm text-blue-700 dark:text-blue-300">
                          {parsedBackup.summary.readingRecordsCount}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mode Selection: Merge vs Overwrite */}
                  <div className="space-y-2">
                    <label className="font-bold text-xs uppercase tracking-wider opacity-75">
                      Pilih Metode Pemulihan:
                    </label>
                    <div className="space-y-2">
                      {/* Merge option */}
                      <label 
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          restoreMode === 'merge'
                            ? 'border-amber-600 bg-amber-500/10'
                            : 'hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                        style={{ borderColor: restoreMode === 'merge' ? undefined : 'var(--syamila-border)' }}
                      >
                        <input
                          type="radio"
                          name="restoreMode"
                          checked={restoreMode === 'merge'}
                          onChange={() => setRestoreMode('merge')}
                          className="mt-0.5 accent-amber-600 cursor-pointer"
                        />
                        <div>
                          <div className="font-semibold text-xs flex items-center gap-1.5">
                            <span>Gabungkan Data (Merge)</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-emerald-600/20 text-emerald-800 dark:text-emerald-300">
                              Dianjurkan
                            </span>
                          </div>
                          <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed">
                            Menambahkan markah, catatan, dan riwayat bacaan dari file cadangan tanpa menghapus data yang sudah ada di perangkat ini saat ini.
                          </p>
                        </div>
                      </label>

                      {/* Overwrite option */}
                      <label 
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          restoreMode === 'overwrite'
                            ? 'border-red-600 bg-red-500/10'
                            : 'hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                        style={{ borderColor: restoreMode === 'overwrite' ? undefined : 'var(--syamila-border)' }}
                      >
                        <input
                          type="radio"
                          name="restoreMode"
                          checked={restoreMode === 'overwrite'}
                          onChange={() => setRestoreMode('overwrite')}
                          className="mt-0.5 accent-red-600 cursor-pointer"
                        />
                        <div>
                          <div className="font-semibold text-xs text-red-800 dark:text-red-300">
                            Timpa Seluruhnya (Overwrite)
                          </div>
                          <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed">
                            Menggantikan secara total markah, catatan, dan statistik saat ini dengan data persis seperti yang tertera di file cadangan.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Restore Execute Button */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      id="btn-execute-restore"
                      onClick={handleExecuteRestore}
                      className="flex-1 py-3 px-4 rounded-xl text-white font-semibold text-xs sm:text-sm bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-800 hover:to-emerald-950 shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>
                        {restoreMode === 'merge' ? 'Gabungkan Data Sekarang' : 'Timpa & Pulihkan Data'}
                      </span>
                    </button>
                    <button
                      onClick={() => setParsedBackup(null)}
                      className="py-3 px-4 rounded-xl border hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold cursor-pointer"
                      style={{ borderColor: 'var(--syamila-border)' }}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Cross-Device Info Hint */}
              <div className="p-3 rounded-xl border bg-black/5 dark:bg-white/5 text-[11px] opacity-75 flex items-start gap-2" style={{ borderColor: 'var(--syamila-border)' }}>
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span>
                  <strong>Tips Pemulihan Antar-Perangkat:</strong> Jika Anda berganti dari laptop ke HP (atau sebaliknya), ekspor file JSON dari perangkat lama, kirim lewat WhatsApp / email / Telegram ke perangkat baru, lalu buka menu ini di perangkat baru dan pilih file tersebut untuk menyamakan markah dan riwayat baca Anda.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--syamila-border)' }}>
          <div className="text-[11px] opacity-60">
            Maktabah Darussalam • Penyimpan Data Lokal JSON
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold transition-colors cursor-pointer"
            style={{ borderColor: 'var(--syamila-border)' }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
