import type { Product } from "../data/products"

type Props = {
  product: Product
}

function ProductCard({ product }: Props) {
  return (
    <div className="card">
      <img src={product.image} width="120" />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button>Add to cart</button>
    </div>
  )
}

export default ProductCard