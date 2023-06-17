import React from "react";
import styles from "../../styles/components/classSpace/Home.module.css";
import Editor from "../Editor";
export default function Home() {
  const getEditorContent = () => {};

  getEditorContent();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.myclass}></div>
      <div className={styles.lowerContainer}>
        <div className={styles.notification}></div>
        <div className={styles.rightContainer}>
          <div className={styles.greenBoard}>
            <Editor expand />
          </div>
          <div className={styles.stream}></div>
        </div>
      </div>
    </div>
  );
}
