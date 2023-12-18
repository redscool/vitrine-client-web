import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { auth_request, resource_request_with_access_token } from "../utils/Service";
import { setAuthKey, setGoogleAuth } from "../redux/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GOOGLE_AUTH_ACTION, LOCALSTORAGE_KEYS } from "../constants";

async function getAccessToken(code, dispatch, navigate) {
  resource_request_with_access_token(
    "post",
    "/api/auth/access/googleAuth",
    { code },
    ({ data: { googleAuth } }) => {
      const redirectUrl = localStorage.getItem(
        LOCALSTORAGE_KEYS.googleAuthRedirect
      );
      localStorage.removeItem(LOCALSTORAGE_KEYS.googleAuthAction);
      localStorage.removeItem(LOCALSTORAGE_KEYS.googleAuthRedirect);
      dispatch(setGoogleAuth(googleAuth));
      navigate(redirectUrl);
    },
    console.log
  );
}

async function login(code, dispatch, navigate) {
  auth_request(
    "post",
    "/api/auth/user/googleLogin",
    { code },
    ({
      data: {
        googleAuth,
        verifyProfileToken,
        accessToken,
        refreshToken,
        type,
        userId,
        profileId,
        email,
        dataToken,
      },
    }) => {
      let redirectUrl = localStorage.getItem(
        LOCALSTORAGE_KEYS.googleAuthRedirect
      );
      localStorage.removeItem(LOCALSTORAGE_KEYS.googleAuthAction);
      localStorage.removeItem(LOCALSTORAGE_KEYS.googleAuthRedirect);

      dispatch(setGoogleAuth(googleAuth));

      if (verifyProfileToken) {
        dispatch(setAuthKey(["verifyProfileToken", verifyProfileToken]));
        redirectUrl = "/confirmProfile";
      } else {
        dispatch(setAuthKey(["accessToken", accessToken]));
        dispatch(setAuthKey(["refreshToken", refreshToken]));
        dispatch(setAuthKey(["type", type]));
        dispatch(setAuthKey(["userId", userId]));
        dispatch(setAuthKey(["profileId", profileId]));
        dispatch(setAuthKey(["email", email]));
        dispatch(setAuthKey(["dataToken", dataToken]));
      }

      navigate(redirectUrl);
    },
    console.log
  );
}

export default function Auth() {
  const dispatch = useDispatch();
  const arr = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    const action = localStorage.getItem(LOCALSTORAGE_KEYS.googleAuthAction);

    if (urlParams.error) {
      console.log(`An error occurred: ${urlParams.error}`);
      arr[1]("Error");
    } else if (action === GOOGLE_AUTH_ACTION.auth) {
      getAccessToken(urlParams.code, dispatch, navigate);
    } else if (action === GOOGLE_AUTH_ACTION.login) {
      login(urlParams.code, dispatch, navigate);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Logged in</p>
        <p>{arr[0]}</p>
      </header>
    </div>
  );
}
