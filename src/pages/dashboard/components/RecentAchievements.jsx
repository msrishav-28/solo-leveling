import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentAchievements = ({ achievements }) => {
  const getAchievementIcon = (type) => {
    const icons = {
      'streak': 'Flame',
      'level': 'TrendingUp',
      'quest': 'Target',
      'attribute': 'Zap',
      'rank': 'Crown',
      'milestone': 'Award'
    };
    return icons?.[type] || 'Award';
  };

  const getAchievementColor = (rarity) => {
    const colors = {
      'common': '#e0e0e0',
      'rare': '#00d9ff',
      'epic': '#b700ff',
      'legendary': '#ffd700'
    };
    return colors?.[rarity] || '#e0e0e0';
  };

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-heading font-bold text-white uppercase tracking-widest pl-2 border-l-2 border-primary">
          Recent Achievements
        </h3>
        <span className="text-xs font-mono text-cyan-500/60">
          {achievements?.length} UNLOCKED
        </span>
      </div>
      {achievements?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-cyan-950/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Award" size={20} className="text-cyan-500/40" />
          </div>
          <p className="text-cyan-500/40 text-xs font-mono">
            NO DATA RECORDED
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className="flex items-center space-x-3 p-3 bg-cyan-950/10 rounded border border-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 group"
            >
              {/* Achievement Icon */}
              <div
                className="w-10 h-10 rounded flex items-center justify-center border border-cyan-500/30 bg-cyan-500/10"
              >
                <Icon
                  name="Award"
                  size={18}
                  className="text-cyan-400 group-hover:text-white transition-colors"
                />
              </div>

              {/* Achievement Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {achievement?.title}
                  </h4>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-cyan-500/20 text-cyan-500/60"
                  >
                    {achievement?.rarity}
                  </span>
                </div>
                <p className="text-[10px] text-cyan-500/60 font-mono line-clamp-1">
                  {achievement?.description}
                </p>
              </div>

              {/* Achievement Reward */}
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  +{achievement?.xpReward} XP
                </span>
                <span className="text-[10px] text-cyan-500/40 font-mono">
                  {achievement?.timeEarned}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {achievements?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-cyan-500/20">
          <button className="w-full text-xs font-mono text-cyan-500 hover:text-white transition-colors uppercase tracking-widest text-center">
            View All Database Records
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentAchievements;