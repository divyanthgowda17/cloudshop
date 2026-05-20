import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global base styles
const style = document.createElement('style');
style.textContent = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', sans-serif; background: #f8f9fa; color: #1a1a2e; }
  a { text-decoration: none; }
  button { font-family: inherit; }
  input, select, textarea { font-family: inherit; outline: none; }
  input:focus, select:focus, textarea:focus { border-color: #1a1a2e !important; }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
