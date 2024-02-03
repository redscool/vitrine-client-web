import React, { useContext, useRef, useState } from "react";
import styles from "../../../styles/components/space/shelf/folder/UploadFilePopup.module.css";
import { ServiceContext } from "../../../utils/context/serviceContext";
import { file_server_request } from "../../../utils/Service";
import { useParams } from "react-router-dom";
import InputField from "../../form_components/InputField";
import { STREAM_TYPES } from "../../../constants";

export default function UploadPopup({
  setView,
  fileType,
  streams,
  setMessage,
  setStreams,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const serviceObject = useContext(ServiceContext);
  const { spaceId } = useParams();

  const ref = useRef(null);
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setUploadedFile(file);
    setIsDragging(false);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const saveFile = () => {
    setView(false);
    const file = uploadedFile;
    if (!file) {
      setMessage("Please upload a file!!!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    file_server_request(
      "post",
      "/uploadFile",
      formData,
      ({ data }) => {
        const url = data.filename;
        serviceObject.request(
          "post",
          "/api/space/stream/addPost",
          {
            spaceId,
            type: fileType,
            file: {
              url,
              title,
            },
          },
          ({ data }) => {
            setStreams([data.post, ...streams]);
          },
          (err) => {
            if (
              err?.response?.data?.message ===
              "File already present in the folder"
            ) {
              alert("File already present in the folder");
            }
          }
        );
      },
      () => undefined
    );
  };
  return (
    <div className={`${styles.mainContainer}`} onClick={() => setView(false)}>
      <div
        className={`${styles.container} ${styles.height}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>
              Upload a{fileType === STREAM_TYPES.IMAGE ? "n" : ""}{" "}
              {fileType.toLowerCase()}
            </p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <InputField
          label={"Title"}
          placeholder={"Enter title"}
          setState={setTitle}
          state={title}
        />
        <div
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={(e) => {
            ref.current.click();
          }}
          className={styles.iconContainer}
        >
          <div className={styles.icon}>
            <img src="/upload_file_icon.svg" />
          </div>
          {isDragging ? (
            <div className={styles.iconText}>
              <p>Drop your file here</p>
            </div>
          ) : (
            <>
              <div className={styles.iconText}>
                <p>
                  {uploadedFile
                    ? uploadedFile.name.substring(0, 20)
                    : "Browse or Drag a file here"}
                </p>
              </div>
              <input
                type="file"
                style={{
                  display: "none",
                }}
                ref={ref}
                onChange={(e) => {
                  setUploadedFile(e.target.files[0]);
                }}
              />
            </>
          )}
        </div>
        <div className={styles.button} onClick={saveFile}>
          <p>Upload</p>
        </div>
      </div>
    </div>
  );
}
