import React from "react";
import styles from "./../styles/components/SignupWithGoogle.module.css";
import queryString from "query-string";
import config from "../config.json";
import { GOOGLE_AUTH_ACTION, LOCALSTORAGE_KEYS } from "../constants";

const stringifiedParams = queryString.stringify(config.GOOGLE_EVENT);
const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

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

export default function SignupWIthGoogle() {
  return (
    <div className={styles.googleButton} onClick={googleLogin}>
      <p className={styles.googleLogo}>G</p>
      <p className={styles.googleText}>Signup with Google</p>
    </div>
  );
}
