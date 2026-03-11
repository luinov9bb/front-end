import { useState } from "react"
import "./App.css"

import Header from "./components/Header"
import Hero from "./components/Hero"
import SearchBar from "./components/SearchBar"
import FilterButtons from "./components/FilterButtons"
import ProductList from "./components/ProductList"
import Counter from "./components/Counter"
import Footer from "./components/Footer"

import { products } from "./data/products"

function App() {

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  const filteredProducts = products
    .filter((p) => {
      const name = (p?.name ?? "").toLowerCase()
      const term = (search ?? "").toLowerCase()
      return name.includes(term)
    })
    .filter((p) =>
      category === "all" ? true : p.category === category
    )

  return (
    <>
      <Header />

      <Hero />

      <SearchBar search={search} setSearch={setSearch} />

      <FilterButtons setCategory={setCategory} />

      <Counter count={filteredProducts.length} />

      <ProductList products={filteredProducts} />

      <Footer />
    </>
  )
}

export default App