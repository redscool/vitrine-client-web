import React, { useState } from "react";
import InputField from "../../form_components/InputField";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateSocialsPopup.module.css";
export default function UpdateSocialsPopup({
  setView,
  oinstagram,
  ox,
  olinkedin,
}) {
  const [linkedin, setLinkedin] = useState(olinkedin);
  const [x, setX] = useState(ox);
  const [instagram, setInstagram] = useState(oinstagram);
  return (
    <div className={`${styles.mainContainer}`} onClick={() => setView(false)}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>Update Socials</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label="Linkedin"
          placeholder="Placeholder"
          state={linkedin}
          setState={setLinkedin}
        />
        <InputField
          label="X"
          placeholder="Placeholder"
          state={x}
          setState={setX}
        />
        <InputField
          label="Instagram"
          placeholder="Placeholder"
          state={instagram}
          setState={setInstagram}
        />
        <div className={styles.button}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
