import React, { useEffect, useState } from "react";
import Branding from "../components/Branding";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Tabs from "../components/dashboard/Tabs";
import Home from "../components/class/Home";
import Calendar from "../components/class/Calendar";
import styles from "../styles/pages/Dashboard.module.css";
import DropDown from "../components/dashboard/DropDown";
import Chatbox from "../components/class/Chatbox";
import Excercise from "../components/class/Excercise";
import { resource_request_with_access_token } from "../utils/Service";
import { useDispatch } from "react-redux";
import { initChat } from "../redux/chatReducer";
export default function ClassSpace() {
  const navigate = useNavigate();
  const params = useParams();
  const [isDropDown, setIsDropDown] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const classId = params.classId;
  const dispatch = useDispatch();
  useEffect(() => {
    resource_request_with_access_token(
      "get",
      "/api/class/essential/getMessages",
      { classId },
      ({ data }) => {
        dispatch(initChat({ messages: data.data, classId }));
      },
      console.log
    );
  });
  return (
    <div className={styles.page}>
      {isDropDown ? <DropDown /> : null}
      {isChatboxOpen ? <Chatbox /> : null}
      <div className={styles.navbar}>
        <Branding />
        <Tabs
          name="Class"
          link={`/class/${classId}/`}
          selected={params["*"] === ""}
          navigate={navigate}
        >
          <p>Class</p>
        </Tabs>

        <Tabs
          link={`/class/${classId}/shelf`}
          selected={params["*"] === "shelf"}
          navigate={navigate}
        >
          <p>Shelf</p>
        </Tabs>

        <Tabs
          link={`/class/${classId}/excercise`}
          selected={params["*"] === "excercise"}
          navigate={navigate}
        >
          <p>Excercise</p>
        </Tabs>
        <div
          className={styles.dragDownButton}
          onClick={() => {
            setIsChatboxOpen(!isChatboxOpen);
          }}
        >
          <img src="/resources/chatButton.svg" alt="chat button icon" />
        </div>
        <Tabs link={`/class/${classId}/calendar`} navigate={navigate}>
          <div className={styles.calendarButton}>
            <img src="/resources/calendar.svg" alt="calendar icon" />
          </div>
        </Tabs>

        <div
          className={styles.dragDownButton}
          onClick={() => {
            setIsDropDown(!isDropDown);
          }}
        >
          <img src="/resources/dragdownlogo.svg" alt="drag down icon" />
        </div>
      </div>

      <div className={styles.mainContainer}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shelf" element={<span>shelf</span>} />
          <Route exact path="/excercise" element={<Excercise />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route path="/*" element={<> Not found </>} />
        </Routes>
      </div>
    </div>
  );
}
