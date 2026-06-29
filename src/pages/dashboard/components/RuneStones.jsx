import React from 'react';
import Icon from '../../../components/AppIcon';

/** Rune Stones — permanent badges from cleared dungeons. */
const RuneStones = ({ runes }) => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-display text-xl text-foreground">Relics</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-loot/70">
          {runes.length} Rune{runes.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {runes.map((rune) => (
          <div
            key={rune.id}
            className="flex items-center gap-3 border border-loot/30 bg-loot/[0.06] p-3"
            title={rune.name}
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center border border-loot/40 bg-loot/10 text-loot">
              <Icon name={rune.icon || 'Gem'} size={18} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-foreground">{rune.name}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-loot/70">{rune.rarity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RuneStones;
