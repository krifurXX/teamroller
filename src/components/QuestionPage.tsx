import { useState, useEffect, useRef } from 'react';
import { Question, Answer, OptionLetter } from '../types';
import ProgressBar from './ProgressBar';

interface QuestionPageProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  currentAnswer?: Answer;
  allAnswers: Answer[];
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onBack: () => void;
  onJumpToQuestion: (index: number) => void;
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
  allAnswers,
  onAnswer,
  onNext,
  onBack,
  onJumpToQuestion,
}: QuestionPageProps) {
  const [scores, setScores] = useState<Record<OptionLetter, number>>(
    currentAnswer?.scores || createEmptyScores()
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAnimating(true);
    setScores(currentAnswer?.scores || createEmptyScores());
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [question.id, currentAnswer]);

  useEffect(() => {
    containerRef.current?.focus();
  }, [questionIndex]);

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

  const getQuestionStatus = (index: number) => {
    const answer = allAnswers.find(a => a.questionId === index + 1);
    if (!answer) return 'empty';
    const sum = OPTION_LETTERS.reduce((s, l) => s + (answer.scores[l] || 0), 0);
    return sum === 10 ? 'complete' : 'partial';
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div
        className="max-w-2xl mx-auto"
        ref={containerRef}
        tabIndex={-1}
        aria-label={`Fråga ${questionIndex + 1} av ${totalQuestions}`}
      >
        <ProgressBar current={questionIndex} total={totalQuestions} />

        {/* Question Overview Toggle */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={() => setShowOverview(!showOverview)}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            aria-expanded={showOverview}
            aria-controls="question-overview"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {showOverview ? 'Dölj översikt' : 'Visa alla frågor'}
          </button>
        </div>

        {/* Question Overview Panel */}
        {showOverview && (
          <div
            id="question-overview"
            className="bg-white rounded-xl shadow-lg p-4 mb-4 animate-fade-in"
          >
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Hoppa till fråga:</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: totalQuestions }, (_, i) => {
                const status = getQuestionStatus(i);
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => {
                      onJumpToQuestion(i);
                      setShowOverview(false);
                    }}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      i === questionIndex
                        ? 'bg-indigo-600 text-white'
                        : status === 'complete'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : status === 'partial'
                        ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    aria-label={`Gå till fråga ${i + 1}${status === 'complete' ? ' (besvarad)' : status === 'partial' ? ' (påbörjad)' : ''}`}
                    aria-current={i === questionIndex ? 'step' : undefined}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-green-100"></span> Klar
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-orange-100"></span> Påbörjad
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-slate-100"></span> Ej besvarad
              </span>
            </div>
          </div>
        )}

        <div
          className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
          }`}
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
            {question.title}
          </h2>

          {/* Explanation text */}
          <p className="text-slate-500 text-sm mb-6">
            Fördela 10 poäng mellan alternativen nedan. Ge fler poäng till påståenden som stämmer bättre in på dig.
          </p>

          <div className="space-y-3 mb-6" role="group" aria-label="Svarsalternativ">
            {question.options.map((option) => (
              <div
                key={option.letter}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                  scores[option.letter] > 0
                    ? 'border-indigo-300 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="font-bold text-slate-400 w-6" aria-hidden="true">
                  {option.letter}
                </span>
                <p className="flex-1 text-slate-700 text-sm md:text-base">{option.text}</p>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDecrement(option.letter)}
                    disabled={scores[option.letter] === 0}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold text-slate-600 select-none"
                    aria-label={`Minska poäng för alternativ ${option.letter}`}
                  >
                    −
                  </button>
                  <span className="w-8 h-8 flex items-center justify-center font-bold text-slate-800">
                    {scores[option.letter]}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleIncrement(option.letter)}
                    disabled={totalScore >= 10}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold text-slate-600 select-none"
                    aria-label={`Öka poäng för alternativ ${option.letter}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`text-center p-3 rounded-xl mb-6 transition-colors ${
              isValid
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}
            role="status"
            aria-live="polite"
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
              type="button"
              onClick={onBack}
              disabled={questionIndex === 0}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Gå till föregående fråga"
            >
              Tillbaka
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!isValid}
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
              aria-label={questionIndex === totalQuestions - 1 ? 'Visa dina resultat' : 'Gå till nästa fråga'}
            >
              {questionIndex === totalQuestions - 1 ? 'Visa resultat' : 'Nästa'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
