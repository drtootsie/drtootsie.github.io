import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PugglePatrol from '../components/InteractiveHub/PugglePatrol';
import AdventureLog from '../components/InteractiveHub/AdventureLog';
import MocktailMixer from '../components/InteractiveHub/MocktailMixer';

const InteractiveHub = () => {
  return (
    <Container className="py-5">
      <Row className="mb-4 text-center">
        <Col lg={8} className="mx-auto">
          <h1 className="display-4 fw-bold text-primary">Family Fun Hub 🚀</h1>
          <p className="lead text-muted">
            Interactive tools, games, and trackers for the Pancoast family adventures.
          </p>
          <hr className="my-5" />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={4}>
          <PugglePatrol />
        </Col>
        <Col lg={4}>
          <AdventureLog />
        </Col>
        <Col lg={4}>
          <MocktailMixer />
        </Col>
      </Row>

      <Row className="mt-5 text-center">
        <Col lg={8} className="mx-auto">
          <div className="p-5 bg-light rounded-4 shadow-sm">
            <h2 className="fw-bold mb-3">Winning the June Reset! 💰</h2>
            <p className="fs-5">
              Keep pushing! Every treat given to the dog and every mocktail mixed is one step closer to June.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InteractiveHub;
