import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import SystemBackground from '../../components/cinematic/SystemBackground';
import TextReveal from '../../components/cinematic/TextReveal';
import Magnetic from '../../components/cinematic/Magnetic';
import SystemBox from '../../components/cinematic/SystemBox';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

const classes = [
  {
    id: 'tank',
    n: 'I',
    title: 'Tank',
    stat: 'STR / CON',
    desc: 'Strength is absolute.',
    quest: 'Daily Quest: 100 Pushups',
    tone: 'primary',
    bars: [['STR', 92], ['CON', 88], ['AGI', 54]],
  },
  {
    id: 'mage',
    n: 'II',
    title: 'Mage',
    stat: 'INT / WIS',
    desc: 'Knowledge is power.',
    quest: 'Daily Quest: Deep Work',
    tone: 'primary',
    bars: [['INT', 95], ['WIS', 89], ['SENS', 68]],
  },
  {
    id: 'assassin',
    n: 'III',
    title: 'Assassin',
    stat: 'AGI / SENS',
    desc: 'Speed is survival.',
    quest: 'Daily Quest: Market Research',
    tone: 'gold',
    bars: [['AGI', 91], ['SENS', 86], ['INT', 72]],
  },
];

const JobChange = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [goldGranted, setGoldGranted] = useState(100);

  const handleSelect = async (classId) => {
    setSelectedClass(classId);
    setSubmitting(true);
    setError(null);

    // Persist the class + grant starter gold/quests server-side (anti-cheat).
    const { data, error: rpcError } = await supabase.rpc('apply_job_change', {
      p_class: classId.toUpperCase(),
    });

    setSubmitting(false);

    if (rpcError) {
      setError(rpcError.message);
      setSelectedClass(null);
      return;
    }
    if (data?.gold_granted != null) setGoldGranted(data.gold_granted);
    setStep(2);
  };

  return (
    <>
      <Helmet>
        <title>Job Change Quest | The System</title>
      </Helmet>

      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-void p-5 text-foreground">
        <SystemBackground />

        <div className="relative z-10 w-full max-w-6xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -40 }}
                className="mx-auto max-w-3xl text-center"
              >
                <div className="system-label justify-center">[System] Awakening Protocol</div>
                <h1 className="font-display text-glow mt-8 text-[clamp(3rem,9vw,7rem)] leading-[0.88]">
                  <TextReveal text="WHAT IS YOUR DESIRE?" />
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-foreground/65">
                  The System requires a vow before it can generate your first quest line.
                </p>
                <Magnetic>
                  <Button className="mt-10" size="lg" onClick={() => setStep(1)}>
                    I Seek Power
                  </Button>
                </Magnetic>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                <div className="text-center">
                  <div className="system-label justify-center">[Select Class]</div>
                  <h2 className="font-display text-glow-soft mt-4 text-4xl sm:text-6xl">Job Change</h2>
                  {submitting && (
                    <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-mana/70 animate-pulse">
                      Binding contract with the System...
                    </p>
                  )}
                  {error && (
                    <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-threat">ERROR: {error}</p>
                  )}
                </div>

                <div className="grid gap-px bg-hairline md:grid-cols-3">
                  {classes.map((item, i) => (
                    <motion.button
                      type="button"
                      key={item.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                      onClick={() => handleSelect(item.id)}
                      disabled={submitting}
                      className="group relative flex min-h-[430px] flex-col bg-void p-8 text-left transition-colors hover:bg-mana/[0.03] disabled:pointer-events-none disabled:opacity-50"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mana/0 to-transparent transition-all duration-700 group-hover:via-mana" />
                      <div className="flex items-start justify-between">
                        <span className="font-display text-7xl text-mana/15 transition-colors group-hover:text-mana/40">{item.n}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">{item.stat}</span>
                      </div>
                      <h3 className="font-display text-glow-soft mt-10 text-5xl">{item.title}</h3>
                      <p className="mt-4 border-l border-hairline pl-4 italic text-foreground/70">"{item.desc}"</p>
                      <div className="mt-8 space-y-3">
                        {item.bars.map(([label, value]) => (
                          <div key={label} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                            <span className="w-10 text-foreground/55">{label}</span>
                            <div className="h-px flex-1 bg-mana/15">
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: value / 100 }}
                                transition={{ delay: 0.25 + i * 0.1, duration: 0.8 }}
                                style={{ transformOrigin: 'left' }}
                                className={item.tone === 'gold' ? 'h-px bg-loot shadow-[0_0_8px_#ffd700]' : 'h-px bg-mana shadow-[0_0_8px_#00d9ff]'}
                              />
                            </div>
                            <span className="tabular-nums text-foreground/75">{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto pt-8 font-mono text-xs uppercase tracking-[0.16em] text-mana">
                        Auto-equip: {item.quest}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-xl"
              >
                <SystemBox variant="gold" className="p-8 text-center sm:p-10" scanline animated={false}>
                  <div className="system-label justify-center text-loot">Quest Completed</div>
                  <h2 className="font-display text-glow mt-5 text-5xl text-foreground">The Awakened</h2>
                  <div className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-foreground/55">
                    Class signature: {selectedClass?.toUpperCase()}
                  </div>
                  <div className="mt-8 border-y border-loot/20 py-6">
                    <div className="font-mono text-xs uppercase tracking-[0.25em] text-loot/75">Reward Acquired</div>
                    <div className="mt-3 text-4xl font-display text-loot">+{goldGranted} Gold</div>
                  </div>
                  <Magnetic>
                    <Button variant="gold" size="lg" className="mt-8 w-full" onClick={() => navigate('/dashboard')}>
                      Enter System
                    </Button>
                  </Magnetic>
                </SystemBox>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default JobChange;
