import styles from "../../../styles/components/space/home/Options.module.css";
export default function Options({ show }) {
  return (
    <div className={`${styles.container} ${show ? styles.visible : ""}`}>
      <div className={styles.option} title="Upload File">
        <img src="/upload_icon.svg" />
      </div>
      <div className={styles.option} title="Upload Image">
        <img src="/upload_image.svg" />
      </div>
      <div className={styles.option} title="Upload Video">
        <img src="/video_icon.svg" />
      </div>
      <div className={styles.option} title="Post a Poll">
        <img src="/poll_icon.svg" />
      </div>
      <div className={styles.option} title="Write Something">
        <img src="/editor_icon.svg" />
      </div>
    </div>
  );
}
