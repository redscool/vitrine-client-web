import styles from "../../styles/components/authentication/Signup.module.css";
import InputField from "../form_components/InputField";
import { useEffect, useState } from "react";
import Select from "../form_components/Select";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../redux/authReducer";
import { auth_request } from "../../utils/Service";
import SignupWithGoogle from "./../SignupWIthGoogle";
import Modal from "../Modal";
export default function Signup() {
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    if (refreshToken) navigate("/dashboard");
  });
  const options = ["Select", "Provider", "Consumer"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [type, setType] = useState(0);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const verifyProfileToken = useSelector(authKeySelector("verifyProfileToken"));
  const [success, setSuccess] = useState("");

  const signupHandleClick = () => {
    if (!email) {
      setSuccess("Enter a valid e-mail.");
      return;
    }
    if (!password) {
      setSuccess("Please enter password.");
      return;
    }
    if (!cpassword) {
      setSuccess("Please confirm your password.");
      return;
    }
    if (password !== cpassword) {
      setSuccess("Password didn't match");
      return;
    }
    if (!type) {
      setSuccess("Please Select a type");
      return;
    }
    let userType = type === 2 ? "CONSUMER" : "PROVIDER";
    const body = { email, password, type: userType };
    auth_request(
      "post",
      "/api/auth/user/signup",
      body,
      (res) => {
        setSuccess(res.data.message);
      },
      () => undefined
    );
  };
  return (
    <div className={styles.mainContainer}>
      <Modal success={success} setSuccess={setSuccess} />
      <div className={styles.leftContainer}>
        <img src="/welcome.svg" />
      </div>
      <div className={styles.rightContainer}>
        <SignupWithGoogle />
        <InputField
          placeholder="someone@example.com"
          label="Email"
          state={email}
          setState={setEmail}
        />
        <InputField
          placeholder="Min 8-characters"
          label="Password"
          state={password}
          setState={setPassword}
        />
        <InputField
          placeholder="Confirm your password"
          label="Confirm Password"
          state={cpassword}
          setState={setCpassword}
        />
        <div className={styles.select}>
          <Select
            label="Role"
            options={options}
            selectedItem={type}
            setSelectedItem={setType}
          />
        </div>
        <div className={styles.solidButton} onClick={signupHandleClick}>
          <p>Sign up</p>
        </div>
      </div>
    </div>
  );
}
