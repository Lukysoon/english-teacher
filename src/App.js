import React, { useState } from 'react';

class Question {
  constructor(id, question, answer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
  }
}

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    new Question(1, "Co Sarah dělala včera?", "sledovala film"),
    new Question(2, "Kam šla Sarah s přáteli?", "do kina v centru"),
    new Question(3, "Jaký typ filmu Sarah sledovala?", "romantickou komedii"),
    new Question(4, "Jak se Sarah cítila ohledně filmu?", "velmi dobrý"),
    new Question(5, "V kolik hodin Sarah skončila sledování filmu?", "v 8 hodin"),
    new Question(6, "Kde přesně bylo kino?", "centrum města")
  ];

  const conversation = [
    { role: 'Jan', text: 'Ahoj, Sarah! Co jsi dělala včera?' },
    { role: 'Sarah', text: 'Ahoj, Jane! Sledovala jsem film. Šla jsem do kina s přáteli.' },
    { role: 'Jan', text: 'Kam jste šli s přáteli?' },
    { role: 'Sarah', text: 'Šli jsme do kina v centru města.' },
    { role: 'Jan', text: 'Jaký film jste sledovali?' },
    { role: 'Sarah', text: 'Sledovali jsme romantickou komedii. Byl to opravdu dobrý film.' },
    { role: 'Jan', text: 'Kdy jste skončili sledování filmu?' },
    { role: 'Sarah', text: 'Skončili jsme sledování filmu v 8 hodin večer.' }
  ];

  const handleAnswerChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: e.target.value
    });
  };

  const checkAnswer = (userAnswer, correctAnswer) => {
    const userLower = userAnswer.toLowerCase().trim();
    const correctLower = correctAnswer.toLowerCase().trim();
    return userLower.includes(correctLower) || correctLower.includes(userLower);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] && checkAnswer(userAnswers[q.id], q.answer)) {
        correct++;
      }
    });
    return correct;
  };

  const next = () => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const back = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAnswers = () => {
    setShowResults(true);
  };

  const restart = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(1);
    setShowResults(false);
  };

  if (showResults) {
    const score = getScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '30px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '40px',
            color: '#2c3e50'
          }}>
            Výsledky testu
          </h1>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '40px', 
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: percentage >= 70 ? '#d4edda' : '#f8d7da',
              border: `3px solid ${percentage >= 70 ? '#28a745' : '#dc3545'}`,
              borderRadius: '10px',
              padding: '30px',
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#2c3e50' }}>
                Vaše skóre
              </h2>
              <p style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '20px 0', color: percentage >= 70 ? '#28a745' : '#dc3545' }}>
                {score} / {questions.length}
              </p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: percentage >= 70 ? '#28a745' : '#dc3545' }}>
                {percentage}%
              </p>
            </div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '25px', color: '#2c3e50' }}>
              Přehled odpovědí
            </h3>
            
            <div style={{ marginBottom: '30px' }}>
              {questions.map(q => {
                const isCorrect = userAnswers[q.id] && checkAnswer(userAnswers[q.id], q.answer);
                return (
                  <div 
                    key={q.id} 
                    style={{
                      backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
                      border: `2px solid ${isCorrect ? '#28a745' : '#dc3545'}`,
                      borderRadius: '8px',
                      padding: '25px',
                      marginBottom: '20px'
                    }}
                  >
                    <p style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '15px', color: '#2c3e50' }}>
                      Otázka {q.id}: {q.question}
                    </p>
                    <p style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#495057' }}>
                      <strong>Vaše odpověď:</strong> {userAnswers[q.id] || '(nezodpovězeno)'}
                    </p>
                    <p style={{ fontSize: '1.3rem', marginBottom: '0', color: '#28a745', fontWeight: 'bold' }}>
                      <strong>Správná odpověď:</strong> {q.answer}
                    </p>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={restart}
              style={{
                width: '100%',
                padding: '20px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              Zkusit znovu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '40px',
          color: '#2c3e50'
        }}>
          Cvičení porozumění textu
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Levá strana - Konverzace */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '25px', color: '#2c3e50', borderBottom: '3px solid #007bff', paddingBottom: '15px' }}>
              Přečtěte si konverzaci
            </h2>
            <div style={{ fontSize: '1.3rem', lineHeight: '1.8' }}>
              {conversation.map(({ role, text }, index) => (
                <div>
                  
                  {index % 2 === 0 ? 
                    (<strong style={{ color: '#007bff', fontSize: '1.4rem' }}>{role}: </strong>)
                    :
                    (<strong style={{ color: '#c13c25ff', fontSize: '1.4rem' }}>{role}: </strong>)}
                  <span style={{ color: '#2c3e50' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pravá strana - Otázky */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              backgroundColor: '#e7f3ff',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              marginBottom: '25px',
              border: '2px solid #007bff'
            }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                Otázka {currentQuestionIndex} z {questions.length}
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff3cd',
              border: '3px solid #ffc107',
              borderRadius: '10px',
              padding: '30px',
              marginBottom: '30px'
            }}>
              <h3 style={{ 
                fontSize: '1.6rem', 
                margin: 0, 
                color: '#2c3e50',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                {questions.find(question => question.id === currentQuestionIndex).question}
              </h3>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '15px', display: 'block', color: '#2c3e50' }}>
                Vaše odpověď:
              </label>
              <input
                type='text'
                style={{
                  width: '100%',
                  padding: '20px',
                  fontSize: '1.3rem',
                  border: '2px solid #ced4da',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
                value={userAnswers[currentQuestionIndex] || ''}
                onChange={handleAnswerChange}
                placeholder="Napište odpověď zde..."
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: 'auto' }}>
              <button
                onClick={back}
                disabled={currentQuestionIndex === 1}
                style={{
                  flex: 1,
                  padding: '20px',
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  backgroundColor: currentQuestionIndex === 1 ? '#e9ecef' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: currentQuestionIndex === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentQuestionIndex === 1 ? 0.6 : 1
                }}
                onMouseOver={(e) => {
                  if (currentQuestionIndex !== 1) e.target.style.backgroundColor = '#5a6268';
                }}
                onMouseOut={(e) => {
                  if (currentQuestionIndex !== 1) e.target.style.backgroundColor = '#6c757d';
                }}
              >
                ← Zpět
              </button>
              
              {currentQuestionIndex === questions.length ? (
                <button 
                  onClick={submitAnswers}
                  style={{
                    flex: 1,
                    padding: '20px',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                  Odeslat odpovědi
                </button>
              ) : (
                <button 
                  onClick={next}
                  style={{
                    flex: 1,
                    padding: '20px',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  Další →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;