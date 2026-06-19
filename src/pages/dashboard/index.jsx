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
import {
  achievementsData,
  remindersData,
  quickStatsData
} from '../../utils/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isShadowModalOpen, setIsShadowModalOpen] = useState(false);

  // Supabase Hooks
  const { stats: playerStats, loading: statsLoading } = usePlayerStats();
  const { quests, loading: questsLoading, completeQuest } = useQuests();

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

  // Data imported from utils/mockData

  const handleCompleteQuest = (questId) => {
    completeQuest(questId);
    navigate('/quest-completion-modal', { state: { questId } });
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
    <div className="min-h-screen bg-void text-foreground overflow-hidden relative selection:bg-mana selection:text-void">
      <SystemBackground />

      <Header user={displayStats} onNavigate={handleNavigate} />

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
              <QuickStats stats={quickStatsData} />
            </SystemBox>
            <SystemBox className="p-6" variant="primary">
              <RecentAchievements achievements={achievementsData} />
            </SystemBox>
            <SystemBox className="p-6">
              <UpcomingReminders reminders={remindersData} />
            </SystemBox>
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
