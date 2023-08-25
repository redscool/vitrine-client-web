import React from "react";
import Editor from "../../Editor";
import FileTile from "./FileTile";

export default function Post({ post }) {
	return (
		<div>
			<div>
				<Editor
					readOnly
					defaultContent={post.editor ?? ""}
				/>
				{post.filesAttached.map((file, indx) => (
					<FileTile
						file={file}
						key={indx}
					/>
				))}
			</div>
		</div>
	);
}
