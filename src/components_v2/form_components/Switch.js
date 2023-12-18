import React from "react";
import styles from "../../styles_v2/components_v2/form_components/Switch.module.css";

export default function Switch({ value, setValue }) {
  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <input type="checkbox" checked={value} onChange={setValue} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}
