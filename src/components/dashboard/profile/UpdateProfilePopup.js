import React, { useContext, useState } from "react";
import InputField from "../../form_components/InputField";
import styles from "../../../styles/components/dashboard/profile/UpdateProfilePopup.module.css";
import { useDispatch } from "react-redux";
import { setProfileKey } from "../../../redux/profileReducer";
import { ServiceContext } from "../../../utils/context/serviceContext";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../../redux/authReducer";
export default function UpdateProfilePopup({ setView, setMessage, oname }) {
  const serviceObject = useContext(ServiceContext);
  const type = useSelector(authKeySelector("type"));
  const [name, setName] = useState(oname);
  const profileId = localStorage.getItem("profileId");
  const dispatch = useDispatch();
  const handleClick = () => {
    if (oname === name) {
      setMessage("New name is same as old name");
      setView(false);
      return;
    }

    serviceObject.request(
      "post",
      `/api/${type}/profile/update`,
      { profileId, name },
      ({ data }) => {
        setMessage(data.message);
        dispatch(setProfileKey(["name", name]));
        setName("");
      },
      () => undefined
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
            <p>Update Profile</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label="Name"
          placeholder="Enter your name"
          state={name}
          setState={setName}
        />
        <div className={styles.button} onClick={handleClick}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
