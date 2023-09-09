import { useState } from "react";
import styles from "../../../../styles/components/space/exercise/form/TitleCardEdit.module.css";
import Select from "../../../form/Select";
import { FORM_ENTITY_TYPES } from "../../../../constants";

export default function TitleCardEdit({
  children,
  customStyles,
  setSelected,
  index,
  changeQuestionTypeHandler,
  deleteHandler,
  addQuestionHandler,
  qId,
  moveUpHandler,
  moveDownHandler,
  qType,
}) {
  const [selectedItem, setSelectedItem] = useState(qType);
  const questionTypesArray = [FORM_ENTITY_TYPES.MCQ, FORM_ENTITY_TYPES.SHORT, FORM_ENTITY_TYPES.LONG, FORM_ENTITY_TYPES.FILE];
  return (
    <div className={styles.container}>
      <div
        className={`${styles.mainContainer} ${customStyles}`}
        onClick={() => setSelected(index)}
      >
        {children}
      </div>
      {customStyles ? null : <div> Drag me! </div>}
      {customStyles ? (
        <div className={styles.dropDownMenu}>
          {changeQuestionTypeHandler ? (
            <div className={styles.option}>
              <Select
                options={questionTypesArray}
                selectedItem={selectedItem}
                setSelectedItem={(e) => {
                  setSelectedItem(e);
                  changeQuestionTypeHandler(qId, e);
                }}
              />
            </div>
          ) : null}
          <div className={styles.option} onClick={addQuestionHandler}>
            <p> Add Question</p>
          </div>
          {deleteHandler ? (
            <div className={styles.option} onClick={deleteHandler}>
              <p> Delete </p>
            </div>
          ) : null}
          {moveUpHandler ? (
            <div className={styles.option} onClick={moveUpHandler}>
              <p> Up </p>
            </div>
          ) : null}
          {moveDownHandler ? (
            <div className={styles.option} onClick={moveDownHandler}>
              <p> Down </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
