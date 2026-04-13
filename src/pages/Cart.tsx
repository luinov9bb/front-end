import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h1>Корзина пуста</h1>
        <p>Пока что вы ничего не добавили в корзину</p>
        <Link to="/catalog" className={styles.continueShoppingBtn}>
          Продолжить покупки
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1>Корзина</h1>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />

              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p className={styles.itemPrice}>{item.price} лей</p>
              </div>

              <div className={styles.quantity}>
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className={styles.quantityBtn}
                >
                  −
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value) || 1)
                  }
                  className={styles.quantityInput}
                  min="1"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className={styles.quantityBtn}
                >
                  +
                </button>
              </div>

              <div className={styles.itemTotal}>
                {item.price * item.quantity} лей
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className={styles.removeBtn}
                aria-label={`Удалить ${item.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <aside className={styles.cartSummary}>
          <h2>Итого</h2>
          <div className={styles.summaryRow}>
            <span>Сумма:</span>
            <span>{totalPrice} лей</span>
          </div>
          <button className={styles.checkoutBtn}>Оформить заказ</button>
          <button
            onClick={clearCart}
            className={styles.clearCartBtn}
          >
            Очистить корзину
          </button>
          <Link to="/catalog" className={styles.continueShopping}>
            Продолжить покупки
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
