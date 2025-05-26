import Button from "../Button/Button";
import styles from "./RemoveFromLibrary.module.css";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { database } from "../../../firebaseConfig";
import { getAuthContext } from "../../context/authContext";

const RemoveFromLibrary = ({ movie, setShowRemoveFromLibraryModal }) => {
  const { user } = getAuthContext();

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
      }
      setShowRemoveFromLibraryModal(false);
    } catch (error) {
      console.error("Error removing movie from library:", error);
    }
  };

  return (
    <div className={styles.removeFromLibraryWrapper}>
      <div>
        <p>Are you sure you want to remove {movie.title} from your library?</p>
      </div>
      <div>
        <Button
          className={styles.confirmDeleteButton}
          onClick={handleDeleteMovie}
        >
          Confirm
        </Button>
        <Button
          className={styles.cancelDeleteButton}
          onClick={() => setShowRemoveFromLibraryModal(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RemoveFromLibrary;
