import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import SystemBox from './SystemBox';
import { useShadows } from '../../hooks/useShadows';

const ShadowExtractionModal = ({ isOpen, onClose }) => {
  const { referralCode, referralLink, shadows, loading } = useShadows();
  const [linkCopied, setLinkCopied] = useState(false);

  const handleArise = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    } catch {
      setLinkCopied(false);
    }
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
            <button type="button" onClick={onClose} className="text-purple-300/70 transition-colors hover:text-white" aria-label="Close">
              <Icon name="X" />
            </button>
          </div>

          <div className="space-y-7 p-6 sm:p-8">
            <p className="text-center text-sm text-foreground/60">
              Hunters who awaken through your gate become your <span className="text-purple-200">Shadows</span>.
              You absorb <span className="text-purple-200">5% of all XP</span> they earn — forever.
            </p>

            {/* Referral code + link */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border border-purple-400/25 bg-purple-500/[0.06] px-4 py-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-purple-300/60">Your Sigil</div>
                  <div className="font-display text-xl tracking-[0.18em] text-purple-100">{referralCode || '— — — —'}</div>
                </div>
                <Icon name="Fingerprint" className="h-7 w-7 text-purple-300/50" />
              </div>

              <button
                type="button"
                onClick={handleArise}
                disabled={!referralLink}
                className="group flex w-full items-center justify-center gap-3 border border-purple-400/45 bg-purple-500/10 px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-purple-100 transition-all hover:border-purple-300 hover:bg-purple-500/15 disabled:opacity-50"
              >
                <Icon name={linkCopied ? 'Check' : 'Link'} className="h-4 w-4" />
                {linkCopied ? 'Summon Link Copied' : 'Copy Summon Link — "Arise"'}
              </button>
            </div>

            {/* Shadow army */}
            <div>
              <div className="mb-3 flex items-center justify-between border-b border-purple-400/20 pb-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-purple-300/75">Shadow Army</h3>
                <span className="font-mono text-[10px] text-purple-300/45">{shadows.length} units</span>
              </div>

              {loading ? (
                <div className="py-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-purple-300/40 animate-pulse">
                  Scanning the dark...
                </div>
              ) : shadows.length === 0 ? (
                <div className="border border-dashed border-purple-400/20 py-8 text-center">
                  <Icon name="Ghost" className="mx-auto h-6 w-6 text-purple-300/40" />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-purple-300/40">No shadows yet — share your sigil</p>
                </div>
              ) : (
                <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                  {shadows.map((shadow) => (
                    <div key={shadow.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-purple-400/15 bg-purple-500/[0.06] p-3">
                      <div className="grid h-9 w-9 place-items-center border border-purple-400/25 bg-purple-500/10 font-display text-purple-100">
                        {shadow.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-purple-50">{shadow.name}</div>
                        <div className="font-mono text-[10px] text-purple-300/55">LVL {shadow.level} · {shadow.rank}-Rank</div>
                      </div>
                      <div className="font-mono text-[10px] text-purple-300/45">{(shadow.xp || 0).toLocaleString()} XP</div>
                    </div>
                  ))}
                </div>
              )}
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
