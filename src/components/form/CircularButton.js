import styles from "./../../styles/components/form/CircularButton.module.css";
export default function CircularButton({ label, handleClick }) {
  return (
    <div className={styles.Button} onClick={handleClick}>
      <p>{label}</p>
    </div>
  );
}
