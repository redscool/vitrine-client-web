import React, { useState } from "react";
import styles from "../styles/pages/ForgetPassword.module.css";
import { auth_request } from "../utils/Service";
import Textbox from "../components/form/Textbox";
import Button from "../components/form/Button";
export default function ForgetPassword() {
  const onClickReset = () => {
    auth_request(
      "post",
      "/api/auth/user/forgotpassword",
      { email },
      console.log,
      console.log
    );
  };
  const [email, setEmail] = useState();
  return (
    <div className={styles.mainPage}>
      <div className={styles.form}>
        <Textbox label="Email" state={email} setState={setEmail} type="email" />
        <Button label="Reset" handleClick={onClickReset} />
      </div>
    </div>
  );
}
