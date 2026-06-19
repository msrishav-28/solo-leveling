import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import SlashEffect from '../../components/cinematic/SlashEffect';

const Dungeon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slashingId, setSlashingId] = useState(null);

  const [dungeonData, setDungeonData] = useState({
    name: 'The Refactoring Raid',
    description: 'Eliminate technical debt and modernize the codebase before deployment.',
    difficulty: 'S-Rank',
    bossHP: 1000,
    currentHP: 650,
    minions: [
      { id: 1, name: 'Fix Lint Warnings', hp: 100, completed: true, xp: 50 },
      { id: 2, name: 'Optimize Images', hp: 150, completed: false, xp: 75 },
      { id: 3, name: 'Unit Tests Coverage', hp: 300, completed: false, xp: 150 },
      { id: 4, name: 'Documentation', hp: 100, completed: false, xp: 50 },
    ],
  });

  const handleSlash = (minionId) => {
    setSlashingId(minionId);
    setTimeout(() => {
      setDungeonData((prev) => {
        const damage = prev.minions.find((m) => m.id === minionId)?.hp || 0;
        return {
          ...prev,
          minions: prev.minions.map((m) => (m.id === minionId ? { ...m, completed: true } : m)),
          currentHP: Math.max(0, prev.currentHP - damage),
        };
      });
      setSlashingId(null);
    }, 600);
  };

  const bossHealthPercentage = (dungeonData.currentHP / dungeonData.bossHP) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0103] text-foreground selection:bg-threat selection:text-white">
      <SystemBackground tone="danger" intensity={0.9} />

      <header className="relative z-10 border-b border-threat/25 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" iconName="ArrowLeft" onClick={() => navigate('/dashboard')} className="text-threat hover:text-[#ff6b82]">
              Retreat
            </Button>
            <div className="hidden h-6 w-px bg-threat/30 sm:block" />
            <h1 className="truncate font-display text-2xl text-threat text-glow-threat">Dungeon Raid</h1>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-threat/60 sm:block">
            ID: {id} // DIFF: {dungeonData.difficulty}
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 lg:px-10">
        <section className="space-y-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#ff5a78]">Current Objective</div>
            <h2 className="font-display text-glow-threat mt-4 text-[clamp(3rem,8vw,6rem)] leading-[0.9] text-foreground">
              {dungeonData.name}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#ffb3c0]/70">{dungeonData.description}</p>
          </motion.div>

          <SystemBox variant="danger" className="mx-auto max-w-3xl p-5" animated={false}>
            <div className="mb-3 flex justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-threat/75">
              <span>Boss Health</span>
              <span>{dungeonData.currentHP} / {dungeonData.bossHP} HP</span>
            </div>
            <div className="relative h-5 w-full overflow-hidden border border-threat/35 bg-threat/10">
              <motion.div
                className="relative h-full bg-gradient-to-r from-threat to-[#ff5a78]"
                initial={{ width: '100%' }}
                animate={{ width: `${bossHealthPercentage}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
              >
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </SystemBox>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence>
            {dungeonData.minions.map((minion) => (
              <motion.div
                key={minion.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <SystemBox
                  variant="danger"
                  className={`h-full overflow-hidden ${minion.completed ? 'opacity-45 grayscale' : 'hover:bg-threat/10'}`}
                  animated={!minion.completed}
                >
                  {slashingId === minion.id && <SlashEffect />}
                  <div className="grid h-full gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className={`grid h-12 w-12 shrink-0 place-items-center border ${minion.completed ? 'border-white/10 bg-white/5 text-foreground/35' : 'border-threat/35 bg-threat/10 text-threat'}`}>
                        <Icon name={minion.completed ? 'Skull' : 'Zap'} />
                      </div>
                      <div className="min-w-0">
                        <h4 className={`font-display text-xl ${minion.completed ? 'text-foreground/45 line-through' : 'text-foreground'}`}>
                          {minion.name}
                        </h4>
                        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-threat/55">
                          HP: {minion.hp} // XP: +{minion.xp}
                        </div>
                      </div>
                    </div>

                    {!minion.completed ? (
                      <button
                        type="button"
                        onClick={() => handleSlash(minion.id)}
                        className="border border-threat/35 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-threat transition-all hover:bg-threat hover:text-white hover:shadow-[0_0_18px_rgba(255,0,51,0.35)]"
                      >
                        Strike
                      </button>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">Eliminated</span>
                    )}
                  </div>
                </SystemBox>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default Dungeon;
