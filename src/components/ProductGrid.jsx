import ProductCard from './ProductCard'

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </section>
  )
}

export default ProductGrid

