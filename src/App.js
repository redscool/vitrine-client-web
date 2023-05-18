import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import AppWrapper from "./pages/AppWrapper";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSelector } from "./redux/settingReducer";
import { useLayoutEffect } from "react";
import "./App.css";

export default function App() {
  const THEME = useSelector(themeSelector);
  useLayoutEffect(() => {
    document.body.className = THEME;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/verifyemail/:token" element={<VerifyEmail />} />
        <Route path="/*" element={<AppWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}
