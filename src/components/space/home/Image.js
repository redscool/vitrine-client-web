import styles from "../../../styles/components/space/home/Image.module.css";
import { getFileURL } from "../../../utils/Misc";
export default function Image({ file }) {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <img src={getFileURL(file.url)} controls={true} />
      </div>
      <div className={styles.title}>
        <p>{file.title}</p>
      </div>
    </div>
  );
}
