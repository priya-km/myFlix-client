import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card
      className="h-100"
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Button variant="link">
          See More...
          </Button>
          </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      director: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };