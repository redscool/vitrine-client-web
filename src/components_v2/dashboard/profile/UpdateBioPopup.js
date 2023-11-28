import React, { useState } from "react";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateBioPopup.module.css";
export default function UpdateBioPopup({ view, setView }) {
  const [bio, setBio] = useState("");
  return (
    <div
      className={`${styles.mainContainer} ${view ? "" : styles.hide}`}
      onClick={() => setView(false)}
    >
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>Update Bio</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="About me goes here...."
          />
        </div>
        <div className={styles.button}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
