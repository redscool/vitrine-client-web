import queryString from "query-string";
import config from "../config.json";
import { GOOGLE_AUTH_ACTION, LOCALSTORAGE_KEYS } from "../constants";
import { Button } from "@mui/material";

const stringifiedParams = queryString.stringify(config.GOOGLE_EVENT);
const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export const googleAuth = () => {
  localStorage.setItem(
    LOCALSTORAGE_KEYS.googleAuthAction,
    GOOGLE_AUTH_ACTION.auth
  );
  localStorage.setItem(
    LOCALSTORAGE_KEYS.googleAuthRedirect,
    window.location.pathname + window.location.search
  );
  window.location.replace(googleLoginUrl);
};

export const googleLogin = () => {
  localStorage.setItem(
    LOCALSTORAGE_KEYS.googleAuthAction,
    GOOGLE_AUTH_ACTION.login
  );
  localStorage.setItem(
    LOCALSTORAGE_KEYS.googleAuthRedirect,
    window.location.pathname + window.location.search
  );
  window.location.replace(googleLoginUrl);
};

export default function GoogleAuth() {
  return (
    <Button
      sx={{ mt: 2 }}
      variant="text"
      onClick={googleLogin}
      startIcon={<img sx={{ width: "10vw" }} src={"/signupWithGoogle.png"} />}
    />
  );
}
