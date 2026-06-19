import React from 'react';
import { GateCanvas } from './GateCanvas';
import { Magnetic } from './Magnetic';

export function Summon({ reduced }) {
  return (
    <section id="summon" className="relative min-h-[100svh] overflow-hidden border-t border-hairline">
      <div className="absolute inset-0 opacity-70">
        <GateCanvas reduced={reduced} />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center px-6 text-center sm:px-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-mana/80">
          - Final Protocol
        </div>
        <h2 className="font-display text-glow mt-8 text-[clamp(5rem,20vw,18rem)] leading-[0.82]">
          Arise.
        </h2>
        <p className="mt-8 max-w-xl text-lg text-foreground/70">
          The System is open. Your first quest is waiting. The only question is whether the next 90 days belong to you
          or to drift.
        </p>
        <Magnetic strength={0.45}>
          <a
            href="/auth"
            className="group relative mt-12 inline-flex items-center gap-4 bg-mana px-10 py-5 font-mono text-xs uppercase tracking-[0.28em] text-void"
          >
            <span className="absolute inset-0 -z-10 bg-mana blur-2xl opacity-60 transition-opacity group-hover:opacity-100" />
            Awaken My Hunter
            <span aria-hidden="true">-&gt;</span>
          </a>
        </Magnetic>
        <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
          Free for E-Rank - No card - Cancel mid-raid
        </div>
      </div>
    </section>
  );
}
