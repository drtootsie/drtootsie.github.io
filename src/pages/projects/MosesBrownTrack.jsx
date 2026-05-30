import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, ListGroup, Button, Tabs, Tab, Form } from 'react-bootstrap';
import trackData from '../../data/track_stats.json';

const MosesBrownTrack = () => {
  const [selectedMeet, setSelectedMeet] = useState(Object.keys(trackData.full_meet_archive)[0]);

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col md={8}>
          <h1 className="display-4 fw-bold text-primary">Quakers Performance Hub 🏃‍♂️</h1>
          <p className="lead text-muted">Moses Brown Track & XC - Season Stats & Meet Archive</p>
        </Col>
        <Col md={4} className="text-md-end">
          <Badge bg="dark" className="fs-5 p-2 px-3 shadow-sm">MB Athletics</Badge>
        </Col>
      </Row>

      <Tabs defaultActiveKey="athletes" id="coach-tabs" className="mb-4 nav-pills custom-pills">
        {/* Top PRs Tab */}
        <Tab eventKey="athletes" title="Top Marks">
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <span className="fw-bold">2026 Season Leaders</span>
              <Badge bg="light" text="dark">Updated: May 30</Badge>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4">Athlete</th>
                    <th>Event</th>
                    <th>Mark</th>
                    <th>Rank</th>
                    <th>Meet</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {trackData.recent_performances.map((res, i) => (
                    <tr key={i} className="align-middle">
                      <td className="ps-4 fw-bold">
                        {res.athlete} <Badge bg="secondary" className="ms-1 small">{res.grade}</Badge>
                      </td>
                      <td>{res.event}</td>
                      <td><Badge bg="success" className="fs-6">{res.mark}</Badge></td>
                      <td className="fw-bold text-primary">{res.rank}</td>
                      <td className="small">{res.meet}</td>
                      <td className="small text-muted">{res.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* Meet Archive Tab */}
        <Tab eventKey="archive" title="Meet Archive">
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-dark text-white p-3">
              <Row className="align-items-center">
                <Col md={6}><span className="fw-bold">Full Team Results</span></Col>
                <Col md={6}>
                  <Form.Select 
                    size="sm" 
                    value={selectedMeet} 
                    onChange={(e) => setSelectedMeet(e.target.value)}
                  >
                    {Object.keys(trackData.full_meet_archive).map(meet => (
                      <option key={meet} value={meet}>{meet}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4">Athlete</th>
                    <th>Event</th>
                    <th>Mark</th>
                    <th>Place</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {trackData.full_meet_archive[selectedMeet] && trackData.full_meet_archive[selectedMeet].map((res, i) => (
                    <tr key={i}>
                      <td className="ps-4 fw-bold">{res.athlete}</td>
                      <td>{res.event}</td>
                      <td>{res.mark}</td>
                      <td><Badge bg={parseInt(res.place) === 1 ? 'warning' : 'secondary'} text={parseInt(res.place) === 1 ? 'dark' : 'white'}>{res.place}</Badge></td>
                      <td className="fw-bold text-success">+{res.points}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* Meet Schedule Tab */}
        <Tab eventKey="schedule" title="Season Schedule">
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white fw-bold">2026 Outdoor Calendar</Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {trackData.meet_schedule.map((m, i) => (
                  <ListGroup.Item key={i} className="py-3 px-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="text-center me-4" style={{ minWidth: '60px' }}>
                        <div className="h5 mb-0 fw-bold">{m.date.split(' ')[1]}</div>
                        <div className="small text-uppercase text-muted">{m.date.split(' ')[0]}</div>
                      </div>
                      <div>
                        <div className="fw-bold">{m.meet}</div>
                        <small className="text-muted"><i className="bi bi-geo-alt"></i> {m.location}</small>
                      </div>
                    </div>
                    <Badge bg={m.status === 'Completed' ? 'secondary' : (m.status === 'Upcoming' ? 'success' : 'light')} text={m.status === 'Pending' ? 'dark' : 'white'}>
                      {m.status}
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Tab>

        {/* History Tab */}
        <Tab eventKey="history" title="Legacy & History">
          <Row className="g-4 mt-1">
            {trackData.championships.map((ch, i) => (
              <Col md={6} lg={4} key={i}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body>
                    <h6 className="fw-bold text-primary">{ch.sport}</h6>
                    <p className="small text-muted mb-3">{ch.type}</p>
                    <div className="d-flex flex-wrap gap-1">
                      {ch.years.map(y => <Badge key={y} bg="warning" text="dark" className="border-0 shadow-sm">{y}</Badge>)}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>

      <Row className="mt-5 text-center">
        <Col>
          <div className="p-4 bg-primary text-white rounded-4 shadow">
            <h3>Go Quakers! 🟦⬜</h3>
            <p className="mb-0 opacity-75">Moses Brown Athletics - Excellence in Providence</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MosesBrownTrack;
