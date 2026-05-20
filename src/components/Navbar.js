import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>☁️ CloudShop</Link>
      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Products</Link>
        {user ? (
          <>
            <span style={styles.greeting}>Hi, {user.name}</span>
            {user.isAdmin && (
              <Link to="/admin" style={styles.link}>Admin</Link>
            )}
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
        <Link to="/cart" style={styles.cartBtn}>
          🛒 Cart {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 2rem', background: '#1a1a2e', color: 'white',
    position: 'sticky', top: 0, zIndex: 100,
  },
  brand: { color: '#e94560', fontSize: '1.4rem', fontWeight: '700', textDecoration: 'none' },
  links: { display: 'flex', alignItems: 'center', gap: '1.2rem' },
  link: { color: 'white', textDecoration: 'none', fontSize: '0.95rem' },
  greeting: { color: '#aaa', fontSize: '0.9rem' },
  btn: {
    background: 'transparent', border: '1px solid #e94560', color: '#e94560',
    padding: '6px 14px', borderRadius: '6px', cursor: 'pointer',
  },
  cartBtn: {
    background: '#e94560', color: 'white', padding: '8px 16px',
    borderRadius: '8px', textDecoration: 'none', fontWeight: '600',
    position: 'relative',
  },
  badge: {
    background: 'white', color: '#e94560', borderRadius: '50%',
    padding: '2px 6px', fontSize: '0.75rem', fontWeight: '700',
    marginLeft: '6px',
  },
};
