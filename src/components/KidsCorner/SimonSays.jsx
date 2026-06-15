import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const COLORS = [
  { name: 'green', color: '#28a745', active: '#a1e4b3' },
  { name: 'red', color: '#dc3545', active: '#f5b7bd' },
  { name: 'yellow', color: '#ffc107', active: '#ffe8a1' },
  { name: 'blue', color: '#007bff', active: '#a1ccff' }
];

const SimonSays = () => {
  const [sequence, setSequence] = useState(() => {
    const saved = localStorage.getItem('simon_sequence');
    return saved ? JSON.parse(saved) : [];
  });
  const [userSequence, setUserSequence] = useState([]);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [message, setMessage] = useState(sequence.length > 0 ? 'Welcome back! Resume your turn.' : 'Press Start to Play!');

  useEffect(() => {
    localStorage.setItem('simon_sequence', JSON.stringify(sequence));
  }, [sequence]);

  const startNextLevel = useCallback((currentSequence) => {
    const nextColor = Math.floor(Math.random() * 4);
    const newSequence = [...currentSequence, nextColor];
    setSequence(newSequence);
    displaySequence(newSequence);
  }, []);

  const displaySequence = async (seq) => {
    setIsDisplaying(true);
    setMessage('Watch closely...');
    for (let i = 0; i < seq.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setActiveColor(seq[i]);
      await new Promise(r => setTimeout(r, 600));
      setActiveColor(null);
    }
    setIsDisplaying(false);
    setMessage('Your turn!');
    setUserSequence([]);
  };

  const handleColorClick = (index) => {
    if (isDisplaying) return;

    // Flash color
    setActiveColor(index);
    setTimeout(() => setActiveColor(null), 300);

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    // Check if correct
    if (index !== sequence[newUserSequence.length - 1]) {
      setMessage('Oops! Try again!');
      setSequence([]);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      setMessage('Good job!');
      setTimeout(() => startNextLevel(sequence), 1000);
    }
  };

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    startNextLevel([]);
  };

  return (
    <div className="text-center">
      <h4 className="mb-4">Color Copy 🔴🟡🟢🔵</h4>
      <div className="mb-4 fs-5 fw-bold">{message}</div>
      <div className="mx-auto" style={{ maxWidth: '300px' }}>
        <Row className="g-3">
          {COLORS.map((color, index) => (
            <Col xs={6} key={index}>
              <div 
                onClick={() => handleColorClick(index)}
                style={{
                  height: '120px',
                  backgroundColor: activeColor === index ? color.active : color.color,
                  borderRadius: '15px',
                  cursor: isDisplaying ? 'default' : 'pointer',
                  border: '5px solid #fff',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.1s'
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
      <Button variant="primary" size="lg" className="mt-4 px-5" onClick={startGame} disabled={isDisplaying}>
        {sequence.length === 0 ? 'Start' : 'Restart'}
      </Button>
      {sequence.length > 0 && !isDisplaying && (
        <div className="mt-3">Score: {sequence.length - 1}</div>
      )}
    </div>
  );
};

export default SimonSays;
