import React, { useState } from "react";
import Branding from "../components/Branding";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Tabs from "../components/dashboard/Tabs";
import Home from "../components/dashboard/Home";
import Spaces from "../components/dashboard/Spaces";
import Profile from "../components/dashboard/Profile";
import Calender from "../components/dashboard/Calender";
import styles from "../styles/pages/Dashboard.module.css";
import DropDown from "../components/dashboard/DropDown";
export default function ClassSpace() {
  const navigate = useNavigate();
  const params = useParams();
  const [isDropDown, setIsDropDown] = useState(false);
  return (
    <div className={styles.page}>
      {isDropDown ? <DropDown /> : null}
      <div className={styles.navbar}>
        <Branding />
        <Tabs
          name="Class"
          link={`/class`}
          selected={params["*"] === "class"}
          navigate={navigate}
        />

        <Tabs
          name="Shelf"
          link={`/shelf`}
          selected={params["*"] === "shelf"}
          navigate={navigate}
        />

        <Tabs
          name="Excercise"
          link={`/excercise`}
          selected={params["*"] === "excercise"}
          navigate={navigate}
        />

        <div className={styles.chatButton}>
          <img src="/resources/chatButton.svg" alt="chat button icon" />
        </div>

        <div className={styles.calenderButton}>
          <img src="/resources/calender.svg" alt="calender icon" />
        </div>
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
          <Route exact path="/class" element={<h1>home</h1>} />
          <Route exact path="/shelf" element={<h1>shelf</h1>} />
          <Route exact path="/excercise" element={<h1>Calender</h1>} />
          <Route path="/*" element={<> Not found </>} />
        </Routes>
      </div>
    </div>
  );
}
