import React, { useEffect, useState } from "react";
import Button from "../../form/Button";
import { useParams } from "react-router-dom";
import { resource_request_with_access_token } from "../../../utils/Service";
import styles from "../../../styles/components/space/shelf/Folder.module.css";
import FileTile from "./Folder/FileTile";
import UploadFile from "./Folder/UploadFile";
import OptionsPopup from "./Folder/FileOptionsPopup";

export default function Folder() {
  const [files, setFiles] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(false);
  const params = useParams();
  const folderId = params.folderId;
  useEffect(() => {
    resource_request_with_access_token(
      "get",
      "/api/space/shelf/getFiles",
      { folderId },
      ({ data }) => {
        console.log(data.data);
        setFiles(data.data);
      },
      console.log
    );
  }, []);
  return (
    <div className={styles.container}>
      {popup ? <UploadFile view={setPopup} setFiles={setFiles} /> : null}
      {selectedFileId ? (
        <OptionsPopup
          setSelectedFileId={setSelectedFileId}
          url={selectedUrl}
          fileId={selectedFileId}
        />
      ) : null}

      <div className={styles.content}>
        <Button handleClick={() => setPopup(true)} label="Upload file" />
        {files.map((fileObjm, idx) => (
          <FileTile
            fileName={fileObjm.fileName}
            fileId={fileObjm._id}
            key={idx}
            url={fileObjm.url}
            setSelectedFileId={setSelectedFileId}
            setSelectedUrl={setSelectedUrl}
          />
        ))}
      </div>
    </div>
  );
}
