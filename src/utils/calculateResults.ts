import { Answer, RoleId, RoleScore, OptionLetter } from '../types';
import { scoringMatrix } from '../data/scoringMatrix';

const ALL_ROLES: RoleId[] = ['PL', 'CO', 'IM', 'ME', 'TW', 'RI', 'CF', 'SH'];
const ALL_OPTIONS: OptionLetter[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function calculateResults(answers: Answer[]): RoleScore[] {
  const roleScores: Record<RoleId, number> = {
    PL: 0, CO: 0, IM: 0, ME: 0, TW: 0, RI: 0, CF: 0, SH: 0,
  };

  for (const answer of answers) {
    const questionMatrix = scoringMatrix[answer.questionId];
    if (!questionMatrix) continue;

    for (const option of ALL_OPTIONS) {
      const score = answer.scores[option] || 0;
      const role = questionMatrix[option];
      if (role && score > 0) {
        roleScores[role] += score;
      }
    }
  }

  return ALL_ROLES.map((roleId) => ({
    roleId,
    score: roleScores[roleId],
  })).sort((a, b) => b.score - a.score);
}

export function getTopRoles(roleScores: RoleScore[], count: number = 2): RoleScore[] {
  return roleScores.slice(0, count);
}

const STORAGE_KEY = 'teamroller_answers';

export function saveAnswers(answers: Answer[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function loadAnswers(): Answer[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearAnswers(): void {
  localStorage.removeItem(STORAGE_KEY);
}
