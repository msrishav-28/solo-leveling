import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({
  user: null,
  loading: true,
  signInWithEmail: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => ({}),
});

/**
 * Single source of auth truth for the whole app. One session listener, shared
 * via context — replaces the previous pattern where every hook spun up its own
 * `onAuthStateChange` subscription.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signUp = (email, password, hunterName) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { hunter_name: hunterName } },
    });

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, loading, signInWithEmail, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
