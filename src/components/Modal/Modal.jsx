import styles from "./Modal.module.css";
import Button from "../Button/Button";
import { useState } from "react";
const Modal = ({ title, children, onClose, containerClassName }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={`${styles.modalContainer} ${containerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
