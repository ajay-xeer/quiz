import { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import questionsData from './data/questions.json';
import './index.css';

function App() {
  const [gameState, setGameState] = useState('home'); // home, quiz, result
  const [quizConfig, setQuizConfig] = useState({ duration: 10, qCount: 10, subject: '' });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const startQuiz = ({ subject, duration, qCount }) => {
    setQuizConfig({ subject, duration, qCount });

    // Filter by subject
    const filteredQuestions = questionsData.filter(q => q.category === subject);

    // Get previously asked question IDs from localStorage
    const askedIds = JSON.parse(localStorage.getItem('askedQuestions') || '[]');

    // Filter out previously asked questions
    let availableQuestions = filteredQuestions.filter(q => !askedIds.includes(q.id));

    // If we run out of unique questions for this subject, reset the asked list for this subject
    if (availableQuestions.length === 0 && filteredQuestions.length > 0) {
      const subjectQuestionIds = filteredQuestions.map(q => q.id);
      const remainingAskedIds = askedIds.filter(id => !subjectQuestionIds.includes(id));
      localStorage.setItem('askedQuestions', JSON.stringify(remainingAskedIds));
      availableQuestions = [...filteredQuestions];
      alert('તમે આ વિષયના તમામ પ્રશ્નો પૂરા કરી લીધા છે. પ્રશ્નો ફરીથી શરૂ થઈ રહ્યા છે.');
    }

    // Ensure no repeating questions randomly picked
    let selected = [...availableQuestions].sort(() => 0.5 - Math.random()).slice(0, qCount);

    // Save newly selected question IDs to localStorage
    const newAskedIds = [...new Set([...JSON.parse(localStorage.getItem('askedQuestions') || '[]'), ...selected.map(q => q.id)])];
    localStorage.setItem('askedQuestions', JSON.stringify(newAskedIds));

    setSelectedQuestions(selected);
    setUserAnswers({});
    setGameState('quiz');
  };

  const submitQuiz = (answers) => {
    setUserAnswers(answers);
    setGameState('result');
  };

  const restartQuiz = () => {
    setGameState('home');
  };

  return (
    <div className="app-container">
      <div className="glass-panel">
        <header className="app-header">
          {/* <h1>ગુજરાત પોલીસ કોન્સ્ટેબલ / PSI <span>મોક ટેસ્ટ</span></h1> */}
          {/* <p className="subtitle">ભરતી પરીક્ષા માટે શ્રેષ્ઠ તૈયારી</p> */}
        </header>

        <main className="main-content">
          {gameState === 'home' && (
            <Home onStart={startQuiz} />
          )}
          {gameState === 'quiz' && (
            <Quiz
              questions={selectedQuestions}
              duration={quizConfig.duration}
              onSubmit={submitQuiz}
              onCancel={() => setGameState('home')}
            />
          )}
          {gameState === 'result' && (
            <Result
              questions={selectedQuestions}
              answers={userAnswers}
              onRestart={restartQuiz}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>Created for Gujarat Police Aspirants | Best of Luck</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
