import styles from "../../../../styles/components/space/shelf/folder/FileTile.module.css";
import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceContext } from "../../../../utils/context/serviceContext";
import { useDispatch } from "react-redux";
import { file_server_request } from "../../../../utils/Service";
import FileRenamePopup from "./fileTile/FileRenamePopup";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../../../redux/authReducer";
import { USER_TYPES } from "../../../../constants";

export default function FileTile({ fileName, id, setFiles, url }) {
  const [popup, setPopup] = useState(false);
  const [renamePopup, setRenamePopup] = useState(false);
  const serviceObject = useContext(ServiceContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const type = useSelector(authKeySelector("type"))

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
      () => undefined
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
        handleChange();
      },
      () => undefined
    );
  }

  async function handleDelete() {
    file_server_request(
      "post",
      "/deleteFile",
      { file: url },
      ({ data }) => {
        serviceObject.request(
          "post",
          "/api/space/shelf/deleteFile",
          {
            fileId: id,
          },
          () => {
            handleChange();
          },
          () => undefined
        );
      },
      () => undefined,
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
      {popup && type === USER_TYPES.PROVIDER? (
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
