import { useState } from "react";
import styles from "../../../styles/components/space/shelf/folder/FileOptionsPopup.module.css";
import { resource_request_with_access_token } from "../../../utils/Service";
import TextBox from "../../form/Textbox";
import { useLocation, useNavigate } from "react-router-dom";
export default function FolderOptionsPopup({ setSelectedFolderId, folderId }) {
  const [folderName, setFolderName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const renameHelper = () => {
    if (!folderName) {
      alert("Folder name could not be empty");
      return;
    }
    resource_request_with_access_token(
      "post",
      "/api/space/shelf/renameFolder",
      { folderId, folderName },
      (res) => {
        setSelectedFolderId(false);
        console.log(res);
      },
      console.log
    );
  };
  const deleteHelper = () => {
    resource_request_with_access_token(
      "post",
      "/api/space/shelf/deleteFolder",
      { folderId },
      (res) => {
        setSelectedFolderId(false);
        console.log(res);
      },
      console.log
    );
  };
  return (
    <div className={styles.container}>
      <div onClick={() => setSelectedFolderId(false)}>x</div>
      <div onClick={() => navigate(`${location.pathname}/${folderId}`)}>
        Open
      </div>
      <div>
        <TextBox
          label={"Folder Name"}
          setState={setFolderName}
          state={folderName}
          type="text"
        />
        <div onClick={renameHelper}>
          <p>Rename</p>
        </div>
      </div>
      <div onClick={deleteHelper}>
        <p>delete</p>
      </div>
    </div>
  );
}
