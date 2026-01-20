import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SystemBackground from '../../components/cinematic/SystemBackground';
import TextReveal from '../../components/cinematic/TextReveal';
import Magnetic from '../../components/cinematic/Magnetic';
import { AnimatePresence, motion } from 'framer-motion';
import useSystemSound from '../../hooks/useSystemSound';

const LandingPage = () => {
  const navigate = useNavigate();
  const { playClick, playHover } = useSystemSound();
  const [hasOpenedMessage, setHasOpenedMessage] = useState(false);


  const handleOpenMessage = () => {
    playClick();
    setHasOpenedMessage(true);
  };

  return (
    <>
      <Helmet>
        <title>The System | Solo Leveling</title>
        <meta name="theme-color" content="#020617" />
      </Helmet>

      <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center text-center px-4">
        {/* The Void Background */}
        <SystemBackground />

        {/* Film Grain & Grid Overlay */}
        <div className="bg-noise" />

        <div className="z-10 max-w-2xl w-full flex flex-col items-center gap-12">

          <AnimatePresence mode="wait">
            {!hasOpenedMessage ? (
              <motion.div
                key="notification"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Bell Icon / Notification Indicator */}
                <motion.div
                  className="w-16 h-16 rounded-full border border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.3)]"
                  animate={{ boxShadow: ['0 0 20px rgba(0,217,255,0.2)', '0 0 50px rgba(0,217,255,0.6)', '0 0 20px rgba(0,217,255,0.2)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl font-heading text-white tracking-widest">
                    <TextReveal text="SYSTEM_NOTIFICATION" />
                  </h1>
                  <p className="text-xl text-primary font-mono tracking-widest">
                    <TextReveal text="You have (1) Unread Message." delay={0.5} />
                  </p>
                </div>

                <Magnetic>
                  <button
                    onClick={handleOpenMessage}
                    onMouseEnter={() => playHover()}
                    className="group relative px-8 py-3 bg-transparent overflow-hidden transition-all duration-300 pointer-events-auto"
                  >
                    <div className="absolute inset-0 border border-primary/30 group-hover:border-primary transition-all duration-300" />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />

                    <span className="relative font-heading tracking-widest text-primary group-hover:text-white transition-colors">
                      [CHECK_MESSAGE]
                    </span>
                  </button>
                </Magnetic>
              </motion.div>
            ) : (
              <motion.div
                key="initialization"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-lg"
              >
                {/* System Initialization Sequence */}
                <div className="w-full h-1 bg-gray-900 overflow-hidden relative mb-4">
                  <motion.div
                    className="absolute inset-0 bg-primary shadow-[0_0_20px_#00d9ff]"
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                    onAnimationComplete={() => navigate('/job-change')}
                  />
                </div>

                <div className="flex justify-between text-primary font-mono text-sm">
                  <span>SYSTEM_INITIALIZATION...</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    [PROCESSING]
                  </motion.span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8 text-center"
                >
                  <p className="text-white/80 font-body text-lg italic">
                    "This reality... is now a Game."
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Version Info */}
        <div className="absolute bottom-8 text-white/20 font-mono text-xs">
          SYSTEM_VER_2.0 // SHADOW_MONARCH
        </div>
      </div>
    </>
  );
};

export default LandingPage;
