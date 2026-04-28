import { Routes, Route } from "react-router-dom";
import "./App.css"

import Layout from "./components/Layout"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Admin from "./pages/Admin"
import Profile from "./pages/Profile"
import Favorites from "./pages/Favorites"
import Contacts from "./pages/Contacts"
import BookDetails from "./pages/BookDetails"

function App(){
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/contacts" element={<Contacts />} />
            </Route>
        </Routes>
    )
}

export default App
