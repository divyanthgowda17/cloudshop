import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) { navigate('/login'); return; }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={{ fontSize: '4rem' }}>🛒</span>
        <h2>Your cart is empty</h2>
        <Link to="/products" style={styles.shopLink}>Browse Products</Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Your Cart ({totalItems} items)</h1>
      <div style={styles.layout}>
        <div style={styles.items}>
          {cart.map((item) => (
            <div key={item._id} style={styles.row}>
              <img
                src={item.image?.startsWith('http') ? item.image : `https://placehold.co/80x80?text=${item.name[0]}`}
                alt={item.name}
                style={styles.thumb}
                onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=IMG'; }}
              />
              <div style={styles.rowInfo}>
                <p style={styles.rowName}>{item.name}</p>
                <p style={styles.rowPrice}>₹{item.price.toLocaleString()}</p>
              </div>
              <div style={styles.qtyRow}>
                <button style={styles.qtyBtn} onClick={() => updateQty(item._id, item.quantity - 1)}>−</button>
                <span style={styles.qtyVal}>{item.quantity}</span>
                <button style={styles.qtyBtn} onClick={() => updateQty(item._id, item.quantity + 1)}>+</button>
              </div>
              <p style={styles.lineTotal}>₹{(item.price * item.quantity).toLocaleString()}</p>
              <button style={styles.remove} onClick={() => removeFromCart(item._id)}>🗑</button>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h3 style={{ marginTop: 0 }}>Order Summary</h3>
          <div style={styles.summaryRow}><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
          <div style={styles.summaryRow}><span>Delivery</span><span style={{ color: 'green' }}>Free</span></div>
          <hr />
          <div style={{ ...styles.summaryRow, fontWeight: '700', fontSize: '1.1rem' }}>
            <span>Total</span><span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <button onClick={handleCheckout} style={styles.checkoutBtn}>
            Proceed to Checkout →
          </button>
          {!user && <p style={styles.loginHint}>You'll need to login to checkout</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: '1000px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '1.5rem' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' },
  items: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  row: {
    display: 'flex', alignItems: 'center', gap: '1rem',
    background: 'white', padding: '1rem', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  thumb: { width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' },
  rowInfo: { flex: 1 },
  rowName: { fontWeight: '600', margin: '0 0 4px' },
  rowPrice: { color: '#888', fontSize: '0.9rem', margin: 0 },
  qtyRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  qtyBtn: {
    width: '28px', height: '28px', borderRadius: '6px',
    border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: '1rem',
  },
  qtyVal: { fontWeight: '600', minWidth: '20px', textAlign: 'center' },
  lineTotal: { fontWeight: '700', color: '#1a1a2e', minWidth: '70px', textAlign: 'right' },
  remove: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' },
  summary: {
    background: 'white', padding: '1.5rem', borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)', position: 'sticky', top: '80px',
  },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' },
  checkoutBtn: {
    width: '100%', padding: '14px', background: '#e94560', color: 'white',
    border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem',
  },
  loginHint: { fontSize: '0.8rem', color: '#888', textAlign: 'center', marginTop: '0.5rem' },
  empty: { textAlign: 'center', padding: '5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
  shopLink: {
    background: '#1a1a2e', color: 'white', padding: '12px 28px',
    borderRadius: '50px', textDecoration: 'none', fontWeight: '600',
  },
};
