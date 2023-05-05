import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Card, CardGroup } from 'react-bootstrap';

export const SignupView = () => {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

     if (Username.length < 3) {
        alert("Username must be at least 3 characters long");
        return;
      }
  
      if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }
  
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email address");
        return;
      }

    const data = {
      Username: Username,
      Password: password,
      email: email,
      Birthday: birthday
    };

    fetch("https://myflixapp.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Row>
      <Col xs={12} lg={10}>
        <CardGroup>
          <Card style={{ margin: '20px 0' }}>
            <Card.Body>
              <Card.Title>Sign Up</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                  />
                </Form.Group>

                <Form.Group controlId="formSignupPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
                 <Button className="logout-button" variant="primary" style={{ color: 'white' }} type="submit" disabled={loading}>
                 {loading ? "Loading..." : "Submit"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
};