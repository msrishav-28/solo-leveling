import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import useSystemSound from '../../hooks/useSystemSound';
import { ATTRIBUTES } from '../../lib/gamification';

const QuestCompletionModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playLevelUp } = useSystemSound();

  // The reward is computed server-side by complete_quest and handed here via
  // navigation state. Visiting this route directly has nothing to show.
  const reward = location.state?.reward;
  const questTitle = location.state?.questTitle || reward?.quest_title || 'Quest';

  useEffect(() => {
    if (reward) playLevelUp();
  }, [reward, playLevelUp]);

  useEffect(() => {
    if (!reward) navigate('/dashboard', { replace: true });
  }, [reward, navigate]);

  if (!reward) return null;

  const buffedAttributes = (reward.attributes || [])
    .map((id) => ATTRIBUTES.find((a) => a.id === id))
    .filter(Boolean);

  const handleClaim = () => {
    navigate('/reward-screen', { state: { reward, questTitle } });
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
          <h1 className="font-display text-glow-soft text-3xl text-foreground sm:text-5xl">{questTitle}</h1>
          <p className="mx-auto mt-4 max-w-md font-mono text-sm text-foreground/55">
            [SYSTEM]: Objective cleared. Absorbing residual mana...
          </p>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <div className="relative overflow-hidden border border-mana/30 bg-gradient-to-r from-mana/10 to-transparent p-6">
            <Icon name="Trophy" className="absolute right-5 top-5 h-24 w-24 rotate-12 text-mana/10" />
            <div className="relative z-10">
              <label className="system-label text-mana/80">XP Absorbed</label>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-glow text-6xl text-foreground tabular-nums">+{reward.xp_gained}</span>
                <span className="font-mono text-xl font-bold text-mana">XP</span>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-hairline sm:grid-cols-3">
            <div className="bg-void/85 p-4 text-center">
              <Icon name="Coins" className="mx-auto mb-2 h-5 w-5 text-loot" />
              <div className="font-mono text-2xl font-bold tabular-nums text-foreground">+{reward.gold_gained}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">Gold</div>
            </div>
            <div className="bg-void/85 p-4 text-center">
              <Icon name="Flame" className="mx-auto mb-2 h-5 w-5 text-loot" />
              <div className="font-mono text-2xl font-bold tabular-nums text-foreground">{reward.streak}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">Day Streak</div>
            </div>
            <div className="bg-void/85 p-4 text-center">
              <Icon name="TrendingUp" className="mx-auto mb-2 h-5 w-5 text-mana" />
              <div className="font-mono text-2xl font-bold tabular-nums text-foreground">LVL {reward.level}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">Rank {reward.rank}</div>
            </div>
          </div>

          {buffedAttributes.length > 0 && (
            <div className="space-y-3">
              <label className="system-label">Attributes Reinforced</label>
              <div className="flex flex-wrap gap-2">
                {buffedAttributes.map((attr) => (
                  <span key={attr.id} className="inline-flex items-center gap-2 border border-mana/30 bg-mana/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-mana">
                    <Icon name={attr.icon} className="h-3.5 w-3.5" />
                    {attr.name} +1
                  </span>
                ))}
              </div>
            </div>
          )}

          {reward.leveled_up && (
            <div className="border border-loot/40 bg-loot/10 p-3 text-center font-mono text-xs uppercase tracking-[0.18em] text-loot">
              [ System ] You have leveled up — now Level {reward.level}, Rank {reward.rank}.
            </div>
          )}

          {(reward.achievements_unlocked || []).length > 0 && (
            <div className="space-y-3">
              <label className="system-label text-loot/80">Achievements Unlocked</label>
              <div className="space-y-2">
                {reward.achievements_unlocked.map((a) => (
                  <div key={a.code} className="flex items-center gap-3 border border-loot/30 bg-loot/[0.06] p-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center border border-loot/40 bg-loot/10 text-loot">
                      <Icon name={a.icon || 'Trophy'} className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">{a.title}</div>
                    </div>
                    <div className="font-mono text-xs font-bold text-loot">+{a.xp_reward} XP</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
            <Button variant="ghost" size="lg" onClick={() => navigate('/dashboard')}>
              Close
            </Button>
            <Magnetic>
              <Button variant="default" size="lg" onClick={handleClaim} className="w-full" iconName="Gift">
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
