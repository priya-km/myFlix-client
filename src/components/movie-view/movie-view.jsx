import { Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} alt="Movie Poster" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
          </div>
            <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
          </div>
            <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <Button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </Button>
    </div>
  );
};