import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const EmojiMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedEmojis = [...EMOJIS, ...EMOJIS];
    const shuffled = duplicatedEmojis.sort(() => Math.random() - 0.5);
    setCards(shuffled.map((emoji, index) => ({ id: index, emoji })));
    setSolved([]);
    setFlipped([]);
  };

  const handleCardClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].emoji === cards[secondId].emoji) {
        setSolved([...solved, firstId, secondId]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="text-center">
      <h4 className="mb-4">Emoji Match 🐶</h4>
      <Row className="g-2 justify-content-center mx-auto" style={{ maxWidth: '400px' }}>
        {cards.map((card, index) => (
          <Col xs={3} key={index}>
            <Card 
              className={`h-100 d-flex align-items-center justify-content-center shadow-sm border-0`}
              style={{ 
                height: '80px', 
                cursor: 'pointer',
                backgroundColor: solved.includes(index) ? '#d4edda' : (flipped.includes(index) ? '#fff' : '#007bff'),
                fontSize: '2rem',
                minHeight: '80px'
              }}
              onClick={() => handleCardClick(index)}
            >
              {(flipped.includes(index) || solved.includes(index)) ? card.emoji : '?'}
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="outline-primary" className="mt-4" onClick={initializeGame}>
        Restart Game
      </Button>
      {solved.length === cards.length && cards.length > 0 && (
        <div className="mt-3 text-success fw-bold">You matched them all! 🎉</div>
      )}
    </div>
  );
};

export default EmojiMatch;
