import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, ListGroup, ProgressBar, Button, Tabs, Tab } from 'react-bootstrap';

const RECENT_PRs = [
  { athlete: "Walker Brown", grade: "12", event: "100m", mark: "10.93s", meet: "Central Division Champs" },
  { athlete: "Ben Glew", grade: "11", event: "1500m", mark: "4:10.55", meet: "Central Division Champs" },
  { athlete: "Lane Aaronian", grade: "10", event: "800m", mark: "2:03.55", meet: "Class C Champs" },
  { athlete: "Walker Brown", grade: "12", event: "200m", mark: "22.86s", meet: "Class C Champs" }
];

const CHAMPIONSHIPS = [
  { sport: "Outdoor Track (Boys)", type: "State Champions", years: ["1927", "1936"] },
  { sport: "Outdoor Track (Boys)", type: "Class C Champions", years: ["2024"] },
  { sport: "Outdoor Track (Girls)", type: "Class C Champions", years: ["2020", "2021", "2022", "2023", "2024"] },
  { sport: "Indoor Track (Boys)", type: "Class B Champions", years: ["1961", "1965", "1966"] },
  { sport: "Cross Country (Girls)", type: "Class C Champions", years: ["2021", "2025"] }
];

const MosesBrownTrack = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "New Hurdle Set", status: "In Progress", progress: 60 },
    { id: 2, name: "XC Trail Maintenance", status: "Planned", progress: 10 },
    { id: 3, name: "Strength Training Program", status: "Completed", progress: 100 }
  ]);

  const [updates, setUpdates] = useState([
    { date: "May 25, 2026", text: "Incredible performance at the Central Division Champs! Multiple PRs recorded." },
    { date: "May 12, 2026", text: "Middle school team qualified for the PVD Invitational. Bright future ahead!" },
    { date: "Apr 20, 2026", text: "Outdoor season officially kicked off. The relay teams are looking fast." }
  ]);

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col md={8}>
          <h1 className="display-4 fw-bold text-primary">Moses Brown Track & XC 🏃‍♂️</h1>
          <p className="lead text-muted">Coaches Corner - Strategy, Stats, and Season Management</p>
        </Col>
        <Col md={4} className="text-md-end">
          <Badge bg="dark" className="fs-5 p-2 px-3">Quakers Athletics</Badge>
        </Col>
      </Row>

      <Tabs defaultActiveKey="stats" id="coach-tabs" className="mb-4 nav-pills custom-pills">
        <Tab eventKey="stats" title="Leaderboard & History">
          <Row className="g-4 mt-1">
            <Col lg={7}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Header className="bg-primary text-white fw-bold">Recent Top Marks (2026 Season)</Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Athlete</th>
                        <th>Event</th>
                        <th>Mark</th>
                        <th>Meet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_PRs.map((pr, i) => (
                        <tr key={i}>
                          <td className="fw-bold">{pr.athlete} <small className="text-muted">({pr.grade})</small></td>
                          <td>{pr.event}</td>
                          <td><Badge bg="success">{pr.mark}</Badge></td>
                          <td className="small">{pr.meet}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="d-flex gap-2 mt-3">
                    <Button variant="outline-primary" size="sm" href="https://ri.milesplit.com/teams/1044-moses-brown-school" target="_blank">MileSplit RI</Button>
                    <Button variant="outline-primary" size="sm" href="https://www.athletic.net/TrackAndField/School.aspx?SchoolID=2341" target="_blank">Athletic.net</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Header className="bg-warning text-dark fw-bold">Championship History 🏆</Card.Header>
                <Card.Body className="p-0">
                  <ListGroup variant="flush">
                    {CHAMPIONSHIPS.map((ch, i) => (
                      <ListGroup.Item key={i} className="py-3">
                        <div className="fw-bold text-primary">{ch.sport}</div>
                        <div className="small text-muted mb-2">{ch.type}</div>
                        <div className="d-flex flex-wrap gap-1">
                          {ch.years.map(y => <Badge key={y} bg="light" text="dark" className="border">{y}</Badge>)}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="projects" title="Coaching Projects">
          <Row className="g-4 mt-1">
            <Col lg={6}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-dark text-white fw-bold">Active Initiatives</Card.Header>
                <Card.Body>
                  {projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">{proj.name}</span>
                        <Badge bg={proj.status === 'Completed' ? 'success' : 'warning'}>{proj.status}</Badge>
                      </div>
                      <ProgressBar now={proj.progress} variant={proj.progress === 100 ? 'success' : 'info'} />
                    </div>
                  ))}
                  <Button variant="outline-dark" className="w-100 mt-2">+ Add New Project</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-info text-white fw-bold">Team Announcements</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {updates.map((update, i) => (
                      <ListGroup.Item key={i} className="py-3 px-0 border-bottom">
                        <div className="d-flex align-items-center mb-1">
                          <Badge bg="light" text="dark" className="me-2">{update.date}</Badge>
                          <span className="fw-bold">Update #{updates.length - i}</span>
                        </div>
                        <p className="mb-0 text-secondary small">{update.text}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      <Row className="mt-5 text-center">
        <Col>
          <div className="p-4 bg-light rounded-4 border">
            <h5>Go Quakers! 🟦⬜</h5>
            <p className="text-muted mb-0">Moses Brown School Athletics - Providence, RI</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MosesBrownTrack;
