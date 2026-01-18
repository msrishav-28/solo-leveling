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

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock player data (same as before)
  const playerData = {
    name: "Shadow Hunter",
    level: 15,
    rank: "C",
    currentXP: 8750,
    levelXP: 8000,
    nextLevelXP: 10000,
    streak: 12,
    attributes: [
      { name: "STR", value: 45, icon: "Sword" },
      { name: "INT", value: 38, icon: "Brain" },
      { name: "CON", value: 42, icon: "Shield" },
      { name: "DEX", value: 35, icon: "Zap" },
      { name: "CHA", value: 28, icon: "Users" },
      { name: "LUK", value: 31, icon: "Clover" }
    ]
  };

  // Mock quests data (same as before)
  const questsData = [
    {
      id: 1,
      title: "Morning Meditation",
      description: "Practice mindfulness meditation for 15 minutes to increase focus and mental clarity.",
      type: "daily",
      difficulty: "Easy",
      linkedAttributes: ["INT", "CON"],
      xpReward: 150,
      completed: false,
      timeTracked: null,
      schedule: "Daily at 7:00 AM"
    },
    {
      id: 2,
      title: "Strength Training Workout",
      description: "Complete a full-body strength training session focusing on compound movements.",
      type: "recurring",
      difficulty: "Hard",
      linkedAttributes: ["STR", "CON"],
      xpReward: 300,
      completed: false,
      timeTracked: null,
      schedule: "Monday, Wednesday, Friday at 6:00 PM"
    },
    {
      id: 3,
      title: "Read Programming Book",
      description: "Read at least 20 pages of 'Clean Code' to improve software development skills.",
      type: "daily",
      difficulty: "Normal",
      linkedAttributes: ["INT"],
      xpReward: 200,
      completed: true,
      timeTracked: "45 minutes",
      schedule: "Daily at 9:00 PM"
    },
    {
      id: 4,
      title: "Network with Colleagues",
      description: "Reach out to 3 professional contacts to maintain and build relationships.",
      type: "recurring",
      difficulty: "Normal",
      linkedAttributes: ["CHA"],
      xpReward: 180,
      completed: false,
      timeTracked: null,
      schedule: "Weekly on Fridays"
    },
    {
      id: 5,
      title: "Complete Project Proposal",
      description: "Finish writing the comprehensive project proposal for the new client initiative.",
      type: "one-time",
      difficulty: "Hard",
      linkedAttributes: ["INT", "CHA"],
      xpReward: 500,
      completed: false,
      timeTracked: null,
      schedule: "Due: November 10, 2025"
    }
  ];

  // Mock achievements data (same as before)
  const achievementsData = [
    {
      id: 1,
      title: "Streak Master",
      description: "Maintained a 10-day quest completion streak",
      type: "streak",
      rarity: "rare",
      xpReward: 500,
      timeEarned: "2 days ago"
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Completed 25 intelligence-based quests",
      type: "attribute",
      rarity: "epic",
      xpReward: 750,
      timeEarned: "1 week ago"
    },
    {
      id: 3,
      title: "Early Bird",
      description: "Completed morning quests for 7 consecutive days",
      type: "quest",
      rarity: "common",
      xpReward: 200,
      timeEarned: "3 days ago"
    }
  ];

  // Mock reminders data (same as before)
  const remindersData = [
    {
      id: 1,
      questTitle: "Morning Meditation",
      questType: "daily",
      scheduledTime: "2025-11-03T07:00:00",
      priority: "high",
      description: "Start your day with mindfulness"
    },
    {
      id: 2,
      questTitle: "Strength Training Workout",
      questType: "recurring",
      scheduledTime: "2025-11-03T18:00:00",
      priority: "medium",
      description: "Full-body workout session"
    },
    {
      id: 3,
      questTitle: "Read Programming Book",
      questType: "daily",
      scheduledTime: "2025-11-03T21:00:00",
      priority: "low",
      description: "Continue with Clean Code chapter 5"
    }
  ];

  // Mock quick stats data (same as before)
  const quickStatsData = {
    totalQuests: 47,
    questsChange: 5,
    completedToday: 3,
    todayChange: 1,
    weeklyStreak: 12,
    streakChange: 2,
    totalXP: 15750,
    xpChange: 850,
    weeklyProgress: 68,
    completedThisWeek: 17,
    weeklyGoal: 25
  };

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleCompleteQuest = (questId) => {
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
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500 selection:text-black">
      {/* 1. The 'System' Background (Blue Mana/Particles) */}
      <SystemBackground />

      {/* 2. System Interface Grain (Subtle) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <Header user={playerData} onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8 space-y-12 relative z-10">
        
        {/* Welcome Section - Cinematic Intro */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-cyan-500/10">
          <div className="space-y-4">
            <TextReveal 
              text={`SYSTEM ONLINE: ${playerData?.name}`} 
              className="text-4xl lg:text-6xl font-heading font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]"
            />
            <div className="flex items-center space-x-6 text-cyan-400/80 font-mono text-sm tracking-widest">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-cyan-400" />
                <span>{formatDate(currentTime).toUpperCase()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-cyan-400" />
                <span>{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Magnetic>
              <Button
                variant="outline"
                onClick={handleViewLeaderboard}
                iconName="Trophy"
                iconPosition="left"
                className="border-cyan-500/20 bg-black/20 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 font-mono text-xs uppercase tracking-widest"
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
                className="bg-cyan-500 text-black font-bold hover:bg-cyan-400 shadow-[0_0_20px_-5px_var(--color-primary)] transition-all duration-300 font-mono text-xs uppercase tracking-widest px-8"
              >
                Initialize Quest
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* Player Stats Section - System Box */}
        <div className="backdrop-blur-xl bg-[#020617]/60 border border-cyan-500/20 rounded-sm p-1 shadow-[0_0_30px_-10px_rgba(0,217,255,0.15)] overflow-hidden group hover:border-cyan-400/50 transition-colors duration-500 relative">
          {/* Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
          
          <PlayerStats player={playerData} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Quest List */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-heading font-bold tracking-tight text-white flex items-center gap-2 drop-shadow-[0_0_5px_rgba(0,217,255,0.8)]">
                 <span className="w-1.5 h-6 bg-cyan-500 block shadow-[0_0_10px_rgba(0,217,255,1)]"></span>
                 ACTIVE DIRECTIVES
               </h2>
            </div>
            <div className="backdrop-blur-md bg-black/40 border border-white/5 rounded-xl overflow-hidden relative">
               <QuestList 
                 quests={questsData}
                 onCompleteQuest={handleCompleteQuest}
                 onEditQuest={handleEditQuest}
               />
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <div className="backdrop-blur-lg bg-black/40 border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
               <QuickStats stats={quickStatsData} />
            </div>
            <div className="backdrop-blur-lg bg-black/40 border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
               <RecentAchievements achievements={achievementsData} />
            </div>
            <div className="backdrop-blur-lg bg-black/40 border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
               <UpcomingReminders reminders={remindersData} />
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile spacing */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default Dashboard;