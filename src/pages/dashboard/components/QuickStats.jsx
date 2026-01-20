import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      id: 'totalQuests',
      label: 'Total Quests',
      value: stats?.totalQuests,
      icon: 'Target',
      color: '#00d9ff',
      change: stats?.questsChange,
      changeType: 'increase'
    },
    {
      id: 'completedToday',
      label: 'Completed Today',
      value: stats?.completedToday,
      icon: 'CheckCircle',
      color: '#00ff00',
      change: stats?.todayChange,
      changeType: 'neutral'
    },
    {
      id: 'weeklyStreak',
      label: 'Weekly Streak',
      value: stats?.weeklyStreak,
      icon: 'Flame',
      color: '#ffd700',
      change: stats?.streakChange,
      changeType: 'increase'
    },
    {
      id: 'totalXP',
      label: 'Total XP Earned',
      value: stats?.totalXP?.toLocaleString(),
      icon: 'Star',
      color: '#b700ff',
      change: stats?.xpChange,
      changeType: 'increase'
    }
  ];

  const getChangeIcon = (changeType) => {
    const icons = {
      'increase': 'TrendingUp',
      'decrease': 'TrendingDown',
      'neutral': 'Minus'
    };
    return icons?.[changeType] || 'Minus';
  };

  const getChangeColor = (changeType) => {
    const colors = {
      'increase': '#00ff00',
      'decrease': '#ff0033',
      'neutral': '#e0e0e0'
    };
    return colors?.[changeType] || '#e0e0e0';
  };

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-heading font-bold text-white uppercase tracking-widest pl-2 border-l-2 border-cyan-500">
          Quick Statistics
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={14} className="text-cyan-500" />
          <span className="text-xs font-mono text-cyan-500/60">
            LAST 7 DAYS
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statItems?.map((item) => (
          <div
            key={item?.id}
            className="p-4 bg-cyan-950/10 rounded border border-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30"
              >
                <Icon
                  name={item?.icon}
                  size={18}
                  className={item.changeType === 'increase' ? 'text-cyan-400' : 'text-white'}
                />
              </div>

              {item?.change !== undefined && (
                <div className="flex items-center space-x-1">
                  <Icon
                    name={getChangeIcon(item?.changeType)}
                    size={14}
                    className={item.change > 0 ? "text-cyan-400" : "text-white/40"}
                  />
                  <span
                    className={`text-xs font-bold font-mono ${item.change > 0 ? "text-cyan-400" : "text-white/40"}`}
                  >
                    {item?.change > 0 ? '+' : ''}{item?.change}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold font-mono text-white">
                {item?.value}
              </div>
              <div className="text-xs font-mono text-cyan-500/60 uppercase">
                {item?.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Weekly Progress Bar */}
      <div className="mt-6 pt-6 border-t border-cyan-500/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-cyan-500/60 uppercase">
            Weekly Goal Progress
          </span>
          <span className="text-xs font-mono text-white">
            {stats?.weeklyProgress}%
          </span>
        </div>
        <div className="w-full bg-cyan-950/30 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-cyan-500 shadow-[0_0_10px_cyan]"
            style={{ width: `${stats?.weeklyProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;