import styles from "./../../styles/components/form/Button.module.css";
export default function Button({ label, handleClick }) {
  return (
    <div className={styles.Button} onClick={handleClick}>
      <p>{label}</p>
    </div>
  );
}
