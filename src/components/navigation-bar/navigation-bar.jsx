import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./navigation-bar.scss";

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
    <Navbar className="custom-navbar custom-navbar fixed-top" expand="lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <div className="link">
            myFlix
            </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <div className="link">
                Home
                </div>
            </Nav.Link>
            {loggedIn && (
              <Nav.Link as={Link} to={`/users/${user?.UserName}`}>
                <div className="link">
                  Profile
                  </div>
              </Nav.Link>
            )}
            {!loggedIn && (
              <>
                <Nav.Link as={Link} to="/signup">
                  <div className="link">
                    Sign up
                    </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  <div className="link">
                    Log in
                    </div>
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
