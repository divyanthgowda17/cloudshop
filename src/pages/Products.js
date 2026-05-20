import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Sports'];

// Fallback mock data - use when backend isn't ready yet
const MOCK_PRODUCTS = [
  { _id: '1', name: 'Wireless Headphones', category: 'Electronics', price: 2499, image: 'https://placehold.co/300x200?text=Headphones' },
  { _id: '2', name: 'Running Shoes', category: 'Sports', price: 1899, image: 'https://placehold.co/300x200?text=Shoes' },
  { _id: '3', name: 'Clean Code Book', category: 'Books', price: 599, image: 'https://placehold.co/300x200?text=Book' },
  { _id: '4', name: 'Cotton T-Shirt', category: 'Clothing', price: 399, image: 'https://placehold.co/300x200?text=Tshirt' },
  { _id: '5', name: 'Smart Watch', category: 'Electronics', price: 4999, image: 'https://placehold.co/300x200?text=Watch' },
  { _id: '6', name: 'Yoga Mat', category: 'Sports', price: 799, image: 'https://placehold.co/300x200?text=Yoga+Mat' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [useMock, setUseMock] = useState(false);

  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    setLoading(true);
    const cat = activeCategory === 'All' ? '' : activeCategory;
    getProducts(cat)
      .then((res) => { setProducts(res.data); setLoading(false); })
      .catch(() => {
        // Backend not ready? Fall back to mock data
        setProducts(MOCK_PRODUCTS);
        setUseMock(true);
        setLoading(false);
      });
  }, [activeCategory]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {useMock && (
        <div style={styles.mockBanner}>
          ⚠️ Backend not connected — showing demo products. Replace REACT_APP_API_URL in .env
        </div>
      )}

      <h1 style={styles.title}>Products</h1>

      {/* Search */}
      <input
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category filters */}
      <div style={styles.filters}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            style={{ ...styles.filterBtn, ...(activeCategory === cat ? styles.activeFilter : {}) }}
            onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '3rem' }}>Loading...</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map((p) => <ProductCard key={p._id} product={p} />)}
          {filtered.length === 0 && <p>No products found.</p>}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '1rem' },
  search: {
    width: '100%', padding: '12px 16px', fontSize: '1rem',
    border: '1.5px solid #e0e0e0', borderRadius: '10px',
    marginBottom: '1rem', boxSizing: 'border-box',
  },
  filters: { display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' },
  filterBtn: {
    padding: '8px 18px', border: '1.5px solid #ddd', borderRadius: '50px',
    cursor: 'pointer', background: 'white', fontSize: '0.9rem',
  },
  activeFilter: { background: '#1a1a2e', color: 'white', borderColor: '#1a1a2e' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' },
  mockBanner: {
    background: '#fff3cd', border: '1px solid #ffc107', padding: '10px 16px',
    borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', color: '#856404',
  },
};
