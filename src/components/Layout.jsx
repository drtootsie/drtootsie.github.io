import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="flex-shrink-0">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>My Website</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
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
