import styles from "../../../styles/components/dashboard/dropdown/Option.module.css";
export default function Option({ icon, label, switchButton, handleClick }) {
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.left}>
        <img src={icon} alt="icon" />
      </div>
      <div className={styles.center}>
        <p>{label}</p>
      </div>
      <div className={styles.right}>{switchButton}</div>
    </div>
  );
}
