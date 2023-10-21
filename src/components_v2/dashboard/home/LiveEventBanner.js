import React from "react";
import styles from "../../../styles_v2/components_v2/dashboard/home/LiveEventBanner.module.css";
import { toggleTheme } from "../../../redux/settingReducer";

export default function LiveEventBanner({
  bannerImage,
  date,
  time,
  month,
  title,
  description,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.image}>
          <img src={bannerImage} />
        </div>
        <div className={styles.eventDetails}>
          <div className={styles.date}>
            <p>{date}</p>
          </div>
          <div className={styles.month}>
            <p>{month}</p>
          </div>
          <div className={styles.time}>
            <p>{time}</p>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.status}>
          <p>Live Now | Upcoming</p>
        </div>
        <div className={styles.title}>
          <p>
            Art Fest City of <br />
            Harrisburgh
          </p>
        </div>
        <div className={styles.bottomRightContainer}>
          <div className={styles.description}>
            <p>Cultural Pennsylvania</p>
          </div>
          <div
            className={styles.enterEventButton}
            // onClick={() => {
            //   console.log("Aaa");
            //   toggleTheme();
            // }}
          >
            <p>Enter</p>
          </div>
        </div>
      </div>
    </div>
  );
}
