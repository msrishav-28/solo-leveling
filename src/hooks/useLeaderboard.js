import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

/**
 * Global hunter ranking. Reads via the `get_leaderboard` SECURITY DEFINER RPC,
 * which is the only way to see other players' public stats past the per-row RLS
 * on the users table. Never exposes email or other private columns.
 */
export const useLeaderboard = (limit = 50) => {
  const { user } = useAuth();
  const [hunters, setHunters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: rpcError } = await supabase.rpc('get_leaderboard', { limit_count: limit });

    if (rpcError) {
      setError(rpcError.message);
      setHunters([]);
    } else {
      setError(null);
      setHunters(
        (data || []).map((h, index) => ({
          id: h.id,
          rank: index + 1,
          name: h.hunter_name || 'Unknown Hunter',
          level: h.level,
          tier: h.current_rank,
          xp: h.total_xp,
          streak: h.current_streak,
          isCurrentUser: user ? h.id === user.id : false,
        }))
      );
    }
    setLoading(false);
  }, [limit, user]);

  useEffect(() => {
    load();
  }, [load]);

  return { hunters, loading, error, refetch: load };
};
