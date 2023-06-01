import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import './signup-view.scss';


export const SignupView = () => {
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");
	const [loading, setLoading] = useState(false);
	
	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		
		const data = {
			Username: username,
			Name: name,
			Password: password,
			Email: email,
			Birthday: birthday
		};
		
		fetch("https://myflix-pkm.herokuapp.com/users", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	}).then((response) => {
		setLoading(false);
		if (response.ok) {
			alert("Signup successful");
			window.location.reload();
		} else {
			alert("Signup failed");
		}
	})
	.catch((error) => {
		setLoading(false);
		console.error("Signup error", error);
		alert("Something went wrong");
	});
};

return (
	<Container>
		<div className="background">
		<div className="signup-container">
			<Row>
				<Col xs={12} lg={10}>
				<CardGroup>
	<Card className="signup-card" style={{ margin: '20px 0' }}>
	<Card.Body>
	<Card.Title>Sign Up</Card.Title>
	<Form onSubmit={handleSubmit}>
	<Form.Group controlId="formUsername">
	<Form.Label>Username:</Form.Label>
	<Form.Control
	type="text"
	value={username}
	onChange={(e) => setUsername(e.target.value)}
	required
	minLength="5"
	/>
	</Form.Group>
	
	<Form.Group controlId="formPassword">
	<Form.Label>Password:</Form.Label>
	<Form.Control
	type="password"
	value={password}
	onChange={(e) => setPassword(e.target.value)}
	required
	minLength="8"
	/>
	</Form.Group>
	<Form.Group controlId="formName">
	<Form.Label>Name:</Form.Label>
	<Form.Control
	type="text"
	value={name}
	onChange={(e) => setName(e.target.value)}
	minLength="3"
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
	<Button className="signup-submit" variant="primary" style={{ color: 'white' }} type="submit" disabled={loading}>
	{loading ? "Loading..." : "Submit"}
	</Button>
	<div style={{ marginTop: '10px' }}>
	Already have an account?{" "}
	<Link to="/" className="login-link">
	Click here to log in
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