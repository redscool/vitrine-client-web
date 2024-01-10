import React, { useContext, useState } from "react";
import InputField from "../../form_components/InputField";
import styles from "../../../styles/components/space/calendar/AddEventPopup.module.css";
import { useDispatch } from "react-redux";
import { setProfileKey } from "../../../redux/profileReducer";
import { ServiceContext } from "../../../utils/context/serviceContext";
import InputFieldDateTime from "../../form_components/InputFieldDateTime";
import { useParams } from "react-router-dom";
import config from "../../../config.json";
import queryString from "query-string";
import { setEventsKey } from "../../../redux/eventsReducer";

export default function AddEventPopup({ setView, setMessage }) {
  const { spaceId } = useParams();
  const dispatch = useDispatch();
  const serviceObject = useContext(ServiceContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const handleClick = () => {
    if (!title) {
      setMessage("Title cannot be empty.");
      setView(false);
      return;
    }
    if (!description) {
      setMessage("Description cannot be empty.");
      setView(false);
      return;
    }
    if (!startTime) {
      setMessage("Start time cannot be empty.");
      setView(false);
      return;
    }

    if (!endTime) {
      setMessage("End time cannot be empty.");
      setView(false);
      return;
    }
    if (endTime < startTime) {
      setMessage("start time should be greater than end time.");
      setView(false);
      return;
    }
    serviceObject.request(
      "post",
      "/api/space/calendar/addcall",
      {
        title,
        spaceId,
        description,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      },
      (response) => {
        console.log("response", response);
        let { data, status } = response;

        if (status == 204) {
          // integrate google again
          const stringifiedParams = queryString.stringify(
            config.GOOGLE_INTEGRATION
          );
          const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

          window.open(googleLoginUrl);
        } else {
          setMessage(response.data.message);
          dispatch(setEventsKey(response.data.events));
        }
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
            <p>Add Event</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label="Title"
          placeholder="Title"
          state={title}
          setState={setTitle}
        />
        <InputField
          label="Description"
          placeholder="Description"
          state={description}
          setState={setDescription}
        />
        <InputFieldDateTime
          label="Start Time"
          placeholder={"Start Time"}
          setState={setStartTime}
          state={startTime}
        />
        <InputFieldDateTime
          label="End Time"
          placeholder="End Time"
          state={endTime}
          setState={setEndTime}
        />
        <div className={styles.button} onClick={handleClick}>
          <p>Add Event</p>
        </div>
      </div>
    </div>
  );
}
