import styles from "../../../styles_v2/components_v2/dashboard/spaces/SpaceTile.module.css";
import config from "../../../config.json";
import { useNavigate } from "react-router-dom";
export default function SpaceTile({ message, spaceObj }) {
  const FILE_SERVER = config.FILE_SERVER;
  const navigate = useNavigate();
  return (
    <div
      className={styles.mainContainer}
      onClick={() => navigate(`/space/${spaceObj._id}/`)}
    >
      <div className={styles.profileContainer}>
        <img src={`${FILE_SERVER}/getFile?id=${spaceObj.displayPicture}`} />
      </div>
      <div className={styles.topContainer}>
        <img src={`${FILE_SERVER}/getFile?id=${spaceObj.coverPicture}`} />
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.title}>
          <p>{spaceObj.title}</p>
        </div>
        <div className={styles.subtitle}>
          <p>
            {spaceObj.description.length > 60
              ? spaceObj.description.substr(0, 57) + "..."
              : spaceObj.description}
          </p>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <p>
          <span className={styles.messages}>
            {message === 0 ? "No" : message}
          </span>{" "}
          new {message === 1 ? "message" : "messages"}
        </p>
      </div>
    </div>
  );
}
