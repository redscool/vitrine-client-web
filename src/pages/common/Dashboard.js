import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import DropDown from "../../components/dashboard/DropDown";
import Branding from "../../components/Branding";
import Tabs from "../../components/dashboard/Tabs";
import styles from "../../styles/pages/Dashboard.module.css";
import Home from "../../components/dashboard/Home";
import Spaces from "../../components/dashboard/Spaces";
import Profile from "../../components/dashboard/Profile";
import { useDispatch, useSelector } from "react-redux";
import { authKeySelector } from "../../redux/authReducer";
import { auth_request } from "../../utils/Service";
import { setProfileKey } from "../../redux/profileReducer";
import Calendar from "../../components/dashboard/Calendar";

export default function Dashboard({ userType }) {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  console.log(new Date());
  const type = useSelector(authKeySelector("type"))?.toLowerCase();
  const profileId = useSelector(authKeySelector("profileId"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const body = { profileId };
    auth_request(
      "get",
      `/api/${type}/profile/view`,
      body,
      ({ data: { name, address } }) => {
        dispatch(setProfileKey(["name", name]));
      },
      console.log
    );
  }, []);
  const params = useParams();
  const [isDropDown, setIsDropDown] = useState(false);
  return (
    <div className={styles.page}>
      {isDropDown ? <DropDown /> : null}
      <div className={styles.navbar}>
        <Branding />
        <Tabs
          link={`/dashboard/`}
          selected={params["*"] === "home" || params["*"] === ""}
          navigate={navigate}
        >
          <p>Home</p>
        </Tabs>

        <Tabs
          link={`/dashboard/spaces`}
          selected={params["*"] === "spaces"}
          navigate={navigate}
        >
          <p>spaces</p>
        </Tabs>

        <Tabs
          link={`/dashboard/calender/${year}/${month}`}
          selected={params["*"].includes("calender")}
          navigate={navigate}
        >
          <p>Calender</p>
        </Tabs>

        <Tabs
          link={`/dashboard/profile`}
          selected={params["*"] === "profile"}
          navigate={navigate}
        >
          <p>Profile</p>
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
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/spaces" element={<Spaces />} />
          <Route exact path="/calender/:year/:month" element={<Calendar />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/*" element={<span> Not found </span>} />
        </Routes>
      </div>
    </div>
  );
}
