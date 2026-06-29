import { describe, it, expect } from 'vitest';
import { validate, questSchema, signUpSchema } from './validation';

describe('questSchema', () => {
  it('accepts a valid quest', () => {
    const r = validate(questSchema, {
      title: 'Morning Meditation',
      description: '15 minutes of focus',
      type: 'DAILY',
      difficulty: 'C_RANK',
      attributes: ['INT', 'CON'],
    });
    expect(r.success).toBe(true);
    expect(r.data.attributes).toEqual(['INT', 'CON']);
  });

  it('rejects a too-short title', () => {
    const r = validate(questSchema, {
      title: 'ab',
      type: 'DAILY',
      difficulty: 'E_RANK',
      attributes: [],
    });
    expect(r.success).toBe(false);
    expect(r.errors.title).toMatch(/at least 3/i);
  });

  it('rejects an invalid difficulty', () => {
    const r = validate(questSchema, {
      title: 'Valid title',
      type: 'DAILY',
      difficulty: 'Z_RANK',
      attributes: [],
    });
    expect(r.success).toBe(false);
    expect(r.errors.difficulty).toBeTruthy();
  });

  it('rejects an unknown attribute id', () => {
    const r = validate(questSchema, {
      title: 'Valid title',
      type: 'WEEKLY',
      difficulty: 'B_RANK',
      attributes: ['STR', 'WIS'],
    });
    expect(r.success).toBe(false);
  });

  it('defaults attributes to an empty array', () => {
    const r = validate(questSchema, {
      title: 'No attrs quest',
      type: 'ONE_TIME',
      difficulty: 'A_RANK',
    });
    expect(r.success).toBe(true);
    expect(r.data.attributes).toEqual([]);
  });
});

describe('signUpSchema', () => {
  it('requires a valid email and 6+ char password', () => {
    const bad = validate(signUpSchema, { email: 'nope', password: '123', hunterName: 'Sung' });
    expect(bad.success).toBe(false);

    const good = validate(signUpSchema, {
      email: 'hunter@system.io',
      password: 'arise123',
      hunterName: 'Sung Jinwoo',
    });
    expect(good.success).toBe(true);
  });
});
