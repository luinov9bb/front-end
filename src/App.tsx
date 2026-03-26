import { Routes, Route } from "react-router-dom";
import "./App.css"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import { useFavorites } from "./context/FavoritesContext"

function App(){
    const { favoriteIds } = useFavorites();
    
    return(
        <>
            <Header favoritesCount={favoriteIds.size} />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
            
            <Footer />
        </>
    )
}

export default App