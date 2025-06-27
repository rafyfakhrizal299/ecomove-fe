import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'app';
import 'assets/css/main.css'; // Pastikan Anda memiliki file ini untuk Tailwind CSS

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Element with ID "root" not found in the document.');
}
