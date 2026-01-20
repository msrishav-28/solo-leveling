import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signInWithEmail = async (email, password) => {
        return await supabase.auth.signInWithPassword({
            email,
            password,
        });
    };

    const signUp = async (email, password, hunterName) => {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    hunter_name: hunterName,
                },
            },
        });
    };

    const signOut = async () => {
        return await supabase.auth.signOut();
    };

    return {
        user,
        loading,
        signInWithEmail,
        signUp,
        signOut,
    };
};
