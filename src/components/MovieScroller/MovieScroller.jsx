import styles from "./MovieScroller.module.css";
import { useFetchFilms } from "../../hooks/useFetchFilms";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../Spinner/Spinner";

const MovieScroller = ({ queryParam }) => {
  const { fetchedFilms, errors, isLoading } = useFetchFilms(queryParam);

  return (
    <div className={styles.scrollerWrapper}>
      {fetchedFilms.map((film) => {
        return (
          <>
            {isLoading ? (
              <Spinner key={film.id}></Spinner>
            ) : (
              <MovieCard key={film.id} film={film}></MovieCard>
            )}
          </>
        );
      })}
    </div>
  );
};

export default MovieScroller;
