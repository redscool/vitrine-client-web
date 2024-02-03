import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/components/dashboard/Home.module.css";
import LiveEventBanner from "./home/LiveEventBanner";
import UpcomingEvent from "./home/UpcomingEvent";
import Switch from "../form_components/Switch";
import { themeSelector, toggleTheme } from "../../redux/settingReducer";
import { useSelector, useDispatch } from "react-redux";
import { ServiceContext } from "../../utils/context/serviceContext";
import { convertTime, getFileURL } from "../../utils/Misc";
import {
  notificationsSelector,
  resetNotifications,
} from "../../redux/notificationReducer";
import MessageNotifcation from "./home/MessageNotification";

export default function Home() {
  const dispatch = useDispatch();
  const [bannerImage, setBannerImage] = useState("/banner.svg");
  const theme = useSelector(themeSelector);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const serviceObject = useContext(ServiceContext);
  const notifications = useSelector(notificationsSelector());
  const getUpcomingEvents = async () => {
    await serviceObject.request(
      "get",
      "/api/calendar/getUpcomingEvents",
      { rangeStart: new Date().toISOString() },
      ({ data }) => {
        const tempEvents = [];
        const { events } = data;
        for (const event of events) {
          const { startTime, title, description, spaceId } = event;
          const sTime = new Date(startTime);
          const date = sTime.getDate();
          const month = sTime.toDateString().substring(4, 7).toUpperCase();
          const time = convertTime(sTime);
          tempEvents.push({
            time,
            date,
            month,
            title,
            description,
            spaceId,
          });
        }
        setUpcomingEvents(tempEvents);
      },
      () => undefined
    );
  };
  useEffect(() => {
    getUpcomingEvents();
  }, []);
  useEffect(() => {
    if (upcomingEvents) {
      const spaceId = upcomingEvents[0]?.spaceId;
      if (spaceId) {
        serviceObject.request(
          "get",
          "/api/provider/getspace",
          { spaceId },
          ({ data }) => {
            const { space } = data;
            setBannerImage(getFileURL(space.coverPicture));
          },
          () => undefined
        );
      }
    }
  }, [upcomingEvents]);
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <LiveEventBanner
          bannerImage={bannerImage}
          event={upcomingEvents ? upcomingEvents[0] : {}}
          noContent={upcomingEvents && upcomingEvents.length ? false : true}
        />
        <div className={styles.utilitiesContainer}>
          <div className={styles.utility}>
            <div className={styles.utilityLabel}>
              <p>Lights</p>
            </div>
            <Switch
              value={theme === "dark"}
              setValue={() => dispatch(toggleTheme())}
            />
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.upcomingEventsContainer}>
          <div className={styles.upcomingEventsContainerTitle}>
            <p>Upcoming Events</p>
          </div>

          <div className={styles.upcomingEventsContainerContent}>
            {upcomingEvents && upcomingEvents.length ? (
              upcomingEvents?.map((event, ind) => (
                <UpcomingEvent key={ind} event={event} />
              ))
            ) : (
              <p>No Upcoming Events</p>
            )}
          </div>
        </div>
        <div className={styles.notificationsContainer}>
          <div className={styles.nTopContainer}>
            <div className={styles.nTitle}>
              <p>Notifications</p>
            </div>
            <div
              className={styles.clearButton}
              onClick={()=>dispatch(resetNotifications())}
            >
              <p>Clear</p>
            </div>
          </div>
          <div className={styles.nContainer}>
            {notifications?.map((messageObj, i) => (
              <MessageNotifcation messageObj={messageObj} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
