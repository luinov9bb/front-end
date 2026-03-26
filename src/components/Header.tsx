import { Link } from "react-router-dom";

type HeaderProps = {
  favoritesCount: number;
}

function Header({ favoritesCount }: HeaderProps) {
  const badgeText = favoritesCount > 99 ? "99+" : String(favoritesCount);

  return (
    <header>
      <h1>BookStore</h1>
      <div className="header-right">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <a href="#">Contacts</a>
        </nav>

        <button className="cart-button" type="button" aria-label="Избранное">
          <span className="cart-icon" aria-hidden="true">❤</span>
          <span>Избранное</span>
          {favoritesCount > 0 && (
            <span className="cart-badge" aria-label={`В избранном: ${badgeText}`}>
              {badgeText}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header