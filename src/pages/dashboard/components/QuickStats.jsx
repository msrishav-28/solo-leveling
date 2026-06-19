import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const statItems = [
    { id: 'totalQuests', label: 'Total Quests', value: stats?.totalQuests, icon: 'Target', change: stats?.questsChange },
    { id: 'completedToday', label: 'Completed Today', value: stats?.completedToday, icon: 'CheckCircle', change: stats?.todayChange },
    { id: 'weeklyStreak', label: 'Weekly Streak', value: stats?.weeklyStreak, icon: 'Flame', change: stats?.streakChange, tone: 'loot' },
    { id: 'totalXP', label: 'Total XP Earned', value: stats?.totalXP?.toLocaleString(), icon: 'Star', change: stats?.xpChange },
  ];

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-display text-xl text-foreground">Quick Statistics</h3>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mana/55">
          <Icon name="BarChart3" size={14} />
          Last 7 Days
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-hairline">
        {statItems.map((item) => (
          <div key={item.id} className="bg-void/80 p-4">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className={`grid h-9 w-9 place-items-center border ${item.tone === 'loot' ? 'border-loot/35 bg-loot/10 text-loot' : 'border-mana/25 bg-mana/10 text-mana'}`}>
                <Icon name={item.icon} size={17} />
              </div>
              {item.change !== undefined && (
                <div className="flex items-center gap-1 font-mono text-[10px] text-mana/70">
                  <Icon name={item.change > 0 ? 'TrendingUp' : 'Minus'} size={13} />
                  <span>{item.change > 0 ? '+' : ''}{item.change}</span>
                </div>
              )}
            </div>
            <div className="font-mono text-2xl font-bold tabular-nums text-foreground">{item.value}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-hairline pt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="system-label">Weekly Goal</span>
          <span className="font-mono text-xs text-foreground/75">{stats?.weeklyProgress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden bg-mana/10">
          <div
            className="h-full bg-gradient-to-r from-mana to-mana-glow shadow-[0_0_10px_#00d9ff]"
            style={{ width: `${stats?.weeklyProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
