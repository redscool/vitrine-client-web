import React, { useState } from "react";
import styles from "./../../styles/components/form/Textbox.module.css";

function Textbox({ label, type = "text", state, setState, placeholder = "" }) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className={styles["floating-label-input-box-container"]}>
      <label
        className={`${styles["floating-label"]} ${
          isInputFocused || state ? styles["label-focused"] : ""
        }`}
      >
        {label}
      </label>
      <input
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        className={`${styles["floating-label-input-box"]} ${
          isInputFocused || state ? styles["input-focused"] : ""
        }`}
        type={type}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </div>
  );
}

export default Textbox;
