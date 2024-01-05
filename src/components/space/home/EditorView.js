import styles from "../../../styles/components/space/home/Editor.module.css";
import Editor from "../../Editor";
export default function EditorView({editor}) {
  console.log(editor);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Title Goes Here</p>
      </div>
      <div className={styles.mainContainer}>
        <Editor editorContent={editor} readOnly/>
      </div>
      <div className={styles.footer}>
        <img src="/open_link.svg" />
        <p>Open in Full Screen</p>
      </div>
    </div>
  );
}
