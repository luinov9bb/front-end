import type { Product } from "../data/products"
import ProductCard from "./ProductCard"
import styles from "./ProductList.module.css"

type ProductListProps={
    products: Product[];
    favoriteIds: Set<number>;
    onToggleFavorite: (productId: number) => void;
}

function ProductList({products, favoriteIds, onToggleFavorite}:ProductListProps){
    return(
        <section className={styles.grid}>
            {products.map((p)=>(
              <ProductCard
                key={p.id}
                product={p}
                isFavorite={favoriteIds.has(p.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
        </section>
    )
}

export default ProductList