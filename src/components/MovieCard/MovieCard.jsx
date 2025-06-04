import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import { useSearch } from "../../context/searchContext";

const MovieCard = ({ film, className }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  const { searchTerm, isSearching, setIsSearching } = useSearch();

  const releaseYear = film?.release_date
    ? new Date(film.release_date).getFullYear()
    : "";

  return (
    <Link
      to={`/movie-list/${film.id}`}
      film={film}
      onClick={() => setIsSearching(false)}
    >
      <div className={`${styles.movieCard} ${className}`}>
        {film?.poster_path ? (
          <img
            src={`${baseImgUrl}${film.poster_path}`}
            alt={`${film.title || film.name}`}
          />
        ) : (
          <img src="/assets/icons/clapper.svg" alt={film.title}></img>
        )}

        <div className={styles.titleContainer}>
          <h2>{film.title}</h2>
          <p>({releaseYear})</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
