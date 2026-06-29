import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

/**
 * The System Shop. Loads the global catalog (shop_items), the hunter's gold
 * balance + active title, and what they already own (user_items). Purchasing
 * goes through the server-authoritative `purchase_item` RPC, which spends gold
 * and applies the attribute/title effect.
 */
export const useShop = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [owned, setOwned] = useState({});
  const [gold, setGold] = useState(0);
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    const [{ data: catalog }, { data: me }, { data: inv }] = await Promise.all([
      supabase.from('shop_items').select('*').order('sort_order', { ascending: true }),
      supabase.from('users').select('gold, title').eq('id', user.id).maybeSingle(),
      supabase.from('user_items').select('item_id, quantity').eq('user_id', user.id),
    ]);

    setItems(
      (catalog || []).map((it) => ({
        id: it.id,
        code: it.code,
        name: it.name,
        description: it.description,
        cost: it.cost_gold,
        effectType: it.effect_type,
        effectValue: it.effect_value,
        icon: it.icon,
        rarity: it.rarity,
      }))
    );
    setGold(me?.gold ?? 0);
    setTitle(me?.title ?? null);

    const ownedMap = {};
    (inv || []).forEach((r) => {
      ownedMap[r.item_id] = r.quantity;
    });
    setOwned(ownedMap);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const purchase = useCallback(
    async (code) => {
      const { data, error } = await supabase.rpc('purchase_item', { p_code: code });
      if (error) return { error: error.message };
      if (data && data.success === false) {
        return { error: data.reason === 'insufficient_gold' ? 'Not enough gold.' : 'Purchase failed.' };
      }
      await load();
      return data;
    },
    [load]
  );

  return { items, owned, gold, title, loading, purchase, refetch: load };
};
