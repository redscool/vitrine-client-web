import React, { useState } from "react";
import Select from "../../form_components/Select";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateSettingPopup.module.css";
import CheckBox from "../../../components/form/CheckBox";
export default function UpdateSettingPopup({ view, setView }) {
  const options = ["Select"];
  const [startTime, setStartTime] = useState("Select");
  const [endTime, setEndTime] = useState("Select");
  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  return (
    <div
      className={`${styles.mainContainer} ${view ? "" : styles.hide}`}
      onClick={() => setView(false)}
    >
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>One on One Settings</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <div className={styles.settingsContainer}>
          <div className={styles.time}>
            <div className={styles.startTime}>
              <Select
                label="Start Time"
                options={options}
                selectedItem={startTime}
                setSelectedItem={setStartTime}
              />
            </div>
            <div className={styles.endTime}>
              <Select
                label="End Time"
                options={options}
                selectedItem={endTime}
                setSelectedItem={setEndTime}
              />
            </div>
          </div>
          <div className={styles.offDaysContainer}>
            <div className={styles.offDaysTitle}>
              <p>Off Days</p>
            </div>
            <div className={styles.days}>
              <div className={styles.column1}>
                <CheckBox
                  check={saturday}
                  setCheck={setSaturday}
                  label="Saturday"
                />
                <CheckBox check={monday} setCheck={setMonday} label="Monday" />
                <CheckBox
                  check={wednesday}
                  setCheck={setWednesday}
                  label="Wednesday"
                />
                <CheckBox check={friday} setCheck={setFriday} label="Friday" />
              </div>
              <div className={styles.column2}>
                <CheckBox check={sunday} setCheck={setSunday} label="Sunday" />
                <CheckBox
                  check={tuesday}
                  setCheck={setTuesday}
                  label="Tuesday"
                />
                <CheckBox
                  check={thursday}
                  setCheck={setThursday}
                  label="Thursday"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
