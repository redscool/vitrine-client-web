import styles from "../styles/components/DailyView.module.css";
import Event from "./dailyView/Event";

export default function DailyView({ date, setShow, eventsDictionary }) {
  return (
    <div className={styles.container} onClick={() => setShow(false)}>
      <div className={styles.calendar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>
          <div className={styles.calendarTitle}>
            <div className={`${styles.Button}`}>
              <p>&lt;</p>
            </div>
            <div className={styles.monthYear}>
              <p>{date}</p>
            </div>
            <div className={`${styles.Button}`}>
              <p>&gt;</p>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          {eventsDictionary[date]?.map((event, i) => (
            <Event
              date={`${event.start} - ${event.end}`}
              color={Math.floor(Math.random() * 4)}
              title={event.title}
              url={event.googleMeet}
              key={i}
            />
          ))}
          {eventsDictionary[date] ? null : (
            <p>No events available for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
}
