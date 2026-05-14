import { useEffect, useState } from "react";
import FilterButtons from "../components/FilterButtons";
import ProductList from "../components/ProductList";
import Counter from "../components/Counter";
import { fetchBooks } from "../api/books";
import { useFavorites } from "../context/FavoritesContext";
import { bookCategoryLabels, type Book } from "../types/catalog";
import stateMessageStyles from "../pages/StateMessage.module.css";
import styles from "./Catalog.module.css";

function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await Promise.resolve();
      if (cancelled) {
        return;
      }
      setLoading(true);
      setLoadError(null);
      try {
        const list = await fetchBooks();
        if (!cancelled) {
          setBooks(list);
        }
      } catch {
        if (!cancelled) {
          setLoadError("Не удалось загрузить каталог. Проверьте, что API запущен.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = [...new Set(books.flatMap((book) => bookCategoryLabels(book.category)))].sort((a, b) =>
    a.localeCompare(b),
  );

  const filteredBooks = books
    .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
    .filter((book) =>
      category === "All" ? true : bookCategoryLabels(book.category).includes(category),
    );

  if (loading) {
    return (
      <section className={`${stateMessageStyles.stateMessage} ${stateMessageStyles.empty}`}>
        <p>Загрузка каталога…</p>
      </section>
    );
  }

  if (loadError) {
    return (
      <section className={`${stateMessageStyles.stateMessage} ${stateMessageStyles.empty}`}>
        <p>{loadError}</p>
      </section>
    );
  }

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
          <FilterButtons categories={categories} selectedCategory={category} setCategory={setCategory} />
        </aside>
        <main className={styles.content}>
          {filteredBooks.length === 0 ? (
            <div id="catalog" className={styles.emptyCatalog} role="status" aria-live="polite">
              <Counter count={0} centered />
              <p className={styles.emptyCatalogMsg}>Ничего не найдено</p>
              <p className={styles.emptyCatalogHint}>Попробуйте изменить поиск или категорию.</p>
            </div>
          ) : (
            <>
              <section id="catalog">
                <Counter count={filteredBooks.length} centered />
              </section>
              <ProductList
                products={filteredBooks}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
              />
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Catalog;
