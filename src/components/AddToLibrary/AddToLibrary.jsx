import styles from "./AddToLibrary.module.css";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { getAuthContext } from "../../context/authContext";

import StarRater from "../StarRater/StarRater";
import Button from "../Button/Button";

const AddToLibrary = ({
  movie,
  crew,
  setShowAddToLibraryModal,
  setHasBeenAdded,
  hasBeenAdded,
}) => {
  const { user } = getAuthContext();
  const [userRating, setUserRating] = useState("");
  const [userReview, setUserReview] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const [userReviewData, setUserReviewData] = useState([
    userReview,
    userRating,
    movie,
    crew,
  ]);

  const [addConfirmationMessage, setAddConfirmationMessage] = useState("");
  const [addErrorMessage, setAddErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add to your library.");
      return;
    }
    const userReviewData = {
      userReview,
      userRating,
      movie,
      crew,
    };

    const userLibraryRef = doc(database, "userLibraries", user.uid);

    try {
      const userLibrarySnap = await getDoc(userLibraryRef);

      if (userLibrarySnap.exists()) {
        await updateDoc(userLibraryRef, {
          reviews: arrayUnion(userReviewData),
        });
        setAddConfirmationMessage(
          `${movie.title} has been added to your library`
        );
        setAddErrorMessage("");
        setIsAdded(true);
      } else {
        await setDoc(userLibraryRef, {
          reviews: [userReviewData],
        });
        setAddConfirmationMessage(
          `${movie.title} has been added to your library`
        );
        setAddErrorMessage("");
      }

      //   setShowAddToLibraryModal(false);
    } catch (error) {
      setAddErrorMessage(
        "Oops, there seems to be a problem, please try again later"
      );
    }
  };

  useEffect(() => {
    if (hasBeenAdded) {
      setHasBeenAdded(false);
    }
  }, [hasBeenAdded]);

  return (
    <div className={styles.addToLibraryWrapper}>
      <h2>Add "{movie.title}" to your library?</h2>

      <p>You can add a rating if you'd like:</p>
      <form className={styles.reviewForm} onSubmit={handleSubmit}>
        <div className={styles.ratingContainer}>
          <div className={styles.starsContainer}>
            <StarRater
              userRating={userRating}
              setUserRating={setUserRating}
            ></StarRater>
          </div>
          {userRating && (
            <div className={styles.ratingTextContainer}>
              <p> You've rated this {userRating} out of 10!</p>
            </div>
          )}
        </div>

        <div className={styles.reviewContainer}>
          <label htmlFor="userReview">And an optional short review too!</label>
          <textarea
            name="userReview"
            id="user-review"
            cols={50}
            rows={10}
            className={styles.reviewTextArea}
            maxLength={300}
            placeholder="Max length 300 characters"
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
          ></textarea>
          <span>{userReview.length}/300</span>
        </div>
        <div className={styles.addToLibraryTools}>
          {isAdded ? (
            <Button className={styles.addToLibraryButton} disabled={true}>
              ✓
            </Button>
          ) : (
            <Button className={styles.addToLibraryButton} type={"submit"}>
              Add to Library
            </Button>
          )}

          {isAdded ? (
            <Button
              className={styles.closeAddModalButton}
              onClick={() => {
                setShowAddToLibraryModal(false);
                setHasBeenAdded(true);
              }}
              type={"button"}
            >
              Close
            </Button>
          ) : (
            <Button
              className={styles.closeAddModalButton}
              onClick={() => setShowAddToLibraryModal(false)}
              type={"button"}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
      <div className={styles.addMessageContainer}>
        {addConfirmationMessage && <p>{addConfirmationMessage}</p>}
        {addErrorMessage && <p>{addErrorMessage}</p>}
      </div>
    </div>
  );
};

export default AddToLibrary;
