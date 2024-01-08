import React from "react";
import styles from "../../styles/components/community/SpaceTile.module.css";
import { getFileURL } from "../../utils/Misc";
import { useNavigate } from "react-router-dom";
export default function SpaceTile({ result }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/page/${result.pageData.id}/`)}
    >
      <div className={styles.image}>
        <img src={getFileURL(result.pageData.banner)} />
      </div>
      <div className={styles.details}>
        <div className={styles.header}>
          <div className={styles.displayPicture}>
            <img src={getFileURL(result.pageData.profileImg)} />
          </div>
          <div className={styles.heading}>
            <p>{result.pageData.heading}</p>
          </div>
        </div>
        <div className={styles.body}>
          <p>{result.pageData.subHeading}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.key}>
            <p>Members</p>
          </div>
          <div className={styles.value}>
            <p>{result.space.consumer}</p>
          </div>
          <div className={styles.dot}></div>
          <div className={styles.key}>
            <p>Streams</p>
          </div>
          <div className={styles.value}>
            <p>{result.space.streams}</p>
          </div>
          <div className={styles.dot}></div>
          <div className={styles.key}>
            <p>Price</p>
          </div>
          <div className={styles.value}>
            <p>₹{result.space.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
