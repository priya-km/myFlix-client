import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
    fetch("https://myflixapp.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          const obj = {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name
          }
          return obj;
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  if (movies.length === 0) {
    return <div>There are no movies to display.</div>;
  }

  return (
    <div>
    {movies.map((movie) => (
    <MovieCard
    key={movies.id}
    movie={movie}
    onMovieClick={(newSelectedMovie) => {
      setSelectedMovie(newSelectedMovie);
    }}
  />
    ))}
    
  </div>
  );
};