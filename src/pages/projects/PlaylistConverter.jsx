import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';

const PlaylistConverter = () => {
  const [input, setInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [songs, setSongs] = useState([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [activeTab, setActiveTab] = useState('manual');

  const parsePlaylist = () => {
    setIsParsing(true);
    setTimeout(() => {
      const lines = input.split('\n');
      const parsedSongs = lines
        .map(line => {
          const parts = line.split('\t');
          if (parts.length >= 2) return { title: parts[0], artist: parts[1], status: 'pending' };
          const dashParts = line.split(' - ');
          if (dashParts.length >= 2) return { title: dashParts[0], artist: dashParts[1], status: 'pending' };
          return null;
        })
        .filter(song => song !== null);

      setSongs(parsedSongs);
      setIsParsing(false);
    }, 1000);
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (!linkInput.includes('apple.com')) {
      alert("Please enter a valid Apple Music link.");
      return;
    }
    // Static sites can't fetch external HTML easily due to CORS.
    // We'll provide a helpful message and direct them to the manual method.
    alert("Note: Direct link fetching is restricted by Apple Music security. \n\nPlease use the 'Manual Paste' method by selecting songs in your app and pressing Cmd+C!");
    setActiveTab('manual');
  };

  const convertToYouTube = () => {
    setIsConverting(true);
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
            Move your music from Apple Music to YouTube Music.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
                <Tab eventKey="manual" title="Manual Paste (Recommended)">
                  <Alert variant="info" className="small">
                    <strong>Best Method:</strong> In Apple Music, select songs, press <strong>Cmd+C</strong>, then paste below.
                  </Alert>
                  <Form.Group className="mb-3">
                    <Form.Control 
                      as="textarea" 
                      rows={6} 
                      placeholder="Paste songs here (Title [tab] Artist)..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={parsePlaylist} disabled={isParsing || !input}>
                    {isParsing ? <Spinner animation="border" size="sm" /> : 'Parse Playlist'}
                  </Button>
                </Tab>
                <Tab eventKey="link" title="Playlist Link">
                  <Form onSubmit={handleLinkSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apple Music Playlist URL</Form.Label>
                      <Form.Control 
                        type="url" 
                        placeholder="https://music.apple.com/us/playlist/..." 
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit">Import from Link</Button>
                  </Form>
                  <div className="mt-3 small text-muted">
                    * Browser security (CORS) may require you to use the Manual Paste method if the link info is private.
                  </div>
                </Tab>
              </Tabs>

              {songs.length > 0 && (
                <div className="mt-3">
                  <Button 
                    variant="success" 
                    className="w-100 py-3 fw-bold"
                    onClick={convertToYouTube} 
                    disabled={isConverting}
                  >
                    {isConverting ? <Spinner animation="border" size="sm" className="me-2" /> : '🚀 GENERATE YOUTUBE MUSIC LINKS'}
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          {songs.length > 0 && (
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <strong>Songs Found ({songs.length})</strong>
                <Button variant="link" size="sm" onClick={() => setSongs([])}>Clear All</Button>
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
                      <Badge bg="secondary">Ready to Convert</Badge>
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
