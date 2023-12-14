import styles from "../../styles_v2/components_v2/space/Calendar.module.css";
import { useEffect, useState } from "react";
import Switch from "../form_components/Switch";
import MonthlyView from "./calendar/MonthlyView";
import DailyView from "./calendar/DailyView";
import { useNavigate, useParams } from "react-router-dom";
import AddEventPopup from "./calendar/AddEventPopup";
import Modal from "../Modal";

export default function Calendar() {
  const params = useParams();
  const { spaceId } = params;
  const navigate = useNavigate();
  const curDate = new Date();
  const curDay = curDate.getDate();
  const curMonth = curDate.getMonth() + 1;
  const curYear = curDate.getFullYear();
  const [monthlyView, setMonthlyView] = useState(params.day ? false : true);
  const [addEventPopup, setAddEventPopup] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <div className={styles.container}>
      {message ? <Modal success={message} setSuccess={setMessage} /> : null}
      {addEventPopup ? <AddEventPopup setMessage={setMessage} setView={setAddEventPopup}/> : null}
      <div className={styles.headerContainer}>
        <div className={styles.switchContainer}>
          <div className={styles.switchLabel}>
            <p>Monthly</p>
          </div>
          <Switch
            value={monthlyView}
            setValue={() => {
              console.log(monthlyView);
              if (!monthlyView) navigate(`/space/${spaceId}/calendar/`);
              else {
                navigate(
                  `/space/${spaceId}/calendar/${curYear}/${curMonth}/${curDay}`
                );
                console.log(curDay, curMonth, curYear);
              }
              setMonthlyView(!monthlyView);
            }}
          />
        </div>
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
        {monthlyView ? <MonthlyView /> : <DailyView />}
      </div>
    </div>
  );
}
