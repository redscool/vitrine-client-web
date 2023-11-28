import styles from "../../styles_v2/components_v2/dashboard/Calendar.module.css";
import { useState } from "react";
import Switch from "../form_components/Switch";
import MonthlyView from "./calendar/MonthlyView";
import DailyView from "./calendar/DailyView";

export default function Calendar() {
  const [monthlyView, setMonthlyView] = useState(true);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.switchContainer}>
          <div className={styles.switchLabel}>
            <p>Monthly</p>
          </div>
          <Switch
            value={monthlyView}
            setValue={() => setMonthlyView(!monthlyView)}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttons}>
            <p>Block Time</p>
          </div>
          <div className={`${styles.buttons} ${styles.buttonStyle1}`}>
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
