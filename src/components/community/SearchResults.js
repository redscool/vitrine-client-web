import styles from "../../styles/components/community/SearchResults.module.css";
import SpaceTile from "./SpaceTile";

export default function SearchResults({ results }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Featured</p>
      </div>
      <div className={styles.resultList}>
        {results.map((result, ind) => (
          <SpaceTile result={result} key={ind} />
        ))}
      </div>
    </div>
  );
}
