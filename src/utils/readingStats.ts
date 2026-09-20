import { HadithItem, ReadingRecord, ReadingStats, DailyActivityItem, KitabReadingBreakdown } from '../types';

const STORAGE_KEY = 'syamila_reading_stats';

export function getTodayDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate realistic seeded history for the current month so user sees a vibrant monthly graph immediately
function generateInitialRecords(): ReadingRecord[] {
  const records: ReadingRecord[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  const kitabs = [
    { id: 'bukhari', name: 'Shahih Al-Bukhari' },
    { id: 'muslim', name: 'Shahih Muslim' },
    { id: 'abu-dawud', name: 'Sunan Abi Dawud' },
    { id: 'tirmidzi', name: 'Jami\' At-Tirmidzi' },
    { id: 'arba-in', name: 'Al-Arba\'in An-Nawawiyyah' },
    { id: 'riyadhus-shalihin', name: 'Riyadhus Shalihin' },
  ];

  // Daily pattern for the month up to today
  // Give some realistic variation: higher on weekends/Friday, steady daily reading
  for (let day = 1; day <= currentDay; day++) {
    const dateObj = new Date(currentYear, currentMonth, day, 9, 0, 0);
    const dateStr = getTodayDateString(dateObj);
    const dayOfWeek = dateObj.getDay(); // 0 is Sun, 5 is Fri

    // Determine number of hadiths for this day
    let count = 0;
    if (day === currentDay) {
      count = 7; // today's initial progress towards goal 10
    } else if (dayOfWeek === 5) {
      // Friday / Jumu'ah has high reading volume
      count = 12 + (day % 3);
    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend study
      count = 8 + (day % 4);
    } else if (day % 7 === 2) {
      count = 2; // lighter day
    } else {
      count = 4 + (day % 5);
    }

    for (let i = 0; i < count; i++) {
      const kitab = kitabs[(day + i) % kitabs.length];
      const hadithNum = ((day * 17 + i * 31) % 150) + 1;
      records.push({
        id: `seed-${dateStr}-${i}`,
        hadithId: `${kitab.id}-${hadithNum}`,
        kitabId: kitab.id,
        kitabName: kitab.name,
        hadithNumber: hadithNum,
        readAt: new Date(currentYear, currentMonth, day, 8 + (i % 12), (i * 13) % 60).toISOString(),
        date: dateStr,
      });
    }
  }

  return records;
}

export function loadReadingStats(): ReadingStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.records) && typeof parsed.dailyGoal === 'number') {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load reading stats from localStorage:', e);
  }

  // Initial fallback with realistic monthly baseline
  const initial: ReadingStats = {
    dailyGoal: 10,
    records: generateInitialRecords(),
  };
  saveReadingStats(initial);
  return initial;
}

export function saveReadingStats(stats: ReadingStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save reading stats to localStorage:', e);
  }
}

export function recordHadithRead(hadith: HadithItem): ReadingStats {
  const currentStats = loadReadingStats();
  const todayStr = getTodayDateString();
  const nowIso = new Date().toISOString();

  // Check if this exact hadith was already recorded in the last 10 minutes to avoid rapid duplicates
  const recentDuplicate = currentStats.records.find(
    (r) => r.hadithId === hadith.id && r.date === todayStr &&
      Math.abs(new Date(r.readAt).getTime() - new Date(nowIso).getTime()) < 5 * 60 * 1000
  );

  if (!recentDuplicate) {
    const newRecord: ReadingRecord = {
      id: `read-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      hadithId: hadith.id,
      kitabId: hadith.kitabId,
      kitabName: hadith.kitabName,
      hadithNumber: hadith.number,
      readAt: nowIso,
      date: todayStr,
    };

    currentStats.records.push(newRecord);
    saveReadingStats(currentStats);
  }

  return currentStats;
}

export function updateDailyGoal(newGoal: number): ReadingStats {
  const current = loadReadingStats();
  current.dailyGoal = Math.max(1, newGoal);
  saveReadingStats(current);
  return current;
}

export function calculateDailyProgress(stats: ReadingStats, dateStr: string = getTodayDateString()) {
  const todayRecords = stats.records.filter((r) => r.date === dateStr);
  const count = todayRecords.length;
  const goal = stats.dailyGoal || 10;
  const percentage = Math.min(100, Math.round((count / goal) * 100));
  const remaining = Math.max(0, goal - count);
  const isAchieved = count >= goal;

  return {
    count,
    goal,
    percentage,
    remaining,
    isAchieved,
    todayRecords,
  };
}

export function calculateReadingStreak(records: ReadingRecord[]): { streak: number; lastActiveDate: string } {
  if (records.length === 0) return { streak: 0, lastActiveDate: '' };

  // Set of dates with at least 1 reading
  const activeDates = new Set(records.map((r) => r.date));
  const todayStr = getTodayDateString();

  let checkDate = new Date();
  let streak = 0;

  // If haven't read today yet, check if read yesterday to maintain streak
  const checkDateStr = getTodayDateString(checkDate);
  if (!activeDates.has(checkDateStr)) {
    // check yesterday
    checkDate.setDate(checkDate.getDate() - 1);
    const yestStr = getTodayDateString(checkDate);
    if (!activeDates.has(yestStr)) {
      return { streak: 0, lastActiveDate: '' };
    }
  }

  // Count backwards consecutive days
  while (true) {
    const curStr = getTodayDateString(checkDate);
    if (activeDates.has(curStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { streak, lastActiveDate: todayStr };
}

export function getMonthlyChartData(records: ReadingRecord[], targetMonthDate: Date = new Date()): DailyActivityItem[] {
  const year = targetMonthDate.getFullYear();
  const month = targetMonthDate.getMonth();
  
  // Total days in target month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNamesId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const monthShort = monthNamesId[month];

  // Map of dateStr -> records
  const recordsByDate: { [dateStr: string]: ReadingRecord[] } = {};
  for (const r of records) {
    if (!recordsByDate[r.date]) {
      recordsByDate[r.date] = [];
    }
    recordsByDate[r.date].push(r);
  }

  const result: DailyActivityItem[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(month + 1).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    const dayRecords = recordsByDate[dateStr] || [];
    const uniqueKitabs = Array.from(new Set(dayRecords.map((r) => r.kitabName)));

    result.push({
      dayNumber: day,
      dateStr,
      displayDay: `${day} ${monthShort}`,
      count: dayRecords.length,
      kitabs: uniqueKitabs,
    });
  }

  return result;
}

export function getKitabReadingBreakdown(records: ReadingRecord[]): KitabReadingBreakdown[] {
  const kitabColors: { [key: string]: string } = {
    'bukhari': '#b45309', // amber-700
    'muslim': '#059669', // emerald-600
    'abu-dawud': '#0284c7', // sky-600
    'tirmidzi': '#7c3aed', // violet-600
    'nasai': '#d97706', // amber-600
    'ibnu-majah': '#dc2626', // red-600
    'muwaththa': '#0d9488', // teal-600
    'musnad-ahmad': '#ea580c', // orange-600
    'darimi': '#475569', // slate-600
    'arba-in': '#16a34a', // green-600
    'riyadhus-shalihin': '#854d0e', // yellow-800
    'bulughul-maram': '#4338ca', // indigo-700
  };

  const counts: { [kitabId: string]: { name: string; count: number } } = {};

  for (const r of records) {
    if (!counts[r.kitabId]) {
      counts[r.kitabId] = {
        name: r.kitabName,
        count: 0,
      };
    }
    counts[r.kitabId].count++;
  }

  return Object.keys(counts)
    .map((kId) => ({
      kitabId: kId,
      kitabName: counts[kId].name,
      count: counts[kId].count,
      color: kitabColors[kId] || '#b45309',
    }))
    .sort((a, b) => b.count - a.count);
}
