import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';

const GRID_SIZE = 5;

const TreasureMap = () => {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [treasurePos, setTreasurePos] = useState({ x: 4, y: 4 });
  const [obstacles, setObstacles] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, won

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    setPlayerPos({ x: 0, y: 0 });
    setGameState('playing');
    
    // Randomize treasure and obstacles
    let tx = Math.floor(Math.random() * (GRID_SIZE - 2)) + 2;
    let ty = Math.floor(Math.random() * (GRID_SIZE - 2)) + 2;
    setTreasurePos({ x: tx, y: ty });

    const newObstacles = [];
    while (newObstacles.length < 3) {
      let ox = Math.floor(Math.random() * GRID_SIZE);
      let oy = Math.floor(Math.random() * GRID_SIZE);
      if ((ox !== 0 || oy !== 0) && (ox !== tx || oy !== ty)) {
        newObstacles.push({ x: ox, y: oy });
      }
    }
    setObstacles(newObstacles);
  };

  const move = (dx, dy) => {
    if (gameState !== 'playing') return;

    const newX = Math.max(0, Math.min(GRID_SIZE - 1, playerPos.x + dx));
    const newY = Math.max(0, Math.min(GRID_SIZE - 1, playerPos.y + dy));

    // Check obstacle
    if (obstacles.some(obs => obs.x === newX && obs.y === newY)) {
      return; // Can't move there
    }

    setPlayerPos({ x: newX, y: newY });

    if (newX === treasurePos.x && newY === treasurePos.y) {
      setGameState('won');
    }
  };

  const renderCell = (x, y) => {
    if (playerPos.x === x && playerPos.y === y) return '👦';
    if (treasurePos.x === x && treasurePos.y === y) return '🎁';
    if (obstacles.some(obs => obs.x === x && obs.y === y)) return '🧱';
    return '';
  };

  return (
    <div className="text-center">
      <h4 className="mb-4">Treasure Hunt 🎁</h4>
      <div className="mx-auto border bg-light shadow-sm mb-4" style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, 
        width: '300px', 
        height: '300px',
        gap: '2px'
      }}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          return (
            <div 
              key={i} 
              className="bg-white d-flex align-items-center justify-content-center"
              style={{ fontSize: '2rem' }}
            >
              {renderCell(x, y)}
            </div>
          );
        })}
      </div>

      {gameState === 'won' ? (
        <div className="mb-4">
          <div className="h4 text-success fw-bold">You found the treasure! 🎉</div>
          <Button variant="primary" onClick={initializeGame}>Play Again</Button>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <Button variant="secondary" className="mb-2" style={{ width: '60px' }} onClick={() => move(0, -1)}>↑</Button>
          <div className="d-flex gap-2">
            <Button variant="secondary" style={{ width: '60px' }} onClick={() => move(-1, 0)}>←</Button>
            <Button variant="secondary" style={{ width: '60px' }} onClick={() => move(0, 1)}>↓</Button>
            <Button variant="secondary" style={{ width: '60px' }} onClick={() => move(1, 0)}>→</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasureMap;
