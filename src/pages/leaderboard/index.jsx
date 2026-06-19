import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import TextReveal from '../../components/cinematic/TextReveal';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = { id: 'user-000', name: 'Sung Jin-Woo', level: 99, rank: 'S' };

  const mockHunters = [
    { id: '1', name: 'Thomas Andre', level: 140, rank: 'S', xp: 15400000, streak: 890, avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200' },
    { id: '2', name: 'Liu Zhigang', level: 138, rank: 'S', xp: 14200000, streak: 702, avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200' },
    { id: '3', name: 'Christopher Reed', level: 135, rank: 'S', xp: 13800000, streak: 654, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
    { id: '4', name: 'Lennart Niermann', level: 132, rank: 'S', xp: 12500000, streak: 543, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
    { id: '5', name: 'Baek Yoon-Ho', level: 110, rank: 'S', xp: 8500000, streak: 342, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200' },
    { id: '6', name: 'Cha Hae-In', level: 95, rank: 'S', xp: 4500000, streak: 210, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { id: '7', name: 'Go Gun-Hee', level: 120, rank: 'S', xp: 11500000, streak: 410, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  ];

  useEffect(() => {
    const id = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(id);
  }, []);

  const filteredHunters = useMemo(() => (
    mockHunters.filter((hunter) => (
      (selectedRank === 'all' || hunter.rank === selectedRank) &&
      hunter.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  ), [searchTerm, selectedRank]);

  const formatXP = (xp) => (xp >= 1000000 ? `${(xp / 1000000).toFixed(1)}M` : `${(xp / 1000).toFixed(1)}K`);

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-foreground">
      <SystemBackground />
      <Header user={currentUser} onNavigate={navigate} />

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
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mana/70">Total Hunters</div>
              <div className="mt-1 font-mono text-3xl font-bold tabular-nums text-foreground">14,204</div>
            </SystemBox>
            <SystemBox className="px-5 py-4" variant="gold" animated={false}>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-loot/70">S-Rank</div>
              <div className="mt-1 font-mono text-3xl font-bold tabular-nums text-foreground">23</div>
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
            {['all', 'S', 'A', 'B'].map((rank) => (
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
          ) : (
            filteredHunters.map((hunter, index) => {
              const isTop3 = index < 3;
              const variant = isTop3 ? 'gold' : 'primary';

              return (
                <SystemBox key={hunter.id} variant={variant} className="overflow-hidden" animated>
                  <div className="grid gap-5 p-4 sm:grid-cols-[auto_auto_1fr_auto] sm:items-center sm:p-6">
                    <div className={`font-display text-5xl tabular-nums ${isTop3 ? 'text-loot text-glow-soft' : 'text-mana/45'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="relative h-16 w-16">
                      <div className={`absolute inset-0 blur-lg ${isTop3 ? 'bg-loot/25' : 'bg-mana/20'}`} />
                      <img
                        src={hunter.avatar}
                        alt={hunter.name}
                        className={`relative h-16 w-16 border object-cover ${
                          isTop3 ? 'border-loot shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'border-mana/30 grayscale transition-all group-hover:grayscale-0'
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="truncate text-lg font-bold text-foreground">{hunter.name}</h3>
                        <span className={`border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] ${isTop3 ? 'border-loot/40 bg-loot/10 text-loot' : 'border-mana/40 bg-mana/10 text-mana'}`}>
                          {hunter.rank}-Rank
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
