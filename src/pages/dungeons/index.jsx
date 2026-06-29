import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import Magnetic from '../../components/cinematic/Magnetic';
import TextReveal from '../../components/cinematic/TextReveal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import { useDungeons } from '../../hooks/useDungeons';
import { usePlayerStats } from '../../hooks/usePlayerStats';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import { DIFFICULTIES } from '../../lib/gamification';

const timeToDeadline = (deadline) => {
  if (!deadline) return null;
  const diff = new Date(deadline) - new Date();
  if (diff < 0) return 'BOSS BREACHED';
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  if (days > 0) return `${days}d ${hrs}h`;
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${hrs}h ${mins}m`;
};

const emptyForm = { name: '', description: '', bossName: '', difficulty: 'C_RANK', deadline: '', floors: ['', ''] };

const DungeonsList = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { stats } = usePlayerStats();
  const { toast } = useToast();
  const { dungeons, loading, createDungeon, deleteDungeon } = useDungeons();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const setFloor = (i, value) =>
    setForm((p) => ({ ...p, floors: p.floors.map((f, idx) => (idx === i ? value : f)) }));
  const addFloor = () => setForm((p) => ({ ...p, floors: [...p.floors, ''] }));
  const removeFloor = (i) => setForm((p) => ({ ...p, floors: p.floors.filter((_, idx) => idx !== i) }));

  const handleCreate = async () => {
    setSubmitting(true);
    setError(null);
    const result = await createDungeon({
      ...form,
      deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
    });
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    toast({ variant: 'mana', title: 'Gate Opened', message: `Dungeon "${form.name}" created.`, icon: 'DoorOpen' });
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-foreground">
      <Helmet><title>Dungeons | The System</title></Helmet>
      <SystemBackground tone="danger" />
      <Header user={stats} onNavigate={navigate} onSignOut={handleSignOut} />

      <main className="relative z-10 mx-auto max-w-[1200px] space-y-8 px-4 py-8 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-hairline pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="system-label">Gate Network</div>
            <h1 className="font-display text-glow mt-3 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.88]">
              <TextReveal text="DUNGEONS" />
            </h1>
            <p className="mt-3 max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-threat/70">
              // Projects rendered as raids. Clear every floor before the boss deadline.
            </p>
          </div>
          <Magnetic>
            <Button variant="default" size="lg" iconName={showForm ? 'X' : 'Plus'} onClick={() => setShowForm((s) => !s)}>
              {showForm ? 'Cancel' : 'Open Gate'}
            </Button>
          </Magnetic>
        </div>

        {/* Create form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <SystemBox variant="primary" className="p-6 sm:p-8" animated={false} scanline>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="system-label">Dungeon Name</label>
                    <input className="system-input" placeholder="THE REFACTORING RAID" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="system-label">Boss Name</label>
                    <input className="system-input" placeholder="THE LEGACY MONOLITH" value={form.bossName}
                      onChange={(e) => setForm({ ...form, bossName: e.target.value })} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="system-label">Briefing</label>
                    <textarea rows={2} className="system-input resize-none" placeholder="OPTIONAL OBJECTIVE..." value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="system-label">Threat Rating</label>
                    <div className="grid grid-cols-6 gap-px bg-hairline">
                      {DIFFICULTIES.map((d) => (
                        <button key={d.id} type="button" onClick={() => setForm({ ...form, difficulty: d.id })}
                          className={`bg-void py-3 font-display text-lg transition-all ${form.difficulty === d.id ? 'bg-threat text-void' : 'text-threat/45 hover:bg-threat/10 hover:text-threat'}`}>
                          {d.short}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="system-label">Boss Deadline</label>
                    <input type="datetime-local" className="system-input" value={form.deadline}
                      onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <label className="system-label">Floors (Milestones)</label>
                    {form.floors.map((floor, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-12 shrink-0 font-mono text-xs text-threat/60">F{i + 1}</span>
                        <input className="system-input" placeholder={`Milestone ${i + 1}...`} value={floor}
                          onChange={(e) => setFloor(i, e.target.value)} />
                        {form.floors.length > 1 && (
                          <button type="button" onClick={() => removeFloor(i)} className="border border-hairline p-2.5 text-threat hover:bg-threat/10">
                            <Icon name="Trash2" className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addFloor} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mana hover:text-mana-glow">
                      <Icon name="Plus" className="h-4 w-4" /> Add Floor
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="mt-5 border border-threat/40 bg-threat/10 p-3 font-mono text-xs uppercase tracking-[0.12em] text-threat">
                    ERROR: {error}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <Magnetic>
                    <Button variant="default" size="lg" iconName={submitting ? 'Loader' : 'Swords'} disabled={submitting} onClick={handleCreate}>
                      {submitting ? 'Forging' : 'Forge Dungeon'}
                    </Button>
                  </Magnetic>
                </div>
              </SystemBox>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(2)].map((_, i) => <SystemBox key={i} animated={false} className="h-40 animate-pulse bg-threat/5" />)}
          </div>
        ) : dungeons.length === 0 ? (
          <SystemBox animated={false} className="p-12 text-center" scanline>
            <Icon name="DoorClosed" className="mx-auto h-7 w-7 text-threat" />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-foreground/45">No gates detected. Open one to begin a raid.</p>
          </SystemBox>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {dungeons.map((d) => {
              const remaining = timeToDeadline(d.deadline);
              const breached = remaining === 'BOSS BREACHED';
              return (
                <SystemBox key={d.id} variant={d.isCleared ? 'gold' : 'danger'} className="group overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <button type="button" onClick={() => navigate(`/dungeon/${d.id}`)} className="min-w-0 text-left">
                        <h3 className="truncate font-display text-2xl text-foreground transition-colors group-hover:text-mana">{d.name}</h3>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-threat/70">
                          Boss: {d.bossName} · {d.difficulty?.replace('_', '-')}
                        </p>
                      </button>
                      <button type="button" onClick={() => deleteDungeon(d.id)} className="shrink-0 border border-hairline p-2 text-foreground/40 hover:border-threat/50 hover:text-threat" aria-label="Delete dungeon">
                        <Icon name="Trash2" className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-5 space-y-2">
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
                        <span className="text-foreground/50">Floors {d.clearedFloors}/{d.totalFloors}</span>
                        {d.isCleared ? (
                          <span className="text-loot">CLEARED</span>
                        ) : (
                          <span className={breached ? 'text-threat' : 'text-foreground/60'}>{remaining || 'No deadline'}</span>
                        )}
                      </div>
                      <div className="h-1.5 w-full overflow-hidden bg-white/5">
                        <div className={`h-full ${d.isCleared ? 'bg-loot' : 'bg-threat'}`} style={{ width: `${d.progress}%` }} />
                      </div>
                    </div>

                    <button type="button" onClick={() => navigate(`/dungeon/${d.id}`)}
                      className="mt-5 flex w-full items-center justify-center gap-2 border border-hairline bg-void/60 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mana transition-colors hover:bg-mana/10">
                      <Icon name="LogIn" className="h-4 w-4" /> Enter Dungeon
                    </button>
                  </div>
                </SystemBox>
              );
            })}
          </div>
        )}
      </main>
      <div className="h-16" />
    </div>
  );
};

export default DungeonsList;
