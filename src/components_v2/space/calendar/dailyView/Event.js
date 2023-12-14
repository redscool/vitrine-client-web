import React from "react";
import styles from "../../../../styles_v2/components_v2/dashboard/calendar/dailyView/Event.module.css";
export default function Event({date, title, color = 4}) {
  const colors = ["color0", "color1", "color2", "color3"]  
  return (
    <div className={styles.container}>
      <div className={`${styles.indicator} ${styles[colors[color]]}`}></div>
      <div className={styles.time}>
        <p>{date}</p>
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </div>
  );
}
