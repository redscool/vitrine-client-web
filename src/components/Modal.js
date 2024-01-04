import React from "react";
import styles from "./../styles/components/Modal.module.css";

export default function Modal({ success, setSuccess }) {
  return (
    <div
      className={`${styles.modal}  ${success ? "" : styles.hide}`}
      onClick={() => setSuccess("")}
    >
      <div className={styles.modalContainer}>
        <p>{success}</p>
      </div>
    </div>
  );
}
