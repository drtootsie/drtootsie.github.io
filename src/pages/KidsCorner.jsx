import React, { useState } from 'react';
import { Container, Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import EmojiMatch from '../components/KidsCorner/EmojiMatch';
import PicturePuzzle from '../components/KidsCorner/PicturePuzzle';
import SimonSays from '../components/KidsCorner/SimonSays';
import TreasureMap from '../components/KidsCorner/TreasureMap';
import BlockFit from '../components/KidsCorner/BlockFit';

const KidsCorner = () => {
  const [activeTab, setActiveTab] = useState('emoji');

  return (
    <Container className="py-4">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Kids Corner 🎈</h1>
          <p className="lead text-muted">Fun puzzles and games for the little investigator!</p>
        </Col>
      </Row>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Nav variant="pills" className="justify-content-center mb-4 bg-light p-2 rounded-pill shadow-sm">
              <Nav.Item>
                <Nav.Link eventKey="emoji" className="rounded-pill px-4">Emoji Match</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="picture" className="rounded-pill px-4">Puppy Puzzle</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="simon" className="rounded-pill px-4">Color Copy</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="treasure" className="rounded-pill px-4">Treasure Hunt</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="blocks" className="rounded-pill px-4">Block Fit</Nav.Link>
              </Nav.Item>
            </Nav>

            <Card className="shadow border-0 rounded-4 overflow-hidden mb-5">
              <Card.Body className="p-4 p-md-5">
                <Tab.Content>
                  <Tab.Pane eventKey="emoji">
                    <EmojiMatch />
                  </Tab.Pane>
                  <Tab.Pane eventKey="picture">
                    <PicturePuzzle />
                  </Tab.Pane>
                  <Tab.Pane eventKey="simon">
                    <SimonSays />
                  </Tab.Pane>
                  <Tab.Pane eventKey="treasure">
                    <TreasureMap />
                  </Tab.Pane>
                  <Tab.Pane eventKey="blocks">
                    <BlockFit />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>

      <Row className="mt-5 text-center">
        <Col>
          <div className="p-4 bg-light rounded-4">
            <h5 className="fw-bold">Want more games?</h5>
            <p className="mb-0">Keep checking back! I'm always adding new things to my site.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default KidsCorner;
