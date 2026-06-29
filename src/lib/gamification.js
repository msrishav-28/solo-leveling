// ============================================================================
// Gamification core logic — the single source of truth for the "System".
//
// IMPORTANT: These rules are mirrored 1:1 in `schema.sql` (the complete_quest
// RPC). The server is authoritative for XP/level/rank; these client helpers
// exist for display (progress bars, previews) and for tests. If you change a
// number here, change it in schema.sql too.
// ============================================================================

export const XP_PER_LEVEL = 1000;

/** The six canonical Hunter attributes. `column` maps to the users table. */
export const ATTRIBUTES = [
  { id: 'STR', name: 'Strength', column: 'strength', icon: 'Sword' },
  { id: 'INT', name: 'Intelligence', column: 'intelligence', icon: 'Brain' },
  { id: 'CON', name: 'Constitution', column: 'constitution', icon: 'Shield' },
  { id: 'DEX', name: 'Dexterity', column: 'dexterity', icon: 'Zap' },
  { id: 'CHA', name: 'Charisma', column: 'charisma', icon: 'Users' },
  { id: 'LUK', name: 'Luck', column: 'luck', icon: 'Clover' },
];

export const ATTRIBUTE_IDS = ATTRIBUTES.map((a) => a.id);

/** Quest difficulty tiers. `xp` is the authoritative reward for that tier. */
export const DIFFICULTIES = [
  { id: 'E_RANK', short: 'E', label: 'E-Rank', xp: 50 },
  { id: 'D_RANK', short: 'D', label: 'D-Rank', xp: 100 },
  { id: 'C_RANK', short: 'C', label: 'C-Rank', xp: 200 },
  { id: 'B_RANK', short: 'B', label: 'B-Rank', xp: 400 },
  { id: 'A_RANK', short: 'A', label: 'A-Rank', xp: 800 },
  { id: 'S_RANK', short: 'S', label: 'S-Rank', xp: 1600 },
];

export const DIFFICULTY_IDS = DIFFICULTIES.map((d) => d.id);

export const QUEST_TYPES = [
  { id: 'DAILY', label: 'Daily' },
  { id: 'WEEKLY', label: 'Weekly' },
  { id: 'ONE_TIME', label: 'One-Time' },
];

export const QUEST_TYPE_IDS = QUEST_TYPES.map((t) => t.id);

export const RANKS = ['E', 'D', 'C', 'B', 'A', 'S'];

/** Map a short difficulty letter (E/D/C/B/A/S) to its canonical id. */
export function difficultyFromShort(short) {
  const found = DIFFICULTIES.find((d) => d.short === String(short).toUpperCase());
  return found ? found.id : 'E_RANK';
}

/** Authoritative base XP for a difficulty id. Unknown difficulty -> E tier. */
export function xpForDifficulty(difficultyId) {
  const found = DIFFICULTIES.find((d) => d.id === difficultyId);
  return found ? found.xp : DIFFICULTIES[0].xp;
}

/** Gold awarded for an XP amount (10% of XP, floored). */
export function goldForXp(xp) {
  return Math.floor((Number(xp) || 0) / 10);
}

/** Current level for a given lifetime XP total. Level 1 = 0..999 XP. */
export function levelForXp(totalXp) {
  const xp = Math.max(0, Number(totalXp) || 0);
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

/** Lifetime XP required to have reached the start of a given level. */
export function xpFloorForLevel(level) {
  return Math.max(0, (level - 1)) * XP_PER_LEVEL;
}

/** Hunter rank derived from level. */
export function rankForLevel(level) {
  if (level >= 50) return 'S';
  if (level >= 35) return 'A';
  if (level >= 20) return 'B';
  if (level >= 10) return 'C';
  if (level >= 5) return 'D';
  return 'E';
}

/**
 * Full progress breakdown for a lifetime XP total. Used to drive the XP bar.
 * Returns level, rank, XP into the current level, XP needed for the level,
 * the next-level threshold and a 0..100 percent.
 */
export function progressForXp(totalXp) {
  const xp = Math.max(0, Number(totalXp) || 0);
  const level = levelForXp(xp);
  const floor = xpFloorForLevel(level);
  const into = xp - floor;
  const needed = XP_PER_LEVEL;
  return {
    totalXp: xp,
    level,
    rank: rankForLevel(level),
    levelXP: floor,
    nextLevelXP: floor + needed,
    xpIntoLevel: into,
    xpForLevel: needed,
    percent: Math.min(100, Math.round((into / needed) * 100)),
  };
}
