import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

const WEEKLY_GOAL = 25;

/** Compact relative time, e.g. "3d ago", "2h ago", "just now". */
function timeAgo(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

/**
 * Real, Supabase-backed aggregates for the dashboard side panels — replacing
 * the former mock data. Computes quick stats from quest_completions counts and
 * derives unlocked achievements from the global achievements table against the
 * current player's level / streak / completion totals.
 *
 * @param {object|null} stats player stats (from usePlayerStats) for level/streak.
 */
export const useDashboard = (stats) => {
  const { user } = useAuth();
  const [quickStats, setQuickStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const now = new Date();
    const startOfToday = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    ).toISOString();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [totalQuestsRes, todayRes, weekRes, achRes] = await Promise.all([
      supabase.from('quests').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase
        .from('quest_completions')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('completed_at', startOfToday),
      supabase
        .from('quest_completions')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('completed_at', weekAgo),
      supabase
        .from('user_achievements')
        .select('unlocked_at, achievements(code, title, description, rarity, xp_reward, icon)')
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false })
        .limit(8),
    ]);

    const totalQuests = totalQuestsRes.count || 0;
    const completedToday = todayRes.count || 0;
    const completedThisWeek = weekRes.count || 0;

    setQuickStats({
      totalQuests,
      completedToday,
      weeklyStreak: stats?.streak ?? 0,
      totalXP: stats?.currentXP ?? 0,
      completedThisWeek,
      weeklyGoal: WEEKLY_GOAL,
      weeklyProgress: Math.min(100, Math.round((completedThisWeek / WEEKLY_GOAL) * 100)),
    });

    const unlocked = (achRes.data || [])
      .filter((row) => row.achievements)
      .map((row) => ({
        id: row.achievements.code,
        title: row.achievements.title,
        description: row.achievements.description,
        rarity: row.achievements.rarity,
        xpReward: row.achievements.xp_reward,
        icon: row.achievements.icon,
        timeEarned: timeAgo(row.unlocked_at),
      }));

    setAchievements(unlocked);
    setLoading(false);
  }, [user, stats]);

  useEffect(() => {
    load();
  }, [load]);

  return { quickStats, achievements, loading, refetch: load };
};
