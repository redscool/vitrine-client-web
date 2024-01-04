import React, { useState } from "react";
import styles from "../../../styles/components/dashboard/profile/UpdateBioPopup.module.css";
export default function UpdateDescriptionPopup({ setView, description, setDescription }) {
  const [tDescription, setTDescription] = useState(description);
  const handleClick = () => {
    setDescription(tDescription)
    setView(false);
  };
  return (
    <div className={`${styles.mainContainer}`} onClick={() => setView(false)}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>Update Description</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            value={tDescription}
            onChange={(e) => setTDescription(e.target.value)}
            placeholder="Description goes here...."
          />
        </div>
        <div className={styles.button} onClick={handleClick}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
