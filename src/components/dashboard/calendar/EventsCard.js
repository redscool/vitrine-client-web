import styles from "../../../styles/components/dashboard/calendar/EventsCard.module.css";
export default function EventsCard({ event }) {
  const startTime = event.startTime.substring(11, 16);
  const endTime = event.endTime.substring(11, 16);
  const title = event.title;
  const description = event.description;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.time}>
        <p>
          {startTime} - {endTime}
        </p>
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.description}>
        <p>{description}</p>
      </div>
    </div>
  );
}
