import React, { useState } from 'react';
import { uploadProductImage, createProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', category: '', stock: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user?.isAdmin) {
    return (
      <div style={styles.center}>
        <h2>🔒 Admin Access Only</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      let imageUrl = '';
      if (imageFile) {
        setStatus('⬆️ Uploading image to AWS S3...');
        const fd = new FormData();
        fd.append('image', imageFile);
        const uploadRes = await uploadProductImage(fd);
        imageUrl = uploadRes.data.imageUrl; // S3 URL returned by backend
        setStatus('✅ Image uploaded to S3!');
      }
      setStatus('📦 Creating product...');
      await createProduct({ ...form, price: Number(form.price), stock: Number(form.stock), image: imageUrl });
      setStatus('✅ Product created successfully!');
      setForm({ name: '', price: '', category: '', stock: '', description: '' });
      setImageFile(null);
      setPreview('');
    } catch (err) {
      setStatus('❌ Error: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin Panel</h1>
      <p style={styles.sub}>Add new products — images are uploaded to AWS S3</p>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Add New Product</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid2}>
            {[
              { name: 'name', label: 'Product Name', type: 'text' },
              { name: 'price', label: 'Price (₹)', type: 'number' },
              { name: 'stock', label: 'Stock Quantity', type: 'number' },
            ].map((f) => (
              <div key={f.name} style={styles.field}>
                <label style={styles.label}>{f.label}</label>
                <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} required style={styles.input} />
              </div>
            ))}
            <div style={styles.field}>
              <label style={styles.label}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} required style={styles.input}>
                <option value="">Select category</option>
                {['Electronics', 'Clothing', 'Books', 'Sports'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} style={{ ...styles.input, resize: 'vertical' }} />
          </div>

          {/* Image upload - highlights S3 cloud feature */}
          <div style={styles.field}>
            <label style={styles.label}>Product Image → uploads to AWS S3</label>
            <div style={styles.uploadBox}>
              {preview ? (
                <img src={preview} alt="preview" style={styles.preview} />
              ) : (
                <div style={styles.uploadPlaceholder}>
                  <span style={{ fontSize: '2rem' }}>☁️</span>
                  <span style={{ fontSize: '0.9rem', color: '#888' }}>Click to select image</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImage} style={styles.fileInput} />
            </div>
          </div>

          {status && (
            <div style={{
              padding: '10px 14px', borderRadius: '8px',
              background: status.startsWith('❌') ? '#fff5f5' : '#f0fff4',
              color: status.startsWith('❌') ? '#c0392b' : '#1a6e3c',
              fontSize: '0.9rem',
            }}>
              {status}
            </div>
          )}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Saving...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: '800px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.25rem' },
  sub: { color: '#888', marginBottom: '2rem' },
  card: {
    background: 'white', borderRadius: '16px', padding: '2rem',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  cardTitle: { fontSize: '1.1rem', color: '#1a1a2e', marginTop: 0, marginBottom: '1.5rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.9rem', fontWeight: '500', color: '#444' },
  input: {
    padding: '10px 14px', border: '1.5px solid #e0e0e0',
    borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit',
  },
  uploadBox: {
    border: '2px dashed #ddd', borderRadius: '10px', minHeight: '140px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden', cursor: 'pointer',
  },
  uploadPlaceholder: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
  preview: { width: '100%', maxHeight: '200px', objectFit: 'cover' },
  fileInput: {
    position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%',
  },
  btn: {
    padding: '14px', background: '#1a1a2e', color: 'white',
    border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
  },
  center: { textAlign: 'center', padding: '5rem 2rem' },
};
