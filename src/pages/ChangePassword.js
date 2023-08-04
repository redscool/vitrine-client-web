import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/pages/ChangePassword.module.css";
import { auth_request } from "../utils/Service";
import Textbox from "../components/form/Textbox";
import Button from "../components/form/Button";
export default function ChangePassword() {
  const params = useParams();
  const { token } = params;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const onClickReset = () => {
    if (password !== cpassword) {
      alert("Password didn't match");
      return;
    }
    setLoading(true);
    auth_request(
      "post",
      "/api/auth/user/resetpassword",
      { token, password },
      ({ data }) => {
        setLoading(false);

        localStorage.removeItem("accessToken");
        console.log(data);
      },
      console.log
    );
  };
  return (
    <div className={styles.mainPage}>
      <div className={styles.form}>
        <Textbox
          label="Password"
          type="password"
          state={password}
          setState={setPassword}
        />
        <Textbox
          label="Confirm Password"
          type="password"
          state={cpassword}
          setState={setCPassword}
        />
        <Button label="Reset" handleClick={onClickReset} />
        {loading ? <h1>Loading</h1> : <h1>Reset successfully</h1>}
      </div>
    </div>
  );
}
