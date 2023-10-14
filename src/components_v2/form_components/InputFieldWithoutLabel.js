import styles from "../../styles_v2/components_v2/form_components/InputFieldWithoutLabel.module.css";
export default function InputFieldWithoutLabel({
  placeholder,
  state,
  setState,
}) {
  return (
    <div className={styles.fieldContainer}>
      <input
        placeholder={placeholder}
        className={styles.fieldInput}
        onChange={(e) => setState(e.target.value)}
        value={state}
      />
    </div>
  );
}
