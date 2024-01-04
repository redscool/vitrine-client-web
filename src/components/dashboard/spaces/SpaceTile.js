import styles from "../../../styles/components/dashboard/spaces/SpaceTile.module.css";
import { useNavigate } from "react-router-dom";
import { getFileURL } from "../../../utils/Misc";
export default function SpaceTile({ message, spaceObj }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.mainContainer}
      onClick={() => navigate(`/space/${spaceObj._id}/`)}
    >
      <div className={styles.profileContainer}>
        <img src={getFileURL(spaceObj.displayPicture)} />
      </div>
      <div className={styles.topContainer}>
        <img src={getFileURL(spaceObj.coverPicture)} />
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
