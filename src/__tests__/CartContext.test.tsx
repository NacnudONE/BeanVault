import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import type { Product } from '../data/types';

const product: Product = {
  id: 1,
  slug: 'test-coffee',
  name: 'Test Coffee',
  origin: 'Ethiopia',
  roast: 'Medium',
  price: 18,
  rating: 4.5,
  reviews: 100,
  flavors: ['Chocolate'],
  description: 'A test coffee.',
  brewing: ['Step 1'],
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe('CartContext — initial state', () => {
  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
  });

  it('restores cart from localStorage on mount', () => {
    localStorage.setItem(
      'bv_cart',
      JSON.stringify([
        { key: 'p1-250g-Whole Bean', id: 1, name: 'Test Coffee', price: 18, w: '250g', g: 'Whole Bean', qty: 3 },
      ]),
    );
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cartCount).toBe(3);
  });
});

describe('CartContext — addToCart', () => {
  it('adds a new item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product, '250g', 'Whole Bean', 1));
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].name).toBe('Test Coffee');
    expect(result.current.cartCount).toBe(1);
  });

  it('increments qty when the same key is added again', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(product, '250g', 'Whole Bean', 1);
      result.current.addToCart(product, '250g', 'Whole Bean', 2);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].qty).toBe(3);
  });

  it('creates a separate entry for a different weight', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(product, '250g', 'Whole Bean', 1);
      result.current.addToCart(product, '500g', 'Whole Bean', 1);
    });
    expect(result.current.cart).toHaveLength(2);
  });

  it('creates a separate entry for a different grind', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(product, '250g', 'Whole Bean', 1);
      result.current.addToCart(product, '250g', 'Fine', 1);
    });
    expect(result.current.cart).toHaveLength(2);
  });

  it('stores the correct price for the selected weight', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product, '500g', 'Whole Bean', 1));
    expect(result.current.cart[0].price).toBeCloseTo(32.4);
  });
});

describe('CartContext — removeFromCart', () => {
  it('removes the item with the given key', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product, '250g', 'Whole Bean', 1));
    const key = result.current.cart[0].key;
    act(() => result.current.removeFromCart(key));
    expect(result.current.cart).toHaveLength(0);
  });

  it('only removes the matched item when multiple items exist', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(product, '250g', 'Whole Bean', 1);
      result.current.addToCart(product, '1kg', 'Fine', 1);
    });
    const key = result.current.cart[0].key;
    act(() => result.current.removeFromCart(key));
    expect(result.current.cart).toHaveLength(1);
  });
});

describe('CartContext — updateQty', () => {
  it('increases quantity by delta', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product, '250g', 'Whole Bean', 1));
    const key = result.current.cart[0].key;
    act(() => result.current.updateQty(key, 2));
    expect(result.current.cart[0].qty).toBe(3);
  });

  it('decreases quantity by delta', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product, '250g', 'Whole Bean', 3));
    const key = result.current.cart[0].key;
    act(() => result.current.updateQty(key, -1));
    expect(result.current.cart[0].qty).toBe(2);
  });

  it('does not allow quantity below 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product, '250g', 'Whole Bean', 1));
    const key = result.current.cart[0].key;
    act(() => result.current.updateQty(key, -10));
    expect(result.current.cart[0].qty).toBe(1);
  });
});

describe('CartContext — clearCart', () => {
  it('empties the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product, '250g', 'Whole Bean', 2));
    act(() => result.current.clearCart());
    expect(result.current.cart).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
  });

  it('removes items from localStorage after clearCart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product, '250g', 'Whole Bean', 1));
    act(() => result.current.clearCart());
    // useEffect syncs the empty cart — localStorage holds '[]'
    const stored = JSON.parse(localStorage.getItem('bv_cart') ?? '[]') as unknown[];
    expect(stored).toHaveLength(0);
  });
});

describe('CartContext — cartTotal', () => {
  it('returns 0 for an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartTotal()).toBe(0);
  });

  it('sums price × qty across all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(product, '250g', 'Whole Bean', 2); // 18 × 2 = 36
      result.current.addToCart(product, '1kg', 'Fine', 1);        // 57.6 × 1 = 57.6
    });
    expect(result.current.cartTotal()).toBeCloseTo(93.6);
  });
});

describe('CartContext — localStorage sync', () => {
  it('writes cart to localStorage after addToCart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product, '250g', 'Whole Bean', 1));
    const stored = JSON.parse(localStorage.getItem('bv_cart') ?? '[]') as { name: string }[];
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Test Coffee');
  });
});
