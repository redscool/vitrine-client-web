import styles from "../../../styles/components/space/home/Options.module.css";
export default function Options({ show, setOption, setShow }) {
  return (
    <div className={`${styles.container} ${show ? styles.visible : ""}`}>
      <div
        className={styles.option}
        title="Upload File"
        onClick={() => {
          setOption(1);
          setShow(false);
        }}
      >
        <img src="/upload_icon.svg" />
      </div>
      <div
        className={styles.option}
        title="Upload Image"
        onClick={() => {
          setOption(2);
          setShow(false);
        }}
      >
        <img src="/upload_image.svg" />
      </div>
      <div
        className={styles.option}
        title="Upload Video"
        onClick={() => {
          setOption(3);
          setShow(false);
        }}
      >
        <img src="/video_icon.svg" />
      </div>
      <div
        className={styles.option}
        title="Post a Poll"
        onClick={() => {
          setOption(4);
          setShow(false);
        }}
      >
        <img src="/poll_icon.svg" />
      </div>
      <div
        className={styles.option}
        title="Write Something"
        onClick={() => {
          setOption(5);
          setShow(false);
        }}
      >
        <img src="/editor_icon.svg" />
      </div>
    </div>
  );
}
