import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "../../styles/components/space/Shelf.module.css";
import { foldersSelector, setFolders } from "../../redux/shelfReducer";
import FolderTile from "./shelf/FolderTile";
import { ServiceContext } from "../../utils/context/serviceContext";
import AddButton from "../form_components/AddButton";
import { authKeySelector } from "../../redux/authReducer";
import { USER_TYPES } from "../../constants";

export default function Shelf() {
  const dispatch = useDispatch();
  const { spaceId } = useParams();
  const serviceObject = useContext(ServiceContext);
  const type = useSelector(authKeySelector("type"));

  async function createFolder() {
    serviceObject.request(
      "post",
      "/api/space/shelf/addFolder",
      {
        spaceId,
        folderName: "New Folder",
      },
      ({ data }) => {
        dispatch(setFolders([...folders, data.folder]));
      },
      console.log
    );
  }
  useEffect(() => {
    async function getFolders() {
      serviceObject.request(
        "get",
        "/api/space/shelf/getFolders",
        {
          spaceId,
        },
        ({ data }) => {
          dispatch(setFolders(data.data));
        },
        console.log
      );
    }
    getFolders();
  }, []);

  const folders = useSelector(foldersSelector);
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {folders.map(({ folderName, _id }) => (
          <FolderTile folderName={folderName} key={_id} id={_id} />
        ))}
      </div>
      {type === USER_TYPES.PROVIDER ? (
        <AddButton onClick={createFolder} />
      ) : null}
    </div>
  );
}
