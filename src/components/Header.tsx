import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  favoritesCount: number;
  cartCount: number;
  search: string;
  setSearch: (value: string) => void;
}

function Header({ favoritesCount, cartCount, search, setSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const badgeText = favoritesCount > 99 ? "99+" : String(favoritesCount);
  const cartBadgeText = cartCount > 99 ? "99+" : String(cartCount);
  const navigate = useNavigate();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSearch = (value: string) => {
    setSearch(value);
    navigate("/catalog");
    closeMobileMenu();
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} onClick={closeMobileMenu}>
        <h1>BookStore</h1>
      </Link>

      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск книг..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Поиск книг"
        />
      </div>

      {/* Hamburger menu button */}
      <button 
        className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Меню"
        aria-expanded={mobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Desktop Navigation and Actions */}
      <div className={styles.actions}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/contacts">Contacts</Link>
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

      {/* Mobile Menu */}
      <nav className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/catalog" onClick={closeMobileMenu}>Catalog</Link>
        <Link to="/contacts" onClick={closeMobileMenu}>Contacts</Link>
        
        <div className={styles.mobileDivider}></div>
        
        <button 
          className={styles.mobileCartButton} 
          type="button" 
          onClick={() => {
            navigate("/favorites");
            closeMobileMenu();
          }}
          aria-label="Избранное"
        >
          <span className={styles.cartIcon}>❤</span>
          <span>Избранное</span>
          {favoritesCount > 0 && (
            <span className={styles.cartBadge}>{badgeText}</span>
          )}
        </button>

        <Link 
          to="/cart" 
          className={styles.mobileCartButton} 
          onClick={closeMobileMenu}
          aria-label="В корзине"
        >
          <span className={styles.cartIcon}>🛒</span>
          <span>В корзине</span>
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartBadgeText}</span>
          )}
        </Link>
      </nav>
    </header>
  )
}

export default Header