import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export const MovieCard = ({ fav, movie, onAddToFavorites, onRemoveFromFavorites  }) => {
  const maxDescriptionLength = 100;
  const truncatedDescription =
    movie.description.length > maxDescriptionLength
      ? `${movie.description.substring(0, maxDescriptionLength)}...`
      : movie.description;

  const [isFavorite, setIsFavorite] = useState(fav);

  // Add to favorites

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

  // Movie card display 

  return (
    <Card className={`h-100 movie-card`}>
      <Card.Img
        variant="top"
        src={movie.image}
        alt={movie.title}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
       {/*  // So the card shows a shorter description  */}
        <Card.Text>{truncatedDescription}</Card.Text> 
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">See More...</Button>
          </Link>
          <Button
          className="favorite-button"
          size="sm"
            variant={isFavorite ? 'danger' : 'outline-danger'}
            onClick={!isFavorite ? handleFavoriteClick : handleRemoveFromFavorites}
          >
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),

    // remove if director info moves elsewhere in future project updates 
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired,
      death: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};