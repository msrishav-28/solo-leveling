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
**CRITICAL**: We do NOT update XP on the client. We verify an action, and the Server updates the stats.

```sql
-- Postgres Function (The Logic)
create function complete_quest(quest_id uuid)
returns json as $$
declare
  quest_xp int;
begin
  -- 1. Get XP for quest
  select base_xp into quest_xp from quests where id = quest_id;

  -- 2. Award XP to User & Update Level
  update users 
  set total_xp = total_xp + quest_xp
  where id = auth.uid();

  -- 3. Log it
  insert into quest_completions (user_id, quest_id, xp_awarded)
  values (auth.uid(), quest_id, quest_xp);
end;
$$ language plpgsql security definer;
```

**Client Call:**
```javascript
const { data, error } = await supabase.rpc('complete_quest', { quest_id: '...' })
```
