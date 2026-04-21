import { Link } from "react-router-dom";
import type { Book, BookId } from "../mock/mockDB";
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
      image: product.coverImage,
      quantity: 1,
    });
  };

  return (
    <div className={styles.card}>
      <Link to={`/books/${product.id}`} className={styles.cardLink}>
        <img src={product.coverImage} alt={product.title} />
        <h3 className={styles.cardTitle} title={product.title}>
          {product.title}
        </h3>
      </Link>
      <p>{product.price} лей</p>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          className={styles.favoriteBtn}
        >
          {isFavorite ? "В избранном" : "В избранное"}
        </button>
        <button type="button" onClick={handleAddToCart} className={styles.cartBtn}>
          В корзину
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
