import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

/** Rune Stones — permanent badges earned by clearing dungeons. */
export const useRuneStones = () => {
  const { user } = useAuth();
  const [runes, setRunes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setRunes([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('rune_stones')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false });

    setRunes(
      (data || []).map((r) => ({
        id: r.id,
        name: r.name,
        rarity: r.rarity,
        icon: r.icon || 'Gem',
        earnedAt: r.earned_at,
      }))
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  return { runes, loading, refetch: load };
};
