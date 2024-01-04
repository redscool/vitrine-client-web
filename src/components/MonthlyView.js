import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/components/MonthlyView.module.css";

export default function MonthlyView({
  setShow,
  setDate,
  eventsDictionary,
  root,
}) {
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
    const firstDateOfMonth = new Date(year, month);
    const firstDayOfMonth = firstDateOfMonth.getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0);
    const lastDayOfMonth = lastDateOfMonth.getDay();
    const daysInMonth = lastDateOfMonth.getDate();
    for (let i = firstDayOfMonth; i > 0; i--) {
      const tempDateObj = new Date(firstDateOfMonth - 24 * 3600000 * i);
      const tempDayKey = tempDateObj.getDate();
      array.push([tempDayKey, true]);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const tempDateObj = new Date(firstDateOfMonth - 24 * 3600000 * (1 - i));
      const tempDayKey = tempDateObj.getDate();
      array.push([tempDayKey, false]);
    }
    for (let i = lastDayOfMonth + 1; i < 7; i++) {
      const tempDateObj = new Date(
        lastDateOfMonth - 24 * 3600000 * (lastDayOfMonth - i)
      );
      const tempDayKey = tempDateObj.getDate();
      array.push([tempDayKey, true]);
    }
    const temp = [];
    for (let i = 0; i < Object.keys(array).length; i += 7)
      temp.push(array.slice(i, i + 7));
    setDatesArray(temp);
  }, [month, year]);

  const { spaceId } = useParams();
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
              navigate(
                `/${root}${
                  root == "space" ? `/${spaceId}` : ""
                }/calendar/${year}/${month}`
              );
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
                year = +year + 1;
                month = 1;
              }
              navigate(
                `/${root}${
                  root == "space" ? `/${spaceId}` : ""
                }/calendar/${year}/${month}`
              );
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
          <div className={styles.row} key={i}>
            {row.map((v, j) => (
              <div
                className={styles.dateCard}
                key={i * 7 + j}
                onClick={() => {
                  if (!v[1]) {
                    setDate(v[0]);
                    setShow(true);
                  }
                }}
              >
                <div
                  className={`${styles.date} ${v[1] ? styles.inactive : ""}`}
                >
                  <p>{v[0]}</p>
                </div>
                <div className={styles.topTasks}>
                  {!v[1] &&
                    eventsDictionary[v[0]]?.map((events, indx) => (
                      <div
                        className={styles.task}
                        key={indx}
                        style={indx > 1 ? { display: "none" } : {}}
                      >
                        <div
                          className={`${styles.indicator} ${
                            styles[`color${Math.floor(Math.random() * 4)}`]
                          }`}
                        ></div>
                        <div className={styles.details}>
                          <p>
                            {events.start} - {events.title}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
