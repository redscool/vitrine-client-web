import React from 'react';

import styles from '../../../styles/components/community/SearchResults.module.css';

export default function SearchResults() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Featured</div>
			<div className={styles.resultList}>spaces</div>
		</div>
	);
}
