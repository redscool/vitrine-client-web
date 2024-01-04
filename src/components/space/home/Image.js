import styles from "../../../styles/components/space/home/Image.module.css";
import { getFileURL } from "../../../utils/Misc";
export default function Image({ file }) {
  return (
    <div className={styles.container}>
      <img src={getFileURL(file.url)} />
    </div>
  );
}
