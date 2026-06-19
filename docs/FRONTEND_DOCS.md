# Frontend Architecture (The System Interface)

> **"Status Window: Open."**  
> This document details the client-side architecture of Solo Leveling.

## The Shadow Monarch Design System

The UI is not just "Dark Mode"; it is a "System Interface". We prioritize immersion over standard material design patterns.

### Core Visual Principles
1.  **The Void**: Backgrounds are deep slate/onyx (`#020617`), never pure black (unless for contrast).
2.  **The Mana**: Primary accent is Electric Cyan (`#00d9ff`). It glows.
3.  **The Danger**: Red (`#ff0033`) is reserved for penalties and urgent deadlines.
4.  **Holographic Depth**: Glassmorphism (`backdrop-blur`) + 1px borders + Box Shadows create a 3D overlay feel.

**Reference**: See `SHADOW_MONARCH_VISUAL_DNA.md` for exact hex codes and typography rules.

## Component Architecture

The frontend is a single React 18 application built with Vite. The marketing landing and product surfaces share one Tailwind design system and one dependency graph.

```
src/
|-- components/
|   |-- cinematic/       # Shared R3F atmosphere, system windows, motion, effects
|   |-- landing/         # Product-marketing landing sections and gate scene
|   `-- ui/              # Buttons, header, and reusable controls
|-- hooks/               # Auth, player, quest, and sound behavior
|-- lib/                 # Supabase client
|-- pages/               # Route-level product and marketing screens
|-- styles/              # Global tokens, utilities, and component classes
`-- utils/               # Shared helpers and temporary secondary dashboard data
```

### Key Components

#### `SystemBackground`
The shared application atmosphere. It renders an R3F canvas using direct Three.js geometry and materials, with mana, danger, and gold tones plus responsive particle counts.

#### `GateCanvas`
The product landing's full-bleed 3D gate. It uses a reduced-motion fallback and a smaller mobile particle budget.

#### `SystemBox`
The fundamental product container. It supports `primary`, `danger`, `gold`, and `shadow` variants, corner brackets, scanlines, glass depth, and optional motion.

#### `Button`, `Header`, and `AppIcon`
Shared product controls provide consistent sizes, states, system audio feedback, Lucide icons, responsive navigation, and accessible labels.

#### Landing Sections
`Atmosphere`, `Boot`, `Nav`, `Hero`, `SystemMessage`, `Classes`, `Loop`, `Hexagon`, `PenaltyZone`, `Proof`, `Summon`, and `Footer` compose the marketing experience without a separate standalone frontend.

## State Management

### Current: Local State + Supabase Hooks
-   `useAuth` reads the Supabase session and exposes email/password sign-in, registration, and sign-out.
-   `usePlayerStats` reads and subscribes to the authenticated player's record.
-   `useQuests` reads, creates, and completes authenticated quest records.
-   Local `useState` handles view state such as forms, navigation, animation steps, and dialogs.
-   Secondary dashboard achievements, reminders, and aggregate quick stats currently come from `src/utils/mockData.js`; quest and player flows do not.

Add a query/cache layer only when shared asynchronous state or invalidation becomes complex enough to justify it. Do not duplicate Supabase data into global state by default.

## Routing

The app uses **React Router v6** with a global error boundary, scroll restoration, a wildcard 404, and Vercel SPA rewrites.

-   `/`: Product marketing landing.
-   `/landing-page`: Alias of the product landing.
-   `/auth`: Supabase email/password authentication and registration.
-   `/job-change`: Class-selection onboarding.
-   `/dashboard`: Main quest board (The "Instance").
-   `/leaderboard`: Hunter ranking interface.
-   `/dungeon/:id`: Dynamic dungeon detail and combat flow.
-   `/quest-creation-modal`: Quest create/edit screen.
-   `/quest-completion-modal`: Completion confirmation and reward transition.
-   `/reward-screen`: Rank and reward presentation.
-   `*`: Cinematic not-found state.

The marketing CTA "Awaken My Hunter" routes to `/auth`.

## Motion and 3D

-   **Framer Motion** drives reveals, magnetic interactions, modal transitions, progress feedback, and slash effects.
-   **React Three Fiber + Three.js** drive the marketing gate and product atmosphere.
-   **Lenis** provides smooth marketing-page scrolling when reduced motion is not requested.
-   **Reduced Motion** replaces the animated gate with a static treatment.
-   **Responsive Rendering** lowers particle counts on smaller screens and constrains layout overflow.

## Styling and Deployment

-   Tailwind CSS 3 consumes shared colors, typography, radii, shadows, motion, and spacing from `tailwind.config.js` and `src/styles/globals.css`.
-   Google Fonts load Space Grotesk, Plus Jakarta Sans, and JetBrains Mono.
-   `npm start` launches Vite; `npm run build` writes the production bundle to ignored `dist/`.
-   `vercel.json` declares the Vite build and rewrites all application routes to `index.html`.
