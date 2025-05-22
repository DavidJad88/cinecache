import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

const MovieCard = ({ film }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  return (
    <Link to={`/movie-list/${film.id}`} film={film}>
      <div className={styles.movieCard}>
        <img
          src={`${baseImgUrl}${film.poster_path}`}
          alt={`${film.title || film.name}`}
        />
        <div className={styles.descriptionWrapper}></div>
      </div>
    </Link>
  );
};

export default MovieCard;
