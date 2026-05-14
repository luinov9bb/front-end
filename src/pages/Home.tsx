import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AboutStyles from "../pages/About.module.css";
import homeStyles from "../pages/Home.module.css";
import Carousel from "../components/Carousel";
import Features from "../components/Features";
import { fetchBooks } from "../api/books";
import { useFavorites } from "../context/FavoritesContext";
import type { Book } from "../types/catalog";
import stateMessageStyles from "./StateMessage.module.css";

function Home() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

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
          setLoadError("Не удалось загрузить книги.");
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

  const latestBooks = [...books].sort((a, b) => a.id - b.id).slice(-3).reverse();

  const carouselSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80",
      title: "Книги для вдумчивого чтения",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1400&q=80",
      title: "Современная библиотека дома",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
      title: "Лучшие издания и классика",
    },
  ];

  return (
    <div className={homeStyles.contentPanel}>
      <Carousel slides={carouselSlides} autoPlay={true} autoPlayInterval={5000} />

      <section className={homeStyles.newArrivalsSection}>
        <h2 className={homeStyles.sectionTitle}>Новые поступления</h2>
        {loading ? (
          <p className={stateMessageStyles.stateMessage}>Загрузка…</p>
        ) : loadError ? (
          <p className={`${stateMessageStyles.stateMessage} ${stateMessageStyles.empty}`}>{loadError}</p>
        ) : (
          <div className={homeStyles.booksGrid}>
            {latestBooks.map((book) => {
              const isFavorite = Array.from(favoriteIds).some(
                (favoriteId) => String(favoriteId) === String(book.id),
              );
              const imgSrc = (book.coverImageUrl ?? "").trim();

              return (
                <div key={String(book.id)} className={homeStyles.bookCard}>
                  <div className={homeStyles.bookImageContainer}>
                    <Link to={`/books/${book.id}`}>
                      {imgSrc ? (
                        <img src={imgSrc} alt={book.title} className={homeStyles.bookImage} />
                      ) : (
                        <div className={homeStyles.bookImagePlaceholder}>Нет обложки</div>
                      )}
                    </Link>
                    <button
                      className={homeStyles.favoriteButton}
                      onClick={() => toggleFavorite(book.id)}
                      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                    >
                      {isFavorite ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
                            fill="#c43d4b"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M16.5 3.515c-1.825 0-3.49.9-4.5 2.34a5.495 5.495 0 0 0-4.5-2.34 5.503 5.503 0 0 0-3.89 9.39l8.39 8.39 8.39-8.39a5.503 5.503 0 0 0-3.89-9.39Zm2.83 8.33L12 19.175l-7.33-7.33a3.974 3.974 0 0 1-1.17-2.83c0-2.205 1.795-4 4-4 1.72 0 3.24 1.095 3.79 2.725a.748.748 0 0 0 1.42 0 3.996 3.996 0 0 1 3.79-2.725c2.205 0 4 1.795 4 4 0 1.07-.415 2.075-1.17 2.83Z"
                            fill="#202023"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <Link to={`/books/${book.id}`} className={homeStyles.bookTitleLink}>
                    <h3 className={homeStyles.bookTitle}>{book.title}</h3>
                  </Link>
                  <p className={homeStyles.bookAuthor}>{book.author}</p>
                  <p className={homeStyles.bookMeta}>
                    {book.category || "—"} • на складе: {book.stock} шт.
                  </p>
                  <p className={homeStyles.bookPrice}>{book.price} лей</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className={AboutStyles.about}>
        <h2>О нашем магазине</h2>
        <p>
          BookStore - ваш надежный партнер в мире книг. Мы собираем сильную художественную и нон-фикшн литературу:
          от классики и фэнтези до психологии, программирования и финансов.
          <br />
          <br />
          Каждое издание в каталоге отбирается с упором на качество, смысл и удовольствие от чтения. Наша цель -
          сделать хорошие книги доступными и помочь читателю быстро найти именно ту историю или идею, которая нужна
          сейчас.
        </p>
      </section>

      <Features />
    </div>
  );
}

export default Home;
