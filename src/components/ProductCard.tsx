import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
    product: Product;
    isFavorite: boolean;
    onToggleFavorite: (productId: number) => void;
}

function ProductCard({product, isFavorite, onToggleFavorite}:ProductCardProps){
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    };

    return(
        <div className={styles.card}>
            <img src={product.image} alt={product.name} />
            <h3 className={styles.cardTitle} title={product.name}>{product.name}</h3>
            <p>{product.price} лей</p>
            <div className={styles.actions}>
                <button type="button" onClick={()=>onToggleFavorite(product.id)}>
                  {isFavorite ? "В избранном" : "В избранное"}
                </button>
                <button type="button" onClick={handleAddToCart} className={styles.cartBtn}>
                  В корзину
                </button>
            </div>
        </div>
    )
}

export default ProductCard  