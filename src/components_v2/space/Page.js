import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles_v2/components_v2/dashboard/Profile.module.css";
import Field from "../dashboard/profile/Field";
// import UploadImagePopup from "./profile/UploadImagePopup";
// import UpdateSocialsPopup from "./profile/UpdateSocialsPopup";
// import UpdateBioPopup from "./profile/UpdateBioPopup";
// import UpdateSettingPopup from "./profile/UpdateSettingPopup";
import Modal from "../Modal";
import { useNavigate, useParams } from "react-router-dom";
import { auth_request } from "../../utils/Service";
import { getFileURL } from "../../utils/Misc";
import { ServiceContext } from "../../utils/context/serviceContext";
import UpdateHeadingPopup from "./page/UpdateHeadingPopup";
import UpdateHighlightsPopup from "./page/UpdateHighlightsPopup";

export default function Page() {
  const [message, setMessage] = useState("");
  const [displayPictureHovered, setDisplayPictureHovered] = useState(false);
  const [isCoverPic, setIsCoverPic] = useState(false);
  const [uploadImagePopUp, setUploadImagePopUp] = useState(false);
  const [updateTitleBlockPopup, setUpdateTitleBlockPopup] = useState(false);
  const [updateHighlightsPopup, setUpdateHighlightsPopup] = useState(false);
  const [updateDescriptionPopup, setUpdateDescriptionPopup] = useState(false);
  const [updatePricingPopup, setUpdatePricingPopup] = useState(false);
  const [space, setSpace] = useState({});
  const serviceObj = useContext(ServiceContext);
  const { spaceId } = useParams();
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [highlights, setHighlights] = useState([]);
  const navigate = useNavigate();
  const handleSave = () => {};
  useEffect(() => {
    serviceObj.request(
      "get",
      "/api/community/space/page",
      { id: spaceId },
      ({ data }) => {
        setSpace(data.pageData);
        const { pageData } = data;
        setHeading(pageData.heading);
        setSubHeading(pageData.subHeading);
        setHighlights(pageData.highlights ? pageData.highlights : []);
      },
      console.log
    );
  }, []);
  const handlePreview = () => {};
  return (
    <div className={styles.mainContainer}>
      <Modal success={message} setSuccess={setMessage} />
      {updateTitleBlockPopup ? (
        <UpdateHeadingPopup
          setView={setUpdateTitleBlockPopup}
          heading={heading}
          setHeading={setHeading}
          subHeading={subHeading}
          setSubHeading={setSubHeading}
          spaceObj={space}
        />
      ) : null}
      {updateHighlightsPopup ? (
        <UpdateHighlightsPopup
          setView={setUpdateTitleBlockPopup}
          spaceObj={space}
          highlights={highlights}
          setHighlights={setHighlights}
        />
      ) : null}
      {/* {uploadImagePopUp ? (
        <UploadImagePopup
          setView={setUploadImagePopUp}
          isCoverPic={isCoverPic}
          setMessage={setMessage}
        />
      ) : null}
      // {updateProfilePopup ? (
      //   <UpdateProfilePopup
      //     setView={setUpdateProfilePopup}
      //     setMessage={setMessage}
      //     oname={name}
      //   />
      // ) : null}
      {updateBioPopup ? (
        <UpdateBioPopup
          setView={setUpdateBioPopup}
          oabout={about}
          setMessage={setMessage}
        />
      ) : null}
      {updateSocialsPopup ? (
        <UpdateSocialsPopup
          setView={setUpdateSocialsPopup}
          setMessage={setMessage}
          oinstagram={instagram}
          olinkedIn={linkedIn}
          ox={x}
        />
      ) : null}
      {updateSettingPopup ? (
        <UpdateSettingPopup
          setView={setUpdateSettingPopup}
          ooffDays={offDays}
          oworkingHours={workingHours}
          setMessage={setMessage}
        />
      ) : null} */}
      <div className={styles.coverPicture}>
        <img src={getFileURL(space.banner)} />
      </div>
      <div
        className={styles.profilePicture}
        onMouseEnter={(e) => {
          e.preventDefault();
          setDisplayPictureHovered(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setDisplayPictureHovered(false);
        }}
      >
        <img src={getFileURL(space.profileImg)} />
      </div>
      <div
        onClick={() => {
          setIsCoverPic(false);
          setUploadImagePopUp(true);
        }}
        onMouseEnter={(e) => {
          e.preventDefault();
          setDisplayPictureHovered(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setDisplayPictureHovered(false);
        }}
        className={`${styles.editProfilePictureButton} ${
          displayPictureHovered ? "" : styles.hide
        }`}
      >
        <img src="/pencil.svg" />
      </div>
      <div
        className={styles.changeCoverPictureButton}
        onClick={() => {
          setIsCoverPic(true);
          setUploadImagePopUp(true);
        }}
      >
        <p>Change Profile Banner</p>
      </div>

      {/* Title Block */}
      <div className={`${styles.section} ${styles.headingSection}`}>
        <div className={styles.label}>
          <p>Title Block</p>
        </div>
        <div
          className={styles.editButton}
          onClick={() => setUpdateTitleBlockPopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        <Field keyname="Title" value={heading} />
        <Field keyname="Sub Title" value={subHeading} />
      </div>

      {/* Highlights Block */}
      <div className={`${styles.section} ${styles.highlightsSection}`}>
        <div className={styles.label}>
          <p>Highlights</p>
        </div>
        <div
          className={styles.editButton}
          onClick={() => setUpdateHighlightsPopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        <div className={styles.highlightsContainer}>
          {highlights && highlights.length > 0 ? (
            highlights.map((highlight, i) => (
              <div className={styles.highlight} key={i}>
                <p>{highlight}</p>
              </div>
            ))
          ) : (
            <p>Add Highlights</p>
          )}
        </div>
      </div>

      {/* Description Block */}
      <div className={`${styles.section} ${styles.descriptionSection}`}>
        <div className={styles.label}>
          <p>Description</p>
        </div>
        <div
          className={styles.editButton}
          onClick={() => setUpdateHighlightsPopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        {space.description ? (
          <div className={styles.descriptionContainer}>
            <p>{space.description}</p>
          </div>
        ) : (
          <div className={styles.warning}>
            <p>Update Description</p>
          </div>
        )}
      </div>

      {/* Pricing Block */}
      <div className={`${styles.section} ${styles.pricingSection}`}>
        <div className={styles.label}>
          <p>Pricing</p>
        </div>
        <div
          className={styles.editButton}
          onClick={() => setUpdateHighlightsPopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        <Field keyname="Plan Type" value="Monthly Subscription" />
        <Field keyname="Price" value="₹499" />
      </div>

      <div className={styles.buttonsContainer}>
        <div
          className={`${styles.buttons} ${styles.previewButton}`}
          onClick={handlePreview}
        >
          <p>Preview</p>
        </div>
        <div
          className={`${styles.buttons} ${styles.saveButton}`}
          onClick={handleSave}
        >
          <p>Save</p>
        </div>
      </div>
    </div>
  );
}
