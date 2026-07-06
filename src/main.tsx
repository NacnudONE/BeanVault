import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import './styles/variables.css';
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
