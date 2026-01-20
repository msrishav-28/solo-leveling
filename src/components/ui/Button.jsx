import React from 'react';
import useSystemSound from '../../hooks/useSystemSound';
import Icon from '../AppIcon';

const Button = ({
    children,
    variant = 'default',
    className = '',
    iconName,
    iconPosition = 'left',
    onClick,
    ...props
}) => {
    const { playClick, playHover } = useSystemSound();

    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";

    const variants = {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
    };

    const handleClick = (e) => {
        playClick();
        if (onClick) onClick(e);
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
            onMouseEnter={() => playHover()}
            onClick={handleClick}
            {...props}
        >
            {iconName && iconPosition === 'left' && <Icon name={iconName} className="mr-2 h-4 w-4" />}
            {children}
            {iconName && iconPosition === 'right' && <Icon name={iconName} className="ml-2 h-4 w-4" />}
        </button>
    );
};

export default Button;
