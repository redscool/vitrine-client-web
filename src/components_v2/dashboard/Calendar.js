import styles from "../../styles_v2/components_v2/dashboard/Calendar.module.css";
import { useContext, useEffect, useState } from "react";
import Switch from "../form_components/Switch";
import MonthlyView from "./calendar/MonthlyView";
import DailyView from "./calendar/DailyView";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceContext } from "../../utils/context/serviceContext";

export default function Calendar() {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const serviceObject = useContext(ServiceContext);
  useEffect(() => {
    let { month, year } = params;
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
        rangeStart: rangeStart.toISOString(),
        rangeEnd: rangeEnd.toISOString(),
      },
      console.log,
      console.log
    );
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {show ? <DailyView date={date} setShow={setShow} /> : null}
        <MonthlyView setShow={setShow} setDate={setDate} />
      </div>
    </div>
  );
}
