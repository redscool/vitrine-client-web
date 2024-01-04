import React from "react";
import styles from "../../../styles/components/dashboard/home/LiveEventBanner.module.css";
import { toggleTheme } from "../../../redux/settingReducer";
import { useNavigate } from "react-router-dom";

export default function LiveEventBanner({ bannerImage, event, noContent }) {
  const { date, time, month, title, description, spaceId } = event ? event : {};
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {noContent ? (
        <p>No Upcoming Events</p>
      ) : (
        <>
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
              <p>{title}</p>
            </div>
            <div className={styles.bottomRightContainer}>
              <div className={styles.description}>
                <p>{description}</p>
              </div>
              <div
                className={styles.enterEventButton}
                onClick={() => {
                  navigate(`/space/${spaceId}/`);
                }}
              >
                <p>Enter</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
