import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const CDN = process.env.REACT_APP_CDN_URL || process.env.REACT_APP_S3_BASE_URL || '';
  // If image is a full URL use it directly, else prefix with CDN
  const imgSrc = product.image?.startsWith('http')
    ? product.image
    : `${CDN}/${product.image}`;

  return (
    <div style={styles.card}>
      <Link to={`/products/${product._id}`}>
        <img
          src={imgSrc}
          alt={product.name}
          style={styles.img}
          onError={(e) => { e.target.src = 'https://placehold.co/300x200?text=No+Image'; }}
        />
      </Link>
      <div style={styles.body}>
        <p style={styles.category}>{product.category}</p>
        <Link to={`/products/${product._id}`} style={styles.name}>{product.name}</Link>
        <div style={styles.footer}>
          <span style={styles.price}>₹{product.price.toLocaleString()}</span>
          <button style={styles.btn} onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'white', borderRadius: '12px', overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)', transition: 'transform 0.2s',
  },
  img: { width: '100%', height: '200px', objectFit: 'cover' },
  body: { padding: '1rem' },
  category: { color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' },
  name: {
    color: '#1a1a2e', fontWeight: '600', fontSize: '1rem',
    textDecoration: 'none', display: 'block', marginBottom: '12px',
  },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontWeight: '700', fontSize: '1.1rem', color: '#e94560' },
  btn: {
    background: '#1a1a2e', color: 'white', border: 'none',
    padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem',
  },
};
