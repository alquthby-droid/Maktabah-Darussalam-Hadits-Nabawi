import React from 'react';
import { 
  Settings, 
  X, 
  Palette, 
  Type, 
  Check, 
  Eye, 
  Layers, 
  Sliders,
  UserCheck,
  Building2,
  GraduationCap
} from 'lucide-react';
import { SyamilaSettings, SyamilaTheme, ArabicFontFamily } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SyamilaSettings;
  onUpdateSettings: (newSettings: Partial<SyamilaSettings>) => void;
  onOpenDeveloperProfile?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenDeveloperProfile,
}) => {
  if (!isOpen) return null;

  const themes: Array<{ id: SyamilaTheme; name: string; desc: string; previewBg: string; border: string }> = [
    {
      id: 'syamila-classic',
      name: 'Kertas Syamila Klasik',
      desc: 'Warna kertas kitab kuning klasik (Parchment), nyaman untuk muthala\'ah lama',
      previewBg: '#FAF6ED',
      border: '#E2D7BE',
    },
    {
      id: 'emerald-mushaf',
      name: 'Emerald Mushaf',
      desc: 'Nuansa hijau mushaf Islami dengan kontras teduh',
      previewBg: '#F4F8F6',
      border: '#C8DECFA',
    },
    {
      id: 'light',
      name: 'Terang Modern',
      desc: 'Tampilan bersih minimalis modern',
      previewBg: '#F8FAFC',
      border: '#E2E8F0',
    },
    {
      id: 'dark',
      name: 'Malam / Kalam Night',
      desc: 'Tema gelap ramah mata untuk membaca malam hari',
      previewBg: '#111418',
      border: '#2C3542',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="w-full max-w-lg rounded-2xl border shadow-xl flex flex-col max-h-[90vh] overflow-hidden my-auto"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--syamila-border)' }}>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base">Pengaturan Maktabah Darussalam</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Section: Themes */}
          <div className="space-y-2.5">
            <label className="font-bold text-xs uppercase tracking-wider opacity-75 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-amber-600" />
              <span>Tema Visual Tampilan</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {themes.map((t) => {
                const isSelected = settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onUpdateSettings({ theme: t.id })}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected 
                        ? 'ring-2 ring-amber-600 shadow-xs' 
                        : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: t.previewBg,
                      borderColor: t.border,
                      color: t.id === 'dark' ? '#F1F5F9' : '#2D2518'
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span>{t.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                      </div>
                      <p className="text-[11px] opacity-75 mt-1 leading-snug">
                        {t.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Arabic Typography */}
          <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--syamila-border)' }}>
            <label className="font-bold text-xs uppercase tracking-wider opacity-75 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-amber-600" />
              <span>Tipografi & Huruf Arab</span>
            </label>

            {/* Font Family Selection */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateSettings({ arabicFontFamily: 'amiri' })}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  settings.arabicFontFamily === 'amiri'
                    ? 'bg-amber-600/15 border-amber-600 text-amber-800 dark:text-amber-300 font-semibold'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5'
                }`}
              >
                <span className="font-arabic-amiri text-lg block">بِسْمِ اللَّهِ</span>
                <span className="text-xs">Amiri (Naskh Klasik)</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ arabicFontFamily: 'scheherazade' })}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  settings.arabicFontFamily === 'scheherazade'
                    ? 'bg-amber-600/15 border-amber-600 text-amber-800 dark:text-amber-300 font-semibold'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5'
                }`}
              >
                <span className="font-arabic-scheherazade text-lg block">بِسْمِ اللَّهِ</span>
                <span className="text-xs">Scheherazade New</span>
              </button>
            </div>

            {/* Arabic Font Size Slider */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>Ukuran Huruf Arab:</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                  {settings.arabicFontSize}px
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="40"
                step="2"
                value={settings.arabicFontSize}
                onChange={(e) => onUpdateSettings({ arabicFontSize: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] opacity-60">
                <span>Kecil (18px)</span>
                <span>Standar (28px)</span>
                <span>Besar (40px)</span>
              </div>
            </div>
          </div>

          {/* Section: Reader Display Toggles */}
          <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--syamila-border)' }}>
            <label className="font-bold text-xs uppercase tracking-wider opacity-75 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-amber-600" />
              <span>Opsi Tampilan Pembaca</span>
            </label>

            <div className="space-y-2">
              {/* Tashkil toggle */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                style={{ borderColor: 'var(--syamila-border)' }}
              >
                <div>
                  <div className="font-semibold text-xs">Tampilkan Tasykil / Harakat</div>
                  <div className="text-[11px] opacity-70">Matikan jika ingin membaca teks Arab gundul</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showTashkil}
                  onChange={(e) => onUpdateSettings({ showTashkil: e.target.checked })}
                  className="w-4 h-4 accent-amber-600 rounded"
                />
              </label>

              {/* Translation toggle */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                style={{ borderColor: 'var(--syamila-border)' }}
              >
                <div>
                  <div className="font-semibold text-xs">Tampilkan Terjemahan Indonesia</div>
                  <div className="text-[11px] opacity-70">Tampilkan arti dan pemaknaan dalam bahasa Indonesia</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showTranslation}
                  onChange={(e) => onUpdateSettings({ showTranslation: e.target.checked })}
                  className="w-4 h-4 accent-amber-600 rounded"
                />
              </label>

              {/* Sanad toggle */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                style={{ borderColor: 'var(--syamila-border)' }}
              >
                <div>
                  <div className="font-semibold text-xs">Tampilkan Silsilah Sanad</div>
                  <div className="text-[11px] opacity-70">Rantai perawi hadits secara default</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showSanad}
                  onChange={(e) => onUpdateSettings({ showSanad: e.target.checked })}
                  className="w-4 h-4 accent-amber-600 rounded"
                />
              </label>
            </div>
          </div>

          {/* Section: Mobile & PWA Offline Status */}
          <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: 'var(--syamila-border)' }}>
            <label className="font-bold text-xs uppercase tracking-wider opacity-75 flex items-center gap-1.5">
              <span>Aplikasi Mobile & Akses Offline</span>
            </label>
            <div className="p-3 rounded-xl border bg-black/5 dark:bg-white/5 space-y-2" style={{ borderColor: 'var(--syamila-border)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-xs">PWA & Offline Cache Siap</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-emerald-600/15 text-emerald-800 dark:text-emerald-300">
                  v1.2.0 PWA
                </span>
              </div>
              <p className="text-[11px] opacity-75 leading-relaxed">
                Aplikasi ini mendukung penuh instalasi mandiri di Android (Chrome/Edge) dan iOS (Safari "Add to Home Screen"). Seluruh teks arab, terjemahan, sanad, biografi rijal (Jarh wa Ta'dil), dan kamus (Mu'jam Mufahras) dapat diakses 100% tanpa kuota internet.
              </p>
            </div>
          </div>

          {/* Section: Profil Pengembang & Khadim Maktabah */}
          <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: 'var(--syamila-border)' }}>
            <label className="font-bold text-xs uppercase tracking-wider opacity-75 flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>Profil Pengembang & Khadim Maktabah</span>
            </label>
            <div 
              className="p-3.5 rounded-xl border bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-amber-500/10 space-y-2.5"
              style={{ borderColor: 'var(--syamila-border)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                    Al-Faqir Husni, S. Kom. I
                  </h4>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3" />
                    <span>Penyuluh Agama Islam Kemenag Lombok Barat</span>
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-amber-600/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  Lombok Barat
                </span>
              </div>
              <p className="text-[11px] opacity-80 leading-relaxed">
                Alumni Yayasan Ponpes Darussalam Bermi & STID Mustafa Ibrahim Al-Ishlahuddiny Kediri Lombok Barat.
              </p>
              {onOpenDeveloperProfile && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenDeveloperProfile();
                  }}
                  className="w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-emerald-700/15 hover:bg-emerald-700/25 text-emerald-900 dark:text-emerald-200 border border-emerald-600/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Buka Lembar Profil & Dedikasi Khidmah Lengkap</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end" style={{ borderColor: 'var(--syamila-border)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-white bg-amber-700 hover:bg-amber-800 text-xs font-semibold shadow-xs"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
