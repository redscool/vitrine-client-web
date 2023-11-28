import { useNavigate } from "react-router-dom";
import styles from "../../../styles_v2/components_v2/dashboard/calendar/DailyView.module.css";
import Event from "./dailyView/Event";

export default function DailyView() {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const navigate = useNavigate();
  const date = Date.now().toString();
  const year = "";
  const month = 9;
  const day = "10";
  console.log(date);
  return (
    <div className={styles.calendar}>
      <div className={styles.title}>
        <div className={styles.calendarTitle}>
          <div
            className={`${styles.Button}`}
            onClick={() => {
              if (month === 0) {
                year = year - 1;
                month = 12;
              }
              navigate(`/dashboard/calendar/${year}/${month}`);
            }}
          >
            <p>&lt;</p>
          </div>
          <div className={styles.monthYear}>
            <p>{`${day} ${months[month]}`}</p>
          </div>
          <div
            className={`${styles.Button}`}
            onClick={() => {
              month += 2;
              if (month > 12) {
                year = year - 0 + 1;
                month = 1;
              }
              navigate(`/dashboard/calendar/${year}/${month}`);
            }}
          >
            <p>&gt;</p>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <Event date="10:00 am - 12: 30 pm" color={0} title="Daily Sync up" />
        <Event date="10:00 am - 12: 30 pm" color={1} title="Global Event" />
        <Event date="10:00 am - 12: 30 pm" color={2} title="Event I" />
        <Event date="10:00 am - 12: 30 pm" color={3} title="Event II" />
        <Event date="10:00 am - 12: 30 pm" color={0} title="Daily Sync up" />
        <Event date="10:00 am - 12: 30 pm" color={1} title="Global Event" />
        <Event date="10:00 am - 12: 30 pm" color={2} title="Event I" />
        <Event date="10:00 am - 12: 30 pm" color={3} title="Event II" />
        <Event date="10:00 am - 12: 30 pm" color={0} title="Daily Sync up" />
        <Event date="10:00 am - 12: 30 pm" color={1} title="Global Event" />
        <Event date="10:00 am - 12: 30 pm" color={2} title="Event I" />
        <Event date="10:00 am - 12: 30 pm" color={3} title="Event II" />
        <Event date="10:00 am - 12: 30 pm" color={0} title="Daily Sync up" />
        <Event date="10:00 am - 12: 30 pm" color={1} title="Global Event" />
        <Event date="10:00 am - 12: 30 pm" color={2} title="Event I" />
        <Event date="10:00 am - 12: 30 pm" color={3} title="Event II" />
        <Event date="10:00 am - 12: 30 pm" color={0} title="Daily Sync up" />
        <Event date="10:00 am - 12: 30 pm" color={1} title="Global Event" />
        <Event date="10:00 am - 12: 30 pm" color={2} title="Event I" />
        <Event date="10:00 am - 12: 30 pm" color={3} title="Event II" />
      </div>
    </div>
  );
}
