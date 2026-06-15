import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MurdokuTeaser = () => {
  return (
    <Card className="shadow border-0 rounded-4 overflow-hidden mb-4 h-100">
      <Card.Header className="bg-danger text-white text-center py-3">
        <h4 className="mb-0">Murdoku 🕵️‍♀️</h4>
      </Card.Header>
      <Card.Body className="p-4 d-flex flex-column justify-content-between">
        <div>
          <p className="lead mb-4">
            A killer is on the loose. Use Sudoku logic and cryptic clues to find the murderer, the weapon, and the room.
          </p>
          <div className="bg-light p-3 rounded-3 mb-4">
            <h6 className="fw-bold mb-2 text-muted uppercase small">Today's Case</h6>
            <p className="mb-0 italic">"The Butler was seen near the Conservatory, but not with the Wrench..."</p>
          </div>
        </div>
        <Button 
          variant="danger" 
          size="lg" 
          className="w-100 py-3 fw-bold rounded-3 shadow-sm"
          as={Link}
          to="/projects/murdoku"
        >
          Enter the Crime Scene 🔎
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MurdokuTeaser;
