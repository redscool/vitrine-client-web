import React, { useState } from "react";
import styles from "../../styles_v2/components_v2/dashboard/Profile.module.css";
import Field from "./profile/Field";
import UploadImagePopup from "./profile/UploadImagePopup";
import UpdateProfilePopup from "./profile/UpdateProfilePopup";
import UpdateSocialsPopup from "./profile/UpdateSocialsPopup";
import UpdateBioPopup from "./profile/UpdateBioPopup";
import UpdateSettingPopup from "./profile/UpdateSettingPopup";
import { useSelector } from "react-redux";
import { profileKeySelector } from "../../redux/profileReducer";
import config from "../../config.json";
import Modal from "../Modal";

export default function Profile() {
  const [message, setMessage] = useState("");
  const FILE_SERVER = config.FILE_SERVER;
  const [profileHovered, setProfileHovered] = useState(false);
  const [uploadImagePopUp, setUploadImagePopUp] = useState(false);
  const [updateProfilePopup, setUpdateProfilePopup] = useState(false);
  const [updateSocialsPopup, setUpdateSocialsPopup] = useState(false);
  const [updateBioPopup, setUpdateBioPopup] = useState(false);
  const [updateSettingPopup, setUpdateSettingPopup] = useState(false);
  const name = useSelector(profileKeySelector("name"));
  const profilePicture = useSelector(profileKeySelector("profilePicture"));
  const coverPicture = useSelector(profileKeySelector("coverPicture"));
  const instagram = useSelector(profileKeySelector("instagram"));
  const x = useSelector(profileKeySelector("x"));
  const linkedIn = useSelector(profileKeySelector("linkedIn"));
  const about = useSelector(profileKeySelector("about"));
  const workingHours = useSelector(profileKeySelector("workingHours"));
  const offDays = useSelector(profileKeySelector("offDays"));
  const email = localStorage.getItem("email");
  const type = localStorage.getItem("type");
  return (
    <div className={styles.mainContainer}>
      <Modal success={message} setSuccess={setMessage} />
      <UploadImagePopup view={uploadImagePopUp} setView={setUploadImagePopUp} />
      {updateProfilePopup ? (
        <UpdateProfilePopup
          setView={setUpdateProfilePopup}
          setMessage={setMessage}
          oname={name}
        />
      ) : null}
      <UpdateBioPopup view={updateBioPopup} setView={setUpdateBioPopup} />
      {updateSocialsPopup ? (
        <UpdateSocialsPopup
          setView={setUpdateSocialsPopup}
          oinstagram={instagram}
          olinkedin={linkedIn}
          ox={x}
        />
      ) : null}
      <UpdateSettingPopup
        view={updateSettingPopup}
        setView={setUpdateSettingPopup}
      />
      <div className={styles.coverPicture}>
        <img src={`${FILE_SERVER}/getFile?id=${coverPicture}`} />
      </div>
      <div
        className={styles.profilePicture}
        onMouseEnter={(e) => {
          e.preventDefault();
          setProfileHovered(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setProfileHovered(false);
        }}
      >
        <img src={`${FILE_SERVER}/getFile?id=${profilePicture}`} id="1222" />
      </div>
      <div
        onClick={() => setUploadImagePopUp(true)}
        onMouseEnter={(e) => {
          e.preventDefault();
          setProfileHovered(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setProfileHovered(false);
        }}
        className={`${styles.editProfilePictureButton} ${
          profileHovered ? "" : styles.hide
        }`}
      >
        <img src="/pencil.svg" id="12" />
      </div>
      <div className={styles.changeCoverPictureButton}>
        <p>Change Profile Banner</p>
      </div>
      <div className={`${styles.section} ${styles.userProfileSection}`}>
        <div className={styles.label}>
          <p>User Profile</p>
        </div>
        <div
          className={styles.editButton}
          onClick={() => setUpdateProfilePopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        <Field keyname="Name" value={name} />
      </div>
      <div className={`${styles.section} ${styles.socialMediaSection}`}>
        <div className={styles.label}>
          <p>Social Media</p>
        </div>
        <div
          className={styles.editButton}
          onClick={() => setUpdateSocialsPopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        <div className={styles.socialMediaHandlesContainer}>
          <a
            className={styles.socialMediaHandles}
            href={linkedIn}
            target="_blank"
          >
            <img src="/linkedin.svg" />
          </a>
          <a className={styles.socialMediaHandles} href={x} target="_blank">
            <img src="/x.svg" />
          </a>
          <a
            className={styles.socialMediaHandles}
            href={instagram}
            target="_blank"
          >
            <img src="/instagram.svg" />
          </a>
        </div>
      </div>
      <div className={`${styles.section} ${styles.aboutMeSection}`}>
        <div className={styles.label}>
          <p>About Me</p>
        </div>
        <div
          className={styles.editButton}
          onClick={() => setUpdateBioPopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        <div className={styles.aboutMeContainer}>
          <p> {about} </p>
        </div>
      </div>
      <div className={`${styles.section} ${styles.oneOnOneSettingSection}`}>
        <div className={styles.label}>
          <p>One On One Setting</p>
        </div>
        <div
          className={styles.editButton}
          onClick={() => setUpdateSettingPopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        <Field keyname="Working Hours" value={workingHours} info />
        <Field keyname="Off Days" value={offDays?.join(" ")} info />
      </div>
      <div className={`${styles.section} ${styles.myAccountSection}`}>
        <div className={styles.label}>
          <p>My Account</p>
        </div>
        <div className={styles.editButton}></div>
        <Field keyname="Email" value={email} />
        <Field keyname="Account Type" value={type} />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={`${styles.buttons} ${styles.resetPasswordButton}`}>
          <p>Reset Password</p>
        </div>
        <div className={`${styles.buttons} ${styles.logoutButton}`}>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}
