import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from '../../styles_v2/components_v2/space/Shelf.module.css';
import { foldersSelector, setFolders } from '../../redux/shelfReducer';
import FolderTile from './shelf/FolderTile';
import AddFolderButton from './shelf/AddFolderButton';
import { ServiceContext } from '../../utils/context/serviceContext';

export default function Shelf() {
	const dispatch = useDispatch();
	const { spaceId } = useParams();
	const serviceObject = useContext(ServiceContext);

	useEffect(() => {
		async function getFolders() {
			serviceObject.request(
				'get',
				'/api/space/shelf/getFolders',
				{
					spaceId,
				},
				({ data }) => {
					dispatch(setFolders(data.data));
				},
				console.log
			);
		}
		getFolders();
	}, []);

	const folders = useSelector(foldersSelector);
	return (
		<div className={styles.container}>
			<div className={styles.mainContainer}>
				{folders.map(({ folderName, _id }) => (
					<FolderTile
						folderName={folderName}
						key={_id}
						id={_id}
					/>
				))}
			</div>
			<AddFolderButton folders={folders} />
			<div className={styles.spacesContainer}></div>
		</div>
	);
}
