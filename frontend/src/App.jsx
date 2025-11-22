import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const sessionId = useMemo(() => {
    const key = 'session_id'
    let s = localStorage.getItem(key)
    if (!s) {
      s = Math.random().toString(36).slice(2)
      localStorage.setItem(key, s)
    }
    return s
  }, [])

  useEffect(() => {
    axios.get(`${API_BASE}/products`).then(res => setProducts(res.data)).catch(() => setProducts([]))
    axios.get(`${API_BASE}/cart/${sessionId}`).then(res => setCartCount(res.data.items?.reduce((a,b)=>a+b.quantity,0) || 0)).catch(()=>{})
  }, [sessionId])

  const filtered = useMemo(() => {
    if (!query) return products
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
  }, [products, query])

  const addToCart = async (product) => {
    try {
      await axios.post(`${API_BASE}/cart/${sessionId}/items`, { product_id: product.id, quantity: 1 })
      setCartCount(c => c + 1)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onSearch={setQuery} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </section>
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-16">No products found.</div>
        )}
      </main>
    </div>
  )
}
