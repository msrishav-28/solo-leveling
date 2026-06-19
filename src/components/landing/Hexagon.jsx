import React from 'react';
import { motion } from 'framer-motion';
import { Label } from './SystemMessage';

const STATS = [
  { k: 'STR', v: 88, label: 'Strength' },
  { k: 'INT', v: 94, label: 'Intelligence' },
  { k: 'CON', v: 81, label: 'Constitution' },
  { k: 'AGI', v: 76, label: 'Agility' },
  { k: 'WIS', v: 90, label: 'Wisdom' },
  { k: 'SENS', v: 72, label: 'Sense' },
];

export function Hexagon() {
  const cx = 200;
  const cy = 200;
  const r = 150;
  const points = STATS.map((s, i) => {
    const a = (Math.PI * 2 * i) / STATS.length - Math.PI / 2;
    const rr = (s.v / 100) * r;
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  const outer = STATS.map((_, i) => {
    const a = (Math.PI * 2 * i) / STATS.length - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });

  return (
    <section className="relative border-t border-hairline py-32 sm:py-44">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 sm:px-10 md:grid-cols-12">
        <div className="flex flex-col justify-center md:col-span-6">
          <Label index="04" title="Attribute System" />
          <h2 className="font-display text-glow mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95]">
            Six stats.
            <br />
            One <span className="text-mana">honest</span> mirror.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-foreground/65">
            Every completed quest reshapes your hex. Skip a week and the polygon contracts: visible, unforgiving,
            and yours to fix.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-x-10 gap-y-4">
            {STATS.map((s, i) => (
              <motion.li
                key={s.k}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-baseline justify-between border-b border-hairline pb-2 font-mono text-xs uppercase tracking-[0.2em]"
              >
                <span className="text-foreground/55">{s.k}</span>
                <span className="tabular-nums text-foreground/85">{s.v}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center md:col-span-6">
          <svg viewBox="0 0 400 400" className="w-[min(80vw,520px)]">
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <polygon
                key={f}
                points={outer.map(([x, y]) => `${cx + (x - cx) * f},${cy + (y - cy) * f}`).join(' ')}
                fill="none"
                stroke="rgba(0,217,255,0.12)"
                strokeWidth={1}
              />
            ))}
            {outer.map(([x, y], i) => (
              <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(0,217,255,0.1)" />
            ))}
            <motion.polygon
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              points={points.map(([x, y]) => `${x},${y}`).join(' ')}
              fill="rgba(0,217,255,0.15)"
              stroke="#00d9ff"
              strokeWidth={1.5}
              filter="drop-shadow(0 0 8px #00d9ff)"
            />
            {points.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={3} fill="#00ffff" />
            ))}
            {STATS.map((s, i) => {
              const a = (Math.PI * 2 * i) / STATS.length - Math.PI / 2;
              const lx = cx + Math.cos(a) * (r + 26);
              const ly = cy + Math.sin(a) * (r + 26);
              return (
                <text
                  key={s.k}
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-[#7ff5ff]"
                  style={{ font: "500 11px 'JetBrains Mono', monospace", letterSpacing: '0.2em' }}
                >
                  {s.k}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
