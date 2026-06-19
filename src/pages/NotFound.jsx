import React from 'react';
import { useNavigate } from 'react-router-dom';
import SystemBackground from '../components/cinematic/SystemBackground';
import TextReveal from '../components/cinematic/TextReveal';
import Magnetic from '../components/cinematic/Magnetic';
import Button from '../components/ui/Button';
import SystemBox from '../components/cinematic/SystemBox';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void p-4 text-foreground">
      <SystemBackground tone="danger" intensity={0.75} />

      <SystemBox variant="danger" className="relative z-10 w-full max-w-2xl p-8 text-center sm:p-10" animated={false} scanline>
        <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-threat animate-pulse">
          Critical Error
        </div>

        <h1 className="font-display mt-6 text-[clamp(7rem,22vw,12rem)] leading-none text-threat/35 mix-blend-screen select-none">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="font-display text-glow-threat text-3xl text-foreground sm:text-4xl">
            <TextReveal text="DUNGEON NOT FOUND" />
          </h2>
          <p className="mx-auto max-w-md font-mono text-sm leading-relaxed text-foreground/55">
            The gate you are trying to access has been closed or does not exist in this timeline.
          </p>
        </div>

        <div className="flex justify-center pt-8">
          <Magnetic>
            <Button variant="destructive" onClick={() => navigate('/')}>
              Return To Lobby
            </Button>
          </Magnetic>
        </div>

        <div className="mt-8 border-t border-threat/20 pt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-threat/35">
          Error_Code: Gate_Collapse
        </div>
      </SystemBox>
    </div>
  );
};

export default NotFound;
