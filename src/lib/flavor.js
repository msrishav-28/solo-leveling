// ============================================================================
// Local quest "flavor" generator. Turns a plain task into Solo-Leveling RPG
// flavor — e.g. "do laundry" -> "Purge the Shadow-Stained Halls".
//
// This is a deterministic, rule-based transformer (no LLM, no API key, no
// network). The ROADMAP's AI flavor-text idea, delivered offline. Same input
// always yields the same output so it feels stable, not random.
// ============================================================================

const THEMES = [
  { keys: ['workout', 'gym', 'exercise', 'run', 'lift', 'push', 'squat', 'train', 'walk', 'cardio'], noun: 'the Beast of Iron' },
  { keys: ['read', 'book', 'study', 'learn', 'course', 'lecture', 'revise'], noun: 'the Tome of Forbidden Knowledge' },
  { keys: ['code', 'program', 'debug', 'build', 'deploy', 'refactor', 'ship', 'test'], noun: 'the Legacy Monolith' },
  { keys: ['clean', 'laundry', 'dishes', 'tidy', 'wash', 'vacuum', 'chore'], noun: 'the Shadow-Stained Halls' },
  { keys: ['email', 'work', 'meeting', 'report', 'call', 'client', 'slides', 'inbox'], noun: 'the Corporate Specter' },
  { keys: ['meditate', 'breathe', 'journal', 'reflect', 'pray', 'gratitude'], noun: 'the Inner Sanctum' },
  { keys: ['eat', 'cook', 'meal', 'diet', 'water', 'drink', 'hydrate'], noun: 'the Vital Essence' },
  { keys: ['sleep', 'rest', 'wake', 'nap', 'bed'], noun: 'the Dream Gate' },
  { keys: ['money', 'budget', 'invest', 'save', 'bill', 'pay', 'finance'], noun: 'the Vault of Avarice' },
];

const PREFIXES = ['Subjugate', 'Purge', 'Vanquish', 'Conquer', 'Breach', 'Slay', 'Cleanse', 'Master'];
const SUFFIXES = ['', '', '', 'before the Gate closes', "in the Monarch's name", 'to absorb its mana', 'and rise'];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function titleCase(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/** Transform a plain task title into a themed System quest name. */
export function systemize(input) {
  const text = (input || '').trim();
  if (!text) return '';

  const lower = text.toLowerCase();
  const h = hash(lower);

  let noun = null;
  for (const theme of THEMES) {
    if (theme.keys.some((k) => lower.includes(k))) {
      noun = theme.noun;
      break;
    }
  }
  if (!noun) {
    const words = text.replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
    const last = words[words.length - 1] || 'Quest';
    noun = `the ${titleCase(last)}`;
  }

  const prefix = PREFIXES[h % PREFIXES.length];
  const suffix = SUFFIXES[(h >> 3) % SUFFIXES.length];
  return `${prefix} ${noun}${suffix ? ` ${suffix}` : ''}`.trim();
}
