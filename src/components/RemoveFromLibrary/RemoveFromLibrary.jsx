import Button from "../Button/Button";
import styles from "./RemoveFromLibrary.module.css";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { database } from "../../../firebaseConfig";
import { getAuthContext } from "../../context/authContext";
import { useEffect, useState } from "react";

const RemoveFromLibrary = ({
  movie,
  setShowRemoveFromLibraryModal,
  setHasBeenRemoved,
  hasBeenRemoved,
}) => {
  const { user } = getAuthContext();
  const [isRemoved, setIsRemoved] = useState(false);
  const [removeError, setRemoveError] = useState(false);

  const handleDeleteMovie = async () => {
    if (!user || !movie) return;
    const userLibraryRef = doc(database, "userLibraries", user.uid);
    try {
      const userLibrarySnap = await getDoc(userLibraryRef);
      if (userLibrarySnap.exists()) {
        const data = userLibrarySnap.data();
        const reviews = Array.isArray(data.reviews) ? data.reviews : [];

        const updatedReviews = reviews.filter(
          (review) => review.movie && review.movie.id !== movie.id
        );
        await updateDoc(userLibraryRef, { reviews: updatedReviews });
        setIsRemoved(true);
      }
      // setShowRemoveFromLibraryModal(false);
    } catch (error) {
      setRemoveError("Error removing movie from library, please try again");
    }
  };

  useEffect(() => {
    if (hasBeenRemoved) {
      setHasBeenRemoved(false);
    }
  }, [hasBeenRemoved]);

  return (
    <div className={styles.removeFromLibraryWrapper}>
      <div>
        <p>Are you sure you want to remove {movie.title} from your library?</p>
      </div>
      <div>
        {isRemoved ? (
          <Button
            className={styles.confirmDeleteButton}
            onClick={handleDeleteMovie}
            disabled={true}
          >
            ✓
          </Button>
        ) : (
          <Button
            className={styles.confirmDeleteButton}
            onClick={handleDeleteMovie}
          >
            Confirm
          </Button>
        )}
        {isRemoved ? (
          <Button
            className={styles.cancelDeleteButton}
            onClick={() => {
              setShowRemoveFromLibraryModal(false);
              setHasBeenRemoved(true);
            }}
          >
            Close
          </Button>
        ) : (
          <Button
            className={styles.cancelDeleteButton}
            onClick={() => setShowRemoveFromLibraryModal(false)}
          >
            Cancel
          </Button>
        )}
      </div>
      {isRemoved && <p>{movie.title} has been removed from your library</p>}
      {removeError && <p>{removeError}</p>}
    </div>
  );
};

export default RemoveFromLibrary;
