import InputField from "../../form_components/InputField";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateProfilePopup.module.css";
export default function UpdateHeadingPopup({
  setView,
  heading,
  setHeading,
  subHeading,
  setSubHeading,
  spaceObj,
}) {
  return (
    <div
      className={`${styles.mainContainer}`}
      onClick={() => {
        setHeading(spaceObj?.heading);
        setSubHeading(spaceObj?.subHeading);
        setView(false);
      }}
    >
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>Update Heading</p>
          </div>
          <div
            className={styles.cross}
            onClick={() => {
              setHeading(spaceObj?.heading);
              setSubHeading(spaceObj?.subHeading);
              setView(false);
            }}
          >
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label="Heading"
          placeholder="Enter Heading"
          state={heading}
          setState={setHeading}
        />
        <InputField
          label="Sub Heading"
          placeholder="Enter Sub Heading"
          state={subHeading}
          setState={setSubHeading}
        />
        <div className={styles.button} onClick={() => setView(false)}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
