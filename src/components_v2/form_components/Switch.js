import React from "react";
import styles from "../../styles_v2/components_v2/form_components/Switch.module.css";
import { toggleTheme } from "../../redux/settingReducer";
import { useDispatch } from "react-redux";

export default function Switch({ value, setValue, theme }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.label}>
        <p>Lights</p>
      </div>
      <div className={styles.switchContainer}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={value}
            onChange={() => {
              setValue(!value);
              console.log(1);
              dispatch(toggleTheme());
            }}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
    </div>
  );
}
