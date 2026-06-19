import React from 'react';
import { motion } from 'framer-motion';
import { Label } from './SystemMessage';

const CLASSES = [
  {
    n: 'I',
    name: 'Tank',
    arc: 'The Body',
    desc: 'Forged in repetition. Strength compounds where flinching used to live.',
    stats: [['STR', 92], ['CON', 88], ['AGI', 64]],
    quest: '100 Pushups - 5km Run - Cold Shower',
    color: 'mana',
  },
  {
    n: 'II',
    name: 'Mage',
    arc: 'The Mind',
    desc: 'Deep work as ritual. Knowledge stacks like spell components.',
    stats: [['INT', 95], ['WIS', 89], ['SENS', 70]],
    quest: '90m Deep Work - Read 30p - Journal',
    color: 'mana',
  },
  {
    n: 'III',
    name: 'Assassin',
    arc: 'The Edge',
    desc: 'Wealth, leverage, taste. Move first, leave no trace.',
    stats: [['AGI', 91], ['SENS', 86], ['INT', 78]],
    quest: 'Ship - Pitch - Compound',
    color: 'loot',
  },
];

export function Classes() {
  return (
    <section id="classes" className="relative border-t border-hairline py-32 sm:py-44">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Label index="02" title="Job Change" />
            <h2 className="font-display text-glow mt-6 text-[clamp(2.5rem,7vw,6rem)] leading-[0.9]">
              Pick a class.
              <br />
              <span className="text-mana">Pay for it daily.</span>
            </h2>
          </div>
          <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-foreground/55">
            Three archetypes. No multiclassing on day one. Discipline is a vow before it is a system.
          </p>
        </div>

        <div className="mt-20 grid gap-px bg-hairline md:grid-cols-3">
          {CLASSES.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="group relative flex min-h-[520px] flex-col bg-void p-8 sm:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mana/0 to-transparent transition-all duration-700 group-hover:via-mana" />
              <div className="flex items-start justify-between">
                <span className="font-display text-7xl text-mana/15 transition-colors group-hover:text-mana/40">{item.n}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">{item.arc}</span>
              </div>
              <h3 className="font-display text-glow-soft mt-12 text-5xl">{item.name}</h3>
              <p className="mt-4 max-w-xs leading-relaxed text-foreground/65">{item.desc}</p>

              <div className="mt-10 space-y-3">
                {item.stats.map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                    <span className="w-10 text-foreground/55">{k}</span>
                    <div className="relative h-px flex-1 bg-mana/15">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: v / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: 'left' }}
                        className={item.color === 'loot' ? 'h-px bg-loot shadow-[0_0_8px_#ffd700]' : 'h-px bg-mana shadow-[0_0_8px_#00d9ff]'}
                      />
                    </div>
                    <span className="tabular-nums text-foreground/75">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">Daily Quest</div>
                <div className="mt-2 font-mono text-sm text-foreground/85">{item.quest}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
