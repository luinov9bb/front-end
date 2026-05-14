import { Link } from "react-router-dom";
import styles from "./Contacts.module.css";

function Contacts() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Контакты</h1>
        <p className={styles.lead}>
          BookStore — учебный каталог книг. Если у вас вопрос по заказу или ассортименту, напишите или позвоните (данные вымышленные).
        </p>

        <section className={styles.block} aria-labelledby="contacts-address">
          <h2 id="contacts-address" className={styles.blockTitle}>
            Магазин
          </h2>
          <p className={styles.line}>
            <span className={styles.label}>Адрес:</span> Кишинэу, ул. Примерная, 1 (витрина и пункт выдачи)
          </p>
          <p className={styles.line}>
            <span className={styles.label}>Часы:</span> пн–сб 10:00–19:00, вс — выходной
          </p>
        </section>

        <section className={styles.block} aria-labelledby="contacts-reach">
          <h2 id="contacts-reach" className={styles.blockTitle}>
            Связь
          </h2>
          <p className={styles.line}>
            <span className={styles.label}>Email:</span>{" "}
            <a className={styles.link} href="mailto:email@email.com">
              email@email.com
            </a>
          </p>
          <p className={styles.line}>
            <span className={styles.label}>Телефон:</span>{" "}
            <a className={styles.link} href="tel:+377777777">
              +377 777 7777
            </a>
          </p>
        </section>

        <p className={styles.footerNote}>
          Каталог и корзина доступны без звонка —{" "}
          <Link className={styles.link} to="/catalog">
            перейти в каталог
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default Contacts;
