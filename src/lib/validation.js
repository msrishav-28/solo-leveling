// ============================================================================
// Runtime validation schemas (Zod). Used on the client before any write to
// Supabase. The database additionally enforces CHECK constraints + RLS, so
// these are the first line of defence, not the only one.
// ============================================================================

import { z } from 'zod';
import { ATTRIBUTE_IDS, DIFFICULTY_IDS, QUEST_TYPE_IDS } from './gamification';

export const questSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Quest title must be at least 3 characters')
    .max(80, 'Quest title must be 80 characters or fewer'),
  description: z
    .string()
    .trim()
    .max(500, 'Briefing must be 500 characters or fewer')
    .optional()
    .or(z.literal('')),
  type: z.enum(QUEST_TYPE_IDS, { message: 'Invalid quest type' }),
  difficulty: z.enum(DIFFICULTY_IDS, { message: 'Invalid difficulty' }),
  attributes: z
    .array(z.enum(ATTRIBUTE_IDS))
    .max(ATTRIBUTE_IDS.length)
    .default([]),
});

export const signInSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = signInSchema.extend({
  hunterName: z
    .string()
    .trim()
    .min(2, 'Hunter name must be at least 2 characters')
    .max(20, 'Hunter name must be 20 characters or fewer'),
});

/**
 * Validate `data` against a Zod schema. Returns `{ success, data }` on success
 * or `{ success: false, errors }` where `errors` is a field->message map and
 * `message` is the first error (handy for inline display).
 */
export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] ?? '_';
    if (!errors[key]) errors[key] = issue.message;
  }
  return {
    success: false,
    errors,
    message: result.error.issues[0]?.message ?? 'Invalid input',
  };
}
