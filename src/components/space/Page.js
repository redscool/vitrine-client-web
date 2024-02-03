import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/components/dashboard/Profile.module.css";
import { getFileURL } from "../../utils/Misc";
import { ServiceContext } from "../../utils/context/serviceContext";
import Field from "../dashboard/profile/Field";
import Modal from "../Modal";
import UploadImagePopup from "./page/UploadImagePopup";
import UpdateHeadingPopup from "./page/UpdateHeadingPopup";
import UpdateHighlightsPopup from "./page/UpdateHighlightsPopup";
import UpdateDescriptionPopup from "./page/UpdateDescriptionPopup";
import UpdatePricingPopup from "./page/UpdatePricingModule";
import { file_server_request } from "../../utils/Service";
import ConfirmationPopup from "./page/ConfirmationPopup";
import { USER_TYPES } from "../../constants";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../redux/authReducer";

export default function Page() {
  const type = useSelector(authKeySelector("type"));
  const [message, setMessage] = useState("");
  const [displayPictureHovered, setDisplayPictureHovered] = useState(false);
  const [isCoverPic, setIsCoverPic] = useState(false);
  const [uploadImagePopUp, setUploadImagePopUp] = useState(false);
  const [updateTitleBlockPopup, setUpdateTitleBlockPopup] = useState(false);
  const [updateHighlightsPopup, setUpdateHighlightsPopup] = useState(false);
  const [updateDescriptionPopup, setUpdateDescriptionPopup] = useState(false);
  const [updatePricingPopup, setUpdatePricingPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
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
  const [oprice, setOprice] = useState(0);
  const navigate = useNavigate();
  const setDetails = (obj) => {
    setHeading(obj.heading);
    setSubHeading(obj.subHeading);
    setHighlights(obj.highlights ? obj.highlights : []);
    setDescription(obj.description);
    setPrice(obj.price);
    setOprice(obj.price);
    setBanner(obj.banner);
    setProfileImg(obj.profileImg);
  };
  useEffect(() => {
    serviceObj.request(
      "get",
      "/api/community/space/page",
      { id: spaceId },
      ({ data }) => {
        const { pageData, space } = data;
        setDetails({
          ...pageData,
          price: Math.min(space.price, 2000),
        });
      },
      () => undefined
    );
  }, []);
  function sendData() {
    serviceObj.request(
      "post",
      "/api/space/page/createOrUpdate",
      {
        data: {
          id: spaceId,
          profileImg,
          banner,
          heading,
          subHeading,
          highlights,
          description,
          price,
        },
      },
      ({ data }) => {
        setMessage("Page saved successfully.");
        setFBanner(false);
        setPBanner(false);
        setFProfileImg(false);
        setPProfileImg(false);
      },
      () => undefined
    );
    setConfirmationPopup(false);
  }

  function handleSave() {
    if (fProfileImg) {
      file_server_request(
        "post",
        "/uploadFile",
        { file: fProfileImg },
        ({ data: { filename } }) => {
          setProfileImg(filename);
        },
        () => undefined
      );
    }
    if (fBanner) {
      file_server_request(
        "post",
        "/uploadFile",
        { file: fBanner },
        ({ data: { filename } }) => {
          setBanner(filename);
        },
        () => undefined
      );
    }
    setConfirmationPopup(true);
  }
  const handlePreview = () => {
    navigate(`/page/${spaceId}`);
  };
  const handleCancel = () => {
    if (fBanner) {
      file_server_request(
        "post",
        "/deleteFile",
        { file: banner },
        () => undefined,
        () => undefined
      );
    }
    if (fProfileImg) {
      file_server_request(
        "post",
        "/deleteFile",
        { file: profileImg },
        () => undefined,
        () => undefined,
        false
      );
    }
    setConfirmationPopup(false);
  };
  return (
    <div className={styles.mainContainer}>
      <Modal success={message} setSuccess={setMessage} />
      {confirmationPopup ? (
        <ConfirmationPopup
          handleCancel={handleCancel}
          handlePreview={handlePreview}
          handleSubmit={sendData}
          priceChanged={price != oprice}
        />
      ) : null}
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
      {type === USER_TYPES.PROVIDER ? (
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
      ) : null}
      {type === USER_TYPES.PROVIDER ? (
        <div
          className={styles.changeCoverPictureButton}
          onClick={() => {
            setIsCoverPic(true);
            setUploadImagePopUp(true);
          }}
        >
          <p>Change Profile Banner</p>
        </div>
      ) : null}

      {/* Title Block */}
      <div className={`${styles.section} ${styles.headingSection}`}>
        <div className={styles.label}>
          <p>Title Block</p>
        </div>
        <div
          className={styles.editButton}
          onClick={() => setUpdateTitleBlockPopup(true)}
        >
          {type === USER_TYPES.PROVIDER ? (
            <img src={"/edit_white.svg"} />
          ) : null}
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
          {type === USER_TYPES.PROVIDER ? (
            <img src={"/edit_white.svg"} />
          ) : null}
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
          {type === USER_TYPES.PROVIDER ? (
            <img src={"/edit_white.svg"} />
          ) : null}
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
          {type === USER_TYPES.PROVIDER ? (
            <img src={"/edit_white.svg"} />
          ) : null}
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

      {type === USER_TYPES.PROVIDER ? (
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
      ) : null}
    </div>
  );
}
