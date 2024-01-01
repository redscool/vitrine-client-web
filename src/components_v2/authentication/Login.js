import React, { useState } from "react";
import styles from "../../styles_v2/components_v2/authentication/Login.module.css";
import InputField from "../form_components/InputField";
import SignupWIthGoogle from "../SignupWIthGoogle";
import { auth_request } from "../../utils/Service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthKey } from "../../redux/authReducer";
import Modal from "../Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickLogin = () => {
    if (!email) {
      setSuccess("Please enter email");
      return;
    }
    if (!password) {
      setSuccess("Please enter password");
      return;
    }
    auth_request(
      "post",
      "/api/auth/user/login",
      { email, password },
      ({ data }) => {
        for (const key in data) {
          const value = data[key];
          dispatch(setAuthKey([key, value]));
        }
        navigate(`/dashboard/`);
      },
      ({ response }) => {
        const { data } = response;
        setSuccess(data.message);
      }
    );
  };
  return (
    <div className={styles.mainContainer}>
      <Modal success={success} setSuccess={setSuccess} />
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
        <div
          className={styles.forgetPassword}
          onClick={() => navigate("/forgetpassword")}
        >
          <p>Forget Password?</p>
        </div>
        <div className={styles.solidButton} onClick={clickLogin}>
          <p>Log In</p>
        </div>
      </div>
      <div className={styles.leftContainer}>
        <img src="/welcome.svg" />
      </div>
    </div>
  );
}
