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

  // Loading State
  if (statsLoading || questsLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-primary font-mono animate-pulse">
        INITIALIZING SYSTEM...
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

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative selection:bg-cyan-500 selection:text-black">
      {/* 1. The 'System' Background */}
      <SystemBackground />
      {/* 2. Global Noise Overlay via CSS class */}
      <div className="bg-noise" />

      <Header user={displayStats} onNavigate={handleNavigate} />

      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10 max-w-7xl">

        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-primary/20">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-6xl font-heading font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]">
              <TextReveal text={`SYSTEM ONLINE: ${displayStats?.name}`} />
            </h1>
            <div className="flex items-center space-x-6 text-primary/80 font-mono text-xs tracking-widest">
              <span>{formatDate(currentTime).toUpperCase()}</span>
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* SHADOW EXTRACTION BUTTON */}
            <Magnetic>
              <Button
                variant="ghost"
                onClick={() => setIsShadowModalOpen(true)}
                iconName="Users"
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 font-mono text-xs uppercase tracking-widest"
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
                className="border-primary/20 bg-background/20 text-primary hover:bg-primary/10 backdrop-blur-md font-mono text-xs uppercase tracking-widest"
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
                className="bg-primary text-black font-bold hover:bg-primary/90 shadow-[0_0_20px_-5px_var(--color-primary)] font-mono text-xs uppercase tracking-widest px-8"
              >
                Initialize Quest
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* Player Stats Section */}
        <SystemBox className="p-1">
          <PlayerStats player={displayStats} />
        </SystemBox>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Quest List */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary block shadow-[0_0_10px_rgba(0,217,255,1)]"></span>
                ACTIVE DIRECTIVES
              </h2>
            </div>
            {/* SystemBox wrapper for the list */}
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
