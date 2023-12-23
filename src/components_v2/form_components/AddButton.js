import styles from "../../styles_v2/components_v2/form_components/AddButton.module.css";

export default function AddButton({ onClick }) {
  return (
    <div onClick={onClick} className={styles.button}>
      <img src="/add_button_black.svg" />
    </div>
  );
}
