import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {
    const { movieId } = useParams();
    const movie = movies.find(m => m.id === movieId);

    const [isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie.id));

    useEffect(() => {
        setIsFavorite(user.favoriteMovies.includes(movie.id));
    }, [movieId])

    const addFavorite = () => {
        fetch(`https://myflixapp.onrender.com//users/${user.username}/movies/${movieId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Add to favorites failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully added to favorites");
                setIsFavorite(true);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const removeFavorite = () => {
        fetch(`https://myflixapp.onrender.com/users/${user.username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Remove from favorites failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully deleted from favorites");
                setIsFavorite(false);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }
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
      <Link to={"/"}>
                        <Button variant="primary">Back</Button>
                    </Link>
      {isFavorite ?
        <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
        : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
      }
    </div>
    
    
  );
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired)
};