import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ServiceContext } from '../../../../utils/context/serviceContext';
import styles from '../../../../styles_v2/components_v2/space/shelf/AddFolderButton.module.css';
import { setFolders } from '../../../../redux/shelfReducer';

export default function AddFolderButton({ folders }) {
	const { spaceId } = useParams();
	const serviceObject = useContext(ServiceContext);
	const dispatch = useDispatch();

	async function createFolder() {
		serviceObject.request(
			'post',
			'/api/space/shelf/addFolder',
			{
				spaceId,
				folderName: 'New Folder',
			},
			({ data }) => {
				dispatch(setFolders([...folders, data.folder]));
			},
			console.log
		);
	}

	return (
		<div
			onClick={createFolder}
			className={styles.button}
		>
			+
		</div>
	);
}
