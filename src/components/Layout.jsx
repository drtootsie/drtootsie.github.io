import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="flex-shrink-0">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Pancoast Adventures</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/hub">
                <Nav.Link>Family Hub 🚀</Nav.Link>
              </LinkContainer>
              
              <NavDropdown title="Projects & Tools 🛠️" id="projects-dropdown">
                <LinkContainer to="/projects/clue">
                  <NavDropdown.Item>Clue Investigator</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/projects/kids-corner">
                  <NavDropdown.Item>Kids Corner 🎈</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/projects/story-time">
                  <NavDropdown.Item>AI Story Studio ✨</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/projects/quakers-track">
                  <NavDropdown.Item>Quakers Track 🏃‍♂️</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/projects/convert">
                  <NavDropdown.Item>Playlist Converter 🎵</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/projects/mocktail-recipes">
                  <NavDropdown.Item>Mocktail Recipes</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/projects">
                  <NavDropdown.Item>GitHub Work</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="flex-grow-1">
        <Container className="mt-4">
          <Outlet />
        </Container>
      </main>
      <footer className="footer mt-auto py-3 bg-dark text-white">
        <Container className="text-center">
          <span>&copy; {new Date().getFullYear()} Pepper Pancoast</span>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
