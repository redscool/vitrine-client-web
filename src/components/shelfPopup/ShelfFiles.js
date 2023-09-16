import React from "react";

export default function ShelfFiles({ setSelectedFolderId, files, addFile }) {
	return (
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
					{file.fileName ?? file?.title}
				</p>
			))}
		</>
	);
}
