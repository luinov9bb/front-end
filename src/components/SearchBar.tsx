import styles from "./SearchBar.module.css";

type SearchBarProps = {
  search: string;
  setSearch: (value:string) => void;
}

function SearchBar ({search, setSearch} : SearchBarProps){
  return (
      <section className={styles.searchSection}>
          <input
              className={styles.searchInput}
              type="text"
              placeholder="Поиск книг..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
      </section>
  )
}

export default SearchBar