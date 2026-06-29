// ============================================================================
// Supabase Edge Function: systemize
//
// Rewrites a plain task title into Solo-Leveling RPG quest flavor using Claude.
// Runs server-side (Deno) so the ANTHROPIC_API_KEY is NEVER exposed to the
// browser. The frontend calls this via supabase.functions.invoke('systemize'),
// and falls back to the local rule-based generator (src/lib/flavor.js) if this
// function isn't deployed or no key is configured.
//
// Deploy:
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//   supabase functions deploy systemize
//
// Optional: set ANTHROPIC_MODEL to override the model (defaults to
// claude-opus-4-8). For this high-volume, low-stakes rewrite you may prefer a
// cheaper/faster model, e.g.  supabase secrets set ANTHROPIC_MODEL=claude-haiku-4-5
// ============================================================================

import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      // Not configured -> the client falls back to its local generator.
      return json({ error: "AI not configured" }, 501);
    }

    // Require an authenticated Supabase user so the API key can't be abused
    // anonymously. supabase.functions.invoke forwards the caller's JWT.
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return json({ error: "Unauthorized" }, 401);

    const payload = await req.json().catch(() => ({}));
    const title = typeof payload?.title === "string" ? payload.title.trim() : "";
    if (!title || title.length > 200) {
      return json({ error: "Invalid title" }, 400);
    }

    const model = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-opus-4-8";
    const anthropic = new Anthropic({ apiKey });

    const message = await anthropic.messages.create({
      model,
      max_tokens: 64,
      system:
        "You rewrite mundane to-do tasks into epic quest titles for a Solo Leveling themed RPG habit tracker. " +
        "Style: terse, dramatic, 'System' interface flavor — e.g. 'do laundry' -> 'Purge the Shadow-Stained Halls', " +
        "'read a book' -> 'Decipher the Tome of Forbidden Knowledge'. " +
        "Rules: Respond with ONLY the rewritten title — no preamble, quotes, markdown, or explanation. " +
        "Keep it under 9 words. Keep it tasteful and non-violent toward real people.",
      messages: [{ role: "user", content: `Task: ${title}` }],
    });

    const block = message.content.find((b) => b.type === "text");
    const flavored = block && block.type === "text" ? block.text.trim() : "";
    return json({ title: flavored || title });
  } catch (_err) {
    // Don't leak internals; the client falls back to the local generator.
    return json({ error: "Server error" }, 500);
  }
});
