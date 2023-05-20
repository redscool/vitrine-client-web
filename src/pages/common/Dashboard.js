import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import DropDown from "../../components/dashboard/DropDown";
import Branding from "../../components/Branding";
import Tabs from "../../components/dashboard/Tabs";
import styles from "../../styles/pages/Dashboard.module.css";
import Home from "../../components/dashboard/Home";
import Spaces from "../../components/dashboard/Spaces";
import Calender from "../../components/dashboard/Calender";
import Profile from "../../components/dashboard/Profile";
import { useDispatch, useSelector } from "react-redux";
import { authKeySelector } from "../../redux/authReducer";
import { auth_request } from "../../utils/Service";
import { setProfileKey } from "../../redux/profileReducer";

export default function Dashboard({ userType }) {
  const type = useSelector(authKeySelector("type"))?.toLowerCase();
  const profileId = useSelector(authKeySelector("profileId"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userType !== type) {
      navigate(`/${type}/dashboard/`);
    }
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
