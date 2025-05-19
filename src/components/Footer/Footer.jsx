import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.schoolAttributionWrapper}>
        <p>Thank you for a great year!</p>
        <a
          href="https://www.kristiania.no/studier/fagskole/frontend-utvikling/"
          target="_blank"
        >
          <img
            src="/assets/images/Kristiania-Rød.svg"
            alt="Kristiania university college link"
          />
        </a>
      </div>

      <div className={styles.apiAttributionWrapper}>
        <p>Movie Database Supplied by:</p>
        <a href="https://www.themoviedb.org/" target="_blank">
          <img
            className={styles.tmdbImage}
            src="/assets/images/TMDB.svg"
            alt="The movie database link"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
