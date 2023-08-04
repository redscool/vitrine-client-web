import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../../../styles/components/space/exercise/form/QuestionCardEdit.module.css";
import Editor from "../../../Editor";

export default function QuestionCardEdit({
  cur,
  setEditorContent,
  index,
  setSelected,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.description}>
          <Editor setEditorContent={setEditorContent} />
        </div>
      </div>
    </div>
  );
}
