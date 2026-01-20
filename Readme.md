# Solo Leveling

> **"A hunter who doesn't grow is just prey."**  
> Turn your daily life into a generic RPG? No. Turn it into a **Class S** progression system.

![Project Banner](public/og-image.png)

## ⚡ Overview

**Solo Leveling** is a gamified productivity application inspired by the *Solo Leveling* manhwa. It transforms mundane tasks into quests, tracks your "Hunter" progression through XP and leveling, and provides detailed analytics on your personal growth.

Built with a **"Shadow Monarch" Visual DNA**, this isn't just a todo list—it's a cinematic interface for your life.

## 🚀 Key Features

- **System-Based Progression**: Earn XP, level up, and increase your Rank (E-Rank to S-Rank).
- **Attribute System**: visualized stats for Strength, Intelligence, Constitution, etc.
- **Quest Board**: Daily, Weekly, and One-time quests with difficulty ratings.
- **Shadow Army**: (Planned) Visual representations of completed major milestones.
- **Visuals**: Dark mode default, neon accents, glassmorphism, and smooth Framer Motion animations.

## 🛠️ Tech Stack

### Frontend (The System Interface)
- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) + Custom "Shadow Monarch" Design System
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State**: React Hooks (Local) + (Planned) Redux Toolkit
- **Icons**: Lucide React

### Backend (The World System)
- **Core**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Auth**: Supabase Auth (Email/Password + OAuth)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Real-time**: Supabase Subscriptions (planned for notifications)

## 🏁 Quick Start

### Prerequisites
- Node.js v16+
- npm or yarn
- A Supabase project (for backend features)

### Installation

1. **Clone the generic interface:**
   ```bash
   git clone https://github.com/yourusername/solo-leveling-habit-tracker.git
   cd solo-leveling-habit-tracker
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
   npm run dev
   ```

## 📚 Documentation

For deep dives into the system architecture:

- **[Backend Architecture](docs/BACKEND_DOCS.md)**: Database schema, RLS policies, and API interaction.
- **[Frontend Architecture](docs/FRONTEND_DOCS.md)**: Component structure, styling guidelines, and state management.
- **[Contributing Guide](CONTRIBUTING.md)**: How to contribute to the codebase.

## 🎨 Design Philosophy

We strictly adhere to the **Shadow Monarch Visual DNA**:
- **Palette**: Midnight Blue, Electric Purple, Neon Blue.
- **Typography**: Clean, uppercase headers, monospace data points.
- **Feeling**: "System" interface—crisp, responsive, dangerous.

See `SHADOW_MONARCH_VISUAL_DNA.md` for the full style guide.

---

**System Notification:**  
*You have acquired a new skill: [Contributor].*
