import Textbox from "../../form/Textbox";
import Button from "../../form/Button";
import styles from "../../../styles/components/dashboard/calendar/EventsPopUp.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventsCard from "./EventsCard";
import { eventsKeySelector } from "../../../redux/eventsReducer";
export default function EventsPopUp({ view, setView }) {
  const events = useSelector(eventsKeySelector(view));
  console.log(events);
  return (
    <div className={styles.containerPopup}>
      <div className={styles.popup}>
        <img src="/close.png" alt="cancel" onClick={() => setView(false)} />
        <h1>Events</h1>
        <div className={styles.topCtn}>
          {events?.map((event) => (
            <EventsCard event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
