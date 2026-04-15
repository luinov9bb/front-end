import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import styles from "./Layout.module.css";

function Layout() {
  const { favoriteIds } = useFavorites();
  const { totalItems } = useCart();

  return (
    <div className={styles.layoutContainer}>
      <Header 
        favoritesCount={favoriteIds.size} 
        cartCount={totalItems} 
      />
      <main className={styles.layoutMain}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
