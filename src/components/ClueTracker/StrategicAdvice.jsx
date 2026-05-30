import React from 'react';
import { Card, Alert, ListGroup, Badge } from 'react-bootstrap';

const StrategicAdvice = ({ config, knowledge }) => {
  if (!config || !knowledge) return null;

  const ENVELOPE_INDEX = config.players.length;
  const solution = {
    suspect: config.cards.suspects.find(c => knowledge[ENVELOPE_INDEX][c] === 1),
    weapon: config.cards.weapons.find(c => knowledge[ENVELOPE_INDEX][c] === 1),
    room: config.cards.rooms.find(c => knowledge[ENVELOPE_INDEX][c] === 1)
  };

  const suspectPossibilities = config.cards.suspects.filter(c => knowledge[ENVELOPE_INDEX][c] === 0);
  const weaponPossibilities = config.cards.weapons.filter(c => knowledge[ENVELOPE_INDEX][c] === 0);
  const roomPossibilities = config.cards.rooms.filter(c => knowledge[ENVELOPE_INDEX][c] === 0);

  const isSolved = solution.suspect && solution.weapon && solution.room;

  return (
    <div>
      {isSolved ? (
        <Alert variant="success" className="mb-4 text-center">
          <Alert.Heading>CASE SOLVED!</Alert.Heading>
          <p className="fs-4 mb-0">
            It was <strong>{solution.suspect}</strong> in the <strong>{solution.room}</strong> with the <strong>{solution.weapon}</strong>.
          </p>
        </Alert>
      ) : (
        <Alert variant="info" className="mb-4">
          <Alert.Heading>Investigation Status</Alert.Heading>
          <p>The solution is still hidden. Focus your suggestions on the possibilities listed below.</p>
        </Alert>
      )}

      <div className="row">
        <div className="col-md-4 mb-3">
          <Card className="h-100 shadow-sm border-0">
            <Card.Header className="bg-primary text-white py-3">Suspects</Card.Header>
            <ListGroup variant="flush">
              {solution.suspect ? (
                <ListGroup.Item className="bg-success text-white fw-bold">{solution.suspect}</ListGroup.Item>
              ) : (
                suspectPossibilities.map((c, i) => <ListGroup.Item key={i}>{c}</ListGroup.Item>)
              )}
            </ListGroup>
          </Card>
        </div>
        <div className="col-md-4 mb-3">
          <Card className="h-100 shadow-sm border-0">
            <Card.Header className="bg-danger text-white py-3">Weapons</Card.Header>
            <ListGroup variant="flush">
              {solution.weapon ? (
                <ListGroup.Item className="bg-success text-white fw-bold">{solution.weapon}</ListGroup.Item>
              ) : (
                weaponPossibilities.map((c, i) => <ListGroup.Item key={i}>{c}</ListGroup.Item>)
              )}
            </ListGroup>
          </Card>
        </div>
        <div className="col-md-4 mb-3">
          <Card className="h-100 shadow-sm border-0">
            <Card.Header className="bg-warning text-dark py-3">Rooms</Card.Header>
            <ListGroup variant="flush">
              {solution.room ? (
                <ListGroup.Item className="bg-success text-white fw-bold">{solution.room}</ListGroup.Item>
              ) : (
                roomPossibilities.map((c, i) => <ListGroup.Item key={i}>{c}</ListGroup.Item>)
              )}
            </ListGroup>
          </Card>
        </div>
      </div>

      <Card className="mt-4 border-0 shadow-sm">
        <Card.Body>
          <Card.Title>Strategy Tips</Card.Title>
          <ul>
            <li>Try to suggest cards that you <em>know</em> one player has to confirm which of the other two cards they might have.</li>
            <li>If you have several possibilities for a category, suggest the one you are most suspicious of alongside cards you already know are held by others.</li>
            <li>Pay attention to when players "pass"—this is high-value information!</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StrategicAdvice;
