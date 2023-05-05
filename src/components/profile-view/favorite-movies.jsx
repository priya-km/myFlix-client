import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MovieCard } from "../movie-card/movie-card";


export const FavoriteMovies = ({ movies, onAddFavorite, onRemoveFavorite }) => {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const favorites = storedData && storedData.FavoriteMovies ? storedData.FavoriteMovies : [];

  return (
    <div>
      <h2>Favorite Movies</h2>
      <Row xs={1} md={1} lg={2} className="g-4">
        {movies &&
          movies
            .filter((movie) => favorites.includes(movie.id))
            .map((movie) => (
              <Col key={movie.id}>
                <MovieCard
                  movie={movie}
                  fav={favorites.includes(movie.id)}
                  onAddToFavorites={onAddFavorite}
                  onRemoveFromFavorites={onRemoveFavorite}
                />
              </Col>
            ))}
      </Row>
    </div>
  );
};