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
          <Button 
            variant="outline-primary" 
            size="sm" 
            className="me-2"
            href="https://ri.milesplit.com/teams/14717-moses-brown-school" 
            target="_blank"
          >
            📊 MileSplit
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="me-2"
            href="https://github.com/drtootsie/drtootsie.github.io/actions/workflows/sync_stats.yml" 
            target="_blank"
          >
            🔄 Sync Dashboard
          </Button>
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

        {/* Team Roster Tab */}
        <Tab eventKey="roster" title="2026 Roster">
          <Row>
            <Col lg={8}>
              <Card className="shadow-sm border-0 mb-4">
                <Card.Header className="bg-primary text-white fw-bold">Varsity Athletes</Card.Header>
                <Card.Body className="p-0">
                  <Table responsive hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="ps-4">Athlete</th>
                        <th>Year</th>
                        <th>Events</th>
                        <th>Hometown</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-secondary"><td colSpan="4" className="ps-4 fw-bold small text-uppercase">Girls Squad</td></tr>
                      {trackData.roster.girls.map((a, i) => (
                        <tr key={`g-${i}`}>
                          <td className="ps-4 fw-bold">{a.name}</td>
                          <td>{a.year}</td>
                          <td>{a.events}</td>
                          <td>{a.hometown}</td>
                        </tr>
                      ))}
                      <tr className="table-secondary"><td colSpan="4" className="ps-4 fw-bold small text-uppercase">Boys Squad</td></tr>
                      {trackData.roster.boys.map((a, i) => (
                        <tr key={`b-${i}`}>
                          <td className="ps-4 fw-bold">{a.name}</td>
                          <td>{a.year}</td>
                          <td>{a.events}</td>
                          <td>{a.hometown}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-dark text-white fw-bold">Coaching Staff</Card.Header>
                <ListGroup variant="flush">
                  {trackData.coaches.map((c, i) => (
                    <ListGroup.Item key={i} className="py-3">
                      <div className="fw-bold text-primary">{c.name}</div>
                      <div className="small text-muted">{c.role} • {c.specialty}</div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
          </Row>
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

      {/* State Meet Watchlist */}
      <Card className="mt-5 border-0 shadow-sm bg-light">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h4 className="fw-bold text-dark mb-1">State Meet Watchlist 👀</h4>
              <p className="text-muted mb-0">Athletes to watch at Brown Stadium on June 6th.</p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Badge bg="danger" className="p-2 px-3">State Championships - 7 Days Away</Badge>
            </Col>
          </Row>
          <hr />
          <Row className="g-3">
            <Col sm={6} md={3}>
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="fw-bold">Walker Brown</div>
                <div className="small text-primary">100m / 200m</div>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="fw-bold">Skyler Maxwell</div>
                <div className="small text-primary">200m / 400m / 800m</div>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="fw-bold">Silas Hoefferle</div>
                <div className="small text-primary">Hammer Throw</div>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="p-3 bg-white rounded shadow-sm">
                <div className="fw-bold">Owen Richards</div>
                <div className="small text-primary">Pole Vault</div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="mt-5 text-center">
        <Col>
          <div className="p-4 bg-primary text-white rounded-4 shadow">
            <h3>Go Quakers! 🟦⬜</h3>
            <p className="mb-2 opacity-75">Moses Brown Athletics - Excellence in Providence</p>
            <small className="opacity-50">Head Coach: Matty Bennett</small>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MosesBrownTrack;
