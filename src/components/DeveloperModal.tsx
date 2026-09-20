import React from 'react';
import { 
  X, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  HeartHandshake, 
  Sparkles, 
  MapPin,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="modal-developer-profile"
        className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border transition-all"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        {/* Header with Islamic Ornament Banner */}
        <div 
          className="p-6 border-b relative bg-gradient-to-r from-emerald-950 via-amber-950 to-emerald-950 text-white"
          style={{ borderColor: 'var(--syamila-border)' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-emerald-600 p-0.5 shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-emerald-950 flex items-center justify-center text-amber-300 font-bold text-xl">
                  AH
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/25 text-amber-300 border border-amber-500/30 uppercase tracking-wider mb-1">
                  Khadim Maktabah & Pengembang
                </span>
                <h3 className="font-bold text-lg sm:text-xl leading-snug text-white">
                  Al-Faqir Husni, S. Kom. I
                </h3>
                <p className="text-xs text-amber-200/90 font-medium flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Penyuluh Agama Islam Kemenag Lombok Barat</span>
                </p>
              </div>
            </div>

            <button
              id="btn-close-dev-modal"
              onClick={onClose}
              className="p-1.5 rounded-lg text-amber-200/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Institutional Background & Almamater */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>Riwayat Pendidikan & Pesantren</span>
            </h4>

            <div className="space-y-2.5">
              {/* Pesantren Darussalam Bermi */}
              <div 
                className="p-3.5 rounded-xl border flex items-start gap-3 bg-black/5 dark:bg-white/5"
                style={{ borderColor: 'var(--syamila-border)' }}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-sm block">
                    Alumni Yayasan Ponpes Darussalam Bermi
                  </span>
                  <p className="opacity-75 mt-0.5 leading-relaxed">
                    Menempuh pendidikan ilmu-ilmu keislaman, kitab kuning (turats), serta adab pesantren di Pondok Pesantren Darussalam Bermi, Lombok Barat.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 mt-1 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>Bermi, Lombok Barat, Nusa Tenggara Barat</span>
                  </div>
                </div>
              </div>

              {/* STID Mustafa Ibrahim Al-Ishlahuddiny */}
              <div 
                className="p-3.5 rounded-xl border flex items-start gap-3 bg-black/5 dark:bg-white/5"
                style={{ borderColor: 'var(--syamila-border)' }}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-sm block">
                    Alumni STID Mustafa Ibrahim Al-Ishlahuddiny
                  </span>
                  <p className="opacity-75 mt-0.5 leading-relaxed">
                    Menyelesaikan jenjang sarjana Strata Satu (S. Kom. I) di Sekolah Tinggi Ilmu Dakwah (STID) Mustafa Ibrahim Al-Ishlahuddiny Kediri.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>Kediri, Lombok Barat, Nusa Tenggara Barat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ministry Role & Mission */}
          <div 
            className="p-4 rounded-xl border bg-gradient-to-br from-emerald-500/10 via-amber-500/5 to-emerald-500/10 space-y-2.5"
            style={{ borderColor: 'var(--syamila-border)' }}
          >
            <div className="flex items-center gap-2 font-bold text-xs text-emerald-800 dark:text-emerald-300">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Tugas & Khidmah Keagamaan</span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Sebagai <strong>Penyuluh Agama Islam Kementerian Agama Kabupaten Lombok Barat</strong>, aplikasi Maktabah Darussalam Hadits ini dikembangkan dengan niat tulus berkhidmah untuk agama (<em>Khidmah Li Turatsin Nabawi</em>) guna menyediakan media pembelajaran hadits digital yang shahih, mudah, interaktif, dan dapat diakses offline oleh para santri, asatidz, penyuluh agama, da'i, serta seluruh umat Islam di tanah air.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t text-[11px] opacity-80" style={{ borderColor: 'var(--syamila-border)' }}>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Bagan Sanad D3.js Interaktif</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Modul Al-Jarh wa At-Ta'dil</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Kamus Al-Mu'jam Al-Mufahras</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>PWA 100% Akses Offline</span>
              </div>
            </div>
          </div>

          {/* Doa & Harapan */}
          <div className="text-center p-3 rounded-xl bg-black/5 dark:bg-white/5 border text-xs italic opacity-85 leading-relaxed font-serif" style={{ borderColor: 'var(--syamila-border)' }}>
            "Semoga aplikasi ini menjadi amal jariyah yang berberkah bagi kita semua, serta menambah kecintaan dan pemahaman kita terhadap Sunnah Baginda Rasulullah shallallahu 'alaihi wa sallam."
          </div>
        </div>

        {/* Footer */}
        <div 
          className="p-4 border-t bg-black/5 dark:bg-white/5 flex items-center justify-between"
          style={{ borderColor: 'var(--syamila-border)' }}
        >
          <span className="text-[11px] opacity-60">
            Lombok Barat, Nusa Tenggara Barat
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
