import styles from "../../../styles/components/space/chat/MessageContainer.module.css";
export default function MessageContainer({ message, profilePic }) {
  return (
    <div className={styles.container}>
      <div className={styles.profilePic}>
        <img src={profilePic} />
      </div>
      <div className={styles.message}>
        <p>{message}</p>
      </div>
    </div>
  );
}
