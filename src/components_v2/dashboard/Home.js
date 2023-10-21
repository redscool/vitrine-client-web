import React, { useEffect, useState } from "react";
import styles from "../../styles_v2/components_v2/dashboard/Home.module.css";
import LiveEventBanner from "./home/LiveEventBanner";
import UpcomingEvent from "./home/UpcomingEvent";
import Switch from "../form_components/Switch";
import { themeSelector, toggleTheme } from "../../redux/settingReducer";
import { useSelector } from "react-redux";

export default function Home() {
  const theme = useSelector(themeSelector);
  const [value, setValue] = useState(theme === "dark");
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <LiveEventBanner
          bannerImage="/banner.svg"
          date="25"
          month="OCT"
          time="7:00 pm"
        />
        <div className={styles.lights}>
          <Switch value={value} setValue={setValue} theme={true} />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.upcomingEventsContainer}>
          <div className={styles.upcomingEventsContainerTitle}>
            <p>Upcoming Events</p>
          </div>

          <div className={styles.upcomingEventsContainerContent}>
            <UpcomingEvent />
            <UpcomingEvent />
            <UpcomingEvent />
            <UpcomingEvent />
          </div>
        </div>
        <div className={styles.notificationsContainer}></div>
      </div>
    </div>
  );
}
