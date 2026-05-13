import { Link } from "react-router-dom";
import type { Book, BookId } from "../types/catalog";
import { useCart } from "../context/CartContext";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Book;
  isFavorite: boolean;
  onToggleFavorite: (productId: BookId) => void;
};

function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.coverImageUrl ?? "",
      quantity: 1,
    });
  };

  const handleFavoriteClick = () => {
    onToggleFavorite(product.id);
  };

  return (
    <div className={styles.card}>
      <button
        type="button"
        onClick={handleFavoriteClick}
        className={styles.favoriteIcon}
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

      <Link to={`/books/${product.id}`} className={styles.cardLink}>
        <img src={product.coverImageUrl ?? ""} alt={product.title} />
        <h3 className={styles.cardTitle} title={product.title}>
          {product.title}
        </h3>
      </Link>

      <p>{product.price} лей</p>

      <div className={styles.actions}>
        <button type="button" onClick={handleAddToCart} className={styles.cartBtn}>
          В корзину
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
