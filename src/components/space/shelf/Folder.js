import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../../styles/components/space/shelf/Folder.module.css";
import { ServiceContext } from "../../../utils/context/serviceContext";
import UploadFilePopup from "./folder/UploadFilePopup";
import FileTile from "./folder/FileTile";
import AddButton from "../../form_components/AddButton";

export default function Folder() {
  const { folderId } = useParams();
  const serviceObject = useContext(ServiceContext);
  const [files, setFiles] = useState([]);
  const [uploadFilePopup, setUploadFilePopup] = useState(false);

  useEffect(() => {
    async function getFiles() {
      serviceObject.request(
        "get",
        "/api/space/shelf/getFiles",
        {
          folderId,
        },
        ({ data }) => {
          setFiles(data.data);
        },
        console.log
      );
    }
    getFiles();
  }, []);
  return (
    <div className={styles.container}>
      {uploadFilePopup ? (
        <UploadFilePopup setView={setUploadFilePopup} setFiles={setFiles} />
      ) : null}
      <div className={styles.mainContainer}>
        {files.map(({ fileName, _id, url }) => (
          <FileTile
            fileName={fileName}
            key={_id}
            id={_id}
            setFiles={setFiles}
            url={url}
          />
        ))}
      </div>
      <AddButton onClick={() => setUploadFilePopup(true)} />
    </div>
  );
}
