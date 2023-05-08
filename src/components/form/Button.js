import styles from "./../../styles/components/form/Button.module.css";
export default function Button({ label }) {
  return (
    <div className={styles.Button}>
      <p>{label}</p>
    </div>
  );
}
