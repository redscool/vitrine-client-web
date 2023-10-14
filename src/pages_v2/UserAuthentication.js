import { useEffect } from "react";
// import { Box, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components_v2/Header";
import Signup from "../components_v2/authentication/Signup";
import Login from "../components_v2/authentication/Login";
// import ForgetPassword from "../components/authentication/ForgetPassword";
// import ResetPassword from "../components/authentication/ResetPassword";

export default function UserAuthentication({ type }) {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    if (refreshToken) navigate("/dashboard");
  });
  return (
    <>
      <Header isLogin={type !== "signup"} />
      {type === "signup" ? <Signup /> : null}
      {type === "login" ? <Login /> : null}
      {/* {type === "forgetpassword" ? <ForgetPassword /> : null} */}
      {/* {type === "resetpassword" ? <ResetPassword /> : null} */}
    </>
  );
}
