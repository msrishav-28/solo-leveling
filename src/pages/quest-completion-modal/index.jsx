import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import useSystemSound from '../../hooks/useSystemSound';

const QuestCompletionModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playLevelUp } = useSystemSound();

  const mockQuest = location?.state?.quest || {
    id: 'quest_001',
    title: 'Daily Training: Strength',
    description: 'Complete 100 Pushups to maintain physical condition.',
    difficulty: 'Normal',
    baseXP: 100,
    type: 'daily',
  };

  const [timeSpent, setTimeSpent] = useState(0);
  const [difficulty, setDifficulty] = useState(mockQuest.difficulty);

  const rewardXP = Math.floor(mockQuest.baseXP * (difficulty === 'Hard' ? 1.5 : difficulty === 'Easy' ? 0.8 : 1));

  const handleComplete = () => {
    playLevelUp();
    navigate('/reward-screen', { state: { quest: mockQuest, totalXP: 150 } });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-y-auto bg-void p-4 text-foreground">
      <SystemBackground tone="mana" intensity={0.8} />
      <div className="pointer-events-none fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <SystemBox variant="primary" className="relative z-10 w-full max-w-2xl overflow-hidden bg-void/95" animated={false} scanline>
        <div className="relative border-b border-hairline p-6 text-center sm:p-8">
          <div className="mx-auto mb-5 inline-flex border border-mana/45 bg-mana/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-mana">
            Quest Complete
          </div>
          <h1 className="font-display text-glow-soft text-3xl text-foreground sm:text-5xl">{mockQuest.title}</h1>
          <p className="mx-auto mt-4 max-w-md font-mono text-sm text-foreground/55">{mockQuest.description}</p>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="system-label">Time Elapsed</label>
              <div className="flex items-center justify-between border border-hairline bg-white/[0.03] p-4">
                <span className="font-mono text-3xl font-bold tabular-nums text-foreground">{timeSpent}m</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setTimeSpent(Math.max(0, timeSpent - 5))} className="border border-hairline p-2 text-mana hover:bg-mana/10">
                    <Icon name="Minus" className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => setTimeSpent(timeSpent + 5)} className="border border-hairline p-2 text-mana hover:bg-mana/10">
                    <Icon name="Plus" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="system-label">Difficulty</label>
              <div className="grid grid-cols-3 gap-px bg-hairline">
                {['Easy', 'Normal', 'Hard'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`bg-void py-4 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                      difficulty === d ? 'bg-mana text-void' : 'text-foreground/45 hover:text-mana'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden border border-mana/30 bg-gradient-to-r from-mana/10 to-transparent p-6">
            <Icon name="Trophy" className="absolute right-5 top-5 h-24 w-24 rotate-12 text-mana/10" />
            <div className="relative z-10">
              <label className="system-label text-mana/80">Reward Preview</label>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-glow text-6xl text-foreground tabular-nums">{rewardXP}</span>
                <span className="font-mono text-xl font-bold text-mana">XP</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
            <Button variant="ghost" size="lg" onClick={() => navigate('/dashboard')}>
              Close
            </Button>
            <Magnetic>
              <Button variant="default" size="lg" onClick={handleComplete} className="w-full" iconName="Gift">
                Claim Rewards
              </Button>
            </Magnetic>
          </div>
        </div>
      </SystemBox>
    </div>
  );
};

export default QuestCompletionModal;
