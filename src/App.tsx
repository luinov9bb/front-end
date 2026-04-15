import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css"

import Layout from "./components/Layout"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Favorites from "./pages/Favorites"
import Contacts from "./pages/Contacts"

function App(){
    const [search, setSearch] = useState("");

    return(
        <Routes>
            <Route element={<Layout search={search} setSearch={setSearch} />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog search={search} setSearch={setSearch} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/contacts" element={<Contacts />} />
            </Route>
        </Routes>
    )
}

export default App