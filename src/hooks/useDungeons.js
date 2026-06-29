import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

/** List + create the hunter's dungeons (projects). */
export const useDungeons = () => {
  const { user } = useAuth();
  const [dungeons, setDungeons] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setDungeons([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('dungeons')
      .select('*, dungeon_floors(id, is_cleared)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setDungeons(
      (data || []).map((d) => {
        const floors = d.dungeon_floors || [];
        const cleared = floors.filter((f) => f.is_cleared).length;
        return {
          id: d.id,
          name: d.name,
          description: d.description,
          bossName: d.boss_name,
          difficulty: d.difficulty,
          deadline: d.deadline,
          isCleared: d.is_cleared,
          totalFloors: floors.length,
          clearedFloors: cleared,
          progress: floors.length ? Math.round((cleared / floors.length) * 100) : 0,
        };
      })
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Create a dungeon with ordered floors via the create_dungeon RPC.
   * @param {{name, description, bossName, difficulty, deadline, floors: string[]}} input
   */
  const createDungeon = useCallback(
    async (input) => {
      if (!user) return { error: 'Not authenticated' };
      if (!input.name?.trim()) return { error: 'Dungeon name is required' };
      const floors = (input.floors || []).map((f) => f.trim()).filter(Boolean);
      if (floors.length === 0) return { error: 'Add at least one floor (milestone)' };

      const { data, error } = await supabase.rpc('create_dungeon', {
        p_name: input.name.trim(),
        p_description: input.description?.trim() || null,
        p_boss_name: input.bossName?.trim() || 'The Gatekeeper',
        p_difficulty: input.difficulty || 'C_RANK',
        p_deadline: input.deadline || null,
        p_floors: floors,
      });

      if (error) return { error: error.message };
      await load();
      return { data };
    },
    [user, load]
  );

  const deleteDungeon = useCallback(
    async (id) => {
      if (!user) return { error: 'Not authenticated' };
      const { error } = await supabase.from('dungeons').delete().eq('id', id).eq('user_id', user.id);
      if (error) return { error: error.message };
      await load();
      return { data: true };
    },
    [user, load]
  );

  return { dungeons, loading, createDungeon, deleteDungeon, refetch: load };
};
