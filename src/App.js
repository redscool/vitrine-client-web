import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import { emit, emitForcefully, initConnection } from "./utils/socketIO";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSelector } from "./redux/settingReducer";
import { useEffect } from "react";
import "./App.css";
import ClassSpace from "./pages/ClassSpace";
import Dashboard from "./pages/common/Dashboard";
import Auth from "./pages/Auth";

initConnection();

export default function App() {
  const THEME = useSelector(themeSelector);
  useEffect(() => {
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
        <Route exact path="/dashboard/*" element={<Dashboard />} />
        <Route exact path="/class/:classId/*" element={<ClassSpace />} />
        <Route exact path="/auth/*" element={<Auth />} />
        <Route exact path="/*" element={<h1> not found app</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
