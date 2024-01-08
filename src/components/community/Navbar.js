import styles from "../../styles/components/community/Navbar.module.css";
export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className={styles.title}>
        <div className={styles.baljeetkode}>
          <p>Baljeetkode</p>
        </div>
        <div className={styles.community}>
          <p>COMMUNITY</p>
        </div>
      </div>
    </div>
  );
}
