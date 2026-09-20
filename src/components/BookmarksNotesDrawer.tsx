import React, { useState } from 'react';
import { 
  Bookmark, 
  FileText, 
  X, 
  Trash2, 
  ArrowRight, 
  Plus, 
  Edit3, 
  Calendar,
  BookOpen,
  Database,
  ArrowDownUp
} from 'lucide-react';
import { BookmarkItem, HadithNote, HadithItem } from '../types';

interface BookmarksNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkItem[];
  notes: HadithNote[];
  onRemoveBookmark: (hadithId: string) => void;
  onSelectHadith: (kitabId: string, hadithId: string) => void;
  onSaveNote: (hadithId: string, noteText: string) => void;
  onDeleteNote: (hadithId: string) => void;
  activeHadith: HadithItem | null;
  onOpenBackup?: () => void;
}

export const BookmarksNotesDrawer: React.FC<BookmarksNotesDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  notes,
  onRemoveBookmark,
  onSelectHadith,
  onSaveNote,
  onDeleteNote,
  activeHadith,
  onOpenBackup,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [editingNoteHadithId, setEditingNoteHadithId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

  if (!isOpen) return null;

  const currentHadithNote = activeHadith ? notes.find((n) => n.hadithId === activeHadith.id) : null;

  const handleStartEditCurrent = () => {
    if (!activeHadith) return;
    setEditingNoteHadithId(activeHadith.id);
    setNoteInput(currentHadithNote ? currentHadithNote.note : '');
  };

  const handleSaveCurrentNote = () => {
    if (!editingNoteHadithId) return;
    onSaveNote(editingNoteHadithId, noteInput.trim());
    setEditingNoteHadithId(null);
    setNoteInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="w-full max-w-md h-full shadow-2xl flex flex-col transition-transform animate-in slide-in-from-right"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--syamila-border)' }}>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base">Markah & Catatan Kajian</h3>
          </div>
          <div className="flex items-center gap-1.5">
            {onOpenBackup && (
              <button
                onClick={onOpenBackup}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border border-amber-600/30 text-amber-900 dark:text-amber-200 bg-amber-600/10 hover:bg-amber-600/20 transition-colors cursor-pointer"
                title="Cadangkan (Ekspor) & Pulihkan (Impor) Data JSON"
              >
                <Database className="w-3.5 h-3.5 text-amber-600" />
                <span>Ekspor / Impor</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b text-xs font-semibold px-4 gap-2" style={{ borderColor: 'var(--syamila-border)' }}>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'bookmarks'
                ? 'border-amber-600 text-amber-800 dark:text-amber-300'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Markah ({bookmarks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'notes'
                ? 'border-amber-600 text-amber-800 dark:text-amber-300'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ta'liq / Catatan ({notes.length})</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* TAB: BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <div>
              {bookmarks.length === 0 ? (
                <div className="text-center py-16 opacity-60 text-xs sm:text-sm">
                  <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p>Belum ada hadits yang ditandai.</p>
                  <p className="text-[11px] mt-1">Klik tombol "Tandai" pada hadits untuk menyimpannya ke sini.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {bookmarks.map((bm) => (
                    <div 
                      key={bm.id}
                      className="p-3 rounded-xl border flex items-start justify-between gap-2 group transition-all hover:shadow-xs"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => {
                          onSelectHadith(bm.kitabId, bm.hadithId);
                          onClose();
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                            {bm.kitabName}
                          </span>
                          <span className="text-xs font-mono opacity-70">
                            No. {bm.number}
                          </span>
                        </div>
                        <p className="text-xs line-clamp-2 opacity-80 mt-1 leading-normal">
                          "{bm.snippet}"
                        </p>
                        <div className="text-[10px] opacity-50 mt-1.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{bm.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            onSelectHadith(bm.kitabId, bm.hadithId);
                            onClose();
                          }}
                          className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-amber-600"
                          title="Buka hadits"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRemoveBookmark(bm.hadithId)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-red-500 opacity-60 hover:opacity-100"
                          title="Hapus markah"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              {/* Quick Add note for currently active Hadith */}
              {activeHadith && (
                <div 
                  className="p-3.5 rounded-xl border space-y-2"
                  style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-800 dark:text-amber-300">
                      Catatan untuk: {activeHadith.kitabName} No. {activeHadith.number}
                    </span>
                    {!editingNoteHadithId && (
                      <button
                        onClick={handleStartEditCurrent}
                        className="text-[11px] font-medium text-amber-700 hover:underline flex items-center gap-1"
                      >
                        {currentHadithNote ? <Edit3 className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        <span>{currentHadithNote ? 'Ubah Catatan' : 'Tambah Catatan'}</span>
                      </button>
                    )}
                  </div>

                  {editingNoteHadithId === activeHadith.id ? (
                    <div className="space-y-2 pt-1">
                      <textarea
                        rows={3}
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Tuliskan faedah ilmiah, mutiara hikmah, atau pemahaman dari guru..."
                        className="w-full p-2.5 text-xs rounded-lg border outline-none focus:ring-1 focus:ring-amber-500"
                        style={{
                          backgroundColor: 'var(--syamila-surface)',
                          borderColor: 'var(--syamila-border)',
                          color: 'var(--syamila-text)'
                        }}
                      />
                      <div className="flex justify-end gap-2 text-xs">
                        <button
                          onClick={() => setEditingNoteHadithId(null)}
                          className="px-2.5 py-1 rounded border hover:bg-black/5"
                          style={{ borderColor: 'var(--syamila-border)' }}
                        >
                          Batal
                        </button>
                        <button
                          onClick={handleSaveCurrentNote}
                          className="px-3 py-1 rounded text-white bg-amber-700 hover:bg-amber-800 font-medium"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  ) : currentHadithNote ? (
                    <p className="text-xs opacity-85 whitespace-pre-wrap leading-relaxed">
                      {currentHadithNote.note}
                    </p>
                  ) : (
                    <p className="text-xs opacity-60 italic">
                      Belum ada catatan untuk hadits ini.
                    </p>
                  )}
                </div>
              )}

              {/* All Notes List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider opacity-70">
                  Daftar Semua Catatan Penuntut Ilmu:
                </h4>

                {notes.length === 0 ? (
                  <div className="text-center py-8 opacity-60 text-xs">
                    <p>Belum ada catatan ilmiah tersimpan.</p>
                  </div>
                ) : (
                  notes.map((n) => (
                    <div 
                      key={n.hadithId}
                      className="p-3 rounded-xl border text-xs space-y-1"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-800 dark:text-amber-300 font-mono">
                          ID: {n.hadithId}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] opacity-50">{n.updatedAt}</span>
                          <button
                            onClick={() => onDeleteNote(n.hadithId)}
                            className="p-1 text-red-500 opacity-60 hover:opacity-100"
                            title="Hapus catatan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="opacity-85 whitespace-pre-wrap leading-relaxed">
                        {n.note}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer with Quick Backup Action */}
        <div 
          className="p-3 border-t flex items-center justify-between text-xs" 
          style={{ borderColor: 'var(--syamila-border)', backgroundColor: 'var(--syamila-card)' }}
        >
          <span className="opacity-70 text-[11px]">
            Simpan data ke JSON untuk pindah perangkat
          </span>
          {onOpenBackup && (
            <button
              onClick={onOpenBackup}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-700 hover:bg-amber-800 text-white shadow-2xs transition-transform active:scale-95 cursor-pointer"
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
              <span>Cadangkan Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
