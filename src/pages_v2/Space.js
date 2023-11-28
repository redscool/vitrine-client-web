import React, { useEffect, useState } from "react";
import styles from "../styles_v2/pages_v2/Dashboard.module.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "../components_v2/Sidebar";
import Chat from "../components_v2/space/Chat";
export default function Dashboard() {
  const links = [
    {
      href: "home",
      displayText: "Home",
      disabled: false,
      notifs: [],
    },
    {
      href: "shelf",
      displayText: "Shelf",
      disabled: false,
      notifs: [],
    },
    {
      href: "exercise",
      displayText: "Exercise",
      disabled: false,
      notifs: ["hi"],
    },
    {
      href: "page",
      displayText: "Page",
      disabled: false,
      notifs: [],
    },
    {
      href: "chat",
      displayText: "Chat",
      disabled: false,
      notifs: [],
    },
  ];
  const location = useLocation();
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(location.pathname.split("/")[2]);
  }, [location]);
  return (
    <div className={styles.page}>
      <Sidebar selected={selected} links={links} />
      <Routes>
        <Route exact path="/home" element={<></>} />
        <Route exact path="/" element={<></>} />
        <Route exact path="/shelf" element={<></>} />
        <Route exact path="/exercise" element={<></>} />
        <Route exact path="/page" element={<></>} />
        <Route exact path="/chat" element={<Chat />} />
        <Route path="/*" element={<span> Not found </span>} />
      </Routes>
    </div>
  );
}
