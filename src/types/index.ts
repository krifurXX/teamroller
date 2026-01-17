export type RoleId = 'PL' | 'CO' | 'IM' | 'ME' | 'SP' | 'RI' | 'CF' | 'SH';

export type OptionLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export interface QuestionOption {
  letter: OptionLetter;
  text: string;
}

export interface Question {
  id: number;
  title: string;
  options: QuestionOption[];
}

export interface Role {
  id: RoleId;
  name: string;
  englishName: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  tips: string[];
  color: string;
}

export interface Answer {
  questionId: number;
  scores: Record<OptionLetter, number>;
}

export interface RoleScore {
  roleId: RoleId;
  score: number;
}
