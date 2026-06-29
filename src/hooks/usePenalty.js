import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

/**
 * Penalty Zone state. On load it asks the server (`check_penalty`) whether the
 * hunter has lapsed (an overdue, uncleared quest); if so the server flips
 * penalty on and spawns a Survival Quest. While in penalty, normal quests
 * cannot award XP until the Survival Quest is cleared.
 */
export const usePenalty = () => {
  const { user } = useAuth();
  const [penalty, setPenalty] = useState(false);
  const [survivalQuestId, setSurvivalQuestId] = useState(null);
  const [justTriggered, setJustTriggered] = useState(false);
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return null;
    }
    const { data } = await supabase.rpc('check_penalty');
    if (data) {
      setPenalty(Boolean(data.penalty));
      setSurvivalQuestId(data.survival_quest_id || null);
      setJustTriggered(Boolean(data.just_triggered));
    }
    setLoading(false);
    return data;
  }, [user]);

  useEffect(() => {
    check();
  }, [check]);

  return { penalty, survivalQuestId, justTriggered, loading, recheck: check };
};
