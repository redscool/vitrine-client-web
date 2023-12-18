import React, { useContext, useState } from "react";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateBioPopup.module.css";
import { ServiceContext } from "../../../utils/context/serviceContext";
import { useDispatch } from "react-redux";
import { setProfileKey } from "../../../redux/profileReducer";
export default function UpdateBioPopup({ setView, setMessage, oabout }) {
  const [about, setAbout] = useState(oabout);
  const serviceObject = useContext(ServiceContext);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (oabout === about) {
      setView(false);
      return;
    }
    serviceObject.request(
      "post",
      "/api/provider/profile/update",
      { about },
      ({ data }) => {
        setMessage(data.message);
        dispatch(setProfileKey(["about", about]));
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
            <p>Update Bio</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About me goes here...."
          />
        </div>
        <div className={styles.button} onClick={handleClick}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
