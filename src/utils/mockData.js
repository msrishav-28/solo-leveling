export const playerData = {
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

export const questsData = [
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

export const achievementsData = [
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

export const remindersData = [
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

export const quickStatsData = {
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
