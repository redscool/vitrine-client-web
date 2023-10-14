import React from "react";
import styles from "./../styles_v2/components_v2/Modal.module.css";

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
