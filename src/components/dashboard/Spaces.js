import React, { useEffect, useState } from "react";
import styles from "../../styles/components/dashboard/Spaces.module.css";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import SpaceTile from "./spaces/SpaceTile";
import AddSpacePopup from "./spaces/AddSpacePopup";
import { profileKeySelector } from "../../redux/profileReducer";
import Modal from "../Modal";
import AddButton from "../form_components/AddButton";

export default function Spaces() {
  const mode = useSelector(themeSelector);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [spaces, setSpaces] = useState([]);
  const spacesArray = useSelector(profileKeySelector("spaces"));
  useEffect(() => {
    setSpaces(spacesArray);
  }, [spacesArray, spaces]);
  return (
    <div className={styles.container}>
      {message ? <Modal setSuccess={setMessage} success={message} /> : null}
      {modal ? (
        <AddSpacePopup
          setMessage={setMessage}
          setView={setModal}
          setSpaces={setSpaces}
          spaces={spacesArray}
        />
      ) : null}
      {/* <div className={styles.header}>
        <div className={styles.reorderButton}>
          <div className={styles.buttonLabel}>
            <p>Reorder</p>
          </div>
          <div className={styles.buttonIcon}>
            <img
              src={
                mode === "dark"
                  ? "/reorder_icon_white.svg"
                  : "/reorder_icon_black.svg"
              }
            />
          </div>
        </div>
      </div> */}
      <div className={styles.mainContent}>
        {spaces?.map((space, indx) => {
          return <SpaceTile spaceObj={space} message={0} key={space._id} />;
        })}
        <AddButton onClick={() => setModal(true)} />
      </div>
    </div>
  );
}
