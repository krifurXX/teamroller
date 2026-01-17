import { useState, useEffect } from 'react';
import { Answer, RoleScore } from './types';
import { questions } from './data/questions';
import { calculateResults, saveAnswers, loadAnswers, clearAnswers } from './utils/calculateResults';
import StartPage from './components/StartPage';
import QuestionPage from './components/QuestionPage';
import ResultsPage from './components/ResultsPage';

type Page = 'start' | 'questions' | 'results';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<RoleScore[]>([]);

  useEffect(() => {
    const savedAnswers = loadAnswers();
    if (savedAnswers.length > 0) {
      setAnswers(savedAnswers);
    }
  }, []);

  const handleStart = () => {
    setCurrentPage('questions');
    setCurrentQuestionIndex(0);
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
        <StartPage onStart={handleStart} hasSavedProgress={answers.length > 0} />
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
