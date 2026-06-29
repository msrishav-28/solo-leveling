import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { ATTRIBUTES, progressForXp } from '../lib/gamification';

/** Map a raw `users` row into the shape the UI consumes. */
function mapStats(row) {
  const progress = progressForXp(row?.total_xp ?? 0);
  return {
    id: row?.id,
    name: row?.hunter_name || 'Hunter',
    class: row?.class || null,
    title: row?.title || null,
    rank: row?.current_rank || progress.rank,
    level: row?.level ?? progress.level,
    gold: row?.gold ?? 0,
    currentXP: row?.total_xp ?? 0,
    levelXP: progress.levelXP,
    nextLevelXP: progress.nextLevelXP,
    xpIntoLevel: progress.xpIntoLevel,
    xpForLevel: progress.xpForLevel,
    xpPercent: progress.percent,
    streak: row?.current_streak ?? 0,
    maxStreak: row?.max_streak ?? 0,
    attributes: ATTRIBUTES.map((a) => ({
      name: a.id,
      label: a.name,
      value: row?.[a.column] ?? 10,
      icon: a.icon,
    })),
  };
}

export const usePlayerStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!user) {
      setStats(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) setStats(mapStats(data));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetchStats();

    if (!user) return undefined;

    // Realtime: reflect server-side XP/level/streak changes instantly.
    const channel = supabase
      .channel(`users:${user.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${user.id}` },
        (payload) => setStats(mapStats(payload.new))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchStats]);

  return { stats, loading, refetch: fetchStats };
};
