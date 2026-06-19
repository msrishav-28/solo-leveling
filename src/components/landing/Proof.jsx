import React from 'react';
import { motion } from 'framer-motion';
import { Label } from './SystemMessage';

const QUOTES = [
  {
    rank: 'S',
    text: "I've used eight habit apps. This is the first one I did not quit by week three. The penalty zone is brutal, and that is why it works.",
    who: 'R. Watanabe',
    role: 'Founder - Composer',
  },
  {
    rank: 'A',
    text: "The slash mechanic sounds like a gimmick until you do it 40 days in a row. Then it becomes a ritual.",
    who: 'M. Okafor',
    role: 'Surgical Resident',
  },
  {
    rank: 'S',
    text: "Watching my hex contract after a lazy week was more motivating than any streak counter I have ever seen.",
    who: 'L. Park',
    role: 'Quant - Marathoner',
  },
];

const EVENTS = [
  'Hunter KAITO leveled up 23 to 24',
  'Quest cleared - Deep Work - +220 XP',
  'Streak - 47 days',
  'Rank up - C to B - KAEDE',
  'S-Rank quest unlocked - Cold Plunge',
  'Survival quest passed - LIN',
  'New title - The Awakened - 1,204 hunters today',
];

export function Proof() {
  return (
    <section id="proof" className="relative border-t border-hairline py-32 sm:py-44">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Label index="05" title="Field Reports" />
        <h2 className="font-display text-glow mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95]">
          Hunters, on the record.
        </h2>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.who}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`grid h-12 w-12 place-items-center border font-display text-2xl ${
                    q.rank === 'S'
                      ? 'border-loot text-loot shadow-[0_0_18px_rgba(255,215,0,0.5)]'
                      : 'border-mana text-mana text-glow-soft'
                  }`}
                >
                  {q.rank}
                </div>
                <div className="ml-6 h-px flex-1 bg-hairline" />
              </div>
              <blockquote className="mt-8 font-display text-2xl leading-[1.15] text-foreground/95">
                "{q.text}"
              </blockquote>
              <figcaption className="mt-auto pt-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground/55">
                <div className="text-foreground/85">{q.who}</div>
                <div>{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="mt-28 overflow-hidden border-y border-hairline bg-void/60">
        <div className="flex items-center gap-12 whitespace-nowrap py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-mana/80 animate-ticker">
          {[...EVENTS, ...EVENTS, ...EVENTS].map((event, i) => (
            <span key={`${event}-${i}`} className="flex items-center gap-6">
              <span className="h-1 w-1 bg-mana" />
              {event}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
