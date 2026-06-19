import React, { useMemo, useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const navItems = useMemo(() => ([
    { label: 'Dashboard', path: '/dashboard', tone: 'mana' },
    { label: 'Dungeons', path: '/dungeon/1', tone: 'threat' },
    { label: 'Shadows', action: 'shadow', tone: 'shadow' },
    { label: 'Ranks', path: '/leaderboard', tone: 'loot' },
  ]), []);

  const go = (item) => {
    if (item.path) onNavigate(item.path);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-void/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="group flex min-w-0 items-center gap-3 text-left"
        >
          <span className="relative inline-block h-2.5 w-2.5 shrink-0">
            <span className="absolute inset-0 rounded-full bg-mana shadow-[0_0_12px_#00d9ff]" />
            <span className="absolute inset-0 rounded-full bg-mana animate-ping opacity-50" />
          </span>
          <span className="truncate font-display text-sm text-glow-soft sm:text-base">
            Solo<span className="text-mana">/</span>Leveling
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item, index) => (
            <button
              type="button"
              key={item.label}
              onClick={() => go(item)}
              className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/55 transition-colors hover:text-mana"
            >
              <span className="text-mana/50">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 border-l border-hairline pl-4 sm:flex">
            <div className="text-right">
              <div className="max-w-[130px] truncate text-xs font-bold text-foreground">{user?.name || 'Hunter'}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mana">LVL {user?.level || 1}</div>
            </div>
            <div className="grid h-9 w-9 place-items-center border border-hairline bg-mana/10 text-mana">
              <Icon name="User" className="h-4 w-4" />
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            iconName={open ? 'X' : 'Menu'}
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
          />
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-void/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <nav className="mx-auto grid max-w-[1400px] gap-2">
            {navItems.map((item, index) => (
              <button
                type="button"
                key={item.label}
                onClick={() => go(item)}
                className="flex items-center justify-between border border-hairline bg-white/[0.03] px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground/75"
              >
                <span>{item.label}</span>
                <span className="text-mana/60">{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
