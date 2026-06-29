// ============================================================================
// AI-assisted quest flavoring. Calls the `systemize` Supabase Edge Function
// (which talks to Claude server-side, keeping the API key off the client) and
// transparently falls back to the local rule-based generator in flavor.js when
// the function isn't deployed, the user is offline, or no key is configured.
// ============================================================================

import { supabase } from './supabase';
import { systemize as systemizeLocal } from './flavor';

/**
 * Rewrite a plain task title into Solo-Leveling quest flavor. Always resolves
 * to a non-empty string (LLM result, or the local generator as fallback).
 * @returns {Promise<{ title: string, source: 'ai' | 'local' }>}
 */
export async function systemizeTitle(rawTitle) {
  const text = (rawTitle || '').trim();
  if (!text) return { title: '', source: 'local' };

  try {
    const { data, error } = await supabase.functions.invoke('systemize', {
      body: { title: text },
    });
    if (error) throw error;
    const flavored = typeof data?.title === 'string' ? data.title.trim() : '';
    if (flavored) return { title: flavored, source: 'ai' };
    throw new Error('empty AI response');
  } catch {
    return { title: systemizeLocal(text), source: 'local' };
  }
}
