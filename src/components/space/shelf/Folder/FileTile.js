import styles from "../../../../styles/components/space/shelf/folder/FileTile.module.css";
import config from "../../../../config.json";

export default function FileTile({
	fileName,
	fileId,
	url,
	setSelectedUrl,
	setSelectedFileId,
	setSelectedFileName,
}) {
	return (
		<a
			href={`${config.FILE_SERVER}/getFile?id=${url}`}
			onClick={(e) => e.preventDefault()}
			draggable
			target="blank"
			style={{ color: "inherit", textDecoration: "inherit", cursor: "default" }}
		>
			<div
				className={styles.container}
				onClick={(e) => {
					setSelectedFileId(fileId);
					setSelectedUrl(url);
					setSelectedFileName(fileName);
				}}
			>
				<div className={styles.icon}></div>
				<div className={styles.name}>
					<p>{fileName}</p>
				</div>
			</div>
		</a>
	);
}
