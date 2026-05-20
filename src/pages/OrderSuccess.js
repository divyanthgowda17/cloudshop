import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  const orderId = 'ORD' + Math.floor(Math.random() * 900000 + 100000);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.checkCircle}>✓</div>
        <h1 style={styles.title}>Order Placed Successfully!</h1>
        <p style={styles.sub}>Thank you for shopping with CloudShop.</p>
        <div style={styles.orderBox}>
          <p style={styles.orderLabel}>Order ID</p>
          <p style={styles.orderId}>{orderId}</p>
        </div>
        <div style={styles.steps}>
          {['Order Confirmed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
            <div key={step} style={styles.step}>
              <div style={{ ...styles.dot, background: i === 0 ? '#28a745' : '#e0e0e0' }} />
              <span style={{ fontSize: '0.8rem', color: i === 0 ? '#28a745' : '#aaa' }}>{step}</span>
            </div>
          ))}
        </div>
        <div style={styles.btnRow}>
          <Link to="/products" style={styles.btn}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#f8f9fa', padding: '2rem',
  },
  card: {
    background: 'white', padding: '3rem', borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)', textAlign: 'center',
    maxWidth: '480px', width: '100%',
  },
  checkCircle: {
    width: '72px', height: '72px', background: '#28a745', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '2rem', color: 'white', margin: '0 auto 1.5rem',
  },
  title: { fontSize: '1.6rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.5rem' },
  sub: { color: '#888', marginBottom: '1.5rem' },
  orderBox: {
    background: '#f8f9fa', borderRadius: '10px', padding: '1rem',
    marginBottom: '1.5rem',
  },
  orderLabel: { color: '#888', fontSize: '0.85rem', margin: '0 0 4px' },
  orderId: { fontWeight: '700', fontSize: '1.2rem', color: '#1a1a2e', margin: 0, letterSpacing: '1px' },
  steps: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: '2rem', position: 'relative',
  },
  step: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 },
  dot: { width: '14px', height: '14px', borderRadius: '50%' },
  btnRow: { display: 'flex', justifyContent: 'center' },
  btn: {
    background: '#1a1a2e', color: 'white', padding: '12px 28px',
    borderRadius: '50px', textDecoration: 'none', fontWeight: '600',
  },
};
