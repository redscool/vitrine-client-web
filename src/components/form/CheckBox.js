import styles from "../../styles_v2/components_v2/form_components/CheckBox.module.css";
export default function CheckBox({ check, setCheck, label }) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.checkbox} ${check ? styles.checked : ""}`}
        onClick={() => setCheck(!check)}
      >
        <img src="/check.svg" className={`${check ? "" : styles.hide}`} />
      </div>
      <div className={styles.label}>
        <p>{label}</p>
      </div>
    </div>
  );
}
