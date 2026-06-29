# Solo Leveling

> **"A hunter who doesn't grow is just prey."**  
> Turn your daily life into a generic RPG? No. Turn it into a **Class S** progression system.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Overview

**Solo Leveling** is a gamified productivity application inspired by the *Solo Leveling* manhwa. It transforms mundane tasks into quests, tracks your "Hunter" progression through XP and leveling, and provides detailed analytics on your personal growth.

Built with a **"Shadow Monarch" Visual DNA**, this isn't just a todo list—it's a cinematic interface for your life.

## Key Features

- **System-Based Progression**: Earn XP, level up, and increase your Rank (E-Rank to S-Rank) — all server-authoritative and cheat-proof.
- **Attribute System**: Six stats (STR/INT/CON/DEX/CHA/LUK) buffed by completing linked quests; class selection grants starting boosts.
- **Quest Board**: Daily, Weekly, and One-time quests with difficulty ratings, full create/edit, and a "slash to execute" completion flow.
- **Penalty Zone**: Miss a quest and the System glitches red — XP is locked until you clear an auto-spawned Survival Quest.
- **Dungeons (Projects)**: Treat projects as raids with milestone "floors", a deadline "boss", and a **Rune Stone** reward on clear.
- **Achievements**: Real, one-time unlocks that credit bonus XP, with rarity tiers (common → legendary).
- **System Shop**: Spend earned gold on permanent attribute Elixirs and unlockable Titles — a real economy sink (`/shop`).
- **Shadow Army**: A working referral system — hunters who join via your sigil become your Shadows, and you absorb 5% of their XP.
- **Cinematic Completion**: Striking a quest shatters the card into mana particles that fly toward the XP bar, with a "Systemize" generator that rewrites plain tasks into RPG flavor.
- **Cinematic Visuals**: R3F/Three.js gate scenes, mana particles, holographic grids, glass surfaces, system toasts, and Framer Motion interactions.
- **Product Landing**: A full marketing experience at `/` with a direct entry path to `/auth`.
- **Responsive App Shell**: Mobile navigation and adaptive layouts across the dashboard, dungeons, leaderboard, rewards, and system states.

## Quick Start

### Prerequisites
- Node.js v18+
- npm
- A free [Supabase](https://supabase.com) project (PostgreSQL + Auth)

### Installation

1. **Clone & install:**
   ```bash
   git clone https://github.com/msrishav-28/solo-leveling.git
   cd solo-leveling
   npm install
   ```

2. **Provision the database:**
   In the Supabase Dashboard open **SQL Editor**, paste the full contents of
   [`schema.sql`](schema.sql) and **Run**. This creates the tables, Row Level
   Security policies, the server-authoritative `complete_quest` / `apply_job_change`
   / `get_leaderboard` functions, the signup trigger, indexes and seed
   achievements. The script is safe to re-run after edits.

   > Optional: enable **Realtime** on the `users` table (Database → Replication)
   > for live XP/level updates across tabs. The app also refreshes on navigation,
   > so it works without it.

   > Recommended for local testing: **Authentication → Providers → Email →**
   > turn **off** "Confirm email" so new accounts get a session immediately.
   > If left on, users must confirm via email before signing in.

3. **Environment Setup:**
   Copy `.env.example` to `.env` and fill in your project values
   (Project Settings → API):
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Awaken the System (dev server):**
   ```bash
   npm start          # or: npm run dev  → http://localhost:5173
   ```

5. **Verify the build & logic:**
   ```bash
   npm test           # vitest — gamification + validation unit tests
   npm run build      # production build to dist/
   npm run serve      # preview the production build locally
   ```

Vercel deployment is configured through `vercel.json` (Vite build + SPA rewrite
for React Router). See the project handoff for full deployment steps.

## Documentation

For deep dives into the system architecture:

- **[Backend Architecture](docs/BACKEND_DOCS.md)**: Database schema, RLS policies, and API interaction.
- **[Frontend Architecture](docs/FRONTEND_DOCS.md)**: Component structure, styling guidelines, and state management.
- **[Contributing Guide](CONTRIBUTING.md)**: How to contribute to the codebase.

## Design Philosophy

We strictly adhere to the **Shadow Monarch Visual DNA**:
- **Palette**: Void blue-black, electric cyan, threat red, and rank gold.
- **Typography**: Clean, uppercase headers, monospace data points.
- **Feeling**: "System" interface—crisp, responsive, dangerous.

See `SHADOW_MONARCH_VISUAL_DNA.md` for the full style guide.

---

**System Notification:**  
*You have acquired a new skill: [Contributor].*
