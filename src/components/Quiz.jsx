import React, { useState, useEffect, useRef } from 'react';

const Quiz = ({ questions, duration, onSubmit, onCancel }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(duration * 60); // in seconds
  
  const timerRef = useRef();
  const answersRef = useRef(answers);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onSubmit(answersRef.current); // Auto submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [onSubmit]);

  const handleOptionSelect = (optionIndex) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestionIndex]: optionIndex
    };
    setAnswers(updatedAnswers);

    // Auto next after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        onSubmit(updatedAnswers);
      }
    }, 2000);
  };

  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const currentQ = questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  const getOptionLetter = (index) => {
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  const hasAnswered = answers[currentQuestionIndex] !== undefined;
  const isCorrectAns = hasAnswered && answers[currentQuestionIndex] === currentQ.answer;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-info">
          <span className="q-number">પ્રશ્ન {currentQuestionIndex + 1} / {questions.length}</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
        
        <div className={`timer ${timeLeft < 60 ? 'warning' : ''}`}>
          ⏱ {timeString}
        </div>
      </div>

      <div className="question-card">
        <span className="subject-tag">{currentQ.subject}</span>
        <h2 className="question-text">{currentQ.question}</h2>
        
        <div className="options-list">
          {currentQ.options.map((option, idx) => {
            const isSelected = answers[currentQuestionIndex] === idx;
            const isCorrectOption = idx === currentQ.answer;
            
            let btnClass = 'option-btn';
            let icon = null;

            if (hasAnswered) {
              if (isCorrectOption) {
                btnClass += ' correct';
                icon = '✅';
              } else if (isSelected) {
                btnClass += ' wrong';
                icon = '❌';
              } else {
                btnClass += ' unselected-faded';
              }
            } else if (isSelected) {
              btnClass += ' selected';
            }

            return (
              <button 
                key={idx} 
                className={btnClass}
                onClick={() => !hasAnswered && handleOptionSelect(idx)}
                disabled={hasAnswered}
              >
                <div className="option-letter">{getOptionLetter(idx)}</div>
                <span style={{flex: 1}}>{option}</span>
                {icon && <span style={{fontSize: '1.2rem', marginLeft: '10px'}}>{icon}</span>}
              </button>
            )
          })}
        </div>

        {hasAnswered && (
          <div className={`feedback-message ${isCorrectAns ? 'feed-correct' : 'feed-wrong'}`}>
            {isCorrectAns 
              ? '🎉 બિલકુલ સાચો જવાબ!' 
              : `❌ ખોટો જવાબ! સાચો જવાબ વિકલ્પ ${getOptionLetter(currentQ.answer)} છે.`}
          </div>
        )}
      </div>

      {currentQuestionIndex === 0 && !hasAnswered && (
        <div className="quiz-footer" style={{ marginTop: '1rem', justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={onCancel}>
            રદ કરો (Cancel)
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
