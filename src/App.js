import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ChangePassword from "./pages/ChangePassword";
import ForgetPassword from "./pages/ForgetPassword";
import { initConnection } from "./utils/socketIO";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "./redux/settingReducer";
import { useEffect } from "react";
import "./App.css";
import Space from "./pages/Space";
import Dashboard from "./pages/common/Dashboard";
import Auth from "./pages/Auth";
import { authKeySelector } from "./redux/authReducer";
import Page from "./pages/Page";
import Community from "./pages/Community";

export default function App() {
  const dispatch = useDispatch();
  const THEME = useSelector(themeSelector);
  const profileId = useSelector(authKeySelector("profileId"));
  const type = useSelector(authKeySelector("type"));

  useEffect(() => {
    document.body.className = THEME;
    // TODO: verify connection stability on useEffect
    initConnection(dispatch, { profileId, type });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ChangePassword />} />
        <Route path="/verifyemail/:token" element={<VerifyEmail />} />
        <Route exact path="/dashboard/*" element={<Dashboard />} />
        <Route exact path="/space/:spaceId/*" element={<Space />} />
        <Route exact path="/auth/*" element={<Auth />} />
        <Route exact path="/page/:spaceId" element={<Page />} />
        <Route exact path="/community" element={<Community />} />
        <Route exact path="/*" element={<h1> not found app</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
