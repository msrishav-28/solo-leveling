import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import SystemBackground from 'components/cinematic/SystemBackground';
import TextReveal from 'components/cinematic/TextReveal';
import Magnetic from 'components/cinematic/Magnetic';

const JobChange = () => {
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState(null);
    const [step, setStep] = useState(0); // 0: Question, 1: Selection, 2: Reward

    const classes = [
        {
            id: 'tank',
            title: 'T A N K',
            stat: 'STR / CON',
            desc: 'Strength is absolute.',
            quest: 'Daily Quest: 100 Pushups',
            color: 'from-orange-500 to-red-600'
        },
        {
            id: 'mage',
            title: 'M A G E',
            stat: 'INT / WIS',
            desc: 'Knowledge is power.',
            quest: 'Daily Quest: Deep Work',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'assassin',
            title: 'A S S A S S I N',
            stat: 'AGI / SENS',
            desc: 'Speed is survival.',
            quest: 'Daily Quest: Market Research',
            color: 'from-purple-500 to-indigo-600'
        }
    ];

    const handleSelect = (classId) => {
        setSelectedClass(classId);
        setStep(2); // Go to reward
    };

    const handleComplete = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <Helmet>
                <title>Job Change Quest | The System</title>
            </Helmet>

            <div className="relative min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 overflow-hidden">
                <SystemBackground />
                <div className="bg-noise" />

                <div className="z-10 w-full max-w-4xl">
                    <AnimatePresence mode="wait">

                        {/* Step 0: The Question */}
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -50 }}
                                className="text-center space-y-12"
                            >
                                <h1 className="text-4xl md:text-6xl font-heading text-white tracking-widest leading-tight">
                                    <TextReveal text="WHAT IS YOUR DESIRE?" />
                                </h1>
                                <Magnetic>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="mt-8 px-12 py-4 bg-transparent border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 font-heading text-xl tracking-widest"
                                    >
                                        [ I SEEK POWER ]
                                    </button>
                                </Magnetic>
                            </motion.div>
                        )}

                        {/* Step 1: Class Selection */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-8"
                            >
                                <h2 className="text-2xl text-primary font-mono text-center mb-8">
                                    [SELECT_CLASS]
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {classes.map((c, i) => (
                                        <motion.div
                                            key={c.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.2 }}
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => handleSelect(c.id)}
                                            className="group cursor-pointer relative bg-background/40 backdrop-blur-md border border-white/10 hover:border-primary/50 p-8 flex flex-col gap-4 overflow-hidden"
                                        >
                                            {/* Hover Gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                            {/* Corner Brackets */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-primary transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-primary transition-colors" />

                                            <h3 className="text-2xl font-heading text-white group-hover:text-primary transition-colors">
                                                {c.title}
                                            </h3>
                                            <div className="text-xs font-mono text-white/50">
                                                TYPE: {c.stat}
                                            </div>
                                            <p className="text-sm text-white/80 italic border-l-2 border-white/20 pl-4">
                                                "{c.desc}"
                                            </p>
                                            <div className="mt-auto pt-4 text-xs font-mono text-primary">
                                                AUTO-EQUIP: {c.quest}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Reward */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center space-y-8 p-8 border border-warning/50 bg-background/80 backdrop-blur-xl relative max-w-lg mx-auto shadow-[0_0_50px_rgba(255,215,0,0.2)]"
                            >
                                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-warning" />
                                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-warning" />

                                <h2 className="text-warning text-2xl font-heading tracking-widest">
                                    QUEST COMPLETED
                                </h2>

                                <div className="space-y-4">
                                    <div className="text-white/60 font-mono text-sm">REWARD ACQUIRED</div>
                                    <div className="text-4xl font-heading text-white">
                                        PLAYER TITLE: <br />
                                        <span className="text-primary text-shadow-glow">THE AWAKENED</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-warning font-mono text-xl">
                                        <span>+</span>
                                        <span className="font-bold">100</span>
                                        <span>GOLD</span>
                                    </div>
                                </div>

                                <Magnetic>
                                    <button
                                        onClick={handleComplete}
                                        className="mt-4 px-8 py-3 bg-warning text-black font-bold font-mono hover:bg-white transition-colors"
                                    >
                                        [ ENTER SYSTEM ]
                                    </button>
                                </Magnetic>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default JobChange;
