import styles from "../../../styles_v2/components_v2/space/chat/Message.module.css";
export default function Message({ name, tick, time, profilePic, message }) {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.profilePic}>
          <img src={profilePic} />
        </div>
        <div className={styles.details}>
          <div className={styles.name}>
            <p>{name}</p>
            <img src="/green_tick.svg" />
          </div>
          <div className={styles.time}>
            <p>{time}</p>
          </div>
        </div>
        <div className={styles.deleteButton}>
          <img src="/delete_icon.svg" />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.message}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
