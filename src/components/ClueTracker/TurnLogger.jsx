import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const TurnLogger = ({ config, onAddTurn }) => {
  const [suggesterIndex, setSuggesterIndex] = useState(0);
  const [suspect, setSuspect] = useState(config.cards.suspects[0]);
  const [weapon, setWeapon] = useState(config.cards.weapons[0]);
  const [room, setRoom] = useState(config.cards.rooms[0]);
  const [disproverIndex, setDisproverIndex] = useState(-1); // -1 for no one
  const [shownCard, setShownCard] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTurn({
      suggesterIndex: parseInt(suggesterIndex),
      cards: { suspect, weapon, room },
      disproverIndex: parseInt(disproverIndex),
      shownCard: shownCard || null
    });
    // Reset some fields but keep suggester for next turn potentially
    setShownCard('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label fw-bold>Who made the suggestion?</Form.Label>
            <Form.Select value={suggesterIndex} onChange={(e) => setSuggesterIndex(e.target.value)}>
              {config.players.map((p, i) => (
                <option key={i} value={i}>{p}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Card className="mb-3 border-0 bg-light">
        <Card.Body>
          <Card.Title className="h6">The Suggestion</Card.Title>
          <Row>
            <Col md={4}>
              <Form.Select value={suspect} onChange={(e) => setSuspect(e.target.value)}>
                {config.cards.suspects.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select value={weapon} onChange={(e) => setWeapon(e.target.value)}>
                {config.cards.weapons.map((w, i) => <option key={i} value={w}>{w}</option>)}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select value={room} onChange={(e) => setRoom(e.target.value)}>
                {config.cards.rooms.map((r, i) => <option key={i} value={r}>{r}</option>)}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label fw-bold>Who disproved it?</Form.Label>
            <Form.Select value={disproverIndex} onChange={(e) => setDisproverIndex(e.target.value)}>
              <option value="-1">No one (Solution!)</option>
              {config.players.map((p, i) => (
                <option key={i} value={i}>{p}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        {parseInt(disproverIndex) === config.userIndex && (
           <Col md={6}>
            <Form.Group>
              <Form.Label fw-bold>Which card did you show?</Form.Label>
              <Form.Select value={shownCard} onChange={(e) => setShownCard(e.target.value)}>
                <option value="">Select a card...</option>
                <option value={suspect}>{suspect}</option>
                <option value={weapon}>{weapon}</option>
                <option value={room}>{room}</option>
              </Form.Select>
            </Form.Group>
          </Col>
        )}
      </Row>

      <Button variant="primary" type="submit">Log Turn</Button>
    </Form>
  );
};

export default TurnLogger;
