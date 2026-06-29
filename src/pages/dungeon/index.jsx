import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import SlashEffect from '../../components/cinematic/SlashEffect';
import { useDungeon } from '../../hooks/useDungeon';
import { useToast } from '../../context/ToastContext';

const formatRemaining = (deadline) => {
  if (!deadline) return 'No deadline';
  const diff = new Date(deadline) - new Date();
  if (diff < 0) return 'BOSS BREACHED';
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return days > 0 ? `${days}d ${hrs}h` : `${hrs}h ${mins}m`;
};

const Dungeon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { dungeon, floors, loading, notFound, clearFloor } = useDungeon(id);
  const [slashingId, setSlashingId] = useState(null);
  const [busy, setBusy] = useState(false);

  const total = floors.length;
  const remaining = floors.filter((f) => !f.isCleared).length;
  const bossHealthPercentage = total ? (remaining / total) * 100 : 0;

  const handleStrike = (floorId) => {
    if (busy) return;
    setBusy(true);
    setSlashingId(floorId);
    setTimeout(async () => {
      const res = await clearFloor(floorId);
      setSlashingId(null);
      setBusy(false);
      if (!res || res.error) {
        toast({ variant: 'danger', title: 'System Error', message: res?.error || 'Strike failed.', icon: 'AlertTriangle' });
        return;
      }
      if (res.dungeon_cleared) {
        toast({
          variant: 'gold',
          title: 'Boss Defeated',
          message: `Rune acquired: ${res.rune_stone?.name}  (+${res.xp_gained} XP)`,
          icon: 'Gem',
        });
        (res.achievements_unlocked || []).forEach((a) =>
          toast({ variant: 'gold', title: 'Achievement Unlocked', message: a.title, icon: a.icon || 'Trophy' })
        );
      } else {
        toast({ variant: 'mana', title: 'Floor Cleared', message: 'The gate trembles. Press on.', icon: 'Swords' });
      }
    }, 600);
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void text-threat">
        <SystemBackground tone="danger" />
        <div className="glass scanline relative z-10 px-8 py-6 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
          Breaching Gate...
        </div>
      </div>
    );
  }

  if (notFound || !dungeon) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-void p-6 text-center text-foreground">
        <SystemBackground tone="danger" />
        <div className="relative z-10 space-y-5">
          <Icon name="DoorClosed" className="mx-auto h-10 w-10 text-threat" />
          <h1 className="font-display text-4xl text-threat">Gate Collapsed</h1>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">This dungeon does not exist or isn't yours.</p>
          <Button variant="outline" iconName="ArrowLeft" onClick={() => navigate('/dungeons')}>Back to Gates</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0103] text-foreground selection:bg-threat selection:text-white">
      <SystemBackground tone="danger" intensity={0.9} />

      <header className="relative z-10 border-b border-threat/25 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" iconName="ArrowLeft" onClick={() => navigate('/dungeons')} className="text-threat hover:text-[#ff6b82]">
              Retreat
            </Button>
            <div className="hidden h-6 w-px bg-threat/30 sm:block" />
            <h1 className="truncate font-display text-2xl text-threat text-glow-threat">Dungeon Raid</h1>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-threat/60 sm:block">
            BOSS: {dungeon.bossName} // {dungeon.difficulty?.replace('_', '-')}
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 lg:px-10">
        <section className="space-y-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#ff5a78]">
              {dungeon.isCleared ? 'Dungeon Cleared' : `Time to Boss: ${formatRemaining(dungeon.deadline)}`}
            </div>
            <h2 className="font-display text-glow-threat mt-4 text-[clamp(3rem,8vw,6rem)] leading-[0.9] text-foreground">
              {dungeon.name}
            </h2>
            {dungeon.description && <p className="mx-auto mt-5 max-w-2xl text-lg text-[#ffb3c0]/70">{dungeon.description}</p>}
          </motion.div>

          <SystemBox variant={dungeon.isCleared ? 'gold' : 'danger'} className="mx-auto max-w-3xl p-5" animated={false}>
            <div className="mb-3 flex justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-threat/75">
              <span>{dungeon.bossName} — Health</span>
              <span>{remaining} / {total} Floors</span>
            </div>
            <div className="relative h-5 w-full overflow-hidden border border-threat/35 bg-threat/10">
              <motion.div
                className="relative h-full bg-gradient-to-r from-threat to-[#ff5a78]"
                animate={{ width: `${bossHealthPercentage}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
              >
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
              </motion.div>
            </div>
            {dungeon.isCleared && (
              <div className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-loot">
                ✦ Boss Defeated — Rune Stone secured ✦
              </div>
            )}
          </SystemBox>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence>
            {floors.map((floor) => (
              <motion.div key={floor.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                <SystemBox
                  variant="danger"
                  className={`h-full overflow-hidden ${floor.isCleared ? 'opacity-45 grayscale' : 'hover:bg-threat/10'}`}
                  animated={!floor.isCleared}
                >
                  {slashingId === floor.id && <SlashEffect />}
                  <div className="grid h-full gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className={`grid h-12 w-12 shrink-0 place-items-center border ${floor.isCleared ? 'border-white/10 bg-white/5 text-foreground/35' : 'border-threat/35 bg-threat/10 text-threat'}`}>
                        <Icon name={floor.isCleared ? 'Skull' : 'Zap'} />
                      </div>
                      <div className="min-w-0">
                        <h4 className={`font-display text-xl ${floor.isCleared ? 'text-foreground/45 line-through' : 'text-foreground'}`}>
                          {floor.title}
                        </h4>
                        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-threat/55">
                          Floor {floor.order}
                        </div>
                      </div>
                    </div>

                    {!floor.isCleared ? (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => handleStrike(floor.id)}
                        className="border border-threat/35 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-threat transition-all hover:bg-threat hover:text-white hover:shadow-[0_0_18px_rgba(255,0,51,0.35)] disabled:opacity-40"
                      >
                        Strike
                      </button>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">Cleared</span>
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
