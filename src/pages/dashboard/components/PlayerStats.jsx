import React from 'react';
import Icon from '../../../components/AppIcon';

const PlayerStats = ({ player }) => {
  const getRankColor = (rank) => {
    const colors = {
      'F': '#666666',
      'E': '#00ff00',
      'D': '#00d9ff',
      'C': '#b700ff',
      'B': '#ffd700',
      'A': '#ff0000',
      'S': 'linear-gradient(45deg, #00d9ff, #b700ff, #ffd700)'
    };
    return colors?.[rank] || '#666666';
  };

  const getXPPercentage = () => {
    return ((player?.currentXP - player?.levelXP) / (player?.nextLevelXP - player?.levelXP)) * 100;
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {/* Rank Badge */}
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-heading font-bold shadow-[0_0_15px_rgba(0,217,255,0.3)] bg-gradient-to-br from-cyan-950 to-black text-cyan-400 border border-cyan-500/30"
            >
              {player?.rank}
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Crown" size={12} className="text-black" />
            </div>
          </div>

          {/* Player Info */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-heading font-bold text-white tracking-tight">
              {player?.name}
            </h2>
            <p className="text-cyan-500/60 font-mono text-xs uppercase tracking-widest">
              Level {player?.level} Hunter
            </p>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center space-x-2 bg-cyan-500/10 px-4 py-2 rounded border border-cyan-500/30">
          <Icon name="Flame" size={20} className="text-cyan-400" />
          <span className="text-lg font-bold text-white">
            {player?.streak}
          </span>
          <span className="text-cyan-500/60 text-xs font-bold uppercase">day streak</span>
        </div>
      </div>
      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-cyan-500/60 uppercase">Experience Points</span>
          <span className="text-xs font-mono text-white">
            {player?.currentXP?.toLocaleString()} / {player?.nextLevelXP?.toLocaleString()} XP
          </span>
        </div>
        <div className="w-full bg-cyan-950/30 rounded-full h-2 overflow-hidden border border-cyan-900/30">
          <div
            className="h-full bg-cyan-500 shadow-[0_0_10px_cyan]"
            style={{ width: `${getXPPercentage()}%` }}
          ></div>
        </div>
      </div>
      {/* Attribute Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {player?.attributes?.map((attr) => (
          <div key={attr?.name} className="flex items-center space-x-3 p-3 bg-cyan-950/10 rounded border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
            <div className="w-8 h-8 bg-cyan-500/20 rounded flex items-center justify-center">
              <Icon name={attr?.icon} size={16} className="text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-cyan-500/60 uppercase tracking-widest font-mono">
                {attr?.name}
              </span>
              <span className="text-lg font-bold font-mono text-white">
                {attr?.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerStats;