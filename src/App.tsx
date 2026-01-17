import { useState } from 'react';
import { Answer, RoleScore } from './types';
import { questions } from './data/questions';
import { calculateResults, saveAnswers, clearAnswers } from './utils/calculateResults';
import StartPage from './components/StartPage';
import QuestionPage from './components/QuestionPage';
import ResultsPage from './components/ResultsPage';

type Page = 'start' | 'questions' | 'results';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<RoleScore[]>([]);

  const handleStart = () => {
    clearAnswers();
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setCurrentPage('questions');
  };

  const handleRestart = () => {
    clearAnswers();
    setAnswers([]);
    setResults([]);
    setCurrentQuestionIndex(0);
    setCurrentPage('start');
  };

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex((a) => a.questionId === answer.questionId);

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = answer;
    } else {
      newAnswers.push(answer);
    }

    setAnswers(newAnswers);
    saveAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const calculatedResults = calculateResults(answers);
      setResults(calculatedResults);
      setCurrentPage('results');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const currentAnswer = answers.find(
    (a) => a.questionId === questions[currentQuestionIndex]?.id
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {currentPage === 'start' && (
        <StartPage onStart={handleStart} />
      )}

      {currentPage === 'questions' && (
        <QuestionPage
          question={questions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          currentAnswer={currentAnswer}
          allAnswers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          onJumpToQuestion={handleJumpToQuestion}
        />
      )}

      {currentPage === 'results' && (
        <ResultsPage results={results} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
