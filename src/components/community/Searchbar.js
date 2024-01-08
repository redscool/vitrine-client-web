import { useState } from "react";
import styles from "../../styles/components/community/Searchbar.module.css";
import { auth_request } from "../../utils/Service";

export default function Searchbar({ setResults }) {
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    auth_request(
      "get",
      "/api/community/space/search",
      { query },
      ({ data }) => setResults(data),
      console.log
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputBox}>
        <input
          placeholder="Search Spaces"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={styles.searchBtn} onClick={handleSearch}>
        <img src="/search_icon.svg" />
      </div>
    </div>
  );
}
