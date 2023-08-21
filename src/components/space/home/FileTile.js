import React from "react";
import styles from "../../../styles/components/space/home/FileTile.module.css";

export default function FileTile({ file }) {
	return (
		<div
			className={styles.container}
			onClick={(e) => {}}
		>
			<div className={styles.icon}></div>
			<div className={styles.name}>
				<p>{file.fileName}</p>
			</div>
		</div>
	);
}
