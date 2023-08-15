import Textbox from "../../form/Textbox";
import Button from "../../form/Button";
import styles from "../../../styles/components/space/shelf/AddFolder.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { resource_request_with_access_token } from "../../../utils/Service";
export default function AddFolder(props) {
  const { view } = props;
  const [folderName, setFolderName] = useState("");
  const params = useParams();
  const spaceId = params.spaceId;
  const handleClick = () => {
    if (!folderName) {
      alert("Title Cannot be empty");
      return;
    }
    resource_request_with_access_token(
      "post",
      "/api/space/shelf/addFolder",
      {
        spaceId,
        folderName,
      },
      console.log,
      console.log
    );
    view(false);
  };
  return (
    <div className={styles.containerPopup}>
      <div className={styles.popup}>
        <img src="/close.png" alt="cancel" onClick={() => view(false)} />
        <h1>Add Folder</h1>
        <div className={styles.topCtn}>
          <Textbox
            label="Folder Name"
            state={folderName}
            setState={setFolderName}
          />
          <Button label="Create" handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
