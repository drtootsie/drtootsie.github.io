import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, Alert, Spinner } from 'react-bootstrap';

const PlaylistConverter = () => {
  const [input, setInput] = useState('');
  const [songs, setSongs] = useState([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  // Simple parser for Apple Music "Copy" or Export text
  const parsePlaylist = () => {
    setIsParsing(true);
    setTimeout(() => {
      const lines = input.split('\n');
      const parsedSongs = lines
        .map(line => {
          // Attempt to split by common delimiters in Apple Music copy/paste
          // Usually: Title \t Artist \t Album ...
          const parts = line.split('\t');
          if (parts.length >= 2) {
            return { title: parts[0], artist: parts[1], status: 'pending' };
          }
          // Fallback for simple "Title - Artist" format
          const dashParts = line.split(' - ');
          if (dashParts.length >= 2) {
            return { title: dashParts[0], artist: dashParts[1], status: 'pending' };
          }
          return null;
        })
        .filter(song => song !== null);

      setSongs(parsedSongs);
      setIsParsing(false);
    }, 1000);
  };

  const convertToYouTube = () => {
    setIsConverting(true);
    // In a real app, this would use the YouTube Data API.
    // For this static site, we provide direct search links to make it easy for the user.
    setTimeout(() => {
      const updatedSongs = songs.map(song => ({
        ...song,
        url: `https://music.youtube.com/search?q=${encodeURIComponent(song.title + ' ' + song.artist)}`,
        status: 'ready'
      }));
      setSongs(updatedSongs);
      setIsConverting(false);
    }, 1500);
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 text-center">
        <Col lg={8} className="mx-auto">
          <h1 className="display-4 fw-bold text-primary">Playlist Converter 🎵</h1>
          <p className="lead text-muted">
            Move your music from Apple Music to YouTube Music with ease.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <Alert variant="info">
                <Alert.Heading className="h5">How to use:</Alert.Heading>
                <ol className="mb-0">
                  <li>In Apple Music, select your songs and press <strong>Cmd+C</strong> (Mac) or <strong>Ctrl+C</strong> (Windows).</li>
                  <li>Paste the list into the box below.</li>
                  <li>Click <strong>Parse Playlist</strong> to identify the songs.</li>
                  <li>Click <strong>Generate YouTube Links</strong> to find them on YouTube Music.</li>
                </ol>
              </Alert>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Paste Apple Music Songs Here:</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={6} 
                  placeholder="Example:&#10;Song Title	Artist Name	Album&#10;Another Song	Another Artist	Album"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button 
                  variant="primary" 
                  onClick={parsePlaylist} 
                  disabled={isParsing || !input}
                >
                  {isParsing ? <Spinner animation="border" size="sm" /> : '1. Parse Playlist'}
                </Button>
                <Button 
                  variant="success" 
                  onClick={convertToYouTube} 
                  disabled={songs.length === 0 || isConverting}
                >
                  {isConverting ? <Spinner animation="border" size="sm" /> : '2. Generate YouTube Links'}
                </Button>
                <Button variant="outline-secondary" onClick={() => {setSongs([]); setInput('');}}>Clear</Button>
              </div>
            </Card.Body>
          </Card>

          {songs.length > 0 && (
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-light fw-bold">
                Parsed Songs ({songs.length})
              </Card.Header>
              <ListGroup variant="flush">
                {songs.map((song, i) => (
                  <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center py-3">
                    <div>
                      <div className="fw-bold">{song.title}</div>
                      <small className="text-muted">{song.artist}</small>
                    </div>
                    {song.url ? (
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        href={song.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Find on YT Music ↗
                      </Button>
                    ) : (
                      <Badge bg="secondary">Pending</Badge>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistConverter;
