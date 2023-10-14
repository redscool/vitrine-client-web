import React, { useState } from "react";
import styles from "../styles_v2/pages_v2/ForgotPassword.module.css";
import InputFieldWithoutLabel from "../components_v2/form_components/InputFieldWithoutLabel";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <div className={styles.mainContainer}>
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
        <div className={styles.button}>
          <p>Send Reset Link</p>
        </div>
      </div>
    </div>
  );
}
