import React from 'react';

import styles from '../../../styles/components/community/Navbar.module.css';

export default function Navbar() {
	return (
		<div className={styles.container}>
			<img
				src="/logo.svg"
				alt="logo"
				className={styles.logo}
			/>
			<div className={styles.title}>
				<span className={styles.baljeetkode}>Baljeetkode</span>
				<span className={styles.community}>COMMUNITY</span>
			</div>
		</div>
	);
}
