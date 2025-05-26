import styles from "./MovieDetails.module.css";
import Modal from "../../components/Modal/Modal";
import AddToLibrary from "../../components/AddToLibrary/AddToLibrary";
import Button from "../../components/Button/Button";
import StarRater from "../../components/StarRater/StarRater";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { getAuthContext } from "../../context/authContext";

import { countryCodes, countryLanguages } from "../../data/countryCode";
import RemoveFromLibrary from "../../components/RemoveFromLibrary/RemoveFromLibrary";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  //api fetching and render params states
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieCrew, setMovieCrew] = useState(null);

  const { user } = getAuthContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //states for adding and removing to library
  const [showAddToLibraryModal, setShowAddToLibraryModal] = useState(false);
  const [showRemoveFromLibraryModal, setShowRemoveFromLibraryModal] =
    useState(false);

  const [usersRating, setUsersRating] = useState(null);

  // const [showAddToWatchListModal, setShowAddToWatchListModal] = useState(false);
  // const [showRemoveFromWatchList, setShowRemoveFromWatchListModal] =
  //   useState(false);

  // states for checks if movie is in users library
  const [isInUserLibrary, setisInUserLibrary] = useState(false);
  // const [isInUserWatchList, setIsInUserWatchList] = useState(false);

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

  //retrieve rating if in users library
  const checkUsersRating = async () => {
    if (!user) return;

    try {
      const userLibraryRef = doc(database, "userLibraries", user.uid);
      const userLibrarySnap = await getDoc(userLibraryRef);

      if (userLibrarySnap.exists()) {
        const data = userLibrarySnap.data();
        const reviews = Array.isArray(data.reviews) ? data.reviews : [];
        const currentMovie = reviews.find(
          (review) => review.movie && review.movie.id === movie.id
        );
        setUsersRating(currentMovie ? currentMovie.userRating : null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      checkUsersRating();
    }
  }, [user, movie]);

  //function to check if movie is in database

  const checkIfMovieInLibrary = async () => {
    if (!user || !movie) return;

    try {
      const userLibraryRef = doc(database, "userLibraries", user.uid);
      const userLibrarySnap = await getDoc(userLibraryRef);

      if (userLibrarySnap.exists()) {
        const data = userLibrarySnap.data();
        const reviews = Array.isArray(data.reviews) ? data.reviews : [];
        const currentMovie = reviews.find(
          (review) => review.movie && review.movie.id === movie.id
        );
        if (currentMovie) {
          setisInUserLibrary(true);
        } else {
          setisInUserLibrary(false);
        }
      } else {
        setisInUserLibrary(false);
      }
    } catch (error) {
      setisInUserLibrary(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkIfMovieInLibrary();
    }
  }, [user, movie]);

  //show modals

  const handleShowAddToLibraryModal = () => {
    setShowAddToLibraryModal(true);
  };

  const handleShowRemoveFromLibraryModal = () => {
    setShowRemoveFromLibraryModal(true);
  };
  // const handleShowAddToWatchListModal = () => {
  //   setShowAddToWatchListModal(true);
  // };

  //----Prettyfying render--------------------------------

  //extracting releaseYear and date separately
  const releaseYear = movie?.release_date
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
                      <Button
                        className={styles.addToLibraryButton}
                        onClick={handleShowRemoveFromLibraryModal}
                      >
                        Remove from library
                      </Button>
                    ) : (
                      <Button
                        className={styles.removeFromLibraryButton}
                        onClick={handleShowAddToLibraryModal}
                      >
                        Add To library
                      </Button>
                    )}
                  </div>
                  <div className={styles.userRatingWrapper}>
                    {usersRating && (
                      <>
                        <p>
                          You've already rated {movie.title} a {usersRating} of
                          10!
                        </p>
                        <div className={styles.userRatingContainer}>
                          <StarRater value={usersRating}></StarRater>
                        </div>
                      </>
                    )}
                  </div>
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
                  {directorObj?.map((director) => {
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
                  <div className={styles.productionCompanyWrapper}>
                    {movie.production_companies.map((company) => {
                      return (
                        <div>
                          <p key={company.id}>{company.name}</p>
                        </div>
                      );
                    })}
                  </div>
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
          {showAddToLibraryModal && (
            <Modal containerClassName={styles.addOrRemoveModal}>
              <AddToLibrary
                movie={movie}
                crew={movieCrew}
                setShowAddToLibraryModal={setShowAddToLibraryModal}
              />
            </Modal>
          )}
          {showRemoveFromLibraryModal && (
            <Modal containerClassName={styles.addOrRemoveModal}>
              <RemoveFromLibrary
                movie={movie}
                setShowRemoveFromLibraryModal={setShowRemoveFromLibraryModal}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDetails;
