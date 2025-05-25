import styles from "./MovieScroller.module.css";
import { useFetchFilms } from "../../hooks/useFetchFilms";
import MovieCard from "../MovieCard/MovieCard";

const MovieScroller = ({ queryParam }) => {
  const { fetchedFilms, errors, isLoading } = useFetchFilms(queryParam);

  if (isLoading) return <div>Loading movies...</div>;
  if (errors) return <div>Error: {errors}</div>;
  return (
    <div className={styles.scrollerWrapper}>
      {fetchedFilms.map((film) => {
        return (
          <>
            <MovieCard key={film.id} film={film}></MovieCard>;
          </>
        );
      })}
    </div>
  );
};

export default MovieScroller;
