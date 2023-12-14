import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../styles_v2/components_v2/space/calendar/DailyView.module.css";
import Event from "./dailyView/Event";
import { useEffect, useState } from "react";

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
  const params = useParams();
  const [curDay, setCurDay] = useState(1);
  const [curMonth, setCurMonth] = useState(1);
  const [curYear, setCurYear] = useState(1);
  const spaceId = params.spaceId;
  useEffect(() => {
    setCurYear(params.year);
    setCurMonth(params.month);
    setCurDay(params.day);
  }, [navigate]);
  return (
    <div className={styles.calendar}>
      <div className={styles.title}>
        <div className={styles.calendarTitle}>
          <div
            className={`${styles.Button}`}
            onClick={() => {
              let prevDate = new Date(`${curMonth}/${curDay}/${curYear}`);
              prevDate = prevDate - 24 * 60 * 60;
              const tempDate = new Date(prevDate);
              const day = tempDate.getDate();
              const month = tempDate.getMonth();
              const year = tempDate.getFullYear();
              navigate(`/space/${spaceId}/calendar/${year}/${month + 1}/${day}`);
            }}
          >
            <p>&lt;</p>
          </div>
          <div className={styles.monthYear}>
            <p>{`${curDay} ${months[curMonth - 1]} ${curYear}`}</p>
          </div>
          <div
            className={`${styles.Button}`}
            onClick={() => {
              let prevDate = new Date(`${curMonth}/${curDay}/${curYear}`);
              prevDate = prevDate.valueOf() + 24 * 60 * 60000;
              const tempDate = new Date(prevDate);
              const day = tempDate.getDate();
              const month = tempDate.getMonth();
              const year = tempDate.getFullYear();
              navigate(`/space/${spaceId}/calendar/${year}/${month + 1}/${day}`);
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
