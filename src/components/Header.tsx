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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const badgeText = favoritesCount > 99 ? "99+" : String(favoritesCount);
  const cartBadgeText = cartCount > 99 ? "99+" : String(cartCount);
  const navigate = useNavigate();

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const closeUserMenu = () => setUserMenuOpen(false);

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
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 3.515c-1.825 0-3.49.9-4.5 2.34a5.495 5.495 0 0 0-4.5-2.34 5.503 5.503 0 0 0-3.89 9.39l8.39 8.39 8.39-8.39a5.503 5.503 0 0 0-3.89-9.39Zm2.83 8.33L12 19.175l-7.33-7.33a3.974 3.974 0 0 1-1.17-2.83c0-2.205 1.795-4 4-4 1.72 0 3.24 1.095 3.79 2.725a.748.748 0 0 0 1.42 0 3.996 3.996 0 0 1 3.79-2.725c2.205 0 4 1.795 4 4 0 1.07-.415 2.075-1.17 2.83Z" fill="#202023"/>
          </svg>
          <span>Избранное</span>
          {favoritesCount > 0 && (
            <span className={styles.cartBadge} aria-label={`В избранном: ${badgeText}`}>
              {badgeText}
            </span>
          )}
        </button>

        <Link to="/cart" className={styles.cartButton} aria-label="В корзине">
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.59 7.99c-.24-.31-.6-.49-.99-.49h-2.29l-5.425-5.425a1.258 1.258 0 0 0-1.77 0L5.69 7.5H3.4c-.39 0-.755.18-.99.49a1.24 1.24 0 0 0-.215 1.085l2.65 9.89a2.755 2.755 0 0 0 2.655 2.04h9a2.75 2.75 0 0 0 2.655-2.04l2.65-9.89c.1-.38.02-.775-.215-1.085ZM12 3.31l4.19 4.19H7.81L12 3.31Zm5.705 15.265c-.145.545-.64.925-1.205.925h-9c-.565 0-1.06-.38-1.205-.925L3.725 9h16.55l-2.565 9.575h-.005Z" fill="#202023"/>
          </svg>
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
          <div className={styles.userDropdown}>
            <button 
              className={styles.userMenuButton}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              type="button"
              aria-label="Пользователь"
              aria-expanded={userMenuOpen}
            >
              <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.5 7.5c0 3.035 2.465 5.5 5.5 5.5s5.5-2.465 5.5-5.5S15.035 2 12 2a5.503 5.503 0 0 0-5.5 5.5Zm1.5 0c0-2.205 1.795-4 4-4s4 1.795 4 4-1.795 4-4 4-4-1.795-4-4Zm10.57 10.91 1.015 3.785 1.45-.39-1.015-3.785a4.762 4.762 0 0 0-4.59-3.52H8.57a4.752 4.752 0 0 0-4.59 3.52l-1.015 3.785 1.45.39L5.43 18.41A3.253 3.253 0 0 1 8.57 16h6.86c1.47 0 2.76.99 3.14 2.41Z" fill="currentColor"/>
              </svg>
              <span>Пользователь</span>
            </button>
            {userMenuOpen && (
              <div className={styles.userDropdownMenu}>
                <Link 
                  to="/login" 
                  className={styles.dropdownLink}
                  onClick={closeUserMenu}
                >
                  Вход
                </Link>
                <Link 
                  to="/register" 
                  className={styles.dropdownLink}
                  onClick={closeUserMenu}
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <nav className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.75 21H14v-5.005a2 2 0 1 0-4 0V21H4.25C3.56 21 3 20.44 3 19.75v-9.315l8.13-7.885a1.24 1.24 0 0 1 1.74 0L21 10.435v9.315c0 .69-.56 1.25-1.25 1.25Zm-4.25-1.5h4v-8.435L12 3.795 4.5 11.07v8.435h4V16c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5v3.505-.005Z" fill="#202023"/>
        </svg>
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