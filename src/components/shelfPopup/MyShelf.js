import React, { useCallback, useEffect, useState } from "react";
import { resource_request_with_access_token } from "../../utils/Service";

export default function MyShelf({ addFile, folders }) {
	const [selectedFolderId, setSelectedFolderId] = useState();
	const [files, setFiles] = useState([]);

	const getFiles = () => {
		resource_request_with_access_token(
			"get",
			"/api/space/shelf/getFiles",
			{ folderId: selectedFolderId },
			({ data }) => {
				console.log("getFiles => ", data.data);
				setFiles(data.data);
			},
			console.log
		);
	};

	useEffect(() => {
		if (!selectedFolderId) return;
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
				</>
			) : (
				<>
					<div
						style={{
							cursor: "pointer",
							border: "solid 6px",
							height: "wrap-content",
							width: "5vw",
							backgroundColor: "black",
							color: "wheat",
						}}
						onClick={() => setSelectedFolderId(null)}
					>
						{"<--"}
					</div>
					{files.map((file, indx) => (
						<p
							onClick={() => addFile(file)}
							key={indx}
						>
							{file.fileName}
						</p>
					))}
				</>
			)}
		</div>
	);
}
