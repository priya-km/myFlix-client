import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import UpdateUser from "./update-user";

export const ProfileView = ({movies, onAddFavorite, onRemoveFavorite}) => {
  const [user, setUser] = useState({movies});
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
        const loggedInUser = data.find((u) => u.UserName === "your-UserName");
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

   const handleAddToFavorites = (movieId) => {
    console.log('movieId:', movieId);
    console.log('movies:', movies);
  
    const movieToAdd = movies.find((movie) => movie.id === movieId);
    console.log('movieToAdd:', movieToAdd);
    const user =JSON.parse(localStorage.getItem('user'))
  
    
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
  const favorites = [... FavoriteMovies]
  const newFavorites = favorites.filter((id) => id !== movieId);
  const user = JSON.parse(localStorage.getItem('user'));

  // Remove from favorites
  if (favorites && favorites.some((id) => id === movieId)) {
    setFavorites(newFavorites);
    // Show a loading spinner
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
        // Display a custom message
        alert('Movie successfully removed from your favorites list.');
      })
      .catch((error) => {
        console.error('Error:', error);
        // Hide the loading spinner
        setLoading(false);
        // Display a custom error message
        alert('There was an error removing the movie from your favorites list.');
      });
  } else {
    // Display a custom message
    alert('This movie is not in your favorites list...yet');
  }
};

  const updateUser = (updatedUser) => {
    fetch(`/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: updatedUser.email,
        name: updatedUser.name,
        birthday: updatedUser.birthday,
        UserName: updatedUser.UserName,
        password: updatedUser.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an error, please try again.");
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserInfoChange = (updatedUser) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  return (
    <>
      
      <Container>
        <div className="d-flex justify-content-center text-center,mb-5">
        <h1>Your Profile</h1>
        </div>
      </Container>
      <Container>
        <div className="d-flex justify-content-center text-center">
      <Container>
        <Row>
          <Col md={4}>
            <UserInfo
              email={user.email}
              name={user.name}
              birthday={user.birthday}
              onUserChange={handleUserInfoChange}
            />
            <UpdateUser user={user} handleSubmit={updateUser} />
          </Col>
          <Col md={6}>
            <FavoriteMovies
                  movies={movies}
                  favorites={favorites}
              onAddFavorite={handleAddToFavorites}
              onRemoveFavorite={handleRemoveFromFavorites}
            />
          </Col>
        </Row>
          </Container>
        </div>
        </Container>
        </>
  );
};