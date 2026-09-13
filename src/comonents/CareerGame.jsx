import React, { useState, useEffect, useRef } from 'react';
import './CareerGame.css';

const CareerGame = () => {
  // Game state
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('running');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [characterPos, setCharacterPos] = useState(30);
  const [obstacles, setObstacles] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [gameResult, setGameResult] = useState(null);

  const questions = [
    {
      id: 1,
      text: "Your main interest?",
      options: [
        { text: "Science & Research", weight: { engineering: 2, medical: 2, science: 3 } },
        { text: "People & Communication", weight: { law: 2, business: 2, humanities: 2 } },
        { text: "Creative Work", weight: { design: 3, media: 2, arts: 3 } },
        { text: "Business & Leadership", weight: { business: 3, entrepreneurship: 3 } }
      ]
    },
    {
      id: 2,
      text: "Work environment preference?",
      options: [
        { text: "Independent problem-solving", weight: { engineering: 2, research: 3 } },
        { text: "Team collaboration", weight: { medical: 2, business: 2 } },
        { text: "Client interaction", weight: { law: 2, business: 2 } },
        { text: "Creative expression", weight: { design: 3, arts: 3 } }
      ]
    },
    {
      id: 3,
      text: "Future 5-year goal?",
      options: [
        { text: "Start own business", weight: { entrepreneurship: 3 } },
        { text: "Government/Stable job", weight: { civilservice: 3, banking: 2 } },
        { text: "Make social impact", weight: { ngo: 3, medical: 2 } },
        { text: "Excel in field", weight: { engineering: 2, law: 2 } }
      ]
    },
    {
      id: 4,
      text: "Math & Logic strength?",
      options: [
        { text: "Very strong", weight: { engineering: 3, finance: 3 } },
        { text: "Moderate", weight: { science: 2, business: 2 } },
        { text: "Not my strength", weight: { humanities: 2, arts: 2 } },
        { text: "Don't like it", weight: { design: 2, media: 2 } }
      ]
    },
    {
      id: 5,
      text: "Interest in helping others?",
      options: [
        { text: "Very interested", weight: { medical: 3, ngo: 3 } },
        { text: "Somewhat", weight: { business: 2, law: 2 } },
        { text: "Not really", weight: { engineering: 1, finance: 1 } },
        { text: "Don't care", weight: { arts: 1 } }
      ]
    },
    {
      id: 6,
      text: "Willing to study 5+ years?",
      options: [
        { text: "Yes, absolutely", weight: { medical: 3, law: 3 } },
        { text: "Maybe 3-4 years", weight: { engineering: 2, business: 2 } },
        { text: "Just 2 years", weight: { diploma: 2 } },
        { text: "As less as possible", weight: { skill: 2 } }
      ]
    },
    {
      id: 7,
      text: "Career security vs freedom?",
      options: [
        { text: "Security is priority", weight: { civilservice: 3, banking: 2 } },
        { text: "Balanced both", weight: { engineering: 2, business: 2 } },
        { text: "Freedom matters more", weight: { entrepreneurship: 3 } },
        { text: "Don't know", weight: { science: 1 } }
      ]
    },
    {
      id: 8,
      text: "Interest in technology?",
      options: [
        { text: "Love technology", weight: { engineering: 3, it: 3 } },
        { text: "Like using it", weight: { business: 2, design: 2 } },
        { text: "Basic usage", weight: { humanities: 1 } },
        { text: "Not interested", weight: { arts: 1 } }
      ]
    },
    {
      id: 9,
      text: "Competitive exams - ready?",
      options: [
        { text: "Yes, bring them on", weight: { engineering: 3, medical: 3 } },
        { text: "If needed", weight: { law: 2, business: 2 } },
        { text: "Prefer merit-based", weight: { arts: 2 } },
        { text: "Not at all", weight: { diploma: 2 } }
      ]
    },
    {
      id: 10,
      text: "Salary expectations?",
      options: [
        { text: "High (10+ LPA)", weight: { engineering: 2, finance: 3 } },
        { text: "Medium-High (5-10 LPA)", weight: { business: 2, law: 2 } },
        { text: "Just enough", weight: { ngo: 1, arts: 1 } },
        { text: "Money not priority", weight: { research: 2 } }
      ]
    }
  ];

  const careerPaths = {
    engineering: {
      name: "🏗️ B.Tech Engineering",
      description: "CS, Mechanical, Civil, Electrical, ECE",
      exams: "JEE Main, JEE Advanced",
      duration: "4 years",
      colleges: "IIT, NIT, BITS",
      salary: "8-15 LPA",
      skills: "Math, Physics, Problem-solving"
    },
    medical: {
      name: "🏥 MBBS / Medical",
      description: "Doctor, Surgeon, Medical Specialist",
      exams: "NEET",
      duration: "5.5 years",
      colleges: "AIIMS, Medical Colleges",
      salary: "6-12 LPA",
      skills: "Science, Dedication, Patience"
    },
    business: {
      name: "💼 BBA / Commerce",
      description: "Management, Finance, Marketing, HR",
      exams: "CAT, XAT, GMAT",
      duration: "3-4 years",
      colleges: "IIM, XLRI, FMS",
      salary: "7-20 LPA",
      skills: "Analysis, Leadership"
    },
    law: {
      name: "⚖️ BA/BBA LLB",
      description: "Lawyer, Judge, Corporate Legal",
      exams: "CLAT, AILET",
      duration: "5 years",
      colleges: "NLSIU, NALSAR, NLU Delhi",
      salary: "6-25 LPA",
      skills: "Analysis, Debate, Ethics"
    },
    design: {
      name: "🎨 Design (UX/Graphic)",
      description: "UI/UX Designer, Graphic Designer",
      exams: "Portfolio based",
      duration: "3-4 years",
      colleges: "NID, IIFT",
      salary: "5-15 LPA",
      skills: "Creativity, Software, Visual sense"
    },
    it: {
      name: "💻 B.Tech IT/CSE",
      description: "Software Developer, Data Scientist",
      exams: "JEE Main",
      duration: "4 years",
      colleges: "IIT, NIT, BITS",
      salary: "10-20 LPA",
      skills: "Coding, Algorithms"
    },
    civilservice: {
      name: "🏛️ IAS / IPS",
      description: "Government Officer, Administrator",
      exams: "UPSC, BPSC",
      duration: "3 years + prep",
      colleges: "Any degree then prep",
      salary: "50K+ monthly",
      skills: "GK, Analysis, Integrity"
    },
    entrepreneurship: {
      name: "🚀 Entrepreneurship",
      description: "Startup Founder, Business Owner",
      exams: "Not required",
      duration: "Variable",
      colleges: "Self learning",
      salary: "Variable",
      skills: "Innovation, Leadership"
    },
    finance: {
      name: "💰 Finance / CA",
      description: "Chartered Accountant, Analyst",
      exams: "CA, CMA, CFP",
      duration: "4.5-5 years",
      colleges: "B.Com + CA",
      salary: "8-25 LPA",
      skills: "Math, Accuracy"
    },
    media: {
      name: "📺 Journalism/Media",
      description: "Journalist, Content Creator",
      exams: "Not required",
      duration: "3 years",
      colleges: "IIMC, IIJNM",
      salary: "4-12 LPA",
      skills: "Writing, Communication"
    }
  };

  useEffect(() => {
    if (gameState === 'running' && !currentQuestion) {
      const interval = setInterval(() => {
        setScore(prev => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameState, currentQuestion]);

  useEffect(() => {
    if (gameState === 'running' && questionsAnswered < questions.length) {
      const timer = setInterval(() => {
        const newObstacle = {
          id: Math.random(),
          x: Math.random() * 300 + 100,
          y: Math.random() * 100
        };
        setObstacles(prev => [...prev, newObstacle]);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [gameState, questionsAnswered, questions.length]);

  const handleQuestionClick = (questionIndex) => {
    if (questionsAnswered < questions.length) {
      setCurrentQuestion(questions[questionsAnswered]);
      setGameState('paused');
    }
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: answer
    });
    setQuestionsAnswered(prev => prev + 1);
    setCurrentQuestion(null);
    setGameState('running');
    setScore(prev => prev + 50);

    if (questionsAnswered + 1 === questions.length) {
      setTimeout(() => calculateCareerPath(), 500);
    }
  };

  const calculateCareerPath = () => {
    const careerScores = {};
    
    Object.keys(careerPaths).forEach(career => {
      careerScores[career] = 0;
    });

    Object.entries(userAnswers).forEach(([questionId, answer]) => {
      if (answer.weight) {
        Object.entries(answer.weight).forEach(([career, points]) => {
          if (careerScores[career] !== undefined) {
            careerScores[career] += points;
          }
        });
      }
    });

    const topCareers = Object.entries(careerScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([career, score]) => ({
        career,
        ...careerPaths[career],
        score
      }));

    setGameResult(topCareers);
    setGameState('gameOver');
  };

  const resetGame = () => {
    setGameState('running');
    setScore(0);
    setLevel(1);
    setQuestionsAnswered(0);
    setUserAnswers({});
    setGameResult(null);
    setObstacles([]);
    setCurrentQuestion(null);
  };

  return (
    <div className="career-game">
      <div className="game-header">
        <div className="game-stats">
          <span>Score: {Math.floor(score)}</span>
          <span>Level: {level}</span>
          <span>Q: {questionsAnswered}/{questions.length}</span>
        </div>
      </div>

      <div className="game-container">
        <div className="road"></div>
        <div className="character">🏃</div>
        {obstacles.map((obs, idx) => (
          <div
            key={obs.id}
            className="question-mark"
            style={{ left: `${obs.x}px`, top: `${obs.y}px` }}
            onClick={() => handleQuestionClick(questionsAnswered)}
          >
            ?
          </div>
        ))}
      </div>

      {currentQuestion && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{currentQuestion.text}</h3>
            <div className="options">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  className="option-btn"
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {gameState === 'gameOver' && gameResult && (
        <div className="modal-overlay">
          <div className="results-content">
            <h2>🎓 Your Career Matches!</h2>
            <p className="results-subtitle">Final Score: {Math.floor(score)}</p>
            
            {gameResult.map((career, idx) => (
              <div key={idx} className="career-card">
                <div className="career-rank">#{idx + 1} Match</div>
                <h4>{career.name}</h4>
                <p className="career-desc">{career.description}</p>
                
                <div className="career-details">
                  <div className="detail">
                    <span className="label">Exam</span>
                    <span>{career.exams}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Duration</span>
                    <span>{career.duration}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Top Colleges</span>
                    <span>{career.colleges}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Salary</span>
                    <span>{career.salary}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="action-buttons">
              <button className="btn-primary">🏠 Find PG (Mera Basera)</button>
              <button className="btn-primary">⏱️ Start Study Timer</button>
              <button className="btn-secondary" onClick={resetGame}>Play Again</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerGame;