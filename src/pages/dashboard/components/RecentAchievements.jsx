import React from 'react';
import Icon from '../../../components/AppIcon';

const RARITY = {
  common:    { text: 'text-foreground/60', border: 'border-hairline',        bg: 'bg-white/[0.03]' },
  rare:      { text: 'text-mana',          border: 'border-mana/35',         bg: 'bg-mana/10' },
  epic:      { text: 'text-purple-300',    border: 'border-purple-400/35',   bg: 'bg-purple-500/10' },
  legendary: { text: 'text-loot',          border: 'border-loot/40',         bg: 'bg-loot/10' },
};

const RecentAchievements = ({ achievements }) => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-display text-xl text-foreground">Recent Achievements</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mana/55">
          {achievements?.length} Unlocked
        </span>
      </div>

      {!achievements?.length ? (
        <div className="border border-dashed border-hairline py-8 text-center">
          <div className="mx-auto grid h-11 w-11 place-items-center border border-hairline bg-mana/10 text-mana/45">
            <Icon name="Award" size={18} />
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">No data recorded</p>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((achievement) => {
            const r = RARITY[achievement?.rarity] || RARITY.common;
            return (
            <div
              key={achievement?.id}
              className={`group grid grid-cols-[auto_1fr_auto] items-center gap-3 border ${r.border} bg-white/[0.03] p-3 transition-colors`}
            >
              <div className={`grid h-10 w-10 place-items-center border ${r.border} ${r.bg} ${r.text}`}>
                <Icon name={achievement?.icon || 'Award'} size={17} />
              </div>
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <h4 className="truncate text-sm font-bold text-foreground">{achievement?.title}</h4>
                  <span className={`shrink-0 border ${r.border} px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${r.text}`}>
                    {achievement?.rarity}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 font-mono text-[10px] text-foreground/45">{achievement?.description}</p>
              </div>
              <div className="text-right font-mono">
                <div className={`text-xs font-bold ${r.text}`}>+{achievement?.xpReward} XP</div>
                <div className="mt-1 text-[10px] text-foreground/35">{achievement?.timeEarned}</div>
              </div>
            </div>
            );
          })}
        </div>
      )}

      {achievements?.length > 0 && (
        <div className="mt-5 border-t border-hairline pt-4">
          <button type="button" className="w-full font-mono text-[10px] uppercase tracking-[0.22em] text-mana/70 transition-colors hover:text-mana">
            View All Database Records
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentAchievements;
