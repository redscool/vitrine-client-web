import styles from "../../styles/components/form_components/InputField.module.css";
export default function InputField({ placeholder, label, state, setState, type }) {
  return (
    <div className={styles.fieldContainer}>
      <div className={styles.fieldLabel}>
        <p>{label}</p>
      </div>
      <input
        placeholder={placeholder}
        className={styles.fieldInput}
        onChange={(e) => setState(e.target.value)}
        value={state}
        type={type ? type : "text"}
      />
    </div>
  );
}
