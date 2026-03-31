import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global reset
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased; }
  a { text-decoration: none; }
  button { cursor: pointer; }
  @media (max-width: 768px) {
    .board-grid { grid-template-columns: 1fr !important; }
  }
`;
document.head.appendChild(globalStyle);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
