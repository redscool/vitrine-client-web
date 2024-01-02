import React, { useContext, useState } from "react";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UploadImagePopup.module.css";
import Cropper from "react-cropper";
import imageCompression from "browser-image-compression";
import "cropperjs/dist/cropper.css";
export default function UploadImagePopup({
  setView,
  isCoverPic,
  setMessage,
  setPProfileImg,
  setFProfileImg,
  setPBanner,
  setFBanner,
}) {
  const [rawImage, setRawImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [imageFile, setImageFile] = useState();
  const [mime, setMime] = useState();
  const [cropper, setCropper] = useState();
  const generateImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "myFileName", { type: mime });
    const compressedBlob = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
    });
    const compressedFile = new File([compressedBlob], "myFileName", {
      type: mime,
    });
    setPreviewImage(URL.createObjectURL(compressedBlob));
    setImageFile(compressedFile);
    setPreviewImage(URL.createObjectURL(file));
  };

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(undefined);
      setRawImage(reader.result);
      setMime(files[0].type);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = () => {
    if (imageFile) {
      if (isCoverPic) {
        setFBanner(imageFile);
        setPBanner(previewImage);
      } else {
        setFProfileImg(imageFile);
        setPProfileImg(previewImage);
      }
    } else setMessage("Please upload a picture");
    setView(false);
  };

  const handleCrop = async () => {
    if (typeof cropper !== "undefined") {
      const imageUrl = cropper.getCroppedCanvas().toDataURL();
      await generateImage(imageUrl);
    }
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
            <p>Select an Image</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        {!rawImage || previewImage ? (
          <label className={styles.iconContainer}>
            <input
              type="file"
              onChange={onChange}
              accept="image/png, image/jpeg"
            />
            <div className={styles.icon}>
              <img src={previewImage ?? "/upload_image_icon.svg"} />
            </div>
            <div className={styles.iconText}>
              <p>Upload Image</p>
            </div>
          </label>
        ) : (
          <Cropper
            style={{
              height: "30vh",
              width: "100%",
              backgroundColor: "cyan",
            }}
            zoomTo={0}
            aspectRatio={isCoverPic ? 16 / 3 : 1}
            src={rawImage}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => setCropper(instance)}
            guides={true}
          />
        )}
        {!rawImage || previewImage ? (
          <div className={styles.button} onClick={handleSubmit}>
            <p>Submit</p>
          </div>
        ) : (
          <div className={styles.button} onClick={handleCrop}>
            <p>Crop</p>
          </div>
        )}
      </div>
    </div>
  );
}
