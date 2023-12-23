import styles from "../../styles_v2/components_v2/space/Calendar.module.css";
import { useContext, useEffect, useState } from "react";
import MonthlyView from "../MonthlyView";
import DailyView from "../DailyView";
import { useParams } from "react-router-dom";
import AddEventPopup from "./calendar/AddEventPopup";
import Modal from "../Modal";
import { ServiceContext } from "../../utils/context/serviceContext";
import { convertTime } from "../../utils/Misc";

export default function Calendar() {
  const params = useParams();
  const { spaceId } = params;
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
      "/api/calendar/getEventsForRangeSpace",
      {
        rangeStart: rangeStart.getTime(),
        rangeEnd: rangeEnd.getTime(),
        spaceId,
      },
      ({ data }) => {
        const tempEventsDictionary = {};
        const { events } = data;
        console.log(events);
        for (const event of events) {
          const {
            startTime,
            endTime,
            title,
            googleMeet,
            description,
            spaceId,
          } = event;
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
            spaceId,
          });
        }
        console.log(tempEventsDictionary);
        setEventsDictionary(tempEventsDictionary);
      },
      console.log
    );
  }, [month, year]);
  const [addEventPopup, setAddEventPopup] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <div className={styles.container}>
      {message ? <Modal success={message} setSuccess={setMessage} /> : null}
      {addEventPopup ? (
        <AddEventPopup setMessage={setMessage} setView={setAddEventPopup} />
      ) : null}
      <div className={styles.headerContainer}>
        <div className={styles.buttonsContainer}>
          {/* <div className={styles.buttons}>
            <p>Block Time</p>
          </div> */}
          <div
            className={`${styles.buttons} ${styles.buttonStyle1}`}
            onClick={() => setAddEventPopup(true)}
          >
            <p>Add Event</p>
          </div>
        </div>
      </div>
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
        />
      </div>
    </div>
  );
}
