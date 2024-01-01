import InputField from "../../form_components/InputField";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateProfilePopup.module.css";
import InputFieldWithoutLabel from "../../form_components/InputFieldWithoutLabel";
import InputTextArea from "../../form_components/InputTextArea";
export default function UpdateHighlightsPopup({
  setView,
  spaceObj,
  highlights,
  setHighlights
}) {
  return (
    <div
      className={`${styles.mainContainer}`}
      onClick={() => {
        // setHeading(spaceObj?.heading);
        // setSubHeading(spaceObj?.subHeading);
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
            <p>Update Highlights</p>
          </div>
          <div
            className={styles.cross}
            onClick={() => {
              setHighlights([]);
              setView(false);
            }}
          >
            <img src="/cross.svg" />
          </div>
        </div>
        <div>
          <InputTextArea
            placeholder="Enter Heading"
            // state={heading}
            // setState={setHeading}
            id={"1"}
          />
        </div>
       
        <div className={styles.button} onClick={() => setView(false)}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
