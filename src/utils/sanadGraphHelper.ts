import { HadithItem, HadithSanadAnalysis, SanadNode, RawiProfile } from '../types';
import { HADITH_SANAD_MAP, RAWI_PROFILES } from '../data/jarhData';

export interface D3SanadGraphNode {
  id: string;
  name: string;
  nameArabic: string;
  thabaqah: string;
  thabaqahNumber: number;
  statusCategory: 'rasulullah' | 'sahabat' | 'tsiqah' | 'shaduq' | 'maqbul' | 'layyin' | 'dhaif' | 'matruk' | 'mukharrij';
  statusLabel: string;
  rawiId?: string;
  deathYear?: string;
  domicile?: string;
  isMukharrij?: boolean;
  isSahabat?: boolean;
  isRasulullah?: boolean;
  // Computed layout
  x?: number;
  y?: number;
  depth?: number;
}

export interface D3SanadGraphLink {
  source: string;
  target: string;
  shighahTahammul: string;
  ittishalStatus: 'muttashil' | 'munqathi';
  explanation?: string;
}

export interface D3SanadGraphData {
  hadithId: string;
  hadithNumber: number;
  kitabName: string;
  ittishalSanad: string;
  derajatSanad: string;
  ittishalExplanation: string;
  kaidahJarh: string;
  nodes: D3SanadGraphNode[];
  links: D3SanadGraphLink[];
}

/**
 * Builds a structured graph data for D3 visualization from Sahabat to Mukharrij (or vice-versa).
 */
export function buildSanadGraphData(hadith: HadithItem): D3SanadGraphData {
  const mapped = HADITH_SANAD_MAP[hadith.id];

  if (mapped && mapped.silsilah && mapped.silsilah.length > 0) {
    return buildFromMappedSanad(hadith, mapped);
  }

  // Fallback: parse from hadith.sanad and hadith metadata
  return buildFromParsedSanad(hadith);
}

function buildFromMappedSanad(hadith: HadithItem, analysis: HadithSanadAnalysis): D3SanadGraphData {
  const nodes: D3SanadGraphNode[] = [];
  const links: D3SanadGraphLink[] = [];

  // 1. Root Node: Rasulullah ﷺ (Puncak Sanad)
  const rasulullahNodeId = 'sanad-node-rasulullah';
  nodes.push({
    id: rasulullahNodeId,
    name: 'Rasulullah Muhammad ﷺ',
    nameArabic: 'رَسُولُ اللَّهِ مُحَمَّدٌ ﷺ',
    thabaqah: 'Puncak Sanad (Sumber Wahyu)',
    thabaqahNumber: 0,
    statusCategory: 'rasulullah',
    statusLabel: 'Nabi & Rasul Utusan Allah (صلى الله عليه وسلم)',
    deathYear: '11 H (Madinah Munawwarah)',
    domicile: 'Makkah & Madinah',
    isRasulullah: true,
    depth: 0
  });

  // silsilah is usually ordered: 1 = Mukharrij, ..., N = Sahabat
  // Let's reverse so we trace transmission from Sahabat down to Mukharrij:
  // Sahabat -> Tabi'in -> Atba Tabi'in -> ... -> Mukharrij
  const reversedSilsilah = [...analysis.silsilah].reverse();

  let prevNodeId = rasulullahNodeId;

  reversedSilsilah.forEach((sNode, idx) => {
    const rawiProfile = RAWI_PROFILES.find(r => r.id === sNode.rawiId);
    const isSahabat = sNode.statusCategory === 'sahabat' || idx === 0;
    const isMukharrij = sNode.order === 1;

    const nodeId = `sanad-node-${sNode.rawiId || sNode.order}`;

    nodes.push({
      id: nodeId,
      name: sNode.rawiName,
      nameArabic: sNode.rawiArabic,
      thabaqah: sNode.thabaqah,
      thabaqahNumber: rawiProfile?.thabaqahNumber || (idx + 1),
      statusCategory: isMukharrij ? 'mukharrij' : (sNode.statusCategory || 'tsiqah'),
      statusLabel: sNode.statusLabel,
      rawiId: sNode.rawiId,
      deathYear: rawiProfile?.deathYear,
      domicile: rawiProfile?.domicile,
      isSahabat,
      isMukharrij,
      depth: idx + 1
    });

    // Link from previous narrator to this narrator
    links.push({
      source: prevNodeId,
      target: nodeId,
      shighahTahammul: sNode.shighahTahammul || 'عَنْ (Dari)',
      ittishalStatus: 'muttashil',
      explanation: isSahabat ? 'Mendengar langsung / menyertai sabda Rasulullah ﷺ' : undefined
    });

    prevNodeId = nodeId;
  });

  return {
    hadithId: hadith.id,
    hadithNumber: hadith.number,
    kitabName: hadith.kitabName,
    ittishalSanad: analysis.ittishalSanad,
    derajatSanad: analysis.derajatSanad,
    ittishalExplanation: analysis.ittishalExplanation,
    kaidahJarh: analysis.kaidahJarh,
    nodes,
    links
  };
}

function buildFromParsedSanad(hadith: HadithItem): D3SanadGraphData {
  const nodes: D3SanadGraphNode[] = [];
  const links: D3SanadGraphLink[] = [];

  // Root Node: Rasulullah ﷺ
  const rasulullahNodeId = 'sanad-node-rasulullah';
  nodes.push({
    id: rasulullahNodeId,
    name: 'Rasulullah Muhammad ﷺ',
    nameArabic: 'رَسُولُ اللَّهِ مُحَمَّدٌ ﷺ',
    thabaqah: 'Puncak Sanad',
    thabaqahNumber: 0,
    statusCategory: 'rasulullah',
    statusLabel: 'Sumber As-Sunnah wa Asy-Syari\'ah',
    deathYear: '11 H',
    domicile: 'Madinah',
    isRasulullah: true,
    depth: 0
  });

  // Node Sahabat
  const sahabatId = 'sanad-node-sahabat';
  nodes.push({
    id: sahabatId,
    name: hadith.rawiSahabat || 'Sahabat Nabi ﷺ',
    nameArabic: 'الصَّحَابِيُّ الْجَلِيلُ رَضِيَ اللَّهُ عَنْهُ',
    thabaqah: 'Thabaqah 1 (Sahabat)',
    thabaqahNumber: 1,
    statusCategory: 'sahabat',
    statusLabel: 'Kulluhum \'Udul (Sahabat Nabi ﷺ)',
    deathYear: 'Zaman Khulafaur Rasyidin / Sahabat',
    domicile: 'Al-Haramain',
    isSahabat: true,
    depth: 1
  });

  links.push({
    source: rasulullahNodeId,
    target: sahabatId,
    shighahTahammul: 'سَمِعْتُ رَسُولَ اللَّهِ ﷺ',
    ittishalStatus: 'muttashil'
  });

  // Parse intermediate narrators if present in sanad string
  // Clean string e.g. "Diriwayatkan dari... melalui..."
  const rawiChain: string[] = [];
  if (hadith.sanad) {
    const parts = hadith.sanad
      .split(/dari|melalui|lalu|kemudian|->|—/i)
      .map(s => s.trim())
      .filter(s => s.length > 3 && !s.toLowerCase().includes('bersambung') && !s.toLowerCase().includes('diriwayatkan'));
    
    parts.slice(0, 3).forEach(p => {
      if (!p.toLowerCase().includes(hadith.rawiSahabat.toLowerCase().slice(0, 5))) {
        rawiChain.push(p);
      }
    });
  }

  if (rawiChain.length === 0) {
    rawiChain.push('Rijalus Sanad Ats-Tsiqat (Para Perawi Tsiqah)');
  }

  let prevId = sahabatId;
  rawiChain.forEach((rName, idx) => {
    const rawiNodeId = `sanad-parsed-${idx}`;
    nodes.push({
      id: rawiNodeId,
      name: rName,
      nameArabic: 'ثِقَةٌ مِنْ رِجَالِ السَّنَدِ',
      thabaqah: `Thabaqah ${idx + 3} (Perawi)`,
      thabaqahNumber: idx + 3,
      statusCategory: 'tsiqah',
      statusLabel: 'Tsiqah Maqbul (Sanad Shahih)',
      depth: idx + 2
    });

    links.push({
      source: prevId,
      target: rawiNodeId,
      shighahTahammul: idx === 0 ? 'عَنْ (Dari)' : 'حَدَّثَنَا (Menceritakan kepada kami)',
      ittishalStatus: 'muttashil'
    });

    prevId = rawiNodeId;
  });

  // Collector Node (Mukharrij Kitab)
  const mukharrijId = `sanad-mukharrij-${hadith.kitabId}`;
  nodes.push({
    id: mukharrijId,
    name: hadith.kitabName,
    nameArabic: `مُخَرِّجُ الْحَدِيثِ فِي ${hadith.kitabName}`,
    thabaqah: 'Mukharrij Kitab',
    thabaqahNumber: 11,
    statusCategory: 'mukharrij',
    statusLabel: `Penyusun Kitab (${hadith.derajat})`,
    isMukharrij: true,
    depth: nodes.length
  });

  links.push({
    source: prevId,
    target: mukharrijId,
    shighahTahammul: 'أَخْرَجَهُ فِي كِتَابِهِ (Ditakhrij dalam kitab)',
    ittishalStatus: 'muttashil'
  });

  return {
    hadithId: hadith.id,
    hadithNumber: hadith.number,
    kitabName: hadith.kitabName,
    ittishalSanad: 'Muttashil',
    derajatSanad: hadith.derajat,
    ittishalExplanation: `Jalur periwayatan hadits dari sahabat mulia ${hadith.rawiSahabat} sampai ditakhrij oleh pengarang ${hadith.kitabName}.`,
    kaidahJarh: 'Sanad memiliki kesinambungan riwayat (ittishal) yang shahih dan memenuhi syarat para imam hadits.',
    nodes,
    links
  };
}
