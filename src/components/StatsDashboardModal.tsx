import React, { useState, useMemo } from 'react';
import {
  X,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Flame,
  CheckCircle2,
  Clock,
  ChevronRight,
  BarChart3,
  LineChart,
  Settings2,
  Sparkles,
  BookMarked
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { ReadingStats, DailyActivityItem } from '../types';
import {
  calculateDailyProgress,
  calculateReadingStreak,
  getMonthlyChartData,
  getKitabReadingBreakdown,
  getTodayDateString,
  updateDailyGoal
} from '../utils/readingStats';

interface StatsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: ReadingStats;
  onUpdateStats: (newStats: ReadingStats) => void;
  onSelectHadith?: (kitabId: string, hadithId: string) => void;
}

export const StatsDashboardModal: React.FC<StatsDashboardModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats,
  onSelectHadith,
}) => {
  const [chartType, setChartType] = useState<'bar' | 'area'>('bar');
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);

  const todayStr = useMemo(() => getTodayDateString(), []);
  const todayProgress = useMemo(() => calculateDailyProgress(stats, todayStr), [stats, todayStr]);
  const streakInfo = useMemo(() => calculateReadingStreak(stats.records), [stats.records]);
  const monthlyData = useMemo(() => getMonthlyChartData(stats.records), [stats.records]);
  const kitabDistribution = useMemo(() => getKitabReadingBreakdown(stats.records), [stats.records]);

  // Total unique hadiths read
  const totalUniqueHadiths = useMemo(() => {
    return new Set(stats.records.map((r) => r.hadithId)).size;
  }, [stats.records]);

  // Total reads in current month
  const currentMonthPrefix = todayStr.substring(0, 7); // YYYY-MM
  const monthRecords = useMemo(() => {
    return stats.records.filter((r) => r.date.startsWith(currentMonthPrefix));
  }, [stats.records, currentMonthPrefix]);

  const activeDaysThisMonth = useMemo(() => {
    return new Set(monthRecords.map((r) => r.date)).size;
  }, [monthRecords]);

  // Best / peak day in current month
  const peakDay = useMemo(() => {
    let max = 0;
    let day = '';
    for (const item of monthlyData) {
      if (item.count > max) {
        max = item.count;
        day = item.displayDay;
      }
    }
    return { count: max, day };
  }, [monthlyData]);

  // Average per active day
  const avgPerActiveDay = useMemo(() => {
    if (activeDaysThisMonth === 0) return 0;
    return (monthRecords.length / activeDaysThisMonth).toFixed(1);
  }, [monthRecords.length, activeDaysThisMonth]);

  // Recent 5 reads
  const recentReads = useMemo(() => {
    return [...stats.records].reverse().slice(0, 5);
  }, [stats.records]);

  const currentMonthName = useMemo(() => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const now = new Date();
    return `${months[now.getMonth()]} ${now.getFullYear()}`;
  }, []);

  const handleSetGoal = (goalVal: number) => {
    const updated = updateDailyGoal(goalVal);
    onUpdateStats(updated);
    setIsEditingGoal(false);
  };

  if (!isOpen) return null;

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: DailyActivityItem }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isToday = data.dateStr === todayStr;
      return (
        <div
          className="p-2.5 rounded-lg shadow-xl border text-xs min-w-44 z-50 backdrop-blur-md"
          style={{
            backgroundColor: 'var(--syamila-card)',
            borderColor: 'var(--syamila-border)',
            color: 'var(--syamila-text)',
          }}
        >
          <div className="flex items-center justify-between border-b pb-1.5 mb-1.5" style={{ borderColor: 'var(--syamila-border)' }}>
            <span className="font-semibold">{data.displayDay}</span>
            {isToday && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-amber-600 text-white">
                Hari Ini
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-sm font-bold text-amber-600 dark:text-amber-400 mb-1">
            <span>Dibaca:</span>
            <span>{data.count} Hadits</span>
          </div>
          {data.kitabs.length > 0 && (
            <div className="text-[11px] opacity-75 mt-1 border-t pt-1" style={{ borderColor: 'var(--syamila-border)' }}>
              <span className="block font-medium mb-0.5">Kitab:</span>
              <span className="line-clamp-2">{data.kitabs.slice(0, 2).join(', ')}{data.kitabs.length > 2 ? ` +${data.kitabs.length - 2}` : ''}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="stats-dashboard-modal"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl border overflow-hidden"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)',
        }}
      >
        {/* Modal Header */}
        <div
          className="px-5 py-4 border-b flex items-center justify-between flex-shrink-0"
          style={{
            borderColor: 'var(--syamila-border)',
            backgroundColor: 'var(--syamila-card)'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">Dashboard Statistik Membaca</h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/40">
                  إحصائيات القراءة
                </span>
              </div>
              <p className="text-xs opacity-70">
                Progres harian, mutaba'ah istiqomah, dan grafik telaah hadits
              </p>
            </div>
          </div>

          <button
            id="btn-close-stats-modal"
            onClick={onClose}
            className="p-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* Card 1: Progres Hari Ini */}
            <div
              id="card-daily-progress"
              className="p-4 rounded-xl border relative overflow-hidden flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--syamila-card)',
                borderColor: 'var(--syamila-border)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold opacity-75 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  Target Hari Ini
                </span>
                <button
                  id="btn-toggle-edit-goal"
                  onClick={() => setIsEditingGoal(!isEditingGoal)}
                  className="text-[11px] font-medium text-amber-600 hover:text-amber-700 underline flex items-center gap-0.5"
                  title="Ubah Target Harian"
                >
                  <Settings2 className="w-3 h-3" />
                  Ubah
                </button>
              </div>

              {/* Goal Selector (inline toggle) */}
              {isEditingGoal && (
                <div className="mb-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
                  <span className="block text-[11px] font-semibold mb-1">Pilih Target Harian:</span>
                  <div className="flex gap-1.5">
                    {[5, 10, 15, 20].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleSetGoal(val)}
                        className={`flex-1 py-1 rounded text-xs font-semibold transition-all ${
                          stats.dailyGoal === val
                            ? 'bg-amber-600 text-white shadow-2xs'
                            : 'bg-black/5 dark:bg-white/5 hover:bg-black/10'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                    {todayProgress.count}
                  </span>
                  <span className="text-sm opacity-60 font-medium">/ {todayProgress.goal} Hadits</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  todayProgress.isAchieved 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                }`}>
                  {todayProgress.percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden mb-2.5">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    todayProgress.isAchieved
                      ? 'bg-emerald-500'
                      : 'bg-gradient-to-r from-amber-600 to-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, todayProgress.percentage)}%` }}
                />
              </div>

              <div className="text-[11px] opacity-70 flex items-center justify-between">
                {todayProgress.isAchieved ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Target harian tercapai!
                  </span>
                ) : (
                  <span>Kurang {todayProgress.remaining} hadits lagi</span>
                )}
                {streakInfo.streak > 0 && (
                  <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-semibold">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" /> {streakInfo.streak} hari streak
                  </span>
                )}
              </div>
            </div>

            {/* Card 2: Total Hadits Dibaca */}
            <div
              id="card-total-read"
              className="p-4 rounded-xl border flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--syamila-card)',
                borderColor: 'var(--syamila-border)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold opacity-75 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  Total Hadits Dibaca
                </span>
                <span className="text-[10px] opacity-60 font-mono">Koleksi Akumulatif</span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  {stats.records.length}
                </span>
                <span className="text-xs opacity-60 font-medium">Sesi Bacaan</span>
              </div>

              <div className="pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--syamila-border)' }}>
                <span className="opacity-70">Hadits Unik:</span>
                <span className="font-semibold text-blue-700 dark:text-blue-300">{totalUniqueHadiths} Hadits</span>
              </div>

              <div className="pt-1.5 flex items-center justify-between text-xs">
                <span className="opacity-70">Bulan Ini:</span>
                <span className="font-semibold">{monthRecords.length} kali dibaca</span>
              </div>
            </div>

            {/* Card 3: Konsistensi & Puncak */}
            <div
              id="card-consistency-stats"
              className="p-4 rounded-xl border flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--syamila-card)',
                borderColor: 'var(--syamila-border)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold opacity-75 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Aktivitas & Performa
                </span>
                <span className="text-[10px] opacity-60">Bulan {currentMonthName.split(' ')[0]}</span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {activeDaysThisMonth}
                </span>
                <span className="text-xs opacity-60 font-medium">Hari Aktif</span>
              </div>

              <div className="pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--syamila-border)' }}>
                <span className="opacity-70">Rata-rata Harian:</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">{avgPerActiveDay} hadits/hari</span>
              </div>

              <div className="pt-1.5 flex items-center justify-between text-xs">
                <span className="opacity-70">Puncak Rekor:</span>
                <span className="font-semibold">{peakDay.count} hadits ({peakDay.day})</span>
              </div>
            </div>

          </div>

          {/* Section: Grafik Aktivitas Bulanan (Recharts) */}
          <div
            id="section-monthly-chart"
            className="p-4 sm:p-5 rounded-xl border"
            style={{
              backgroundColor: 'var(--syamila-card)',
              borderColor: 'var(--syamila-border)',
            }}
          >
            {/* Chart Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b" style={{ borderColor: 'var(--syamila-border)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-amber-600" />
                    Grafik Aktivitas Membaca Bulanan
                  </h3>
                  <span className="text-xs opacity-60">({currentMonthName})</span>
                </div>
                <p className="text-xs opacity-70 mt-0.5">
                  Intensitas jumlah hadits yang dibaca setiap hari sepanjang bulan
                </p>
              </div>

              {/* Chart type switch */}
              <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-lg self-start sm:self-auto text-xs">
                <button
                  id="btn-chart-bar"
                  onClick={() => setChartType('bar')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-medium transition-all ${
                    chartType === 'bar'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Batang</span>
                </button>
                <button
                  id="btn-chart-area"
                  onClick={() => setChartType('area')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-medium transition-all ${
                    chartType === 'area'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <LineChart className="w-3.5 h-3.5" />
                  <span>Tren Area</span>
                </button>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="w-full h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                    <XAxis
                      dataKey="dayNumber"
                      tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6 }}
                      axisLine={{ opacity: 0.2 }}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6 }}
                      axisLine={{ opacity: 0.2 }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(180, 83, 9, 0.08)' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {monthlyData.map((entry, index) => {
                        const isToday = entry.dateStr === todayStr;
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={isToday ? '#b45309' : '#d97706'}
                            opacity={entry.count > 0 ? (isToday ? 1 : 0.85) : 0.2}
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                ) : (
                  <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b45309" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#d97706" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                    <XAxis
                      dataKey="dayNumber"
                      tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6 }}
                      axisLine={{ opacity: 0.2 }}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6 }}
                      axisLine={{ opacity: 0.2 }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#b45309"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#areaGradient)"
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Chart Legend & Summary Info */}
            <div className="mt-3 pt-3 border-t flex flex-wrap items-center justify-between text-xs opacity-75 gap-2" style={{ borderColor: 'var(--syamila-border)' }}>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-700" /> Hari Ini
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 opacity-80" /> Hari Sebelumnya
                </span>
              </div>
              <span>Total bulan ini: <strong className="font-semibold">{monthRecords.length} hadits</strong></span>
            </div>
          </div>

          {/* Bottom Grid: Distribusi Kitab & Riwayat Hadits Terakhir */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: Distribusi Kitab yang Dibaca */}
            <div
              id="box-kitab-distribution"
              className="p-4 rounded-xl border flex flex-col"
              style={{
                backgroundColor: 'var(--syamila-card)',
                borderColor: 'var(--syamila-border)',
              }}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b" style={{ borderColor: 'var(--syamila-border)' }}>
                <h4 className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-amber-600" />
                  Distribusi Bacaan Berdasarkan Kitab
                </h4>
                <span className="text-[11px] opacity-60">{kitabDistribution.length} Kitab</span>
              </div>

              {kitabDistribution.length === 0 ? (
                <div className="py-6 text-center text-xs opacity-60">
                  Belum ada rekaman kitab yang dibaca.
                </div>
              ) : (
                <div className="space-y-3 flex-1">
                  {kitabDistribution.slice(0, 5).map((item) => {
                    const percentage = Math.round((item.count / stats.records.length) * 100);
                    return (
                      <div key={item.kitabId} className="text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium truncate max-w-[200px]">{item.kitabName}</span>
                          <span className="font-semibold opacity-90">{item.count} hadits ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Box 2: Hadits Terakhir Dibaca */}
            <div
              id="box-recent-reads"
              className="p-4 rounded-xl border flex flex-col"
              style={{
                backgroundColor: 'var(--syamila-card)',
                borderColor: 'var(--syamila-border)',
              }}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b" style={{ borderColor: 'var(--syamila-border)' }}>
                <h4 className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Hadits Baru Saja Dibaca
                </h4>
                <span className="text-[11px] opacity-60">5 Terakhir</span>
              </div>

              {recentReads.length === 0 ? (
                <div className="py-6 text-center text-xs opacity-60">
                  Belum ada riwayat hadits yang dibaca.
                </div>
              ) : (
                <div className="divide-y flex-1" style={{ borderColor: 'var(--syamila-border)' }}>
                  {recentReads.map((record) => {
                    return (
                      <div
                        key={record.id}
                        className="py-2 flex items-center justify-between gap-2 group"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold truncate">
                            {record.kitabName}
                          </p>
                          <p className="text-[11px] opacity-70">
                            Hadits No. {record.hadithNumber} • {record.date}
                          </p>
                        </div>
                        {onSelectHadith && (
                          <button
                            onClick={() => {
                              onSelectHadith(record.kitabId, record.hadithId);
                              onClose();
                            }}
                            className="p-1.5 rounded-lg opacity-60 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs flex items-center gap-1 text-amber-700 dark:text-amber-300"
                            title="Buka Hadits"
                          >
                            <span>Buka</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Mutiara Nasihat Penuntut Hadits */}
          <div
            className="p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 text-xs"
            style={{
              backgroundColor: 'var(--syamila-card)',
              borderColor: 'var(--syamila-border)',
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-300 mb-0.5">
                Mutiara Adab Penuntut Hadits:
              </p>
              <p className="italic opacity-85 leading-relaxed">
                "Barangsiapa mempelajari hadits setiap hari walau satu bab atau satu hadits dengan teliti sanad dan matannya, niscaya Allah Ta'ala teguhkan pemahamannya dalam agama dan lapangkan jalannya menuju surga."
              </p>
              <p className="text-[11px] opacity-60 mt-1">
                — Nasihat Para Aimmatul Hadits tentang Keutamaan Istiqomah Membaca Sunnah
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div
          className="px-5 py-3 border-t flex items-center justify-between text-xs opacity-75 flex-shrink-0"
          style={{
            borderColor: 'var(--syamila-border)',
            backgroundColor: 'var(--syamila-card)'
          }}
        >
          <span>Maktabah Darussalam Hadits • Statistik Membaca Digital</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-medium transition-colors shadow-2xs"
          >
            Tutup Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
