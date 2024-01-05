import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";

import LandingPage from "./pages/LandingPage.js";
import VerifyEmail from "./pages/VerifyEmail.js";
import { initConnection, isConnected } from "./utils/socketIO";
import { themeSelector } from "./redux/settingReducer";
import "./App.css";
import Space from "./pages/Space.js";
import Auth from "./pages/Auth.js";
import { authKeySelector } from "./redux/authReducer";
// import Page from "./pages/Page";
// import Community from "./pages/Community";
import UserAuthentication from "./pages/UserAuthentication.js";
import Dashboard from "./pages/Dashboard.js";
// import Order from "./pages/Order.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ConfirmProfile from "./pages/ConfirmProfile.js";
import ResetPassword from "./pages/ResetPassword.js";
import store from "./redux/store.js";
import { ServiceContext } from "./utils/context/serviceContext.js";
import { resource_request_with_access_token } from "./utils/Service.js";
import GoogleIntegrationCallback from "./pages/GoogleIntegrationCallback.js";
import Community from "./pages/Community.js";

const getServiceObject = (navigate, dispatch) => {
  return {
    request: resource_request_with_access_token(navigate, dispatch),
  };
};

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(authKeySelector("accessToken"));
  const theme = useSelector(themeSelector);
  document.getElementById("root").className = {
    light: "light-theme",
    dark: "dark-theme",
  }[theme];

  useEffect(() => {
    if (accessToken && !isConnected()) {
      initConnection(dispatch, { accessToken });
    }
  }, [accessToken]);

  return (
    <ServiceContext.Provider value={getServiceObject(navigate, dispatch)}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<UserAuthentication type="signup" />} />
        <Route path="/login" element={<UserAuthentication type="login" />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/verifyemail/:token" element={<VerifyEmail />} />
        <Route path="/confirmProfile" element={<ConfirmProfile />} />
        <Route exact path="/dashboard/*" element={<Dashboard />} />
        <Route exact path="/space/:spaceId/*" element={<Space />} />
        <Route exact path="/auth/*" element={<Auth />} />
        {/* <Route exact path="/page/:spaceId" element={<Page />} /> */}
        <Route exact path="/community" element={<Community />} />
        {/* <Route exact path="/order" element={<Order />} /> */}
        <Route
          exact
          path="/integration/google/callback"
          element={<GoogleIntegrationCallback />}
        />
        <Route exact path="/*" element={<h1> not found app</h1>} />
      </Routes>
    </ServiceContext.Provider>
  );
}

export default function Wrapper() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
