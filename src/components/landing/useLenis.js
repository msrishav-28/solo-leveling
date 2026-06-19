import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let frameId = 0;

    const tick = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [enabled]);
}
