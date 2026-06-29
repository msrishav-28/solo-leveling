import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * The "absorption" burst: when a quest is struck, the card shatters into a
 * cloud of mana particles that scatter and fly upward toward the XP bar before
 * fading. Overlay this on a position:relative parent with visible overflow.
 */
const ShatterEffect = ({ count = 26, color = '#00d9ff' }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        sx: Math.random() * 100,        // start spread across the card (%)
        sy: 20 + Math.random() * 60,
        dx: (Math.random() - 0.5) * 240, // horizontal scatter (px)
        dy: -120 - Math.random() * 280,  // upward bias toward the XP bar (px)
        size: 4 + Math.random() * 6,
        delay: Math.random() * 0.12,
        rot: (Math.random() - 0.5) * 220,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-visible">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, p.dx * 0.35, p.dx],
            y: [0, p.dy * 0.35, p.dy],
            scale: [1, 1, 0.2],
            rotate: p.rot,
          }}
          transition={{ duration: 0.85, delay: p.delay, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: `${p.sx}%`,
            top: `${p.sy}%`,
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      ))}
    </div>
  );
};

export default ShatterEffect;
