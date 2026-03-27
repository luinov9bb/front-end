import { Link } from "react-router-dom";
import styles from "./Header.module.css";

type HeaderProps = {
  favoritesCount: number;
}

function Header({ favoritesCount }: HeaderProps) {
  const badgeText = favoritesCount > 99 ? "99+" : String(favoritesCount);

  return (
    <header>
      <h1>BookStore</h1>
      <div className={styles.headerRight}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <a href="#">Contacts</a>
        </nav>

        <button className={styles.cartButton} type="button" aria-label="Избранное">
          <span className={styles.cartIcon} aria-hidden="true">❤</span>
          <span>Избранное</span>
          {favoritesCount > 0 && (
            <span className={styles.cartBadge} aria-label={`В избранном: ${badgeText}`}>
              {badgeText}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header