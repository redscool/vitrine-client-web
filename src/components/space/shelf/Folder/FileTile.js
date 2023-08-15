import styles from "../../../../styles/components/space/shelf/folder/FileTile.module.css";

export default function FileTile({
  fileName,
  fileId,
  url,
  setSelectedUrl,
  setSelectedFileId,
}) {
  return (
    <div
      className={styles.container}
      onClick={() => {
        setSelectedFileId(fileId);
        setSelectedUrl(url);
      }}
    >
      <div className={styles.icon}></div>
      <div className={styles.name}>
        <p>{fileName}</p>
      </div>
    </div>
  );
}
