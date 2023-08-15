import styles from "../../../../styles/components/space/shelf/folder/UploadFile.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../form/Button";
import {
  file_server_request,
  resource_request_with_access_token,
} from "../../../../utils/Service";
export default function UploadFile(props) {
  const { view, setFiles } = props;
  const [file, setFile] = useState();
  const params = useParams();
  const folderId = params.folderId;
  const handleClick = () => {
    if (!file) {
      alert("Please upload a file!!!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const fileName = file.name;
    file_server_request(
      "post",
      "/uploadFile",
      formData,
      ({ data }) => {
        const url = data.filename;
        console.log(url);
        resource_request_with_access_token(
          "post",
          "/api/space/shelf/addFile",
          {
            folderId,
            fileName,
            url,
          },
          ({ data }) => {
            console.log(data.data);
            setFiles(data.data);
          },
          console.log
        );
      },
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
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Button label="Create" handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
