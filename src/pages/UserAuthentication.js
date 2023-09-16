import { useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import ForgetPassword from "../components/authentication/ForgetPassword";
import ResetPassword from "../components/authentication/ResetPassword";

export default function UserAuthentication({ type }) {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    if (refreshToken) navigate("/dashboard");
  });
  return (
    <Box
      height="100%"
      sx={{ width: 1, backgroundColor: "secondary.main", height: "100%" }}
    >
      <Header isLogin={type !== "signup"} />
      <Toolbar sx={{ mb: 3 }} />
      {type === "signup" ? <Signup /> : null}
      {type === "login" ? <Login /> : null}
      {type === "forgetpassword" ? <ForgetPassword /> : null}
      {type === "resetpassword" ? <ResetPassword /> : null}
    </Box>
  );
}
