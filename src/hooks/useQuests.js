import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useQuests = () => {
    const { user } = useAuth();
    const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQuests = async () => {
        if (!user) return;

        const { data, error } = await supabase
            .from('quests')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (data) {
            setQuests(data.map(q => ({
                id: q.id,
                title: q.title,
                description: q.description,
                type: q.type.toLowerCase(), // Frontend expects lowercase
                difficulty: q.difficulty, // Frontend expects Title Case usually but let's check
                linkedAttributes: q.attributes,
                xpReward: q.base_xp,
                completed: q.is_completed,
                schedule: "Daily" // simplified for now
            })));
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchQuests();
    }, [user]);

    const completeQuest = async (questId) => {
        if (!user) return;

        // Optimistic update
        setQuests(prev => prev.map(q => q.id === questId ? { ...q, completed: true } : q));

        // 1. Mark quest as completed
        const { error: updateError } = await supabase
            .from('quests')
            .update({ is_completed: true, is_active: false })
            .eq('id', questId);

        if (updateError) {
            // Revert on error
            console.error("Error completing quest:", updateError);
            fetchQuests();
            return;
        }

        // 2. Add to completions history (Trigger or Manual)
        // For simplicity, we assume a Postgres Trigger handles the XP update on the user,
        // or we do it here. Let's do it here for explicit client control in this phase.

        // Fetch quest details to get XP
        const quest = quests.find(q => q.id === questId);
        if (quest) {
            await supabase
                .rpc('increment_xp', { x: quest.xpReward, user_id: user.id });
            // Note: You needs to create this RPC or update manually.
            // Fallback: Manual update
            /*
            const { data: userData } = await supabase.from('users').select('total_xp').eq('id', user.id).single();
            await supabase.from('users').update({ total_xp: userData.total_xp + quest.xpReward }).eq('id', user.id);
            */
        }
    };

    const addQuest = async (questData) => {
        if (!user) return;

        const { data, error } = await supabase
            .from('quests')
            .insert([{
                user_id: user.id,
                title: questData.title,
                description: questData.description,
                type: questData.type.toUpperCase(),
                difficulty: questData.difficulty.toUpperCase(),
                base_xp: questData.xpReward,
                attributes: questData.linkedAttributes,
            }])
            .select();

        if (data) {
            fetchQuests();
        }
    };

    return { quests, loading, completeQuest, addQuest, refetch: fetchQuests };
};
