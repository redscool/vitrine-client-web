import styles from "../../../styles/components/space/home/Editor.module.css";
export default function Editor() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Title Goes Here</p>
      </div>
      <div className={styles.mainContainer}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
      <div className={styles.footer}>
        <img src="/open_link.svg" />
        <p>Open in Full Screen</p>
      </div>
    </div>
  );
}
