import styles from "../../../styles/components/classSpace/form/Form.module.css";
import QuestionCardEdit from "./QuestionCardEdit";

export default function Form() {
  return (
    <div className={styles.container}>
      <QuestionCardEdit />
    </div>
  );
}
