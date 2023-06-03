import React, { useState } from "react";
import Branding from "../components/Branding";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Tabs from "../components/dashboard/Tabs";
import Home from "../components/dashboard/Home";
import Spaces from "../components/dashboard/Spaces";
import Profile from "../components/dashboard/Profile";
import Calendar from "../components/class/Calendar";
import styles from "../styles/pages/Dashboard.module.css";
import DropDown from "../components/dashboard/DropDown";
export default function ClassSpace() {
  const navigate = useNavigate();
  const params = useParams();
  const [isDropDown, setIsDropDown] = useState(false);
  const classId = params.classId;
  return (
    <div className={styles.page}>
      {isDropDown ? <DropDown /> : null}
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

        <Tabs link={`/class/${classId}/chat`} navigate={navigate}>
          <div className={styles.chatButton}>
            <img src="/resources/chatButton.svg" alt="chat button icon" />
          </div>
        </Tabs>
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
          <Route exact path="/" element={<span>home</span>} />
          <Route exact path="/shelf" element={<span>shelf</span>} />
          <Route exact path="/excercise" element={<span>Excercise</span>} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route path="/*" element={<> Not found </>} />
        </Routes>
      </div>
    </div>
  );
}
