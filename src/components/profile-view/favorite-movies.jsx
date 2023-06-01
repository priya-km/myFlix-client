import React from "react";
import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MovieCard } from "../movie-card/movie-card";


export const FavoriteMovies = ({ movies, onAddFavorite, onRemoveFavorite, onFavoriteClick, fav }) => {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const favorites = storedData && storedData.FavoriteMovies ? storedData.FavoriteMovies : [];
  const [isFavorite, setIsFavorite] = useState(fav);
  
  
  const handleAddToFavorites = (event) => {
    event.preventDefault();
    onAddToFavorites(movie.id); 
    setIsFavorite(true);
  };
  
  // Remove from favorites
  
  const handleRemoveFromFavorites = (event) => {
    event.preventDefault();
    onRemoveFromFavorites(movie.id);
    setIsFavorite(false);
  };
  
  // Setting favorite
  
  const handleFavoriteClick = (event) => {
    event.preventDefault();
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      handleAddToFavorites(event);
    }
  };
  
  
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
        onFavoriteClick={onFavoriteClick}
        />
        </Col>
        ))}
        </Row>
        </div>
        );
      };