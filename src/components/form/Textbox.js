import React, { useState } from "react";
import styles from "./../../styles/components/form/Textbox.module.css";

function FloatingLabelInputBox({ label, type }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
          isInputFocused || inputValue ? styles["label-focused"] : ""
        }`}
      >
        {label}
      </label>
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className={`${styles["floating-label-input-box"]} ${
          isInputFocused || inputValue ? styles["input-focused"] : ""
        }`}
        type={type || "text"}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </div>
  );
}

export default FloatingLabelInputBox;
