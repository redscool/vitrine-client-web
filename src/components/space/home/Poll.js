import CheckBox from "../../form_components/CheckBox";
import styles from "../../../styles/components/space/home/Poll.module.css";
export default function Poll() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>
          Hola amigos! please choose your preferred topic for Sunday’s live
          stream
        </p>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.option}>
          <CheckBox label={"Radio Option"} type="circle" />
        </div>
        <div className={styles.option}>
          <CheckBox label={"Radio Option"} type="circle" />
        </div>
        <div className={styles.option}>
          <CheckBox label={"Radio Option"} type="circle" />
        </div>
        <div className={styles.option}>
          <CheckBox label={"Radio Option"} type="circle" />
        </div>
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
