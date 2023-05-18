import { useState } from "react";
import styles from "../../styles/components/form/Select.module.css";

export default function Select({
  options,
  selectedItem,
  setSelectedItem,
  label,
}) {
  const data = [];
  for (let i = 0; i < options.length; i++)
    data.push({ id: i + 1, label: options[i] });

  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    setSelectedItem(id);
    setOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.head}>
        <p>{label}</p>
      </div>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        {selectedItem
          ? items.find((item) => item.id == selectedItem).label
          : "Select"}
      </div>
      {isOpen ? (
        <div className={styles.dropdownBody}>
          {items.map((item) => (
            <div
              className={styles.dropdownItem}
              onClick={() => handleItemClick(item.id)}
            >
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
