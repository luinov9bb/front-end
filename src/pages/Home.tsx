import { Link } from "react-router-dom";
import AboutStyles from "../pages/About.module.css";
import homeStyles from "../pages/Home.module.css";
import Carousel from "../components/Carousel";
import Features from "../components/Features";
import { getBooks } from "../mock/mockDB";
import { useFavorites } from "../context/FavoritesContext";

function Home() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const allBooks = getBooks();
  const latestBooks = allBooks.slice(-3).reverse();

  const carouselSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80",
      title: "Книги для вдумчивого чтения",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1400&q=80",
      title: "Современная библиотека дома",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
      title: "Лучшие издания и классика",
    },
  ];

  return (
    <div className={homeStyles.contentPanel}>
      <Carousel slides={carouselSlides} autoPlay={true} autoPlayInterval={5000} />

      <section className={homeStyles.newArrivalsSection}>
        <h2 className={homeStyles.sectionTitle}>Новые поступления</h2>
        <div className={homeStyles.booksGrid}>
          {latestBooks.map((book) => {
            const isFavorite = Array.from(favoriteIds).some(
              (favoriteId) => String(favoriteId) === String(book.id)
            );

            return (
              <div key={String(book.id)} className={homeStyles.bookCard}>
                <div className={homeStyles.bookImageContainer}>
                  <Link to={`/books/${book.id}`}>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className={homeStyles.bookImage}
                    />
                  </Link>
                  <button
                    className={homeStyles.favoriteButton}
                    onClick={() => toggleFavorite(book.id)}
                    aria-label="Добавить в избранное"
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>
                </div>
                <Link to={`/books/${book.id}`} className={homeStyles.bookTitleLink}>
                  <h3 className={homeStyles.bookTitle}>{book.title}</h3>
                </Link>
                <p className={homeStyles.bookAuthor}>{book.author}</p>
                <p className={homeStyles.bookMeta}>
                  {book.genres.join(", ")} • {book.year} • {book.pages} стр.
                </p>
                <p className={homeStyles.bookPrice}>{book.price} лей</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className={AboutStyles.about}>
        <h2>О нашем магазине</h2>
        <p>
          BookStore - ваш надежный партнер в мире книг. Мы собираем сильную
          художественную и нон-фикшн литературу: от классики и фэнтези до
          психологии, программирования и финансов.
          <br />
          <br />
          Каждое издание в каталоге отбирается с упором на качество, смысл и
          удовольствие от чтения. Наша цель - сделать хорошие книги доступными и
          помочь читателю быстро найти именно ту историю или идею, которая нужна
          сейчас.
        </p>
      </section>

      <Features />
    </div>
  );
}

export default Home;
