# Shadow Monarch Visual DNA & Experience Protocol
> **Target Audience:** Design AI / Creative Directors / Frontend Architects
> **Objective:** Execute a "Cinematic Engineering" overhaul of Solo Leveling. The goal is to replicate the "System Interface" from the anime with high-fidelity web technologies.

---

## 1. The Visual Singularity ("The System")

### 1.1 The "Mana" Color Spectrum
The palette is strictly high-contrast. There are no "grays" or "soft" colors. Everything is either **Void** or **Light**.

*   **The Void (Backgrounds):**
    *   `#020617` (Deep Slate/Onyx): The base layer. Represents the "Dungeon" darkness.
    *   `#000000` (Pure Black): Used for "Abyss" modal overlays and "Penalty Zones."
*   **The System (Primary):**
    *   `#00d9ff` (Electric Cyan): The primary "Mana" color. Used for borders, active states, and XP bars.
    *   `#00ffff` (Hyper Cyan): The glow core. Used for text shadows and particle centers.
*   **The Threat (Danger):**
    *   `#ff0033` (Blood Red): Used for "Boss" deadlines, "Penalty" warnings, and overdue quests.
*   **The Loot (Gold/Success):**
    *   `#ffd700` (Solid Gold): Used for Rank Badges (S-Rank) and Currency.

### 1.2 Typography (The "Machine" Voice)
Text should feel projected, not printed.

*   **Headers (The Interface):** `Space Grotesk`
    *   **Weight:** 700 (Bold) or 900 (Black).
    *   **Tracking:** `-0.05em` (Tighter).
    *   **Transform:** `uppercase`.
    *   **Effect:** `drop-shadow(0 0 10px rgba(0, 217, 255, 0.5))` (Holographic Glow).
*   **Body (The Data):** `Plus Jakarta Sans`
    *   **Weight:** 400 (Regular) / 500 (Medium).
    *   **Legibility:** High aperture for scanning stats.
*   **Utility (The Code):** `JetBrains Mono` or `Inter`
    *   Used for timers, levels, and "System Message" logs.

### 1.3 Lighting & Texture (The "Atmosphere")
The screen is not a 2D plane; it is a 3D window.

*   **Film Grain:** A fixed `opacity: 3%` noise overlay (`bg-noise`) sits on top of *everything* (z-index: 50). This prevents the "flat digital" look.
*   **Holographic Grid:** A subtle `linear-gradient` grid (1px width, 40px spacing, `opacity: 5%`) overlaid on the background.
*   **Vignette:** Radial gradient from transparent to `#020617` at the edges to focus attention on the center.

---

## 2. Cinematic Physics & Motion (Framer Motion / R3F)

### 2.1 The "Living" Background (`SystemBackground`)
*   **Engine:** React Three Fiber (R3F).
*   **Particles:** 2,000 to 5,000 points.
*   **Geometry:** Not a sphere. A **Column/Gate** shape extending upward (y-axis).
*   **Behavior:** Particles float slowly upward (`y += delta * 0.2`) like rising energy/mana.
*   **Depth:** Use `Fog` (`near: 5`, `far: 15`, `color: #020617`) to fade distant particles into the void.

### 2.2 The "Weight" of Interaction (`Magnetic`)
*   **Concept:** The UI knows the cursor is there.
*   **Physics:**
    *   `stiffness: 150`: High tension.
    *   `damping: 15`: Fast settlement.
    *   `mass: 0.1`: Lightweight holographic feel.
*   **Behavior:** Primary buttons and navigation items *pull* towards the mouse cursor within a 50px radius.

### 2.3 The "Unfolding" (`TextReveal`)
*   **Trigger:** Page Load or "System Message" arrival.
*   **Animation:** Staggered character reveal (`staggerChildren: 0.04`).
*   **Ease:** `spring` (`damping: 12`, `stiffness: 100`). Text shouldn't just fade in; it should "type" itself into existence.

---

## 3. The User Journey Protocols (The 4 Acts)

### Act I: The Awakening (Onboarding)
*   **Scene:** Pitch black screen.
*   **Action:** Single `TextReveal`: *"Do you desire power? [Yes] [No]"*
*   **The Choice (Class Selection):**
    *   **Tank:** Video/Image of heavy armor. "Strength is absolute." -> Grants `STR` boost.
    *   **Assassin:** Image of daggers. "Speed is survival." -> Grants `AGI` boost.
    *   **Mage:** Image of runes. "Knowledge is power." -> Grants `INT` boost.
*   **Result:** "System Initialization Complete." -> Transition to Dashboard.

### Act II: The Grind (Dashboard Loop)
*   **State:** "System Blue" (Calm).
*   **The Card:** Glassmorphic container (`backdrop-blur-xl`, `bg-[#020617]/60`).
    *   **Borders:** 1px solid `rgba(0, 217, 255, 0.2)`.
    *   **Decorations:** "Corner Brackets" (L-shapes) at all 4 corners, 2px thick, solid Cyan.
*   **Completion Interaction (The "Slash"):**
    *   **Input:** Swipe Right (Mobile) or Click (Desktop).
    *   **Visual:** A diagonal "Slash" SVG animation (White/Cyan core) cuts the card.
    *   **Aftermath:** The card *shatters* into 20-30 small square particles.
    *   **Absorption:** Particles fly using a bezier curve to the **XP Bar**.
    *   **Feedback:** XP Bar glows bright white, then fills.

### Act III: The Penalty (Failure State)
*   **Trigger:** Missing a Daily Quest for 24h.
*   **Visual Shift:**
    *   Cyan (`#00d9ff`) transitions to Sand/Red (`#ff0033`).
    *   **Glitch Effect:** Text randomly offsets (CSS `clip-path` animation) every 3 seconds.
    *   **Background:** Mana particles turn chaotic/red and move faster (`speed * 2`).
*   **Resolution:** Must complete "Survival Quest" to restore System stability.

---

## 4. UI Component Architecture

### 4.1 The "System Box" (Container)
*   **DNA:** It is not a "Card"; it is a "Window".
*   **Props:**
    *   `border-color`: Dynamic (Cyan = Normal, Red = Danger, Gold = Rank Up).
    *   `glow`: `box-shadow: 0 0 20px -5px var(--color)`.
*   **Motion:** `WhileHover`: Scale 1.01, Border Opacity 0.5 -> 1.0.

### 4.2 The "Status Bar" (XP / Health)
*   **Shape:** Sharp edges (not rounded).
*   **Fill:** Gradient `linear-gradient(90deg, #00d9ff 0%, #00ffff 100%)`.
*   **Animation:** `layout` spring animation. When XP adds, the bar flashes white before filling.

### 4.3 The "Alert" (Toast Notification)
*   **Position:** Top Center (Floating).
*   **Style:** Blue transparent background (`bg-blue-900/80`).
*   **Icon:** "!" inside a triangle.
*   **Sound:** "System Ding" (High pitch, digital chime).

---

## 5. Visual AI Instructions (Prompt Engineering)
*If an AI agent is generating assets or code for this system, use this prompt:*

> "Generate a UI component for the 'Solo Leveling System'. It must use a deep slate background (`#020617`) with electric cyan (`#00d9ff`) accents. The component should look like a holographic projection: glassmorphic transparency, 1px glowing borders, and 'Corner Bracket' decorations. Typography must be Space Grotesk (Headers) and mono-spaced utility text. Interactions should feel weightless but responsive (Magnetic physics)."
