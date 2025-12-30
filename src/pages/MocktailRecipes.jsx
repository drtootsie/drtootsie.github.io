import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const MocktailRecipes = () => {
  const recipes = [
    {
      title: "Coming Soon",
      description: "My favorite refreshing non-alcoholic blends are being curated.",
      ingredients: ["Patience", "Thirst"],
      category: "Refreshing"
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 fw-bold">Mocktail Recipes</h1>
          <p className="lead text-muted">
            Delicious, craft non-alcoholic beverages for any occasion.
          </p>
          <hr />
        </Col>
      </Row>
      <Row className="g-4">
        {recipes.map((recipe, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <Badge bg="info" className="mb-2">{recipe.category}</Badge>
                <Card.Title className="fw-bold">{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <h6>Ingredients:</h6>
                <ul>
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MocktailRecipes;
