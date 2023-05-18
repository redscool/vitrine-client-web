import React, { useState } from "react";
import styles from "./../../styles/components/form/Textbox.module.css";

function FloatingLabelInputBox({ label, type, state, setState }) {
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
        type={type || "text"}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </div>
  );
}

export default FloatingLabelInputBox;
