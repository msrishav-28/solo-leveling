# Contributing to Solo Leveling

**"The weak allow themselves to be devoured. The strong devour."**  
We welcome other Hunters to help build the ultimate progression system. Here is how you can join the raid.

## 🔧 Development Setup

1.  **Fork & Clone**: Fork the repository and clone it locally.
2.  **Dependencies**: Run `npm install` to grab all required artifacts.
3.  **Supabase**:
    *   You will need a local or cloud Supabase instance.
    *   Run the SQL found in `schema.sql` in your Supabase SQL Editor to set up the tables.
    *   Add your credentials to `.env`.

## 📐 Code Style & Visual DNA

**CRITICAL**: This project relies heavily on a specific aesthetic defined in **`SHADOW_MONARCH_VISUAL_DNA.md`**.

*   **Do not use default Tailwind colors** unless they match our palette.
*   **Do not introduce rounded corners > `rounded-xl`** without reason. We prefer sharp or slightly rounded industrial edges.
*   **Animations** should be snappy (`easeOut`, `duration-300`). No sluggish transitions.

### Component Structure
*   **Functional Components**: Use React functional components with Hooks.
*   **Props**: Destructure props clearly.
*   **Imports**: Group imports: React -> Library -> Internal Components -> Styles/Assets.

## 📝 Pull Request Process

1.  **Branching**: specific branches please (e.g., `feature/quest-board-v2`, `fix/login-glitch`).
2.  **Commits**: Conventional Commits style (`feat: add xp bar`, `fix: resolve overflow`).
3.  **Visuals**: If you change the UI, **you must attach a screenshot or GIF** to your PR. The System needs to see the changes.

## 🐛 Reporting Bugs

If you encounter a "System Error" (bug):
1.  Check existing Issues.
2.  Create a new Issue with:
    *   **Description**: What broke?
    *   **Reproduction**: How do we break it too?
    *   **Environment**: Browser, Device, OS.

## 📜 License

[MIT](LICENSE) - Do whatever you want, just don't stop leveling up.
