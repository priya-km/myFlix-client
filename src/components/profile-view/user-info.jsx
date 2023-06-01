import React, { useState, useEffect } from "react";
import { FavoriteMovies } from "./favorite-movies";
import { Card, Form, Button } from 'react-bootstrap';

export const UserInfo = ({ email, name, birthday, onUserChange }) => {
  const [user, setUser] = useState({ email, name, birthday });
  
  useEffect(() => {
    fetch("/users")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error, please try again.");
    })
    .then(data => {
      const loggedInUser = data.find(u => u.Username === "your-Username");
      setUser(loggedInUser);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);
  
  const getUser = () => {
    fetch(`/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        birthday: user.birthday
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("There was an error updating your information.");
    })
    .then(data => {
      setUser(data);
      onUserChange(data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  // fix 
  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    getUser();
  }
}