import { useCallback } from 'react';

const useSystemSound = () => {
    const playTone = useCallback((frequency, type, duration, volume = 0.1) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, []);

    const playHover = useCallback(() => {
        // High pitched, short "chirp"
        playTone(800, 'sine', 0.05, 0.02);
    }, [playTone]);

    const playClick = useCallback(() => {
        // Mechanical "click"
        playTone(1200, 'square', 0.05, 0.03);
        setTimeout(() => playTone(600, 'square', 0.05, 0.03), 50);
    }, [playTone]);

    const playSlash = useCallback(() => {
        // Sharp "slice" noise
        playTone(400, 'sawtooth', 0.2, 0.05);
    }, [playTone]);

    const playLevelUp = useCallback(() => {
        // Ascending arpeggio
        playTone(440, 'sine', 0.2, 0.05);
        setTimeout(() => playTone(554, 'sine', 0.2, 0.05), 100);
        setTimeout(() => playTone(659, 'sine', 0.4, 0.05), 200);
    }, [playTone]);

    return { playHover, playClick, playSlash, playLevelUp };
};

export default useSystemSound;
