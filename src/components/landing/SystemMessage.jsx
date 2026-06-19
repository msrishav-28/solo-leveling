import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const FULL = `[ S Y S T E M ]   N O T I F I C A T I O N

You have been chosen as a Player.
The world you know is a tutorial.
Real strength is earned in repetition,
not in the moment you feel inspired.

Accept the quest log.
Track your attributes.
Become a threat to your former self.

- Begin Awakening Protocol.`;

export function Label({ index, title }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/55">
      <span className="text-mana">{index}</span>
      <span className="h-px w-12 bg-mana/40" />
      <span>{title}</span>
    </div>
  );
}

export function SystemMessage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [shown, setShown] = useState(0);
  const sig = useMemo(() => Math.floor(Math.random() * 16 ** 6).toString(16).padStart(6, '0').toUpperCase(), []);

  useEffect(() => {
    if (!inView) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setShown(i);
      if (i >= FULL.length) clearInterval(id);
    }, 14);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section id="system" ref={ref} className="relative py-32 sm:py-44">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <Label index="01" title="The Notification" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass scanline relative mt-10 p-8 sm:p-14"
        >
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-mana to-transparent" />
          <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mana/70">
            <span>- Incoming Transmission</span>
            <span>SIG - 0x{sig}</span>
          </div>
          <pre className="mt-8 whitespace-pre-wrap font-mono text-base leading-relaxed text-foreground/90 sm:text-xl">
            {FULL.slice(0, shown)}
            <span className="inline-block h-5 w-2 translate-y-0.5 bg-mana animate-pulse-mana" />
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
