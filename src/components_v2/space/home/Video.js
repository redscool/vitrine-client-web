import styles from "../../../styles_v2/components_v2/space/home/Video.module.css";
export default function Video() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.playButton}>
          <img src="/play_icon.svg" />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.title}>
          <p className={styles.p1}>Abstract Art by Rebeeca</p>
          <p className={styles.p2}>07:52</p>
        </div>
        <div className={styles.description}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
}
