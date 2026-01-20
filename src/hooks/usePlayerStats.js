import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const usePlayerStats = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchStats = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                // Map database columns to frontend structure if needed
                // The DB has snake_case, frontend might expect camelCase or specific structure
                // For now, mapping to match mockData structure roughly
                setStats({
                    name: data.hunter_name || 'Hunter',
                    level: data.level,
                    rank: data.current_rank,
                    currentXP: data.total_xp,
                    levelXP: data.level * 1000, // Example logic
                    nextLevelXP: (data.level + 1) * 1000,
                    streak: data.current_streak,
                    attributes: [
                        { name: "STR", value: data.strength, icon: "Sword" },
                        { name: "INT", value: data.intelligence, icon: "Brain" },
                        { name: "CON", value: data.constitution, icon: "Shield" },
                        { name: "DEX", value: data.dexterity, icon: "Zap" },
                        { name: "CHA", value: data.charisma, icon: "Users" },
                        { name: "LUK", value: data.luck, icon: "Clover" }
                    ]
                });
            }
            setLoading(false);
        };

        fetchStats();

        // Subscribe to real-time changes
        const subscription = supabase
            .channel('public:users')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${user.id}` }, (payload) => {
                const newData = payload.new;
                setStats(prev => ({
                    ...prev,
                    name: newData.hunter_name,
                    level: newData.level,
                    rank: newData.current_rank,
                    currentXP: newData.total_xp,
                    streak: newData.current_streak,
                    attributes: [
                        { name: "STR", value: newData.strength, icon: "Sword" },
                        { name: "INT", value: newData.intelligence, icon: "Brain" },
                        { name: "CON", value: newData.constitution, icon: "Shield" },
                        { name: "DEX", value: newData.dexterity, icon: "Zap" },
                        { name: "CHA", value: newData.charisma, icon: "Users" },
                        { name: "LUK", value: newData.luck, icon: "Clover" }
                    ]
                }));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [user]);

    return { stats, loading };
};
