import React from "react";
import styles from "../../../styles_v2/components_v2/dashboard/home/LiveEventBanner.module.css";

export default function LiveEventBanner({
  bannerImage,
  date,
  time,
  title,
  description,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.bannerImage}>
          <img className={bannerImage}></img>
        </div>
      </div>
      <div className={styles.rightContainer}></div>
    </div>
  );
}
