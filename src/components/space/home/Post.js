import React from "react";
import Editor from "../../Editor";
import FileTile from "./FileTile";
import styles from "../../../styles/components/space/home/Post.module.css";

export default function Post({ post }) {
	return (
		<div className={styles.container}>
			{post.editor &&
			!(post.editor.ops.length == 1 && post.editor.ops[0].insert === "\n") ? (
				<Editor
					readOnly
					defaultContent={post.editor ?? ""}
					editorContent={post.editor}
				/>
			) : null}
			<div className={styles.files}>
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
