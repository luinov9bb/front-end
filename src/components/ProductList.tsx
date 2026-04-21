import type { Book, BookId } from "../mock/mockDB";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

type ProductListProps = {
  products: Book[];
  favoriteIds: Set<BookId>;
  onToggleFavorite: (productId: BookId) => void;
};

function ProductList({ products, favoriteIds, onToggleFavorite }: ProductListProps) {
  return (
    <section className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={String(product.id)}
          product={product}
          isFavorite={Array.from(favoriteIds).some(
            (favoriteId) => String(favoriteId) === String(product.id)
          )}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}

export default ProductList;
