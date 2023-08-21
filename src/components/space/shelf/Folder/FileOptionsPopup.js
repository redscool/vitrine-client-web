import styles from "../../../../styles/components/space/shelf/folder/FileOptionsPopup.module.css";
import config from "../../../../config.json";
import { resource_request_with_access_token } from "../../../../utils/Service";
import { useEffect, useState } from "react";
import TextBox from "../../../form/Textbox";
import { useParams } from "react-router-dom";
export default function OptionsPopup({
	setSelectedFileId,
	url,
	fileId,
	selectedFileName,
}) {
	const [fileName, setFileName] = useState(selectedFileName);
	const [moveModal, setMoveModal] = useState(false);
	const params = useParams();
	const spaceId = params.spaceId;
	const folderId = params.folderId;
	const [folderList, setFolderList] = useState([]);
	useEffect(() => {
		resource_request_with_access_token(
			"get",
			"/api/space/shelf/getFolders",
			{ spaceId },
			({ data }) => {
				setFolderList(data.data);
			},
			console.log
		);
	}, []);
	const moveHelper = (folderId) => {
		resource_request_with_access_token(
			"post",
			"/api/space/shelf/moveFile",
			{
				fileId,
				folderId,
			},
			(res) => {
				console.log(res);
				setSelectedFileId(false);
			},
			console.log
		);
	};
	const setFileNameHandler = (value) => {
		if (value.split(".").length == 1) return;
		const extension = fileName.split(".")[1];
		setFileName(value + (extension ?? ""));
	};
	const renameHelper = () => {
		if (!fileName) {
			alert("File name could not be empty");
			return;
		}
		resource_request_with_access_token(
			"post",
			"/api/space/shelf/renameFile",
			{ fileId, fileName },
			(res) => {
				setSelectedFileId(false);
				console.log(res);
			},
			console.log
		);
	};
	const deleteHelper = () => {
		resource_request_with_access_token(
			"post",
			"/api/space/shelf/deleteFile",
			{ fileId },
			(res) => {
				setSelectedFileId(false);
				console.log(res);
			},
			console.log
		);
	};
	return (
		<div className={styles.container}>
			{!moveModal ? (
				<>
					<div onClick={() => setSelectedFileId(false)}>x</div>
					<a
						href={`${config.FILE_SERVER}/getFile?id=${url}`}
						target="blank"
					>
						Open
					</a>
					<div>
						<TextBox
							label={"File Name"}
							setState={setFileName}
							state={fileName}
							type="text"
						/>
						<div onClick={renameHelper}>
							<p>Rename</p>
						</div>
					</div>
					<div onClick={() => setMoveModal(true)}>
						<p>Move</p>
					</div>
					<div onClick={deleteHelper}>
						<p>delete</p>
					</div>
				</>
			) : (
				<>
					{folderList.map((folderObj) => {
						if (folderObj._id !== folderId)
							return (
								<div onClick={() => moveHelper(folderObj._id)}>
									{folderObj.folderName}
								</div>
							);
					})}
				</>
			)}
		</div>
	);
}
