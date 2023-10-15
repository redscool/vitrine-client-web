import React from "react";
import styles from "../styles_v2/pages_v2/Dashboard.module.css";
import { Route, Routes } from "react-router-dom";
import Home from "../components_v2/dashboard/Home";
import Spaces from "../components/dashboard/Spaces";
import Calendar from "../components/space/Calendar";
import Profile from "../components/dashboard/Profile";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <div className={styles.sidebar}></div>
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
