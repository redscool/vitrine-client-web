import React from "react";
import styles from "../styles/components/Header.module.css";
import { useNavigate } from "react-router-dom";
export default function Header({ isLogin }) {
  const navigate = useNavigate();
  console.log(isLogin);
  return (
    <div className={styles.mainContainer}>
      <div
        className={`${styles.tab} ${!isLogin ? styles.activeTab : ""}`}
        onClick={() => navigate("/signup")}
      >
        <p>Signup</p>
      </div>
      <div
        className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
        onClick={() => navigate("/login")}
      >
        <p>Login</p>
      </div>
    </div>
  );
}
