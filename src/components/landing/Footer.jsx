import React from 'react';

export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-8 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 bg-mana" />
          Solo/Leveling - The System - MMXXVI
        </div>
        <div className="flex items-center gap-3">
          {['E', 'D', 'C', 'B', 'A', 'S'].map((rank, i) => (
            <span key={rank} className={i === 5 ? 'text-loot' : i >= 3 ? 'text-mana' : 'text-foreground/35'}>
              {rank}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <a href="#system" className="transition-colors hover:text-mana">Codex</a>
          <a href="#classes" className="transition-colors hover:text-mana">Guild</a>
          <a href="/auth" className="transition-colors hover:text-mana">Enter</a>
        </div>
      </div>
    </footer>
  );
}
