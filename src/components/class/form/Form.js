import styles from "../../../styles/components/classSpace/form/Form.module.css";
import QuestionCardEdit from "./QuestionCardEdit";
import { LinkedList, QuestionNode } from "../../../utils/Linkedlist.js";
import { useState } from "react";
export default function Form() {
  const head = new QuestionNode(<QuestionCardEdit />);
  const linkedList = new LinkedList(head);
  const [insert, setInsert] = useState(false);
  const questionsArray = [];
  let p = head;
  console.log(p);
  while (p) {
    questionsArray.push(<QuestionCardEdit node={p} insert={setInsert} />);
    p = p.next;
  }
  const [questions, setQuestions] = useState(linkedList);
  return <div className={styles.container}>{questionsArray}</div>;
}
