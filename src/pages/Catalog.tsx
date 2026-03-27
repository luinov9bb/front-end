import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import ProductList from "../components/ProductList";
import Counter from "../components/Counter";
import { products, type Product } from "../data/products";
import { useFavorites } from "../context/FavoritesContext";
import stateMessageStyles from "../pages/StateMessage.module.css";

function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favoriteIds, toggleFavorite } = useFavorites();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // всегда добавляем локальные мок-данные
      let combined: Product[] = [...products];

      // попытка получить дополнительные товары с fakestoreapi
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
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

      const apiProducts: Product[] = (data as FakeStoreProduct[]).map(
        (item) => ({
          id: item.id + 1000,
          name: item.title,
          price: Math.round(item.price * 18),
          category: item.category,
          image: item.image,
        })
      );

      combined = [...combined, ...apiProducts];

      setAllProducts(combined);
    } catch {
      setError(
        "Не удалось загрузить товары с fakestoreapi. Попробуйте ещё раз позже."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = allProducts
    .filter((p) => p.name.toLowerCase().includes(search.toLocaleLowerCase()))
    .filter((p) => (category === "All" ? true : p.category === category));

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <FilterButtons setCategory={setCategory} />

      {loading && (
        <section className={`${stateMessageStyles.stateMessage} ${stateMessageStyles.loading}`}>
          <p>Загрузка...</p>
        </section>
      )}

      {!loading && error && (
        <section className={`${stateMessageStyles.stateMessage} ${stateMessageStyles.error}`}>
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
            <section className={`${stateMessageStyles.stateMessage} ${stateMessageStyles.empty}`}>
              <p>Ничего не найдено</p>
            </section>
          ) : (
            <ProductList
              products={filteredProducts}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </>
      )}
    </>
  );
}

export default Catalog;