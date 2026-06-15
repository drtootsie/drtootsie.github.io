import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';

const GRID_SIZE = 5;

const TreasureMap = () => {
  const [playerPos, setPlayerPos] = useState(() => {
    const saved = localStorage.getItem('treasure_player_pos');
    return saved ? JSON.parse(saved) : { x: 0, y: 0 };
  });
  const [treasurePos, setTreasurePos] = useState(() => {
    const saved = localStorage.getItem('treasure_pos');
    return saved ? JSON.parse(saved) : { x: 4, y: 4 };
  });
  const [obstacles, setObstacles] = useState(() => {
    const saved = localStorage.getItem('treasure_obstacles');
    return saved ? JSON.parse(saved) : [];
  });
  const [gameState, setGameState] = useState(() => {
    return localStorage.getItem('treasure_game_state') || 'playing';
  });

  useEffect(() => {
    if (obstacles.length === 0) {
      initializeGame();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('treasure_player_pos', JSON.stringify(playerPos));
    localStorage.setItem('treasure_pos', JSON.stringify(treasurePos));
    localStorage.setItem('treasure_obstacles', JSON.stringify(obstacles));
    localStorage.setItem('treasure_game_state', gameState);
  }, [playerPos, treasurePos, obstacles, gameState]);

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
    <div className="text-center treasure-hunt-container">
      <h4 className="mb-3">Treasure Hunt 🎁</h4>
      <div className="mx-auto border bg-light shadow-sm mb-4 treasure-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, 
        width: '100%',
        maxWidth: '350px',
        aspectRatio: '1 / 1',
        gap: '4px',
        padding: '4px',
        borderRadius: '8px'
      }}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          return (
            <div 
              key={i} 
              className="bg-white d-flex align-items-center justify-content-center rounded"
              style={{ fontSize: 'clamp(1.5rem, 8vw, 2.5rem)' }}
            >
              {renderCell(x, y)}
            </div>
          );
        })}
      </div>

      {gameState === 'won' ? (
        <div className="mb-4">
          <div className="h4 text-success fw-bold mb-3">You found the treasure! 🎉</div>
          <Button variant="primary" size="lg" className="rounded-pill px-5 shadow" onClick={initializeGame}>Play Again</Button>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center mobile-dpad">
          <Button variant="dark" className="mb-2 dpad-btn" onClick={() => move(0, -1)}>↑</Button>
          <div className="d-flex gap-2">
            <Button variant="dark" className="dpad-btn" onClick={() => move(-1, 0)}>←</Button>
            <Button variant="dark" className="dpad-btn" onClick={() => move(0, 1)}>↓</Button>
            <Button variant="dark" className="dpad-btn" onClick={() => move(1, 0)}>→</Button>
          </div>
        </div>
      )}

      <style>{`
        .dpad-btn {
          width: 70px;
          height: 70px;
          font-size: 1.5rem;
          font-weight: bold;
          border-radius: 15px;
          box-shadow: 0 4px 0 #000;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .dpad-btn:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #000;
        }
        @media (max-width: 576px) {
          .treasure-grid {
            max-width: 280px;
          }
          .dpad-btn {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default TreasureMap;
