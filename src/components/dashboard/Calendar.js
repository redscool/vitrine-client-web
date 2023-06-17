import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/components/dashboard/Calendar.module.css";
import { useEffect, useState } from "react";
import CircularButton from "../form/CircularButton";
import EventsPopUp from "./calendar/EventsPopUp";

export default function Calendar() {
  const [eventsPopup, setEventsPopup] = useState();
  const navigate = useNavigate();
  const months = [
    "JANUARY",
    "FEBUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const [datesArray, setDatesArray] = useState(null);
  let month = useParams().month - 1;
  let year = useParams().year - 0;
  if (!year) year = new Date().getFullYear();
  if (!month) month = new Date().getMonth();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  useEffect(() => {
    const array = [];
    const firstDayOfMonth = new Date(year, month).getDay();
    const firstDateOfMonth = new Date(year, month);
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = firstDayOfMonth; i > 0; i--) {
      const tempDateObj = new Date(firstDateOfMonth - 24 * 3600000 * i);
      const tempDayKey = tempDateObj.getDate();
      const tempYear = String(tempDateObj.getFullYear());
      const tempMonth =
        String(Math.floor((tempDateObj.getMonth() + 1) / 10)) +
        String((tempDateObj.getMonth() + 1) % 10);
      const tempDay =
        String(Math.floor(tempDayKey / 10)) + String(tempDayKey % 10);
      const tempDate = tempYear + "-" + tempMonth + "-" + tempDay;
      array[tempDate] = tempDayKey;
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const tempDateObj = new Date(firstDateOfMonth - 24 * 3600000 * (1 - i));
      const tempDayKey = tempDateObj.getDate();
      const tempYear = String(tempDateObj.getFullYear());
      const tempMonth =
        String(Math.floor((tempDateObj.getMonth() + 1) / 10)) +
        String((tempDateObj.getMonth() + 1) % 10);
      const tempDay =
        String(Math.floor(tempDayKey / 10)) + String(tempDayKey % 10);
      const tempDate = tempYear + "-" + tempMonth + "-" + tempDay;
      array[tempDate] = tempDayKey;
    }
    for (let i = lastDayOfMonth + 1; i < 7; i++) {
      const tempDateObj = new Date(
        lastDateOfMonth - 24 * 3600000 * (lastDayOfMonth - i)
      );
      const tempDayKey = tempDateObj.getDate();
      const tempYear = String(tempDateObj.getFullYear());
      const tempMonth =
        String(Math.floor((tempDateObj.getMonth() + 1) / 10)) +
        String((tempDateObj.getMonth() + 1) % 10);
      const tempDay =
        String(Math.floor(tempDayKey / 10)) + String(tempDayKey % 10);
      const tempDate = tempYear + "-" + tempMonth + "-" + tempDay;
      array[tempDate] = tempDayKey;
    }
    const temp = [];
    for (let i = 0; i < Object.keys(array).length; i += 7) {
      temp.push(Object.fromEntries(Object.entries(array).slice(i, i + 7)));
    }
    setDatesArray(temp);
  }, [month, year]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Calendar</p>
      </div>
      {eventsPopup ? (
        <EventsPopUp view={eventsPopup} setView={setEventsPopup} />
      ) : null}
      <div className={styles.calendar}>
        <div className={styles.calendarTitle}>
          <div className={styles.prevButton}>
            <CircularButton
              label="<"
              handleClick={() => {
                if (month === 0) {
                  year = year - 1;
                  month = 12;
                }
                navigate(`/dashboard/calendar/${year}/${month}`);
              }}
            />
          </div>
          <div className={styles.nextButton}>
            <CircularButton
              label=">"
              handleClick={() => {
                month += 2;
                if (month > 12) {
                  year = year - 0 + 1;
                  month = 1;
                }
                navigate(`/dashboard/calendar/${year}/${month}`);
              }}
            />
          </div>
          <div className={styles.monthYear}>
            <p>{`${months[month]}  ${year}`}</p>
          </div>
        </div>
        <div className={styles.header}>
          {days.map((day, i) => (
            <div className={styles.dayNameCard} key={i}>
              <p>{day}</p>
            </div>
          ))}
        </div>
        <div className={styles.body}>
          {datesArray?.map((row, i) => (
            <div className={styles.row} id={row}>
              {Object.entries(row).map(([k, v]) => (
                <div
                  className={styles.dateCard}
                  onClick={() => {
                    setEventsPopup(k);
                  }}
                >
                  <p>{v}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
