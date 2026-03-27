import styles from "./Features.module.css";

function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.featureCard}>
        <div className={styles.icon}>🚚</div>
        <h3>Быстрая доставка</h3>
        <p>Доставляем заказы по всей стране в кратчайшие сроки с надежными курьерскими сервисами</p>
      </div>

      <div className={styles.featureCard}>
        <div className={styles.icon}>📚</div>
        <h3>Большой ассортимент</h3>
        <p>Огромный выбор книг по всем жанрам: от классической литературы до современных бестселлеров</p>
      </div>

      <div className={styles.featureCard}>
        <div className={styles.icon}>💰</div>
        <h3>Доступные цены</h3>
        <p>Выгодные цены и постоянные скидки делают качественные книги доступными для всех</p>
      </div>
    </section>
  );
}

export default Features;
