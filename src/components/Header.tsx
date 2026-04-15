import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./Header.module.css";

type HeaderProps = {
  favoritesCount: number;
  cartCount: number;
}

function Header({ favoritesCount, cartCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const badgeText = favoritesCount > 99 ? "99+" : String(favoritesCount);
  const cartBadgeText = cartCount > 99 ? "99+" : String(cartCount);
  const navigate = useNavigate();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} onClick={closeMobileMenu}>
        <h1>BookStore</h1>
      </Link>

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
          {isAdmin && (
            <Link to="/admin">Админ-панель</Link>
          )}
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

        {isAuthenticated && currentUser ? (
          <div className={styles.userSection}>
            <span className={styles.username}>{currentUser.username}</span>
            <button 
              className={styles.logoutButton}
              onClick={handleLogout}
              type="button"
              aria-label="Выйти"
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginButton}>
              Вход
            </Link>
            <Link to="/register" className={styles.registerButton}>
              Регистрация
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <nav className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/catalog" onClick={closeMobileMenu}>Catalog</Link>
        <Link to="/contacts" onClick={closeMobileMenu}>Contacts</Link>
        {isAdmin && (
          <Link to="/admin" onClick={closeMobileMenu}>Админ-панель</Link>
        )}
        
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

        <div className={styles.mobileDivider}></div>

        {isAuthenticated && currentUser ? (
          <div className={styles.mobileUserSection}>
            <span className={styles.mobileUsername}>{currentUser.username}</span>
            <button 
              className={styles.mobileLogoutButton}
              onClick={handleLogout}
              type="button"
              aria-label="Выйти"
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className={styles.mobileAuthButtons}>
            <Link 
              to="/login" 
              className={styles.mobileAuthLink}
              onClick={closeMobileMenu}
            >
              Вход
            </Link>
            <Link 
              to="/register" 
              className={styles.mobileAuthLink}
              onClick={closeMobileMenu}
            >
              Регистрация
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header