import styles from "../../../../styles_v2/components_v2/space/shelf/folder/FileTile.module.css";
import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceContext } from "../../../../utils/context/serviceContext";
import { useDispatch } from "react-redux";
import { file_server_request } from "../../../../utils/Service";
import FileRenamePopup from "./fileTile/FileRenamePopup";

export default function FileTile({ fileName, id, setFiles, url }) {
  const [popup, setPopup] = useState(false);
  const [renamePopup, setRenamePopup] = useState(false);
  const serviceObject = useContext(ServiceContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();

  async function handleChange() {
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

  async function handleRename(name) {
    serviceObject.request(
      "post",
      "/api/space/shelf/renameFile",
      {
        fileId: id,
        fileName: name,
      },
      ({ data }) => {
        console.log("data", data);
        handleChange();
      },
      console.log
    );
  }

  async function handleDelete() {
    const formData = new FormData();
    formData.append("file", url);
    console.log(formData);
    file_server_request(
      "post",
      "/deleteFile",
      { file: url },
      ({ data }) => {
        console.log(data);
        serviceObject.request(
          "post",
          "/api/space/shelf/deleteFile",
          {
            fileId: id,
          },
          () => {
            handleChange();
          },
          console.log
        );
      },
      console.log,
      false
    );
  }

  return (
    <div className={styles.container}>
      {renamePopup ? (
        <FileRenamePopup
          setView={setRenamePopup}
          renameHandler={handleRename}
        />
      ) : null}
      {popup ? (
        <div className={styles.popupMainContainer}>
          <div
            className={styles.option}
            onClick={() => {
              navigate(id);
            }}
          >
            <p>Open</p>
          </div>
          <div
            className={styles.option}
            onClick={() => {
              setPopup(false);
              setRenamePopup(true);
            }}
          >
            <p>Rename</p>
          </div>
          <div className={styles.option} onClick={() => handleDelete()}>
            <p>Delete</p>
          </div>
        </div>
      ) : null}
      <div className={styles.topContainer}>
        <div className={styles.icon} draggable>
          <img src="/file_icon.svg" />
        </div>
        <div className={styles.moreButton} onClick={() => setPopup(!popup)}>
          <img src="/more_icon.svg" />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <p>{fileName.substring(0, 16)}</p>
      </div>
    </div>
  );
}
