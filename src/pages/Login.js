import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = isLogin
        ? await loginUser({ email: form.email, password: form.password })
        : await registerUser(form);
      login(res.data.user, res.data.token);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Check if backend is running.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p style={styles.sub}>{isLogin ? 'Login to your CloudShop account' : 'Join CloudShop today'}</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} required style={styles.input} placeholder="Your Name" />
            </div>
          )}
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required style={styles.input} placeholder="you@example.com" />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required style={styles.input} placeholder="••••••••" />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.toggle}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button style={styles.toggleBtn} onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
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
    background: 'white', padding: '2.5rem', borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '420px',
  },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' },
  sub: { color: '#888', marginBottom: '2rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.9rem', fontWeight: '500', color: '#444' },
  input: {
    padding: '12px 14px', border: '1.5px solid #e0e0e0',
    borderRadius: '8px', fontSize: '1rem',
  },
  error: { color: '#e94560', fontSize: '0.9rem', background: '#fff5f5', padding: '8px 12px', borderRadius: '8px' },
  btn: {
    padding: '14px', background: '#1a1a2e', color: 'white',
    border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
  },
  toggle: { textAlign: 'center', marginTop: '1.5rem', color: '#666', fontSize: '0.9rem' },
  toggleBtn: {
    background: 'none', border: 'none', color: '#e94560',
    fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem',
  },
};
