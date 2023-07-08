import styles from "../../../styles/components/classSpace/form/QuestionCardEdit.module.css";

export default function QuestionCardEdit({ node, cur }) {
  const insertClickHandler = () => {
    head.insert();
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}></div>
      <div className={styles.buttonContainer}>
        <div
          className={styles.insertQuestionButton}
          onClick={insertClickHandler()}
        >
          <img src="/add.png" />
        </div>
      </div>
    </div>
  );
}
