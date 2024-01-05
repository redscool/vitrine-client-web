import styles from "../../../styles/components/space/home/File.module.css";
import { getFileURL } from "../../../utils/Misc";
export default function File({ file }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>{file.title}</p>
      </div>
      <div className={styles.mainContainer}>
        <img src="/file_icon.svg" />
      </div>
      <a className={styles.footer} href={getFileURL(file.url)} target="_blank" download={true}>
        <img src="/download_icon.svg" />
      </a>
    </div>
  );
}
