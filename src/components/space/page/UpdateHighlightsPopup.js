import { useState } from "react";
import styles from "../../../styles/components/dashboard/profile/UpdateProfilePopup.module.css";
import InputTextArea from "../../form_components/InputTextArea";
export default function UpdateHighlightsPopup({
  setView,
  highlights,
  setHighlights,
}) {
  const [tHighlights, setTHighlights] = useState(highlights);
  const addRowHelper = () => {
    const temp = [...tHighlights];
    temp.push("");
    setTHighlights(temp);
    console.log(tHighlights);
  };
  const removeRow = (ind) => {
    const temp = [...tHighlights];
    temp.splice(ind, 1);
    setTHighlights(temp);
  };
  const setRow = (ind, value) => {
    const temp = [...tHighlights];
    temp[ind] = value;
    setTHighlights(temp);
  };

  const upHelper = (ind) => {
    const temp = [...tHighlights];
    const t = temp[ind];
    temp[ind] = temp[ind - 1];
    temp[ind - 1] = t;
    setTHighlights(temp);
  };

  const downHelper = (ind) => {
    const temp = [...tHighlights];
    const t = temp[ind];
    temp[ind] = temp[ind + 1];
    temp[ind + 1] = t;
    setTHighlights(temp);
  };
  const handleSubmit = () => {
    const temp = tHighlights;
    setHighlights(temp.filter((a) => a.length));
    setView(false);
  };

  return (
    <div
      className={`${styles.mainContainer}`}
      onClick={() => {
        setView(false);
      }}
    >
      <div
        className={`${styles.container} ${styles.autoHeight}`}
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
              setView(false);
            }}
          >
            <img src="/cross.svg" />
          </div>
        </div>
        <div className={styles.highlightsContainer}>
          {tHighlights?.map((highlight, ind) => (
            <div className={styles.highlight} key={ind}>
              <div className={styles.upArrowIcon}>
                {ind ? (
                  <img src="/up_arrow.svg" onClick={() => upHelper(ind)} />
                ) : null}
              </div>
              <InputTextArea
                placeholder="Enter Heading"
                state={tHighlights[ind]}
                setState={(value) => setRow(ind, value)}
                id={String(ind)}
              />
              <div className={styles.downArrowIcon}>
                {ind !== tHighlights.length - 1 ? (
                  <img src="/down_arrow.svg" onClick={() => downHelper(ind)} />
                ) : null}
              </div>
              <div className={styles.deleteIcon}>
                <img
                  src="/delete_icon_red.svg"
                  onClick={() => removeRow(ind)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <div
            className={`${styles.button} ${styles.color}`}
            onClick={addRowHelper}
          >
            <p>Add Row</p>
          </div>
          <div className={styles.button} onClick={handleSubmit}>
            <p>Submit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
