import styles from "../../../styles/components/classSpace/exercise/Form.module.css";
import QuestionCardEdit from "./form/QuestionCardEdit";
import { useEffect, useState } from "react";
import TitleCardEdit from "./form/TitleCardEdit";
import Button from "../../form/Button";
import { resource_request_with_access_token } from "../../../utils/Service";
import { useParams } from "react-router-dom";
import Editor from "../../Editor";
export default function Form() {
  const params = useParams();
  const formId = params.formId;
  const [entities, setEntities] = useState([]);
  const [title, setTitle] = useState("");
  const [titleEditorContent, setTitleEditorContent] = useState();
  const [selected, setSelected] = useState(0);

  const successCallback = (response) => {
    console.log(response);
    const { formData } = response.data;
    setTitle(formData.title);
    setTitleEditorContent(formData.titleEditorContent ?? formData.title);
    setEntities(formData.entities);
  };

  useEffect(() => {
    resource_request_with_access_token(
      "get",
      "/api/class/form/getformbyid",
      { formId },
      successCallback,
      console.log
    );
  }, []);

  const changeEditorContent = (indx) => (content) => {
    setEntities(
      entities.map((ele, index) => {
        if (index === indx) {
          ele.content = content;
        }
        return ele;
      })
    );
  };

  const addFunction = () => {
    const tties = [...entities];
    tties.splice(selected, 0, { content: "Hi There" });
    setEntities(tties);
    // console.log("entities", entities);
    // console.log("tties", tties);
  };

  const saveForm = () => {
    const body = {
      formId,
      formContent: {
        title,
        titleEditorContent,
        entities,
      },
    };
    console.log(body);
    resource_request_with_access_token(
      "post",
      "/api/class/form/updateForm",
      body,
      console.log,
      console.log
    );
  };

  return (
    <div className={styles.container}>
      <TitleCardEdit
        customStyles={selected === 0 ? styles.highlightSelected : ""}
        index={0}
        key={0}
        setSelected={setSelected}
      >
        {titleEditorContent && (
          <Editor
            setEditorContent={setTitleEditorContent}
            defaultContent={titleEditorContent}
            key={0}
          />
        )}
      </TitleCardEdit>
      {console.log(entities)}
      {entities.map((element, indx) => (
        <TitleCardEdit
          customStyles={selected === indx + 1 ? styles.highlightSelected : ""}
          index={indx + 1}
          setSelected={setSelected}
          key={indx + 1}
        >
          {console.log(element.content)}
          <Editor
            setEditorContent={changeEditorContent(indx)}
            defaultContent={element.content}
            key={indx + 1}
          />
        </TitleCardEdit>
      ))}
      <div className={styles.buttonsContainer}>
        <div className={styles.insertQuestionButton} onClick={addFunction}>
          <img src="/add.png" />
        </div>
        <div
          className={styles.insertQuestionButton}
          // onClick={deleteClickHandler}
        >
          <img src="/close.png" />
        </div>
        <Button handleClick={saveForm} label="Save" />
      </div>
    </div>
  );
}
