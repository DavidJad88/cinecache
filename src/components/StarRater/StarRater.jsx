import { useState, useEffect } from "react";
import styles from "./StarRater.module.css";
import { FaStar } from "react-icons/fa";
const StarRater = ({ userRating, setUserRating, value, readOnly = false }) => {
  const [currentRating, setCurrentRating] = useState(value || null);
  const [rateColor, setRateColor] = useState(null);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setCurrentRating(value);
    }
  }, [value]);

  return (
    <>
      {[...Array(10)].map((star, index) => {
        const currentRate = index + 1;

        return (
          <>
            <FaStar
              key={currentRate}
              className={styles.ratingStar}
              onClick={
                readOnly
                  ? undefined
                  : () => {
                      () => setUserRating(currentRate);
                      if (setUserRating) setUserRating(currentRate);
                    }
              }
              style={{
                color:
                  currentRate <= (userRating || currentRating)
                    ? "var(--star-active)"
                    : "var(--star-inactive)",
                cursor: readOnly ? "default" : "pointer",
              }}
            ></FaStar>
          </>
        );
      })}
    </>
  );
};

export default StarRater;
