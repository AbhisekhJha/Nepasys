const ProductCard = ({ product, onAddToCart }) => {
  const rating = Number(product.rating ?? 0).toFixed(1)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/5 dark:bg-white/5">
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow dark:bg-slate-900/80 dark:text-slate-200">
          {product.category.replace(/-/g, ' ')}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
        <header className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{product.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{product.description}</p>
        </header>
        <div className="mt-auto flex items-center justify-between text-sm font-semibold">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/5 px-3 py-1 text-xs text-slate-500 dark:bg-white/10 dark:text-slate-200">
            ⭐ {rating}
          </span>
        </div>
        <button
          className="mt-4 w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-cyan-400 dark:text-slate-900"
          type="button"
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard

