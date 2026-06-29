import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { xpForDifficulty, DIFFICULTIES } from '../lib/gamification';
import { questSchema, validate } from '../lib/validation';

const TYPE_TO_FILTER = { DAILY: 'daily', WEEKLY: 'weekly', ONE_TIME: 'one-time' };

/** Map a raw quests row to the shape the dashboard UI expects. */
function mapQuest(row) {
  const diff = DIFFICULTIES.find((d) => d.id === row.difficulty);
  return {
    id: row.id,
    title: row.title,
    description: row.description || '',
    type: TYPE_TO_FILTER[row.type] || 'daily',
    rawType: row.type,
    difficulty: diff ? diff.short : 'E', // short letter for display + tone logic
    rawDifficulty: row.difficulty,
    xpReward: row.base_xp,
    linkedAttributes: row.attributes || [],
    completed: row.is_completed,
    isSurvival: row.is_survival,
    deadline: row.deadline,
    overdue: !row.is_completed && row.deadline && new Date(row.deadline) < new Date(),
    createdAt: row.created_at,
  };
}

export const useQuests = () => {
  const { user } = useAuth();
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuests = useCallback(async () => {
    if (!user) {
      setQuests([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('quests')
      .select('*')
      .eq('user_id', user.id)
      .order('is_completed', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load quests:', error.message);
    } else {
      setQuests((data || []).map(mapQuest));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetchQuests();
  }, [fetchQuests]);

  /**
   * Complete a quest via the server-authoritative RPC. Returns the reward
   * summary `{ xp_gained, gold_gained, level, rank, leveled_up, ... }` or
   * `{ error }`. XP/level/streak are computed by Postgres, never the client.
   */
  const completeQuest = useCallback(
    async (questId) => {
      if (!user) return { error: 'Not authenticated' };

      // Optimistic UI
      setQuests((prev) => prev.map((q) => (q.id === questId ? { ...q, completed: true } : q)));

      const { data, error } = await supabase.rpc('complete_quest', { quest_id: questId });

      if (error) {
        console.error('Failed to complete quest:', error.message);
        await fetchQuests(); // revert optimistic update
        return { error: error.message };
      }

      await fetchQuests();
      return data; // reward summary JSON
    },
    [user, fetchQuests]
  );

  /** Create a quest. Validates input, derives authoritative base_xp. */
  const addQuest = useCallback(
    async (input) => {
      if (!user) return { error: 'Not authenticated' };

      const parsed = validate(questSchema, input);
      if (!parsed.success) return { error: parsed.message, errors: parsed.errors };

      const { title, description, type, difficulty, attributes } = parsed.data;
      const { data, error } = await supabase
        .from('quests')
        .insert([
          {
            user_id: user.id,
            title,
            description: description || null,
            type,
            difficulty,
            base_xp: xpForDifficulty(difficulty),
            attributes,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Failed to create quest:', error.message);
        return { error: error.message };
      }
      await fetchQuests();
      return { data: mapQuest(data) };
    },
    [user, fetchQuests]
  );

  /** Update an existing quest (edit flow). */
  const updateQuest = useCallback(
    async (questId, input) => {
      if (!user) return { error: 'Not authenticated' };

      const parsed = validate(questSchema, input);
      if (!parsed.success) return { error: parsed.message, errors: parsed.errors };

      const { title, description, type, difficulty, attributes } = parsed.data;
      const { error } = await supabase
        .from('quests')
        .update({
          title,
          description: description || null,
          type,
          difficulty,
          base_xp: xpForDifficulty(difficulty),
          attributes,
        })
        .eq('id', questId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Failed to update quest:', error.message);
        return { error: error.message };
      }
      await fetchQuests();
      return { data: true };
    },
    [user, fetchQuests]
  );

  /** Permanently remove a quest. */
  const deleteQuest = useCallback(
    async (questId) => {
      if (!user) return { error: 'Not authenticated' };
      const { error } = await supabase.from('quests').delete().eq('id', questId).eq('user_id', user.id);
      if (error) return { error: error.message };
      await fetchQuests();
      return { data: true };
    },
    [user, fetchQuests]
  );

  /** Fetch a single quest (used to pre-fill the edit form). */
  const getQuest = useCallback(
    async (questId) => {
      if (!user) return null;
      const { data } = await supabase
        .from('quests')
        .select('*')
        .eq('id', questId)
        .eq('user_id', user.id)
        .maybeSingle();
      return data ? mapQuest(data) : null;
    },
    [user]
  );

  return {
    quests,
    loading,
    completeQuest,
    addQuest,
    updateQuest,
    deleteQuest,
    getQuest,
    refetch: fetchQuests,
  };
};
