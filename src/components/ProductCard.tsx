import type { Product } from "../data/products";

type ProductCardProps = {
    product: Product;
    isFavorite: boolean;
    onToggleFavorite: (productId: number) => void;
}

function ProductCard({product, isFavorite, onToggleFavorite}:ProductCardProps){
    return(
        <div className="card">
            <img src={product.image} alt={product.name} />
            <h3 className="card-title" title={product.name}>{product.name}</h3>
            <p>{product.price} лей</p>
            <button type="button" onClick={()=>onToggleFavorite(product.id)}>
              {isFavorite ? "В избранном" : "В избранное"}
            </button>
        </div>
    )
}

export default ProductCard  