import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

const MovieCard = ({ film, className }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  return (
    <Link to={`/movie-list/${film.id}`} film={film}>
      <div className={`${styles.movieCard} ${className}`}>
        <img
          src={`${baseImgUrl}${film.poster_path}`}
          alt={`${film.title || film.name}`}
        />
        <h2>{film.title}</h2>
      </div>
    </Link>
  );
};

export default MovieCard;
