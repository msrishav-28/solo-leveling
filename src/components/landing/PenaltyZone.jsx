import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function PenaltyZone() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-[rgba(255,0,51,0.25)] bg-[#0a0103] py-32 sm:py-44">
      <div className="absolute inset-0 bg-grid-threat opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-threat to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-threat to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff5a78]">
          [Penalty Zone] Debuff Active
        </div>
        <motion.h2 className="font-display text-glow-threat mt-8 text-[clamp(2.5rem,9vw,8rem)] leading-[0.88] text-[#ff3355]">
          Miss the quest.
          <br />
          <span className="text-white/80">Feel the debuff.</span>
        </motion.h2>
        <p className="mt-8 max-w-xl leading-relaxed text-[#ffb3c0]/80">
          The System does not punish. It just stops giving. Mana drains, XP gates close, and the interface bleeds red
          until a survival quest is cleared. Discipline is a circuit you keep closed.
        </p>

        <motion.div
          style={{ x }}
          className="mt-16 flex gap-10 whitespace-nowrap font-display text-[clamp(3rem,8vw,7rem)] text-threat/15"
        >
          <span>STREAK BROKEN</span>
          <span>- XP LOCKED -</span>
          <span>RANK SLIPPED</span>
          <span>- RECOVER -</span>
          <span>STREAK BROKEN</span>
        </motion.div>
      </div>
    </section>
  );
}
