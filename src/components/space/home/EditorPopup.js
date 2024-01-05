import React, { useContext, useState } from "react";
import styles from "../../../styles/components/space/home/PollPopup.module.css";
import { ServiceContext } from "../../../utils/context/serviceContext";
import { useParams } from "react-router-dom";
import { STREAM_TYPES } from "../../../constants";
import Editor from "../../Editor";

export default function EditorPopup({
  setView,
  streams,
  setStreams,
  setMessage,
}) {
  const [editorContent, setEditorContent] = useState();
  const serviceObject = useContext(ServiceContext);
  const { spaceId } = useParams();
  const saveFile = () => {
    setView(false);
    serviceObject.request(
      "post",
      "/api/space/stream/addPost",
      {
        spaceId,
        type: STREAM_TYPES.EDITOR,
        editor: editorContent,
      },
      ({ data }) => {
        console.log(data);
        setStreams([data.post, ...streams]);
      },
      (err) => {
        if (
          err?.response?.data?.message === "File already present in the folder"
        ) {
          alert("File already present in the folder");
        }
        console.log("err", err.response.data);
      }
    );
    setView(false);
  };

  return (
    <div className={`${styles.mainContainer} `} onClick={() => setView(false)}>
      <div
        className={`${styles.container} ${styles.editorMainContainer}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.cross} onClick={() => setView(false)}>
          <img src="/cross_black.svg" />
        </div>
        <div className={`${styles.title} ${styles.blackColor}`}>
          <p>Post an editor</p>
        </div>
        <div className={styles.editorContainer}>
          <Editor
            setEditorContent={setEditorContent}
            editorContent={editorContent}
            expand={true}
          />
        </div>
        <div className={styles.button} onClick={saveFile}>
          <p>Upload</p>
        </div>
      </div>
    </div>
  );
}
