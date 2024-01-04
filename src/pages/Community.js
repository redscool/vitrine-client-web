import React from 'react';
import Navbar from '../components/Community/Navbar';

import styles from '../styles/pages/community.module.css';
import Searchbar from '../components/Community/Searchbar';
import SearchResults from '../components/Community/SearchResults';

export default function Community() {
	return (
		<div className={styles.container}>
			<Navbar />
			<Searchbar />
			<SearchResults />
		</div>
	);
}
