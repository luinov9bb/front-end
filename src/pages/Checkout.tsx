import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./Checkout.module.css";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      return;
    }

    clearCart();
    setSubmitted(true);
  };

  if (!cartItems.length && !submitted) {
    return (
      <div className={styles.emptyCheckout}>
        <h1>Корзина пуста</h1>
        <p>Добавьте товары в корзину, чтобы оформить заказ.</p>
        <Link to="/catalog" className={styles.shopButton}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <section className={styles.checkoutPage}>
      <div className={styles.checkoutPanel}>
        <div className={styles.checkoutHeader}>
          <div>
            <h1>Оформление заказа</h1>
            <p>Проверьте детали и заполните данные доставки.</p>
          </div>
        </div>

        {submitted ? (
          <div className={styles.confirmationCard}>
            <h2>Спасибо за заказ!</h2>
            <p>Ваш заказ успешно принят в обработку.</p>
            <Link to="/" className={styles.shopButton}>
              На главную
            </Link>
          </div>
        ) : (
          <div className={styles.checkoutGrid}>
            <div className={styles.checkoutFormCard}>
              <h2>Данные покупателя</h2>
              <form className={styles.checkoutForm} onSubmit={handleSubmit}>
                <label className={styles.fieldLabel} htmlFor="customerName">
                  Имя
                </label>
                <input
                  id="customerName"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={styles.fieldInput}
                  placeholder="ФИО"
                  required
                />

                <label className={styles.fieldLabel} htmlFor="customerPhone">
                  Телефон
                </label>
                <input
                  id="customerPhone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={styles.fieldInput}
                  placeholder="Например +373 600 00000"
                  required
                />

                <label className={styles.fieldLabel} htmlFor="deliveryAddress">
                  Адрес доставки
                </label>
                <textarea
                  id="deliveryAddress"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className={styles.textarea}
                  placeholder="Улица, дом, квартира"
                  rows={4}
                  required
                />

                <label className={styles.fieldLabel} htmlFor="orderComment">
                  Комментарий к заказу
                </label>
                <textarea
                  id="orderComment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className={styles.textarea}
                  placeholder="Например, удобное время доставки"
                  rows={3}
                />

                <button type="submit" className={styles.placeOrderButton}>
                  Оформить заказ
                </button>
              </form>
            </div>

            <aside className={styles.orderSummaryCard}>
              <h2>Ваш заказ</h2>
              <div className={styles.orderItems}>
                {cartItems.map((item) => (
                  <div key={String(item.id)} className={styles.orderItem}>
                    <div>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemQuantity}>x{item.quantity}</p>
                    </div>
                    <p className={styles.itemPrice}>{item.price * item.quantity} лей</p>
                  </div>
                ))}
              </div>
              <div className={styles.summaryRow}>
                <span>Итого</span>
                <strong>{totalPrice} лей</strong>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default Checkout;
