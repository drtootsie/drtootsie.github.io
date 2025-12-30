import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const blogPosts = [
  {
    id: 1,
    title: "My First Blog Post!!",
    date: "Dec 30, 2025",
    summary: "Reflecting on what I learned this week, from Garmin lap buttons to RSUs and setting up a GitHub blog.",
    tags: ["Jekyll", "Update", "Life"],
    content: "I want to put what I learned every week..."
  },
  {
    id: 2,
    title: "Exploring React & Vite",
    date: "Jan 05, 2026",
    summary: "Setting up a modern web development environment with Vite is incredibly fast. Here's my experience migrating from CRA.",
    tags: ["React", "Vite", "DevOps"],
    content: "..."
  },
  {
    id: 3,
    title: "AI in Healthcare",
    date: "Jan 12, 2026",
    summary: "How large language models are transforming patient care and administrative efficiency.",
    tags: ["AI", "Healthcare", "Tech"],
    content: "..."
  },
   {
    id: 4,
    title: "The Joy of cycling",
    date: "Jan 20, 2026",
    summary: "Why getting outside and hitting the trails is the best way to clear your mind after a long week of coding.",
    tags: ["Hobbies", "Cycling", "Wellness"],
    content: "..."
  }
];

const Blog = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">Latest Thoughts</h2>
        <p className="lead text-muted">Musings on technology, leadership, and life.</p>
      </div>
      
      <Row className="g-4">
        {blogPosts.map((post) => (
          <Col md={6} lg={4} key={post.id}>
            <Card className="h-100 shadow-sm hover-shadow transition-all">
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <small className="text-muted">{post.date}</small>
                </div>
                <Card.Title className="fw-bold mb-3">{post.title}</Card.Title>
                <Card.Text className="flex-grow-1 text-secondary">
                  {post.summary}
                </Card.Text>
                <div className="mb-3">
                  {post.tags.map((tag, idx) => (
                    <Badge bg="light" text="dark" className="me-1 border" key={idx}>#{tag}</Badge>
                  ))}
                </div>
                <Button variant="outline-primary" size="sm" className="mt-auto align-self-start">Read More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;