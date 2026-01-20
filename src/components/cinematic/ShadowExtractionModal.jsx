import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SystemBox from './SystemBox';
import TextReveal from './TextReveal';

const ShadowExtractionModal = ({ isOpen, onClose }) => {
    const [isArising, setIsArising] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    // Mock Shadows Data
    const shadows = [
        { id: 1, name: "IGRIS", rank: "General", date: "2025-10-15" },
        { id: 2, name: "TANK", rank: "Knight", date: "2025-10-20" },
        { id: 3, name: "IRON", rank: "Elite", date: "2025-11-01" },
    ];

    const handleArise = () => {
        setIsArising(true);

        // Simulate "Extraction" process
        setTimeout(() => {
            navigator.clipboard.writeText("https://solo-leveling-habit.app/join?ref=SHADOW_MONARCH");
            setLinkCopied(true);
            setIsArising(false);

            // Reset copy status after a few seconds
            setTimeout(() => setLinkCopied(false), 3000);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg"
            >
                <SystemBox
                    variant="primary"
                    className="p-0 overflow-hidden border-purple-500/30 bg-[#0a0a1a]/90 shadow-[0_0_50px_rgba(147,51,234,0.3)]"
                    animated={false}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-purple-500/20 bg-purple-900/10 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-heading font-black text-purple-400 tracking-tight drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                                SHADOW EXTRACTION
                            </h2>
                            <p className="text-xs font-mono text-purple-300/60 uppercase tracking-widest">
                                Expand Your Army
                            </p>
                        </div>
                        <button onClick={onClose} className="text-purple-400 hover:text-white transition-colors">
                            <Icon name="X" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">

                        {/* Main Action */}
                        <div className="text-center space-y-4">
                            <div className="relative inline-block group">
                                <div className="absolute inset-0 bg-purple-600 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                                <button
                                    onClick={handleArise}
                                    disabled={isArising}
                                    className={`
                                relative w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center
                                transition-all duration-500
                                ${isArising ? 'border-purple-400 scale-95' : 'border-purple-500 hover:scale-105 hover:bg-purple-500/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]'}
                            `}
                                >
                                    {isArising ? (
                                        <Icon name="Loader" className="w-10 h-10 text-purple-300 animate-spin" />
                                    ) : (
                                        <Icon name="Users" className="w-10 h-10 text-purple-400" />
                                    )}
                                    <span className="mt-2 font-heading font-bold text-purple-100 tracking-widest text-sm">
                                        {isArising ? "EXTRACTING..." : "ARISE"}
                                    </span>
                                </button>
                            </div>
                            <div>
                                <p className="text-sm text-purple-200/60 max-w-xs mx-auto">
                                    {linkCopied
                                        ? <span className="text-green-400 font-mono">LINK COPIED TO CLIPBOARD</span>
                                        : "Call forth new soldiers to join your ranks."
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Shadow Army List */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-mono text-purple-400/80 uppercase tracking-widest border-b border-purple-500/20 pb-2">
                                Current Army ({shadows.length})
                            </h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                {shadows.map(shadow => (
                                    <div key={shadow.id} className="flex items-center justify-between p-3 rounded bg-purple-900/10 border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-purple-900/30 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-purple-100">{shadow.name}</div>
                                                <div className="text-[10px] text-purple-400/60 font-mono">{shadow.rank} Class</div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-mono text-purple-500/40">
                                            {shadow.date}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </SystemBox>
            </motion.div>
        </div>
    );
};

export default ShadowExtractionModal;
