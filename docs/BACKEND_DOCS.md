# Backend Architecture (The World System)

> **"The System is absolute."**  
> This document outlines the **Server-Authoritative** logic, database schema, and security protocols that govern Solo Leveling.
> **All progression logic (XP, Leveling) lives on the database to prevent client-side exploitation.**

## Core Architecture

The backend is built on **Supabase**, utilizing its suite of tools to provide a "Serverless" yet powerful backend:

-   **Database**: PostgreSQL (Relational Data)
-   **Authentication**: Supabase Auth (JWT based)
-   **Security**: Row Level Security (RLS) policies
-   **API**: Auto-generated REST implementation via PostgREST

## Database Schema

The database models the User's "Hunter" status and their Quest log.

### 1. `users` (The Hunter Profile)
Extends the default `auth.users` table to store game stats.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, references `auth.users.id` |
| `hunter_name` | `text` | Unique display name |
| `level` | `int` | Current Hunter Level (Default: 1) |
| `total_xp` | `int` | Lifetime accumulated XP |
| `current_rank` | `text` | Rank (E, D, C, B, A, S) |
| `strength`, `intelligence`, etc. | `int` | Core Attributes (Default: 10) |

### 2. `quests` (The Mission Board)
Stores all available quests tailored to the user.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `user_id` | `uuid` | Foreign Key to `users.id` |
| `title` | `text` | Quest Objective |
| `type` | `text` | `DAILY`, `WEEKLY`, `ONE_TIME` |
| `difficulty` | `text` | `EASY` -> `BOSS` |
| `base_xp` | `int` | Reward value |
| `attributes` | `text[]` | Attributes buffed by this quest |

### 3. `quest_completions` (The Log)
A history of completed quests for analytics and streaks.

| Column | Type | Description |
| :--- | :--- | :--- |
| `xp_gained` | `int` | Actual XP awarded (base + modifiers) |
| `completed_at` | `timestamp` | Time of completion |

## Security Policies (RLS)

We strictly enforce **Row Level Security**. No data is exposed without proper authorization.

### Users Table
-   **SELECT**: Users can view *only* their own profile.
-   **UPDATE**: Users can update *only* their own profile.

### Quests & Completions
-   **CRUD**: Users have full access to create, read, update, and delete *only* rows where `user_id` matches their authenticated UID.

## API Interaction

We interact with the database using the **Supabase JavaScript Client** (`@supabase/supabase-js`).

### Example: Fetching Quests
```javascript
import { supabase } from './supabaseClient'

const { data, error } = await supabase
  .from('quests')
  .select('*')
  .eq('is_active', true)
```

### Example: Completing a Quest (Server-Authoritative)
**CRITICAL**: We do NOT update XP on the client. The client only signals intent;
Postgres decides the reward. See the full implementation in [`schema.sql`](../schema.sql).

The `complete_quest(quest_id uuid)` SECURITY DEFINER function:
1. Verifies the quest belongs to `auth.uid()` and is not already completed.
2. Computes XP from the quest's **difficulty** (`xp_for_difficulty`) — it ignores
   any client-supplied `base_xp`, so a client cannot inflate its reward.
3. Maintains the daily streak (based on the last completion date).
4. Recomputes `level` and `current_rank`, awards gold, and buffs each linked
   attribute by +1.
5. Logs the completion and closes the quest (`is_completed = true`).
6. Returns a JSON summary used to render the reward screen.

A `protect_user_stats` trigger additionally freezes all progression columns
against direct `UPDATE`s through PostgREST, so XP/level/gold can **only** change
inside the definer functions.

**Client Call:**
```javascript
const { data, error } = await supabase.rpc('complete_quest', { quest_id: '...' })
// data -> { success, xp_gained, gold_gained, level, rank, leveled_up, streak, ... }
```

**Other RPCs:** `apply_job_change(p_class)` (onboarding: sets class + attribute
boosts, grants starter gold + quests) and `get_leaderboard(limit_count)` (public
ranking that bypasses per-row RLS to expose only non-sensitive columns).

## Expansion features (tables + RPCs)

| Domain | Tables | Key RPCs |
| :--- | :--- | :--- |
| **Penalty Zone** | `users.penalty_active`, `quests.is_survival` | `check_penalty()` — detects an overdue quest, flips penalty on, spawns a Survival Quest. `complete_quest` blocks non-survival XP while penalty is active; clearing the Survival Quest lifts it. |
| **Achievements** | `achievements`, `user_achievements` | `evaluate_achievements(user)` — called inside `complete_quest`/`clear_floor`; unlocks once and credits bonus XP. |
| **Dungeons** | `dungeons`, `dungeon_floors`, `rune_stones` | `create_dungeon(...)` (atomic dungeon + ordered floors), `clear_floor(floor)` (clears a floor; last floor defeats the boss → grants a Rune Stone + XP/gold). |
| **Shadows** | `users.referral_code`, `shadows` | `bind_shadow(code)` (servant binds to a code owner, once), `get_my_shadows()` (definer list of the caller's shadows). `complete_quest` pays the master 5% of each shadow's XP. |
| **Shop** | `shop_items`, `user_items`, `users.title` | `purchase_item(code)` — spends gold (server-checked), then permanently raises an attribute (`ATTR`) or unlocks a `TITLE`. Gold is the economy sink. |
| **Streak decay** | — | `check_penalty()` also resets `current_streak` to 0 when no completion has occurred since before yesterday (no `pg_cron` dependency). |

All progression-mutating RPCs are `SECURITY DEFINER` and route stat changes
through `award_xp`, which sets the `app.allow_stat_update` session flag so the
`protect_user_stats` trigger permits the write. Direct PostgREST writes to
XP/level/rank/gold/streak/attributes/penalty/referral columns are rejected.
