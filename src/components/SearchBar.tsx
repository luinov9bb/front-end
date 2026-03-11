type SearchBarProps = {
  search: string;
  setSearch: (value:string) => void;
}

function SearchBar ({search, setSearch} : SearchBarProps){
  return (
      <section className="search-section">
          <input
              className="search-input"
              type="text"
              placeholder="Поиск книг..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
      </section>
  )
}

export default SearchBar