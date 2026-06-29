import { describe, it, expect } from 'vitest';
import {
  levelForXp,
  rankForLevel,
  xpForDifficulty,
  difficultyFromShort,
  goldForXp,
  progressForXp,
  xpFloorForLevel,
} from './gamification';

describe('levelForXp', () => {
  it('starts everyone at level 1', () => {
    expect(levelForXp(0)).toBe(1);
    expect(levelForXp(999)).toBe(1);
  });
  it('advances a level every 1000 xp', () => {
    expect(levelForXp(1000)).toBe(2);
    expect(levelForXp(1999)).toBe(2);
    expect(levelForXp(5000)).toBe(6);
  });
  it('clamps negative / invalid input to level 1', () => {
    expect(levelForXp(-50)).toBe(1);
    expect(levelForXp(undefined)).toBe(1);
  });
});

describe('xpFloorForLevel', () => {
  it('returns the xp threshold for the start of a level', () => {
    expect(xpFloorForLevel(1)).toBe(0);
    expect(xpFloorForLevel(2)).toBe(1000);
    expect(xpFloorForLevel(6)).toBe(5000);
  });
});

describe('rankForLevel', () => {
  it('maps level bands to ranks', () => {
    expect(rankForLevel(1)).toBe('E');
    expect(rankForLevel(4)).toBe('E');
    expect(rankForLevel(5)).toBe('D');
    expect(rankForLevel(10)).toBe('C');
    expect(rankForLevel(20)).toBe('B');
    expect(rankForLevel(35)).toBe('A');
    expect(rankForLevel(50)).toBe('S');
    expect(rankForLevel(99)).toBe('S');
  });
});

describe('xpForDifficulty', () => {
  it('returns the authoritative xp per tier', () => {
    expect(xpForDifficulty('E_RANK')).toBe(50);
    expect(xpForDifficulty('S_RANK')).toBe(1600);
  });
  it('falls back to the E tier for unknown input', () => {
    expect(xpForDifficulty('NONSENSE')).toBe(50);
  });
});

describe('difficultyFromShort', () => {
  it('maps single letters to canonical ids', () => {
    expect(difficultyFromShort('E')).toBe('E_RANK');
    expect(difficultyFromShort('s')).toBe('S_RANK');
  });
});

describe('goldForXp', () => {
  it('awards 10% gold, floored', () => {
    expect(goldForXp(50)).toBe(5);
    expect(goldForXp(155)).toBe(15);
    expect(goldForXp(0)).toBe(0);
  });
});

describe('progressForXp', () => {
  it('computes a coherent progress object', () => {
    const p = progressForXp(1500);
    expect(p.level).toBe(2);
    expect(p.rank).toBe('E');
    expect(p.levelXP).toBe(1000);
    expect(p.nextLevelXP).toBe(2000);
    expect(p.xpIntoLevel).toBe(500);
    expect(p.percent).toBe(50);
  });
  it('never exceeds 100 percent', () => {
    expect(progressForXp(999).percent).toBe(100);
  });
});
