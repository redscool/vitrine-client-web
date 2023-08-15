import React, { useEffect, useState } from "react";
import styles from "../../styles/components/space/Shelf.module.css";
import Button from "../form/Button";
import { resource_request_with_access_token } from "../../utils/Service";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../redux/authReducer";
import AddFolder from "./shelf/AddFolder";
import { useParams } from "react-router-dom";
import FolderTile from "./shelf/FolderTile";
import FolderOptionsPopup from "./shelf/FolderOptionsPopup";
export default function Shelf() {
  const [popup, setPopup] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const params = useParams();
  const spaceId = params.spaceId;
  const type = useSelector(authKeySelector("type"));
  useEffect(() => {
    resource_request_with_access_token(
      "get",
      "/api/space/shelf/getFolders",
      { spaceId },
      ({ data }) => {
        setFolderList(data.data);
      },
      console.log
    );
  }, []);
  console.log(folderList);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Shelf</p>
      </div>
      {popup ? (
        <AddFolder view={setPopup} setSpaceList={setFolderList} />
      ) : null}
      {selectedFolderId ? (
        <FolderOptionsPopup
          folderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
        />
      ) : null}
      <div className={styles.content}>
        {type === "PROVIDER" ? (
          <Button
            label={"Add Folder"}
            handleClick={() => {
              setPopup(!popup);
            }}
          />
        ) : null}
        <div className={styles.classList}>
          {folderList.map((folderObj, idx) => (
            <FolderTile
              folderId={folderObj._id}
              folderName={folderObj.folderName}
              setSelectedFolderId={setSelectedFolderId}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
