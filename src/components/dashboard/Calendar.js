import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/components/dashboard/Calendar.module.css";
import { useEffect, useState } from "react";
import CircularButton from "../form/CircularButton";

export default function Calendar() {
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
  let year = useParams().year;
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  useEffect(() => {
    const array = [];
    const firstDayOfMonth = new Date(year, month).getDay();
    const firstDateOfMonth = new Date(year, month);
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = firstDayOfMonth; i > 0; i--)
      array.push(new Date(firstDateOfMonth - 24 * 3600000 * i).getDate());
    for (let i = 1; i <= daysInMonth; i++) array.push(i);
    for (let i = lastDayOfMonth + 1; i < 7; i++) {
      array.push(
        new Date(
          24 * 3600000 * (i - lastDayOfMonth - 1) +
            lastDateOfMonth.getMilliseconds()
        ).getDate()
      );
    }
    const temp = [];
    for (let i = 0; i < array.length; i += 7) {
      const tempAr = [];
      for (let j = i; j < i + 7; j++) tempAr.push(array[j]);
      temp.push(tempAr);
    }
    setDatesArray(temp);
  }, [month]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Calendar</p>
      </div>
      <div className={styles.calendar}>
        <div className={styles.calendarTitle}>
          <div className={styles.prevButton}>
            <CircularButton
              label="<"
              handleClick={() => {
                if (month == 0) {
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
            <div className={styles.row} key={i}>
              {row.map((date, j) => (
                <div className={styles.dateCard} key={j}>
                  <p>{date}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
