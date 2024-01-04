import styles from "../../../styles/components/space/home/File.module.css";
export default function File() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Legends of Zelda</p>
      </div>
      <div className={styles.mainContainer}>
        <img src="/file_icon.svg" />
      </div>
      <div className={styles.footer}>
        <p>10.23 MB</p>
        <img src="/download_icon.svg" />
      </div>
    </div>
  );
}
