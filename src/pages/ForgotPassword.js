import React, { useState } from "react";
import styles from "../styles/pages/ForgotPassword.module.css";
import InputFieldWithoutLabel from "../components/form_components/InputFieldWithoutLabel";
import Modal from "../components/Modal";
import { auth_request } from "../utils/Service";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const onClickReset = () => {
    if (!email) {
      setSuccess("Please Enter a Valid Email");
      return;
    }
    auth_request(
      "post",
      "/api/auth/user/forgotpassword",
      { email },
      ({ data }) => {
        setSuccess(data.message);
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
          <p>Forgot Password?</p>
        </div>
        <div className={styles.normalText}>
          <p>
            Enter your account email to get a reset <br /> password link on your
            email address
          </p>
        </div>
        <InputFieldWithoutLabel
          placeholder="Enter Your Email"
          state={email}
          setState={setEmail}
        />
        <div className={styles.button} onClick={onClickReset}>
          <p>Send Reset Link</p>
        </div>
      </div>
    </div>
  );
}
