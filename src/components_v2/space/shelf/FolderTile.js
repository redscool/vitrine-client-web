import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from '../../../styles_v2/components_v2/space/shelf/FolderTile.module.css';
import { ServiceContext } from '../../../utils/context/serviceContext';
import { useDispatch } from 'react-redux';
import { updateFolder } from '../../../redux/shelfReducer';

export default function FolderTile({ folderName, id }) {
	const [popup, setPopup] = useState(false);

	const { spaceId } = useParams();
	const serviceObject = useContext(ServiceContext);
	const dispatch = useDispatch();

	async function handleRename(name) {
		serviceObject.request(
			'post',
			'/api/space/shelf/renameFolder',
			{
				folderId: id,
				folderName: name,
			},
			({ data }) => {
				console.log('data', data);
				dispatch(updateFolder(data.folder));
			},
			console.log
		);
	}

	return (
		<div
			className={styles.container}
			onClick={() => handleRename('Tito Popo')}
		>
			{popup ? (
				<div className={styles.popupContainer}>
					<div className={styles.popupMainContainer}>
						<div className={styles.option}>Open</div>
						<div className={styles.option}>Rename</div>
						<div className={styles.option}>Delete</div>
					</div>
				</div>
			) : null}
			<div className={styles.topContainer}>
				<div
					className={styles.icon}
					draggable
				>
					<img src="/folder_icon.svg" />
				</div>
				<div
					className={styles.moreButton}
					onClick={() => setPopup(!popup)}
				>
					<img src="/more_icon.svg" />
				</div>
			</div>
			<div className={styles.bottomContainer}>
				<p>{folderName}</p>
			</div>
		</div>
	);
}
