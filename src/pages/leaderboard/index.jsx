import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import TextReveal from '../../components/cinematic/TextReveal';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';

const Leaderboard = () => {
  const navigate = useNavigate();

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock User Data
  const currentUser = { id: 'user-000', name: 'Sung Jin-Woo', level: 99, rank: 'S' };

  // Mock Leaderboard Data
  const mockHunters = [
    { id: '1', name: "Thomas Andre", level: 140, rank: "S", xp: 15400000, streak: 890, avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200" },
    { id: '2', name: "Liu Zhigang", level: 138, rank: "S", xp: 14200000, streak: 702, avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200" },
    { id: '3', name: "Christopher Reed", level: 135, rank: "S", xp: 13800000, streak: 654, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" },
    { id: '4', name: "Lennart Niermann", level: 132, rank: "S", xp: 12500000, streak: 543, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" },
    { id: '5', name: "Baek Yoon-Ho", level: 110, rank: "S", xp: 8500000, streak: 342, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200" },
    { id: '6', name: "Cha Hae-In", level: 95, rank: "S", xp: 4500000, streak: 210, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" },
    { id: '7', name: "Go Gun-Hee", level: 120, rank: "S", xp: 11500000, streak: 410, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredHunters = useMemo(() => {
    return mockHunters.filter(hunter =>
      (selectedRank === 'all' || hunter.rank === selectedRank) &&
      hunter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, selectedRank]);

  const formatXP = (xp) => {
    return xp >= 1000000 ? `${(xp / 1000000).toFixed(1)}M` : `${(xp / 1000).toFixed(1)}K`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative font-sans">
      <SystemBackground />
      <div className="bg-noise" />

      <Header user={currentUser} onNavigate={navigate} />

      <main className="container mx-auto px-4 py-8 relative z-10 max-w-6xl space-y-8">
        {/* Global Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 pb-6 border-b border-primary/20">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]">
              <TextReveal text="GLOBAL RANKINGS" />
            </h1>
            <p className="font-mono text-cyan-400/60 tracking-widest text-sm uppercase">
                            // DATABASE_ACCESS: GRANTED
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <SystemBox className="px-6 py-3" variant="primary">
              <div className="text-xs font-mono text-cyan-400">TOTAL HUNTERS</div>
              <div className="text-2xl font-bold text-white">14,204</div>
            </SystemBox>
            <SystemBox className="px-6 py-3" variant="gold">
              <div className="text-xs font-mono text-yellow-400">S-RANK</div>
              <div className="text-2xl font-bold text-white">23</div>
            </SystemBox>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <SystemBox className="p-0 flex items-center bg-black/50" animated={false}>
              <Icon name="Search" className="ml-4 text-cyan-500 w-5 h-5" />
              <input
                type="text"
                placeholder="SEARCH HUNTER ID..."
                className="w-full bg-transparent border-none focus:ring-0 text-white font-mono placeholder-cyan-900/50 py-3 px-4 uppercase tracking-wider"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SystemBox>
          </div>

          <div className="flex gap-2">
            {['all', 'S', 'A', 'B'].map((rank) => (
              <Magnetic key={rank}>
                <button
                  onClick={() => setSelectedRank(rank)}
                  className={`
                                        h-10 px-6 font-mono text-xs font-bold uppercase tracking-wider border relative overflow-hidden transition-all
                                        ${selectedRank === rank
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'bg-black/40 text-cyan-800 border-cyan-900/40 hover:border-cyan-500/50 hover:text-cyan-400'}
                                    `}
                >
                  {rank === 'all' ? 'ALL RANKS' : `${rank}-RANK`}
                </button>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="grid gap-4">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="h-24 w-full bg-cyan-900/10 animate-pulse rounded border border-cyan-900/30" />
            ))
          ) : (
            filteredHunters.map((hunter, index) => {
              const isTop3 = index < 3;
              const variant = isTop3 ? 'gold' : 'primary';

              return (
                <SystemBox key={hunter.id} variant={variant} className="p-0 group transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-center p-4 md:p-6 gap-6">
                    {/* Rank */}
                    <div className={`
                                            font-heading font-black text-4xl w-16 text-center
                                            ${isTop3 ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'text-cyan-800'}
                                        `}>
                      {index + 1}
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <div className={`absolute inset-0 bg-${isTop3 ? 'yellow' : 'cyan'}-500/20 blur-lg rounded-full`} />
                      <img
                        src={hunter.avatar}
                        alt={hunter.name}
                        className={`
                                                    relative w-16 h-16 rounded-full border-2 object-cover
                                                    ${isTop3 ? 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'border-cyan-500/30 grayscale group-hover:grayscale-0 transition-all'}
                                                `}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`font-bold tracking-tight text-lg truncate ${isTop3 ? 'text-white' : 'text-cyan-100'}`}>
                          {hunter.name}
                        </h3>
                        <span className={`
                                                    px-2 py-0.5 text-[10px] font-mono border rounded
                                                    ${isTop3 ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' : 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'}
                                                `}>
                          {hunter.rank}-RANK
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-xs font-mono text-cyan-400/60 uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <Icon name="Zap" className="w-3 h-3" />
                          LVL.{hunter.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Flame" className="w-3 h-3" />
                          STREAK: {hunter.streak}
                        </span>
                      </div>
                    </div>

                    {/* XP */}
                    <div className="text-right hidden sm:block">
                      <div className="text-[10px] font-mono text-cyan-400/40 mb-1">TOTAL EXP</div>
                      <div className={`font-mono font-bold text-xl ${isTop3 ? 'text-yellow-400' : 'text-cyan-500'}`}>
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