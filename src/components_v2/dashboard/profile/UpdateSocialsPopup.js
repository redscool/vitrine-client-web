import React, { useContext, useState } from "react";
import InputField from "../../form_components/InputField";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateSocialsPopup.module.css";
import { ServiceContext } from "../../../utils/context/serviceContext";
import { useDispatch } from "react-redux";
import { setProfileKey } from "../../../redux/profileReducer";
export default function UpdateSocialsPopup({
  setView,
  oinstagram,
  ox,
  olinkedIn,
  setMessage,
}) {
  const dispatch = useDispatch();
  const serviceObject = useContext(ServiceContext);
  const [linkedIn, setLinkedIn] = useState(olinkedIn);
  const [x, setX] = useState(ox);
  const [instagram, setInstagram] = useState(oinstagram);
  const handleClick = () => {
    if (x === ox && linkedIn === olinkedIn && instagram === oinstagram) {
      setView(false);
      return;
    }
    serviceObject.request(
      "post",
      "/api/provider/profile/update",
      { linkedIn, instagram, x },
      ({ data }) => {
        setMessage(data.message);
        dispatch(setProfileKey(["instagram", instagram]));
        dispatch(setProfileKey(["linkedIn", linkedIn]));
        dispatch(setProfileKey(["x", x]));
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
            <p>Update Socials</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label="Linkedin"
          placeholder="Placeholder"
          state={linkedIn}
          setState={setLinkedIn}
        />
        <InputField
          label="X"
          placeholder="Placeholder"
          state={x}
          setState={setX}
        />
        <InputField
          label="Instagram"
          placeholder="Placeholder"
          state={instagram}
          setState={setInstagram}
        />
        <div className={styles.button} onClick={handleClick}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
