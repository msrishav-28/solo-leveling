import React from 'react';
import { motion } from 'framer-motion';
import useSystemSound from '../../hooks/useSystemSound';
import { cn } from '../../utils/cn';

const THEMES = {
  primary: {
    border: 'border-mana/20',
    corner: 'border-mana',
    line: 'via-mana',
    glow: 'hover:shadow-system-strong',
  },
  danger: {
    border: 'border-threat/25',
    corner: 'border-threat',
    line: 'via-threat',
    glow: 'hover:shadow-system-danger',
  },
  gold: {
    border: 'border-loot/30',
    corner: 'border-loot',
    line: 'via-loot',
    glow: 'hover:shadow-system-loot',
  },
  shadow: {
    border: 'border-purple-400/25',
    corner: 'border-purple-400',
    line: 'via-purple-400',
    glow: 'hover:shadow-[0_0_34px_rgba(168,85,247,0.22)]',
  },
};

const SystemBox = ({
  children,
  className = '',
  variant = 'primary',
  onClick,
  animated = true,
  scanline = false,
}) => {
  const { playHover } = useSystemSound();
  const theme = THEMES[variant] || THEMES.primary;
  const Container = animated ? motion.div : 'div';
  const motionProps = animated
    ? {
      whileHover: { scale: 1.004 },
      transition: { type: 'spring', stiffness: 200, damping: 22, mass: 0.35 },
    }
    : {};

  return (
    <Container
      onClick={onClick}
      className={cn(
        'group relative border bg-void/70 backdrop-blur-xl transition-all duration-500',
        'shadow-[inset_0_1px_0_rgba(0,217,255,0.08),0_30px_80px_-44px_rgba(0,217,255,0.35)]',
        theme.border,
        theme.glow,
        scanline && 'scanline',
        onClick && 'cursor-pointer',
        className
      )}
      {...motionProps}
      onMouseEnter={() => animated && playHover()}
    >
      <div className={cn('pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent to-transparent opacity-70', theme.line)} />
      <div className={cn('pointer-events-none absolute -top-px -left-px h-3 w-3 border-l-2 border-t-2 opacity-70 transition-opacity group-hover:opacity-100', theme.corner)} />
      <div className={cn('pointer-events-none absolute -top-px -right-px h-3 w-3 border-r-2 border-t-2 opacity-70 transition-opacity group-hover:opacity-100', theme.corner)} />
      <div className={cn('pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 opacity-70 transition-opacity group-hover:opacity-100', theme.corner)} />
      <div className={cn('pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 opacity-70 transition-opacity group-hover:opacity-100', theme.corner)} />
      {children}
    </Container>
  );
};

export default SystemBox;
