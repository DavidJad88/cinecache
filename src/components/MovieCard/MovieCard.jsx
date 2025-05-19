import styles from "./MovieCard.module.css";

const MovieCard = ({ film }) => {
  console.log(film);
  const baseImgUrl = "https://image.tmdb.org/t/p/original";
  return (
    <div className={styles.movieCard}>
      <img
        src={`${baseImgUrl}${film.poster_path}`}
        alt={`${film.title || film.name}`}
      />
      <div className={styles.descriptionWrapper}></div>
    </div>
  );
};

export default MovieCard;
