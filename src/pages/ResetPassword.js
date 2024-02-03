import React, { useState } from "react";
import styles from "../styles/pages/ResetPassword.module.css";
import InputFieldWithoutLabel from "../components/form_components/InputFieldWithoutLabel";
import Modal from "../components/Modal";
import { auth_request } from "../utils/Service";
import { useParams } from "react-router-dom";
export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [success, setSuccess] = useState(false);
  const onClickReset = () => {
    if (!password) {
      setSuccess("Please Enter Password");
      return;
    }
    if (!cpassword) {
      setSuccess("Please Confirm Password");
      return;
    }
    if (password !== cpassword) {
      setSuccess("Password didn't match");
      return;
    }
    auth_request(
      "post",
      "/api/auth/user/resetpassword",
      { token, password },
      ({ data }) => {
        setSuccess(data.message);
        localStorage.removeItem("accessToken");
      },
      ({ response }) => {
        setSuccess(response.data.message);
      }
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
          <p>Reset Password</p>
        </div>
        <div className={styles.normalText}>
          <p>Enter your new password</p>
        </div>
        <InputFieldWithoutLabel
          placeholder="Enter Your Password"
          state={password}
          setState={setPassword}
        />
        <InputFieldWithoutLabel
          placeholder="Confirm Your Password"
          state={cpassword}
          setState={setCpassword}
        />
        <div className={styles.button} onClick={onClickReset}>
          <p>Send Reset Link</p>
        </div>
      </div>
    </div>
  );
}
