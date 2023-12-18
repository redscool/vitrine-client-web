import React, { useContext, useState } from "react";
import Select from "../../form_components/Select";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateSettingPopup.module.css";
import CheckBox from "../../../components/form/CheckBox";
import { useDispatch } from "react-redux";
import { ServiceContext } from "../../../utils/context/serviceContext";
import { setProfileKey } from "../../../redux/profileReducer";
export default function UpdateSettingPopup({
  setView,
  setMessage,
  ooffDays,
  oworkingHours,
}) {
  const options = [
    "Select",
    "12 am",
    "01 am",
    "02 am",
    "03 am",
    "04 am",
    "05 am",
    "06 am",
    "07 am",
    "08 am",
    "09 am",
    "10 am",
    "11 am",
    "12 pm",
    "01 pm",
    "02 pm",
    "03 pm",
    "04 pm",
    "05 pm",
    "06 pm",
    "07 pm",
    "08 pm",
    "09 pm",
    "10 pm",
    "11 pm",
  ];
  const dispatch = useDispatch();
  const serviceObject = useContext(ServiceContext);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);

  const handleClick = () => {
    let workingHours = oworkingHours;
    if (startTime && endTime) {
      workingHours = `${options[startTime]} - ${options[endTime]}`;
    }
    const offDays = [];
    if (sunday) offDays.push("Sunday");
    if (monday) offDays.push("Monday");
    if (tuesday) offDays.push("Tuesday");
    if (wednesday) offDays.push("Wednesday");
    if (thursday) offDays.push("Thursday");
    if (friday) offDays.push("Friday");
    if (saturday) offDays.push("Saturday");
    serviceObject.request(
      "post",
      "/api/provider/profile/update",
      { offDays, workingHours },
      ({ data }) => {
        setMessage(data.message);
        dispatch(setProfileKey(["workingHours", workingHours]));
        dispatch(setProfileKey(["offDays", offDays]));
      },
      console.log
    );
    setView(false);
  };
  return (
    <div className={`${styles.mainContainer}`} onClick={() => setView(false)}>
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
        <div className={styles.button} onClick={handleClick}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
