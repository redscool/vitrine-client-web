import React, { useState } from "react";
import styles from "../../styles/components/space/Home.module.css";
import Editor from "../Editor";
import { resource_request_with_access_token } from "../../utils/Service";
import ShelfPopUp from "../ShelfPopUp";
import Button from "../form/Button";
import { notifyMe } from "../../utils/BrowserNotification";
import FileTile from "./home/FileTile";
import Stream from "./home/Stream";
export default function Home() {
	const [editorContent, setEditorContent] = useState();
	const [shelfPopUp, setShelfPopUp] = useState(false);
	const [files, setFiles] = useState([]);
	const [posts, setPosts] = useState([]);

	const setEditorText = (editorText) => {
		// setEditorContentText(editorText);
	};

	const setEditorData = (editorData) => {
		// editorContentState[0] = editorData;
		// console.log(editorContentState[0]);
		setEditorContent(editorData);
	};

	const addFile = (file) => {
		var isFileAlreadyPresent = false;
		files.forEach((obj) => {
			if (obj.fileName === file.fileName) {
				isFileAlreadyPresent = true;
			}
		});
		if (isFileAlreadyPresent) {
			alert("File is already uploaded!\nPlease select different file.");
			return;
		}
		files.push(file);
		setFiles(files);
		setShelfPopUp(false);
	};

	const handleSubmit = () => {
		const post = {
			editor: editorContent,
			filesAttached: files,
			type: "Post",
		};
		const tempPons = [...posts];
		tempPons.push(post);
		setPosts(tempPons);
		setFiles([]);
		// resource_request_with_access_token(
		// 	"post",
		// 	"/api/space/stream/addEditor",
		// 	{
		// 		content: editorContent,
		// 	},
		// 	console.log,
		// 	console.log
		// );
	};

	return (
		<div className={styles.mainContainer}>
			{shelfPopUp ? (
				<ShelfPopUp
					addFile={addFile}
					setPopUp={setShelfPopUp}
				/>
			) : null}
			<div className={styles.myclass}></div>
			<div className={styles.lowerContainer}>
				<div className={styles.notification}></div>
				<div className={styles.rightContainer}>
					<div className={styles.greenBoard}>
						<Editor
							expand
							setEditorContent={setEditorData}
							// readOnly
							// setEditorContentText={setEditorText}
						/>
						<div>
							{files.map((file, indx) => (
								<FileTile
									key={indx}
									file={file}
								/>
							))}
						</div>
						<div>
							<Button
								handleClick={() => setShelfPopUp(true)}
								label="Upload File"
							/>
							<div
								style={{
									cursor: "pointer",
									backgroundColor: "blue",
									color: "wheat",
									width: "5vw",
								}}
								onClick={handleSubmit}
							>
								Submit
							</div>
						</div>
					</div>
					<div className={styles.stream}>
						<Stream posts={posts} />
					</div>
				</div>
			</div>
		</div>
	);
}
