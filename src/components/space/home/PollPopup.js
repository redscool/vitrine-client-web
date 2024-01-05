import React, { useContext, useState } from "react";
import styles from "../../../styles/components/space/home/PollPopup.module.css";
import { ServiceContext } from "../../../utils/context/serviceContext";
import { useParams } from "react-router-dom";
import { STREAM_TYPES } from "../../../constants";
import InputTextArea from "../../form_components/InputTextArea";
import Select from "../../form_components/Select";

export default function PollPopup({
  setView,
  streams,
  setStreams,
  setMessage,
}) {
  const [question, setQuestion] = useState("");
  const serviceObject = useContext(ServiceContext);
  const { spaceId } = useParams();
  const [options, setOptions] = useState([""]);
  const [type, setType] = useState(0);
  const saveFile = () => {
    setView(false);
    if (!question) {
      setMessage("Question can not be empty.");
      return;
    }
    serviceObject.request(
      "post",
      "/api/space/stream/addPost",
      {
        spaceId,
        type: STREAM_TYPES.POLL,
        poll: {
          question,
          options,
          type,
        },
      },
      ({ data }) => {
        console.log(data);
        setStreams([data.post, ...streams]);
      },
      (err) => {
        if (
          err?.response?.data?.message === "File already present in the folder"
        ) {
          alert("File already present in the folder");
        }
        console.log("err", err.response.data);
      }
    );
    setView(false);
  };

  const upHandler = (ind) => {
    const temp = options;
    const t = temp[ind];
    temp[ind] = temp[ind - 1];
    temp[ind - 1] = t;
    setOptions([...temp]);
  };

  const downHandler = (ind) => {
    const temp = options;
    const t = temp[ind];
    temp[ind] = temp[ind + 1];
    temp[ind + 1] = t;
    setOptions([...temp]);
  };

  const deleteHandler = (ind) => {
    const temp = options;
    temp.splice(ind, 1);
    setOptions([...temp]);
  };

  const insertHandler = (ind) => {
    const temp = options;
    setOptions([...temp.slice(0, ind + 1), "", ...temp.slice(ind + 1)]);
  };

  const setHandler = (ind, str) => {
    const temp = options;
    temp[ind] = str;
    setOptions([...temp]);
  };

  return (
    <div className={`${styles.mainContainer}`} onClick={() => setView(false)}>
      <div
        className={`${styles.container}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.cross} onClick={() => setView(false)}>
          <img src="/cross.svg" />
        </div>
        <div className={styles.title}>
          <p>Post a poll</p>
        </div>
        <div className={styles.label}>
          <p>Question</p>
        </div>
        <InputTextArea
          placeholder={"Type Something..."}
          setState={setQuestion}
          state={question}
          id={"question"}
        />
        <div className={styles.label}>
          <p>Options</p>
        </div>
        <div className={styles.options}>
          {options.map((option, ind) => (
            <div className={styles.option} key={ind}>
              <div className={`${styles.iconGroup}`}>
                <div className={`${styles.icon} ${styles.hide}`}></div>
                <div
                  className={`${styles.icon} ${ind == 0 ? styles.hide : ""}`}
                  onClick={() => upHandler(ind)}
                >
                  <img src="/up_arrow.svg" />
                </div>
                <div className={`${styles.icon}`}>
                  <div
                    className={`${styles.checkbox} ${
                      type ? "" : styles.circle
                    }`}
                  ></div>
                </div>
              </div>
              <InputTextArea
                id={ind}
                placeholder={"Type Something..."}
                state={option}
                setState={(str) => setHandler(ind, str)}
              />
              <div className={styles.iconGroup}>
                <div
                  className={`${styles.icon} ${
                    ind === options.length - 1 ? styles.hide : ""
                  }`}
                  onClick={() => downHandler(ind)}
                >
                  <img src="/down_arrow.svg" />
                </div>
                <div
                  className={`${styles.icon}`}
                  onClick={() => insertHandler(ind)}
                >
                  <img src="/add_button_white.svg" />
                </div>
                <div
                  className={`${styles.icon} ${
                    options.length === 1 ? styles.hide : ""
                  }`}
                  onClick={() => deleteHandler(ind)}
                >
                  <img src="/delete_icon_red.svg" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.select}>
            <Select
              options={["Single correct", "Multiple Correct"]}
              selectedItem={type}
              setSelectedItem={setType}
            />
          </div>
          <div className={styles.button} onClick={saveFile}>
            <p>Upload</p>
          </div>
        </div>
      </div>
    </div>
  );
}
