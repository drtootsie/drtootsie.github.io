import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Modal, ListGroup } from 'react-bootstrap';
import { CHARACTERS, FURNITURE_ICONS, TEMPLATES } from './murdokuTemplates';
import './Murdoku.css';

const Murdoku = () => {
  const [templateIndex, setTemplateIndex] = useState(0);
  const [board, setBoard] = useState(Array(81).fill(null));
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0].id);
  const [conflicts, setConflicts] = useState([]);
  const [showWinModal, setShowWinModal] = useState(false);
  const [murderer, setMurderer] = useState(null);
  const [clueStatus, setClueStatus] = useState([]);
  const [showClueOverlay, setShowClueOverlay] = useState(false);

  const template = useMemo(() => TEMPLATES[templateIndex], [templateIndex]);

  useEffect(() => {
    validateBoard();
    validateClues();
  }, [board, template]);

  const handleCellClick = (index) => {
    if (template.furniture[index]) return;

    const newBoard = [...board];
    if (newBoard[index] === selectedChar) {
      newBoard[index] = null;
    } else {
      const prevIndex = newBoard.indexOf(selectedChar);
      if (prevIndex !== -1) newBoard[prevIndex] = null;
      newBoard[index] = selectedChar;
    }
    setBoard(newBoard);
  };

  const validateBoard = () => {
    const newConflicts = [];
    const rows = Array(9).fill(0).map(() => []);
    const cols = Array(9).fill(0).map(() => []);

    board.forEach((charId, index) => {
      if (!charId) return;
      const r = Math.floor(index / 9);
      const c = index % 9;
      rows[r].push({ charId, index });
      cols[c].push({ charId, index });
    });

    rows.forEach(row => {
      if (row.length > 1) row.forEach(item => newConflicts.push(item.index));
    });
    cols.forEach(col => {
      if (col.length > 1) col.forEach(item => newConflicts.push(item.index));
    });

    setConflicts([...new Set(newConflicts)]);
  };

  const validateClues = () => {
    const statuses = template.clues.map(clue => {
      const charIdx = board.indexOf(clue.char);
      if (charIdx === -1) return 'pending';

      const charRow = Math.floor(charIdx / 9);
      const charCol = charIdx % 9;
      const charRoom = template.rooms[charIdx];

      switch (clue.type) {
        case 'ROW':
          return charRow === clue.value ? 'valid' : 'invalid';
        case 'COL':
          return charCol === clue.value ? 'valid' : 'invalid';
        case 'ROOM':
          return charRoom === clue.value ? 'valid' : 'invalid';
        case 'SAME_ROOM': {
          const targetIdx = Object.keys(template.furniture).find(key => template.furniture[key] === clue.target);
          return template.rooms[targetIdx] === charRoom ? 'valid' : 'invalid';
        }
        case 'BESIDE': {
          const targetIdx = parseInt(Object.keys(template.furniture).find(key => template.furniture[key] === clue.target));
          const targetRow = Math.floor(targetIdx / 9);
          const targetCol = targetIdx % 9;
          const isAdjacent = Math.abs(charRow - targetRow) + Math.abs(charCol - targetCol) === 1;
          const isSameRoom = template.rooms[targetIdx] === charRoom;
          return (isAdjacent && isSameRoom) ? 'valid' : 'invalid';
        }
        case 'ROW_RELATIVE': {
          const targetCharIdx = board.indexOf(clue.target);
          if (targetCharIdx === -1) return 'pending';
          const targetRow = Math.floor(targetCharIdx / 9);
          return charRow === targetRow + clue.offset ? 'valid' : 'invalid';
        }
        default:
          return 'pending';
      }
    });
    setClueStatus(statuses);
  };

  const checkSolution = () => {
    const placedCount = board.filter(cell => cell !== null).length;
    if (placedCount < CHARACTERS.length) {
      alert("Not everyone has been placed yet!");
      return;
    }

    if (conflicts.length > 0) {
      alert("There are still conflicts (overlapping rows/columns) in the grid!");
      return;
    }

    if (clueStatus.some(s => s !== 'valid')) {
      alert("Some clues are not yet satisfied. Check your placements!");
      return;
    }

    const victimIndex = board.indexOf('v');
    const victimRoom = template.rooms[victimIndex];
    const peopleInVictimRoom = board.filter((id, idx) => id && id !== 'v' && template.rooms[idx] === victimRoom);

    if (peopleInVictimRoom.length === 1) {
      const killerId = peopleInVictimRoom[0];
      const killer = CHARACTERS.find(c => c.id === killerId);
      setMurderer(killer);
      setShowWinModal(true);
    } else {
      alert("The logic is correct, but the Murderer must be the ONLY person in the room with the Victim. Check the room boundaries!");
    }
  };

  const nextPuzzle = () => {
    setTemplateIndex((templateIndex + 1) % TEMPLATES.length);
    setBoard(Array(81).fill(null));
    setShowWinModal(false);
  };

  const renderCell = (index) => {
    const charId = board[index];
    const char = CHARACTERS.find(c => c.id === charId);
    const furnitureKey = template.furniture[index];
    const isConflict = conflicts.includes(index);
    const roomID = template.rooms[index];

    const r = Math.floor(index / 9);
    const c = index % 9;
    
    const borderStyle = {
      borderTop: r > 0 && template.rooms[index - 9] !== roomID ? '3px solid black' : '1px solid #ddd',
      borderLeft: c > 0 && template.rooms[index - 1] !== roomID ? '3px solid black' : '1px solid #ddd',
      borderRight: c === 8 || template.rooms[index + 1] !== roomID ? '3px solid black' : '1px solid #ddd',
      borderBottom: r === 8 || template.rooms[index + 9] !== roomID ? '3px solid black' : '1px solid #ddd',
    };

    return (
      <div 
        key={index} 
        className={`grid-cell ${furnitureKey ? 'furniture' : ''} ${isConflict ? 'conflict' : ''} ${selectedChar === charId ? 'selected-pos' : ''}`}
        style={borderStyle}
        onClick={() => handleCellClick(index)}
      >
        {furnitureKey && <span className="furniture-icon">{FURNITURE_ICONS[furnitureKey]}</span>}
        {char && <span className="char-icon">{char.icon}</span>}
      </div>
    );
  };

  return (
    <Container fluid className="p-0 murdoku-game mobile-friendly">
      <div className="game-header text-center py-3 bg-white border-bottom sticky-top">
        <h2 className="mb-0 fw-bold">Murdoku 🔎</h2>
        <div className="small text-muted">{template.name}</div>
      </div>

      <Container className="py-3 pb-5-mobile">
        <Row className="g-4">
          <Col lg={7} className="d-flex justify-content-center align-items-center">
            <div className="murdoku-grid shadow">
              {Array(81).fill(0).map((_, i) => renderCell(i))}
            </div>
          </Col>

          <Col lg={5} className="d-none d-lg-block">
            {/* Desktop Sidebars */}
            <Card className="border-0 shadow-sm rounded-4 mb-4">
              <Card.Header className="bg-dark text-white py-3 rounded-top-4">
                <h5 className="mb-0">Case File & Clues</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <ListGroup variant="flush">
                  {template.clues.map((clue, idx) => (
                    <ListGroup.Item key={idx} className="border-0 d-flex align-items-center py-2">
                      <span className={`me-3 clue-bullet ${clueStatus[idx]}`}>
                        {clueStatus[idx] === 'valid' ? '✅' : clueStatus[idx] === 'invalid' ? '❌' : '📌'}
                      </span>
                      <span className={clueStatus[idx] === 'valid' ? 'text-muted text-decoration-line-through' : ''}>
                        {clue.text}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <div className="d-grid gap-2">
              <Button variant="danger" size="lg" className="fw-bold py-3" onClick={checkSolution}>
                Accuse Murderer! 👨‍⚖️
              </Button>
              <Row className="g-2">
                <Col><Button variant="outline-secondary" className="w-100" onClick={() => setBoard(Array(81).fill(null))}>Reset Scene</Button></Col>
                <Col><Button variant="outline-primary" className="w-100" onClick={nextPuzzle}>Next Mystery</Button></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Mobile Floating Controls */}
      <div className="mobile-clue-trigger d-lg-none" onClick={() => setShowClueOverlay(true)}>
        <Badge bg="primary" className="p-3 rounded-circle shadow-lg">
          <div className="fs-3">📋</div>
          {clueStatus.filter(s => s === 'valid').length}/{template.clues.length}
        </Badge>
      </div>

      <div className="mobile-bottom-controls d-lg-none">
        <div className="suspect-scroller">
          {CHARACTERS.map(char => (
            <div 
              key={char.id}
              className={`mobile-suspect-item ${selectedChar === char.id ? 'active bg-' + char.color : ''} ${board.indexOf(char.id) !== -1 ? 'placed' : ''}`}
              onClick={() => setSelectedChar(char.id)}
            >
              <div className="icon">{char.icon}</div>
              <div className="name">{char.name.split(' ').pop()}</div>
            </div>
          ))}
        </div>
        <div className="action-row px-2 pb-2 d-flex gap-2">
          <Button variant="danger" className="flex-grow-1 fw-bold" onClick={checkSolution}>ACCUSE 👨‍⚖️</Button>
          <Button variant="outline-secondary" onClick={() => setBoard(Array(81).fill(null))}>🔄</Button>
        </div>
      </div>

      {/* Mobile Clue Overlay */}
      <Modal show={showClueOverlay} onHide={() => setShowClueOverlay(false)} centered fullscreen="md-down">
        <Modal.Header closeButton>
          <Modal.Title>Case Clues</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <ListGroup variant="flush">
            {template.clues.map((clue, idx) => (
              <ListGroup.Item key={idx} className="border-0 d-flex align-items-start py-3">
                <span className={`me-3 clue-bullet ${clueStatus[idx]}`}>
                  {clueStatus[idx] === 'valid' ? '✅' : clueStatus[idx] === 'invalid' ? '❌' : '📌'}
                </span>
                <span className={clueStatus[idx] === 'valid' ? 'text-muted text-decoration-line-through' : ''}>
                  {clue.text}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClueOverlay(false)}>Close Case File</Button>
        </Modal.Footer>
      </Modal>

      {/* Win Modal */}
      <Modal show={showWinModal} onHide={() => setShowWinModal(false)} centered>
        <Modal.Body className="text-center p-5">
          <div className="display-1 mb-4">🎉</div>
          <h2 className="fw-bold mb-3">Case Closed!</h2>
          <p className="fs-5 mb-4">
            Excellent work, detective! You correctly identified <strong>{murderer?.name} {murderer?.icon}</strong> as the killer.
          </p>
          <Button variant="success" size="lg" className="w-100" onClick={nextPuzzle}>
            Next Puzzle
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Murdoku;
