import React from "react";
import styles from "../../styles_v2/components_v2/dailyView/Event.module.css";
import { useNavigate } from "react-router-dom";
export default function Event({ date, title, color = 4, url }) {
  const colors = ["color0", "color1", "color2", "color3"];
  const navigate = useNavigate();
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
