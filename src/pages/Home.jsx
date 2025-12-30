import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import resumeData from '../data/resume.json';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="py-5 mb-5 bg-light rounded-3 jumbotron-custom">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">{resumeData.basics.name}</h1>
              <p className="lead fs-3 text-muted">{resumeData.basics.label}</p>
              <p className="mb-4">
                {resumeData.basics.summary}
              </p>
              <Button variant="primary" size="lg" className="me-2" href="#contact">Get in Touch</Button>
              <Button variant="outline-dark" size="lg" as={Link} to="/about">More About Me</Button>
            </Col>
            <Col md={4} className="text-center">
              {/* Placeholder for Profile Image */}
               <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto" style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                  <img src="./images/bio-photo.jpg" alt={resumeData.basics.name} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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
               {resumeData.basics.summary}
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
            {resumeData.skills.map((skillCategory, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold">{skillCategory.name}</Card.Title>
                    <Card.Text>
                      {skillCategory.keywords.map((keyword, kIndex) => (
                        <Badge bg="secondary" className="me-1 mb-1" key={kIndex}>{keyword}</Badge>
                      ))}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section className="py-5">
        <Container>
          <h2 className="fw-bold mb-4">Featured Projects</h2>
          <Row className="g-4">
            {resumeData.projects && resumeData.projects.map((project, index) => (
              <Col md={6} key={index}>
                <Card className="h-100 shadow-sm border-0 bg-white">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="fw-bold h5">{project.name}</Card.Title>
                      {project.url && project.url !== '#' && (
                         <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                           <i className="bi bi-link-45deg"></i> View
                         </a>
                      )}
                    </div>
                    <Card.Text className="text-muted mb-3">
                      {project.description}
                    </Card.Text>
                    <div>
                      {project.keywords.map((keyword, kIndex) => (
                        <Badge bg="light" text="dark" className="me-1 border" key={kIndex}>{keyword}</Badge>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="fw-bold mb-4">Professional Experience</h2>
          <div className="border-start border-3 ps-4 border-primary">
            {resumeData.work.map((job, index) => (
              <div className="mb-5 position-relative" key={index}>
                {/* Dot on the timeline */}
                <div className="position-absolute bg-primary rounded-circle" style={{ width: '16px', height: '16px', left: '-33px', top: '5px' }}></div>
                
                <h4 className="fw-bold">{job.position}</h4>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="text-primary mb-0">{job.name}</h5>
                  <span className="text-muted small">{job.startDate} - {job.endDate}</span>
                </div>
                <p className="text-muted mb-2">{job.summary}</p>
                {job.highlights && (
                  <ul className="mb-0">
                    {job.highlights.map((highlight, hIndex) => (
                      <li key={hIndex}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

       {/* Education Section */}
       <section className="py-5 bg-light">
        <Container>
          <h2 className="fw-bold mb-4">Education</h2>
          <Row>
             {resumeData.education.map((edu, index) => (
                <Col md={6} key={index} className="mb-3">
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Body>
                            <Card.Title>{edu.institution}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{edu.studyType}, {edu.area}</Card.Subtitle>
                            <Card.Text className="text-muted small">
                                {edu.startDate} - {edu.endDate}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
             ))}
          </Row>
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
            <Button variant="primary" size="lg" href={`mailto:${resumeData.basics.email}`}>Email Me</Button>
            {resumeData.basics.profiles.map((profile, index) => (
              <Button 
                key={index}
                variant="outline-dark" 
                size="lg" 
                href={profile.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {profile.network}
              </Button>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;