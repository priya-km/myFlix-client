import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Bao",
      image:
        "https://imgtr.ee/images/2023/04/07/kzMxr.jpg",
      director: "Domee Shi",
      genre: "Animation",
      description: "An ageing Chinese mother, feeling alone when her child moves out, gets a second chance at motherhood when one of her dumplings comes to life."
    },
    {
      id: 2,
      title: "Detective Pikachu",
      image: "https://imgtr.ee/images/2023/04/07/kzOjn.jpg",
    director: "Rob Letterman",
    genre: "Adventure",
    description: "Ace detective Harry Goodman goes mysteriously missing, prompting his 21-year-old son, Tim, to find out what happened. Aiding in the investigation is Harry'’s former Pokémon partner, wise-cracking, adorable super-sleuth Detective Pikachu. Finding that they are uniquely equipped to work together, as Tim is the only human who can talk with Pikachu, they join forces to unravel the tangled mystery."
    },
    {
      id: 3,
      title: "Turning Red",
      image: "https://imgtr.ee/images/2023/04/07/kzoyc.jpg",
    director: "Domee Shi",
    genre: "Animation",
    description: "A thirteen-year-old girl is torn between staying her mother'’s dutiful daughter and the changes of adolescence. And as if the challenges were not enough, whenever she gets overly excited she transforms into a giant red panda."
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
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