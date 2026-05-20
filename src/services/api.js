import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach token to every request if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Products ───────────────────────────────────────────
export const getProducts = (category) =>
  API.get('/products', { params: { category } });

export const getProductById = (id) =>
  API.get(`/products/${id}`);

// ─── Auth ────────────────────────────────────────────────
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);

// ─── Orders ──────────────────────────────────────────────
export const placeOrder = (orderData) => API.post('/orders', orderData);
export const getMyOrders = () => API.get('/orders/my');

// ─── Admin: Upload image to S3 via backend ───────────────
export const uploadProductImage = (formData) =>
  API.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const createProduct = (data) => API.post('/products', data);
