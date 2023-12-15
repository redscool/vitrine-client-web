import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/components/ShelfPopUp.module.css';
import { foldersSelector } from '../redux/shelfReducer';
import MyShelf from './shelfPopup/MyShelf';
import UploadFile from './shelfPopup/UploadFile';
export default function ShelfPopUp({ addFile, setPopUp }) {
	const [selectedTab, setSelectedTab] = useState(true);
	const folders = useSelector(foldersSelector);
	return (
		<div className={styles.container}>
			<div className={styles.tabs}>
				<div
					onClick={() => setSelectedTab(true)}
					className={`${styles.tab} ${selectedTab ? styles.active : ''}`}
				>
					<p>Upload File</p>
				</div>
				<div
					onClick={() => setSelectedTab(false)}
					className={`${styles.tab} ${!selectedTab ? styles.active : ''}`}
				>
					<p>Shelf</p>
				</div>
				<div
					className={styles.closeButton}
					onClick={() => setPopUp(false)}
				>
					{' '}
					<p> X </p>
				</div>
			</div>
			<div>
				{selectedTab ? (
					<UploadFile
						addFile={addFile}
						folders={folders}
					/>
				) : (
					<MyShelf
						addFile={addFile}
						folders={folders}
					/>
				)}
			</div>
		</div>
	);
}
