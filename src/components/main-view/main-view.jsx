import React, { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);  
  // const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
      if (!token) return;
     // setLoading(true);
    fetch("https://myflixapp.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImagePath,
          description: movie.Description,
          genre: movie.Genre,
          director: movie.Director,
        })); // New names because previous syntax would not work
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log(error);
      }); // to catch any errors when getting movie info
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear(); 
    };
    
    // Add to favorites button

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
      fetch(`https://myflixapp.onrender.com/users/${user.Username}/movies/${movieId}`, {
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
    fetch(`https://myflixapp.onrender.com/users/${user.Username}/movies/${movieId}`, {
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

  
  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout}/>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <>
                  <Col md={5} className="mb-1.5">
                    <LoginView
                      className="form"
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                  <Col md={1} className="mb-.25" style={{ margin: '50px 0' }}>
                    or
                  </Col>
                  <Col md={4} className="mb-1.5">
                    <SignupView className="form" />
                  </Col>
                </>
              ) : movies.length === 0 ? (
                <>
                  <div>No results.</div>
                </>
              ) : (
                <>
                  <Col xs={12} className="mb-1.5">
                  </Col>
                  {movies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-5">
                      <MovieCard movie={movie} 
                       fav={user.FavoriteMovies.includes(movie.id)}
                      onAddToFavorites={(movieId) => handleAddToFavorites(movieId)} 
                      onRemoveFromFavorites={(movieId) => handleRemoveFromFavorites(movieId)} 
                      />
                    </Col>
                  ))}
                </>
              )
            }
                  />
                  
        {/* // Route to individual movie view  */}
          <Route
            path="/movies/:movieId" 
                      element={<MovieView movies={movies}
                      />}
                  />
                  
        {/* Route to user profile view */}
          <Route 
            path="/users/:Username"
            element={<ProfileView user={user} movies={movies}/>}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};