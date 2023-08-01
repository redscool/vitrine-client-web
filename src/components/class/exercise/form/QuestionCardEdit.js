import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../../../styles/components/classSpace/exercise/form/QuestionCardEdit.module.css";
import { insertAt, remove } from "../../../../utils/Linkedlist";
import Textbox from "../../../form/Textbox";
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
