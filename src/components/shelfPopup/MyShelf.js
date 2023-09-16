import React, { useCallback, useEffect, useState } from "react";
import { resource_request_with_access_token } from "../../utils/Service";
import ShelfFiles from "./ShelfFiles";
import { useParams } from "react-router-dom";

export default function MyShelf({ addFile, folders }) {
	const [selectedFolderId, setSelectedFolderId] = useState();
	const [files, setFiles] = useState([]);
	const params = useParams();
	const spaceId = params.spaceId;

	const getFiles = () => {
		resource_request_with_access_token(
			"get",
			"/api/space/shelf/getFiles",
			{ folderId: selectedFolderId },
			({ data }) => {
				setFiles(data.data);
			},
			console.log
		);
	};

	const getResources = () => {
		resource_request_with_access_token(
			"get",
			`/api/space/form/getforms`,
			{ spaceId },
			({ data: { forms } }) => {
				setFiles(forms);
				console.log(forms);
			},
			console.log
		);
	};

	useEffect(() => {
		if (!selectedFolderId) return;
		if (selectedFolderId === "Resources") {
			getResources();
			return;
		}
		getFiles();
	}, [selectedFolderId]);

	return (
		<div>
			{!selectedFolderId ? (
				<>
					{folders.map((folder, indx) => (
						<p
							key={indx}
							onClick={() => setSelectedFolderId(folder._id)}
						>
							{folder.folderName}
						</p>
					))}
					<p onClick={() => setSelectedFolderId("Resources")}>Resources</p>
				</>
			) : (
				<ShelfFiles
					files={files}
					setSelectedFolderId={setSelectedFolderId}
					addFile={addFile}
				/>
			)}
		</div>
	);
}
