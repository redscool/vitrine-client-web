import React from "react";
import styles from "../../../styles_v2/components_v2/dashboard/spaces/SpaceTile.module.css";
export default function SpaceTile({ message }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.profileContainer}>
        <img src="/profile_pic.jpg" />
      </div>
      <div className={styles.topContainer}>
        <img src="/cover_pic.jpg" />
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.title}>
          <p>Title here goes brrrr</p>
        </div>
        <div className={styles.subtitle}>
          <p>Sub title goes brrr</p>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <p>
          <span className={styles.messages}>
            {message === 0 ? "No" : message}
          </span>{" "}
          new {message === 1 ? "message" : "messages"}
        </p>
      </div>
    </div>
  );
}
