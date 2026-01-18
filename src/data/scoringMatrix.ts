import { RoleId, OptionLetter } from '../types';

// Maps question number -> option letter -> role
// Based on the scoring table from the corrected PDF
export const scoringMatrix: Record<number, Record<OptionLetter, RoleId>> = {
  1: { A: 'RI', B: 'TW', C: 'PL', D: 'CO', E: 'CF', F: 'SH', G: 'IM', H: 'ME' },
  2: { A: 'IM', B: 'CO', C: 'RI', D: 'ME', E: 'SH', F: 'CF', G: 'PL', H: 'TW' },
  3: { A: 'CO', B: 'CF', C: 'SH', D: 'PL', E: 'TW', F: 'RI', G: 'ME', H: 'IM' },
  4: { A: 'TW', B: 'SH', C: 'ME', D: 'IM', E: 'PL', F: 'CF', G: 'RI', H: 'CO' },
  5: { A: 'ME', B: 'IM', C: 'TW', D: 'SH', E: 'RI', F: 'CO', G: 'CF', H: 'PL' },
  6: { A: 'TW', B: 'IM', C: 'RI', D: 'CF', E: 'ME', F: 'SH', G: 'CO', H: 'PL' },
  7: { A: 'SH', B: 'ME', C: 'CF', D: 'RI', E: 'IM', F: 'PL', G: 'CO', H: 'TW' },
};
