import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import styles from "./Layout.module.css";

type LayoutProps = {
  search: string;
  setSearch: (value: string) => void;
}

function Layout({ search, setSearch }: LayoutProps) {
  const { favoriteIds } = useFavorites();
  const { totalItems } = useCart();

  return (
    <div className={styles.layoutContainer}>
      <Header 
        favoritesCount={favoriteIds.size} 
        cartCount={totalItems} 
        search={search} 
        setSearch={setSearch} 
      />
      <main className={styles.layoutMain}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
