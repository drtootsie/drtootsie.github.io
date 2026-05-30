import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const PicturePuzzle = () => {
  const [pieces, setPieces] = useState([]);
  const [solved, setSolved] = useState(false);
  
  // Use a nice dog image from Unsplash
  const imageUrl = "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80";

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    // 2x2 grid = 4 pieces
    const initialPieces = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    setPieces(initialPieces);
    setSolved(false);
  };

  const swapPieces = (idx1, idx2) => {
    const newPieces = [...pieces];
    [newPieces[idx1], newPieces[idx2]] = [newPieces[idx2], newPieces[idx1]];
    setPieces(newPieces);
    
    if (newPieces.every((p, i) => p === i)) {
      setSolved(true);
    }
  };

  const [selected, setSelected] = useState(null);

  const handlePieceClick = (index) => {
    if (solved) return;
    if (selected === null) {
      setSelected(index);
    } else {
      swapPieces(selected, index);
      setSelected(null);
    }
  };

  return (
    <div className="text-center">
      <h4 className="mb-4">Puppy Puzzle 🧩</h4>
      <p className="small text-muted mb-3">Tap two squares to swap them!</p>
      <div className="mx-auto shadow" style={{ width: '300px', height: '300px', display: 'flex', flexWrap: 'wrap', overflow: 'hidden', borderRadius: '8px' }}>
        {pieces.map((piece, index) => {
          const row = Math.floor(piece / 2);
          const col = piece % 2;
          return (
            <div 
              key={index}
              onClick={() => handlePieceClick(index)}
              style={{
                width: '150px',
                height: '150px',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: '300px 300px',
                backgroundPosition: `-${col * 150}px -${row * 150}px`,
                border: selected === index ? '4px solid #ffc107' : '1px solid #fff',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            />
          );
        })}
      </div>
      <Button variant="outline-primary" className="mt-4" onClick={initializePuzzle}>
        Scramble Again
      </Button>
      {solved && (
        <div className="mt-3 text-success fw-bold">Great job! The puppy is happy! 🐶✨</div>
      )}
    </div>
  );
};

export default PicturePuzzle;
