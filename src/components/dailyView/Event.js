import styles from "../../styles/components/dailyView/Event.module.css";
export default function Event({ date, title, color = 4, url }) {
  const colors = ["color0", "color1", "color2", "color3"];
  return (
    <a className={styles.container} href={url} target="_blank">
      <div className={`${styles.indicator} ${styles[colors[color]]}`}></div>
      <div className={styles.time}>
        <p>{date}</p>
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </a>
  );
}
