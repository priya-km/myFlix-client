import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './update-user.scss';

export default function UpdateUser({ user, handleSubmit, handleDelete }) {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [loading, setLoading] = useState(false);
  
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  
  const handleDeleteAccount = () => {
    handleDelete();
  };
  
  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e, updatedUser)}>
    <h3>Update Your Account Information</h3>
    <Form.Group controlId="formUsername">
    <Form.Label>Username:</Form.Label>
    <Form.Control
    type="text"
    name="Username"
    value={updatedUser.Username}
    onChange={(e) => handleUpdate(e)}
    />
    </Form.Group>
    <Form.Group controlId="formName">
    <Form.Label>Display Name:</Form.Label>
    <Form.Control
    type="text"
    name="name"
    value={updatedUser.name}
    onChange={(e) => handleUpdate(e)}
    />
    </Form.Group>
    <Form.Group controlId="formPassword">
    <Form.Label>Password:</Form.Label>
    <Form.Control
    type="password"
    name="password"
    value={updatedUser.password}
    onChange={(e) => handleUpdate(e)}
    />
    </Form.Group>
    <Form.Group controlId="Emailform">
    <Form.Label>Email address:</Form.Label>
    <Form.Control
    type="email"
    name="email"
    value={updatedUser.email}
    onChange={(e) => handleUpdate(e)}
    />
    </Form.Group>
    <Form.Group controlId="formDateOfBirth">
    <Form.Label>Date of Birth:</Form.Label>
    <Form.Control
    type="date"
    name="birthday"
    value={updatedUser.birthday}
    onChange={(e) => handleUpdate(e)}
    />
    </Form.Group>
    <Button
    className="logout-button submit-button"
    variant="primary"
    style={{ color: "white" }}
    type="submit"
    disabled={loading}
    onClick={() => handleUpdate(updatedUser)}
    >
    {loading ? "Loading..." : "Update"}
    </Button>
    OR 
    <Button
    className="delete-account-button"
    variant="danger"
    onClick={handleDeleteAccount}
    >
    Delete Account
    </Button>
    </form>
    );
  }
  