import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import TextReveal from '../../components/cinematic/TextReveal';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { usePlayerStats } from '../../hooks/usePlayerStats';
import { useAuth } from '../../hooks/useAuth';

const formatXP = (xp) => {
  const value = Number(xp) || 0;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { stats } = usePlayerStats();
  const { hunters, loading: isLoading, error } = useLeaderboard(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState('all');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredHunters = useMemo(
    () =>
      hunters.filter(
        (hunter) =>
          (selectedRank === 'all' || hunter.tier === selectedRank) &&
          hunter.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [hunters, searchTerm, selectedRank]
  );

  const sRankCount = hunters.filter((h) => h.tier === 'S').length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-foreground">
      <SystemBackground />
      <Header user={stats} onNavigate={navigate} onSignOut={handleSignOut} />

      <main className="relative z-10 mx-auto max-w-[1200px] space-y-8 px-4 py-8 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-hairline pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="system-label">Global Database</div>
            <h1 className="font-display text-glow mt-3 text-[clamp(2.8rem,7vw,6rem)] leading-[0.88]">
              <TextReveal text="GLOBAL RANKINGS" />
            </h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-mana/60">// Database_Access: Granted</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SystemBox className="px-5 py-4" variant="primary" animated={false}>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mana/70">Ranked Hunters</div>
              <div className="mt-1 font-mono text-3xl font-bold tabular-nums text-foreground">{hunters.length}</div>
            </SystemBox>
            <SystemBox className="px-5 py-4" variant="gold" animated={false}>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-loot/70">S-Rank</div>
              <div className="mt-1 font-mono text-3xl font-bold tabular-nums text-foreground">{sRankCount}</div>
            </SystemBox>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SystemBox className="flex w-full items-center p-0 lg:max-w-md" animated={false}>
            <Icon name="Search" className="ml-4 h-5 w-5 text-mana" />
            <input
              type="text"
              placeholder="SEARCH HUNTER ID..."
              className="w-full bg-transparent px-4 py-3 font-mono text-sm uppercase tracking-[0.16em] text-foreground outline-none placeholder:text-foreground/25"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SystemBox>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {['all', 'S', 'A', 'B', 'C'].map((rank) => (
              <Magnetic key={rank}>
                <button
                  type="button"
                  onClick={() => setSelectedRank(rank)}
                  className={`shrink-0 border px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-all ${
                    selectedRank === rank
                      ? 'border-mana bg-mana/15 text-mana shadow-[0_0_15px_rgba(0,217,255,0.25)]'
                      : 'border-hairline bg-void/50 text-foreground/45 hover:border-mana/50 hover:text-mana'
                  }`}
                >
                  {rank === 'all' ? 'All Ranks' : `${rank}-Rank`}
                </button>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <SystemBox key={i} animated={false} className="h-24 animate-pulse bg-mana/5" />
            ))
          ) : error ? (
            <SystemBox animated={false} className="p-10 text-center" scanline>
              <Icon name="AlertTriangle" className="mx-auto h-6 w-6 text-threat" />
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-threat">Failed to load rankings</p>
            </SystemBox>
          ) : filteredHunters.length === 0 ? (
            <SystemBox animated={false} className="p-10 text-center" scanline>
              <Icon name="SearchX" className="mx-auto h-6 w-6 text-mana" />
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">No hunters found</p>
            </SystemBox>
          ) : (
            filteredHunters.map((hunter) => {
              const isTop3 = hunter.rank <= 3;
              const variant = isTop3 ? 'gold' : hunter.isCurrentUser ? 'primary' : 'primary';
              const initial = hunter.name.charAt(0).toUpperCase();

              return (
                <SystemBox
                  key={hunter.id}
                  variant={variant}
                  className={`overflow-hidden ${hunter.isCurrentUser ? 'ring-1 ring-mana' : ''}`}
                  animated
                >
                  <div className="grid gap-5 p-4 sm:grid-cols-[auto_auto_1fr_auto] sm:items-center sm:p-6">
                    <div className={`font-display text-5xl tabular-nums ${isTop3 ? 'text-loot text-glow-soft' : 'text-mana/45'}`}>
                      {String(hunter.rank).padStart(2, '0')}
                    </div>

                    <div className="relative h-16 w-16">
                      <div className={`absolute inset-0 blur-lg ${isTop3 ? 'bg-loot/25' : 'bg-mana/20'}`} />
                      <div
                        className={`relative grid h-16 w-16 place-items-center border font-display text-2xl ${
                          isTop3
                            ? 'border-loot text-loot shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                            : 'border-mana/30 text-mana'
                        }`}
                      >
                        {initial}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="truncate text-lg font-bold text-foreground">{hunter.name}</h3>
                        {hunter.isCurrentUser && (
                          <span className="border border-mana/40 bg-mana/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mana">
                            You
                          </span>
                        )}
                        <span className={`border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] ${isTop3 ? 'border-loot/40 bg-loot/10 text-loot' : 'border-mana/40 bg-mana/10 text-mana'}`}>
                          {hunter.tier}-Rank
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                        <span className="flex items-center gap-1"><Icon name="Zap" className="h-3 w-3" /> LVL.{hunter.level}</span>
                        <span className="flex items-center gap-1"><Icon name="Flame" className="h-3 w-3" /> Streak: {hunter.streak}</span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">Total EXP</div>
                      <div className={`font-mono text-2xl font-bold tabular-nums ${isTop3 ? 'text-loot' : 'text-mana'}`}>
                        {formatXP(hunter.xp)}
                      </div>
                    </div>
                  </div>
                </SystemBox>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
