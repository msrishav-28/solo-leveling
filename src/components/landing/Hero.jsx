import React from 'react';
import { motion } from 'framer-motion';
import { GateCanvas } from './GateCanvas';
import { Magnetic } from './Magnetic';

export function Hero({ reduced }) {
  return (
    <section id="top" className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <GateCanvas reduced={reduced} />
      </div>

      <Bracket className="top-24 left-6 sm:left-10" />
      <Bracket className="top-24 right-6 sm:right-10" flip />
      <Bracket className="bottom-10 left-6 sm:left-10" vflip />
      <Bracket className="bottom-10 right-6 sm:right-10" flip vflip />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-mana/80"
        >
          [System] You have 1 unread message
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-glow mt-6 text-[clamp(3.5rem,12vw,11rem)] leading-[0.82] text-foreground"
        >
          Level <span className="text-mana">Up</span>
          <br />
          <span className="inline-block">IRL.</span>
        </motion.h1>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-md text-base text-foreground/70 sm:text-lg"
          >
            A cinematic operating system for your discipline. Turn every habit into a quest, every week into a raid,
            every year into a rank-up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <a
                href="#summon"
                className="group relative inline-flex items-center justify-center gap-3 bg-mana px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.22em] text-void"
              >
                <span className="absolute inset-0 -z-10 bg-mana blur-xl opacity-50 transition-opacity group-hover:opacity-80" />
                Accept the Quest
                <span aria-hidden="true">-&gt;</span>
              </a>
            </Magnetic>
            <a
              href="#system"
              className="hairline px-5 py-3.5 text-center font-mono text-[12px] uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:border-mana hover:text-mana"
            >
              Read Notification
            </a>
          </motion.div>
        </div>

        <div className="mt-14 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
          <span>Gate - E-Rank Threshold</span>
          <span className="hidden sm:inline">Lat 35.6762 - Lon 139.6503</span>
          <span>Mana Density - 99.8%</span>
        </div>
      </div>
    </section>
  );
}

function Bracket({ className, flip, vflip }) {
  return (
    <div
      className={`pointer-events-none absolute z-10 h-10 w-10 ${className}`}
      style={{ transform: `scale(${flip ? -1 : 1}, ${vflip ? -1 : 1})` }}
    >
      <div className="absolute left-0 top-0 h-px w-6 bg-mana/60" />
      <div className="absolute left-0 top-0 h-6 w-px bg-mana/60" />
    </div>
  );
}
