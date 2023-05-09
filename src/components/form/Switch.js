import React, { useState } from "react";
import styles from "./../../styles/components/form/Switch.module.css";

function Switch({ currentTheme, setCurrentTheme }) {
  const [isChecked, setIsChecked] = useState(false);
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.switch} ${isChecked ? styles.on : styles.off}`}
        onClick={toggleSwitch}
      >
        <div className={styles.slider}></div>
      </div>
    </div>
  );
}

export default Switch;
