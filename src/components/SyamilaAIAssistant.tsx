import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  BookOpen, 
  Scale, 
  MessageSquare, 
  RefreshCw, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  Scroll,
  HelpCircle,
  Lightbulb,
  WifiOff
} from 'lucide-react';
import { HadithItem, AISyarahResponse, AITakhrijResponse } from '../types';
import { getOfflineSyarah, getOfflineTakhrij } from '../utils/offlineTurats';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface SyamilaAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  hadith: HadithItem | null;
  initialTab?: 'syarah' | 'takhrij' | 'ask';
}

export const SyamilaAIAssistant: React.FC<SyamilaAIAssistantProps> = ({
  isOpen,
  onClose,
  hadith,
  initialTab = 'syarah',
}) => {
  const isOnline = useOnlineStatus();
  const [activeTab, setActiveTab] = useState<'syarah' | 'takhrij' | 'ask'>(initialTab);
  
  // Syarah state
  const [syarahData, setSyarahData] = useState<AISyarahResponse | null>(null);
  const [loadingSyarah, setLoadingSyarah] = useState<boolean>(false);
  const [errorSyarah, setErrorSyarah] = useState<string | null>(null);
  const [syarahFallbackUsed, setSyarahFallbackUsed] = useState<boolean>(false);

  // Takhrij state
  const [takhrijData, setTakhrijData] = useState<AITakhrijResponse | null>(null);
  const [loadingTakhrij, setLoadingTakhrij] = useState<boolean>(false);
  const [errorTakhrij, setErrorTakhrij] = useState<string | null>(null);
  const [takhrijFallbackUsed, setTakhrijFallbackUsed] = useState<boolean>(false);

  // Q&A state
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Assalamu\'alaikum wa rahmatullahi wa barakatuh. Saya adalah Asisten Maktabah Syamila. Anda dapat menanyakan faedah hadits, asbabul wurud, hukum fiqih, atau kosa kata hadits yang sedang dikaji.'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [loadingAsk, setLoadingAsk] = useState<boolean>(false);

  // Clean error messages for user-friendly display
  const formatErrorMessage = (err: any): string => {
    if (!err) return 'Terjadi kendala saat memproses permintaan.';
    const msg = typeof err === 'string' ? err : err?.message || JSON.stringify(err);
    if (msg.includes('503') || msg.includes('high demand') || msg.includes('UNAVAILABLE')) {
      return 'Server AI sedang mengalami lonjakan trafik (503). Sistem telah menyediakan rujukan turats.';
    }
    if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
      return 'Batas frekuensi permintaan AI tercapai sementara. Silakan coba beberapa saat lagi.';
    }
    try {
      const match = msg.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (parsed?.error?.message) return parsed.error.message;
      }
    } catch {
      // ignore
    }
    return msg.length > 180 ? `${msg.slice(0, 180)}...` : msg;
  };

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Reset or re-fetch when hadith changes
  useEffect(() => {
    setSyarahData(null);
    setTakhrijData(null);
    setErrorSyarah(null);
    setErrorTakhrij(null);
    setSyarahFallbackUsed(false);
    setTakhrijFallbackUsed(false);
  }, [hadith?.id]);

  if (!isOpen) return null;

  const fetchSyarah = async () => {
    if (!hadith) return;
    setLoadingSyarah(true);
    setErrorSyarah(null);

    // If offline, instantly load authentic local Turats syarah
    if (!isOnline) {
      setSyarahData(getOfflineSyarah(hadith));
      setSyarahFallbackUsed(true);
      setLoadingSyarah(false);
      return;
    }

    try {
      const res = await fetch('/api/hadith/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kitab: hadith.kitabName,
          number: hadith.number,
          arab: hadith.arab,
          terjemah: hadith.terjemah,
          rawi: hadith.rawiSahabat,
          tema: hadith.tema.join(', '),
        }),
      });

      const json = await res.json();
      if (!res.ok && !json.data) {
        throw new Error(json.error || 'Gagal memuat syarah hadits.');
      }
      setSyarahData(json.data);
      if (json.fallbackUsed) {
        setSyarahFallbackUsed(true);
      }
    } catch (err: any) {
      console.error('Error in fetchSyarah, falling back to local turats:', err);
      // Fallback seamlessly to local Turats syarah
      setSyarahData(getOfflineSyarah(hadith));
      setSyarahFallbackUsed(true);
    } finally {
      setLoadingSyarah(false);
    }
  };

  const fetchTakhrij = async () => {
    if (!hadith) return;
    setLoadingTakhrij(true);
    setErrorTakhrij(null);

    // If offline, instantly load authentic local takhrij
    if (!isOnline) {
      setTakhrijData(getOfflineTakhrij(hadith));
      setTakhrijFallbackUsed(true);
      setLoadingTakhrij(false);
      return;
    }

    try {
      const res = await fetch('/api/hadith/takhrij', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kitab: hadith.kitabName,
          number: hadith.number,
          arab: hadith.arab,
          terjemah: hadith.terjemah,
        }),
      });

      const json = await res.json();
      if (!res.ok && !json.data) {
        throw new Error(json.error || 'Gagal memproses takhrij hadits.');
      }
      setTakhrijData(json.data);
      if (json.fallbackUsed) {
        setTakhrijFallbackUsed(true);
      }
    } catch (err: any) {
      console.error('Error in fetchTakhrij, falling back to local takhrij:', err);
      setTakhrijData(getOfflineTakhrij(hadith));
      setTakhrijFallbackUsed(true);
    } finally {
      setLoadingTakhrij(false);
    }
  };

  const handleSendQuestion = async (e?: React.FormEvent, customQ?: string) => {
    if (e) e.preventDefault();
    const q = customQ || inputQuestion;
    if (!q.trim() || loadingAsk) return;

    const newMessages = [...messages, { sender: 'user' as const, text: q }];
    setMessages(newMessages);
    setInputQuestion('');

    if (!isOnline) {
      setMessages([
        ...newMessages,
        {
          sender: 'ai' as const,
          text: '📡 Mode Offline Aktif: Anda sedang membuka Syamila tanpa internet. Fitur pembacaan hadits, syarah turats klasik, takhrij sanad, kamus Al-Mu\'jam Al-Mufahras, dan biografi Al-Jarh wa At-Ta\'dil tetap berfungsi 100%. Tanya jawab interaktif AI akan aktif kembali otomatis begitu perangkat Anda terhubung ke internet.'
        }
      ]);
      return;
    }

    setLoadingAsk(true);

    try {
      const res = await fetch('/api/hadith/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          currentHadith: hadith ? {
            kitab: hadith.kitabName,
            number: hadith.number,
            arab: hadith.arab,
            terjemah: hadith.terjemah,
          } : null,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Gagal memperoleh jawaban.');
      }

      setMessages([...newMessages, { sender: 'ai' as const, text: json.answer }]);
    } catch (err: any) {
      setMessages([...newMessages, { 
        sender: 'ai' as const, 
        text: `⚠️ Maaf, terjadi kendala koneksi: ${err.message || 'Tidak dapat terhubung ke asisten AI.'}` 
      }]);
    } finally {
      setLoadingAsk(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="w-full max-w-3xl rounded-2xl border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--syamila-border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600/15 text-amber-800 dark:text-amber-300 flex items-center justify-center border border-amber-600/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                <span>Asisten Syamila AI</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-600/20 text-amber-800 dark:text-amber-300 font-mono">
                  Gemini Flash
                </span>
                {!isOnline && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-600/20 text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1 border border-amber-500/30">
                    <WifiOff className="w-3 h-3 text-amber-600" />
                    <span>Mode Offline (Turats)</span>
                  </span>
                )}
              </h3>
              <p className="text-[11px] opacity-70">
                {hadith ? `${hadith.kitabName} No. ${hadith.number}` : 'Ensiklopedia Hadits'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b text-xs font-semibold px-4 gap-2" style={{ borderColor: 'var(--syamila-border)' }}>
          <button
            id="tab-ai-syarah"
            onClick={() => setActiveTab('syarah')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'syarah'
                ? 'border-amber-600 text-amber-800 dark:text-amber-300'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Syarah & Faedah</span>
          </button>

          <button
            id="tab-ai-takhrij"
            onClick={() => setActiveTab('takhrij')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'takhrij'
                ? 'border-amber-600 text-amber-800 dark:text-amber-300'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Takhrij & Sanad</span>
          </button>

          <button
            id="tab-ai-ask"
            onClick={() => setActiveTab('ask')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'ask'
                ? 'border-amber-600 text-amber-800 dark:text-amber-300'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Tanya Hadits</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: SYARAH & FAEDAH */}
          {activeTab === 'syarah' && (
            <div>
              {!syarahData && !loadingSyarah && !errorSyarah && (
                <div className="text-center py-8 space-y-3">
                  <Scroll className="w-12 h-12 mx-auto opacity-40 text-amber-700" />
                  <h4 className="font-bold text-sm sm:text-base">Kaji Syarah & Faedah Ulama</h4>
                  <p className="text-xs max-w-md mx-auto opacity-75">
                    Asisten AI akan menganalisis teks hadits ini secara komprehensif mengacu pada kitab-kitab syarah klasik (Fathul Bari, Syarah Shahih Muslim An-Nawawi, dll.), mencakup gharibul hadits, asbabul wurud, faedah fiqih, dan tarbiyah.
                  </p>
                  <button
                    id="btn-fetch-syarah"
                    onClick={fetchSyarah}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 transition-colors shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Muat Syarah Mendalam</span>
                  </button>
                </div>
              )}

              {loadingSyarah && (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 mx-auto animate-spin text-amber-600" />
                  <p className="text-xs font-medium opacity-80">
                    Sedang menelaah kitab-kitab syarah turats dan menyusun faedah ilmiah...
                  </p>
                </div>
              )}

              {errorSyarah && (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Gagal memuat syarah</span>
                  </div>
                  <p>{errorSyarah}</p>
                  <button
                    onClick={fetchSyarah}
                    className="px-3 py-1 rounded bg-red-600 text-white font-medium hover:bg-red-700"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}

              {syarahData && (
                <div className="space-y-4 text-xs sm:text-sm animate-in fade-in">
                  {syarahFallbackUsed && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-600/10 border border-amber-600/25 text-xs text-amber-900 dark:text-amber-200">
                      <BookOpen className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>Rujukan Turats Maktabah Syamila (Disajikan otomatis dari kitab-kitab syarah klasik).</span>
                    </div>
                  )}

                  {/* Summary */}
                  {syarahData.ringkasan && (
                    <div className="p-3.5 rounded-xl border"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                        Ringkasan Makna Hadits
                      </div>
                      <p className="leading-relaxed opacity-90">{syarahData.ringkasan}</p>
                    </div>
                  )}

                  {/* Gharibul Hadits */}
                  {syarahData.gharibulHadits && syarahData.gharibulHadits.length > 0 && (
                    <div className="p-3.5 rounded-xl border"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
                        Gharibul Hadits (غريب الحديث - Kosa Kata Kunci)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {syarahData.gharibulHadits.map((g, idx) => (
                          <div key={idx} className="p-2 rounded bg-black/5 dark:bg-white/5 border border-black/5">
                            <span className="font-arabic-amiri text-sm font-bold text-amber-800 dark:text-amber-200">
                              {g.kata}:
                            </span>{' '}
                            <span className="opacity-90">{g.makna}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Asbabul Wurud */}
                  {syarahData.asbabulWurud && (
                    <div className="p-3.5 rounded-xl border"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                        Asbabul Wurud & Konteks Riwayat
                      </div>
                      <p className="leading-relaxed opacity-90">{syarahData.asbabulWurud}</p>
                    </div>
                  )}

                  {/* Faedah Fiqih */}
                  {syarahData.faedahFiqih && syarahData.faedahFiqih.length > 0 && (
                    <div className="p-3.5 rounded-xl border"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
                        Faedah Fiqih & Hukum Amaliah
                      </div>
                      <ul className="list-disc list-inside space-y-1 opacity-90 leading-relaxed">
                        {syarahData.faedahFiqih.map((f, idx) => (
                          <li key={idx}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Faedah Tarbiyah */}
                  {syarahData.faedahTarbiyah && syarahData.faedahTarbiyah.length > 0 && (
                    <div className="p-3.5 rounded-xl border"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
                        Pelajaran Tazkiyah & Akhlak Mulia
                      </div>
                      <ul className="list-disc list-inside space-y-1 opacity-90 leading-relaxed">
                        {syarahData.faedahTarbiyah.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Rujukan Syarah */}
                  {syarahData.rujukanSyarah && (
                    <div className="text-[11px] opacity-75 italic text-right pt-1">
                      📚 Rujukan: {syarahData.rujukanSyarah}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TAKHRIJ & SANAD */}
          {activeTab === 'takhrij' && (
            <div>
              {!takhrijData && !loadingTakhrij && !errorTakhrij && (
                <div className="text-center py-8 space-y-3">
                  <Scale className="w-12 h-12 mx-auto opacity-40 text-amber-700" />
                  <h4 className="font-bold text-sm sm:text-base">Kaji Takhrij & Jalur Sanad</h4>
                  <p className="text-xs max-w-md mx-auto opacity-75">
                    Menelaah derajat keshahihan hadits, jalur sahabat yang meriwayatkan, serta mutaba'at dan syawahid yang ada pada Kutubus Sittah.
                  </p>
                  <button
                    id="btn-fetch-takhrij"
                    onClick={fetchTakhrij}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 transition-colors shadow-sm"
                  >
                    <Scale className="w-4 h-4 text-amber-200" />
                    <span>Mulai Takhrij Hadits</span>
                  </button>
                </div>
              )}

              {loadingTakhrij && (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 mx-auto animate-spin text-amber-600" />
                  <p className="text-xs font-medium opacity-80">
                    Sedang menelusuri jalur riwayat dan syawahid hadits...
                  </p>
                </div>
              )}

              {errorTakhrij && (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Gagal memproses takhrij</span>
                  </div>
                  <p>{errorTakhrij}</p>
                  <button
                    onClick={fetchTakhrij}
                    className="px-3 py-1 rounded bg-red-600 text-white font-medium hover:bg-red-700"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}

              {takhrijData && (
                <div className="space-y-4 text-xs sm:text-sm animate-in fade-in">
                  {takhrijFallbackUsed && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-600/10 border border-amber-600/25 text-xs text-amber-900 dark:text-amber-200">
                      <Scale className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>Takhrij & Sanad bersumber dari kompilasi Kutubus Sunnah Maktabah Syamila.</span>
                    </div>
                  )}

                  <div className="p-4 rounded-xl border"
                    style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                  >
                    <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                      Derajat & Status Hadits
                    </div>
                    <p className="font-semibold text-sm">{takhrijData.derajatHadits || hadith?.derajat}</p>
                    {takhrijData.jalurPerawi && (
                      <p className="mt-2 opacity-80 text-xs leading-relaxed">
                        <strong>Perawi Inti:</strong> {takhrijData.jalurPerawi}
                      </p>
                    )}
                  </div>

                  {takhrijData.mutabaatSyawahid && takhrijData.mutabaatSyawahid.length > 0 && (
                    <div className="p-4 rounded-xl border"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
                        Mutaba'at & Syawahid (Riwayat Sejalan di Kitab Lain)
                      </div>
                      <div className="space-y-2">
                        {takhrijData.mutabaatSyawahid.map((m, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 text-xs">
                            <div className="flex items-center justify-between font-semibold">
                              <span>{m.kitab}</span>
                              <span className="opacity-75 font-mono">No. {m.noHadits}</span>
                            </div>
                            <p className="mt-1 opacity-80 text-[11px]">{m.keselarasan}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {takhrijData.kesimpulanTakhrij && (
                    <div className="p-4 rounded-xl border"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                        Kesimpulan Takhrij
                      </div>
                      <p className="leading-relaxed opacity-90">{takhrijData.kesimpulanTakhrij}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TANYA HADITS */}
          {activeTab === 'ask' && (
            <div className="flex flex-col h-full space-y-3">
              {/* Preset suggestion questions */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="opacity-70 flex items-center gap-1 mr-1">
                  <Lightbulb className="w-3 h-3 text-amber-600" /> Tanya cepat:
                </span>
                {[
                  'Apa faedah praktis hadits ini?',
                  'Bagaimana asbabul wurud hadits ini?',
                  'Apakah hadits ini berlaku umum atau ada takhsis?',
                  'Sebutkan penjelasan ulama madzhab Syafi\'i terkait hadits ini'
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendQuestion(undefined, q)}
                    className="px-2 py-0.5 rounded-full border bg-black/5 dark:bg-white/5 hover:bg-amber-600/15 text-amber-900 dark:text-amber-200 transition-colors"
                    style={{ borderColor: 'var(--syamila-border)' }}
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Message Stream */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {messages.map((m, idx) => (
                  <div 
                    key={idx}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-amber-700 text-white rounded-br-none'
                          : 'rounded-bl-none border shadow-2xs'
                      }`}
                      style={{
                        backgroundColor: m.sender === 'user' ? undefined : 'var(--syamila-card)',
                        borderColor: m.sender === 'user' ? undefined : 'var(--syamila-border)',
                        color: m.sender === 'user' ? '#FFFFFF' : 'var(--syamila-text)'
                      }}
                    >
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}

                {loadingAsk && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-2xl rounded-bl-none border text-xs flex items-center gap-2"
                      style={{ backgroundColor: 'var(--syamila-card)', borderColor: 'var(--syamila-border)' }}
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                      <span>Asisten Syamila sedang menyusun jawaban...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendQuestion} className="flex gap-2 pt-2 border-t" style={{ borderColor: 'var(--syamila-border)' }}>
                <input
                  type="text"
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  placeholder="Tuliskan pertanyaan seputar hadits ini..."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border outline-none focus:ring-1 focus:ring-amber-500"
                  style={{
                    backgroundColor: 'var(--syamila-card)',
                    borderColor: 'var(--syamila-border)',
                    color: 'var(--syamila-text)'
                  }}
                />
                <button
                  type="submit"
                  disabled={loadingAsk || !inputQuestion.trim()}
                  className="px-4 py-2 rounded-xl text-white bg-amber-700 hover:bg-amber-800 disabled:opacity-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
