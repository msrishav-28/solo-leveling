# The Shadow Monarch Blueprint: "Solo Leveling" Habit Tracker
> **Project Valuation:** $10,000 (Target)
> **Product Philosophy:** "The app is not a tool; it is 'The System'. The user is the Player. Real life is the Game."

---

## 1. Executive Summary
This document outlines the architectural, design, and product strategy to transform a standard habit tracker into a **Cinematic Life-RPG**. The goal is to deliver a High-Fidelity, "Elite" experience that justifies a high-value contract by merging **Cinematic Engineering** with **Gamified Psychology**.

---

## 2. Product Architecture: The 4 Acts

### ACT I: THE AWAKENING (Onboarding)
*Goal: Immersion & Identity Formation. Replacing boring forms with narrative.*

*   **The "Death" Screen (Landing):**
    *   **Visual:** Pitch black void. A single notification bell rings.
    *   **Action:** `TextReveal` animation displays: *"You have 1 Unread Message from The System."*
    *   **Trigger:** Clicking the message initiates the "System Initialization" (Blue mana lines scanning the viewport).
*   **The "Job Change" Quest (Setup):**
    *   **Prompt:** *"What is your desire?"* (Instead of "Choose Habits")
    *   **Class Selection:**
        *   **Tank (Fitness):** Focus on Strength (STR) / Constitution (CON). *Auto-Equip: "Daily Quest: 100 Pushups".*
        *   **Mage (Intellect):** Focus on Intelligence (INT) / Wisdom (WIS). *Auto-Equip: "Daily Quest: Deep Work".*
        *   **Assassin (Wealth/Career):** Focus on Agility (AGI) / Sense (SENS). *Auto-Equip: "Daily Quest: Market Research".*
*   **First Reward:** Immediate grant of "Player Title: The Awakened" + 100 Gold upon setup completion.

### ACT II: THE GRIND (The Core Loop)
*Goal: High-Dopamine Habit Execution.*

*   **The System Interface (Dashboard):**
    *   **Visuals:** `SystemBackground` (Cyan Mana Particles), Glassmorphic "System Boxes", Holographic Grids.
    *   **Interaction:** `Magnetic` buttons for tactile feel.
*   **The "Slash" Mechanic (Task Completion):**
    *   **Action:** Users swipe/click to "Strike" a task.
    *   **Animation:** A CSS/SVG "Dagger Slash" cuts across the card.
    *   **Feedback:** The card shatters into cyan particles -> Particles fly into the XP Bar -> Audio "Crunch/Ding".
    *   **System Toast:** *"[SYSTEM]: You have defeated 'Morning Meditation'. Absorbed 150 XP."*
*   **The Penalty Zone (Retention):**
    *   **Trigger:** Missing the "Daily Quest" (Core Habit) for 24 hours.
    *   **Visual Shift:** The UI glitches. The Blue/Cyan theme bleeds into **Red/Sand**.
    *   **Debuff:** XP gain disabled until a "Survival Quest" (e.g., "Do 2 minutes of focus NOW") is cleared.

### ACT III: THE DUNGEON (Project Management)
*Goal: Long-term Goal Execution.*

*   **Dungeon Keys:** Projects are treated as "Dungeons".
    *   **Floors:** Project Milestones (Floor 1 = Research, Floor 2 = MVP).
    *   **Boss Battle:** The Final Deadline.
    *   **Timer:** A literal countdown clock to the "Boss Fight".
*   **Rewards:** Completing a Dungeon grants a "Rune Stone" (Permanent profile badge/buff).

### ACT IV: SHADOW EXTRACTION (Social)
*Goal: Viral Growth.*

*   **"Arise" (Referrals):**
    *   **Concept:** You don't "invite friends"; you "Arise Shadows".
    *   **Mechanic:** Friends who join via your link become your "Shadow Soldiers".
    *   **Incentive:** The Master earns 5% of all XP earned by their Shadows.

---

## 3. Cinematic Design System ("Cinematic Engineering")

### Visual Identity
*   **Theme:** "The System" (Solo Leveling Anime Aesthetic).
*   **Palette:**
    *   **Background:** Deep Slate/Blue Black (`#020617`).
    *   **Primary:** System Cyan (`#00d9ff`).
    *   **Accent:** Danger Red (`#ff0033`) (For Bosses/Penalties).
    *   **Text:** White with Cyan Glow (`drop-shadow`).
*   **Texture:** `Film Grain` overlay (3% opacity) + Holographic Grid lines.

### Interactive Components (Implemented)
1.  **SystemBackground (`src/components/cinematic/SystemBackground.jsx`):**
    *   R3F Canvas with 2,000 Cyan "Mana Particles" rising in a column.
    *   Fog and Shadow Mist for depth.
2.  **Magnetic Buttons (`src/components/cinematic/Magnetic.jsx`):**
    *   Physics-based spring animation that pulls UI elements toward the cursor.
3.  **TextReveal (`src/components/cinematic/TextReveal.jsx`):**
    *   Staggered character animation for cinematic "typing" effects.
4.  **Glassmorphism:**
    *   `backdrop-blur-xl` + `border-cyan-500/20` + Decorative "Corner Brackets".

---

## 4. Technical Architecture (The Engine)

### Tech Stack
*   **Frontend:** React 18 + Vite.
*   **Styling:** Tailwind CSS + Framer Motion.
*   **3D/Visuals:** React Three Fiber (R3F) + Drei.
*   **Backend:** **Supabase** (PostgreSQL + Auth + Realtime).

### Database Schema (Supabase)
*   **`players`**:
    *   `id` (UUID)
    *   `class` (Tank/Mage/Assassin)
    *   `level` (Int)
    *   `current_xp` (Int)
    *   `rank` (Enum: E, D, C, B, A, S)
    *   `gold` (Int)
*   **`quests`**:
    *   `id` (UUID)
    *   `player_id` (FK)
    *   `title` (String)
    *   `type` (Daily/Dungeon)
    *   `status` (Active/Completed/Failed)
    *   `streak` (Int)
*   **`shadows`**:
    *   `master_id` (FK)
    *   `servant_id` (FK)

---

## 5. Development Roadmap (Sprint Plan)

| Phase | Component | Key Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **The Interface** | System Window UI, 3D Background, Magnetic Interactions | ✅ **Done** |
| **Phase 2** | **The Logic** | Supabase Connection, Auth (Magic Link), Real Data | 🔲 Next |
| **Phase 3** | **The Awakening** | Onboarding Wizard, Class Selection Logic | 🔲 Pending |
| **Phase 4** | **The Loop** | "Slash" Animation, XP Calculation, Level Up Modal | 🔲 Pending |
| **Phase 5** | **The Polish** | Sound Effects (SFX), Mobile Optimization, Glitch Effects | 🔲 Pending |

---

## 6. Critical Audits & Fixes (From Review)

### UX/Flow Fixes
*   **Start vs. Complete:** Remove redundancy. "Daily" quests get a Checkbox. "Timed" quests get a "Start" button.
*   **Edit Modal:** Ensure "Edit" actually pre-fills data (currently wipes it).
*   **Empty State:** Never show an empty dashboard. Always pre-fill with "Class Quests".

### Technical Debts
*   **Routing:** Secure `/dashboard` with a `ProtectedRoute` wrapper immediately.
*   **State:** Move from local `useState` to React Context or Supabase Hooks (`useQuery`).

---

> **Final Note:** This blueprint is the "Bible" for the project. Every feature must answer: *"Does this make the user feel like the Shadow Monarch?"* If no, cut it.
