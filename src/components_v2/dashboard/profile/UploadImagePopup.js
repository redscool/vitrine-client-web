import React from "react";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UploadImagePopup.module.css";
export default function UploadImagePopup({ view, setView }) {
  const handleClick = () => {};
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
            <p>Select an Image</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>
            <img src="/upload_image_icon.svg" />
          </div>
          <div className={styles.iconText}>
            <p>
              <input type="file" accept=".jpg, .png, .jpeg" />
              Upload Image
            </p>
          </div>
        </div>
        <div className={styles.button} onClick={handleClick}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
