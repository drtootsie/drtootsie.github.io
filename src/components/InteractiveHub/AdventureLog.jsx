import React, { useState } from 'react';
import { Card, ListGroup, Form, Badge, ProgressBar } from 'react-bootstrap';

const ADVENTURES = [
  { id: 1, name: "Science City", icon: "🚀", location: "Union Station" },
  { id: 2, name: "Deanna Rose Farmstead", icon: "🚜", location: "Overland Park" },
  { id: 3, name: "Longview Lake Trail", icon: "🚲", location: "Lee's Summit" },
  { id: 4, name: "Kansas City Zoo", icon: "🦁", location: "Swope Park" },
  { id: 5, name: "Legoland Discovery Center", icon: "🧱", location: "Crown Center" },
  { id: 6, name: "Nelson-Atkins Shuttlecocks", icon: "🏸", location: "KC Mo" }
];

const AdventureLog = () => {
  const [visited, setVisited] = useState([]);

  const toggleVisit = (id) => {
    setVisited(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const progress = Math.round((visited.length / ADVENTURES.length) * 100);

  return (
    <Card className="shadow border-0 rounded-4 overflow-hidden mb-4">
      <Card.Header className="bg-success text-white text-center py-3">
        <h4 className="mb-0">Family Adventure Log 🗺️</h4>
      </Card.Header>
      <Card.Body className="p-4">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fw-bold">KC Scavenger Hunt</span>
            <Badge bg="success">{progress}% Complete</Badge>
          </div>
          <ProgressBar now={progress} variant="success" />
          <p className="small text-muted mt-2">Check off the places you've visited together!</p>
        </div>

        <ListGroup variant="flush">
          {ADVENTURES.map(adv => (
            <ListGroup.Item 
              key={adv.id} 
              className="d-flex align-items-center justify-content-between py-3 px-0 border-bottom"
              style={{ backgroundColor: 'transparent' }}
            >
              <div className="d-flex align-items-center">
                <div className="fs-3 me-3">{adv.icon}</div>
                <div>
                  <div className={`fw-bold ${visited.includes(adv.id) ? 'text-decoration-line-through text-muted' : ''}`}>
                    {adv.name}
                  </div>
                  <small className="text-muted">{adv.location}</small>
                </div>
              </div>
              <Form.Check 
                type="checkbox"
                checked={visited.includes(adv.id)}
                onChange={() => toggleVisit(adv.id)}
                className="fs-4"
              />
            </ListGroup.Item>
          ))}
        </ListGroup>

        {progress === 100 && (
          <div className="mt-4 p-3 bg-warning rounded-3 text-center fw-bold animate-bounce">
            🏆 KC EXPLORERS MASTERED! 🏆
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AdventureLog;
