import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils';

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQty } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');

  const sub = cartTotal();
  const ship = sub >= 50 ? 0 : sub > 0 ? 5.99 : 0;

  return (
    <div style={{ padding: '48px 40px 96px', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4vw,42px)', fontWeight: 700, color: '#F5E6D3', marginBottom: 34 }}>Your Cart</h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" style={{ margin: '0 auto 22px', display: 'block' }}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#F5E6D3', marginBottom: 10 }}>Your cart is empty</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#6B5A4E', marginBottom: 30 }}>Discover our collection of exceptional coffees from around the world.</p>
          <button className="bv-btn-primary" onClick={() => navigate('/shop')}>Start Shopping</button>
        </div>
      ) : (
        <div className="bv-cart-l">
          {/* Items */}
          <div>
            <div style={{ borderTop: '1px solid #222' }}>
              {cart.map(item => (
                <div key={item.key} style={{ display: 'grid', gridTemplateColumns: '78px 1fr auto', gap: 18, alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #222' }}>
                  <div style={{ width: 78, height: 78, background: 'linear-gradient(135deg,#2a1008,#1a0504)', border: '1px solid #272727', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(107,66,38,0.4)" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: '#F5E6D3', marginBottom: 3 }}>{item.name}</h4>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#555', marginBottom: 12 }}>{item.w} · {item.g}</p>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #2A2A2A', width: 'fit-content', borderRadius: 1 }}>
                      <button onClick={() => updateQty(item.key, -1)} style={{ width: 33, height: 33, background: 'transparent', border: 'none', cursor: 'pointer', color: '#C8B99A', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#D4631D')} onMouseLeave={e => (e.currentTarget.style.color = '#C8B99A')}>−</button>
                      <span style={{ width: 34, textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#F5E6D3' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, 1)} style={{ width: 33, height: 33, background: 'transparent', border: 'none', cursor: 'pointer', color: '#C8B99A', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#D4631D')} onMouseLeave={e => (e.currentTarget.style.color = '#C8B99A')}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: '#F5E6D3' }}>{formatPrice(item.price * item.qty)}</span>
                    <button onClick={() => removeFromCart(item.key)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#444', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#D4631D')} onMouseLeave={e => (e.currentTarget.style.color = '#444')}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 18 }}>
              <button onClick={() => navigate('/shop')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9B8470', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4631D')} onMouseLeave={e => (e.currentTarget.style.color = '#9B8470')}>← Continue Shopping</button>
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: 26, position: 'sticky', top: 86 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: '#F5E6D3', marginBottom: 22 }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid #222' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7B6A5A' }}>Subtotal</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#F5E6D3', fontWeight: 600 }}>{formatPrice(sub)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7B6A5A' }}>Shipping</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#6B9B7A', fontWeight: 600 }}>{ship === 0 ? (sub > 0 ? 'Free' : '$0.00') : formatPrice(ship)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: 18 }}>
              <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Promo code" style={{ flex: 1, padding: '10px 13px', background: '#141414', border: '1px solid #2A2A2A', borderRight: 'none', color: '#F5E6D3', fontFamily: "'Inter', sans-serif", fontSize: 13, outline: 'none', minWidth: 0 }} />
              <button onClick={() => showToast('Promo code applied!')} style={{ padding: '10px 16px', background: '#3C1A0B', border: '1px solid #3C1A0B', color: '#D4631D', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#D4631D'; e.currentTarget.style.color = '#F5E6D3'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#3C1A0B'; e.currentTarget.style.color = '#D4631D'; }}>Apply</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22, paddingTop: 14, borderTop: '1px solid #222' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#F5E6D3' }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: '#F5E6D3' }}>{formatPrice(sub + ship)}</span>
            </div>
            <button onClick={() => navigate('/checkout')} className="bv-btn-primary" style={{ width: '100%', marginBottom: 11 }}>Proceed to Checkout</button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#444', textAlign: 'center' }}>Secure checkout · Free shipping over $50</p>
          </div>
        </div>
      )}
    </div>
  );
}
