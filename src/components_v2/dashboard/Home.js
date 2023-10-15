import React from "react";
import styles from "../../styles_v2/components_v2/dashboard/Home.module.css";
import LiveEventBanner from "./home/LiveEventBanner";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <LiveEventBanner />
        <div className={styles.lights}></div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.upcomingEventsContainer}></div>
        <div className={styles.notificationsContainer}></div>
      </div>
    </div>
  );
}
