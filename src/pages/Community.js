import styles from '../styles/pages/community.module.css';
import Navbar from '../components/community/Navbar';
import Searchbar from '../components/community/Searchbar';
import SearchResults from '../components/community/SearchResults';

export default function Community() {
	return (
		<div className={styles.container}>
			<Navbar />
			<Searchbar />
			<SearchResults />
		</div>
	);
}
