# Frontend Architecture (The System Interface)

> **"Status Window: Open."**  
> This document details the client-side architecture of Solo Leveling.

## 🎨 The Shadow Monarch Design System

The UI is not just "Dark Mode"; it is a "System Interface". We prioritize immersion over standard material design patterns.

### Core Visual Principles
1.  **The Void**: Backgrounds are deep slate/onyx (`#020617`), never pure black (unless for contrast).
2.  **The Mana**: Primary accent is Electric Cyan (`#00d9ff`). It glows.
3.  **The Danger**: Red (`#ff0033`) is reserved for penalties and urgent deadlines.
4.  **Holographic Depth**: Glassmorphism (`backdrop-blur`) + 1px borders + Box Shadows create a 3D overlay feel.

**Reference**: See `SHADOW_MONARCH_VISUAL_DNA.md` for exact hex codes and typography rules.

## 🧩 Component Architecture

We follow a typical React structure, but simplified for clarity.

```
src/
├── components/         # Reusable UI elements
│   ├── ui/            # Primitive atoms (Buttons, Inputs, Cards)
│   ├── layout/        # Sidebar, Header, PageWrap
│   └── features/      # QuestCard, XPBar, StatsHexagon
├── pages/             # Route-level components (Dashboard, Profile)
├── lib/               # Utility configurations (Supabase client)
└── hooks/             # Custom logic (useAuth, useQuests)
```

### Key Components

#### `SystemBox` (Card)
The fundamental container. It is not a white rounded card. It is a glass panel with specific borders.
-   **Props**: `variant` ('default', 'danger', 'gold').
-   **Style**: `bg-slate-950/80 border border-cyan-500/20`.

#### `XPBar`
A mandatory element on the dashboard.
-   **Behavior**: Fills with a "flash" animation (Framer Motion).
-   **Visual**: Gradient Cyan fill.

## ⚡ State Management

### current: Local State + Context
For the MVP, we use React `useState` and `useContext` for:
-   **AuthContext**: User session and profile data.
-   **Local State**: Form inputs, modal toggles.

### Planned: Redux Toolkit
As the "System" grows (Inventory, Guilds, Raid Parties), we will migrate global state to Redux Toolkit to avoid prop-drilling hell.

## 🛣️ Routing

We use **React Router v6**.

-   `/`: Landing / Login (The "Awakening").
-   `/dashboard`: Main quest board (The "Instance").
-   `/profile`: Stats and attribute distribution.
-   `/inventory`: (Planned) Item management.

## 🎭 Animations

All animations use **Framer Motion**.

-   **Page Transitions**: Pages do not "appear"; they "construct" or "slide" in.
-   **Hover Effects**: Buttons have "magnetic" pull or "glow" intensity increases.
-   **Text**: Major headers use character-staggered reveals (like a typewriter logs).
