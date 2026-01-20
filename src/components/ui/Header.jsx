import React from 'react';
import Icon from '../AppIcon';

const Header = ({ user, onNavigate }) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
                    <Icon name="Sword" className="h-6 w-6 text-cyan-400" />
                    <span className="font-heading font-black text-xl tracking-tighter text-white">
                        SOLO LEVELING <span className="text-cyan-400">HABIT</span>
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-6 mr-4">
                        <nav className="flex gap-4">
                            <button onClick={() => onNavigate('/dashboard')} className="text-sm font-mono text-cyan-400/80 hover:text-cyan-400 uppercase tracking-widest">Dashboard</button>
                            <button onClick={() => onNavigate('/dungeon/1')} className="text-sm font-mono text-white/60 hover:text-white uppercase tracking-widest">Dungeons</button>
                            <button className="text-sm font-mono text-white/60 hover:text-white uppercase tracking-widest">Shadows</button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-bold text-white leading-none">{user?.name || 'Hunter'}</div>
                            <div className="text-[10px] font-mono text-cyan-400">LVL {user?.level || 1}</div>
                        </div>
                        <div className="h-8 w-8 rounded bg-cyan-950 border border-cyan-500/30 flex items-center justify-center">
                            <Icon name="User" className="h-4 w-4 text-cyan-400" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
