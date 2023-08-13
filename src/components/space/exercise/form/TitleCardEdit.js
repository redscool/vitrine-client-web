import styles from "../../../../styles/components/space/exercise/form/TitleCardEdit.module.css";

export default function TitleCardEdit({
  children,
  customStyles,
  setSelected,
  index,
}) {
  return (
    <div
      className={`${styles.mainContainer} ${customStyles}`}
      onClick={() => setSelected(index)}
    >
      {children}
    </div>
  );
}