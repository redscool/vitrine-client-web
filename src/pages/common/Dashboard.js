import React, { useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import DropDown from "../../components/dashboard/DropDown";
import Branding from "../../components/Branding";
import Tabs from "../../components/dashboard/Tabs";
import styles from "../../styles/pages/Dashboard.module.css";
import Home from "../../components/dashboard/Home";
import Spaces from "../../components/dashboard/Spaces";
import Calender from "../../components/dashboard/Calender";
import Profile from "../../components/dashboard/Profile";
export default function Dashboard({ userType }) {
  const navigate = useNavigate();
  const params = useParams();
  const [isDropDown, setIsDropDown] = useState(false);
  return (
    <div className={styles.page}>
      {isDropDown ? <DropDown /> : null}
      <div className={styles.navbar}>
        <Branding />
        <Tabs
          name="Home"
          link={`/${userType}/dashboard/`}
          selected={params["*"] === "home" || params["*"] === ""}
          navigate={navigate}
        />

        <Tabs
          name="Spaces"
          link={`/${userType}/dashboard/spaces`}
          selected={params["*"] === "spaces"}
          navigate={navigate}
        />

        <Tabs
          name="Calender"
          link={`/${userType}/dashboard/calender`}
          selected={params["*"] === "calender"}
          navigate={navigate}
        />

        <Tabs
          name="Profile"
          link={`/${userType}/dashboard/profile`}
          selected={params["*"] === "profile"}
          navigate={navigate}
        />
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
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/spaces" element={<Spaces />} />
          <Route exact path="/calender" element={<Calender />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
