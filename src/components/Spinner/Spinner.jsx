import styles from "./Spinner.module.css";

const Spinner = ({ spinnerClassName }) => {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <div className={`${styles.spinnerCircle} ${spinnerClassName}`}>
          <img
            src="/assets/icons/film-camera.svg"
            alt="film camera spinner"
            className={styles.spinnerImage}
          />
        </div>
      </div>
    </>
  );
};

export default Spinner;
