import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../../styles_v2/components_v2/dashboard/calendar/MonthlyView.module.css";

export default function MonthlyView() {
  const navigate = useNavigate();
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
  const [datesArray, setDatesArray] = useState(null);
  let month = useParams().month - 1;
  let year = useParams().year - 0;
  if (year != 0 && !year) year = new Date().getFullYear();
  if (month != 0 && !month) month = new Date().getMonth();
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
      array[tempDate] = [tempDayKey, true];
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
      array[tempDate] = [tempDayKey, false];
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
      array[tempDate] = [tempDayKey, true];
    }
    const temp = [];
    for (let i = 0; i < Object.keys(array).length; i += 7) {
      temp.push(Object.fromEntries(Object.entries(array).slice(i, i + 7)));
    }
    setDatesArray(temp);
  }, [month, year]);
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
            <p>{`${months[month]}  ${year}`}</p>
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
              <div className={styles.dateCard} id={row + v[0]}>
                <div
                  className={`${styles.date} ${v[1] ? styles.inactive : ""}`}
                >
                  <p>{v[0]}</p>
                </div>
                <div className={styles.topTasks}>
                  <p></p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
