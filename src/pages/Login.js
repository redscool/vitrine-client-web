import React, { useState } from "react";
import styles from "../styles/pages/Login.module.css";
import { useNavigate } from "react-router-dom";
import { auth_request } from "../utils/Service";
import TextBox from "../components/form/Textbox";
import Button from "../components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { authKeySelector, setAuthKey } from "../redux/authReducer";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const clickLogin = () => {
    auth_request(
      "post",
      "/api/auth/user/login",
      { email, password },
      ({ data }) => {
        for (const key in data) {
          const value = data[key];
          dispatch(setAuthKey([key, value]));
        }
        navigate(`/${data.type.toLowerCase()}/dashboard/`);
      },
      console.log
    );
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.form}>
        <TextBox label="Email" state={email} setState={setEmail} type="email" />
        <TextBox
          label="Password"
          state={password}
          setState={setPassword}
          type="password"
        />
        <Button label="Login" handleClick={clickLogin} />
        <Button
          label="Forget Password"
          handleClick={() => {
            navigate("/forgetpassword");
          }}
        />
      </div>
    </div>
  );
}
