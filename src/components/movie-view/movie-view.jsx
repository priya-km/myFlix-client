import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
    
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
      <div className="movie-view-container d-flex justify-content-center">
        <div className="movie-image">
      {movie ? (
        <Card className="movie-card">
          {movie.image ? (
        <Card.Img variant="top" src={movie.image} alt={movie.title} />
          ) : null}
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Card.Text>Director: {movie.director.Name}</Card.Text>
            <Card.Text>
              About {movie.director.Name}: {movie.director.Bio}
            </Card.Text>
            <Card.Text>Birth Year: {movie.director.Birth}</Card.Text>
            <Card.Text>Genre: {movie.genre.Name}</Card.Text>
            <Card.Text>
              Genre Description: {movie.genre.Description}
                          </Card.Text>
                          <Link to={`/`}>
              <Button className="back-button" variant="primary">
                Back
              </Button>
            </Link>
          </Card.Body>
        </Card>
              ) : null}
              </div>
    </div>
  );
};