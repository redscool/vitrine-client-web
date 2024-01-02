import InputField from "../../form_components/InputField";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateProfilePopup.module.css";
import { useState } from "react";
export default function UpdateHeadingPopup({
  setView,
  heading,
  setHeading,
  subHeading,
  setSubHeading,
  setMessage,
}) {
  const [tHeading, setTHeading] = useState(heading);
  const [tSubHeading, setTSubHeading] = useState(subHeading);
  const handleSubmit = () => {
    setView(false);
    if (!tHeading || !tSubHeading) {
      setMessage(`${!tHeading ? "Title" : "Sub Title"} can not be empty.`);
      return;
    }
    setHeading(tHeading);
    setSubHeading(tSubHeading);
  };
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
            <p>Update Title</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label="Title"
          placeholder="Enter Title"
          state={tHeading}
          setState={setTHeading}
        />
        <InputField
          label="Sub Title"
          placeholder="Enter Sub Title"
          state={tSubHeading}
          setState={setTSubHeading}
        />
        <div className={styles.button} onClick={handleSubmit}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
