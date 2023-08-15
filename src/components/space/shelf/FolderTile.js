import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "../../../styles/components/space/shelf/FolderTile.module.css";

export default function FolderTile({
  folderName,
  folderId,
  setSelectedFolderId,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={styles.container}
      onClick={() => {
        setSelectedFolderId(folderId);
      }}
    >
      <div className={styles.icon}></div>
      <div className={styles.name}>
        <p>{folderName}</p>
      </div>
    </div>
  );
}
