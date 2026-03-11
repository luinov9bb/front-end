import type { Product } from "../data/products"
import ProductCard from "./ProductCard"

type Props = {
  products: Product[]
}

function ProductList({ products }: Props) {
  return (
    <section className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  )
}

export default ProductList