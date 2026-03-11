import { useEffect, useState } from "react";
import "./App.css"

import Header from "./components/Header"
import Hero from "./components/Hero"
import SearchBar from "./components/SearchBar"
import FilterButtons from "./components/FilterButtons"
import ProductList from "./components/ProductList"
import Counter from "./components/Counter"
import Footer from "./components/Footer"

import { products, type Product } from "./data/products";

function App(){

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

    const loadProducts = async () => {
        try{
            setLoading(true);
            setError(null);

            // всегда добавляем локальные мок-данные
            let combined: Product[] = [...products];

            // попытка получить дополнительные товары с fakestoreapi
            const response = await fetch("https://fakestoreapi.com/products");

            if(!response.ok){
                throw new Error("Response not ok");
            }

            type FakeStoreProduct = {
                id: number;
                title: string;
                price: number;
                category: string;
                image: string;
            };

            const data = await response.json();

            const apiProducts: Product[] = (data as FakeStoreProduct[]).map((item)=>({
                id: item.id + 1000,
                name: item.title,
                price: Math.round(item.price * 18),
                category: item.category,
                image: item.image,
            }));

            combined = [...combined, ...apiProducts];

            setAllProducts(combined);
        } catch{
            setError("Не удалось загрузить товары с fakestoreapi. Попробуйте ещё раз позже.");
        } finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        loadProducts();
    },[]);

    const filteredProducts = allProducts.filter((p)=>p.name.toLowerCase()
    .includes(search.toLocaleLowerCase())).filter((p)=>category === "All" ? true : p.category === category)

    const handleGoToCatalog = () => {
        const element = document.getElementById("catalog");
        if(element){
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleToggleFavorite = (productId: number) => {
        setFavoriteIds((prev)=>{
            const next = new Set(prev);
            if(next.has(productId)){
                next.delete(productId);
            } else {
                next.add(productId);
            }
            return next;
        });
    };

    return(
        <>
            <Header favoritesCount={favoriteIds.size} />

            <Hero onGoToCatalog={handleGoToCatalog} />

            <section className="about">
                <h2>О магазине</h2>
                <p>
                    Наш онлайн-магазин книг предлагает широкий выбор литературы:
                    от художественных романов и фантастики до учебников по программированию
                    и книгам по финансам. Мы стараемся подбирать только самые интересные
                    и полезные издания.
                </p>
            </section>

            <SearchBar search={search} setSearch={setSearch} />

            <FilterButtons setCategory={setCategory} />

            {loading && (
                <section className="state-message state-message--loading">
                    <p>Загрузка...</p>
                </section>
            )}

            {!loading && error && (
                <section className="state-message state-message--error">
                    <p>{error}</p>
                    <button onClick={loadProducts}>Повторить попытку</button>
                </section>
            )}

            {!loading && !error && (
                <>
                    <section id="catalog">
                        <Counter count={filteredProducts.length} />
                    </section>

                    {filteredProducts.length === 0 ? (
                        <section className="state-message state-message--empty">
                            <p>Ничего не найдено</p>
                        </section>
                    ) : (
                        <ProductList
                          products={filteredProducts}
                          favoriteIds={favoriteIds}
                          onToggleFavorite={handleToggleFavorite}
                        />
                    )}
                </>
            )}

            <Footer />
        </>
    )
}

export default App