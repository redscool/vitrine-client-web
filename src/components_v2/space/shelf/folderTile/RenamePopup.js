import React, { useState } from "react";
import InputField from "../../../form_components/InputField";
import styles from "../../../../styles_v2/components_v2/space/shelf/folderTile/RenamePopup.module.css";

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
            <p>Add Event</p>
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
          onClick={() => renameHandler(folderName)}
        >
          <p>Add Event</p>
        </div>
      </div>
    </div>
  );
}
