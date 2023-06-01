import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import UpdateUser from "./update-user";
import { navigate } from "react-router-dom";
import './profile-view.scss';

export const ProfileView = ({ movies, onAddFavorite, onRemoveFavorite, token }) => {
  const [user, setUser] = useState({ movies });
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetch("/users")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("There was an error retrieving your information");
    })
    .then((data) => {
      const loggedInUser = data.find((u) => u.Username === "your-Username");
      setUser(loggedInUser);
    })
    .catch((error) => {
      console.log(error)
    });
    
    fetch("/movies")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("There was an error.");
    })
    .then((data) => {
      setMovies(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);
  
  const handleDelete = () => {
    const confirmDeletion = window.confirm('Are you sure you want to delete your account?');
    
    if (!confirmDeletion) {
      return;
    }
    
    fetch(`https://myflix-pkm.herokuapp.com/users/${user.Username}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then((res) => res.text())
  .then((data) => {
    alert(data);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to the login page
    onLoggedOut();
  })
  .catch((e) => console.log(e));
};

const handleUserInfoChange = (updatedUser) => {
  setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
};

const handleSubmit = (e, updatedUser) => {
  e.preventDefault();
  setLoading(true);
  alert('Your information has been updated.');
  
  // Make an API request to update the user information
  fetch(`https://myflix-pkm.herokuapp.com/users/${user.Username}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(updatedUser),
})
.then((response) => {
  if (!response.ok) {
    throw new Error('Failed to update user information');
  }
  return response.json();
})
.then((data) => {
  // Handle successful update
  console.log('User information updated successfully:', data);
  setLoading(false);
  // Perform any necessary actions, such as updating the user state or showing a success message
})
.catch((error) => {
  // Handle error scenario
  console.error('Error updating user information:', error);
  setLoading(false);
  // Perform any necessary actions, such as showing an error message
});
};

const handleAddToFavorites = (movieId) => {
  console.log('movieId:', movieId);
  console.log('movies:', movies);
  
  const movieToAdd = movies.find((movie) => movie.id === movieId);
  console.log('movieToAdd:', movieToAdd);
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (favorites && favorites.some((movie) => movie.id === movieId)) {
    console.log(`The movie ${movieId} is already in your favorites.`);
  } else if (movieToAdd) {
    setFavorites([...favorites, movieToAdd]);
    fetch(`https://myflix-pkm.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    let newUserData = JSON.stringify(data);
    localStorage.setItem('user', newUserData);
    alert('Movie successfully added to your favorites list.');
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('There was an error adding the movie to your favorites list.');
  });
} else {
  alert('This movie is already in your favorites list.');
}
};


const handleRemoveFromFavorites = (movieId) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const { FavoriteMovies } = userData;
  const favorites = [...FavoriteMovies]
  const newFavorites = favorites.filter((id) => id !== movieId);
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (favorites && favorites.some((id) => id === movieId)) {
    setFavorites(newFavorites);
    // Show loading spinner
    setLoading(true);
    fetch(`https://myflix-pkm.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('There was an error removing this movie from your favorites');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Favorite movie removed', data);
    let newUserData = JSON.stringify(data);
    localStorage.setItem('user', newUserData);
    // Hide the loading spinner
    setLoading(false);
    alert('Movie successfully removed from your favorites list.');
  })
  .catch((error) => {
    console.error('Error:', error);
    // Hides the loading spinner
    setLoading(false);
    alert('There was an error removing the movie from your favorites list.');
  });
} else {
  alert('This movie is not in your favorites list...yet');
}
};

return (
  <>
  <Container>
  <div className="d-flex justify-content-center profile-font text-center mb-5">
  <h1>Your Profile</h1>
  </div>
  </Container>
  <Container>
  <div className="content profile-font mb-5">
  <Row>
  <Col>
  <Row>
  <Col md={6}>
  <div className="update-user-info">
  {user && (
    <UserInfo
    email={user.email}
    name={user.name}
    birthday={user.birthday}
    onUserChange={handleUserInfoChange}
    />
    )}
    <UpdateUser user={user} handleSubmit={handleSubmit} handleDelete={handleDelete} />
    </div>
    </Col>
    <Col md={6}>
    <div className="favorite-card favorite-movies">
    <FavoriteMovies
    movies={movies}
    favorites={favorites}
    onAddFavorite={handleAddToFavorites}
    onRemoveFavorite={handleRemoveFromFavorites}
    />
    </div>
    </Col>
    </Row>
    </Col>
    </Row>
    </div>
    </Container>
    </>
    );
    
  }
  