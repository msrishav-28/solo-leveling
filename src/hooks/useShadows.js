import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

/**
 * Shadow Army (referrals). Exposes the hunter's referral code/link and the list
 * of shadows they have summoned. The master earns 5% of every shadow's quest XP
 * (applied server-side in complete_quest).
 */
export const useShadows = () => {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState(null);
  const [shadows, setShadows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    const [{ data: me }, { data: list }] = await Promise.all([
      supabase.from('users').select('referral_code').eq('id', user.id).maybeSingle(),
      supabase.rpc('get_my_shadows'),
    ]);

    setReferralCode(me?.referral_code || null);
    setShadows(
      (list || []).map((s) => ({
        id: s.servant_id,
        name: s.hunter_name || 'Unknown Shadow',
        level: s.level,
        rank: s.current_rank,
        xp: s.total_xp,
        since: s.created_at,
      }))
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const referralLink = referralCode
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/auth?ref=${referralCode}`
    : '';

  return { referralCode, referralLink, shadows, loading, refetch: load };
};

/**
 * Bind the current user to a referral code (called once after auth if a ?ref=
 * code was captured). Safe to call repeatedly — the server rejects duplicates.
 */
export async function bindShadow(code) {
  if (!code) return { success: false };
  const { data, error } = await supabase.rpc('bind_shadow', { p_code: code });
  if (error) return { success: false, error: error.message };
  return data;
}
