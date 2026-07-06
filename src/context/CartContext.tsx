import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem, Product } from '../data/types';
import { priceFor } from '../utils';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: () => number;
  addToCart: (product: Product, weight: string, grind: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const s = localStorage.getItem('bv_cart');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem('bv_cart', JSON.stringify(cart)); } catch { /* ignore */ }
  }, [cart]);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  const cartTotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product: Product, weight: string, grind: string, qty: number) => {
    const key = `${product.id}-${weight}-${grind}`;
    setCart(prev => {
      const idx = prev.findIndex(x => x.key === key);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
        return updated;
      }
      return [...prev, { key, id: product.id, name: product.name, price: priceFor(product, weight), w: weight, g: grind, qty }];
    });
  };

  const removeFromCart = (key: string) => setCart(prev => prev.filter(x => x.key !== key));

  const updateQty = (key: string, delta: number) =>
    setCart(prev => prev.map(x => x.key === key ? { ...x, qty: Math.max(1, x.qty + delta) } : x));

  const clearCart = () => {
    setCart([]);
    try { localStorage.removeItem('bv_cart'); } catch { /* ignore */ }
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
