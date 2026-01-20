import React from 'react';
import { motion } from 'framer-motion';
import useSystemSound from '../../hooks/useSystemSound';

const SystemBox = ({
    children,
    className = "",
    variant = "primary", // primary (cyan), danger (red), gold
    onClick,
    animated = true
}) => {
    const { playHover } = useSystemSound();

    const colors = {
        primary: {
            border: "border-primary/30",
            hoverBorder: "group-hover:border-primary",
            corner: "border-primary",
            glow: "group-hover:shadow-[0_0_30px_-5px_var(--color-primary)]"
        },
        danger: {
            border: "border-destructive/30",
            hoverBorder: "group-hover:border-destructive",
            corner: "border-destructive",
            glow: "group-hover:shadow-[0_0_30px_-5px_var(--color-destructive)]"
        },
        gold: {
            border: "border-yellow-500/30",
            hoverBorder: "group-hover:border-yellow-500",
            corner: "border-yellow-500",
            glow: "group-hover:shadow-[0_0_30px_-5px_var(--color-gold)]"
        }
    };

    const currentTheme = colors[variant] || colors.primary;

    const Container = animated ? motion.div : 'div';

    return (
        <Container
            onClick={onClick}
            className={`
                relative group backdrop-blur-xl bg-background/60 
                border ${currentTheme.border}
                transition-all duration-500
                ${currentTheme.hoverBorder}
                ${currentTheme.glow}
                ${className}
            `}
            whileHover={animated ? { scale: 1.005 } : undefined}
            onMouseEnter={() => animated && playHover()}
        >
            {/* Corner Brackets */}
            {/* Top Left */}
            <div className={`absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 ${currentTheme.corner} opacity-60 group-hover:opacity-100 transition-opacity`} />
            {/* Top Right */}
            <div className={`absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 ${currentTheme.corner} opacity-60 group-hover:opacity-100 transition-opacity`} />
            {/* Bottom Left */}
            <div className={`absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 ${currentTheme.corner} opacity-60 group-hover:opacity-100 transition-opacity`} />
            {/* Bottom Right */}
            <div className={`absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 ${currentTheme.corner} opacity-60 group-hover:opacity-100 transition-opacity`} />

            {children}
        </Container>
    );
};

export default SystemBox;
