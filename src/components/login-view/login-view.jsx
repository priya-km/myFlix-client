import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    
    const data = {
      Username: username,
      Password: password
    };
    
    fetch("https://myflix-pkm.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Login response:", data);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      onLoggedIn(data.user, data.token);
    } else {
      alert("No such user");
    }
    setLoading(false);
  })
  .catch((e) => {
    alert("Something went wrong");
    setLoading(false);
  });
};

return (
  <Container>
  <div className="background">
  <div className="login-container">
  <Row>
  <Col xs={12} lg={10}>
  <CardGroup>
  <Card className="login-card" style={{ margin: '20px 0' }}>
  <Card.Body>
  <Card.Title className="login-text">Log In</Card.Title>
  <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formUserLogin">
  <Form.Label>Username:</Form.Label>
  <Form.Control
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  required
  minLength="3"
  />
  </Form.Group>
  
  <Form.Group controlId="formPassword">
  <Form.Label>Password:</Form.Label>
  <Form.Control
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  />
  </Form.Group>
  <Button
  className="logout-button login-submit"
  variant="primary"
  style={{ color: 'white' }}
  type="submit"
  disabled={loading}
  >
  {loading ? "Loading..." : "Submit"}
  </Button>
  <div style={{ marginTop: '10px' }}>
  New user?{" "}
  <Link to="/signup" className="signup-link">
  Click here to sign up
  </Link>
  </div>
  </Form>
  </Card.Body>
  </Card>
  </CardGroup>
  </Col>
  </Row>
  </div>
  </div>
  </Container>
  );
};
