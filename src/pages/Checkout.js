import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const orderData = {
        items: cart.map((item) => ({ product: item._id, quantity: item.quantity, price: item.price })),
        shippingAddress: form,
        totalAmount: totalPrice,
        paymentMethod: 'COD',
      };
      await placeOrder(orderData);
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError('Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Checkout</h1>
      <div style={styles.layout}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.sectionHead}>Shipping Details</h3>
          {[
            { name: 'name', label: 'Full Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone Number', type: 'tel' },
            { name: 'address', label: 'Address', type: 'text' },
            { name: 'city', label: 'City', type: 'text' },
            { name: 'pincode', label: 'PIN Code', type: 'text' },
          ].map((field) => (
            <div key={field.name} style={styles.field}>
              <label style={styles.label}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder={field.label}
              />
            </div>
          ))}

          <h3 style={styles.sectionHead}>Payment Method</h3>
          <div style={styles.codBadge}>💵 Cash on Delivery (COD)</div>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>
            Online payment (Razorpay/Stripe integration can be added by your team)
          </p>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order →'}
          </button>
        </form>

        <div style={styles.summary}>
          <h3 style={{ marginTop: 0 }}>Order Summary</h3>
          {cart.map((item) => (
            <div key={item._id} style={styles.summaryItem}>
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <hr />
          <div style={styles.total}>
            <strong>Total</strong>
            <strong>₹{totalPrice.toLocaleString()}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: '1000px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '1.5rem' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  sectionHead: { fontSize: '1.1rem', color: '#1a1a2e', margin: '1rem 0 0.5rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.9rem', fontWeight: '500', color: '#444' },
  input: {
    padding: '10px 14px', border: '1.5px solid #e0e0e0',
    borderRadius: '8px', fontSize: '1rem',
  },
  codBadge: {
    background: '#e8fdf0', color: '#155724', padding: '10px 16px',
    borderRadius: '8px', fontWeight: '600', fontSize: '0.95rem',
  },
  error: { color: '#e94560', fontSize: '0.9rem' },
  btn: {
    padding: '14px', background: '#e94560', color: 'white',
    border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
  },
  summary: {
    background: 'white', padding: '1.5rem', borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)', position: 'sticky', top: '80px',
  },
  summaryItem: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.9rem' },
  total: { display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '1.1rem' },
};
