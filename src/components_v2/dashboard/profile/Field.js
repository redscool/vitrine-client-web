import { useState } from "react";
import styles from "../../../styles_v2/components_v2/dashboard/profile/Field.module.css";
export default function Field({ keyname, value, info }) {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.key}>
        <p>{keyname}</p>
      </div>
      <div className={styles.value}>
        <p>{value}</p>
      </div>
      <div
        className={`${info ? styles.info : styles.hide}`}
        onMouseEnter={(e) => {
          e.preventDefault();
          setShow(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setShow(false);
        }}
      >
        <img src={"/info_white.svg"} />
        <div className={`${show ? styles.modal : styles.hide}`}>
          <p>Set your time availability for one on ones for everyday</p>
        </div>
      </div>
    </div>
  );
}
