import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function Boot({ reduced }) {
  const [done, setDone] = useState(reduced);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    let value = 0;
    const id = setInterval(() => {
      value += Math.random() * 9 + 3;
      if (value >= 100) {
        value = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 420);
      }
      setPct(Math.min(100, value));
    }, 70);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="scanline fixed inset-0 z-[80] flex items-end justify-between bg-void p-6 sm:p-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="font-mono text-[11px] leading-relaxed text-mana/80 sm:text-xs">
            <div>[SYSTEM] INITIALIZING GATE PROTOCOL - v2.1.7</div>
            <div className="text-foreground/40">verifying hunter signature...</div>
            <div className="text-foreground/40">handshake - mana stream - OK</div>
          </div>
          <div className="font-mono text-right">
            <div className="text-[11px] text-foreground/50 sm:text-xs">SYSTEM BOOT</div>
            <div className="font-display text-glow text-3xl text-mana tabular-nums sm:text-5xl">
              {String(Math.floor(pct)).padStart(3, '0')}
            </div>
            <div className="ml-auto mt-2 h-px w-40 bg-mana/20 sm:w-64">
              <div className="h-full bg-mana shadow-[0_0_12px_#00d9ff]" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
