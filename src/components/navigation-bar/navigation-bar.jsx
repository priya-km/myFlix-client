import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut, searchTerm, onSearchTermChange }) => {
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
          <div className="link-color mf-logo">
            myFlix
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <div className="link-color">
                Home
              </div>
            </Nav.Link>
            {loggedIn && (
              <Nav.Link as={Link} to={`/users/${user.Username}`}>
                <div className="link-color">
                  Profile
                </div>
              </Nav.Link>
            )}
            {!loggedIn && (
              <>
                <Nav.Link as={Link} to="/signup">
                  <div className="link-color">
                    Sign up
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                  <div className="link-color">
                    Log In
                  </div>
                </Nav.Link>
              </>
            )}
          </Nav>
          {loggedIn && (
            <div className="d-flex align-items-center">
              
              <Form inline>
                <div className="search-bar">
                <FormControl
                  type="text"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => onSearchTermChange(e.target.value)}
                  />
                  </div>
              </Form>
              <div className="link-color ml-3">
                <Button variant="outline-secondary" className="submit-button" size="sm" onClick={onLoggedOut}>
                  Log out
                </Button>
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
