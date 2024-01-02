import styles from "../../styles_v2/components_v2/form_components/CheckBox.module.css";
export default function CheckBox({ check, setCheck, label, type = "square" }) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.checkbox} ${
          type === "circle" ? styles.borderRadius : ""
        } ${check && type !== "circle"? styles.checked : ""}`}
        onClick={() => setCheck(!check)}
      >
        {type === "circle" ? (
          <div className={`${styles.innerCircle} ${check ? "" : styles.hide}`}></div>
        ) : (
          <img src="/check.svg" className={`${check ? "" : styles.hide}`} />
        )}
      </div>
      <div className={styles.label}>
        <p>{label}</p>
      </div>
    </div>
  );
}
