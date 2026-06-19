import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Atmosphere } from '../../components/landing/Atmosphere';
import { Boot } from '../../components/landing/Boot';
import { Nav } from '../../components/landing/Nav';
import { Hero } from '../../components/landing/Hero';
import { SystemMessage } from '../../components/landing/SystemMessage';
import { Classes } from '../../components/landing/Classes';
import { Loop } from '../../components/landing/Loop';
import { Hexagon } from '../../components/landing/Hexagon';
import { PenaltyZone } from '../../components/landing/PenaltyZone';
import { Proof } from '../../components/landing/Proof';
import { Summon } from '../../components/landing/Summon';
import { Footer } from '../../components/landing/Footer';
import { useLenis } from '../../components/landing/useLenis';
import { useReducedMotionPref } from '../../components/landing/useReducedMotionPref';

const LandingPage = () => {
  const reduced = useReducedMotionPref();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), reduced ? 0 : 1400);
    return () => clearTimeout(timer);
  }, [reduced]);

  useLenis(ready && !reduced);

  return (
    <>
      <Helmet>
        <title>Solo Leveling - Level Up IRL</title>
        <meta name="theme-color" content="#020617" />
        <meta
          name="description"
          content="A cinematic operating system for discipline. Turn habits into quests, weeks into raids, years into rank-ups."
        />
      </Helmet>
      <main className="relative min-h-screen bg-void text-foreground">
        <Atmosphere />
        <Boot reduced={reduced} />
        <Nav />
        <Hero reduced={reduced || !ready} />
        <SystemMessage />
        <Classes />
        <Loop />
        <Hexagon />
        <PenaltyZone />
        <Proof />
        <Summon reduced={reduced || !ready} />
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
