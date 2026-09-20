import React from 'react';
import { Download, Share, PlusSquare, X, Smartphone, Check, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallAndroid = async () => {
    const installed = await install();
    if (installed) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        id="modal-pwa-install"
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border transition-all"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        {/* Header with App Brand */}
        <div className="p-5 border-b flex items-start justify-between bg-gradient-to-r from-emerald-900/30 to-amber-900/20" style={{ borderColor: 'var(--syamila-border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/30 shadow-md bg-white/95 dark:bg-black/30 flex items-center justify-center shrink-0">
              <img 
                src="https://cdn.phototourl.com/free/2026-09-20-b0c74d12-3376-480e-b5a0-efb20f8b4a76.png" 
                alt="Maktabah Darussalam" 
                className="w-full h-full object-contain p-1"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-darussalam.png';
                }}
              />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Pasang Maktabah Darussalam</h3>
              <p className="text-xs opacity-70 mt-0.5">Aplikasi Hadits Lengkap & 100% Offline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Key Advantages */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Tanpa Internet (Offline)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Layar Penuh (App Asli)</span>
            </div>
          </div>

          {/* If already running in standalone */}
          {isInstalled ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm text-emerald-800 dark:text-emerald-300">Aplikasi Sudah Terpasang</h4>
              <p className="text-xs opacity-80">
                Maktabah Darussalam Hadits telah berjalan sebagai aplikasi standalone pada perangkat Anda.
              </p>
            </div>
          ) : isIOS ? (
            /* iOS Safari Instructions */
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs leading-relaxed">
                <p className="font-semibold text-amber-900 dark:text-amber-300 mb-1.5 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  Panduan Pasang di iPhone / iPad (iOS):
                </p>
                <ol className="space-y-2.5 ml-1 mt-2 text-left">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 font-bold text-[11px]">
                      1
                    </span>
                    <span>
                      Buka di browser <strong>Safari</strong>, lalu tekan tombol <strong>Bagikan (Share)</strong>
                      <span className="inline-flex items-center mx-1 px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">
                        <Share className="w-3 h-3 inline mr-1 text-blue-500" /> [Kotak Panah Atas]
                      </span>
                      di bar bawah Safari.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 font-bold text-[11px]">
                      2
                    </span>
                    <span>
                      Gulir menu ke bawah lalu pilih menu <strong>"Tambah ke Layar Utama" (Add to Home Screen)</strong>
                      <span className="inline-flex items-center mx-1 px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">
                        <PlusSquare className="w-3 h-3 inline mr-1" />
                      </span>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 font-bold text-[11px]">
                      3
                    </span>
                    <span>
                      Tekan tombol <strong>"Tambah" (Add)</strong> di pojok kanan atas. Ikon Syamila Hadits akan langsung muncul di beranda iOS Anda!
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          ) : isInstallable ? (
            /* Android / Chrome One-Click Install */
            <div className="space-y-3 text-center">
              <p className="text-xs opacity-80">
                Tekan tombol di bawah untuk memasang Syamila Hadits langsung ke beranda Android Anda tanpa perlu melalui toko aplikasi.
              </p>
              <button
                id="btn-confirm-install-pwa"
                onClick={handleInstallAndroid}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-600 text-white shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Pasang Sekarang (Instan)</span>
              </button>
            </div>
          ) : (
            /* Generic instructions for other browsers / desktop */
            <div className="space-y-3 text-xs leading-relaxed">
              <p className="opacity-80">
                Untuk memasang aplikasi ini di layar utama HP atau desktop:
              </p>
              <ul className="list-disc list-inside space-y-1 opacity-90 pl-1">
                <li>Di Chrome/Android: Tekan menu titik tiga (⋮) lalu pilih <strong>"Install App"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.</li>
                <li>Di iPhone Safari: Tekan tombol <strong>Share</strong> lalu <strong>"Add to Home Screen"</strong>.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t bg-black/5 dark:bg-white/5 flex justify-end" style={{ borderColor: 'var(--syamila-border)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
