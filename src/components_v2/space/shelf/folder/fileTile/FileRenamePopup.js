import React, { useState } from "react";
import InputField from "../../../../form_components/InputField";
import styles from "../../../../../styles_v2/components_v2/space/shelf/folder/fileTile/FileRenamePopup.module.css";

export default function FileRenamePopup({ setView, renameHandler }) {
  const [fileName, setFileName] = useState("");
  return (
    <div className={`${styles.mainContainer}`} onClick={() => setView(false)}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>Rename File</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label="File Name"
          placeholder="File Name"
          state={fileName}
          setState={setFileName}
        />
        <div
          className={styles.button}
          onClick={() => {
            renameHandler(fileName);
            setView(false);
          }}
        >
          <p>Rename</p>
        </div>
      </div>
    </div>
  );
}
