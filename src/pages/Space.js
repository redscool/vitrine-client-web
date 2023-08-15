import React, { useEffect, useState } from "react";
import Branding from "../components/Branding";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Tabs from "../components/dashboard/Tabs";
import Home from "../components/space/Home";
import Calendar from "../components/space/Calendar";
import styles from "../styles/pages/Dashboard.module.css";
import DropDown from "../components/dashboard/DropDown";
import Chatbox from "../components/space/Chatbox";
import Exercise from "../components/space/Exercise";
import { resource_request_with_access_token } from "../utils/Service";
import { useDispatch } from "react-redux";
import { initChat } from "../redux/chatReducer";
import Form from "../components/space/exercise/Form";
import Shelf from "../components/space/Shelf";
import Folder from "../components/space/shelf/Folder";
export default function Space() {
  const navigate = useNavigate();
  const params = useParams();
  const [isDropDown, setIsDropDown] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const spaceId = params.spaceId;
  const dispatch = useDispatch();
  useEffect(() => {
    resource_request_with_access_token(
      "get",
      "/api/space/essential/getMessages",
      { spaceId },
      ({ data }) => {
        dispatch(initChat({ messages: data.data, spaceId }));
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
          name="Space"
          link={`/space/${spaceId}/`}
          selected={params["*"] === ""}
          navigate={navigate}
        >
          <p>Space</p>
        </Tabs>

        <Tabs
          link={`/space/${spaceId}/shelf`}
          selected={params["*"] === "shelf"}
          navigate={navigate}
        >
          <p>Shelf</p>
        </Tabs>

        <Tabs
          link={`/space/${spaceId}/exercise`}
          selected={params["*"] === "exercise"}
          navigate={navigate}
        >
          <p>Exercise</p>
        </Tabs>
        <div
          className={styles.dragDownButton}
          onClick={() => {
            setIsChatboxOpen(!isChatboxOpen);
          }}
        >
          <img src="/resources/chatButton.svg" alt="chat button icon" />
        </div>
        <Tabs link={`/space/${spaceId}/calendar`} navigate={navigate}>
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
          <Route exact path="/shelf" element={<Shelf />} />
          <Route exact path="/shelf/:folderId" element={<Folder />} />
          <Route exact path="/exercise" element={<Exercise />} />
          <Route exact path="/exercise/:formId" element={<Form />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route path="/*" element={<> Not found </>} />
        </Routes>
      </div>
    </div>
  );
}
