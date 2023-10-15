import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";


import LandingPage from "./pages/LandingPage";
import VerifyEmail from "./pages_v2/VerifyEmail";
import { initConnection } from "./utils/socketIO";
import { themeSelector } from "./redux/settingReducer";
import "./App.css";
import Space from "./pages/Space";
import Auth from "./pages/Auth";
import { authKeySelector } from "./redux/authReducer";
import Page from "./pages/Page";
import Community from "./pages/Community";
import getDesignTokens from "./utils/theme";
import UserAuthentication from "./pages_v2/UserAuthentication";
import DashboardV2 from "./pages_v2/Dashboard";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order.js";
import ForgotPassword from "./pages_v2/ForgotPassword";
import ConfirmProfile from "./pages_v2/ConfirmProfile";
import ResetPassword from "./pages_v2/ResetPassword";

export default function App() {
  const dispatch = useDispatch();
  const THEME = useSelector(themeSelector);
  const profileId = useSelector(authKeySelector("profileId"));
  const type = useSelector(authKeySelector("type"));

  useEffect(() => {
    initConnection(dispatch, { profileId, type });
  }, []);

  const theme = React.useMemo(() => createTheme(getDesignTokens(THEME)));
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/signup"
            element={<UserAuthentication type="signup" />}
          />
          <Route path="/login" element={<UserAuthentication type="login" />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/verifyemail/:token" element={<VerifyEmail />} />
          <Route path="/confirmProfile" element={<ConfirmProfile />} />
          <Route exact path="/dashboard/*" element={<Dashboard />} />
          <Route exact path="/dashboardv2/*" element={<DashboardV2 />} />
          <Route exact path="/space/:spaceId/*" element={<Space />} />
          <Route exact path="/auth/*" element={<Auth />} />
          <Route exact path="/page/:spaceId" element={<Page />} />
          <Route exact path="/community" element={<Community />} />
          <Route exact path="/order" element={<Order />} />
          <Route exact path="/*" element={<h1> not found app</h1>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
