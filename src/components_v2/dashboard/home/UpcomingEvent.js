import styles from "../../../styles_v2/components_v2/dashboard/home/UpcomingEvent.module.css";
export default function UpcomingEvent() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.date}>
          <p>25</p>
        </div>
        <div className={styles.month}>
          <p>OCT</p>
        </div>
      </div>
      <div className={styles.centerContainer}>
        <div className={styles.title}>
          <p>Art Fest City of Harrisburgh</p>
        </div>
        <div className={styles.description}>
          <p>Cultural Pennsylvania</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.time}>
          <p>7:00 pm</p>
        </div>
      </div>
    </div>
  );
}
