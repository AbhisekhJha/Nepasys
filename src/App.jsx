import { useEffect, useMemo, useRef, useState } from 'react'
import CategoryFilter from './components/CategoryFilter'
import CartPanel from './components/CartPanel'
import ErrorState from './components/ErrorState'
import LoadingState from './components/LoadingState'
import ProductGrid from './components/ProductGrid'
import SearchBar from './components/SearchBar'
import SortSelect from './components/SortSelect'
import ThemeToggle from './components/ThemeToggle'
import { useProducts } from './hooks/useProducts'

const fallbackTheme = () => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState('none')
  const [theme, setTheme] = useState(fallbackTheme)
  const [cartItems, setCartItems] = useState({})
  const [isCartOpen, setIsCartOpen] = useState(false)
  const sentinelRef = useRef(null)

  const { products, isLoading, error, hasMore, loadNextPage } = useProducts({
    searchTerm,
    category: selectedCategory,
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const controller = new AbortController()
    const loadCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories', { signal: controller.signal })
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        const parsed = data
          .map((entry) => {
            if (typeof entry === 'string') return entry
            if (entry?.slug) return entry.slug
            if (entry?.name) return entry.name.toLowerCase().replace(/\s+/g, '-')
            return null
          })
          .filter(Boolean)
        setCategories(Array.from(new Set(parsed)).sort())
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err)
        }
      }
    }
    loadCategories()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          loadNextPage()
        }
      },
      { threshold: 1 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, isLoading, loadNextPage])

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()
    const filtered = normalized
      ? products.filter((product) => product.title.toLowerCase().includes(normalized))
      : products

    const unique = Array.from(new Map(filtered.map((product) => [product.id, product])).values())

    if (sortBy === 'none') return unique

    return [...unique].sort((a, b) => {
      switch (sortBy) {
        case 'price-desc':
          return b.price - a.price
        case 'price-asc':
          return a.price - b.price
        case 'rating-asc':
          return a.rating - b.rating
        case 'rating-desc':
        default:
          return b.rating - a.rating
      }
    })
  }, [products, searchTerm, sortBy])

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const entry = prev[product.id]
      const quantity = entry ? entry.quantity + 1 : 1
      return {
        ...prev,
        [product.id]: { product, quantity },
      }
    })
  }

  const handleQuantityChange = (productId, quantity) => {
    setCartItems((prev) => {
      const entry = prev[productId]
      if (!entry) return prev
      if (quantity <= 0) {
        const { [productId]: _, ...rest } = prev
        return rest
      }
      return {
        ...prev,
        [productId]: { ...entry, quantity },
      }
    })
  }

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'))

  const shouldShowEmpty = !filteredProducts.length && !isLoading && !error
  const shouldShowInitialLoader = isLoading && !products.length

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <header className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 p-8 text-white shadow-[0_25px_80px_rgba(15,23,42,0.45)] dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/80">Nepasys</p>
              <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Discover beautifully curated tech essentials
              </h1>
              <p className="max-w-2xl text-sm text-white/80 sm:text-base">
                Browse, search, and filter hundreds of products pulled live from the DummyJSON API. Infinite scroll and
                modern UI keep the experience silky smooth.
              </p>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)]" />
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <CategoryFilter categories={categories} selected={selectedCategory} onChange={setSelectedCategory} />
          <SortSelect value={sortBy} onChange={setSortBy} />
        </section>

        {error && <ErrorState message={error} onRetry={loadNextPage} />}

        {shouldShowInitialLoader && <LoadingState label="Fetching products…" />}

        {!shouldShowInitialLoader && shouldShowEmpty && (
          <div className="rounded-3xl border border-dashed border-slate-300/80 bg-white/60 p-10 text-center text-slate-500 shadow-inner dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            No products match your filters. Try broadening your search.
          </div>
        )}

        {!shouldShowInitialLoader && !shouldShowEmpty && (
          <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
        )}

        {(isLoading || hasMore) && (
          <div ref={sentinelRef} className="flex justify-center">
            {isLoading ? (
              <LoadingState label="Loading more products…" />
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">Scroll to reveal more drops</p>
            )}
          </div>
        )}
      </main>

      <CartPanel
        items={cartItems}
        isOpen={isCartOpen}
        onToggle={() => setIsCartOpen((prev) => !prev)}
        onUpdateQuantity={handleQuantityChange}
      />
    </div>
  )
}

export default App
