import React, { useState } from "react";
import Button from "../form/Button";
import config from "../../config.json";
import { useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import Textbox from "../form/Textbox";
import { resource_request_with_access_token } from "../../utils/Service";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../redux/authReducer";
// import { googleAuth } from "../GoogleAuth";
const googleAuth = () => undefined;

const stringifiedParams = queryString.stringify(config.GOOGLE_EVENT);
const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export default function Calendar() {
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const meetAttendees = [
    { email: "jrvineetoli52.2@gmail.com" },
    { email: "kulbois007@gmail.com" },
  ];
  const [participants, setParticipants] = useState([
    "647b230376d2e9e6bd30cabe",
    "647b2522d2a252177f4b0d85",
  ]);
  const params = useParams();
  const spaceId = params.spaceId;
  const googleAccessToken = useSelector(
    authKeySelector("googleAuth")
  )?.access_token;

  return (
    <div styles="width:60vw; height:90vh">
      <Button label="Add Call" handleClick={() => setPopUp(true)} />
      {popUp ? (
        <Button label="Login with google" handleClick={googleAuth} />
      ) : (
        <></>
      )}
      <Button
        label="Create Meet"
        handleClick={() => {
          resource_request_with_access_token(
            "post",
            "/api/space/calendar/addcall",
            {
              googleAccessToken,
              title,
              spaceId,
              description: "This is description",
              startTime: new Date(startTime).toISOString(),
              endTime: new Date(endTime).toISOString(),
              meetAttendees,
              participants,
            },
            console.log,
            console.log
          );
        }}
      />
      <Textbox
        label="start time"
        type="datetime-local"
        state={startTime}
        setState={setStartTime}
      />
      <Textbox
        label="end time"
        type="datetime-local"
        state={endTime}
        setState={setEndTime}
      />
      <Textbox label="Title" type="text" state={title} setState={setTitle} />
    </div>
  );
}
