import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then((res) => { setProduct(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <p style={styles.center}>Loading...</p>;
  if (!product) return <p style={styles.center}>Product not found.</p>;

  const CDN = process.env.REACT_APP_CDN_URL || process.env.REACT_APP_S3_BASE_URL || '';
  const imgSrc = product.image?.startsWith('http') ? product.image : `${CDN}/${product.image}`;

  return (
    <div style={styles.page}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Back</button>
      <div style={styles.card}>
        <img
          src={imgSrc}
          alt={product.name}
          style={styles.img}
          onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=No+Image'; }}
        />
        <div style={styles.info}>
          <p style={styles.category}>{product.category}</p>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.desc}>{product.description || 'No description available.'}</p>
          <div style={styles.priceRow}>
            <span style={styles.price}>₹{product.price?.toLocaleString()}</span>
            {product.stock !== undefined && (
              <span style={{ color: product.stock > 0 ? 'green' : 'red', fontSize: '0.9rem' }}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            )}
          </div>
          {/* Cloud detail - good for demo */}
          {product.image && (
            <p style={styles.cloudNote}>
              🌐 Image served from AWS S3 / CloudFront CDN
            </p>
          )}
          <button
            onClick={handleAdd}
            style={{ ...styles.btn, background: added ? '#28a745' : '#e94560' }}
            disabled={product.stock === 0}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
          <button onClick={() => navigate('/cart')} style={styles.btnSecondary}>
            View Cart →
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: '900px', margin: '0 auto', padding: '2rem' },
  center: { textAlign: 'center', marginTop: '3rem', color: '#888' },
  back: {
    background: 'none', border: 'none', color: '#1a1a2e',
    cursor: 'pointer', fontSize: '1rem', marginBottom: '1.5rem', padding: 0,
  },
  card: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem',
    background: 'white', borderRadius: '16px', overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  img: { width: '100%', height: '360px', objectFit: 'cover' },
  info: { padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  category: { color: '#888', fontSize: '0.85rem', textTransform: 'uppercase' },
  name: { fontSize: '1.6rem', fontWeight: '700', color: '#1a1a2e', margin: 0 },
  desc: { color: '#555', lineHeight: 1.6, fontSize: '0.95rem' },
  priceRow: { display: 'flex', alignItems: 'center', gap: '1rem' },
  price: { fontSize: '2rem', fontWeight: '800', color: '#e94560' },
  cloudNote: { fontSize: '0.8rem', color: '#888', background: '#f8f9fa', padding: '6px 10px', borderRadius: '6px' },
  btn: {
    color: 'white', border: 'none', padding: '14px', borderRadius: '10px',
    fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s',
  },
  btnSecondary: {
    background: 'white', border: '2px solid #1a1a2e', color: '#1a1a2e',
    padding: '12px', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer',
  },
};
