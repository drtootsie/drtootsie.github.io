import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal } from 'react-bootstrap';
import blogPosts from '../data/posts.json';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleClose = () => setSelectedPost(null);
  const handleShow = (post) => setSelectedPost(post);

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
                  <small className="text-muted">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
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
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="mt-auto align-self-start"
                  onClick={() => handleShow(post)}
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Post Modal */}
      <Modal show={!!selectedPost} onHide={handleClose} size="lg" centered>
        {selectedPost && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedPost.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-muted mb-4">
                {new Date(selectedPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div style={{ whiteSpace: 'pre-line' }}>
                {selectedPost.content}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default Blog;