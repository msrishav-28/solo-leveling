import React from 'react';
import useSystemSound from '../../hooks/useSystemSound';
import Icon from '../AppIcon';
import { cn } from '../../utils/cn';

const Button = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  iconName,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) => {
  const { playClick, playHover } = useSystemSound();

  const variants = {
    default: 'border-mana bg-mana text-void shadow-[0_0_24px_rgba(0,217,255,0.22)] hover:bg-mana-glow hover:border-mana-glow',
    destructive: 'border-threat bg-threat text-white shadow-[0_0_24px_rgba(255,0,51,0.24)] hover:bg-[#ff3355]',
    outline: 'border-hairline bg-void/50 text-foreground/85 hover:border-mana hover:text-mana hover:bg-mana/10',
    secondary: 'border-white/10 bg-white/[0.04] text-foreground hover:border-mana/40 hover:bg-mana/10',
    ghost: 'border-transparent bg-transparent text-foreground/70 hover:text-mana hover:bg-mana/10',
    link: 'border-transparent bg-transparent text-mana underline-offset-4 hover:underline',
    gold: 'border-loot bg-loot text-void shadow-[0_0_24px_rgba(255,215,0,0.24)] hover:bg-white',
  };

  const sizes = {
    sm: 'h-9 px-3 text-[10px]',
    md: 'h-11 px-5 text-[11px]',
    lg: 'h-[3.25rem] px-7 py-4 text-xs',
    icon: 'h-10 w-10 p-0 text-xs',
  };

  const handleClick = (e) => {
    playClick();
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden border font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mana disabled:pointer-events-none disabled:opacity-45',
        sizes[size] || sizes.md,
        variants[variant] || variants.default,
        className
      )}
      onMouseEnter={() => playHover()}
      onClick={handleClick}
      {...props}
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-white/12 transition-transform duration-500 group-hover:scale-x-100" />
      {iconName && iconPosition === 'left' && <Icon name={iconName} className="relative mr-2 h-4 w-4 shrink-0" />}
      <span className="relative">{children}</span>
      {iconName && iconPosition === 'right' && <Icon name={iconName} className="relative ml-2 h-4 w-4 shrink-0" />}
    </button>
  );
};

export default Button;
