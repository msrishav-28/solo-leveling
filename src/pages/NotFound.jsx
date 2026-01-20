import React from 'react';
import { useNavigate } from 'react-router-dom';
import SystemBackground from '../components/cinematic/SystemBackground';
import TextReveal from '../components/cinematic/TextReveal';
import Magnetic from '../components/cinematic/Magnetic';
import Button from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center p-4">
      <SystemBackground />
      <div className="bg-noise" />

      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        <div className="font-mono text-red-500 tracking-[0.5em] text-sm animate-pulse">
          CRITICAL ERROR
        </div>

        <h1 className="text-8xl md:text-9xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-red-500/50 mix-blend-overlay opacity-50 select-none">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-3xl font-heading font-bold text-white tracking-widest">
            <TextReveal text="DUNGEON NOT FOUND" />
          </h2>
          <p className="font-mono text-cyan-500/60 max-w-md mx-auto">
            The gate you are trying to access has been closed or does not exist in this timeline.
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-8">
          <Magnetic>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 font-mono"
            >
              RETURN TO LOBBY
            </Button>
          </Magnetic>
        </div>
      </div>

      <div className="absolute bottom-8 font-mono text-xs text-red-900/40">
        ERROR_CODE: GATE_COLLAPSE
      </div>
    </div>
  );
};

export default NotFound;
