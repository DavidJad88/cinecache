import styles from "./MovieLibrary.module.css";

import { getAuthContext } from "../../context/authContext";
import { database } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import StarRater from "../../components/StarRater/StarRater";
import MovieCard from "../../components/MovieCard/MovieCard";
import Spinner from "../../components/Spinner/Spinner";

const MovieLibrary = () => {
  const [userLibrary, setUserLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = getAuthContext();

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  useEffect(() => {
    if (!user) {
      return;
    }
    setLoading(true);
    const fetchUserLibrary = async () => {
      try {
        const libraryDocRef = doc(database, "userLibraries", user.uid);
        const libraryDoc = await getDoc(libraryDocRef);
        if (libraryDoc.exists()) {
          setUserLibrary(libraryDoc.data());
        } else {
          setUserLibrary(null);
          setErrorMessage("");
        }
      } catch (error) {
        setErrorMessage("Error loading your library, please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchUserLibrary();
  }, [user]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.movieLibrary}>
      {!errorMessage ? (
        Array.isArray(userLibrary?.reviews) &&
        userLibrary.reviews.length != 0 ? (
          <>
            <div className={styles.movieGrid}>
              {userLibrary?.reviews?.map((libraryItem) => {
                return (
                  <div key={libraryItem.movie.id}>
                    <MovieCard
                      film={libraryItem.movie}
                      className={styles.libraryMovieCard}
                    ></MovieCard>

                    <div className={styles.ratingContainer}>
                      <StarRater value={libraryItem.userRating}></StarRater>
                    </div>
                    <div className={styles.libraryToolsContainer}></div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className={styles.emptyLibraryWrapper}>
            <h1>Nothing here yet!</h1>
            <p>Go ahead, browse some movies and add them to your library!</p>
          </div>
        )
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default MovieLibrary;
