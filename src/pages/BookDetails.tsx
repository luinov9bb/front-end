import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { findBookById } from "../mock/mockDB";
import styles from "./BookDetails.module.css";

function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const book = id ? findBookById(id) : undefined;

  if (!book) {
    return (
      <section className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Книга не найдена</h1>
        <p className={styles.notFoundText}>
          Похоже, этой книги нет в каталоге или ссылка больше неактуальна.
        </p>
      </section>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      name: book.title,
      price: book.price,
      image: book.coverImage,
      quantity: 1,
    });
  };

  return (
    <section className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.grid}>
          <div className={styles.coverFrame}>
            <img className={styles.cover} src={book.coverImage} alt={book.title} />
          </div>

          <div className={styles.details}>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.meta}>
              {book.author} • {book.genres.join(", ")} • {book.year}
            </p>
            <p className={styles.description}>{book.annotation}</p>
            <p className={styles.meta}>{book.pages} страниц</p>

            <div className={styles.bottom}>
              <p className={styles.price}>{book.price} лей</p>
              <button
                type="button"
                className={styles.button}
                onClick={handleAddToCart}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;
