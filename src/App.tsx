import { Routes, Route } from "react-router-dom";
import "./App.css"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"

function App(){
    return(
        <>
            <Header favoritesCount={0} />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
            
            <Footer />
        </>
    )
}

export default App