import React from 'react';
import Icon from '../../../components/AppIcon';

const PlayerStats = ({ player }) => {
  const getXPPercentage = () => {
    const range = (player?.nextLevelXP || 0) - (player?.levelXP || 0);
    if (range <= 0) return 0;
    return Math.min(100, Math.max(0, ((player?.currentXP - player?.levelXP) / range) * 100));
  };

  return (
    <div className="p-5 sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative grid h-20 w-20 place-items-center border border-mana/35 bg-mana/10 shadow-[0_0_22px_rgba(0,217,255,0.18)]">
            <span className="font-display text-4xl text-mana text-glow-soft">{player?.rank}</span>
            <div className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center border border-mana bg-mana text-void">
              <Icon name="Crown" size={13} />
            </div>
          </div>

          <div className="min-w-0">
            <div className="system-label">Player Signature</div>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">{player?.name}</h2>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mana/60">
              Level {player?.level} Hunter{player?.class ? ` · ${player.class}` : ''}
            </p>
            {player?.title && (
              <span className="mt-2 inline-flex items-center gap-1.5 border border-loot/30 bg-loot/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-loot">
                <Icon name="BadgeCheck" size={11} /> {player.title}
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full gap-3 sm:w-auto">
          <div className="flex flex-1 items-center justify-center gap-3 border border-hairline bg-white/[0.03] px-4 py-3 sm:flex-none">
            <Icon name="Flame" size={20} className="text-loot" />
            <span className="font-mono text-2xl font-bold tabular-nums text-foreground">{player?.streak}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">streak</span>
          </div>
          <div className="flex flex-1 items-center justify-center gap-3 border border-loot/25 bg-loot/[0.05] px-4 py-3 sm:flex-none">
            <Icon name="Coins" size={20} className="text-loot" />
            <span className="font-mono text-2xl font-bold tabular-nums text-foreground">{(player?.gold ?? 0).toLocaleString()}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">gold</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="system-label">Experience Points</span>
          <span className="font-mono text-xs text-foreground/75">
            {player?.currentXP?.toLocaleString()} / {player?.nextLevelXP?.toLocaleString()} XP
          </span>
        </div>
        <div className="relative h-2 w-full overflow-hidden border border-hairline bg-mana/10">
          <div
            className="h-full bg-gradient-to-r from-mana to-mana-glow shadow-[0_0_14px_#00d9ff] transition-all duration-700"
            style={{ width: `${getXPPercentage()}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-px bg-hairline md:grid-cols-3 xl:grid-cols-6">
        {player?.attributes?.map((attr) => (
          <div key={attr?.name} className="group bg-void/80 p-4 transition-colors hover:bg-mana/[0.04]">
            <div className="mb-5 flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center border border-mana/25 bg-mana/10 text-mana">
                <Icon name={attr?.icon} size={16} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/35">{attr?.name}</span>
            </div>
            <div className="font-mono text-3xl font-bold tabular-nums text-foreground">{attr?.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerStats;
