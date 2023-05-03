import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);
  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} alt="Movie Poster" />
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
      <Link to={`/`}>
      <Button
        className="back-button"
        // style={{ cursor: "pointer", color: "white"}}
      >
        Back
        </Button>
        </Link>
    </div>
    
    
  );
};