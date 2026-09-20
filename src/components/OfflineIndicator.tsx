import React, { useState } from 'react';
import { WifiOff, CheckCircle2, X } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [dismissed, setDismissed] = useState(false);

  // If online, optionally don't show, or reset dismissal if state changed
  if (isOnline) {
    return null;
  }

  if (dismissed) {
    return (
      <button
        id="btn-offline-min-badge"
        onClick={() => setDismissed(false)}
        className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-600/95 text-white shadow-lg backdrop-blur-sm border border-amber-400/30 active:scale-95 transition-all"
        title="Klik untuk info mode offline"
      >
        <WifiOff className="w-3.5 h-3.5 animate-pulse" />
        <span>Offline</span>
      </button>
    );
  }

  return (
    <div
      id="pwa-offline-banner"
      className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-4 z-50 sm:max-w-md p-3 rounded-xl bg-amber-900/95 text-amber-50 shadow-2xl border border-amber-600/40 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
      role="status"
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-700/80 flex items-center justify-center shrink-0 text-amber-200 mt-0.5">
            <WifiOff className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-amber-100">Mode Offline Aktif</h4>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-700 text-amber-200">
                PWA Siap
              </span>
            </div>
            <p className="text-[11px] text-amber-200/90 mt-0.5 leading-relaxed">
              Semua teks hadits (Kutubut Tis'ah, Arbain, Bulughul Maram), tarjamah, syarah, rawi, & pencarian tetap berfungsi penuh tanpa internet.
            </p>
            <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-amber-300/80">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Data kitab & riwayat bacaan tersimpan di memori perangkat</span>
            </div>
          </div>
        </div>
        <button
          id="btn-close-offline-banner"
          onClick={() => setDismissed(true)}
          className="p-1 rounded-md text-amber-300 hover:text-white hover:bg-amber-800/60 transition-colors"
          title="Tutup pemberitahuan"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
