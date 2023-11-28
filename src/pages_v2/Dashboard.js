import React, { useEffect, useState } from "react";
import styles from "../styles_v2/pages_v2/Dashboard.module.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../components_v2/dashboard/Home";
import Calendar from "../components_v2/dashboard/Calendar";
import Profile from "../components_v2/dashboard/Profile";
import Sidebar from "../components_v2/Sidebar";
import Spaces from "../components_v2/dashboard/Spaces";
import { resource_request_with_access_token } from "../utils/Service";
import { useDispatch } from "react-redux";
import { setProfileKey } from "../redux/profileReducer";

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
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(location.pathname.split("/")[2]);
  }, [location]);
  useEffect(() => {
    resource_request_with_access_token(
      "get",
      "/api/provider/profile/view",
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
          "spaces",
        ];
        for (const key of requiredKeys) {
          const value = data[key];
          dispatch(setProfileKey([key, value]));
        }
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
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/*" element={<span> Not found </span>} />
      </Routes>
    </div>
  );
}
