import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import TextReveal from '../../components/cinematic/TextReveal';
import SlashEffect from '../../components/cinematic/SlashEffect';

const Dungeon = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [slashingId, setSlashingId] = useState(null);

    // Mock Dungeon Data (In a real app, fetch based on ID)
    const [dungeonData, setDungeonData] = useState({
        name: "The Refactoring Raid",
        description: "Eliminate technical debt and modernize the codebase before deployment.",
        difficulty: "S-Rank",
        bossHP: 1000,
        currentHP: 650,
        minions: [
            { id: 1, name: "Fix Lint Warnings", hp: 100, completed: true, xp: 50 },
            { id: 2, name: "Optimize Images", hp: 150, completed: false, xp: 75 },
            { id: 3, name: "Unit Tests Coverage", hp: 300, completed: false, xp: 150 },
            { id: 4, name: "Documentation", hp: 100, completed: false, xp: 50 },
        ]
    });

    const handleSlash = (minionId) => {
        setSlashingId(minionId);
        setTimeout(() => {
            setDungeonData(prev => {
                const updatedMinions = prev.minions.map(m =>
                    m.id === minionId ? { ...m, completed: true } : m
                );
                // Calculate damage to boss
                const damage = prev.minions.find(m => m.id === minionId)?.hp || 0;
                return {
                    ...prev,
                    minions: updatedMinions,
                    currentHP: Math.max(0, prev.currentHP - damage)
                };
            });
            setSlashingId(null);
        }, 600);
    };

    const bossHealthPercentage = (dungeonData.currentHP / dungeonData.bossHP) * 100;

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-red-500 selection:text-black">
            {/* Red-tinted System Background for 'Danger' Mode */}
            <div className="fixed inset-0 z-0 pointer-events-none filter hue-rotate-180 brightness-75">
                <SystemBackground />
            </div>
            <div className="bg-noise" />

            {/* Header */}
            <header className="relative z-10 p-6 flex items-center justify-between border-b border-red-500/20 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" iconName="ArrowLeft" onClick={() => navigate('/dashboard')} className="text-red-400 hover:text-red-300">
                        RETREAT
                    </Button>
                    <h1 className="text-2xl font-heading font-black text-red-500 tracking-tight">
                        DUNGEON RAID
                    </h1>
                </div>
                <div className="text-xs font-mono text-red-400/60">
                    ID: {id} // DIFF: {dungeonData.difficulty}
                </div>
            </header>

            <main className="relative z-10 container mx-auto px-4 py-8 max-w-5xl space-y-12">

                {/* BOSS SECTION */}
                <section className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block"
                    >
                        <div className="text-red-500 font-mono text-sm tracking-[0.5em] mb-2 uppercase">Current Objective</div>
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-white drop-shadow-[0_0_25px_rgba(220,38,38,0.8)]">
                            {dungeonData.name}
                        </h2>
                        <p className="text-red-200/60 max-w-2xl mx-auto mt-4 text-lg">
                            {dungeonData.description}
                        </p>
                    </motion.div>

                    {/* BOSS HEALTH BAR */}
                    <div className="max-w-3xl mx-auto relative">
                        <div className="flex justify-between text-xs font-mono text-red-400 mb-2 uppercase tracking-widest">
                            <span>Boss Health</span>
                            <span>{dungeonData.currentHP} / {dungeonData.bossHP} HP</span>
                        </div>
                        <div className="h-6 w-full bg-red-900/30 border border-red-500/30 rounded-full overflow-hidden relative shadow-[0_0_15px_-5px_rgba(220,38,38,0.5)]">
                            <motion.div
                                className="h-full bg-gradient-to-r from-red-600 to-red-500 relative"
                                initial={{ width: "100%" }}
                                animate={{ width: `${bossHealthPercentage}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                            >
                                {/* Animated shine effect on bar */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 skew-x-12 animate-shimmer" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* MINIONS (Sub-tasks) */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {dungeonData.minions.map((minion) => (
                            <motion.div
                                key={minion.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative"
                            >
                                <SystemBox
                                    variant="danger"
                                    className={`p-6 flex items-center justify-between group h-full ${minion.completed ? 'opacity-40 grayscale' : 'hover:bg-red-950/20'}`}
                                    animated={!minion.completed}
                                >
                                    {/* Slash Overlay */}
                                    {slashingId === minion.id && <SlashEffect />}

                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${minion.completed ? 'border-gray-700 bg-gray-900' : 'border-red-500/30 bg-red-500/10'}`}>
                                            <Icon name={minion.completed ? "Skull" : "Zap"} className={minion.completed ? "text-gray-500" : "text-red-400"} />
                                        </div>
                                        <div>
                                            <h4 className={`font-heading text-lg ${minion.completed ? 'text-gray-400 line-through' : 'text-red-100'}`}>
                                                {minion.name}
                                            </h4>
                                            <div className="text-xs font-mono text-red-500/60">
                                                HP: {minion.hp} // XP: +{minion.xp}
                                            </div>
                                        </div>
                                    </div>

                                    {!minion.completed && (
                                        <button
                                            onClick={() => handleSlash(minion.id)}
                                            className="px-4 py-2 rounded border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]"
                                        >
                                            Strike
                                        </button>
                                    )}
                                    {minion.completed && (
                                        <span className="text-xs font-mono text-gray-500">[ELIMINATED]</span>
                                    )}
                                </SystemBox>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </section>

            </main>
        </div>
    );
};

export default Dungeon;
