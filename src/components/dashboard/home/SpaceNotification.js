import React from "react";
import styles from "../../../styles/components/dashboard/home/SpaceNotification.module.css";
export default function SpaceNotification() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.schedule}>
          <div className={styles.month}>
            <p>Jul</p>
          </div>
          <div className={styles.date}>
            <p>12</p>
          </div>
          <div className={styles.time}>
            <p>12:30 PM</p>
          </div>
        </div>
        <div className={styles.image}>
          <img src="/resources/robot.png" alt="course"></img>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.upcomingClass}>
          <p>Upcoming Space</p>
        </div>
        <div className={styles.classTitle}>
          <p>Future Deep Tech Founders</p>
        </div>
        <div className={styles.teacherSection}>
          <div className={styles.teacher}>
            <div className={styles.By}>
              <p>Lecture By</p>
            </div>
            <div className={styles.teacherName}>
              <p>Bailee Cooper</p>
            </div>
          </div>
          <div className={styles.enterClassButtonContainer}>
            <div className={styles.enterClassButton}>
              <p>Enter Space</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
