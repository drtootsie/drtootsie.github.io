import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';

const DEFAULT_CARDS = {
  suspects: ['Col. Mustard', 'Prof. Plum', 'Mr. Green', 'Mrs. Peacock', 'Miss Scarlet', 'Mrs. White'],
  weapons: ['Knife', 'Candlestick', 'Pistol', 'Poison', 'Trophy', 'Rope'],
  rooms: ['Hall', 'Lounge', 'Dining Room', 'Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study']
};

const GameSetup = ({ onSetupComplete }) => {
  const [suspects, setSuspects] = useState(DEFAULT_CARDS.suspects.join(', '));
  const [weapons, setWeapons] = useState(DEFAULT_CARDS.weapons.join(', '));
  const [rooms, setRooms] = useState(DEFAULT_CARDS.rooms.join(', '));
  const [players, setPlayers] = useState('Player 1, Player 2, Player 3');
  const [userIndex, setUserIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      cards: {
        suspects: suspects.split(',').map(s => s.trim()).filter(s => s),
        weapons: weapons.split(',').map(s => s.trim()).filter(s => s),
        rooms: rooms.split(',').map(s => s.trim()).filter(s => s),
      },
      players: players.split(',').map(p => p.trim()).filter(p => p),
      userIndex: parseInt(userIndex)
    };
    onSetupComplete(config);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="mb-4 border-0 bg-light">
        <Card.Body>
          <Card.Title className="h5 mb-3">Card Configuration</Card.Title>
          <Form.Group className="mb-3">
            <Form.Label fw-bold>Suspects (comma separated)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2} 
              value={suspects} 
              onChange={(e) => setSuspects(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label fw-bold>Weapons (comma separated)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2} 
              value={weapons} 
              onChange={(e) => setWeapons(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label fw-bold>Rooms (comma separated)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2} 
              value={rooms} 
              onChange={(e) => setRooms(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-secondary" size="sm" onClick={() => {
            setSuspects(DEFAULT_CARDS.suspects.join(', '));
            setWeapons(DEFAULT_CARDS.weapons.join(', '));
            setRooms(DEFAULT_CARDS.rooms.join(', '));
          }}>Reset to Classic Clue</Button>
        </Card.Body>
      </Card>

      <Card className="mb-4 border-0 bg-light">
        <Card.Body>
          <Card.Title className="h5 mb-3">Players & Turn Order</Card.Title>
          <Form.Group className="mb-3">
            <Form.Label fw-bold>Player Names (in turn order, comma separated)</Form.Label>
            <Form.Control 
              value={players} 
              onChange={(e) => setPlayers(e.target.value)}
              placeholder="e.g. Mustard, Plum, Scarlet"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label fw-bold>Which player are you?</Form.Label>
            <Form.Select value={userIndex} onChange={(e) => setUserIndex(e.target.value)}>
              {players.split(',').map((p, i) => (
                <option key={i} value={i}>{p.trim() || `Player ${i+1}`}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" type="submit">
          Initialize Game Engine
        </Button>
      </div>
    </Form>
  );
};

export default GameSetup;
