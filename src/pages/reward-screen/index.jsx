import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import TextReveal from '../../components/cinematic/TextReveal';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import useSystemSound from '../../hooks/useSystemSound';

const RewardScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playLevelUp } = useSystemSound();
  const { quest, totalXP } = location.state || { quest: { title: 'Daily Quest' }, totalXP: 200 };
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    playLevelUp();
    const id = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(id);
  }, [playLevelUp]);

  const stats = [
    { label: 'STR', value: '+2', icon: 'Sword' },
    { label: 'AGI', value: '+1', icon: 'Zap' },
    { label: 'VIT', value: '+1', icon: 'Heart' },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void p-4 text-foreground">
      <SystemBackground tone="gold" intensity={0.8} />
      <div className="absolute inset-0 bg-loot/5 mix-blend-screen pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
        >
          <SystemBox variant="gold" className="space-y-8 bg-void/90 p-8 text-center sm:p-10" animated={false} scanline>
            <div className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-mono text-[11px] uppercase tracking-[0.35em] text-loot"
              >
                System Notification
              </motion.div>
              <h1 className="font-display text-glow text-6xl text-foreground sm:text-7xl">Level Up</h1>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/45">{quest?.title}</p>
            </div>

            <div className="relative mx-auto grid h-44 w-44 place-items-center">
              <motion.div
                className="absolute inset-0 border border-loot/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
              <motion.div className="absolute inset-3 border border-loot border-t-transparent animate-spin-slow" />
              <div>
                <div className="font-mono text-5xl font-black tabular-nums text-foreground">{totalXP}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-loot/70">XP Gained</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-px bg-loot/25">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={showContent ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="bg-void/85 p-4"
                >
                  <Icon name={stat.icon} className="mx-auto mb-3 h-5 w-5 text-loot" />
                  <div className="font-mono text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-loot/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-loot/20 pt-6">
              <p className="font-mono text-sm text-loot/80">
                <TextReveal text='"You have exceeded your limits."' delay={1.5} />
              </p>
            </div>

            <Magnetic>
              <Button variant="gold" size="lg" onClick={() => navigate('/dashboard')} className="w-full">
                Confirm
              </Button>
            </Magnetic>
          </SystemBox>
        </motion.div>
      </div>
    </div>
  );
};

export default RewardScreen;
