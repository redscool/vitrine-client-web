import React from "react";
import styles from "../../styles/components/dashboard/DropDown.module.css";
import Option from "./dropdown/Option";
import Switch from "../form/Switch";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, themeSelector } from "../../redux/settingReducer";
import { useNavigate } from "react-router-dom";
import { auth_request } from "../../utils/Service";
import { authKeySelector, resetAuth } from "../../redux/authReducer";
import { notifyMe } from "../../utils/BrowserNotification";
export default function DropDown() {
  const navigate = useNavigate();
  const THEME = useSelector(themeSelector);
  const dispatch = useDispatch();
  const onThemeToggle = (isChecked) => {
    const theme = isChecked ? "dark-theme" : "light-theme";
    dispatch(setTheme(theme));
  };
  const userId = useSelector(authKeySelector("userId"));
  return (
    <div className={styles.container}>
      <Option
        label="Logout"
        icon="/resources/logout.png"
        handleClick={() => {
          const body = { userId };
          auth_request(
            "post",
            "/api/auth/access/logoutEverywhere",
            body,
            (res) => {
              console.log(res.data);
              dispatch(resetAuth());
              navigate("/login");
            },
            console.log
          );
        }}
      />
      <Option
        label="Dark Mode"
        icon="/resources/Darkmode.png"
        switchButton={
          <Switch
            overrideState={THEME !== "light-theme"}
            onToggle={onThemeToggle}
          />
        }
      />
      <Option
        label="push notification"
        icon="/resources/Darkmode.png"
        handleClick={() => {
          notifyMe();
        }}
      />
    </div>
  );
}
