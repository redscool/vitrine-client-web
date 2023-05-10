import { useState } from "react";
import styles from "./../../styles/components/form/Switch.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/reducers";

function Switch() {
  const { darkMode } = useSelector((state) => state.darkMode)
  const dispatch = useDispatch(toggleDarkMode)
  const [isChecked, setIsChecked] = useState(false);
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    dispatch(toggleDarkMode)
    document.body.classList.toggle(darkMode ? 'light-theme' : 'dark-theme')
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
