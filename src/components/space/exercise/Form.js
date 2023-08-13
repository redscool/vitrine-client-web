import styles from "../../../styles/components/space/exercise/Form.module.css";
import QuestionCardEdit from "./form/QuestionCardEdit";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import TitleCardEdit from "./form/TitleCardEdit";
import Button from "../../form/Button";
import { resource_request_with_access_token } from "../../../utils/Service";
import { useParams } from "react-router-dom";
import Editor from "../../Editor";
import { v4 as uuid } from "uuid";
export default function Form() {
  const params = useParams();
  const formId = params.formId;
  const [entities, setEntities] = useState({});
  const [title, setTitle] = useState("");
  const [titleEditorContent, setTitleEditorContent] = useState();
  const [selected, setSelected] = useState(0);

  const successCallback = (response) => {
    console.log(response);
    const { formData } = response.data;
    setTitle(formData.title);
    setTitleEditorContent(formData.titleEditorContent ?? formData.title);
    setEntities(formData.entities ?? {});
  };

  useEffect(() => {
    resource_request_with_access_token(
      "get",
      "/api/space/form/getformbyid",
      { formId },
      successCallback,
      console.log
    );
  }, []);

  const changeEditorContent = (id) => (content) => {
    let tties = { ...entities };
    tties[id].content = content;
    // console.log(id);
    setEntities(tties);
    // console.log(entities[id].content);
    // console.log(tties);
    // Object.entries(entities).map((ele) => {
    //   if (ele[1].index === indx) {
    //     ele[1].content = content;
    //   }
    // console.log("ele = ", ele);
    // return ele;
    // })
  };

  const addFunction = () => {
    const tties = { ...entities };
    for (let tt in tties) {
      if (tties[tt].index > selected) {
        tties[tt].index++;
      }
    }

    // let id = uuid();
    tties[uuid()] = { content: "Hi There", index: selected + 1 };
    // tties.push({ content: "Hi There", index: selected + 1 });
    // tties.splice(selected, 0, { content: "Hi There" });
    setEntities(tties);
    // console.log("entities", entities);
    // console.log("tties", tties);
  };

  const deleteClickHandler = () => {
    if (selected === 0) return;
    let id;
    let tties = { ...entities };
    for (let tt in tties) {
      if (tties[tt].index === selected) {
        id = tt;
      } else if (tties[tt].index > selected) {
        tties[tt].index--;
      }
    }
    delete tties[id];
    setEntities(tties);
    setSelected(selected - 1);
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
      "/api/space/form/updateForm",
      body,
      console.log,
      console.log
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination || !result.source) return;
    const dest = result.destination.index;
    const source = result.source.index;
    console.log("dest = ", dest);
    console.log("source = ", source);

    if (source === dest) return;

    const tties = { ...entities };

    for (let tt in tties) {
      if (source < dest && tties[tt].index > source && tties[tt].index <= dest) {
        if (selected === tties[tt].index) {
          setSelected(selected - 1);
        }
        tties[tt].index--;
      } else if (source > dest && tties[tt].index < source && tties[tt].index >= dest) {
        if (selected === tties[tt].index) {
          setSelected(selected + 1);
        }
        tties[tt].index++;
      } else if (tties[tt].index === source) {
        tties[tt].index = dest;
      }
      // console.log(tties[tt].index);
    }
    console.log(selected);
    setEntities(tties);
  }

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <TitleCardEdit
          customStyles={selected === 0 ? styles.highlightSelected : ""}
          index={0}
          key={0}
          setSelected={setSelected}
        >
          {titleEditorContent && (
            <Editor
              // expand
              setEditorContent={setTitleEditorContent}
              defaultContent={titleEditorContent}
              key={0}
            />
          )}
        </TitleCardEdit>
        {/* {console.log(entities)} */}
        <Droppable droppableId="dnd-form-1">
          {
            (provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  // className={styles.columnMain}
                  style={{
                    ...(snapshot.isDraggingOver && {
                      background: "#F6E88A",
                    }),
                  }}
                >
                  {Object.entries(entities)
                    .sort((a, b) => a[1].index - b[1].index)
                    .map((element) => (
                      <Draggable
                        key={element[0]}
                        draggableId={element[0]}
                        index={element[1].index}
                        isDragDisabled={element[1].index === selected} >
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TitleCardEdit
                                customStyles={
                                  selected === element[1].index ? styles.highlightSelected : ""
                                }
                                index={element[1].index}
                                setSelected={setSelected}
                                key={element[0]}
                              >
                                {/* {console.log("element[0]", element[0])} */}
                                {/* {console.log("element = ", element)} */}
                                {/* {console.log("element[1] = ", element[1])} */}
                                {/* {console.log("element[1].index = ", element[1].index)} */}
                                <Editor
                                  expand
                                  setEditorContent={changeEditorContent(element[0])}
                                  defaultContent={element[1].content}
                                />
                              </TitleCardEdit>
                            </div>
                          )
                        }}
                      </Draggable>
                    ))}
                </div>
              )
            }
          }
        </Droppable>
        <div className={styles.buttonsContainer}>
          <div className={styles.insertQuestionButton} onClick={addFunction}>
            <img src="/add.png" />
          </div>
          <div
            className={styles.insertQuestionButton}
            onClick={deleteClickHandler}
          >
            <img src="/close.png" />
          </div>
          <Button handleClick={saveForm} label="Save" />
        </div>
      </DragDropContext>
    </div>
  );
}
