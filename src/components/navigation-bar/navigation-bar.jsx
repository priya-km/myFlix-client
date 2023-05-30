import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {loggedIn && (
              <Nav.Link as={Link} to={`/users/${user?.UserName}`}>
                Profile
              </Nav.Link>
            )}
            {!loggedIn && (
              <>
                <Nav.Link as={Link} to="/signup">
                  Sign up
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Log in
                </Nav.Link>
              </>
            )}
          </Nav>
          {loggedIn && (
            <Button variant="outline-secondary" size="sm" onClick={onLoggedOut}>
              Log out
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};