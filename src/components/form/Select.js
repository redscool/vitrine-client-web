import { useState } from "react";
import styles from "../../styles/components/form/Select.module.css";

export default function Select({
  options,
  selectedItem,
  setSelectedItem,
  label,
}) {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(options);
  console.log(items);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      {label ? (
        <div className={styles.head}>
          <p>{label}</p>
        </div>
      ) : null}
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        {selectedItem ? items.find((item) => item == selectedItem) : "Select"}
      </div>
      {isOpen ? (
        <div className={styles.dropdownBody}>
          {items.map((item) => (
            <div
              className={styles.dropdownItem}
              onClick={() => handleItemClick(item)}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
