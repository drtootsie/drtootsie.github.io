import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import StickFigure from '../components/StoryStudio/StickFigure';

const STORY_TEMPLATES = {
  space: [
    "Once upon a time in a galaxy far away, a brave explorer landed on a planet made of cheese. They were looking for a lost moon-rock but found a friendly alien who loved to dance!",
    "The rocket ship zoomed past Mars and headed straight for the Milky Way. The pilot looked out the window and saw a shooting star that granted every wish. They wished for the biggest pizza in the universe!"
  ],
  knight: [
    "In a kingdom with tall towers, a shiny knight set out to rescue a misunderstood dragon. Instead of fighting, they spent the afternoon playing hide-and-seek and eating cupcakes.",
    "The golden shield glittered in the sun as the hero walked toward the enchanted forest. They weren't looking for gold, but for the legendary talking squirrel of Lee's Summit!"
  ],
  wizard: [
    "The wizard waved their magic wand and—POOF! All the vegetables in the garden turned into candy bars. It was the tastiest day in the history of magic.",
    "Deep in the crystal caves, the wise wizard found a spellbook that could make toys come to life. Suddenly, the LEGO castle started building itself!"
  ],
  robot: [
    "Beep boop! The little robot wanted to learn how to paint. Using its mechanical arms, it created a masterpiece that looked exactly like a giant bowl of ice cream.",
    "In the city of the future, a robot named Geary decided to go on a vacation to the beach. It had to wear lots of waterproof oil so it wouldn't get rusty while building sandcastles!"
  ],
  bedtime: [
    "As the stars began to twinkle over Lee's Summit, a cozy little bear snuggled into a bed made of soft clouds. The moon whispered a secret story about a land where dreams come true, and soon, the bear was fast asleep.",
    "The sun went down, and the world became quiet and still. A tiny owl flapped its wings and flew to the top of a giant oak tree. It watched as all the forest friends tucked themselves in for a night of wonderful, happy dreams."
  ],
  zoo: [
    "The three best friends entered the big iron gates of the zoo. They saw a lion with a very silly haircut and a giraffe who was wearing a polka-dot tie! It was the best day ever.",
    "At the zoo, the kids found a monkey who was trying to teach a penguin how to juggle bananas. Everyone laughed so hard that the elephants started trumpeting along!"
  ],
  silly: [
    "A giant purple elephant decided to run for mayor of the town. Its campaign promise? Free chocolate milk for everyone and mandatory nap time at the park!",
    "One morning, the shoes decided they were tired of walking on the ground and started flying like birds. Everyone had to jump high just to catch their sneakers!"
  ],
  default: [
    "Once upon a time, a curious friend went on a big adventure in their own backyard. They found a secret door hidden under a leaf that led to a world where everything was made of marshmallows.",
    "It was a sunny day when the adventurer decided to build a giant fort. Inside the fort, they found a map that led to a treasure chest filled with chocolate coins!"
  ]
};

const StoryTime = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState(null);
  const [theme, setTheme] = useState('default');
  const [charCount, setCharCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const generateStory = () => {
    if (!prompt) return;
    setLoading(true);
    
    setTimeout(() => {
      let selectedTheme = 'default';
      const lowerPrompt = prompt.toLowerCase();
      
      if (lowerPrompt.includes('space') || lowerPrompt.includes('alien') || lowerPrompt.includes('rocket')) {
        selectedTheme = 'space';
      } else if (lowerPrompt.includes('knight') || lowerPrompt.includes('dragon') || lowerPrompt.includes('castle')) {
        selectedTheme = 'knight';
      } else if (lowerPrompt.includes('wizard') || lowerPrompt.includes('magic') || lowerPrompt.includes('spell')) {
        selectedTheme = 'wizard';
      } else if (lowerPrompt.includes('robot') || lowerPrompt.includes('computer')) {
        selectedTheme = 'robot';
      } else if (lowerPrompt.includes('bedtime') || lowerPrompt.includes('sleep') || lowerPrompt.includes('night')) {
        selectedTheme = 'bedtime';
      } else if (lowerPrompt.includes('zoo') || lowerPrompt.includes('animal') || lowerPrompt.includes('lion')) {
        selectedTheme = 'zoo';
      } else if (lowerPrompt.includes('silly') || lowerPrompt.includes('funny') || lowerPrompt.includes('laugh')) {
        selectedTheme = 'silly';
      }

      // Detect number of characters
      let count = 1;
      if (lowerPrompt.includes('two') || lowerPrompt.includes(' 2 ') || lowerPrompt.includes('couple')) count = 2;
      if (lowerPrompt.includes('three') || lowerPrompt.includes(' 3 ') || lowerPrompt.includes('kids') || lowerPrompt.includes('friends')) count = 3;

      const templates = STORY_TEMPLATES[selectedTheme];
      const randomStory = templates[Math.floor(Math.random() * templates.length)];
      
      setStory(randomStory);
      setTheme(selectedTheme);
      setCharCount(count);
      setLoading(false);
    }, 1500);
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 text-center">
        <Col lg={8} className="mx-auto">
          <h1 className="display-4 fw-bold text-primary">AI Story Studio ✨</h1>
          <p className="lead text-muted">
            Give the AI a prompt, and it will write a story and draw a picture for you!
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={6}>
          <Card className="shadow-sm border-0 p-4 mb-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">What should the story be about?</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="e.g. 3 kids at the zoo, or a silly flying elephant..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </Form.Group>
            <Button 
              variant="primary" 
              size="lg" 
              className="w-100" 
              onClick={generateStory}
              disabled={loading || !prompt}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Generating Magic...
                </>
              ) : 'Generate My Story!'}
            </Button>
          </Card>
        </Col>
      </Row>

      {story && !loading && (
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow border-0 rounded-4 overflow-hidden">
              <Row className="g-0">
                <Col md={4} className="bg-light d-flex align-items-center justify-content-center p-4 border-end">
                   <StickFigure theme={theme} count={charCount} />
                </Col>
                <Col md={8}>
                  <Card.Body className="p-4 p-md-5">
                    <h3 className="fw-bold mb-3 text-capitalize">{theme} Adventure</h3>
                    <p className="fs-5 lh-base italic">
                      "{story}"
                    </p>
                    <hr />
                    <p className="small text-muted mb-0">
                      Prompt: <em>{prompt}</em>
                    </p>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default StoryTime;
