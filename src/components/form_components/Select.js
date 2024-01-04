import { useState } from "react";
import styles from "../../styles/components/form_components/Select.module.css";

export default function Select({
  options,
  selectedItem,
  setSelectedItem,
  label,
}) {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(options);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <p>{label}</p>
      </div>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        <p>{options[selectedItem]}</p>
        <img src={!isOpen ? "/down.svg" : "/up.svg"} />
      </div>
      <div className={`${styles.dropdownBody} ${isOpen ? "" : styles.visible}`}>
        {items.map((item, idx) => (
          <div
            className={`${styles.dropdownItem} ${
              item === selectedItem ? styles.selectedItem : ""
            }`}
            onClick={() => handleItemClick(idx)}
            key={idx}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
