import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const GitHubProjects = () => {
  // We can eventually fetch these from the GitHub API
  const projects = [
    {
      name: "drtootsie.github.io",
      description: "My personal website and portfolio built with React and Vite.",
      url: "https://github.com/drtootsie/drtootsie.github.io",
      tech: ["React", "Vite", "Bootstrap"]
    },
    {
      name: "turn-based-besties",
      description: "A turn-based game project.",
      url: "https://github.com/drtootsie/turn-based-besties",
      tech: ["React", "Vite"]
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 fw-bold">GitHub Projects</h1>
          <p className="lead text-muted">
            A showcase of my open-source work and side projects.
          </p>
          <hr />
        </Col>
      </Row>
      <Row className="g-4">
        {projects.map((project, index) => (
          <Col key={index} md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{project.name}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <div className="mt-auto">
                  <div className="mb-3">
                    {project.tech.map((t, i) => (
                      <span key={i} className="badge bg-secondary me-1">{t}</span>
                    ))}
                  </div>
                  <Button variant="outline-dark" href={project.url} target="_blank">
                    View on GitHub
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GitHubProjects;
