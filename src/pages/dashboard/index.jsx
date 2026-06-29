import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PlayerStats from './components/PlayerStats';
import QuestList from './components/QuestList';
import RecentAchievements from './components/RecentAchievements';
import UpcomingReminders from './components/UpcomingReminders';
import QuickStats from './components/QuickStats';

// Cinematic Components
import SystemBackground from '../../components/cinematic/SystemBackground';
import Magnetic from '../../components/cinematic/Magnetic';
import TextReveal from '../../components/cinematic/TextReveal';
import SystemBox from '../../components/cinematic/SystemBox';
import ShadowExtractionModal from '../../components/cinematic/ShadowExtractionModal';
import { usePlayerStats } from '../../hooks/usePlayerStats';
import { useQuests } from '../../hooks/useQuests';
import { useDashboard } from '../../hooks/useDashboard';
import { usePenalty } from '../../hooks/usePenalty';
import { useRuneStones } from '../../hooks/useRuneStones';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import PenaltyBanner from './components/PenaltyBanner';
import RuneStones from './components/RuneStones';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isShadowModalOpen, setIsShadowModalOpen] = useState(false);

  // Supabase Hooks
  const { signOut } = useAuth();
  const { toast } = useToast();
  const { stats: playerStats, loading: statsLoading } = usePlayerStats();
  const { quests, loading: questsLoading, completeQuest } = useQuests();
  const { quickStats, achievements } = useDashboard(playerStats);
  const { penalty, survivalQuestId, justTriggered, recheck: recheckPenalty } = usePenalty();
  const { runes } = useRuneStones();

  // Announce a freshly-triggered Penalty Zone
  useEffect(() => {
    if (justTriggered) {
      toast({
        variant: 'danger',
        title: 'Penalty Zone',
        message: 'You missed a quest. Clear the Survival Quest to restore XP gain.',
        icon: 'AlertTriangle',
      });
    }
  }, [justTriggered, toast]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Loading State
  if (statsLoading || questsLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void text-mana">
        <SystemBackground />
        <div className="glass scanline relative z-10 px-8 py-6 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
          Initializing System...
        </div>
      </div>
    );
  }

  // Fallback if no user stats found yet (fresh account)
  const displayStats = playerStats || {
    name: 'Hunter',
    level: 1,
    rank: 'E',
    currentXP: 0,
    levelXP: 1000,
    nextLevelXP: 2000,
    streak: 0,
    attributes: []
  };

  // Real, Supabase-backed side-panel data
  const dashboardQuickStats = quickStats || {
    totalQuests: 0,
    completedToday: 0,
    weeklyStreak: displayStats?.streak ?? 0,
    totalXP: displayStats?.currentXP ?? 0,
    weeklyProgress: 0,
  };

  const reminders = (quests || [])
    .filter((q) => !q.completed && q.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5)
    .map((q) => ({
      id: q.id,
      questTitle: q.title,
      questType: q.type,
      scheduledTime: q.deadline,
    }));

  const handleCompleteQuest = async (questId) => {
    const quest = (quests || []).find((q) => q.id === questId);
    const result = await completeQuest(questId);

    if (!result || result.error) {
      const msg = result?.error || 'Something went wrong.';
      if (msg.includes('PENALTY_ACTIVE')) {
        toast({
          variant: 'danger',
          title: 'XP Locked',
          message: 'Clear your Survival Quest before completing others.',
          icon: 'ShieldAlert',
        });
        recheckPenalty();
      } else {
        toast({ variant: 'danger', title: 'System Error', message: msg, icon: 'AlertTriangle' });
      }
      return;
    }

    // Achievement unlock toasts
    (result.achievements_unlocked || []).forEach((a) => {
      toast({
        variant: 'gold',
        title: 'Achievement Unlocked',
        message: `${a.title}  (+${a.xp_reward} XP)`,
        icon: a.icon || 'Trophy',
      });
    });

    if (result.master_bonus > 0) {
      toast({ variant: 'mana', title: 'Shadow Tribute', message: `Your Master absorbed +${result.master_bonus} XP.`, icon: 'Ghost' });
    }

    // A Survival Quest clears the Penalty Zone — stay on the dashboard.
    if (result.is_survival) {
      toast({ variant: 'mana', title: 'System Restored', message: 'Penalty Zone cleared. XP gain re-enabled.', icon: 'ShieldCheck' });
      recheckPenalty();
      return;
    }

    navigate('/quest-completion-modal', {
      state: { reward: result, questTitle: quest?.title || result.quest_title },
    });
  };

  const handleEditQuest = (questId) => {
    navigate('/quest-creation-modal', { state: { questId, mode: 'edit' } });
  };

  const handleCreateQuest = () => {
    navigate('/quest-creation-modal');
  };

  const handleViewLeaderboard = () => {
    navigate('/leaderboard');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen bg-void text-foreground overflow-hidden relative selection:bg-mana selection:text-void ${penalty ? 'penalty-zone' : ''}`}>
      <SystemBackground tone={penalty ? 'danger' : 'mana'} />

      <Header user={displayStats} onNavigate={handleNavigate} onSignOut={handleSignOut} />

      <main className="relative z-10 mx-auto max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-10">

        {/* Welcome Section */}
        <div className="flex flex-col gap-6 border-b border-hairline pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="system-label">Hunter Console</div>
            <h1 className="font-display text-glow text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.88] text-foreground">
              <TextReveal text={`SYSTEM ONLINE: ${displayStats?.name}`} />
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-mana/70">
              <span>{formatDate(currentTime).toUpperCase()}</span>
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <Button
                variant="secondary"
                onClick={() => setIsShadowModalOpen(true)}
                iconName="Users"
              >
                Shadow Army
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="outline"
                onClick={() => navigate('/dungeons')}
                iconName="Swords"
                iconPosition="left"
              >
                Dungeons
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="outline"
                onClick={handleViewLeaderboard}
                iconName="Trophy"
                iconPosition="left"
              >
                Leaderboard
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="default"
                onClick={handleCreateQuest}
                iconName="Plus"
                iconPosition="left"
              >
                Initialize Quest
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* Penalty Zone */}
        {penalty && (
          <PenaltyBanner
            survivalQuestId={survivalQuestId}
            onExecute={handleCompleteQuest}
          />
        )}

        {/* Player Stats Section */}
        <SystemBox className="p-1" scanline>
          <PlayerStats player={displayStats} />
        </SystemBox>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Quest List */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <h2 className="flex items-center gap-3 font-display text-2xl text-foreground">
                <span className="block h-6 w-px bg-mana shadow-[0_0_10px_rgba(0,217,255,1)]"></span>
                ACTIVE DIRECTIVES
              </h2>
            </div>
            <QuestList
              quests={quests}
              onCompleteQuest={handleCompleteQuest}
              onEditQuest={handleEditQuest}
            />
          </div>

          {/* Side Panel - Using SystemBox for homogeneity */}
          <div className="space-y-6">
            <SystemBox className="p-6">
              <QuickStats stats={dashboardQuickStats} />
            </SystemBox>
            <SystemBox className="p-6" variant="primary">
              <RecentAchievements achievements={achievements} />
            </SystemBox>
            <SystemBox className="p-6">
              <UpcomingReminders reminders={reminders} />
            </SystemBox>
            {runes.length > 0 && (
              <SystemBox className="p-6" variant="gold">
                <RuneStones runes={runes} />
              </SystemBox>
            )}
          </div>
        </div>
      </main>

      {/* Mobile spacing */}
      <div className="h-20 md:hidden"></div>

      {/* MODALS */}
      <ShadowExtractionModal
        isOpen={isShadowModalOpen}
        onClose={() => setIsShadowModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
