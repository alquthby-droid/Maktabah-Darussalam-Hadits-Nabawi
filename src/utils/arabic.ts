/**
 * Utilities for Arabic text handling in Maktabah Syamila
 */

// Regex for Arabic diacritics / tashkil
const TASHKIL_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;

/**
 * Menghilangkan harakat / tasykil dari teks Arab
 */
export function removeTashkil(text: string): string {
  if (!text) return '';
  return text.replace(TASHKIL_REGEX, '');
}

/**
 * Normalisasi karakter Arab untuk pencarian fleksibel khas Syamila:
 * - Mengubah ragam Alif (أ, إ, آ, ٱ) menjadi (ا)
 * - Mengubah Ta Marbuthah (ة) menjadi (ه)
 * - Mengubah Alif Maqshurah (ى) menjadi (ي)
 * - Menghilangkan tatwil/kashida (ـ)
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return removeTashkil(text)
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ـ/g, '')
    .trim();
}

/**
 * Format teks Hadits untuk disalin ke papan klip (WhatsApp / catatan kajian)
 */
export function formatHadithForCopy(hadith: {
  kitabName: string;
  number: number;
  chapterTitle: string;
  sanad: string;
  arab: string;
  terjemah: string;
  derajat: string;
  rawiSahabat: string;
  takhrijRingkas?: string;
}): string {
  return `📜 *${hadith.kitabName} - No. ${hadith.number}*
📂 *Bab:* ${hadith.chapterTitle}
👤 *Perawi:* ${hadith.rawiSahabat}
⚖️ *Derajat:* ${hadith.derajat}

----------------------------------------
${hadith.arab}
----------------------------------------

*Terjemahan:*
"${hadith.terjemah}"

*Sanad:* ${hadith.sanad}
${hadith.takhrijRingkas ? `*Takhrij:* ${hadith.takhrijRingkas}\n` : ''}
_Dikutip via Maktabah Syamila Hadits Digital_`;
}

/**
 * Standard citation symbols in Al-Mu'jam Al-Mufahras li Alfazh Al-Hadits An-Nabawi
 * compiled by A.J. Wensinck et al. across Kutubut Tis'ah
 */
export const MUJAM_KUTUB_SYMBOLS: Record<
  string, 
  { symbol: string; name: string; author: string; color: string; badgeBg: string; kitabId: string }
> = {
  'خ': { symbol: 'خ', name: 'Shahih Al-Bukhari', author: 'Al-Bukhari (w. 256 H)', color: 'text-amber-700 dark:text-amber-300', badgeBg: 'bg-amber-600/15 border-amber-600/30 text-amber-900 dark:text-amber-200', kitabId: 'bukhari' },
  'م': { symbol: 'م', name: 'Shahih Muslim', author: 'Muslim (w. 261 H)', color: 'text-emerald-700 dark:text-emerald-300', badgeBg: 'bg-emerald-600/15 border-emerald-600/30 text-emerald-900 dark:text-emerald-200', kitabId: 'muslim' },
  'د': { symbol: 'د', name: 'Sunan Abi Dawud', author: 'Abu Dawud (w. 275 H)', color: 'text-stone-700 dark:text-stone-300', badgeBg: 'bg-stone-600/15 border-stone-600/30 text-stone-900 dark:text-stone-200', kitabId: 'abu-dawud' },
  'ت': { symbol: 'ت', name: "Jami' At-Tirmidzi", author: 'At-Tirmidzi (w. 279 H)', color: 'text-rose-700 dark:text-rose-300', badgeBg: 'bg-rose-600/15 border-rose-600/30 text-rose-900 dark:text-rose-200', kitabId: 'tirmidzi' },
  'ن': { symbol: 'ن', name: "Sunan An-Nasa'i", author: "An-Nasa'i (w. 303 H)", color: 'text-indigo-700 dark:text-indigo-300', badgeBg: 'bg-indigo-600/15 border-indigo-600/30 text-indigo-900 dark:text-indigo-200', kitabId: 'nasai' },
  'هـ': { symbol: 'هـ', name: 'Sunan Ibnu Majah', author: 'Ibnu Majah (w. 273 H)', color: 'text-cyan-700 dark:text-cyan-300', badgeBg: 'bg-cyan-600/15 border-cyan-600/30 text-cyan-900 dark:text-cyan-200', kitabId: 'ibnu-majah' },
  'ط': { symbol: 'ط', name: "Muwatha' Malik", author: 'Malik bin Anas (w. 179 H)', color: 'text-yellow-700 dark:text-yellow-300', badgeBg: 'bg-yellow-600/15 border-yellow-600/30 text-yellow-900 dark:text-yellow-200', kitabId: 'muwatha-malik' },
  'حم': { symbol: 'حم', name: 'Musnad Ahmad', author: 'Ahmad bin Hanbal (w. 241 H)', color: 'text-blue-700 dark:text-blue-300', badgeBg: 'bg-blue-600/15 border-blue-600/30 text-blue-900 dark:text-blue-200', kitabId: 'musnad-ahmad' },
  'دي': { symbol: 'دي', name: 'Sunan Ad-Darimi', author: 'Ad-Darimi (w. 255 H)', color: 'text-teal-700 dark:text-teal-300', badgeBg: 'bg-teal-600/15 border-teal-600/30 text-teal-900 dark:text-teal-200', kitabId: 'sunan-darimi' },
};
