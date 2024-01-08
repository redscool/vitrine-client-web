import styles from "../../styles/components/form_components/InputField.module.css";
export default function InputFieldDateTime({ placeholder, label, state, setState }) {
  return (
    <div className={styles.fieldContainer}>
      <div className={styles.fieldLabel}>
        <p>{label}</p>
      </div>
      <input
        type="datetime-local"
        placeholder={placeholder}
        className={styles.fieldInput}
        onChange={(e) => setState(e.target.value)}
        value={state}
      />
    </div>
  );
}