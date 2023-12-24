import React from 'react';

import styles from '../../../styles_v2/components_v2/community/Searchbar.module.css';

export default function Searchbar() {
	return (
		<div className={styles.container}>
			<input
				className={styles.inputBox}
				placeholder="Search Spaces"
			/>
			<div className={styles.searchBtn}>
				<img
					src="/search_icon.svg"
					className={styles.searchIcon}
				/>
			</div>
		</div>
	);
}
