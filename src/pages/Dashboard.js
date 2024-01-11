import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/pages/Dashboard.module.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../components/dashboard/Home";
import Calendar from "../components/dashboard/Calendar";
import Profile from "../components/dashboard/Profile";
import Sidebar from "../components/Sidebar";
import Spaces from "../components/dashboard/Spaces";
import { resource_request_with_access_token } from "../utils/Service";
import { useDispatch } from "react-redux";
import { setProfileKey } from "../redux/profileReducer";
import { ServiceContext } from "../utils/context/serviceContext";
import { useSelector } from "react-redux";
import { authKeySelector } from "../redux/authReducer";

export default function Dashboard() {
  const links = [
    {
      href: "home",
      displayText: "Home",
      disabled: false,
      notifs: [],
    },
    {
      href: "spaces",
      displayText: "Spaces",
      disabled: false,
      notifs: [],
    },
    {
      href: "profile",
      displayText: "Profile",
      disabled: false,
      notifs: ["hi"],
    },
    {
      href: "calendar",
      displayText: "Calendar",
      disabled: false,
      notifs: [],
    },
  ];
  const dispatch = useDispatch();
  const location = useLocation();
  const serviceObject = useContext(ServiceContext);
  const [selected, setSelected] = useState("");
  const type = useSelector(authKeySelector("type"));
  useEffect(() => {
    setSelected(location.pathname.split("/")[2]);
  }, [location]);
  useEffect(() => {
    serviceObject.request(
      "get",
      `/api/${type}/profile/view`,
      {},
      ({ data }) => {
        const requiredKeys = [
          "name",
          "instagram",
          "x",
          "linkedIn",
          "about",
          "workingHours",
          "offDays",
          "profilePicture",
          "coverPicture",
        ];
        for (const key of requiredKeys) {
          const value = data[key];
          dispatch(setProfileKey([key, value]));
        }
      },
      console.log
    );
    serviceObject.request(
      "get",
      `/api/${type}/getAllSpaces`,
      {},
      ({ data }) => {
        dispatch(setProfileKey(["spaces", data["spaces"]]));
      },
      console.log
    );
  }, []);
  return (
    <div className={styles.page}>
      <Sidebar selected={selected} links={links} />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/spaces" element={<Spaces />} />
        <Route exact path="/calendar/:year/:month" element={<Calendar />} />
        <Route
          exact
          path="/calendar/:year/:month/:day"
          element={<Calendar />}
        />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/*" element={<span> Not found </span>} />
      </Routes>
    </div>
  );
}
