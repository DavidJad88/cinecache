import styles from "./MovieDetails.module.css";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";

import { countryCodes, countryLanguages } from "../../data/countryCode";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieCrew, setMovieCrew] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // states for checks if movie is in users library
  const [isInUserLibrary, setisInUserLibrary] = useState(false);
  const [isInUserWatchList, setIsInUserWatchList] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();

    const fetchMovieCrew = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch movie crew details");
        const data = await res.json();
        setMovieCrew(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMovieCrew();
  }, [id]);

  //function for adding to user library

  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const releaseDate = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  //reformatting country names
  const countryCode =
    Array.isArray(movie?.origin_country) && movie.origin_country.length > 0
      ? movie.origin_country[0]
      : null;
  const countryObj = countryCodes.find(
    (country) => country.code === countryCode
  );
  const countryName = countryObj ? countryObj.name : "N/A";

  //reformatting languages

  const languageCode = movie?.original_language;

  const languageObj = countryLanguages.find(
    (language) => language.code === languageCode
  );
  const languageName = languageObj ? languageObj.name : "N/A";

  //extracting director name
  const directorObj = movieCrew?.crew?.filter(({ job }) => job === "Director");

  return (
    <div className={styles.movieWrapper}>
      {movie && (
        <>
          <div className={styles.movieContainer}>
            <div
              className={styles.movieImageContainer}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className={styles.movieImageOverlay}>
                <div className={styles.movieTitleWrapper}>
                  <h2 className={styles.movieTitle}>{movie.title} </h2>
                  <p className={styles.movieReleaseYear}>({releaseYear})</p>
                  <p className={styles.movieTagline}>{movie.tagline}</p>
                </div>
                <div className={styles.movieToolsContainer}>
                  <div>
                    {isInUserLibrary ? (
                      <Button>Remove from library</Button>
                    ) : (
                      <Button>Add To library</Button>
                    )}
                  </div>
                  <div>
                    {isInUserWatchList ? (
                      <Button>Remove from Watchlist</Button>
                    ) : (
                      <Button>Add To Watchlist</Button>
                    )}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className={styles.movieOverviewWrapper}>
              <div className={styles.movieOverviewContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster image`}
                />
                <div className={styles.summaryContainer}>
                  <p>Overview:</p>
                  <p className={styles.movieOverview}>"{movie.overview}"</p>
                </div>
              </div>
              <div className={styles.movieDetailsContainer}>
                <div>
                  <p className={styles.detailHeading}>Country of origin</p>{" "}
                  <p>{countryName}</p>
                </div>
                <div>
                  <p className={styles.detailHeading}>Directed by</p>{" "}
                  {directorObj.map((director) => {
                    return <p key={director.id}>{director.name}</p>;
                  })}
                </div>
                <div>
                  <p className={styles.detailHeading}>Runtime</p>{" "}
                  <p>{movie.runtime} Minutes</p>
                </div>

                <div>
                  <p className={styles.detailHeading}>Genre</p>
                  {movie.genres.map((genre) => {
                    return <p key={genre.id}>{genre.name}</p>;
                  })}
                </div>
                <div>
                  <p className={styles.detailHeading}>Language</p>{" "}
                  <p>{languageName}</p>
                </div>

                <div>
                  <p className={styles.detailHeading}>Release Date</p>{" "}
                  <p>{movie.release_date}</p>
                </div>
                <div>
                  <p className={styles.detailHeading}>Produced By:</p>
                  {movie.production_companies.map((company) => {
                    return <p key={company.id}>{company.name}</p>;
                  })}
                </div>
              </div>
            </div>
            <div className={styles.movieCastWrapper}>
              <h2>Top Billed Cast</h2>
              <div className={styles.castScroller}>
                {movieCrew?.cast?.map((castMember) => {
                  return (
                    <div key={castMember.id} className={styles.castCard}>
                      {castMember?.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${castMember.profile_path}`}
                          alt={castMember.name}
                        />
                      ) : (
                        <img
                          src="/assets/icons/clapper.svg"
                          alt={castMember.name}
                        ></img>
                      )}

                      <p className={styles.actorName}>{castMember.name}</p>
                      <p className={styles.characterName}>
                        {castMember.character}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
