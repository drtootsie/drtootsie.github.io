import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';

const ROWS = 10;
const COLS = 10;

const BlockFit = () => {
  const [grid, setGrid] = useState(Array(ROWS).fill().map(() => Array(COLS).fill(0)));
  const [blocks, setBlocks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    generateNewBlocks();
  }, []);

  const generateNewBlocks = () => {
    const newBlocks = [];
    for (let i = 0; i < 3; i++) {
      newBlocks.push(generateRandomBlock());
    }
    setBlocks(newBlocks);
  };

  const generateRandomBlock = () => {
    const types = [
      [[1, 1], [1, 1]], // Square
      [[1], [1], [1]], // Line Vertical
      [[1, 1, 1]],     // Line Horizontal
      [[1, 0], [1, 1]], // L Small
      [[1, 1], [0, 1]], // L Small Flip
      [[1]]             // Dot
    ];
    const color = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FFD700'][Math.floor(Math.random() * 5)];
    return { shape: types[Math.floor(Math.random() * types.length)], color };
  };

  const handlePlaceBlock = (blockIdx, startR, startC) => {
    const block = blocks[blockIdx];
    if (!canPlace(block.shape, startR, startC)) return;

    const newGrid = [...grid.map(r => [...r])];
    block.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) newGrid[startR + r][startC + c] = block.color;
      });
    });

    // Check lines
    let clearedLines = 0;
    // Check rows
    for (let r = 0; r < ROWS; r++) {
      if (newGrid[r].every(cell => cell !== 0)) {
        newGrid[r] = Array(COLS).fill(0);
        clearedLines++;
      }
    }
    // Check cols
    for (let c = 0; c < COLS; c++) {
      let full = true;
      for (let r = 0; r < ROWS; r++) {
        if (newGrid[r][c] === 0) {
          full = false;
          break;
        }
      }
      if (full) {
        for (let r = 0; r < ROWS; r++) newGrid[r][c] = 0;
        clearedLines++;
      }
    }

    setGrid(newGrid);
    setScore(score + (clearedLines * 100) + 10);
    
    const newBlocks = [...blocks];
    newBlocks.splice(blockIdx, 1);
    if (newBlocks.length === 0) {
      generateNewBlocks();
    } else {
      setBlocks(newBlocks);
    }
  };

  const canPlace = (shape, startR, startC) => {
    if (startR + shape.length > ROWS || startC + shape[0].length > COLS) return false;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[0].length; c++) {
        if (shape[r][c] && grid[startR + r][startC + c] !== 0) return false;
      }
    }
    return true;
  };

  // Simple "Drag and Drop" simulation for mobile: Tap block then tap grid
  const [selectedBlock, setSelectedBlock] = useState(null);

  const handleCellClick = (r, c) => {
    if (selectedBlock !== null) {
      handlePlaceBlock(selectedBlock, r, c);
      setSelectedBlock(null);
    }
  };

  return (
    <div className="text-center">
      <h4 className="mb-4">Block Fit 🧩</h4>
      <div className="mb-3 fs-5 fw-bold">Score: {score}</div>
      
      <div className="mx-auto border bg-light shadow-sm mb-4" style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${COLS}, 1fr)`, 
        width: '300px', 
        height: '300px',
        gap: '1px'
      }}>
        {grid.map((row, r) => row.map((cell, c) => (
          <div 
            key={`${r}-${c}`} 
            onClick={() => handleCellClick(r, c)}
            style={{ 
              backgroundColor: cell === 0 ? 'white' : cell,
              border: '0.1px solid #eee'
            }}
          />
        )))}
      </div>

      <div className="d-flex justify-content-center gap-3 mb-4" style={{ minHeight: '80px' }}>
        {blocks.map((block, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedBlock(idx === selectedBlock ? null : idx)}
            className={`p-2 border rounded ${selectedBlock === idx ? 'bg-primary' : 'bg-white'}`}
            style={{ cursor: 'pointer', opacity: selectedBlock !== null && selectedBlock !== idx ? 0.5 : 1 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${block.shape[0].length}, 15px)` }}>
              {block.shape.map((row, r) => row.map((cell, c) => (
                <div 
                  key={`${r}-${c}`} 
                  style={{ 
                    width: '15px', 
                    height: '15px', 
                    backgroundColor: cell ? block.color : 'transparent' 
                  }} 
                />
              )))}
            </div>
          </div>
        ))}
      </div>

      <p className="small text-muted">Tap a block, then tap the grid to place it!</p>
      <Button variant="outline-danger" size="sm" onClick={() => {
        setGrid(Array(ROWS).fill().map(() => Array(COLS).fill(0)));
        setScore(0);
        generateNewBlocks();
      }}>Reset</Button>
    </div>
  );
};

export default BlockFit;
