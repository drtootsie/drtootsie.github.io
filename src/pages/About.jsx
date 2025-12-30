import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center mb-5">
        <Col md={5} className="text-center mb-4 mb-md-0">
          <Image src="./images/bio-photo.jpg" roundedCircle fluid style={{ maxHeight: '300px', width: 'auto' }} className="shadow" />
        </Col>
        <Col md={7}>
          <h2 className="display-5 fw-bold mb-3">Hello, I'm Pepper.</h2>
          <p className="lead text-muted mb-4">
             Engineering Leader, Strategist, and Nerd at heart.
          </p>
          <p className="fs-5">
            Born and raised in Hanford, CA, I've journeyed through life to settle with my wife and puggle in Lee's Summit, MO (Kansas City area). 
          </p>
          <p>
            I thrive on "nerd things" and cycling through passions just as I did in my youth—whether it's diving deep into new tech stacks, gaming, or exploring the outdoors.
          </p>
          <p className="mt-3 text-muted">
            Professionally, I serve as the <strong>Director of Engineering at Netsmart</strong>, where I lead multi-disciplinary teams to build compliant, scalable clinical platforms. My background spans from Electrical Engineering to managing international software teams.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h3 className="fw-bold border-bottom pb-2 mb-4">My Philosophy</h3>
          <p className="fs-5">
            I believe in the power of <strong>continuous learning</strong> and <strong>pragmatic innovation</strong>. 
            Technology is a tool to solve human problems, and the best solutions come from diverse teams feeling empowered to experiment and fail fast. 
            Leading with empathy and clarity is just as important as writing clean code.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3 className="fw-bold border-bottom pb-2 mb-4">Personal Interests</h3>
        </Col>
      </Row>
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm bg-light">
            <Card.Body className="text-center">
              <div className="display-4 mb-2">🎮</div>
              <Card.Title>Gaming</Card.Title>
              <Card.Text>
                Exploring immersive worlds and strategy games.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm bg-light">
             <Card.Body className="text-center">
              <div className="display-4 mb-2">🚲</div>
              <Card.Title>Cycling</Card.Title>
              <Card.Text>
                Garmin lap keys and long rides on the trail.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
         <Col md={4}>
          <Card className="h-100 border-0 shadow-sm bg-light">
             <Card.Body className="text-center">
              <div className="display-4 mb-2">👨‍💻</div>
              <Card.Title>Coding</Card.Title>
              <Card.Text>
                Always learning something new every week.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;