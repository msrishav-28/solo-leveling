import React from 'react';

export function Nav() {
  const items = [
    ['01', 'System', '#system'],
    ['02', 'Classes', '#classes'],
    ['03', 'Loop', '#loop'],
    ['04', 'Proof', '#proof'],
    ['05', 'Summon', '#summon'],
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-[60]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <span className="relative inline-block h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-mana shadow-[0_0_12px_#00d9ff]" />
            <span className="absolute inset-0 rounded-full bg-mana animate-ping opacity-50" />
          </span>
          <span className="font-display text-glow-soft text-sm tracking-tight">
            Solo<span className="text-mana">/</span>Leveling
          </span>
        </a>
        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60 md:flex">
          {items.map(([n, label, href]) => (
            <a key={n} href={href} className="group flex items-center gap-1.5 transition-colors hover:text-mana">
              <span className="text-mana/50">{n}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55 sm:inline-flex">
            <span className="h-1.5 w-1.5 bg-mana animate-pulse-mana" />
            Hunter Online
          </span>
          <a
            href="#summon"
            className="hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mana transition-colors hover:bg-mana hover:text-void"
          >
            Awaken
          </a>
        </div>
      </div>
    </header>
  );
}
