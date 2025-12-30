import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const StoryTime = () => {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 fw-bold">Story Time</h1>
          <p className="lead text-muted">
            A collection of stories, experiences, and reflections.
          </p>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="fs-5">
            Content for Story Time is coming soon! Stay tuned for more updates.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default StoryTime;
