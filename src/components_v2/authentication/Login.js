import React, { useState } from "react";
import styles from "../../styles_v2/components_v2/authentication/Login.module.css";
import InputField from "../form_components/InputField";
import SignupWIthGoogle from "../SignupWIthGoogle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.mainContainer}>
      <div className={styles.rightContainer}>
        <SignupWIthGoogle />
        <InputField
          label="Email"
          placeholder="Enter Your Email"
          state={email}
          setState={setEmail}
        />
        <InputField
          label="Password"
          placeholder="Enter Your Password"
          state={password}
          setState={setPassword}
        />
        <div className={styles.forgetPassword}>
          <p>Forget Password?</p>
        </div>
        <div className={styles.solidButton}>
          <p>Log In</p>
        </div>
      </div>
      <div className={styles.leftContainer}>
        <img src="/welcome.svg" />
      </div>
    </div>
  );
}
