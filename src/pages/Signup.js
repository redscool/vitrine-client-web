import AuthForm from "../components/form/AuthForm";
import styles from "../styles/pages/Signup.module.css";
import '../styles/components/form/Signup.css'
import { useState } from "react";

export default function Signup() {

  const [currentTheme, setCurrentTheme] = useState('light');

  return (

    <div className={`theme-switcher ${currentTheme} ${styles.mainPage}`}>
      <AuthForm currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
    </div>
  );
}
// <div className={styles.mainPage}>