import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { resource_request_with_access_token } from "../utils/Service";
import { setGoogleAuth } from "../redux/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

async function getAccessTokenFromCode(code, dispatch, navigate) {
  resource_request_with_access_token(
    "post",
    "/api/auth/access/googleAuth",
    { code },
    ({ data }) => {
      const redirectUrl = localStorage.getItem("googleAuthRedirect");
      localStorage.removeItem("googleAuthRedirect");
      dispatch(setGoogleAuth(data));
      navigate(redirectUrl);
    },
    console.log
  );
  //   const { data } = await axios({
  //     url: `http://localhost:5000/api/auth/googleAuth`,
  //     method: "post",
  //     data: {
  //       code,
  //     },
  //   });
}

export default function Auth() {
  const dispatch = useDispatch();
  const arr = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);

    if (urlParams.error) {
      console.log(`An error occurred: ${urlParams.error}`);
      arr[1]("Error");
    } else {
      console.log(`The code is: ${urlParams.code}`);
      getAccessTokenFromCode(urlParams.code, dispatch, navigate);
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
