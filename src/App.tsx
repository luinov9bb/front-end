import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Cart from "./pages/Cart"
import { useFavorites } from "./context/FavoritesContext"
import { useCart } from "./context/CartContext"

function App(){
    const { favoriteIds } = useFavorites();
    const { totalItems } = useCart();
    const [search, setSearch] = useState("");

    return(
        <div className="app">
            <Header favoritesCount={favoriteIds.size} cartCount={totalItems} search={search} setSearch={setSearch} />
            <main className="appMain">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog search={search} setSearch={setSearch} />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App