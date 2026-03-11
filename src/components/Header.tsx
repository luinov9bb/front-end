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
          <a href="#">Home</a>
          <a href="#">Catalog</a>
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