import styles from "../../../styles/components/space/home/Video.module.css";
import { getVideoURL } from "../../../utils/Misc";
export default function Video({ file }) {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <video src={getVideoURL(file.url)} controls={true} />
      </div>
      <div className={styles.title}>
        <p>{file.title}</p>
      </div>
    </div>
  );
}
