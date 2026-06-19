-- ==============================================================================
-- 1. USERS PROFILE TABLE (The Hunter)
-- ==============================================================================
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  hunter_name text unique,
  
  -- Gamification Stats (Server Managed)
  level int default 1,
  total_xp int default 0,
  current_rank text default 'E', -- E, D, C, B, A, S
  current_streak int default 0,
  max_streak int default 0,
  last_login timestamp with time zone default timezone('utc'::text, now()),
  
  -- Attributes (Stats)
  strength int default 10,
  intelligence int default 10,
  constitution int default 10,
  dexterity int default 10,
  charisma int default 10,
  luck int default 10,
  
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS: Private Profile
alter table public.users enable row level security;

create policy "Users can view their own profile" on public.users
  for select using (auth.uid() = id);

-- UPDATE is restricted. XP/Level validation happens via RPC.
create policy "Users can update their avatar/name" on public.users
  for update using (auth.uid() = id);


-- ==============================================================================
-- 2. QUESTS TABLE (The System Missions)
-- ==============================================================================
create table public.quests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  
  title text not null,
  description text,
  type text default 'DAILY', -- DAILY, MAIN, SIDE
  difficulty text default 'E_RANK', -- E_RANK, D_RANK, ... S_RANK
  
  base_xp int default 100,
  attributes text[], 
  deadline timestamp with time zone,
  
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS: Users see their own quests
alter table public.quests enable row level security;

create policy "Users can view their own quests" on public.quests
  for select using (auth.uid() = user_id);

create policy "Users can create quests" on public.quests
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own quests" on public.quests
  for update using (auth.uid() = user_id);

create policy "Users can delete their own quests" on public.quests
  for delete using (auth.uid() = user_id);


-- ==============================================================================
-- 3. QUEST COMPLETIONS (Audit Log)
-- ==============================================================================
create table public.quest_completions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  quest_id uuid references public.quests(id) on delete set null,
  
  xp_awarded int not null,
  completed_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS: Read-Only for Users. Inserted only via RPC.
alter table public.quest_completions enable row level security;

create policy "Users can view their history" on public.quest_completions
  for select using (auth.uid() = user_id);


-- ==============================================================================
-- 4. ACHIEVEMENTS (Milestones)
-- ==============================================================================
create table public.achievements (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  criteria jsonb, -- e.g. {"type": "STREAK", "value": 7}
  icon text
);

alter table public.achievements enable row level security;
create policy "Public read" on public.achievements for select using (true);


-- ==============================================================================
-- 5. SERVER-SIDE LOGIC (The "System")
-- ==============================================================================

-- Trigger: create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, hunter_name)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- RPC: Complete Quest (ANTI-CHEAT)
-- This function runs with "security definer" (SystemAdmin privileges)
-- It allows the server to update arbitrary XP, which the client CANNOT do directly.
create or replace function complete_quest(quest_id uuid)
returns json as $$
declare
  q_record record;
  user_xp int;
  xp_gain int;
begin
  -- 1. fetch quest
  select * into q_record from public.quests where id = quest_id and user_id = auth.uid();
  
  if not found then
    raise exception 'Quest not found or does not belong to you.';
  end if;

  -- 2. Calculate XP (Base + Random Variance based on Luck?)
  xp_gain := q_record.base_xp;

  -- 3. Log Completion
  insert into public.quest_completions (user_id, quest_id, xp_awarded)
  values (auth.uid(), quest_id, xp_gain);

  -- 4. Update User Stats
  update public.users 
  set total_xp = total_xp + xp_gain,
      current_streak = current_streak + 1
  where id = auth.uid();
  
  return json_build_object('success', true, 'xp_gained', xp_gain);
end;
$$ language plpgsql security definer;
