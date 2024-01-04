import styles from "../../../styles/components/space/home/Video.module.css";
import { getVideoURL } from "../../../utils/Misc";
export default function Video({ file }) {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <video src={getVideoURL(file.url)} controls={true} />
        {/* <div className={styles.playButton}>
          <img src="/play_icon.svg" />
        </div> */}
      </div>
      <div className={styles.footer}>
        <div className={styles.title}>
          <p className={styles.p1}>{file.title}</p>
          <p className={styles.p2}>{file.duration}</p>
        </div>
        <div className={styles.description}>
          <p>{file.description}</p>
        </div>
      </div>
    </div>
  );
}
