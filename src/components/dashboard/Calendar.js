import styles from "../../styles/components/dashboard/Calendar.module.css";
import { useContext, useEffect, useState } from "react";
import MonthlyView from "../MonthlyView";
import DailyView from "../DailyView";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceContext } from "../../utils/context/serviceContext";
import {convertTime} from "../../utils/Misc";

export default function Calendar() {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const serviceObject = useContext(ServiceContext);
  const [eventsDictionary, setEventsDictionary] = useState({});
  let { month, year } = params;
  useEffect(() => {
    if (!month) {
      month = new Date().getMonth() + 1;
      year = new Date().getFullYear();
    }
    const rangeStart = new Date(year, month - 1);
    const rangeEnd = new Date(new Date(year, month) - 1);
    serviceObject.request(
      "get",
      "/api/calendar/getEventsForRange",
      {
        rangeStart: rangeStart.getTime(),
        rangeEnd: rangeEnd.getTime(),
      },
      ({ data }) => {
        const tempEventsDictionary = {};
        const { events } = data;
        for (const event of events) {
          const { startTime, endTime, title, googleMeet, description } = event;
          const sTime = new Date(startTime),
            eTime = new Date(endTime);
          const date = sTime.getDate();
          const start = convertTime(sTime);
          const end = convertTime(eTime);
          if (!tempEventsDictionary[date]) tempEventsDictionary[date] = [];
          tempEventsDictionary[date].push({
            start,
            end,
            title,
            googleMeet,
            description,
          });
        }
        setEventsDictionary(tempEventsDictionary);
      },
      console.log
    );
  }, [month, year]);
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {show ? (
          <DailyView
            date={date}
            setShow={setShow}
            eventsDictionary={eventsDictionary}
          />
        ) : null}
        <MonthlyView
          setShow={setShow}
          setDate={setDate}
          eventsDictionary={eventsDictionary}
          root={"dashboard"}
        />
      </div>
    </div>
  );
}
