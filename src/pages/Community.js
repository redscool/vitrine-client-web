import styles from "../styles/pages/Community.module.css";
import Navbar from "../components/community/Navbar";
import Searchbar from "../components/community/Searchbar";
import SearchResults from "../components/community/SearchResults";
import { useState } from "react";

export default function Community() {
  const [results, setResults] = useState([]);
  return (
    <div className={styles.container}>
      <Navbar />
      <Searchbar setResults={setResults} />
      <SearchResults results={results} />
    </div>
  );
}
