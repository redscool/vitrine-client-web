import React, { useState } from "react";
import styles from "../../styles/components/space/Home.module.css";
import Editor from "../Editor";
import { resource_request_with_access_token } from "../../utils/Service";
export default function Home() {
  const [editorContent, setEditorContent] = useState();
  const [editorContentText, setEditorContentText] = useState("");

  const setEditorText = (editorText) => {
    setEditorContentText(editorText);
  };

  const setEditorData = (editorData) => {
    setEditorContent(editorData);
  };

  const handleSubmit = () => {
    resource_request_with_access_token(
      "post",
      "/api/space/stream/addEditor",
      {
        content: editorContent,
      },
      console.log,
      console.log
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.myclass}></div>
      <div className={styles.lowerContainer}>
        <div className={styles.notification}></div>
        <div className={styles.rightContainer}>
          <div className={styles.greenBoard}>
            <Editor
              expand
              setEditorContent={setEditorData}
              setEditorContentText={setEditorText}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          <div className={styles.stream}></div>
        </div>
      </div>
    </div>
  );
}
