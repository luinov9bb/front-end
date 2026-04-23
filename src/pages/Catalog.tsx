import { useState } from "react";
import FilterButtons from "../components/FilterButtons";
import ProductList from "../components/ProductList";
import Counter from "../components/Counter";
import { getBooks } from "../mock/mockDB";
import { useFavorites } from "../context/FavoritesContext";
import stateMessageStyles from "../pages/StateMessage.module.css";
import styles from "./Catalog.module.css";

function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { favoriteIds, toggleFavorite } = useFavorites();
  const books = getBooks();

  const genres = [...new Set(books.flatMap((book) => book.genres))].sort((a, b) =>
    a.localeCompare(b)
  );

  const filteredBooks = books
    .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
    .filter((book) => (category === "All" ? true : book.genres.includes(category)));

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск книг..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Поиск книг"
        />
      </div>

      <div className={styles.catalogRow}>
        <aside className={styles.sidebar}>
          <FilterButtons
            genres={genres}
            selectedGenre={category}
            setCategory={setCategory}
          />
        </aside>
        <main className={styles.content}>
          <section id="catalog">
            <Counter count={filteredBooks.length} />
          </section>

          {filteredBooks.length === 0 ? (
            <section className={`${stateMessageStyles.stateMessage} ${stateMessageStyles.empty}`}>
              <p>Ничего не найдено</p>
            </section>
          ) : (
            <ProductList
              products={filteredBooks}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default Catalog;
