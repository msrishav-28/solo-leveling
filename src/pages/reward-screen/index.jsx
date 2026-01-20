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

  // Mock Data from navigation
  const { quest, totalXP } = location.state || { quest: { title: "Daily Quest" }, totalXP: 200 };

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    playLevelUp();
    setTimeout(() => setShowContent(true), 500);
  }, [playLevelUp]);

  const stats = [
    { label: "STR", value: "+2", icon: "Sword" },
    { label: "AGI", value: "+1", icon: "Zap" },
    { label: "VIT", value: "+1", icon: "Heart" },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      <SystemBackground />
      <div className="bg-noise" />

      {/* Ambient Gold Glow */}
      <div className="absolute inset-0 bg-yellow-500/5 mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          <SystemBox variant="gold" className="text-center p-8 md:p-12 space-y-8 bg-black/80 shadow-[0_0_100px_rgba(234,179,8,0.2)]">
            {/* Header */}
            <div className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-yellow-500 font-mono tracking-[0.5em] text-sm uppercase"
              >
                SYSTEM NOTIFICATION
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-heading font-black text-white italic tracking-tighter drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]">
                LEVEL UP!
              </h1>
            </div>

            {/* XP Circle */}
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <motion.div
                className="absolute inset-0 border-4 border-yellow-500/30 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin-slow"
              />
              <div className="text-center">
                <div className="text-4xl font-black text-white">{totalXP}</div>
                <div className="text-xs font-mono text-yellow-500 uppercase">XP GAINED</div>
              </div>
            </div>

            {/* Stat Gains */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + (i * 0.1) }}
                  className="p-3 border border-yellow-500/30 bg-yellow-900/10 rounded"
                >
                  <Icon name={stat.icon} className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] font-mono text-yellow-500/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Message */}
            <div className="pt-6 border-t border-yellow-500/20">
              <p className="font-mono text-sm text-yellow-100/80">
                <TextReveal text={`"You have exceeded your limits."`} delay={1.5} />
              </p>
            </div>

            <Magnetic>
              <Button
                variant="default"
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black tracking-widest uppercase shadow-[0_0_20px_rgba(234,179,8,0.4)]"
              >
                CONFIRM
              </Button>
            </Magnetic>
          </SystemBox>
        </motion.div>
      </div>
    </div>
  );
};

export default RewardScreen;