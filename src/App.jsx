import { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import mathsReasoningData from './data/maths_reasoning.js';
import bandharanData from './data/bandharan.js';
import historyData from './data/history.js';
import geographyData from './data/geography.js';
import scienceData from './data/science.js';
import vyakaranData from './data/vyakaran.js';
import environmentData from './data/environment.js';
import economicsData from './data/economics.js';
import { generateQuestionsByAI } from './aiService';

const subjectDataMap = {
  'maths_reasoning': mathsReasoningData,
  'bandharan': bandharanData,
  'history': historyData,
  'geography': geographyData,
  'science': scienceData,
  'vyakaran': vyakaranData,
  'environment': environmentData,
  'economics': economicsData
};
import './index.css';

// જો તમે તમારા યુઝર્સને અનલિમિટેડ પ્રશ્નો આપવા માંગતા હોવ, તો તમારી Google API Key અહી પેસ્ટ કરી દો.
// ઉદાહરણ: const MY_API_KEY = "AIzaSyD.......";
const MY_API_KEY = ""; 

function App() {
  const [gameState, setGameState] = useState('home'); // home, quiz, result
  const [quizConfig, setQuizConfig] = useState({ duration: 10, qCount: 10, subject: '' });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const apiKey = MY_API_KEY;
  const [isLoading, setIsLoading] = useState(false);

  // Store previous AI questions so they never repeat
  const [askedQuestionsHistory, setAskedQuestionsHistory] = useState(() => JSON.parse(localStorage.getItem('askedQuestionsHistory') || '[]'));


  const startOfflineQuiz = (subject, duration, qCount) => {
    setQuizConfig({ subject, duration, qCount });

    const filteredQuestions = subjectDataMap[subject] || [];
    let selected = [];
    let currentOfflineAsked = JSON.parse(localStorage.getItem('offlineAsked') || '[]');
    let availableQuestions = filteredQuestions.filter(q => !currentOfflineAsked.includes(q.id));

    if (availableQuestions.length < qCount) {
      // Clear memory but pick exactly the leftovers plus some new items from reset pool
      const leftOvers = [...availableQuestions];
      const needMore = qCount - leftOvers.length;
      
      const refreshedPool = filteredQuestions.filter(q => !leftOvers.find(l => l.id === q.id));
      const extra = [...refreshedPool].sort(() => 0.5 - Math.random()).slice(0, needMore);
      
      selected = [...leftOvers, ...extra].sort(() => 0.5 - Math.random());
      
      // Update memory: reset base to only the currently fully-selected items
      localStorage.setItem('offlineAsked', JSON.stringify(selected.map(q => q.id)));
    } else {
      selected = [...availableQuestions].sort(() => 0.5 - Math.random()).slice(0, qCount);
      localStorage.setItem('offlineAsked', JSON.stringify([...currentOfflineAsked, ...selected.map(q => q.id)]));
    }

    setSelectedQuestions(selected);
    setUserAnswers({});
    setGameState('quiz');
  };

  const startQuiz = async ({ subject, duration, qCount }) => {
    setQuizConfig({ subject, duration, qCount });

    if (apiKey) {
      setIsLoading(true);
      try {
        const aiQuestions = await generateQuestionsByAI(apiKey, subject, qCount, askedQuestionsHistory);

        // Save these to history so we never repeat them in the future
        const newHistory = [...askedQuestionsHistory, ...aiQuestions.map(q => q.question)];
        setAskedQuestionsHistory(newHistory);
        localStorage.setItem('askedQuestionsHistory', JSON.stringify(newHistory));

        setSelectedQuestions(aiQuestions);
        setUserAnswers({});
        setGameState('quiz');
      } catch (error) {
        alert('AI પ્રશ્નો બનાવવામાં ભૂલ: ' + error.message + '\nઓફલાઇન પ્રશ્નોથી શરૂ કરીએ છીએ...');
        startOfflineQuiz(subject, duration, qCount);
      }
      setIsLoading(false);
    } else {
      startOfflineQuiz(subject, duration, qCount);
    }
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
          <h1 style={{ fontSize: '1.5rem', textAlign: 'center', margin: 0 }}>ગુજરાત પોલીસ / PSI મોક ટેસ્ટ</h1>
        </header>

        <main className="main-content">

          {isLoading && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>🤖 AI નવા પ્રશ્નો બનાવી રહ્યું છે... (10-15 સેકન્ડ રાહ જુઓ)</h3>
            </div>
          )}

          {!isLoading && gameState === 'home' && (
            <Home onStart={startQuiz} />
          )}
          {!isLoading && gameState === 'quiz' && (
            <Quiz
              questions={selectedQuestions}
              duration={quizConfig.duration}
              onSubmit={submitQuiz}
              onCancel={() => setGameState('home')}
            />
          )}
          {!isLoading && gameState === 'result' && (
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
