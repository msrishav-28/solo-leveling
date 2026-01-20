import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useSystemSound from '../../hooks/useSystemSound';

const SlashEffect = ({ onComplete }) => {
    const { playSlash } = useSystemSound();

    useEffect(() => {
        playSlash();
    }, [playSlash]);

    return (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M -10,110 L 110,-10"
                    stroke="#ffffff"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onAnimationComplete={onComplete}
                    style={{ filter: "drop-shadow(0 0 10px #00d9ff)" }}
                />
                <motion.path
                    d="M -15,115 L 105,-5"
                    stroke="#00d9ff"
                    strokeWidth="10"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                    style={{ filter: "blur(5px)" }}
                />
            </svg>

            {/* Flash */}
            <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.2, delay: 0.1 }}
            />
        </div>
    );
};

export default SlashEffect;
