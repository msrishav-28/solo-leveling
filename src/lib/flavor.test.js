import { describe, it, expect } from 'vitest';
import { systemize } from './flavor';

describe('systemize', () => {
  it('returns empty string for empty input', () => {
    expect(systemize('')).toBe('');
    expect(systemize('   ')).toBe('');
  });

  it('is deterministic for the same input', () => {
    expect(systemize('do laundry')).toBe(systemize('do laundry'));
  });

  it('themes known keywords', () => {
    expect(systemize('do laundry')).toMatch(/Shadow-Stained Halls/);
    expect(systemize('read a book')).toMatch(/Tome of Forbidden Knowledge/);
    expect(systemize('go to the gym')).toMatch(/Beast of Iron/);
  });

  it('falls back gracefully for unknown input', () => {
    const out = systemize('finish the report deck thing zzz');
    expect(out.length).toBeGreaterThan(0);
    expect(out).not.toBe('finish the report deck thing zzz');
  });
});
