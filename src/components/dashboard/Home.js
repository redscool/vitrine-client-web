import React from "react";
import styles from "../../styles/components/dashboard/Home.module.css";
import ClassNotification from "./home/ClassNotification";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Home</p>
      </div>
      <div className={styles.content}>
        <ClassNotification />
      </div>
    </div>
  );
}
