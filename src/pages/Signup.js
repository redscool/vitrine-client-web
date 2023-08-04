import styles from "../styles/pages/Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, themeSelector } from "../redux/settingReducer";
import { useState } from "react";
import { auth_request } from "../utils/Service";
import Textbox from "../components/form/Textbox";
import Button from "../components/form/Button";
import Select from "../components/form/Select";
import { authKeySelector } from "../redux/authReducer";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [success, setSuccess] = useState(false);

  const THEME = useSelector(themeSelector);
  const verifyProfileToken = useSelector(authKeySelector("verifyProfileToken"));

  const googleSignup = () => {
    if (!type) {
      alert("Please Select a type");
      return;
    }
    let temp_type = "PROVIDER";
    if (type == 2) temp_type = "CONSUMER";
    console.log(type);
    const body = { verifyProfileToken, type: temp_type };
    auth_request(
      "post",
      "/api/auth/user/verifyProfile",
      body,
      (res) => {
        setSuccess(true);
        console.log(res.data);
      },
      console.log
    );
  };

  const signupHandleClick = () => {
    if (password !== cpassword) {
      alert("Password didn't match");
      return;
    }
    if (!type) {
      alert("Please Select a type");
      return;
    }
    let temp_type = "PROVIDER";
    if (type == 2) temp_type = "CONSUMER";
    console.log(type);
    const body = { email, password, type: temp_type };
    auth_request(
      "post",
      "/api/auth/user/signup",
      body,
      (res) => {
        setSuccess(true);
        console.log(res.data);
      },
      console.log
    );
  };

  if (verifyProfileToken) {
    return (
      <div className={styles.mainPage}>
        <div className={styles.form}>
          <h1>Please select a role to continue</h1>
          <Select
            options={["PROVIDER", "CONSUMER"]}
            label="Type"
            selectedItem={type}
            setSelectedItem={setType}
          ></Select>
          <Button label="Sign Up" handleClick={googleSignup}></Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainPage}>
      <div className={styles.form}>
        <Textbox label="Email" state={email} setState={setEmail} />
        <Select
          options={["PROVIDER", "CONSUMER"]}
          label="Type"
          selectedItem={type}
          setSelectedItem={setType}
        ></Select>
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
          setState={setCpassword}
        />
        <Button label="Sign Up" handleClick={signupHandleClick}></Button>
        {success ? <h1>Please Check your email to verify</h1> : null}
      </div>
    </div>
  );
}
