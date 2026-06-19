import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import SystemBox from './SystemBox';

const ShadowExtractionModal = ({ isOpen, onClose }) => {
  const [isArising, setIsArising] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const shadows = [
    { id: 1, name: 'IGRIS', rank: 'General', date: '2025-10-15' },
    { id: 2, name: 'TANK', rank: 'Knight', date: '2025-10-20' },
    { id: 3, name: 'IRON', rank: 'Elite', date: '2025-11-01' },
  ];

  const handleArise = () => {
    setIsArising(true);
    setTimeout(() => {
      navigator.clipboard.writeText('https://solo-leveling-habit.app/join?ref=SHADOW_MONARCH');
      setLinkCopied(true);
      setIsArising(false);
      setTimeout(() => setLinkCopied(false), 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg"
      >
        <SystemBox variant="shadow" className="overflow-hidden bg-void/90" animated={false} scanline>
          <div className="flex items-start justify-between gap-5 border-b border-purple-400/20 p-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-300/65">Expand Your Army</div>
              <h2 className="font-display mt-2 text-3xl text-purple-200 text-glow-soft">Shadow Extraction</h2>
            </div>
            <button type="button" onClick={onClose} className="text-purple-300/70 transition-colors hover:text-white">
              <Icon name="X" />
            </button>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <div className="text-center">
              <button
                type="button"
                onClick={handleArise}
                disabled={isArising}
                className="group relative mx-auto grid h-32 w-32 place-items-center border border-purple-400/45 bg-purple-500/10 transition-all hover:border-purple-300 hover:bg-purple-500/15 disabled:opacity-60"
              >
                <span className="absolute inset-0 -z-10 bg-purple-500/30 blur-2xl opacity-50 transition-opacity group-hover:opacity-80" />
                <span className="flex flex-col items-center gap-3">
                  <Icon name={isArising ? 'Loader' : 'Users'} className={`h-10 w-10 text-purple-200 ${isArising ? 'animate-spin' : ''}`} />
                  <span className="font-display text-sm text-purple-100">{isArising ? 'Extracting' : 'Arise'}</span>
                </span>
              </button>

              <p className="mx-auto mt-5 max-w-xs text-sm text-foreground/55">
                {linkCopied ? <span className="font-mono text-mana">LINK COPIED TO CLIPBOARD</span> : 'Call forth new soldiers to join your ranks.'}
              </p>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between border-b border-purple-400/20 pb-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-purple-300/75">Current Army</h3>
                <span className="font-mono text-[10px] text-purple-300/45">{shadows.length} units</span>
              </div>
              <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                {shadows.map((shadow) => (
                  <div key={shadow.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-purple-400/15 bg-purple-500/[0.06] p-3">
                    <div className="grid h-8 w-8 place-items-center border border-purple-400/20 bg-purple-500/10">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_10px_#d8b4fe]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-purple-50">{shadow.name}</div>
                      <div className="font-mono text-[10px] text-purple-300/55">{shadow.rank} Class</div>
                    </div>
                    <div className="font-mono text-[10px] text-purple-300/35">{shadow.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="secondary" className="w-full" onClick={onClose}>
              Close Archive
            </Button>
          </div>
        </SystemBox>
      </motion.div>
    </div>
  );
};

export default ShadowExtractionModal;
