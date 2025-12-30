import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col md={4}>
          <Image src="/assets/images/bio-photo.jpg" roundedCircle fluid />
        </Col>
        <Col md={8}>
          <h2>About Me</h2>
          <p>
            Pepper Pancoast was born and !raised in Hanford, CA. He moved around a bit with family to reside with his wife and puggle in Lee's Summit, MO (Basically Kansas City for those who don't know Missouri).
          </p>
          <p>
            He likes many of the nerd things and goes through phases like his youthful childhood.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
