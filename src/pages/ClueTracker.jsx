import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Button, Form, Badge } from 'react-bootstrap';
import GameSetup from '../components/ClueTracker/GameSetup';
import TurnLogger from '../components/ClueTracker/TurnLogger';
import TrackingGrid from '../components/ClueTracker/TrackingGrid';
import StrategicAdvice from '../components/ClueTracker/StrategicAdvice';
import { useClueEngine } from '../hooks/useClueEngine';

const ClueTracker = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const engine = useClueEngine();
  const [selectedMyCards, setSelectedMyCards] = useState([]);

  const handleSetupComplete = (config) => {
    engine.resetGame(config);
    setActiveTab('my-cards');
  };

  const handleMyCardsSubmit = () => {
    engine.updateMyCards(selectedMyCards);
    setActiveTab('log');
  };

  const toggleMyCard = (card) => {
    setSelectedMyCards(prev => 
      prev.includes(card) ? prev.filter(c => c !== card) : [...prev, card]
    );
  };

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="display-5 fw-bold text-primary">Clue Investigator</h1>
          <p className="lead text-muted mb-0">Track suggestions, deduce ownership, and solve the mystery.</p>
        </Col>
        {engine.config && (
          <Col xs="auto">
            <Button variant="outline-danger" size="sm" onClick={() => {
              if(window.confirm('Reset current game?')) {
                engine.resetGame(null);
                setSelectedMyCards([]);
                setActiveTab('setup');
              }
            }}>Reset Game</Button>
          </Col>
        )}
      </Row>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Row>
          <Col lg={3} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body className="p-0">
                <Nav variant="pills" className="flex-column p-3">
                  <Nav.Item>
                    <Nav.Link eventKey="setup" disabled={engine.config !== null} className="mb-1">1. Game Setup</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="my-cards" disabled={!engine.config} className="mb-1">2. My Cards</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="log" disabled={!engine.config} className="mb-1">3. Turn Logger</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="grid" disabled={!engine.config} className="mb-1">4. Logic Grid</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="advice" disabled={!engine.config} className="mb-1">5. Investigator Advice</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>

            {engine.config && (
               <Card className="mt-3 shadow-sm border-0 bg-primary text-white">
                 <Card.Body className="py-2 px-3">
                   <small className="d-block opacity-75">Active Game</small>
                   <strong>{engine.config.players.length} Players</strong>
                 </Card.Body>
               </Card>
            )}
          </Col>

          <Col lg={9}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4">
                <Tab.Content>
                  <Tab.Pane eventKey="setup">
                    <h3>Game Setup</h3>
                    <p className="text-muted">Configure your suspects, weapons, and rooms.</p>
                    <GameSetup onSetupComplete={handleSetupComplete} />
                  </Tab.Pane>

                  <Tab.Pane eventKey="my-cards">
                    <h3>Select Your Cards</h3>
                    <p className="text-muted">Which cards were you dealt? (These are "NO" for everyone else).</p>
                    {engine.config && (
                      <div className="mb-4">
                        <div className="row g-3">
                          {engine.allCards.map((card, i) => (
                            <div key={i} className="col-sm-4 col-md-3">
                              <Button 
                                variant={selectedMyCards.includes(card) ? "primary" : "outline-secondary"}
                                className="w-100 text-truncate"
                                onClick={() => toggleMyCard(card)}
                              >
                                {card}
                              </Button>
                            </div>
                          ))}
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Selected: <strong>{selectedMyCards.length} cards</strong></span>
                          <Button variant="success" size="lg" onClick={handleMyCardsSubmit}>
                            Confirm My Hand
                          </Button>
                        </div>
                      </div>
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="log">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3>Turn Logger</h3>
                      <Badge bg="info">{engine.turns.length} turns logged</Badge>
                    </div>
                    <TurnLogger config={engine.config} onAddTurn={engine.addTurn} />
                    
                    {engine.turns.length > 0 && (
                      <div className="mt-4">
                        <h6>Recent History</h6>
                        <div className="list-group list-group-flush border rounded">
                          {engine.turns.slice().reverse().map((turn, i) => (
                            <div key={i} className="list-group-item small">
                              <strong>{engine.config.players[turn.suggesterIndex]}</strong> suggested 
                              {` ${turn.cards.suspect}, ${turn.cards.weapon}, ${turn.cards.room}. `}
                              {turn.disproverIndex === -1 ? (
                                <span className="text-success fw-bold">No one disproved it!</span>
                              ) : (
                                <span>Disproved by <strong>{engine.config.players[turn.disproverIndex]}</strong></span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="grid">
                    <h3>Logic Grid</h3>
                    <p className="text-muted">Visual matrix of deduced ownership.</p>
                    <TrackingGrid 
                      config={engine.config} 
                      knowledge={engine.knowledge} 
                      allCards={engine.allCards} 
                    />
                  </Tab.Pane>

                  <Tab.Pane eventKey="advice">
                    <h3>Investigator Advice</h3>
                    <StrategicAdvice 
                      config={engine.config} 
                      knowledge={engine.knowledge} 
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default ClueTracker;
