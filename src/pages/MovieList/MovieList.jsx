import styles from "./MovieList.module.css";

import { useFetchFilms } from "../../hooks/useFetchFilms";
import { useEffect, useState } from "react";
import MovieScroller from "../../components/MovieScroller/MovieScroller";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieList = () => {
  const [movieGenres, setmovieGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const result = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        const data = await result.json();

        setmovieGenres(data.genres);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchGenres();
  }, []);

  const fetchGenres = () => {};
  return (
    <div className={styles.movieListWrapper}>
      {movieGenres.map((genre) => (
        <div className={styles.genreWrapper} key={genre.id}>
          <h2 className={styles.genreHeader}>{genre.name}</h2>
          <MovieScroller queryParam={genre.id} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
