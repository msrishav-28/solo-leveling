import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

/** A single dungeon with its ordered floors, plus the clear-floor action. */
export const useDungeon = (dungeonId) => {
  const { user } = useAuth();
  const [dungeon, setDungeon] = useState(null);
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(async () => {
    if (!user || !dungeonId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const [{ data: d }, { data: f }] = await Promise.all([
      supabase.from('dungeons').select('*').eq('id', dungeonId).eq('user_id', user.id).maybeSingle(),
      supabase
        .from('dungeon_floors')
        .select('*')
        .eq('dungeon_id', dungeonId)
        .order('floor_order', { ascending: true }),
    ]);

    if (!d) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setDungeon({
      id: d.id,
      name: d.name,
      description: d.description,
      bossName: d.boss_name,
      difficulty: d.difficulty,
      deadline: d.deadline,
      isCleared: d.is_cleared,
      clearedAt: d.cleared_at,
    });
    setFloors(
      (f || []).map((fl) => ({
        id: fl.id,
        title: fl.title,
        order: fl.floor_order,
        isCleared: fl.is_cleared,
        clearedAt: fl.cleared_at,
      }))
    );
    setLoading(false);
  }, [user, dungeonId]);

  useEffect(() => {
    load();
  }, [load]);

  /** Clear a floor; returns the RPC summary (includes reward + rune on boss kill). */
  const clearFloor = useCallback(
    async (floorId) => {
      const { data, error } = await supabase.rpc('clear_floor', { p_floor: floorId });
      if (error) return { error: error.message };
      await load();
      return data;
    },
    [load]
  );

  return { dungeon, floors, loading, notFound, clearFloor, refetch: load };
};
