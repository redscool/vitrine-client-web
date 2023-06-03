import styles from "../../styles/components/dashboard/Profile.module.css";
export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Profile</p>
      </div>
      <div className={styles.content}>
        <div className={styles.editButtonContainer}>
          <img src="/edit.svg" alt="edit" />
        </div>
        <div className={styles.profile}>
          <div className={styles.leftContainer}>
            <img src="/tempuser.jpg" alt="user image" />
          </div>
          <div className={styles.rightContainer}></div>
        </div>
      </div>
    </div>
  );
}
