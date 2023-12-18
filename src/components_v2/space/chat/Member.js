import styles from "../../../styles_v2/components_v2/space/chat/Member.module.css";
export default function Member({ img, name, tick, offline }) {
  return (
    <div className={`${styles.container} ${offline ? styles.offline : ""}`}>
      <div className={styles.profilePic}>
        <img src={img} />
      </div>
      <div className={styles.name}>
        <p>{name}</p>
      </div>
      <div className={styles.tick}>
        <img src="/green_tick.svg" className={`${!tick ? styles.hide : ""}`} />
      </div>
    </div>
  );
}
