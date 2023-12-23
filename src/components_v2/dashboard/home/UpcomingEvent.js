import { useNavigate } from "react-router-dom";
import styles from "../../../styles_v2/components_v2/dashboard/home/UpcomingEvent.module.css";
export default function UpcomingEvent({ event }) {
  const { date, month, title, description, time, spaceId } = event;
  const navigate = useNavigate();
  return (
    <div
      className={styles.mainContainer}
      onClick={() => navigate(`/space/${spaceId}/`)}
    >
      <div className={styles.leftContainer}>
        <div className={styles.date}>
          <p>{date}</p>
        </div>
        <div className={styles.month}>
          <p>{month}</p>
        </div>
      </div>
      <div className={styles.centerContainer}>
        <div className={styles.title}>
          <p>{title}</p>
        </div>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.time}>
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
}
