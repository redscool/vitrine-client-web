import { useState } from "react";
import styles from "./../../styles/components/form/Switch.module.css";
import { useDispatch, useSelector } from "react-redux";

function Switch({ onToggle, overrideState }) {
  const [isChecked, setIsChecked] = useState(false);

  const getCurrentState = () => {
    if (overrideState !== undefined) return overrideState;
    return isChecked;
  };

  const toggleSwitch = () => {
    onToggle(!isChecked);
    setIsChecked((value) => !value);
  };

  return (
    <div className={styles.container} onClick={toggleSwitch}>
      <div
        className={`${styles.switch} ${
          getCurrentState() ? styles.on : styles.off
        }`}
      >
        <div className={styles.slider}></div>
      </div>
    </div>
  );
}

export default Switch;
