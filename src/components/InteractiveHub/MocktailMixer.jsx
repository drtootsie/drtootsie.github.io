import React, { useState } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';

const INGREDIENTS = [
  { id: 'lemon', name: 'Lemon', icon: '🍋', color: '#fff3cd' },
  { id: 'mint', name: 'Mint', icon: '🌿', color: '#d4edda' },
  { id: 'berry', name: 'Berries', icon: '🍓', color: '#f8d7da' },
  { id: 'soda', name: 'Club Soda', icon: '🫧', color: '#e2e3e5' },
  { id: 'syrup', name: 'Sweet Syrup', icon: '🍯', color: '#fff3cd' },
  { id: 'ice', name: 'Ice', icon: '🧊', color: '#cfe2ff' }
];

const MocktailMixer = () => {
  const [glass, setGlass] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [result, setResult] = useState(null);

  const addIngredient = (ing) => {
    if (glass.length < 5) {
      setGlass([...glass, ing]);
      setResult(null);
    }
  };

  const shake = () => {
    if (glass.length === 0) return;
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      determineResult();
    }, 1000);
  };

  const determineResult = () => {
    const ids = glass.map(i => i.id);
    if (ids.includes('lemon') && ids.includes('mint') && ids.includes('soda')) {
      setResult("The 'Lee's Summit No-Jito' 🍃");
    } else if (ids.includes('berry') && ids.includes('syrup') && ids.includes('soda')) {
      setResult("The 'Sunset Sparkler' 🍓");
    } else if (ids.includes('lemon') && ids.includes('syrup') && ids.includes('ice')) {
      setResult("The 'Classic Cool-Down' 🍋");
    } else {
      setResult("The 'Mystery Mixer' 🧪");
    }
  };

  const clear = () => {
    setGlass([]);
    setResult(null);
  };

  return (
    <Card className="shadow border-0 rounded-4 overflow-hidden mb-4">
      <Card.Header className="bg-warning text-dark text-center py-3">
        <h4 className="mb-0">Mocktail Mixer 🍹</h4>
      </Card.Header>
      <Card.Body className="p-4">
        <Row className="mb-4">
          <Col md={6}>
            <h6>Add Ingredients:</h6>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {INGREDIENTS.map(ing => (
                <Button 
                  key={ing.id} 
                  variant="light" 
                  className="border shadow-sm p-3"
                  onClick={() => addIngredient(ing)}
                >
                  <div className="fs-3">{ing.icon}</div>
                  <small>{ing.name}</small>
                </Button>
              ))}
            </div>
          </Col>
          <Col md={6} className="text-center mt-4 mt-md-0">
            <div 
              className={`mx-auto mb-3 ${isShaking ? 'animate-shake' : ''}`} 
              style={{ 
                width: '100px', 
                height: '150px', 
                border: '4px solid #dee2e6', 
                borderBottomLeftRadius: '20px', 
                borderBottomRightRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#fff'
              }}
            >
              {glass.map((ing, i) => (
                <div 
                  key={i} 
                  style={{ 
                    height: '20%', 
                    width: '100%', 
                    backgroundColor: ing.color,
                    position: 'absolute',
                    bottom: `${i * 20}%`,
                    borderTop: '1px solid rgba(0,0,0,0.05)'
                  }}
                />
              ))}
            </div>
            
            {result ? (
              <div className="h5 fw-bold text-primary animate-fade-in">{result}</div>
            ) : (
              <div className="d-flex gap-2 justify-content-center">
                <Button variant="warning" onClick={shake} disabled={glass.length === 0 || isShaking}>
                  SHAKE! 🌪️
                </Button>
                <Button variant="outline-secondary" onClick={clear}>Clear</Button>
              </div>
            )}
          </Col>
        </Row>
        <style>
          {`
            @keyframes shake {
              0% { transform: translate(1px, 1px) rotate(0deg); }
              10% { transform: translate(-1px, -2px) rotate(-1deg); }
              20% { transform: translate(-3px, 0px) rotate(1deg); }
              30% { transform: translate(3px, 2px) rotate(0deg); }
              40% { transform: translate(1px, -1px) rotate(1deg); }
              50% { transform: translate(-1px, 2px) rotate(-1deg); }
              60% { transform: translate(-3px, 1px) rotate(0deg); }
              70% { transform: translate(3px, 1px) rotate(-1deg); }
              80% { transform: translate(-1px, -1px) rotate(1deg); }
              90% { transform: translate(1px, 2px) rotate(0deg); }
              100% { transform: translate(1px, -2px) rotate(-1deg); }
            }
            .animate-shake {
              animation: shake 0.5s;
              animation-iteration-count: infinite;
            }
          `}
        </style>
      </Card.Body>
    </Card>
  );
};

export default MocktailMixer;
