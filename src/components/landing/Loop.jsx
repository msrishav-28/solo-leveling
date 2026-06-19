import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Label } from './SystemMessage';

const STEPS = [
  { n: '01', t: 'Strike', d: "Tap a quest. The dagger animation is not decoration. It is a contract." },
  { n: '02', t: 'Absorb', d: 'Particles flow to the XP bar. Every rep adds to a verifiable streak.' },
  { n: '03', t: 'Level', d: "Attributes recompute server-side. The client cannot lie for you." },
  { n: '04', t: 'Ascend', d: 'Rank up E to S. New quests unlock. Penalty zones get harsher.' },
];

export function Loop() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const active = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    return active.on('change', (v) => {
      setStep(Math.min(3, Math.max(0, Math.floor(v))));
    });
  }, [active]);

  return (
    <section id="loop" ref={ref} className="relative border-t border-hairline" style={{ height: '320vh' }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-16 px-6 sm:px-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Label index="03" title="The Loop" />
            <h2 className="font-display text-glow mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95]">
              Slash. Absorb.
              <br />
              Repeat until <span className="text-mana">rank-up</span>.
            </h2>
            <ol className="mt-12 space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.n} className="grid grid-cols-[auto_1fr] gap-5">
                  <span className={`mt-1 font-mono text-xs ${i === step ? 'text-glow-soft text-mana' : 'text-foreground/30'}`}>
                    {s.n}
                  </span>
                  <div>
                    <div className={`font-display text-2xl transition-colors ${i === step ? 'text-glow-soft text-foreground' : 'text-foreground/30'}`}>
                      {s.t}
                    </div>
                    <AnimatePresence>
                      {i === step && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 max-w-sm overflow-hidden text-sm leading-relaxed text-foreground/65"
                        >
                          {s.d}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-center justify-center md:col-span-7">
            <QuestSimulator step={step} />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestSimulator({ step }) {
  const [slashed, setSlashed] = useState(false);
  const xp = step >= 2 ? 78 : step >= 1 || slashed ? 64 : 22;
  const level = step >= 3 ? 24 : 23;

  return (
    <div className="relative w-full max-w-[520px]">
      <div className="glass scanline p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/55">
          <span>Hunter - Kaito</span>
          <span className="text-mana">Rank - B</span>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">Level</div>
            <div className="font-display text-glow text-6xl text-mana tabular-nums">{level}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">XP</div>
            <div className="font-mono text-sm tabular-nums">{12480 + Math.floor(xp * 12)} / 13800</div>
          </div>
        </div>

        <div className="relative mt-3 h-1 overflow-hidden bg-mana/15">
          <motion.div
            className="absolute inset-y-0 left-0 bg-mana shadow-[0_0_14px_#00d9ff]"
            animate={{ width: `${xp}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">
          Daily Quest - 14:32 remaining
        </div>

        <button
          type="button"
          onClick={() => setSlashed(true)}
          className="group relative mt-3 w-full overflow-hidden border border-hairline bg-void/60 p-5 text-left"
        >
          <div className="flex items-center justify-between gap-5">
            <div>
              <div className="font-display text-xl text-foreground">Morning Meditation</div>
              <div className="mt-1 font-mono text-xs text-foreground/55">+150 XP - INT - WIS</div>
            </div>
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center border font-mono text-[10px] ${
                slashed ? 'border-mana bg-mana text-void' : 'border-hairline text-mana'
              } transition-colors`}
            >
              {slashed ? 'OK' : 'RUN'}
            </span>
          </div>
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 500 100" preserveAspectRatio="none">
            <motion.line
              x1="0"
              y1="100"
              x2="500"
              y2="0"
              stroke="#00ffff"
              strokeWidth={slashed ? 1.5 : 0}
              initial={false}
              animate={{ pathLength: slashed ? 1 : 0, opacity: slashed ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.6 }}
              style={{ filter: 'drop-shadow(0 0 6px #00ffff)' }}
            />
          </svg>
        </button>

        <AnimatePresence>
          {slashed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="hairline mt-3 bg-void/80 px-4 py-2 font-mono text-[11px] text-mana"
            >
              [SYSTEM] You defeated "Morning Meditation". Absorbed 150 XP.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute -inset-10 -z-10 bg-mana/10 blur-3xl" />
    </div>
  );
}
