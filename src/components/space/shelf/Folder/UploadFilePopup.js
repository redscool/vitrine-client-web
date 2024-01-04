import React, { useContext, useRef, useState } from "react";
import styles from "../../../../styles/components/space/shelf/folder/UploadFilePopup.module.css";
import { ServiceContext } from "../../../../utils/context/serviceContext";
import { file_server_request } from "../../../../utils/Service";
import { useParams } from "react-router-dom";

export default function UploadFilePopup({ setView, setFiles }) {
  const { folderId } = useParams();
  console.log(folderId);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const serviceObject = useContext(ServiceContext);

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
    const file = uploadedFile;
    if (!file) {
      alert("Please upload a file!!!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const fileName = file.name;
    file_server_request(
      "post",
      "/uploadFile",
      formData,
      ({ data }) => {
        const url = data.filename;
        serviceObject.request(
          "post",
          "/api/space/shelf/addFile",
          {
            folderId,
            fileName,
            url,
          },
          ({ data }) => {
            setFiles(data.data);
            setView(false);
          },
          (err) => {
            if (
              err?.response?.data?.message ===
              "File already present in the folder"
            ) {
              alert("File already present in the folder");
            }
            console.log("err", err.response.data);
          }
        );
      },
      console.log
    );
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
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
