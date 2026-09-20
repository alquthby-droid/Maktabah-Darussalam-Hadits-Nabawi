export type HadithGrade = 
  | 'Shahih' 
  | "Muttafaqun 'Alaih" 
  | 'Hasan' 
  | 'Hasan Shahih' 
  | "Dha'if";

export type KitabCategory = 
  | 'Kutubus Sittah' 
  | "Kutubut Tis'ah" 
  | 'Kitab Populer & Fiqih Hadits';

export interface KitabChapter {
  id: number;
  title: string;
  arabicTitle: string;
  hadithRange: string;
}

export interface KitabInfo {
  id: string;
  name: string;
  arabicName: string;
  author: string;
  authorDeath: string;
  category: KitabCategory;
  totalHadith: number;
  description: string;
  coverColor: string;
  chapters: KitabChapter[];
}

export interface HadithItem {
  id: string;
  kitabId: string;
  kitabName: string;
  number: number;
  chapterId: number;
  chapterTitle: string;
  chapterArabic: string;
  arab: string;
  arabPlain?: string;
  terjemah: string;
  sanad: string;
  rawiSahabat: string;
  derajat: HadithGrade;
  takhrijRingkas: string;
  syarahRingkas: string;
  tema: string[];
}

export interface BookmarkItem {
  id: string;
  hadithId: string;
  kitabId: string;
  kitabName: string;
  number: number;
  snippet: string;
  date: string;
}

export interface HadithNote {
  hadithId: string;
  note: string;
  updatedAt: string;
}

export type SyamilaTheme = 'syamila-classic' | 'emerald-mushaf' | 'light' | 'dark';
export type ArabicFontFamily = 'amiri' | 'scheherazade';

export interface SyamilaSettings {
  theme: SyamilaTheme;
  arabicFontSize: number;
  showTashkil: boolean;
  showTranslation: boolean;
  showSanad: boolean;
  showTakhrij: boolean;
  arabicFontFamily: ArabicFontFamily;
}

export interface AISyarahResponse {
  ringkasan?: string;
  gharibulHadits?: Array<{ kata: string; makna: string }>;
  asbabulWurud?: string;
  faedahFiqih?: string[];
  faedahTarbiyah?: string[];
  rujukanSyarah?: string;
  raw?: string;
}

export interface AITakhrijResponse {
  derajatHadits?: string;
  jalurPerawi?: string;
  mutabaatSyawahid?: Array<{ kitab: string; noHadits: string; keselarasan: string }>;
  kesimpulanTakhrij?: string;
  raw?: string;
}

export interface MujamOccurrence {
  symbol: string; // 'خ' | 'م' | 'د' | 'ت' | 'ن' | 'هـ' | 'ط' | 'حم' | 'دي'
  kitabId: string;
  kitabName: string;
  babName: string;
  hadithNumber: number;
  lafadzForm: string;
  excerpt: string;
}

export interface MujamDerivative {
  form: string;
  arabic: string;
  transliteration?: string;
  meaning: string;
  count: number;
}

export interface MujamRootEntry {
  id: string;
  root: string; // e.g. "ن و ي"
  rootArabic: string; // e.g. "نوى"
  transliteration: string;
  generalMeaning: string;
  derivatives: MujamDerivative[];
  totalOccurrences: number;
  occurrences: MujamOccurrence[];
  sharhMufahras?: string;
}

export interface MujamWordAnalysis {
  word: string;
  normalized: string;
  root: string;
  wazan: string;
  makna: string;
  occurrencesCount: number;
  booksCovered: string[];
}

export type RawiStatusCategory = 
  | 'sahabat' 
  | 'tsiqah' 
  | 'shaduq' 
  | 'maqbul' 
  | 'layyin' 
  | 'dhaif' 
  | 'matruk';

export interface AqwalImam {
  imam: string;
  qawl: string;
  indonesia: string;
}

export interface RawiProfile {
  id: string;
  name: string;
  nameArabic: string;
  kunyah?: string;
  nasab?: string;
  thabaqah: string;
  thabaqahNumber: number;
  deathYear: string;
  domicile: string;
  statusTaqrib: string;
  statusCategory: RawiStatusCategory;
  kutubSymbols: string[];
  aqwalAimmah: AqwalImam[];
  syuyukh: string[];
  talamidz: string[];
  maratibTadil: string;
  biographySummary: string;
}

export interface SanadNode {
  order: number;
  rawiId: string;
  rawiName: string;
  rawiArabic: string;
  shighahTahammul: string;
  statusCategory: RawiStatusCategory;
  statusLabel: string;
  thabaqah: string;
}

export interface HadithSanadAnalysis {
  hadithId: string;
  ittishalSanad: 'Muttashil' | 'Munqathi' | "Mu'dhal" | "Mu'allaq";
  ittishalExplanation: string;
  derajatSanad: string;
  silsilah: SanadNode[];
  kaidahJarh: string;
}

export interface ReadingRecord {
  id: string;
  hadithId: string;
  kitabId: string;
  kitabName: string;
  hadithNumber: number;
  readAt: string; // ISO date-time string
  date: string; // YYYY-MM-DD format
}

export interface DailyActivityItem {
  dayNumber: number;
  dateStr: string; // YYYY-MM-DD
  displayDay: string; // e.g. "1 Sep" or "01"
  count: number;
  kitabs: string[];
}

export interface KitabReadingBreakdown {
  kitabId: string;
  kitabName: string;
  count: number;
  color: string;
}

export interface ReadingStats {
  dailyGoal: number;
  records: ReadingRecord[];
}
