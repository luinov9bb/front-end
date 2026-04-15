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
      image: "https://picsum.photos/1200/600?random=1",
      title: "Книги по литературе",
    },
    {
      id: 2,
      image: "https://picsum.photos/1200/600?random=2",
      title: "Популярные издания",
    },
    {
      id: 3,
      image: "https://picsum.photos/1200/600?random=3",
      title: "Лучшие бестселлеры",
    },
  ];

  return (
    <div className={homeStyles.contentPanel}>
      <Carousel slides={carouselSlides} autoPlay={true} autoPlayInterval={5000} />

      {/* Новые поступления */}
      <section className={homeStyles.newArrivalsSection}>
        <h2 className={homeStyles.sectionTitle}>Новые поступления</h2>
        <div className={homeStyles.booksGrid}>
          {latestBooks.map((book) => (
            <div key={book.id} className={homeStyles.bookCard}>
              <div className={homeStyles.bookImageContainer}>
                <img src={book.image} alt={book.name} className={homeStyles.bookImage} />
                <button
                  className={homeStyles.favoriteButton}
                  onClick={() => toggleFavorite(book.id)}
                  aria-label="Добавить в избранное"
                >
                  {favoriteIds.has(book.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <h3 className={homeStyles.bookTitle}>{book.name}</h3>
              <p className={homeStyles.bookAuthor}>{book.author}</p>
              <p className={homeStyles.bookPrice}>{book.price} ₽</p>
              <div className={homeStyles.bookRating}>
                <span>★ {book.rating}</span>
                <span className={homeStyles.reviewsCount}>({book.reviews_count})</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={AboutStyles.about}>
        <h2>О нашем магазине</h2>
        <p>
          BookStore - ваш надежный партнер в мире книг. Мы предлагаем огромный выбор литературы на любой вкус и возраст:
          от захватывающих романов и увлекательной фантастики до полезных учебников по программированию и книг по финансам.
          <br />
          <br />
          Каждая книга в нашем каталоге тщательно отобрана нашей командой экспертов. Мы работаем только с проверенными издательствами
          и авторами, чтобы гарантировать качество каждого издания. Наша миссия - сделать чтение доступным и удовольствием для каждого.
        </p>
      </section>

      <Features />
    </div>
  );
}

export default Home;
