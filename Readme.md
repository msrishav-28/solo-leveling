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

- **System-Based Progression**: Earn XP, level up, and increase your Rank (E-Rank to S-Rank).
- **Attribute System**: visualized stats for Strength, Intelligence, Constitution, etc.
- **Quest Board**: Daily, Weekly, and One-time quests with difficulty ratings.
- **Shadow Army**: A referral/extraction modal interface; backend-backed army data remains future work.
- **Cinematic Visuals**: R3F/Three.js gate scenes, mana particles, holographic grids, glass surfaces, and Framer Motion interactions.
- **Product Landing**: A full marketing experience at `/` with a direct entry path to `/auth`.
- **Responsive App Shell**: Mobile navigation and adaptive layouts across the dashboard, forms, dungeons, leaderboard, rewards, and system states.

## Quick Start

### Prerequisites
- Node.js v18+
- npm
- A Supabase project (for backend features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/msrishav-28/solo-leveling.git
   cd solo-leveling
   ```

2. **Install modules:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Awaken the System:**
   ```bash
   npm start
   ```

5. **Create a production build:**
   ```bash
   npm run build
   ```

The Vite development server runs at `http://localhost:5173` by default. Vercel deployment is configured through `vercel.json`, including the SPA rewrite required by React Router.

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
