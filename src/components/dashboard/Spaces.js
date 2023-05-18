import React, { useState } from "react";
import styles from "../../styles/components/dashboard/Spaces.module.css";
import Button from "../form/Button";
import { auth_request } from "../../utils/Service";
import AddSpace from "./spaces/AddSpace";
export default function Spaces() {
  const [popup, setPopup] = useState();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Spaces</p>
      </div>
      {popup ? <AddSpace view={setPopup} /> : null}
      <div className={styles.content}>
        <Button
          label={"Add Space"}
          handleClick={() => {
            setPopup(!popup);
          }}
        />
      </div>
    </div>
  );
}
