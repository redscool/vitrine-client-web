import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "../../../styles/components/space/shelf/FolderTile.module.css";
import { ServiceContext } from "../../../utils/context/serviceContext";
import { useDispatch } from "react-redux";
import { updateFolder, deleteFolder } from "../../../redux/shelfReducer";
import RenameFolderPopup from "./folderTile/RenamePopup";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../../redux/authReducer";
import { USER_TYPES } from "../../../constants";

export default function FolderTile({ folderName, id }) {
  const [popup, setPopup] = useState(false);
  const [renamePopup, setRenamePopup] = useState(false);
  const type = useSelector(authKeySelector("type"));

  const { spaceId } = useParams();
  const serviceObject = useContext(ServiceContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleRename(name) {
    serviceObject.request(
      "post",
      "/api/space/shelf/renameFolder",
      {
        folderId: id,
        folderName: name,
      },
      ({ data }) => {
        dispatch(updateFolder(data.folder));
      },
      () => undefined
    );
  }

  async function handleDelete() {
    serviceObject.request(
      "post",
      "/api/space/shelf/deleteFolder",
      {
        folderId: id,
      },
      () => {
        dispatch(deleteFolder(id));
      },
      () => undefined
    );
  }

  return (
    <div className={styles.container} onClick={() => navigate(id)}>
      {renamePopup ? (
        <RenameFolderPopup
          setView={setRenamePopup}
          renameHandler={handleRename}
        />
      ) : null}
      {popup && type === USER_TYPES.PROVIDER ? (
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
          <img src="/folder_icon.svg" />
        </div>
        <div className={styles.moreButton} onClick={() => setPopup(!popup)}>
          <img src="/more_icon.svg" />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <p>{folderName}</p>
      </div>
    </div>
  );
}
