import { useCallback, useEffect, useRef, useState } from 'react'

const PAGE_SIZE = 18
const API_BASE = 'https://dummyjson.com/products'

const parseError = (error) =>
  error instanceof Error ? error.message : 'Something went wrong while loading products.'

const buildUrl = ({ skip, search, category }) => {
  const params = new URLSearchParams({
    limit: PAGE_SIZE.toString(),
    skip: skip.toString(),
  })

  if (category && category !== 'all') {
    return `${API_BASE}/category/${category}?${params.toString()}`
  }

  if (search) {
    params.set('q', search)
    return `${API_BASE}/search?${params.toString()}`
  }

  return `${API_BASE}?${params.toString()}`
}

const fetchProductsPage = async ({ skip, search, category }) => {
  const response = await fetch(buildUrl({ skip, search, category }))
  if (!response.ok) {
    throw new Error('Failed to fetch products. Please try again.')
  }
  return response.json()
}

const matchesSearch = (product, search) => {
  if (!search) return true
  const haystack = `${product.title} ${product.description ?? ''}`.toLowerCase()
  return haystack.includes(search)
}

export const useProducts = ({ searchTerm = '', category = 'all' } = {}) => {
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const searchParam = searchTerm.trim()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const totalRef = useRef(Infinity)
  const skipRef = useRef(0)

  const loadNextPage = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchProductsPage({ skip: skipRef.current, search: searchParam, category })
      const filteredBatch = data.products.filter((product) => matchesSearch(product, normalizedSearch))
      setProducts((prev) => [...prev, ...filteredBatch])
      skipRef.current += data.products.length
      totalRef.current = data.total
      if (skipRef.current >= data.total) {
        setHasMore(false)
      }
    } catch (err) {
      setError(parseError(err))
    } finally {
      setIsLoading(false)
    }
  }, [category, hasMore, isLoading, normalizedSearch, searchParam])

  const reset = useCallback(() => {
    skipRef.current = 0
    totalRef.current = Infinity
    setProducts([])
    setHasMore(true)
  }, [])

  useEffect(() => {
    reset()
  }, [category, normalizedSearch, reset, searchParam])

  useEffect(() => {
    if (!products.length && hasMore && !isLoading) {
      loadNextPage()
    }
  }, [hasMore, isLoading, loadNextPage, products.length])

  return {
    products,
    isLoading,
    error,
    hasMore,
    loadNextPage,
  }
}

export default useProducts

