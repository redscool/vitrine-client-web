import React, { useState } from "react";
import InputField from "../../../form_components/InputField";
import styles from "../../../../styles/components/space/shelf/folderTile/RenamePopup.module.css";

export default function RenameFolderPopup({ setView, renameHandler }) {
  const [folderName, setFolderName] = useState("");
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
            <p>Rename Folder</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label="Folder Name"
          placeholder="Folder Name"
          state={folderName}
          setState={setFolderName}
        />
        <div
          className={styles.button}
          onClick={() => {
            renameHandler(folderName);
            setView(false);
          }}
        >
          <p>Rename</p>
        </div>
      </div>
    </div>
  );
}
