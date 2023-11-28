import React, { useState } from "react";
import InputField from "../../form_components/InputField";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateProfilePopup.module.css";
import { resource_request_with_access_token } from "../../../utils/Service";
import { useDispatch } from "react-redux";
import { setProfileKey } from "../../../redux/profileReducer";
export default function UpdateProfilePopup({
  setView,
  setMessage,
  oname,
}) {
  const [name, setName] = useState(oname);
  console.log(oname);
  const profileId = localStorage.getItem("profileId");
  const dispatch = useDispatch();
  const handleClick = () => {
    if (oname === name) {
      setMessage("New name is same as old name");
      setView(false);
      return;
    }

    resource_request_with_access_token(
      "post",
      "/api/provider/profile/update",
      { profileId, name },
      ({ data }) => {
        setMessage(data.message);
        dispatch(setProfileKey(["name", name]));
        setName("");
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
