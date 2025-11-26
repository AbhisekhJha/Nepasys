const CartPanel = ({ items, isOpen, onToggle, onUpdateQuantity }) => {
  const list = Object.values(items)
  const totalItems = list.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = list.reduce((sum, item) => sum + item.quantity * item.product.price, 0)

  return (
    <aside className="pointer-events-none fixed bottom-6 right-6 z-20 flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={onToggle}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-white shadow-2xl transition hover:-translate-y-0.5 dark:bg-cyan-400 dark:text-slate-900"
      >
        🛒 Cart ({totalItems})
      </button>
      {isOpen && (
        <div className="pointer-events-auto w-[min(360px,90vw)] rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-glow dark:border-white/10 dark:bg-slate-900/95">
          <h2 className="text-lg font-semibold">Cart</h2>
          {!list.length && <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Your cart is empty.</p>}
          <ul className="mt-4 space-y-4">
            {list.map(({ product, quantity }) => (
              <li key={product.id} className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{product.title}</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">${product.price.toFixed(2)}</span>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold text-rose-500 hover:text-rose-400"
                    onClick={() => onUpdateQuantity(product.id, 0)}
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-sm font-semibold dark:border-white/10 dark:bg-white/5">
                    <button
                      type="button"
                      className="text-lg"
                      onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button type="button" className="text-lg" onClick={() => onUpdateQuantity(product.id, quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {!!list.length && (
            <div className="mt-6 flex items-center justify-between text-base font-semibold">
              <p>Total</p>
              <strong>${totalCost.toFixed(2)}</strong>
            </div>
          )}
        </div>
      )}
    </aside>
  )
}

export default CartPanel

