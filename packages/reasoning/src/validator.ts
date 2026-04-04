import { containsBannedTerm } from '../../core/language-system';

export type ValidationResult = {
  ok: boolean;
  errors: string[];
};

export function validateDefragResponse(input: string): ValidationResult {
  const errors: string[] = [];

  if (!input.trim()) {
    errors.push('Response is empty.');
  }

  if (containsBannedTerm(input)) {
    errors.push('Response contains banned wording.');
  }

  if (input.length > 1400) {
    errors.push('Response is too long for a simple guidance surface.');
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}
