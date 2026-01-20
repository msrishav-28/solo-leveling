# Solo Leveling - Production Roadmap

> **"The System is absolute. Grow, or be left behind."**
> This roadmap outlines the strategic path to scale **Solo Leveling** from an MVP to a Class-S Production App.

---

## 🛑 Current State Analysis (Phase 1 Complete)

### ✅ What's Working
-   **Visual DNA**: "Shadow Monarch" aesthetic (System Window, Particles, Magnetic UI) is 100% implemented.
-   **Frontend Core**: React 18 + Vite architecture is solid.
-   **UI Library**: 50+ reusable components.

### ⚠️ Critical Scaling Gaps
1.  **Data Persistence**: Apps rely on Supabase; currently data is local/mock.
2.  **Security Risk**: Client-side logic allows easy cheating (e.g., manually editing XP).
3.  **Real-time Interaction**: No push notifications for Quest Reminders.

---

## 🚀 Phase 2: The Backend Awakening (Server-Authoritative)

*Shift all logic to the server. The Client is just a Viewer.*

### 1. Robust Database Schema (PostgreSQL)
The "System" requires a strictly typed schema to prevent data corruption.

```sql
-- Core Player Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hunter_name VARCHAR(50) UNIQUE NOT NULL,
  level INT DEFAULT 1,
  total_xp INT DEFAULT 0,
  rank VARCHAR(2) DEFAULT 'E', -- E, D, C, B, A, S
  current_streak INT DEFAULT 0,
  max_streak INT DEFAULT 0,
  last_login TIMESTAMP DEFAULT now()
);

-- The Quest Log
CREATE TABLE quests (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255),
  type VARCHAR(20), -- 'DAILY', 'MAIN', 'SIDE'
  difficulty VARCHAR(20), -- 'E_RANK' (Easy) to 'S_RANK' (Impossible)
  attributes JSONB, -- ['STR', 'INT']
  base_xp INT NOT NULL,
  deadline TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- The Completion Audit Log (Anti-Cheat)
CREATE TABLE quest_completions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  quest_id UUID REFERENCES quests(id),
  completed_at TIMESTAMP DEFAULT now(),
  xp_awarded INT,
  streak_bonus_applied BOOLEAN
);

-- Achievements
CREATE TABLE achievements (
  id UUID PRIMARY KEY,
  title VARCHAR(100),
  criteria JSONB -- Logic stored here
);
```

### 2. Security (Row Level Security)
-   **Rule 1**: Users can *only* see their own attributes (The System is private).
-   **Rule 2**: Quest completions are **INSERT ONLY**. A user cannot "un-complete" or modify a past log.

---

## ⚔️ Phase 3: Server-Side Authority (Anti-Cheat)

*Never trust the client. All progression logic lives in the Database.*

### 1. The "Complete Quest" RPC (Postgres Function)
Client calls `rpc('complete_quest', { quest_id })`. The DB handles the rest:
1.  Verify Quest belongs to User.
2.  Calculate XP based on Difficulty + Streak.
3.  Insert into `quest_completions`.
4.  Update User XP & Level (Formula: `Level = sqrt(Total_XP) * 0.1`).
5.  Return new stats.

**Benefit**: Impossible to cheat by editing local JavaScript variables.

### 2. Streak Logic (Scheduled Triggers)
-   **pg_cron**: A nightly cron job runs on the DB to check `last_login`.
-   If `now() - last_login > 24h`, reset `current_streak` to 0.

---

## 🔮 Phase 4: Future Expansion (Nice-to-Haves)

### 1. AI "Flavor Text" (Free / Local)
-   **Option A**: **Google Gemini API** (Generous free tier to generate quest descriptions).
-   **Option B**: **WebLLM** (Run small models like Llama-3 or Phi-3 directly in the browser). *Zero cost, runs on user's GPU.*
-   *Input:* "Do laundry" -> *Output:* "Quest: Purify the Shadow Realm Armor"

### 2. Social "Dungeons"
-   Group Quests (Raids) where multiple users contribute to a goal.
-   Requires: Real-time Supabase Subscriptions.

---

## 🛠️ Technical Scaling Strategy
1.  **State Management**: Move from `useState` to **Redux Toolkit** (or TanStack Query) to cache Player Data.
2.  **Performance**: Implement Virtualization for long Quest Lists.
3.  **Edge Functions**: Move heavy heavy logic (e.g., AI calls) to Edge Functions.
