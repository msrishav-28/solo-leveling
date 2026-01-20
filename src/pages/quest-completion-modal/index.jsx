import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SystemBox from '../../components/cinematic/SystemBox';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import useSystemSound from '../../hooks/useSystemSound';

const QuestCompletionModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playClick, playLevelUp } = useSystemSound();

  const mockQuest = location?.state?.quest || {
    id: "quest_001",
    title: "Daily Training: Strength",
    description: "Complete 100 Pushups to maintain physical condition.",
    difficulty: "Normal",
    baseXP: 100,
    type: "daily"
  };

  const [timeSpent, setTimeSpent] = useState(0);
  const [difficulty, setDifficulty] = useState(mockQuest.difficulty);

  const handleComplete = () => {
    playLevelUp();
    // Navigate to Reward Screen instead of simple dashboard return
    navigate('/reward-screen', { state: { quest: mockQuest, totalXP: 150 } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <SystemBox
        variant="primary"
        className="w-full max-w-2xl overflow-hidden shadow-[0_0_100px_rgba(0,217,255,0.2)]"
      >
        {/* Header */}
        <div className="bg-cyan-950/30 p-8 border-b border-cyan-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-50" />
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 mb-4 border border-cyan-500/50 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              QUEST COMPLETE
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]">
              {mockQuest.title}
            </h1>
            <p className="text-cyan-400/60 font-mono text-sm max-w-md mx-auto">
              {mockQuest.description}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8 bg-black/40">
          <div className="grid grid-cols-2 gap-6">
            {/* Time Track */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-600 uppercase tracking-widest">TIME ELAPSED</label>
              <div className="p-4 border border-cyan-900/40 bg-cyan-950/10 rounded flex items-center justify-between">
                <span className="font-mono text-2xl text-white font-bold">{timeSpent}m</span>
                <div className="flex gap-2">
                  <button onClick={() => setTimeSpent(Math.max(0, timeSpent - 5))} className="p-1 hover:bg-cyan-500/20 rounded text-cyan-400"><Icon name="Minus" className="w-4 h-4" /></button>
                  <button onClick={() => setTimeSpent(timeSpent + 5)} className="p-1 hover:bg-cyan-500/20 rounded text-cyan-400"><Icon name="Plus" className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Calibration */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-600 uppercase tracking-widest">DIFFICULTY</label>
              <div className="flex border border-cyan-900/40 rounded overflow-hidden">
                {['Easy', 'Normal', 'Hard'].map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-3 text-xs font-bold uppercase transition-colors ${difficulty === d ? 'bg-cyan-500 text-black' : 'bg-transparent text-cyan-800 hover:text-cyan-400'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rewards Preview */}
          <div className="p-6 border border-cyan-500/30 bg-gradient-to-r from-cyan-950/20 to-transparent rounded relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Icon name="Trophy" className="w-24 h-24 text-cyan-500 transform rotate-12" />
            </div>
            <div className="relative z-10">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 block">REWARD PREVIEW</label>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_cyan]">
                  {Math.floor(mockQuest.baseXP * (difficulty === 'Hard' ? 1.5 : difficulty === 'Easy' ? 0.8 : 1))}
                </span>
                <span className="text-xl font-mono text-cyan-500 font-bold">XP</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-4 text-cyan-700 hover:text-cyan-400 font-mono uppercase tracking-widest"
            >
              Close
            </Button>
            <Magnetic>
              <Button
                onClick={handleComplete}
                className="flex-[2] py-6 bg-cyan-500 hover:bg-cyan-400 text-black font-black tracking-widest text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                CLAIM REWARDS
              </Button>
            </Magnetic>
          </div>
        </div>
      </SystemBox>
    </div>
  );
};

export default QuestCompletionModal;