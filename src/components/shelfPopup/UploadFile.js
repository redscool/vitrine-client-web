import React, { useCallback, useRef, useState } from "react";
import styles from "../../styles/components/shelfPopup/UploadFile.module.css";
import {
	file_server_request,
	resource_request_with_access_token,
} from "../../utils/Service";
import Button from "../form/Button";

export default function UploadFile({ addFile, folders }) {
	const [selectedFolder, setSelectedFolder] = useState();
	const [isDragging, setIsDragging] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(null);

	const ref = useRef(null);

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
				console.log(url);
				resource_request_with_access_token(
					"post",
					"/api/space/shelf/addFile",
					{
						folderId: selectedFolder._id,
						fileName,
						url,
					},
					({ data }) => {
						console.log(data.data);
						addFile(data.file);
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

	return (
		<div className={styles.mainContainer}>
			<div className={styles.titleBar}>
				<div className={styles.selectedFolder}>
					<p>Upload file into {selectedFolder?.folderName ?? "..."}</p>{" "}
				</div>
				{selectedFolder ? (
					<div
						className={styles.backButton}
						onClick={() => {
							setSelectedFolder(null);
							setUploadedFile(null);
						}}
					>
						<img
							src="/back.png"
							alt="back"
						/>
					</div>
				) : null}
			</div>
			{!selectedFolder ? (
				<>
					{folders.map((folder, indx) => (
						<p
							key={indx}
							onClick={() => setSelectedFolder(folder)}
						>
							{folder.folderName}
						</p>
					))}
				</>
			) : (
				<>
					<div
						onDrop={handleFileDrop}
						onDragOver={(e) => e.preventDefault()}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onClick={(e) => {
							ref.current.click();
						}}
						style={{
							backgroundColor: isDragging ? "blue" : "white",
							height: "30vh",
							width: "90%",
							border: "dotted",
							margin: "auto",
							textAlign: "center",
							verticalAlign: "center",
						}}
					>
						{isDragging ? (
							<div
								style={{
									height: "100%",
									width: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									display: "flex",
									color: "wheat",
								}}
							>
								Drop your file here
							</div>
						) : (
							<>
								<div
									style={{
										color: "blue",
										height: "100%",
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										cursor: "pointer",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<div style={{ marginBottom: "5vh" }}>
										BROWSE <br /> or Drag a file here <br />
									</div>
									{uploadedFile ? <div>{uploadedFile.name}</div> : null}
								</div>
								<input
									type="file"
									style={{
										display: "none",
									}}
									ref={ref}
									onChange={(e) => {
										setUploadedFile(e.target.files[0]);
										// console.log(e.target.files[0]);
									}}
								/>
							</>
						)}
					</div>
					<Button
						label={"Submit"}
						handleClick={saveFile}
					/>
				</>
			)}
		</div>
	);
}
