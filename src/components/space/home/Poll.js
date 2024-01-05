import CheckBox from "../../form_components/CheckBox";
import styles from "../../../styles/components/space/home/Poll.module.css";
export default function Poll({ poll }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>{poll?.question}</p>
      </div>
      <div className={styles.mainContainer}>
        {poll?.options.map((option, ind) => (
          <div className={styles.option} key={ind}>
            <CheckBox label={option} type={poll?.type === 0 ? "circle" : ""} />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p>21 Oct | 10 : 32 am</p>
        <div className={styles.button}>
          <p>Click</p>
        </div>
      </div>
    </div>
  );
}
