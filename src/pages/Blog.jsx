import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Blog = () => {
  return (
    <Container className="mt-5">
      <h2>Blog</h2>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>My First Blog Post!!</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Tags: Jekyll, update</Card.Subtitle>
          <Card.Text as="div">
            <p>I want to put what I learned every week</p>
            <p>Garmin Lap Key button</p>
            <p>RSU</p>
            <p>How easy it is to create a GitHub Blog post</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Blog;
