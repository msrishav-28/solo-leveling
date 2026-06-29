-- ============================================================================
-- SOLO LEVELING — "The System" database schema (Supabase / PostgreSQL)
--
-- Run this once against your Supabase project (SQL Editor or `psql`).
-- It is RE-RUNNABLE: tables use IF NOT EXISTS, new columns use ALTER ... ADD
-- COLUMN IF NOT EXISTS, policies/functions are dropped+recreated. So you can
-- re-apply it after edits (including upgrading an older install).
--
-- Progression is SERVER-AUTHORITATIVE. Clients may insert/update their own
-- quests/dungeons, but XP / level / rank / streak / attributes / gold / penalty
-- state can ONLY change through the SECURITY DEFINER functions below. A trigger
-- (protect_user_stats) freezes those columns against direct PostgREST writes.
-- ============================================================================

create extension if not exists pgcrypto;

-- ==============================================================================
-- 1. USERS PROFILE TABLE (The Hunter)
-- ==============================================================================
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  hunter_name text unique,
  class text,
  title text,
  referral_code text unique,

  -- Server-managed progression
  level int not null default 1,
  total_xp int not null default 0,
  current_rank text not null default 'E',
  gold int not null default 0,
  current_streak int not null default 0,
  max_streak int not null default 0,
  last_login timestamptz default timezone('utc', now()),

  -- Penalty Zone state
  penalty_active boolean not null default false,
  penalty_cleared_at timestamptz,

  -- Attributes
  strength int not null default 10,
  intelligence int not null default 10,
  constitution int not null default 10,
  dexterity int not null default 10,
  charisma int not null default 10,
  luck int not null default 10,

  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Upgrade older installs (no-op on fresh ones)
alter table public.users add column if not exists class text;
alter table public.users add column if not exists title text;
alter table public.users add column if not exists referral_code text unique;
alter table public.users add column if not exists gold int not null default 0;
alter table public.users add column if not exists penalty_active boolean not null default false;
alter table public.users add column if not exists penalty_cleared_at timestamptz;

alter table public.users enable row level security;

drop policy if exists "Users can view their own profile" on public.users;
create policy "Users can view their own profile" on public.users
  for select using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.users;
create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

-- ==============================================================================
-- 2. QUESTS TABLE
-- ==============================================================================
create table if not exists public.quests (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,

  title text not null,
  description text,
  type text not null default 'DAILY'
    check (type in ('DAILY', 'WEEKLY', 'ONE_TIME')),
  difficulty text not null default 'E_RANK'
    check (difficulty in ('E_RANK', 'D_RANK', 'C_RANK', 'B_RANK', 'A_RANK', 'S_RANK')),

  base_xp int not null default 50,
  attributes text[] not null default '{}',
  deadline timestamptz,

  is_active boolean not null default true,
  is_completed boolean not null default false,
  is_survival boolean not null default false,
  completed_at timestamptz,

  created_at timestamptz not null default timezone('utc', now())
);

alter table public.quests add column if not exists is_survival boolean not null default false;

create index if not exists quests_user_id_idx on public.quests (user_id);
create index if not exists quests_user_active_idx on public.quests (user_id, is_active);

alter table public.quests enable row level security;

drop policy if exists "Users can view their own quests" on public.quests;
create policy "Users can view their own quests" on public.quests
  for select using (auth.uid() = user_id);
drop policy if exists "Users can create quests" on public.quests;
create policy "Users can create quests" on public.quests
  for insert with check (auth.uid() = user_id);
drop policy if exists "Users can update their own quests" on public.quests;
create policy "Users can update their own quests" on public.quests
  for update using (auth.uid() = user_id);
drop policy if exists "Users can delete their own quests" on public.quests;
create policy "Users can delete their own quests" on public.quests
  for delete using (auth.uid() = user_id);

-- ==============================================================================
-- 3. QUEST COMPLETIONS (Audit Log, insert-only via RPC)
-- ==============================================================================
create table if not exists public.quest_completions (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  quest_id uuid references public.quests(id) on delete set null,
  xp_awarded int not null,
  completed_at timestamptz not null default timezone('utc', now())
);

create index if not exists completions_user_idx on public.quest_completions (user_id);
create index if not exists completions_user_date_idx
  on public.quest_completions (user_id, completed_at);

alter table public.quest_completions enable row level security;
drop policy if exists "Users can view their history" on public.quest_completions;
create policy "Users can view their history" on public.quest_completions
  for select using (auth.uid() = user_id);

-- ==============================================================================
-- 4. ACHIEVEMENTS (global) + USER_ACHIEVEMENTS (per-hunter unlocks)
-- ==============================================================================
create table if not exists public.achievements (
  id uuid not null default gen_random_uuid() primary key,
  code text unique not null,
  title text not null,
  description text,
  rarity text not null default 'common',
  xp_reward int not null default 0,
  icon text,
  criteria jsonb
);

alter table public.achievements enable row level security;
drop policy if exists "Public read achievements" on public.achievements;
create policy "Public read achievements" on public.achievements
  for select using (true);

create table if not exists public.user_achievements (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  achievement_id uuid references public.achievements(id) on delete cascade not null,
  unlocked_at timestamptz not null default timezone('utc', now()),
  unique (user_id, achievement_id)
);

create index if not exists user_achievements_user_idx on public.user_achievements (user_id);

alter table public.user_achievements enable row level security;
drop policy if exists "Users can view their achievements" on public.user_achievements;
create policy "Users can view their achievements" on public.user_achievements
  for select using (auth.uid() = user_id);

-- ==============================================================================
-- 5. DUNGEONS (Projects) + FLOORS (Milestones) + RUNE STONES (Reward badges)
-- ==============================================================================
create table if not exists public.dungeons (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  description text,
  boss_name text not null default 'The Gatekeeper',
  difficulty text not null default 'C_RANK'
    check (difficulty in ('E_RANK', 'D_RANK', 'C_RANK', 'B_RANK', 'A_RANK', 'S_RANK')),
  deadline timestamptz,
  is_cleared boolean not null default false,
  cleared_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists dungeons_user_idx on public.dungeons (user_id);

alter table public.dungeons enable row level security;
drop policy if exists "Users manage their dungeons (select)" on public.dungeons;
create policy "Users manage their dungeons (select)" on public.dungeons for select using (auth.uid() = user_id);
drop policy if exists "Users manage their dungeons (insert)" on public.dungeons;
create policy "Users manage their dungeons (insert)" on public.dungeons for insert with check (auth.uid() = user_id);
drop policy if exists "Users manage their dungeons (update)" on public.dungeons;
create policy "Users manage their dungeons (update)" on public.dungeons for update using (auth.uid() = user_id);
drop policy if exists "Users manage their dungeons (delete)" on public.dungeons;
create policy "Users manage their dungeons (delete)" on public.dungeons for delete using (auth.uid() = user_id);

create table if not exists public.dungeon_floors (
  id uuid not null default gen_random_uuid() primary key,
  dungeon_id uuid references public.dungeons(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  floor_order int not null default 1,
  is_cleared boolean not null default false,
  cleared_at timestamptz
);

create index if not exists floors_dungeon_idx on public.dungeon_floors (dungeon_id);

alter table public.dungeon_floors enable row level security;
drop policy if exists "Users manage their floors (select)" on public.dungeon_floors;
create policy "Users manage their floors (select)" on public.dungeon_floors for select using (auth.uid() = user_id);
drop policy if exists "Users manage their floors (insert)" on public.dungeon_floors;
create policy "Users manage their floors (insert)" on public.dungeon_floors for insert with check (auth.uid() = user_id);
drop policy if exists "Users manage their floors (update)" on public.dungeon_floors;
create policy "Users manage their floors (update)" on public.dungeon_floors for update using (auth.uid() = user_id);
drop policy if exists "Users manage their floors (delete)" on public.dungeon_floors;
create policy "Users manage their floors (delete)" on public.dungeon_floors for delete using (auth.uid() = user_id);

create table if not exists public.rune_stones (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  dungeon_id uuid references public.dungeons(id) on delete set null,
  name text not null,
  rarity text not null default 'epic',
  icon text not null default 'Gem',
  earned_at timestamptz not null default timezone('utc', now())
);

create index if not exists runes_user_idx on public.rune_stones (user_id);

alter table public.rune_stones enable row level security;
drop policy if exists "Users can view their runes" on public.rune_stones;
create policy "Users can view their runes" on public.rune_stones
  for select using (auth.uid() = user_id);

-- ==============================================================================
-- 6. SHADOWS (Referrals) — master earns 5% of each shadow's quest XP
-- ==============================================================================
create table if not exists public.shadows (
  id uuid not null default gen_random_uuid() primary key,
  master_id uuid references public.users(id) on delete cascade not null,
  servant_id uuid references public.users(id) on delete cascade not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists shadows_master_idx on public.shadows (master_id);

alter table public.shadows enable row level security;
-- A master may see their shadows; a servant may see who summoned them.
drop policy if exists "Users can view related shadows" on public.shadows;
create policy "Users can view related shadows" on public.shadows
  for select using (auth.uid() = master_id or auth.uid() = servant_id);

-- ==============================================================================
-- 6b. SHOP — global catalog (shop_items) + per-hunter inventory (user_items)
-- ==============================================================================
create table if not exists public.shop_items (
  id uuid not null default gen_random_uuid() primary key,
  code text unique not null,
  name text not null,
  description text,
  cost_gold int not null,
  effect_type text not null,        -- ATTR | TITLE
  effect_target text,               -- users column name for ATTR effects
  effect_value int not null default 0,
  icon text,
  rarity text not null default 'common',
  sort_order int not null default 0
);

alter table public.shop_items enable row level security;
drop policy if exists "Public read shop" on public.shop_items;
create policy "Public read shop" on public.shop_items for select using (true);

create table if not exists public.user_items (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  item_id uuid references public.shop_items(id) on delete cascade not null,
  quantity int not null default 1,
  acquired_at timestamptz not null default timezone('utc', now()),
  unique (user_id, item_id)
);

create index if not exists user_items_user_idx on public.user_items (user_id);

alter table public.user_items enable row level security;
drop policy if exists "Users can view their items" on public.user_items;
create policy "Users can view their items" on public.user_items
  for select using (auth.uid() = user_id);

-- ==============================================================================
-- 7. SERVER-SIDE LOGIC (The "System")
-- ==============================================================================

-- 7a. updated_at maintenance
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
  before update on public.users
  for each row execute procedure public.set_updated_at();

-- 7b. Freeze server-managed columns against direct client writes
create or replace function public.protect_user_stats()
returns trigger as $$
begin
  if current_setting('app.allow_stat_update', true) = 'on' then
    return new;
  end if;

  new.level              := old.level;
  new.total_xp           := old.total_xp;
  new.current_rank       := old.current_rank;
  new.gold               := old.gold;
  new.current_streak     := old.current_streak;
  new.max_streak         := old.max_streak;
  new.penalty_active     := old.penalty_active;
  new.penalty_cleared_at := old.penalty_cleared_at;
  new.referral_code      := old.referral_code;
  new.title              := old.title;
  new.strength           := old.strength;
  new.intelligence       := old.intelligence;
  new.constitution       := old.constitution;
  new.dexterity          := old.dexterity;
  new.charisma           := old.charisma;
  new.luck               := old.luck;
  return new;
end;
$$ language plpgsql;

drop trigger if exists users_protect_stats on public.users;
create trigger users_protect_stats
  before update on public.users
  for each row execute procedure public.protect_user_stats();

-- 7c. Create profile on signup (hunter_name + referral_code, collision-safe)
create or replace function public.handle_new_user()
returns trigger as $$
declare
  desired_name text;
  ref_code text;
begin
  desired_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'hunter_name'), ''),
    split_part(new.email, '@', 1)
  );
  ref_code := upper(substr(replace(new.id::text, '-', ''), 1, 10));

  begin
    insert into public.users (id, email, hunter_name, referral_code)
    values (new.id, new.email, desired_name, ref_code);
  exception when unique_violation then
    insert into public.users (id, email, hunter_name, referral_code)
    values (new.id, new.email,
            desired_name || '_' || substr(new.id::text, 1, 4),
            upper(substr(replace(new.id::text, '-', ''), 1, 12)));
  end;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 7d. Difficulty -> XP and Level -> Rank (mirror src/lib/gamification.js)
create or replace function public.xp_for_difficulty(p_difficulty text)
returns int as $$
begin
  return case p_difficulty
    when 'E_RANK' then 50  when 'D_RANK' then 100 when 'C_RANK' then 200
    when 'B_RANK' then 400 when 'A_RANK' then 800 when 'S_RANK' then 1600
    else 50 end;
end;
$$ language plpgsql immutable;

create or replace function public.rank_for_level(p_level int)
returns text as $$
begin
  return case
    when p_level >= 50 then 'S' when p_level >= 35 then 'A'
    when p_level >= 20 then 'B' when p_level >= 10 then 'C'
    when p_level >= 5  then 'D' else 'E' end;
end;
$$ language plpgsql immutable;

-- 7e. Award raw XP+gold to a specific user and recompute level/rank.
-- Internal helper used by complete_quest / dungeon clears / achievement bonuses.
create or replace function public.award_xp(p_user uuid, p_xp int, p_gold int)
returns void as $$
declare
  new_total int;
  new_level int;
begin
  select total_xp + p_xp into new_total from public.users where id = p_user;
  new_level := floor(new_total / 1000) + 1;

  perform set_config('app.allow_stat_update', 'on', true);
  update public.users
     set total_xp      = new_total,
         level         = new_level,
         current_rank  = public.rank_for_level(new_level),
         gold          = gold + p_gold
   where id = p_user;
  perform set_config('app.allow_stat_update', 'off', true);
end;
$$ language plpgsql security definer;

-- 7f. Evaluate + unlock achievements for a user; credits bonus XP once.
-- Returns a JSON array of newly-unlocked achievements.
create or replace function public.evaluate_achievements(p_user uuid)
returns jsonb as $$
declare
  lvl int;
  mstreak int;
  completions int;
  a record;
  newly jsonb := '[]'::jsonb;
  bonus int := 0;
  met boolean;
begin
  select level, max_streak into lvl, mstreak from public.users where id = p_user;
  select count(*) into completions from public.quest_completions where user_id = p_user;

  for a in select * from public.achievements loop
    if exists (select 1 from public.user_achievements ua
                where ua.user_id = p_user and ua.achievement_id = a.id) then
      continue;
    end if;

    met := (a.criteria ->> 'type' = 'LEVEL'       and lvl >= (a.criteria ->> 'value')::int)
        or (a.criteria ->> 'type' = 'STREAK'      and mstreak >= (a.criteria ->> 'value')::int)
        or (a.criteria ->> 'type' = 'COMPLETIONS' and completions >= (a.criteria ->> 'value')::int);

    if met then
      insert into public.user_achievements (user_id, achievement_id)
      values (p_user, a.id) on conflict do nothing;
      bonus := bonus + coalesce(a.xp_reward, 0);
      newly := newly || jsonb_build_object(
        'code', a.code, 'title', a.title, 'rarity', a.rarity,
        'xp_reward', a.xp_reward, 'icon', a.icon);
    end if;
  end loop;

  if bonus > 0 then
    perform public.award_xp(p_user, bonus, 0);
  end if;

  return newly;
end;
$$ language plpgsql security definer;

-- 7g. Penalty detection. Sets penalty_active + spawns a Survival Quest when the
-- hunter has an overdue, uncleared quest and isn't already in penalty (and not
-- within the post-clear grace window). Idempotent.
create or replace function public.check_penalty()
returns json as $$
declare
  u record;
  overdue_count int;
  survival_id uuid;
  streak_date date;
begin
  select * into u from public.users where id = auth.uid();

  -- Streak decay: if there's been no completion since before yesterday, the
  -- streak has lapsed. Reset it here (cheaper + no pg_cron dependency).
  if u.current_streak > 0 then
    select max(completed_at)::date into streak_date
      from public.quest_completions where user_id = auth.uid();
    if streak_date is null or streak_date < (timezone('utc', now())::date - 1) then
      perform set_config('app.allow_stat_update', 'on', true);
      update public.users set current_streak = 0 where id = auth.uid();
      perform set_config('app.allow_stat_update', 'off', true);
      u.current_streak := 0;
    end if;
  end if;

  if u.penalty_active then
    select id into survival_id from public.quests
      where user_id = auth.uid() and is_survival and is_active and not is_completed
      order by created_at desc limit 1;

    -- Re-spawn the Survival Quest if it went missing (e.g. user deleted it),
    -- so the hunter can never soft-lock out of the Penalty Zone.
    if survival_id is null then
      insert into public.quests (user_id, title, description, type, difficulty, base_xp, attributes, is_survival)
      values (auth.uid(), 'Survival Protocol',
              'Do 2 minutes of focus NOW to restore System stability.',
              'ONE_TIME', 'E_RANK', public.xp_for_difficulty('E_RANK'), array['CON'], true)
      returning id into survival_id;
    end if;

    return json_build_object('penalty', true, 'survival_quest_id', survival_id);
  end if;

  -- grace: don't re-trigger within 20h of clearing a previous penalty
  if u.penalty_cleared_at is not null and u.penalty_cleared_at > now() - interval '20 hours' then
    return json_build_object('penalty', false);
  end if;

  select count(*) into overdue_count from public.quests
    where user_id = auth.uid()
      and is_active and not is_completed and not is_survival
      and deadline is not null and deadline < now();

  if overdue_count = 0 then
    return json_build_object('penalty', false);
  end if;

  -- Enter penalty + spawn survival quest
  perform set_config('app.allow_stat_update', 'on', true);
  update public.users set penalty_active = true where id = auth.uid();
  perform set_config('app.allow_stat_update', 'off', true);

  insert into public.quests (user_id, title, description, type, difficulty, base_xp, attributes, is_survival)
  values (auth.uid(), 'Survival Protocol',
          'Do 2 minutes of focus NOW to restore System stability.',
          'ONE_TIME', 'E_RANK', public.xp_for_difficulty('E_RANK'), array['CON'], true)
  returning id into survival_id;

  return json_build_object('penalty', true, 'survival_quest_id', survival_id, 'just_triggered', true);
end;
$$ language plpgsql security definer;

-- 7h. Complete Quest (server-authoritative, anti-cheat). The ONLY path that
-- mutates quest progression. Handles penalty gating, streak, attributes, gold,
-- shadow (referral) XP share, and achievement evaluation.
create or replace function public.complete_quest(quest_id uuid)
returns json as $$
declare
  q          record;
  xp_gain    int;
  gold_gain  int;
  old_level  int;
  last_date  date;
  today      date := (timezone('utc', now()))::date;
  new_streak int;
  v_penalty  boolean;
  v_master   uuid;
  master_bonus int := 0;
  newly      jsonb;
  fin_level  int;
  fin_total  int;
  fin_rank   text;
begin
  select * into q from public.quests where id = quest_id and user_id = auth.uid();
  if not found then
    raise exception 'Quest not found or does not belong to you.';
  end if;
  if q.is_completed then
    raise exception 'Quest already completed.';
  end if;

  select penalty_active, level into v_penalty, old_level
    from public.users where id = auth.uid();

  if v_penalty and not q.is_survival then
    raise exception 'PENALTY_ACTIVE: Clear your Survival Quest to restore XP gain.';
  end if;

  xp_gain   := public.xp_for_difficulty(q.difficulty);
  gold_gain := xp_gain / 10;

  -- Streak (based on most recent prior completion date)
  select max(completed_at)::date into last_date
    from public.quest_completions where user_id = auth.uid();
  if last_date is null then
    new_streak := 1;
  elsif last_date = today then
    select greatest(current_streak, 1) into new_streak from public.users where id = auth.uid();
  elsif last_date = today - 1 then
    select current_streak + 1 into new_streak from public.users where id = auth.uid();
  else
    new_streak := 1;
  end if;

  -- Apply XP/gold/streak/attributes (single guarded update)
  perform set_config('app.allow_stat_update', 'on', true);
  update public.users
     set total_xp       = total_xp + xp_gain,
         level          = floor((total_xp + xp_gain) / 1000) + 1,
         current_rank   = public.rank_for_level(floor((total_xp + xp_gain) / 1000) + 1),
         gold           = gold + gold_gain,
         current_streak = new_streak,
         max_streak     = greatest(max_streak, new_streak),
         last_login     = timezone('utc', now()),
         strength     = strength     + (case when 'STR' = any(q.attributes) then 1 else 0 end),
         intelligence = intelligence + (case when 'INT' = any(q.attributes) then 1 else 0 end),
         constitution = constitution + (case when 'CON' = any(q.attributes) then 1 else 0 end),
         dexterity    = dexterity    + (case when 'DEX' = any(q.attributes) then 1 else 0 end),
         charisma     = charisma     + (case when 'CHA' = any(q.attributes) then 1 else 0 end),
         luck         = luck         + (case when 'LUK' = any(q.attributes) then 1 else 0 end)
   where id = auth.uid();
  perform set_config('app.allow_stat_update', 'off', true);

  -- Log + close quest
  insert into public.quest_completions (user_id, quest_id, xp_awarded)
  values (auth.uid(), quest_id, xp_gain);
  update public.quests
     set is_completed = true, is_active = false, completed_at = timezone('utc', now())
   where id = quest_id;

  -- Survival quest clears the Penalty Zone and grants overdue quests a grace day
  if q.is_survival then
    perform set_config('app.allow_stat_update', 'on', true);
    update public.users set penalty_active = false, penalty_cleared_at = timezone('utc', now())
      where id = auth.uid();
    perform set_config('app.allow_stat_update', 'off', true);
    update public.quests set deadline = now() + interval '24 hours'
      where user_id = auth.uid() and is_active and not is_completed and deadline < now();
  end if;

  -- Shadow share: master earns 5% of this XP
  select master_id into v_master from public.shadows where servant_id = auth.uid();
  if v_master is not null then
    master_bonus := floor(xp_gain * 0.05);
    if master_bonus > 0 then
      perform public.award_xp(v_master, master_bonus, 0);
    end if;
  end if;

  -- Achievements (may credit bonus XP)
  newly := public.evaluate_achievements(auth.uid());

  -- Final, post-everything stats for the reward screen
  select level, total_xp, current_rank into fin_level, fin_total, fin_rank
    from public.users where id = auth.uid();

  return json_build_object(
    'success',     true,
    'quest_title', q.title,
    'xp_gained',   xp_gain,
    'gold_gained', gold_gain,
    'attributes',  q.attributes,
    'total_xp',    fin_total,
    'level',       fin_level,
    'rank',        fin_rank,
    'leveled_up',  fin_level > old_level,
    'streak',      new_streak,
    'is_survival', q.is_survival,
    'master_bonus', master_bonus,
    'achievements_unlocked', newly
  );
end;
$$ language plpgsql security definer;

-- 7i. Leaderboard (definer; non-sensitive columns only)
create or replace function public.get_leaderboard(limit_count int default 50)
returns table (
  id uuid, hunter_name text, level int, current_rank text, total_xp int, current_streak int
) as $$
begin
  return query
    select u.id, u.hunter_name, u.level, u.current_rank, u.total_xp, u.current_streak
      from public.users u
     order by u.total_xp desc, u.level desc
     limit greatest(1, least(limit_count, 200));
end;
$$ language plpgsql security definer;

-- 7j. Job change / onboarding: class + class attribute boosts + starter gold/quests
create or replace function public.apply_job_change(p_class text)
returns json as $$
declare
  quest_count int;
begin
  if p_class not in ('TANK', 'MAGE', 'ASSASSIN') then
    raise exception 'Invalid class. Choose TANK, MAGE or ASSASSIN.';
  end if;

  perform set_config('app.allow_stat_update', 'on', true);
  update public.users
     set class = p_class,
         title = coalesce(title, 'The Awakened'),
         gold = gold + 100,
         strength     = strength     + (case when p_class = 'TANK' then 5 else 0 end),
         constitution = constitution + (case when p_class = 'TANK' then 5 else 0 end),
         intelligence = intelligence + (case when p_class = 'MAGE' then 5 else 0 end),
         dexterity    = dexterity    + (case when p_class = 'MAGE' then 3
                                             when p_class = 'ASSASSIN' then 5 else 0 end),
         charisma     = charisma     + (case when p_class = 'ASSASSIN' then 3 else 0 end)
   where id = auth.uid();
  perform set_config('app.allow_stat_update', 'off', true);

  select count(*) into quest_count from public.quests where user_id = auth.uid();
  if quest_count = 0 then
    if p_class = 'TANK' then
      insert into public.quests (user_id, title, description, type, difficulty, base_xp, attributes) values
        (auth.uid(), '100 Pushups',       'Maintain physical condition.', 'DAILY',  'D_RANK', public.xp_for_difficulty('D_RANK'), array['STR','CON']),
        (auth.uid(), 'Iron Body Training', 'Forge an unbreakable frame.',  'DAILY',  'E_RANK', public.xp_for_difficulty('E_RANK'), array['CON']),
        (auth.uid(), 'Protect the Weak',   'Shield an ally this week.',    'WEEKLY', 'C_RANK', public.xp_for_difficulty('C_RANK'), array['STR','CHA']);
    elsif p_class = 'MAGE' then
      insert into public.quests (user_id, title, description, type, difficulty, base_xp, attributes) values
        (auth.uid(), 'Deep Work Session',   'Two hours of focus.',        'DAILY',  'D_RANK', public.xp_for_difficulty('D_RANK'), array['INT']),
        (auth.uid(), 'Read 20 Pages',       'Expand the mind daily.',     'DAILY',  'E_RANK', public.xp_for_difficulty('E_RANK'), array['INT']),
        (auth.uid(), 'Master a New Concept','Learn something hard.',      'WEEKLY', 'C_RANK', public.xp_for_difficulty('C_RANK'), array['INT','DEX']);
    else
      insert into public.quests (user_id, title, description, type, difficulty, base_xp, attributes) values
        (auth.uid(), 'Market Research',  'Scout for opportunity.',  'DAILY',  'D_RANK', public.xp_for_difficulty('D_RANK'), array['DEX','INT']),
        (auth.uid(), 'Morning Mobility', 'Stay fast and ready.',    'DAILY',  'E_RANK', public.xp_for_difficulty('E_RANK'), array['DEX']),
        (auth.uid(), 'Close a Deal',     'Secure a win this week.', 'WEEKLY', 'C_RANK', public.xp_for_difficulty('C_RANK'), array['DEX','CHA']);
    end if;
  end if;

  return json_build_object('success', true, 'class', p_class, 'gold_granted', 100, 'seeded', quest_count = 0);
end;
$$ language plpgsql security definer;

-- 7k. Bind a shadow (referral). The caller becomes the servant of the code owner.
create or replace function public.bind_shadow(p_code text)
returns json as $$
declare
  v_master uuid;
begin
  if p_code is null or trim(p_code) = '' then
    return json_build_object('success', false, 'reason', 'empty_code');
  end if;

  select id into v_master from public.users where referral_code = upper(trim(p_code));
  if v_master is null then
    return json_build_object('success', false, 'reason', 'invalid_code');
  end if;
  if v_master = auth.uid() then
    return json_build_object('success', false, 'reason', 'self');
  end if;
  if exists (select 1 from public.shadows where servant_id = auth.uid()) then
    return json_build_object('success', false, 'reason', 'already_bound');
  end if;

  insert into public.shadows (master_id, servant_id) values (v_master, auth.uid());
  return json_build_object('success', true);
end;
$$ language plpgsql security definer;

-- 7k-2. List the caller's shadows (definer; only the caller's own servants)
create or replace function public.get_my_shadows()
returns table (
  servant_id uuid, hunter_name text, level int, current_rank text, total_xp int, created_at timestamptz
) as $$
begin
  return query
    select s.servant_id, u.hunter_name, u.level, u.current_rank, u.total_xp, s.created_at
      from public.shadows s
      join public.users u on u.id = s.servant_id
     where s.master_id = auth.uid()
     order by u.total_xp desc;
end;
$$ language plpgsql security definer;

-- 7k-3. Purchase a shop item (spends gold; applies attribute/title effect)
create or replace function public.purchase_item(p_code text)
returns json as $$
declare
  item record;
  bal int;
begin
  select * into item from public.shop_items where code = p_code;
  if not found then
    raise exception 'Item not found.';
  end if;

  select gold into bal from public.users where id = auth.uid();
  if bal < item.cost_gold then
    return json_build_object('success', false, 'reason', 'insufficient_gold', 'gold', bal);
  end if;

  perform set_config('app.allow_stat_update', 'on', true);
  update public.users set gold = gold - item.cost_gold where id = auth.uid();

  if item.effect_type = 'ATTR' and item.effect_target is not null then
    -- effect_target is a trusted column name from the seeded catalog; %I quotes it.
    execute format('update public.users set %I = %I + $1 where id = $2', item.effect_target, item.effect_target)
      using item.effect_value, auth.uid();
  elsif item.effect_type = 'TITLE' then
    update public.users set title = item.name where id = auth.uid();
  end if;
  perform set_config('app.allow_stat_update', 'off', true);

  insert into public.user_items (user_id, item_id, quantity)
  values (auth.uid(), item.id, 1)
  on conflict (user_id, item_id)
    do update set quantity = user_items.quantity + 1, acquired_at = timezone('utc', now());

  select gold into bal from public.users where id = auth.uid();
  return json_build_object('success', true, 'gold', bal, 'item', item.name, 'effect_type', item.effect_type);
end;
$$ language plpgsql security definer;

-- 7l. Create a dungeon with ordered floors (atomic)
create or replace function public.create_dungeon(
  p_name text, p_description text, p_boss_name text, p_difficulty text,
  p_deadline timestamptz, p_floors text[]
)
returns uuid as $$
declare
  d_id uuid;
begin
  if coalesce(trim(p_name), '') = '' then
    raise exception 'Dungeon name is required.';
  end if;

  insert into public.dungeons (user_id, name, description, boss_name, difficulty, deadline)
  values (auth.uid(), p_name, nullif(trim(p_description), ''),
          coalesce(nullif(trim(p_boss_name), ''), 'The Gatekeeper'),
          coalesce(p_difficulty, 'C_RANK'), p_deadline)
  returning id into d_id;

  insert into public.dungeon_floors (dungeon_id, user_id, title, floor_order)
  select d_id, auth.uid(), f.title, f.ord
    from unnest(p_floors) with ordinality as f(title, ord)
   where coalesce(trim(f.title), '') <> '';

  return d_id;
end;
$$ language plpgsql security definer;

-- 7m. Clear a dungeon floor; if it was the last, defeat the boss + grant reward
create or replace function public.clear_floor(p_floor uuid)
returns json as $$
declare
  f          record;
  d          record;
  remaining  int;
  xp_reward  int;
  gold_reward int;
  rune       record;
  newly      jsonb := '[]'::jsonb;
  dungeon_cleared boolean := false;
begin
  select * into f from public.dungeon_floors where id = p_floor and user_id = auth.uid();
  if not found then
    raise exception 'Floor not found or does not belong to you.';
  end if;
  if f.is_cleared then
    raise exception 'Floor already cleared.';
  end if;

  update public.dungeon_floors set is_cleared = true, cleared_at = timezone('utc', now())
    where id = p_floor;

  select count(*) into remaining from public.dungeon_floors
    where dungeon_id = f.dungeon_id and not is_cleared;

  if remaining = 0 then
    select * into d from public.dungeons where id = f.dungeon_id;
    if not d.is_cleared then
      dungeon_cleared := true;
      xp_reward   := public.xp_for_difficulty(d.difficulty) * 2;  -- boss bonus
      gold_reward := xp_reward / 5;

      update public.dungeons set is_cleared = true, cleared_at = timezone('utc', now())
        where id = d.id;

      insert into public.rune_stones (user_id, dungeon_id, name, rarity, icon)
      values (auth.uid(), d.id, d.name || ' Rune', 'epic', 'Gem')
      returning * into rune;

      perform public.award_xp(auth.uid(), xp_reward, gold_reward);
      newly := public.evaluate_achievements(auth.uid());
    end if;
  end if;

  return json_build_object(
    'floor_cleared', true,
    'dungeon_cleared', dungeon_cleared,
    'xp_gained', coalesce(xp_reward, 0),
    'gold_gained', coalesce(gold_reward, 0),
    'rune_stone', case when dungeon_cleared then json_build_object('name', rune.name, 'rarity', rune.rarity, 'icon', rune.icon) else null end,
    'achievements_unlocked', newly
  );
end;
$$ language plpgsql security definer;

-- ==============================================================================
-- 8. SEED DATA — global achievements (idempotent)
-- ==============================================================================
insert into public.achievements (code, title, description, rarity, xp_reward, icon, criteria) values
  ('FIRST_BLOOD',  'First Blood',     'Complete your very first quest.',     'common',    50,  'Swords',     '{"type":"COMPLETIONS","value":1}'),
  ('STREAK_7',     'Unbroken',        'Maintain a 7-day completion streak.', 'rare',      300, 'Flame',      '{"type":"STREAK","value":7}'),
  ('LEVEL_5',      'D-Rank Ascension','Reach Level 5 and awaken to D-Rank.', 'rare',      250, 'TrendingUp', '{"type":"LEVEL","value":5}'),
  ('LEVEL_10',     'C-Rank Hunter',   'Reach Level 10 and awaken to C-Rank.','epic',      500, 'Shield',     '{"type":"LEVEL","value":10}'),
  ('GRIND_25',     'The Grind',       'Complete 25 quests.',                 'epic',      750, 'Target',     '{"type":"COMPLETIONS","value":25}'),
  ('MONARCH',      'Shadow Monarch',  'Reach Level 50 and ascend to S-Rank.','legendary', 2000,'Crown',      '{"type":"LEVEL","value":50}')
on conflict (code) do update
  set title = excluded.title, description = excluded.description, rarity = excluded.rarity,
      xp_reward = excluded.xp_reward, icon = excluded.icon, criteria = excluded.criteria;

-- Shop catalog (idempotent). ATTR items permanently raise an attribute; TITLE
-- items unlock a profile title. Gold is the sink.
insert into public.shop_items (code, name, description, cost_gold, effect_type, effect_target, effect_value, icon, rarity, sort_order) values
  ('RUNE_LUCK',     'Rune of Fortune',    'A whisper of luck. +1 LUK.',              80,   'ATTR',  'luck',         1, 'Clover', 'common', 1),
  ('ELIXIR_STR',    'Elixir of Power',    'Molten resolve. +3 STR.',                 200,  'ATTR',  'strength',     3, 'Sword',  'rare',   2),
  ('ELIXIR_INT',    'Elixir of Insight',  'Clarified thought. +3 INT.',              200,  'ATTR',  'intelligence', 3, 'Brain',  'rare',   3),
  ('ELIXIR_CON',    'Elixir of Vigor',    'Hardened body. +3 CON.',                  200,  'ATTR',  'constitution', 3, 'Shield', 'rare',   4),
  ('ELIXIR_DEX',    'Elixir of Swiftness','Quickened reflex. +3 DEX.',               200,  'ATTR',  'dexterity',    3, 'Zap',    'rare',   5),
  ('ELIXIR_CHA',    'Elixir of Presence', 'Magnetic aura. +3 CHA.',                  200,  'ATTR',  'charisma',     3, 'Users',  'rare',   6),
  ('TITLE_RELENTLESS','Title: The Relentless','A title for those who do not stop.',  800,  'TITLE', null,           0, 'Flame',  'epic',   10),
  ('TITLE_IRONWILL', 'Title: Iron Will',  'Unbendable. Unbroken.',                   500,  'TITLE', null,           0, 'Shield', 'epic',   11),
  ('TITLE_SOVEREIGN','Title: Shadow Sovereign','Reserved for true monarchs.',        2000, 'TITLE', null,           0, 'Crown',  'legendary', 12)
on conflict (code) do update
  set name = excluded.name, description = excluded.description, cost_gold = excluded.cost_gold,
      effect_type = excluded.effect_type, effect_target = excluded.effect_target,
      effect_value = excluded.effect_value, icon = excluded.icon, rarity = excluded.rarity,
      sort_order = excluded.sort_order;
