import { useState, useEffect } from 'react';
import { Question, Answer, OptionLetter } from '../types';
import ProgressBar from './ProgressBar';

interface QuestionPageProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  currentAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onBack: () => void;
}

const OPTION_LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function createEmptyScores(): Record<OptionLetter, number> {
  return { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 };
}

export default function QuestionPage({
  question,
  questionIndex,
  totalQuestions,
  currentAnswer,
  onAnswer,
  onNext,
  onBack,
}: QuestionPageProps) {
  const [scores, setScores] = useState<Record<OptionLetter, number>>(
    currentAnswer?.scores || createEmptyScores()
  );

  useEffect(() => {
    setScores(currentAnswer?.scores || createEmptyScores());
  }, [question.id, currentAnswer]);

  const totalScore = OPTION_LETTERS.reduce((sum, letter) => sum + scores[letter], 0);
  const isValid = totalScore === 10;

  const handleScoreChange = (letter: OptionLetter, value: number) => {
    const newScores = { ...scores, [letter]: Math.max(0, Math.min(10, value)) };
    setScores(newScores);
    onAnswer({ questionId: question.id, scores: newScores });
  };

  const handleIncrement = (letter: OptionLetter) => {
    if (totalScore < 10) {
      handleScoreChange(letter, scores[letter] + 1);
    }
  };

  const handleDecrement = (letter: OptionLetter) => {
    if (scores[letter] > 0) {
      handleScoreChange(letter, scores[letter] - 1);
    }
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <ProgressBar current={questionIndex} total={totalQuestions} />

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
            {question.title}
          </h2>

          <div className="space-y-3 mb-6">
            {question.options.map((option) => (
              <div
                key={option.letter}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                  scores[option.letter] > 0
                    ? 'border-indigo-300 bg-indigo-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <span className="font-bold text-slate-400 w-6">{option.letter}</span>
                <p className="flex-1 text-slate-700 text-sm md:text-base">{option.text}</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDecrement(option.letter)}
                    disabled={scores[option.letter] === 0}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold text-slate-600"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={scores[option.letter]}
                    onChange={(e) => handleScoreChange(option.letter, parseInt(e.target.value) || 0)}
                    className="w-12 h-8 text-center font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => handleIncrement(option.letter)}
                    disabled={totalScore >= 10}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold text-slate-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`text-center p-3 rounded-xl mb-6 ${
              isValid
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            <span className="font-semibold">Summa: {totalScore}/10</span>
            {!isValid && (
              <span className="ml-2">
                ({totalScore < 10 ? `Fördela ${10 - totalScore} poäng till` : `Ta bort ${totalScore - 10} poäng`})
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBack}
              disabled={questionIndex === 0}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Tillbaka
            </button>
            <button
              onClick={onNext}
              disabled={!isValid}
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              {questionIndex === totalQuestions - 1 ? 'Visa resultat' : 'Nästa'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
