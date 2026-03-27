import styles from "./Footer.module.css";

function Footer(){
  return (
      <footer className={styles.footer}>
          <p>© 2026 BookStore</p>
          <p>Все права защищены</p>
          <p>Свяжитесь с нами: </p>
      </footer>
  )
}

export default Footer