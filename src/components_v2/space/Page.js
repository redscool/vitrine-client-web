import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles_v2/components_v2/dashboard/Profile.module.css";
import { getFileURL } from "../../utils/Misc";
import { ServiceContext } from "../../utils/context/serviceContext";
import Field from "../dashboard/profile/Field";
import Modal from "../Modal";
import UploadImagePopup from "./page/UploadImagePopup";
import UpdateHeadingPopup from "./page/UpdateHeadingPopup";
import UpdateHighlightsPopup from "./page/UpdateHighlightsPopup";
import UpdateDescriptionPopup from "./page/UpdateDescriptionPopup";
import UpdatePricingPopup from "./page/UpdatePricingModule";

export default function Page() {
  const [message, setMessage] = useState("");
  const [displayPictureHovered, setDisplayPictureHovered] = useState(false);
  const [isCoverPic, setIsCoverPic] = useState(false);
  const [uploadImagePopUp, setUploadImagePopUp] = useState(false);
  const [updateTitleBlockPopup, setUpdateTitleBlockPopup] = useState(false);
  const [updateHighlightsPopup, setUpdateHighlightsPopup] = useState(false);
  const [updateDescriptionPopup, setUpdateDescriptionPopup] = useState(false);
  const [updatePricingPopup, setUpdatePricingPopup] = useState(false);
  const serviceObj = useContext(ServiceContext);
  const { spaceId } = useParams();
  const [pProfileImg, setPProfileImg] = useState(false);
  const [fProfileImg, setFProfileImg] = useState(false);
  const [pBanner, setPBanner] = useState(false);
  const [fBanner, setFBanner] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [banner, setBanner] = useState("");
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const setDetails = (obj) => {
    setHeading(obj.heading);
    setSubHeading(obj.subHeading);
    setHighlights(obj.highlights ? obj.highlights : []);
    setDescription(obj.description);
    setPrice(obj.price);
    setBanner(obj.banner);
    setProfileImg(obj.profileImg);
  };
  useEffect(() => {
    serviceObj.request(
      "get",
      "/api/community/space/page",
      { id: spaceId },
      ({ data }) => {
        const { pageData } = data;
        setDetails(pageData);
      },
      console.log
    );
  }, []);
  const handleSave = () => {
    function sendData() {
      serviceObj.request(
        "post",
        "/api/space/page/createOrUpdate",
        {
          profileImg,
          banner,
          heading,
          subHeading,
          highlights,
          description,
          price,
        },
        console.log,
        console.log
      );
    }
    sendData()
  };
  const handlePreview = () => {};
  return (
    <div className={styles.mainContainer}>
      <Modal success={message} setSuccess={setMessage} />
      {uploadImagePopUp ? (
        <UploadImagePopup
          setView={setUploadImagePopUp}
          isCoverPic={isCoverPic}
          setMessage={setMessage}
          setPBanner={setPBanner}
          setFBanner={setFBanner}
          setPProfileImg={setPProfileImg}
          setFProfileImg={setFProfileImg}
        />
      ) : null}
      {updateTitleBlockPopup ? (
        <UpdateHeadingPopup
          setView={setUpdateTitleBlockPopup}
          heading={heading}
          setHeading={setHeading}
          subHeading={subHeading}
          setSubHeading={setSubHeading}
          setMessage={setMessage}
        />
      ) : null}
      {updateHighlightsPopup ? (
        <UpdateHighlightsPopup
          setView={setUpdateHighlightsPopup}
          highlights={highlights}
          setHighlights={setHighlights}
          setMessage={setMessage}
        />
      ) : null}
      {updateDescriptionPopup ? (
        <UpdateDescriptionPopup
          setView={setUpdateDescriptionPopup}
          description={description}
          setDescription={setDescription}
          setMessage={setMessage}
        />
      ) : null}
      {updatePricingPopup ? (
        <UpdatePricingPopup
          setView={setUpdatePricingPopup}
          price={price}
          setPrice={setPrice}
          setMessage={setMessage}
        />
      ) : null}
      <div className={styles.coverPicture}>
        <img src={pBanner ? pBanner : getFileURL(banner)} />
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
        <img src={pProfileImg ? pProfileImg : getFileURL(profileImg)} />
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
                <div className={styles.bulletPoints}></div>
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
          onClick={() => setUpdateDescriptionPopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        {description ? (
          <div
            className={`${styles.descriptionContainer} ${styles.aboutMeContainer}`}
          >
            <p>{description}</p>
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
          onClick={() => setUpdatePricingPopup(true)}
        >
          <img src={"/edit_white.svg"} />
        </div>
        <Field
          keyname="Plan Type"
          value={price === 0 ? "FREE" : "One Time Purchase"}
        />
        {price !== 0 ? (
          <Field
            keyname="Price"
            value={`${price ? `₹${price}` : "Price not set"}`}
          />
        ) : null}
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
