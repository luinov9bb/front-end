import styles from "./Features.module.css";

function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.featureCard}>
        <div className={styles.icon}>📦</div>
        <h3>Быстрая доставка</h3>
        <p>Доставляем заказы по всей стране в кратчайшие сроки</p>
      </div>

      <div className={styles.featureCard}>
        <div className={styles.icon}>📚</div>
        <h3>Большой ассортимент</h3>
        <p>Огромный выбор книг по всем жанрам</p>
      </div>

      <div className={styles.featureCard}>
        <div className={styles.icon}>✓</div>
        <h3>Гарантия качества</h3>
        <p>Все книги проверены нашей командой экспертов</p>
      </div>
    </section>
  );
}

export default Features;
