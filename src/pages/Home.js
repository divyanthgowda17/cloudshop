import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    { name: 'Electronics', emoji: '💻', bg: '#e8f4fd' },
    { name: 'Clothing', emoji: '👕', bg: '#fef0e6' },
    { name: 'Books', emoji: '📚', bg: '#e8fdf0' },
    { name: 'Sports', emoji: '⚽', bg: '#fef8e6' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <div>
          <h1 style={styles.heroTitle}>Shop Smarter<br />with the Cloud ☁️</h1>
          <p style={styles.heroSub}>
            Fast delivery. Powered by AWS. Secured by the cloud.
          </p>
          <Link to="/products" style={styles.heroCta}>Browse Products →</Link>
        </div>
      </div>

      {/* Cloud badge - great for project demo */}
      <div style={styles.cloudBar}>
        <span>⚡ Images hosted on AWS S3</span>
        <span>🌐 APIs on EC2 Cloud</span>
        <span>🚀 CDN via CloudFront</span>
        <span>🔒 JWT Auth</span>
      </div>

      {/* Categories */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <div style={styles.grid}>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              style={{ ...styles.catCard, background: cat.bg }}
            >
              <span style={{ fontSize: '2.5rem' }}>{cat.emoji}</span>
              <span style={styles.catName}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
    color: 'white', padding: '5rem 2rem', textAlign: 'center',
  },
  heroTitle: { fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.2 },
  heroSub: { fontSize: '1.2rem', color: '#ccc', marginBottom: '2rem' },
  heroCta: {
    background: '#e94560', color: 'white', padding: '14px 32px',
    borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem',
  },
  cloudBar: {
    background: '#f8f9fa', padding: '0.8rem 2rem',
    display: 'flex', justifyContent: 'center', gap: '3rem',
    flexWrap: 'wrap', color: '#555', fontSize: '0.9rem',
    borderBottom: '1px solid #e9ecef',
  },
  section: { padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto' },
  sectionTitle: { fontSize: '1.6rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1a1a2e' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' },
  catCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '2rem', borderRadius: '12px', textDecoration: 'none', gap: '0.8rem',
    transition: 'transform 0.2s',
  },
  catName: { fontWeight: '600', color: '#1a1a2e', fontSize: '1rem' },
};
