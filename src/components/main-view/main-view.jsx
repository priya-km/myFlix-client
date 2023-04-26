import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; 
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!token) {
      return;
    }
    // set loading before sending API request
    setLoading(true);
    fetch("https://myflixapp.onrender.com/movies", {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => {
        // stops loading after response received
        setLoading(false);
        console.log('data', data);
        const moviesFromApi = data.map((movie) => {
          return {
          // value names match to API database
          id: movie._id,
          title: movie.Title,
          image: movie.ImagePath,
          description: movie.Description,
          genre: movie.Genre.Name,
          director: movie.Director.Name
          }
        });
        setMovies(moviesFromApi);
      })
  }, [token])

   // User must log in or sign up 
  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token)}} /> 
          
          <SignupView />
          </Col>
        </>
        // Movie view when a movie is clicked on
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black" }}>
        <MovieView 
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)} 
        />
        <Button variant="secondary" size="sm" onClick={() => {setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
        </Col>
        // displays text message if list of movies is empty
      ) : movies.length === 0 ? (
        <p>No movies found.</p>
        
      ) : loading ? (
            <p>Loading...</p>
          ) : !movies || !movies.length ? (
            <p>No movies found...</p>
          ) : (
            <>
          {movies.map((movie) => (
           <Col className="mb-5" key={movie.id} md={3}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
          ))}
          <Button md="1" variant="secondary" size="sm" onClick={() => {setUser(null);}}>Logout</Button>
        </>
      )}
    </Row>
    );
  };