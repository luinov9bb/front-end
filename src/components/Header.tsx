import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

type HeaderProps = {
  favoritesCount: number;
  cartCount: number;
  search: string;
  setSearch: (value: string) => void;
}

function Header({ favoritesCount, cartCount, search, setSearch }: HeaderProps) {
  const badgeText = favoritesCount > 99 ? "99+" : String(favoritesCount);
  const cartBadgeText = cartCount > 99 ? "99+" : String(cartCount);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1>BookStore</h1>
      </div>

      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск книг..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            navigate("/catalog");
          }}
        />
      </div>

      <div className={styles.actions}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <a href="#">Contacts</a>
        </nav>

        <button className={styles.cartButton} type="button" aria-label="Избранное" onClick={() => navigate("/favorites")}>
          <span className={styles.cartIcon} aria-hidden="true">❤</span>
          <span>Избранное</span>
          {favoritesCount > 0 && (
            <span className={styles.cartBadge} aria-label={`В избранном: ${badgeText}`}>
              {badgeText}
            </span>
          )}
        </button>

        <Link to="/cart" className={styles.cartButton} aria-label="В корзине">
          <span className={styles.cartIcon} aria-hidden="true">🛒</span>
          <span>В корзине</span>
          {cartCount > 0 && (
            <span className={styles.cartBadge} aria-label={`В корзине: ${cartBadgeText}`}>
              {cartBadgeText}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}

export default Header