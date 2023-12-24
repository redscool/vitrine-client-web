import React from 'react';
import Navbar from '../components_v2/Community/Navbar';

import styles from '../styles_v2/pages_v2/community.module.css';
import Searchbar from '../components_v2/Community/Searchbar';
import SearchResults from '../components_v2/Community/SearchResults';

export default function Community() {
	return (
		<div className={styles.container}>
			<Navbar />
			<Searchbar />
			<SearchResults />
		</div>
	);
}
