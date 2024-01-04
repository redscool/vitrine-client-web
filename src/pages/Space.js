import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/pages/Dashboard.module.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Chat from "../components/space/Chat";
import Calendar from "../components/space/Calendar";
import Shelf from "../components/space/Shelf";
import Folder from "../components/space/shelf/Folder";
import Page from "../components/space/Page";
import Home from "../components/space/Home";
import SpacesNavbar from "../components/space/SpacesNavbar";
import { ServiceContext } from "../utils/context/serviceContext";
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
      href: "shelf",
      displayText: "Shelf",
      disabled: false,
      notifs: [],
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
    {
      href: "calendar",
      displayText: "Calendar",
      disabled: false,
      notifs: [],
    },
  ];
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const serviceObject = useContext(ServiceContext);
  useEffect(() => {
    setSelected(location.pathname.split("/")[3]);
  }, [location]);
  useEffect(() => {
    serviceObject.request(
      "get",
      "/api/provider/getAllSpaces",
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
        <Route exact path="/shelf" element={<Shelf />} />
        <Route exact path="/shelf/:folderId" element={<Folder />} />
        <Route exact path="/page" element={<Page />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/Calendar" element={<Calendar />} />
        <Route exact path="/calendar/:year/:month" element={<Calendar />} />
        <Route path="/*" element={<span> Not found </span>} />
      </Routes>
      {selected !== "page" && selected !== "calendar" ? <SpacesNavbar /> : null}
    </div>
  );
}
