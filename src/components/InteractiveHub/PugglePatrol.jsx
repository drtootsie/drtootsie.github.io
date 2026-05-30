import React, { useState } from 'react';
import { Card, Button, Row, Col, ProgressBar, Badge } from 'react-bootstrap';

const PugglePatrol = () => {
  const [energy, setEnergy] = useState(80);
  const [hunger, setHunger] = useState(20);
  const [status, setStatus] = useState('Napping');
  const [barks, setBarks] = useState(0);

  const handleAction = (action) => {
    if (action === 'feed') {
      setHunger(Math.max(0, hunger - 30));
      setStatus('Happy & Full');
    } else if (action === 'play') {
      setEnergy(Math.max(0, energy - 20));
      setHunger(Math.min(100, hunger + 10));
      setStatus('Zoomies!');
    } else if (action === 'nap') {
      setEnergy(Math.min(100, energy + 40));
      setStatus('Dreaming of treats');
    }
  };

  const bark = () => {
    setBarks(barks + 1);
    // Simple visual feedback for "bark"
    const originalStatus = status;
    setStatus('BARK! BARK!');
    setTimeout(() => setStatus(originalStatus), 1000);
  };

  return (
    <Card className="shadow border-0 rounded-4 overflow-hidden mb-4">
      <Card.Header className="bg-primary text-white text-center py-3">
        <h4 className="mb-0">Puggle Patrol 🐾</h4>
      </Card.Header>
      <Card.Body className="p-4">
        <Row className="align-items-center mb-4">
          <Col xs={4} className="text-center">
            <div className="display-1">🐶</div>
            <Badge bg="info" className="mt-2">{status}</Badge>
          </Col>
          <Col xs={8}>
            <div className="mb-3">
              <small className="fw-bold">Energy Level</small>
              <ProgressBar now={energy} variant={energy < 30 ? 'danger' : 'success'} />
            </div>
            <div>
              <small className="fw-bold">Hunger Level</small>
              <ProgressBar now={hunger} variant={hunger > 70 ? 'danger' : 'warning'} />
            </div>
          </Col>
        </Row>
        
        <div className="d-grid gap-2 mb-4">
          <Row className="g-2">
            <Col><Button variant="outline-success" className="w-100" onClick={() => handleAction('feed')}>Give Treat 🦴</Button></Col>
            <Col><Button variant="outline-primary" className="w-100" onClick={() => handleAction('play')}>Throw Ball 🎾</Button></Col>
            <Col><Button variant="outline-secondary" className="w-100" onClick={() => handleAction('nap')}>Go to Bed 💤</Button></Col>
          </Row>
        </div>

        <div className="text-center p-3 bg-light rounded-3">
          <h5>Bark-o-meter</h5>
          <div className="display-4 fw-bold mb-2">{barks}</div>
          <Button variant="danger" size="lg" className="rounded-circle shadow" style={{ width: '80px', height: '80px' }} onClick={bark}>
            BARK!
          </Button>
          <p className="mt-2 text-muted small">Tap to sound the alarm!</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PugglePatrol;
