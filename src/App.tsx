import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import { useFavorites } from "./context/FavoritesContext"

function App(){
    const { favoriteIds } = useFavorites();
    const [search, setSearch] = useState("");
    
    return(
        <div className="app">
            <Header favoritesCount={favoriteIds.size} search={search} setSearch={setSearch} />
            <main className="appMain">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog search={search} setSearch={setSearch} />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App