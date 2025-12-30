import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="py-5 mb-5 bg-light rounded-3 jumbotron-custom">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">Pepper Pancoast</h1>
              <p className="lead fs-3 text-muted">Engineering Executive & Technology Strategist</p>
              <p className="mb-4">
                Specializing in AI-driven solutions, software architecture, and building high-performance teams.
              </p>
              <Button variant="primary" size="lg" className="me-2" href="#contact">Get in Touch</Button>
              <Button variant="outline-dark" size="lg" as={Link} to="/about">More About Me</Button>
            </Col>
            <Col md={4} className="text-center">
              {/* Placeholder for Profile Image */}
               <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto" style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                  <img src="./images/bio-photo.jpg" alt="Pepper Pancoast" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Summary */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="fw-bold mb-4">About Me</h2>
              <p className="fs-5 text-secondary">
                I am a passionate technology leader with a deep focus on leveraging artificial intelligence to solve complex problems. 
                With a background in software engineering and strategic planning, I bridge the gap between technical innovation and business value.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="fw-bold mb-5 text-center">Skills & Expertise</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-bold">Leadership</Card.Title>
                  <Card.Text>
                    Strategic Planning, Team Building, Agile Methodologies, Mentorship, Stakeholder Management
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-bold">Technical</Card.Title>
                  <Card.Text>
                    <Badge bg="secondary" className="me-1">React</Badge>
                    <Badge bg="secondary" className="me-1">Node.js</Badge>
                    <Badge bg="secondary" className="me-1">Python</Badge>
                    <Badge bg="secondary" className="me-1">AWS</Badge>
                    <Badge bg="secondary" className="me-1">AI/ML</Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-bold">Innovation</Card.Title>
                  <Card.Text>
                    Product Strategy, MVP Development, Digital Transformation, Cloud Architecture
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Experience Section (Placeholder for LinkedIn Data) */}
      <section className="py-5">
        <Container>
          <h2 className="fw-bold mb-4">Professional Experience</h2>
          <div className="border-start border-3 ps-4 border-primary">
            <div className="mb-4">
              <h4>Position Title</h4>
              <p className="text-muted mb-1">Company Name • Date - Present</p>
              <p>
                Brief description of the role and key achievements. This section will be populated with detailed data from LinkedIn in the future.
              </p>
            </div>
            <div className="mb-4">
              <h4>Previous Position</h4>
              <p className="text-muted mb-1">Previous Company • Date - Date</p>
              <p>
                Description of responsibilities and impact.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-light" id="contact">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">Get In Touch</h2>
          <p className="fs-5 mb-4">
            Interested in collaborating or have a question? Feel free to reach out!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" size="lg" href="mailto:pepper.pancoast@example.com">Email Me</Button>
            <Button variant="outline-dark" size="lg" href="https://linkedin.com/in/pepperpancoast" target="_blank" rel="noopener noreferrer">LinkedIn</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;