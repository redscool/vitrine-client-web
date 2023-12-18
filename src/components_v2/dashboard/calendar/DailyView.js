import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../styles_v2/components_v2/dashboard/calendar/DailyView.module.css";
import Event from "./dailyView/Event";
import { useEffect, useState } from "react";

export default function DailyView({ date, setShow }) {
  return (
    <div className={styles.container} onClick={()=>setShow(false)}>
      <div className={styles.calendar}>
        <div className={styles.title}>
          <div className={styles.calendarTitle}>
            <div className={`${styles.Button}`}>
              <p>&lt;</p>
            </div>
            <div className={styles.monthYear}>
              <p>{date}</p>
            </div>
            <div className={`${styles.Button}`}>
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
    </div>
  );
}
