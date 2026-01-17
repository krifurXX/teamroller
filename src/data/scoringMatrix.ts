import { RoleId, OptionLetter } from '../types';

// Maps question number -> option letter -> role
// Based on the scoring table from the PDF
export const scoringMatrix: Record<number, Record<OptionLetter, RoleId>> = {
  1: { A: 'RI', B: 'SP', C: 'PL', D: 'CO', E: 'CF', F: 'SH', G: 'IM', H: 'ME' },
  2: { A: 'IM', B: 'CO', C: 'RI', D: 'ME', E: 'SH', F: 'SP', G: 'PL', H: 'CF' },
  3: { A: 'CO', B: 'CF', C: 'IM', D: 'PL', E: 'SH', F: 'RI', G: 'ME', H: 'SP' },
  4: { A: 'RI', B: 'SH', C: 'ME', D: 'IM', E: 'PL', F: 'CF', G: 'SP', H: 'CO' },
  5: { A: 'ME', B: 'IM', C: 'CF', D: 'SH', E: 'RI', F: 'CO', G: 'SP', H: 'PL' },
  6: { A: 'SH', B: 'SP', C: 'RI', D: 'CF', E: 'ME', F: 'IM', G: 'CO', H: 'PL' },
  7: { A: 'SH', B: 'ME', C: 'CF', D: 'SP', E: 'IM', F: 'PL', G: 'CO', H: 'RI' },
};
