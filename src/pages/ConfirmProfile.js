import React, { useState } from "react";
import styles from "../styles/pages/ForgotPassword.module.css";
import Select from "../components/form_components/Select";
import Modal from "../components/Modal";
import { useDispatch } from "react-redux";
import { authKeySelector, setAuthKey } from "../redux/authReducer";
import { auth_request } from "../utils/Service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ConfirmProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verifyProfileToken = useSelector(authKeySelector("verifyProfileToken"));
  const [selected, setSelected] = useState("");
  const options = ["Select", "Provider", "Consumer"];
  const [success, setSuccess] = useState("");
  const googleSignup = () => {
    if (!selected || selected == "Select") {
      setSuccess("Please Select a type");
      return;
    }
    let type = selected === "Consumer" ? "CONSUMER" : "PROVIDER";
    console.log(type);
    const body = { verifyProfileToken, type };
    auth_request(
      "post",
      "/api/auth/user/verifyProfile",
      body,
      ({ data }) => {
        for (const key in data) {
          const value = data[key];
          dispatch(setAuthKey([key, value]));
        }
        console.log(data);
        navigate("/dashboard");
      },
      console.log
    );
  };
  return (
    <div className={styles.mainContainer}>
      <Modal success={success} setSuccess={setSuccess} />
      <div className={styles.titleBar}>
        <img src="/logo.svg" />
      </div>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src="/lock.svg" />
        </div>
        <div className={styles.heading}>
          <p>Welcome</p>
        </div>
        <div className={styles.normalText}>
          <p>Select a Role to Continue.</p>
        </div>
        <Select
          label="Role"
          options={options}
          selectedItem={selected}
          setSelectedItem={setSelected}
        />
        <div className={styles.button} onClick={googleSignup}>
          <p>Continue</p>
        </div>
      </div>
    </div>
  );
}
