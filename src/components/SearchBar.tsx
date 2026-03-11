type Props = {
    search: string
    setSearch: (value: string) => void
  }
  
  function SearchBar({ search, setSearch }: Props) {
    return (
      <section>
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
    )
  }
  
  export default SearchBar