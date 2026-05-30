import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Badge } from 'react-bootstrap';
import StickFigure from '../components/StoryStudio/StickFigure';

const MORALS = {
  friendship: "They learned that even the biggest challenges are easy when you have friends by your side.",
  perseverance: "They learned that the most important thing is to never give up, no matter how hard it seems.",
  intelligence: "They learned that thinking carefully and using their brain was the best tool they had.",
  family: "They learned that the love of their family is the greatest treasure of all."
};

const THEMES = {
  space: {
    intro: "The stars above Lee's Summit were extra bright tonight as the countdown began. T-minus ten seconds! The ground shook as the brave explorers prepared for the mission of a lifetime.",
    rising: "Deep in the asteroid belt, the ship's engines began to sputter. A giant space-whale made of stardust blocked their path, singing a song that confused the navigation computers.",
    climax: "Just when it seemed they might be lost forever, they remembered a secret frequency. Using their special equipment, they beamed a message of peace and friendship toward the galactic giant.",
    falling: "The space-whale smiled (as much as a whale made of stars can smile) and guided their ship to a hidden moon where the air smelled like cinnamon and the ground was soft like moss.",
    outro: "They returned home as heroes, with jars of moon-dust and memories that would last a lifetime. As they looked at the moon from their backyard, they knew their next adventure was just a dream away."
  },
  zoo: {
    intro: "It was a sunny Saturday morning, and the gates of the Grand Zoo were finally open. The air was filled with the sounds of trumpeting elephants and the smell of fresh popcorn.",
    rising: "Suddenly, a tiny penguin waddled past the group, wearing a very formal tuxedo. It seemed to be in a great hurry, pointing its wing toward the Great Jungle Habitat.",
    climax: "In the heart of the jungle, they found the problem: the lion had lost its favorite golden ball! It was stuck high in a baobab tree where only the bravest could reach it.",
    falling: "By working together and standing on each other's shoulders, they managed to retrieve the ball. The lion gave a happy roar that made the whole zoo cheer with joy.",
    outro: "As the sun set, they sat on a bench and shared a giant soft pretzel. They realized that helping others is the best part of any trip to the zoo."
  },
  knight: {
    intro: "In a time of castles and cobblestones, the village bell rang out across the valley. A mysterious riddle had appeared on the stone walls, and no one knew how to solve it.",
    rising: "The path to the answer led through the Misty Marsh, where the trees whispered secrets and the frogs wore tiny crown-shaped hats. The mud was deep, but their spirits were high.",
    climax: "At the edge of the marsh stood a giant dragon who loved to play chess. The dragon wouldn't let anyone pass unless they could win a match using only their wits.",
    falling: "The move was clever and unexpected—a perfect display of intelligence! The dragon was so impressed that it gave them a ride on its back, flying high over the kingdom.",
    outro: "They arrived back at the castle just in time for a grand feast. The villagers cheered for their bravery and their brains, proving that heroes come in many forms."
  },
  silly: {
    intro: "Everything was perfectly normal until the toaster started telling jokes. Suddenly, the kitchen table sprouted legs and started doing the cha-cha across the floor!",
    rising: "The adventure moved outside where the clouds were made of cotton candy and the rain was actually falling upwards. It was a very confusing day to be wearing a hat.",
    climax: "A giant rubber duck landed in the middle of the street, demanding to be led to the nearest bubble bath. The only way to stop it was to perform a synchronized dance routine.",
    falling: "With a wiggle and a hop, the dance was a success! The duck turned into a thousand tiny bubbles that smelled like blueberries and floated gently into the sky.",
    outro: "By the time dinner was ready, everything had returned to normal—mostly. Though if you look closely, the toaster still winks at you whenever you make toast."
  },
  bedtime: {
    intro: "The world was settling into a soft, quiet hush. The shadows grew long and the fireflies began their nightly dance, blinking like tiny lanterns in the garden.",
    rising: "A gentle breeze carried the scent of lavender and old books through the window. It felt as though the whole house was wrapping itself in a big, warm hug.",
    climax: "High in the sky, the Sandman was busy sprinkling silver dust over the rooftops. Every grain of dust held a seed for a wonderful, happy dream about flying or talking animals.",
    falling: "One by one, the lights in the neighborhood went out. The crickets began their lullaby, a steady rhythm that matched the beating of a calm and happy heart.",
    outro: "The pillows were soft, the blankets were warm, and the stars kept watch from above. It was time for the best adventure of all—the one that happens while you sleep."
  },
  default: {
    intro: "The backyard was full of secrets today. Under the old oak tree, a small wooden door had appeared where there was only grass the day before.",
    rising: "Stepping through the door, they found themselves in a forest where the leaves were made of velvet and the brooks flowed with sparkling lemonade.",
    climax: "A group of tiny forest sprites needed help finding their lost lantern. Without it, the forest would lose its glow, and the flowers would forget how to bloom.",
    falling: "Searching through the hollow logs and under the glowing mushrooms, they finally found the lantern hidden in a bird's nest. The forest erupted in a beautiful light.",
    outro: "Walking back through the wooden door, they found themselves home just in time for lunch. The world looked the same, but they knew magic was everywhere if you looked for it."
  }
};

const StoryTime = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState(null);
  const [theme, setTheme] = useState('default');
  const [moral, setMoral] = useState('');
  const [charCount, setCharCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const generateStory = () => {
    if (!prompt) return;
    setLoading(true);
    
    setTimeout(() => {
      let selectedTheme = 'default';
      const lowerPrompt = prompt.toLowerCase();
      
      // Theme Detection
      if (lowerPrompt.includes('space') || lowerPrompt.includes('alien') || lowerPrompt.includes('rocket')) selectedTheme = 'space';
      else if (lowerPrompt.includes('knight') || lowerPrompt.includes('dragon') || lowerPrompt.includes('castle')) selectedTheme = 'knight';
      else if (lowerPrompt.includes('wizard') || lowerPrompt.includes('magic') || lowerPrompt.includes('wand')) selectedTheme = 'wizard';
      else if (lowerPrompt.includes('robot') || lowerPrompt.includes('computer')) selectedTheme = 'robot';
      else if (lowerPrompt.includes('bedtime') || lowerPrompt.includes('sleep') || lowerPrompt.includes('night') || lowerPrompt.includes('dream')) selectedTheme = 'bedtime';
      else if (lowerPrompt.includes('zoo') || lowerPrompt.includes('animal') || lowerPrompt.includes('lion')) selectedTheme = 'zoo';
      else if (lowerPrompt.includes('silly') || lowerPrompt.includes('funny') || lowerPrompt.includes('laugh')) selectedTheme = 'silly';

      // Moral/Lesson Detection
      let selectedMoral = MORALS.friendship;
      if (lowerPrompt.includes('work hard') || lowerPrompt.includes('persevere') || lowerPrompt.includes('never give up')) selectedMoral = MORALS.perseverance;
      else if (lowerPrompt.includes('smart') || lowerPrompt.includes('brain') || lowerPrompt.includes('think') || lowerPrompt.includes('intelligence')) selectedMoral = MORALS.intelligence;
      else if (lowerPrompt.includes('family') || lowerPrompt.includes('mom') || lowerPrompt.includes('dad') || lowerPrompt.includes('home')) selectedMoral = MORALS.family;

      // Character Count Detection
      let count = 1;
      if (lowerPrompt.includes('two') || lowerPrompt.includes(' 2 ') || lowerPrompt.includes('couple')) count = 2;
      if (lowerPrompt.includes('three') || lowerPrompt.includes(' 3 ') || lowerPrompt.includes('kids') || lowerPrompt.includes('friends') || lowerPrompt.includes('family')) count = 3;

      const baseTheme = selectedTheme === 'robot' ? 'space' : selectedTheme; // Robots share space templates for now
      const content = THEMES[baseTheme] || THEMES.default;
      
      const fullStory = [
        content.intro,
        `As they moved forward, they thought about their prompt: "${prompt}". It reminded them that they were on a special mission.`,
        content.rising,
        content.climax,
        "It wasn't just about the magic or the adventure, though. It was about what they learned along the way.",
        content.falling,
        selectedMoral,
        content.outro
      ];
      
      setStory(fullStory);
      setTheme(selectedTheme);
      setMoral(selectedMoral);
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
            Create an epic adventure with your friends and learn something new!
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={6}>
          <Card className="shadow-sm border-0 p-4 mb-5">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">What is your epic adventure about?</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="e.g. 3 friends go to the zoo and learn about family..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Form.Text className="text-muted">
                Try mentioning: <strong>friendship</strong>, <strong>family</strong>, <strong>perseverance</strong>, or <strong>intelligence</strong>!
              </Form.Text>
            </Form.Group>
            <Button 
              variant="primary" 
              size="lg" 
              className="w-100 py-3 shadow-sm" 
              onClick={generateStory}
              disabled={loading || !prompt}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Weaving the Tale...
                </>
              ) : 'Write My Epic Story!'}
            </Button>
          </Card>
        </Col>
      </Row>

      {story && !loading && (
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden mb-5">
              <Row className="g-0">
                <Col lg={4} className="bg-light d-flex flex-column align-items-center justify-content-center p-4 border-end">
                   <div className="text-center mb-4">
                     <StickFigure theme={theme} count={charCount} />
                     <div className="mt-3">
                       <Badge bg="primary" className="me-1">{theme}</Badge>
                       <Badge bg="secondary">{charCount} {charCount === 1 ? 'Hero' : 'Heroes'}</Badge>
                     </div>
                   </div>
                   <div className="p-3 bg-white rounded shadow-sm w-100 text-center">
                     <small className="d-block text-uppercase fw-bold text-muted mb-1">Today's Lesson</small>
                     <p className="small mb-0">{moral}</p>
                   </div>
                </Col>
                <Col lg={8}>
                  <Card.Body className="p-4 p-md-5">
                    <h2 className="fw-bold mb-4 text-capitalize border-bottom pb-2">A Tale of {theme}</h2>
                    <div className="story-content">
                      {story.map((para, i) => (
                        <p key={i} className={`fs-5 mb-4 ${i === 6 ? 'fw-bold text-primary border-start ps-3' : ''}`}>
                          {para}
                        </p>
                      ))}
                    </div>
                    <hr className="my-5" />
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted italic">
                        Inspired by: "{prompt}"
                      </small>
                      <Button variant="outline-primary" size="sm" onClick={() => window.print()}>
                        Print My Story 🖨️
                      </Button>
                    </div>
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
