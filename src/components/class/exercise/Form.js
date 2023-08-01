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
  const [titleEditor, setTitleEditor] = useState();

  const successCallback = (response) => {
    console.log(response);
    const { formData } = response.data;
    setTitle(formData.title);
    setTitleEditorContent(formData.titleEditorContent ?? formData.title);
    setEntities(formData.formEntities);
    setTitleEditor(formData.titleEditor);
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

  // useEffect(() => {
  //   console.log({ titleEditorContent });
  // }, [titleEditorContent]);

  const addFunction = () => {};

  const saveForm = () => {
    const body = {
      formId,
      formContent: {
        title,
        titleEditor,
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
        customStyles={styles.highlightSelected}
        index={0}
        setSelected={setSelected}
      >
        {titleEditorContent && (
          <Editor
            readOnly
            setEditorContent={setTitleEditorContent}
            defaultContent={titleEditorContent}
          />
        )}
      </TitleCardEdit>
      <div className={styles.formContainer}></div>
      <div className={styles.buttonsContainer}>
        <div
          className={styles.insertQuestionButton}
          // onClick={insertClickHandler}
        >
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
