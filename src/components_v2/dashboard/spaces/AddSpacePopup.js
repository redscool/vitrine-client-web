import React, { useContext, useState } from "react";
import InputField from "../../form_components/InputField";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateSocialsPopup.module.css";
import { ServiceContext } from "../../../utils/context/serviceContext";
import { useDispatch } from "react-redux";
import { setProfileKey } from "../../../redux/profileReducer";
export default function AddSpacePopup({ setView, setMessage, setSpaces,spaces }) {
  const dispatch = useDispatch();
  const serviceObject = useContext(ServiceContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = () => {
    if (!title) {
      setMessage("Title cannot be empty.");
      setView(false);
      return;
    }
    if (!description) {
      setMessage("Description cannot be empty.");
      setView(false);
      return;
    }
    serviceObject.request(
      "post",
      "/api/provider/createspace",
      { title, description},
      ({ data }) => {
        setMessage(data.message);
        const spacesArray = [...spaces];
        spacesArray.push(data.space)
        setSpaces(spacesArray)
        dispatch(setProfileKey(["spaces", spacesArray]));
      },
      console.log
    );
    setView(false);
  };
  return (
    <div className={`${styles.mainContainer}`} onClick={() => setView(false)}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>Add Space</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label="Title"
          placeholder="Title"
          state={title}
          setState={setTitle}
        />
        <InputField
          label="Description"
          placeholder="Description"
          state={description}
          setState={setDescription}
        />
        <div className={styles.button} onClick={handleClick}>
          <p>Add Space</p>
        </div>
      </div>
    </div>
  );
}
