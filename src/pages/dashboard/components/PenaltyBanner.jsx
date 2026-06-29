import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import SystemBox from '../../../components/cinematic/SystemBox';
import Button from '../../../components/ui/Button';
import Magnetic from '../../../components/cinematic/Magnetic';

/**
 * The Penalty Zone debuff banner. Appears (in threat-red) when the hunter has
 * missed a quest. XP gain is locked until the Survival Quest is executed.
 */
const PenaltyBanner = ({ survivalQuestId, onExecute }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <SystemBox variant="danger" className="overflow-hidden" animated={false} scanline>
        <div className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center border border-threat/40 bg-threat/10 text-threat">
              <Icon name="AlertTriangle" className="h-6 w-6 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-threat/80">
                [ System Alert ] Status: Debuffed
              </div>
              <h3 className="glitch-text mt-1 font-display text-2xl text-threat sm:text-3xl" data-text="PENALTY ZONE">
                PENALTY ZONE
              </h3>
              <p className="mt-2 max-w-xl text-sm text-foreground/65">
                You let a quest expire. <span className="text-threat">XP gain is disabled</span> until you
                clear the <span className="text-foreground">Survival Quest</span> below.
              </p>
            </div>
          </div>

          {survivalQuestId && (
            <Magnetic>
              <Button
                variant="destructive"
                size="lg"
                iconName="Swords"
                onClick={() => onExecute(survivalQuestId)}
                className="w-full md:w-auto"
              >
                Execute Survival Quest
              </Button>
            </Magnetic>
          )}
        </div>
      </SystemBox>
    </motion.div>
  );
};

export default PenaltyBanner;
