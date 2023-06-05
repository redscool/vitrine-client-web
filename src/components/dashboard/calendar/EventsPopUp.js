import Textbox from "../../form/Textbox";
import Button from "../../form/Button";
import styles from "../../../styles/components/dashboard/calendar/EventsPopUp.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../../redux/authReducer";
import EventsCard from "./EventsCard";
export default function EventsPopUp(props) {
  const { view, date } = props;
  return (
    <div className={styles.containerPopup}>
      <div className={styles.popup}>
        <img src="/close.png" alt="cancel" onClick={() => view(false)} />
        <h1>Events</h1>
        <div className={styles.topCtn}>
          <EventsCard
            startTime="11:00 AM"
            endTime="12:00 PM"
            title="Friend's Meet"
            description="This is description"
          />
          <EventsCard />
        </div>
      </div>
    </div>
  );
}
