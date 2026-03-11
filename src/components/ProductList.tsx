import type { Product } from "../data/products"
import ProductCard from "./ProductCard"

type ProductListProps={
    products: Product[];
    favoriteIds: Set<number>;
    onToggleFavorite: (productId: number) => void;
}

function ProductList({products, favoriteIds, onToggleFavorite}:ProductListProps){
    return(
        <section className="grid">
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